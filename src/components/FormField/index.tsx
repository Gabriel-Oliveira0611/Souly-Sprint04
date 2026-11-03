import type { InputHTMLAttributes, ReactNode } from "react";

export const inputClass = "min-w-0 w-full max-w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-teal-700 focus:outline-2 focus:outline-teal-700 disabled:bg-slate-100";
export const primaryButton = "inline-flex cursor-pointer items-center justify-center rounded-xl bg-teal-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 disabled:cursor-wait disabled:opacity-60";
export const secondaryButton = "inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 disabled:cursor-wait disabled:opacity-60";

export function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-teal-950">{label}</label>
      {children}
      {error && <p id={id + "-error"} className="mt-2 text-sm text-rose-700">{error}</p>}
    </div>
  );
}

export function Input({ error, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string | undefined }) {
  return <input {...props} className={inputClass} aria-invalid={Boolean(error)} aria-describedby={error && props.id ? props.id + "-error" : props["aria-describedby"]} />;
}
