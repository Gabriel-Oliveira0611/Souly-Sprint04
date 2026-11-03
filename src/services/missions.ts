import type { Mission, MissionCreateInput, MissionInput, MissionStatus } from "../types/api";
import { request } from "./http";

export const missionsService = {
  list: (signal?: AbortSignal) => request<Mission[]>("/missions", { signal }),
  find: (id: number, signal?: AbortSignal) => request<Mission>("/missions/" + id, { signal }),
  create: (input: MissionCreateInput) =>
    request<Mission>("/missions", { method: "POST", body: JSON.stringify(input) }),
  update: (id: number, input: MissionInput) =>
    request<Mission>("/missions/" + id, { method: "PUT", body: JSON.stringify(input) }),
  changeStatus: (id: number, status: MissionStatus) =>
    request<Mission>("/missions/" + id + "/status", { method: "PATCH", body: JSON.stringify({ status }) }),
  remove: (id: number) => request<void>("/missions/" + id, { method: "DELETE" }),
};
