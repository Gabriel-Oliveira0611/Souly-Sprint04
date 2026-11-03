import { Link } from "react-router-dom";
import type { Mission } from "../../types/api";
import { formatDate } from "../../utils/format";

export default function MissionCard({ mission }: { mission: Mission }) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className={mission.status === "ATIVA" ? "rounded-full bg-teal-100 px-3 py-1.5 text-teal-900" : "rounded-full bg-slate-100 px-3 py-1.5 text-slate-600"}>{mission.status === "ATIVA" ? "Ativa" : "Inativa"}</span>
        <span className="break-all rounded-full border border-slate-200 px-3 py-1.5 text-slate-600">{mission.type}</span>
      </div>
      <h2 className="break-words text-xl font-bold text-teal-950">
        <Link to={"/missoes/" + mission.id} className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-teal-700">{mission.title}</Link>
      </h2>
      <p className="mb-6 mt-3 line-clamp-3 flex-1 break-words text-sm leading-relaxed text-slate-600">{mission.description || "Explore as regras e recompensas desta missão."}</p>
      <dl className="mb-5 space-y-2 border-t border-slate-100 pt-5 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-slate-500">Recompensas</dt><dd className="font-semibold text-teal-950">{mission.rewards.length}</dd></div>
        <div><dt className="text-slate-500">Início</dt><dd className="mt-1 font-medium">{formatDate(mission.startDate)}</dd></div>
      </dl>
      <Link to={"/missoes/" + mission.id} className="flex items-center justify-between rounded-xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-900 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-teal-700" aria-label={"Ver detalhes de " + mission.title}>Ver detalhes <span aria-hidden="true">→</span></Link>
    </article>
  );
}
