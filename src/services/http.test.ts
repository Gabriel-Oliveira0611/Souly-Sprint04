import { describe, expect, it, vi } from "vitest";
import { ApiError, createHttpClient } from "./http";

describe("contrato HTTP da API Java", () => {
  it("envia JSON e preserva o corpo tipado da resposta", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ id: 7 }), { status: 201 }));
    const client = createHttpClient("https://api.example/api/v1", fetcher);
    expect(await client<{ id: number }>("/rewards", { method: "POST", body: '{"name":"Selo"}' })).toEqual({ id: 7 });
    expect(fetcher.mock.calls[0]?.[0]).toBe("https://api.example/api/v1/rewards");
    const options = fetcher.mock.calls[0]?.[1];
    expect(options?.method).toBe("POST");
    expect(new Headers(options?.headers).get("Content-Type")).toBe("application/json");
    expect(new Headers(options?.headers).get("Accept")).toBe("application/json");
  });
  it("aceita DELETE com 204 sem tentar interpretar JSON", async () => {
    const client = createHttpClient("", vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 204 })));
    await expect(client<void>("/missions/7", { method: "DELETE" })).resolves.toBeUndefined();
  });
  it("preserva os detalhes da validação retornados pelo Java", async () => {
    const client = createHttpClient("", vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ message: "Dados de entrada inválidos", details: ["title: obrigatório"] }), { status: 400 })));
    await expect(client("/missions")).rejects.toMatchObject({ status: 400, message: "Dados de entrada inválidos", details: ["title: obrigatório"] });
  });
  it("exibe erro HTTP mesmo se o servidor retornar HTML", async () => {
    const client = createHttpClient("", vi.fn<typeof fetch>().mockResolvedValue(new Response("<html>erro</html>", { status: 502 })));
    await expect(client("/missions")).rejects.toMatchObject({ status: 502, message: expect.stringContaining("HTTP 502") });
  });
  it("rejeita resposta de sucesso com formato inesperado", async () => {
    const client = createHttpClient("", vi.fn<typeof fetch>().mockResolvedValue(new Response("<html>login</html>")));
    await expect(client("/missions")).rejects.toThrow("resposta inválida");
  });
  it("converte falhas de rede em uma mensagem utilizável", async () => {
    const client = createHttpClient("", vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(client("/missions")).rejects.toBeInstanceOf(ApiError);
    await expect(client("/missions")).rejects.toThrow("Verifique sua conexão");
  });
  it("cancela a requisição quando o consumidor sai da página", async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation((_url, options) => new Promise((_resolve, reject) => {
      options?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    }));
    const controller = new AbortController();
    const request = createHttpClient("", fetcher)("/missions", { signal: controller.signal });
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: "AbortError" });
  });
  it("informa quando o servidor excede o tempo de espera", async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation((_url, options) => new Promise((_resolve, reject) => {
      options?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    }));
    await expect(createHttpClient("", fetcher, 5)("/missions")).rejects.toThrow("demorou para responder");
  });
});
