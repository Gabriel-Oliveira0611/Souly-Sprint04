import type { MissionCreateInput, MissionInput, MissionStatus, RewardInput } from "../types/api";
import { toIso } from "./format";

export interface MissionDraft {
  title: string;
  description: string;
  type: string;
  rules: string;
  startDate: string;
  endDate: string;
  status: MissionStatus;
  rewardIds: number[];
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function validateMission(draft: MissionDraft, creating: boolean): FieldErrors<MissionDraft> {
  const errors: FieldErrors<MissionDraft> = {};
  if (draft.title.trim().length < 2 || draft.title.trim().length > 150) errors.title = "Use entre 2 e 150 caracteres.";
  if (!draft.type.trim() || draft.type.trim().length > 80) errors.type = "Informe um tipo com até 80 caracteres.";
  if (draft.description.length > 2000) errors.description = "Use até 2.000 caracteres.";
  if (draft.rules.length > 4000) errors.rules = "Use até 4.000 caracteres.";
  const start = toIso(draft.startDate);
  const end = toIso(draft.endDate);
  if (!start) errors.startDate = "Informe uma data e horário de início válidos.";
  if (draft.endDate && !end) errors.endDate = "Informe uma data e horário de término válidos.";
  if (start && end && end < start) errors.endDate = "O término deve ser igual ou posterior ao início.";
  if (creating && draft.rewardIds.length === 0) errors.rewardIds = "Selecione ao menos uma recompensa.";
  return errors;
}

export function missionInput(draft: MissionDraft): MissionInput {
  const startDate = toIso(draft.startDate);
  if (!startDate) throw new Error("A data de início é inválida.");
  return {
    title: draft.title.trim(),
    description: draft.description.trim(),
    type: draft.type.trim(),
    rules: draft.rules.trim(),
    startDate,
    endDate: toIso(draft.endDate),
  };
}

export function missionCreateInput(draft: MissionDraft): MissionCreateInput {
  return { ...missionInput(draft), status: draft.status, rewardIds: draft.rewardIds };
}

export interface RewardDraft {
  name: string;
  description: string;
  type: string;
  value: string;
  details: string;
}

export function validateReward(draft: RewardDraft): FieldErrors<RewardDraft> {
  const errors: FieldErrors<RewardDraft> = {};
  if (draft.name.trim().length < 2 || draft.name.trim().length > 150) errors.name = "Use entre 2 e 150 caracteres.";
  if (!draft.type.trim() || draft.type.trim().length > 80) errors.type = "Informe um tipo com até 80 caracteres.";
  if (draft.description.length > 2000) errors.description = "Use até 2.000 caracteres.";
  if (draft.details.length > 2000) errors.details = "Use até 2.000 caracteres.";
  const value = Number(draft.value);
  if (!draft.value.trim() || !Number.isInteger(value) || value < 0 || value > 2_147_483_647) {
    errors.value = "Informe um número inteiro entre 0 e 2.147.483.647.";
  }
  return errors;
}

export function rewardInput(draft: RewardDraft): RewardInput {
  return {
    name: draft.name.trim(),
    description: draft.description.trim(),
    type: draft.type.trim(),
    value: Number(draft.value),
    details: draft.details.trim(),
  };
}
