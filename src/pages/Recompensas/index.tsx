import { Link } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import BotaoLink from "../../components/BotaoLink";
import { EmptyState, ErrorMessage, Loading } from "../../components/ApiState";
import { secondaryButton } from "../../components/FormField";
import { useRequest } from "../../hooks/useRequest";
import { rewardsService } from "../../services/rewards";

export default function Recompensas() {
  const { state, reload } = useRequest(rewardsService.list);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-5 lg:flex-row">
        <TituloPagina etiqueta="ATITUDES QUE GERAM VALOR" titulo="Catálogo de recompensas" descricao="Conheça os benefícios cadastrados e vincule recompensas às missões sustentáveis." />
        <div className="shrink-0"><BotaoLink destino="/recompensas/nova">Nova recompensa</BotaoLink></div>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-500">Os valores representam as unidades definidas no tipo e nos detalhes de cada recompensa.</p>
        <button type="button" onClick={reload} disabled={state.status === "loading"} className={secondaryButton}>Atualizar</button>
      </div>
      {state.status === "loading" && <Loading message="Carregando recompensas…" />}
      {state.status === "error" && <ErrorMessage error={state.error} onRetry={reload} />}
      {state.status === "success" && (state.data.length === 0 ? <EmptyState title="O catálogo está começando" description="Crie a primeira recompensa para depois vinculá-la a uma missão." to="/recompensas/nova" label="Cadastrar recompensa" /> : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {state.data.map((reward) => (
            <article key={reward.id} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6">
              <p className="mb-4 break-words text-xs font-bold uppercase tracking-widest text-teal-700">{reward.type}</p>
              <h2 className="break-words text-xl font-bold text-teal-950">{reward.name}</h2>
              <p className="mb-6 mt-3 line-clamp-3 flex-1 break-words text-sm leading-relaxed text-slate-600">{reward.description || "Consulte os detalhes desta recompensa."}</p>
              <p className="mb-5 text-sm text-slate-500">Valor <strong className="ml-2 text-xl text-teal-950">{reward.value}</strong></p>
              <Link to={"/recompensas/" + reward.id} className="rounded-xl bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-900 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-teal-700" aria-label={"Ver detalhes de " + reward.name}>Ver detalhes →</Link>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
