export type MissionStatus = "ATIVA" | "INATIVA";

export interface Reward {
  id: number;
  name: string;
  description: string | null;
  type: string;
  value: number;
  details: string | null;
}

export interface Mission {
  id: number;
  title: string;
  description: string | null;
  type: string;
  rules: string | null;
  startDate: string;
  endDate: string | null;
  status: MissionStatus;
  eligibleNow: boolean;
  rewards: Reward[];
  createdAt: string | null;
  updatedAt: string | null;
}

export interface MissionInput {
  title: string;
  description: string;
  type: string;
  rules: string;
  startDate: string;
  endDate: string | null;
}

// A criação reúne os dados básicos e a associação obrigatória com recompensas.
export type MissionCreateInput = MissionInput & {
  status: MissionStatus;
  rewardIds: number[];
};

export type RewardInput = Omit<Reward, "id" | "description" | "details"> & {
  description: string;
  details: string;
};

export type RequestState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export interface ApiErrorBody {
  message?: string;
  details?: string[];
}
