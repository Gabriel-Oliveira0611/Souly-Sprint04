import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { FeedbackProvider } from "../contexts/FeedbackContext";
import type { Mission, Reward } from "../types/api";

const reward: Reward = { id: 3, name: "Selo Verde", description: "Reconhecimento sustentável", type: "SELO", value: 10, details: "Benefício acadêmico" };
const mission: Mission = { id: 7, title: "Economizar água", description: "Pequenas atitudes", type: "AGUA", rules: "Feche a torneira", startDate: "2026-01-01T00:00:00Z", endDate: null, status: "ATIVA", eligibleNow: true, rewards: [reward], createdAt: null, updatedAt: null };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

beforeEach(() => {
  fetchMock = vi.fn<typeof fetch>().mockImplementation(async (url) => {
    const path = new URL(String(url)).pathname;
    if (path === "/api/v1/missions") return json([mission]);
    if (path === "/api/v1/missions/7") return json(mission);
    if (path === "/api/v1/rewards") return json([reward]);
    if (path === "/api/v1/rewards/3") return json(reward);
    return json({ message: "Registro não encontrado" }, 404);
  });
  vi.stubGlobal("fetch", fetchMock);
});

function open(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><FeedbackProvider><App /></FeedbackProvider></MemoryRouter>);
}

describe("navegação e integração da aplicação", () => {
  it("lista missões e abre a rota dinâmica de detalhes", async () => {
    const user = userEvent.setup();
    open("/missoes");
    expect(screen.getByRole("status").textContent).toContain("Carregando");
    await user.click(await screen.findByRole("link", { name: "Ver detalhes de Economizar água" }));
    expect((await screen.findByRole("heading", { name: "Economizar água", level: 1 })).textContent).toBe("Economizar água");
    expect(screen.getByText("Feche a torneira")).toBeTruthy();
    expect(fetchMock.mock.calls.some(([url]) => String(url).endsWith("/missions/7"))).toBe(true);
  });
  it("filtra missões e informa quando não há resultados", async () => {
    const user = userEvent.setup();
    open("/missoes");
    await screen.findByRole("link", { name: "Ver detalhes de Economizar água" });
    await user.type(screen.getByLabelText("Buscar missão"), "inexistente");
    expect(await screen.findByRole("heading", { name: "Nenhuma missão encontrada" })).toBeTruthy();
  });
  it("mostra um estado vazio sem inventar missões", async () => {
    fetchMock.mockResolvedValue(json([]));
    open("/missoes");
    expect(await screen.findByRole("heading", { name: "A primeira missão começa aqui" })).toBeTruthy();
  });
  it("permite tentar novamente após uma falha do servidor", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce(json({ message: "Banco indisponível" }, 500));
    open("/missoes");
    expect((await screen.findByRole("alert")).textContent).toContain("Banco indisponível");
    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));
    expect(await screen.findByRole("link", { name: "Ver detalhes de Economizar água" })).toBeTruthy();
  });
  it("redireciona IDs inválidos com mensagem personalizada", async () => {
    open("/missoes/abc");
    expect(await screen.findByRole("heading", { name: "Missões sustentáveis" })).toBeTruthy();
    expect(await screen.findByText("O endereço da missão é inválido. Escolha uma missão na listagem.")).toBeTruthy();
    expect(fetchMock.mock.calls.some(([url]) => String(url).endsWith("/missions/abc"))).toBe(false);
  });
  it("trata um ID válido que não existe no servidor", async () => {
    open("/missoes/99");
    expect(await screen.findByRole("heading", { name: "Missão não encontrada" })).toBeTruthy();
  });
  it("orienta o cadastro prévio quando o catálogo de recompensas está vazio", async () => {
    fetchMock.mockResolvedValue(json([]));
    open("/missoes/nova");
    expect(await screen.findByRole("link", { name: "Cadastrar recompensa" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Cadastrar missão" })).toBeNull();
  });
  it("valida e cadastra recompensa com POST, redirecionamento e confirmação", async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementation(async (url, options) => {
      if (options?.method === "POST") return json(reward, 201);
      return String(url).endsWith("/rewards/3") ? json(reward) : json([reward]);
    });
    open("/recompensas/nova");
    const button = await screen.findByRole("button", { name: "Cadastrar recompensa" });
    await user.click(button);
    expect(screen.getByRole("alert").textContent).toContain("Confira os campos");
    expect(fetchMock.mock.calls.some(([, options]) => options?.method === "POST")).toBe(false);
    await user.type(screen.getByLabelText("Nome *"), reward.name);
    await user.type(screen.getByLabelText("Tipo *"), reward.type);
    await user.type(screen.getByLabelText("Valor *"), "10");
    await user.click(button);
    expect(await screen.findByRole("heading", { level: 1, name: reward.name })).toBeTruthy();
    const post = fetchMock.mock.calls.find(([, options]) => options?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toMatchObject({ name: reward.name, value: 10, type: "SELO" });
    expect(screen.getByText("Recompensa cadastrada. Agora você pode vinculá-la a uma missão.")).toBeTruthy();
  });
  it("cadastra missão com recompensa e datas no contrato Java", async () => {
    const user = userEvent.setup();
    fetchMock.mockImplementation(async (url, options) => {
      if (options?.method === "POST") return json(mission, 201);
      return String(url).endsWith("/rewards") ? json([reward]) : json(mission);
    });
    open("/missoes/nova");
    await screen.findByRole("button", { name: "Cadastrar missão" });
    await user.type(screen.getByLabelText("Título *"), mission.title);
    await user.type(screen.getByLabelText("Tipo *"), mission.type);
    await user.click(screen.getByRole("checkbox", { name: /Selo Verde/ }));
    await user.click(screen.getByRole("button", { name: "Cadastrar missão" }));
    expect(await screen.findByRole("heading", { level: 1, name: mission.title })).toBeTruthy();
    const post = fetchMock.mock.calls.find(([, options]) => options?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toMatchObject({ title: mission.title, rewardIds: [3], status: "ATIVA", endDate: null });
    expect(JSON.parse(String(post?.[1]?.body)).startDate).toMatch(/Z$/);
  });
  it("edita uma missão usando PUT sem reenviar associações", async () => {
    const user = userEvent.setup();
    open("/missoes/7/editar");
    const input = await screen.findByLabelText("Título *");
    await user.clear(input);
    await user.type(input, "Economizar energia");
    await user.click(screen.getByRole("button", { name: "Salvar alterações" }));
    await screen.findByRole("heading", { level: 1, name: mission.title });
    const put = fetchMock.mock.calls.find(([, options]) => options?.method === "PUT");
    const body = JSON.parse(String(put?.[1]?.body));
    expect(body.title).toBe("Economizar energia");
    expect(body.rewardIds).toBeUndefined();
  });
  it("altera o status com PATCH", async () => {
    const user = userEvent.setup();
    open("/missoes/7");
    await user.click(await screen.findByRole("button", { name: "Desativar missão" }));
    await waitFor(() => expect(fetchMock.mock.calls.some(([, options]) => options?.method === "PATCH")).toBe(true));
    const patch = fetchMock.mock.calls.find(([, options]) => options?.method === "PATCH");
    expect(JSON.parse(String(patch?.[1]?.body))).toEqual({ status: "INATIVA" });
  });
  it("exige confirmação e trata DELETE com 204", async () => {
    const user = userEvent.setup();
    const original = fetchMock.getMockImplementation();
    fetchMock.mockImplementation(async (url, options) => options?.method === "DELETE" ? new Response(null, { status: 204 }) : original!(url, options));
    open("/missoes/7");
    await user.click(await screen.findByRole("button", { name: "Excluir missão" }));
    const dialog = screen.getByRole("dialog");
    expect(fetchMock.mock.calls.some(([, options]) => options?.method === "DELETE")).toBe(false);
    await user.click(within(dialog).getByRole("button", { name: "Sim, excluir" }));
    expect(await screen.findByRole("heading", { name: "Missões sustentáveis" })).toBeTruthy();
    expect(screen.getByText("Missão excluída com sucesso.")).toBeTruthy();
  });
  it("mantém o diálogo e a mensagem do backend se a exclusão for recusada", async () => {
    const user = userEvent.setup();
    const original = fetchMock.getMockImplementation();
    fetchMock.mockImplementation(async (url, options) => options?.method === "DELETE" ? json({ message: "Recompensa vinculada a uma missão" }, 409) : original!(url, options));
    open("/recompensas/3");
    await user.click(await screen.findByRole("button", { name: "Excluir recompensa" }));
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Sim, excluir" }));
    expect((await screen.findByRole("alert")).textContent).toContain("Recompensa vinculada");
    expect(screen.getByRole("dialog")).toBeTruthy();
  });
  it("abre e fecha o menu para navegação em telas menores", async () => {
    const user = userEvent.setup();
    open("/");
    const menu = screen.getByRole("button", { name: "Menu" });
    expect(menu.getAttribute("aria-expanded")).toBe("false");
    await user.click(menu);
    expect(menu.getAttribute("aria-expanded")).toBe("true");
    await user.click(within(screen.getByRole("navigation", { name: "Navegação principal" })).getByRole("link", { name: "Missões" }));
    expect(screen.getByRole("button", { name: "Menu" }).getAttribute("aria-expanded")).toBe("false");
  });
});
