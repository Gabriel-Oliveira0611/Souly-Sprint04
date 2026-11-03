import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { FeedbackContext } from "./feedback";

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<{ message: string; id: number } | null>(null);
  const notify = useCallback((message: string) => {
    setNotice({ message, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 8000);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <FeedbackContext.Provider value={{ notify }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg">
        {notice && (
          <div className="flex items-start gap-4 rounded-2xl border border-teal-700 bg-teal-950 p-5 text-sm text-white shadow-xl">
            <p className="flex-1">{notice.message}</p>
            <button type="button" onClick={() => setNotice(null)} aria-label="Fechar mensagem" className="cursor-pointer rounded px-2 focus-visible:outline-2 focus-visible:outline-white">×</button>
          </div>
        )}
      </div>
    </FeedbackContext.Provider>
  );
}

