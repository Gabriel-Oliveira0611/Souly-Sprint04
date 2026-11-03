import { describe, expect, it } from "vitest";
import { parseRouteId, toIso, toLocalInput } from "./format";
import { missionCreateInput, validateMission, validateReward } from "./validation";
import type { MissionDraft } from "./validation";

const valid: MissionDraft = { title: "Economizar água", description: "", rules: "", type: "AGUA", startDate: "2026-11-03T10:00", endDate: "", rewardIds: [1], status: "ATIVA" };

describe("validações alinhadas aos DTOs Java", () => {
  it.each(["0", "-1", "1abc", "1.5", "9007199254740992", ""])("rejeita ID de rota inválido: %s", (id) => {
    expect(parseRouteId(id)).toBeNull();
  });
  it("aceita um ID inteiro positivo", () => expect(parseRouteId("7")).toBe(7));
  it("preserva o horário local na conversão para Instant", () => {
    expect(toLocalInput(toIso("2026-11-03T10:30") || "")).toBe("2026-11-03T10:30");
  });
  it("exige ao menos uma recompensa na criação", () => {
    expect(validateMission({ ...valid, rewardIds: [] }, true).rewardIds).toBeDefined();
    expect(validateMission({ ...valid, rewardIds: [] }, false).rewardIds).toBeUndefined();
  });
  it("impede término anterior ao início", () => expect(validateMission({ ...valid, endDate: "2026-11-02T10:00" }, true).endDate).toBeDefined());
  it("normaliza textos e envia datas ISO compatíveis com Instant", () => {
    const input = missionCreateInput({ ...valid, title: "  Economizar água  " });
    expect(input.title).toBe("Economizar água");
    expect(input.startDate).toMatch(/Z$/);
    expect(input.endDate).toBeNull();
    expect(input.rewardIds).toEqual([1]);
    expect(validateMission(valid, true)).toEqual({});
  });
  it.each(["", "-1", "1.5", "2147483648"])("impede valor inválido de recompensa: %s", (value) => {
    expect(validateReward({ name: "Selo", type: "SELO", description: "", details: "", value }).value).toBeDefined();
  });
});
