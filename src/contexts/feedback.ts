import { createContext, useContext } from "react";

export interface FeedbackContextValue {
  notify: (message: string) => void;
}

export const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback deve ser utilizado dentro de FeedbackProvider.");
  return context;
}
