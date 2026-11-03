import type { Reward, RewardInput } from "../types/api";
import { request } from "./http";

export const rewardsService = {
  list: (signal?: AbortSignal) => request<Reward[]>("/rewards", { signal }),
  find: (id: number, signal?: AbortSignal) => request<Reward>("/rewards/" + id, { signal }),
  create: (input: RewardInput) =>
    request<Reward>("/rewards", { method: "POST", body: JSON.stringify(input) }),
  update: (id: number, input: RewardInput) =>
    request<Reward>("/rewards/" + id, { method: "PUT", body: JSON.stringify(input) }),
  remove: (id: number) => request<void>("/rewards/" + id, { method: "DELETE" }),
};
