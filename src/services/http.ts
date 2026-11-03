import type { ApiErrorBody } from "../types/api";

export class ApiError extends Error {
  readonly status: number;
  readonly details: string[];

  constructor(message: string, status = 0, details: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://ecopulse-soulup-api.onrender.com/api/v1"
).trim().replace(/\/+$/, "");

// A injeção de fetch permite testar o contrato HTTP sem alterar o banco remoto.
export function createHttpClient(
  baseUrl: string,
  fetcher: typeof fetch = (...args) => fetch(...args),
  timeoutMs = 60_000,
) {
  return async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (options.signal?.aborted) controller.abort();
    options.signal?.addEventListener("abort", abort, { once: true });
    const timer = setTimeout(abort, timeoutMs);

    try {
      const headers = new Headers(options.headers);
      headers.set("Accept", "application/json");
      if (options.body) headers.set("Content-Type", "application/json");
      const response = await fetcher(baseUrl + path, {
        ...options,
        headers,
        signal: controller.signal,
      });

      if (response.status === 204) return undefined as T;
      const raw = await response.text();
      let body: unknown;
      try {
        body = raw ? JSON.parse(raw) : undefined;
      } catch {
        if (response.ok) throw new ApiError("O servidor retornou uma resposta inválida.", response.status);
      }

      if (!response.ok) {
        const data = body && typeof body === "object" ? body as ApiErrorBody : {};
        const details = Array.isArray(data.details)
          ? data.details.filter((item): item is string => typeof item === "string")
          : [];
        throw new ApiError(
          typeof data.message === "string" ? data.message : "Não foi possível concluir a operação (HTTP " + response.status + ").",
          response.status,
          details,
        );
      }
      if (body === undefined) throw new ApiError("O servidor retornou uma resposta vazia inesperada.", response.status);
      return body as T;
    } catch (error) {
      if (options.signal?.aborted) throw error;
      if (error instanceof ApiError) throw error;
      if (controller.signal.aborted) {
        throw new ApiError("O servidor demorou para responder. Ele pode estar iniciando; tente novamente em instantes.");
      }
      throw new ApiError("Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.");
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", abort);
    }
  };
}

export const request = createHttpClient(API_BASE_URL);
