import { Link } from "react-router-dom";
import { ApiError } from "../../services/http";

export function Loading({ message = "Buscando informações…" }: { message?: string }) {
  return (
    <div role="status" className="rounded-2xl border border-teal-100 bg-white p-10 text-center">
      <span aria-hidden="true" className="mx-auto mb-4 block size-7 animate-spin rounded-full border-2 border-teal-100 border-t-teal-700 motion-reduce:animate-none" />
      <p className="font-semibold text-teal-950">{message}</p>
      <p className="mt-2 text-sm text-slate-500">O primeiro acesso pode demorar um pouco.</p>
    </div>
  );
}

export function ErrorMessage({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
  return (
    <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-950">
      <p className="font-semibold">{message}</p>
      {error instanceof ApiError && error.details.length > 0 && (
        <ul className="mt-3 list-inside list-disc space-y-1">
          {error.details.map((detail, index) => <li key={index}>{detail}</li>)}
        </ul>
      )}
      {onRetry && <button type="button" onClick={onRetry} className="mt-4 cursor-pointer rounded-lg border border-rose-300 bg-white px-4 py-2 font-semibold hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-rose-700">Tentar novamente</button>}
    </div>
  );
}

export function EmptyState({ title, description, to, label }: { title: string; description: string; to?: string; label?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-teal-200 bg-white px-6 py-12 text-center">
      <h2 className="text-xl font-bold text-teal-950">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">{description}</p>
      {to && label && <Link to={to} className="mt-5 inline-flex rounded-xl bg-teal-800 px-5 py-3 font-semibold text-white hover:bg-teal-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">{label}</Link>}
    </div>
  );
}
