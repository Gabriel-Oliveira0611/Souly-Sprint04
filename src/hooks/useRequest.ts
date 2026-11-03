import { useCallback, useEffect, useState } from "react";
import type { RequestState } from "../types/api";

export function useRequest<T>(loader: (signal: AbortSignal) => Promise<T>) {
  const [result, setResult] = useState<{
    loader: typeof loader;
    revision: number;
    state: RequestState<T>;
  } | null>(null);
  const [revision, setRevision] = useState(0);
  const reload = useCallback(() => setRevision((value) => value + 1), []);
  const state: RequestState<T> = result && result.loader === loader && result.revision === revision
    ? result.state
    : { status: "loading" };

  useEffect(() => {
    const controller = new AbortController();
    loader(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setResult({ loader, revision, state: { status: "success", data } });
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setResult({ loader, revision, state: { status: "error", error: error instanceof Error ? error : new Error("Ocorreu um erro inesperado.") } });
        }
      },
    );
    return () => controller.abort();
  }, [loader, revision]);

  return { state, reload };
}
