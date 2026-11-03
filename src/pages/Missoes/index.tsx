import { useSearchParams } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import BotaoLink from "../../components/BotaoLink";
import MissionCard from "../../components/MissionCard";
import { EmptyState, ErrorMessage, Loading } from "../../components/ApiState";
import { inputClass, secondaryButton } from "../../components/FormField";
import { missionsService } from "../../services/missions";
import { useRequest } from "../../hooks/useRequest";

export default function Missoes() {
  const { state, reload } = useRequest(missionsService.list);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("busca") || "";
  const filter = searchParams.get("status") || "TODAS";

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "TODAS") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  }

  const missions = state.status === "success" ? state.data : [];
  const visible = missions.filter((mission) =>
    (filter === "TODAS" || mission.status === filter) &&
    (mission.title + " " + (mission.description || "") + " " + mission.type).toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-5 lg:flex-row">
        <TituloPagina etiqueta="SUA PRÓXIMA ATITUDE" titulo="Missões sustentáveis" descricao="Descubra ações, consulte as regras e ajude a construir uma rotina com mais impacto positivo." />
        <div className="shrink-0"><BotaoLink destino="/missoes/nova">Nova missão</BotaoLink></div>
      </div>
      <section aria-label="Filtrar missões" className="mb-8 grid items-end gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1fr_200px_auto]">
        <div>
          <label htmlFor="buscar-missao" className="mb-2 block text-sm font-semibold text-teal-950">Buscar missão</label>
          <input id="buscar-missao" type="search" value={query} onChange={(event) => setFilter("busca", event.target.value)} placeholder="Título, descrição ou tipo" className={inputClass} />
        </div>
        <div>
          <label htmlFor="status-missoes" className="mb-2 block text-sm font-semibold text-teal-950">Status</label>
          <select id="status-missoes" value={filter} onChange={(event) => setFilter("status", event.target.value)} className={inputClass}>
            <option value="TODAS">Todas</option><option value="ATIVA">Ativas</option><option value="INATIVA">Inativas</option>
          </select>
        </div>
        <button type="button" onClick={reload} className={secondaryButton} disabled={state.status === "loading"}>Atualizar</button>
      </section>
      {state.status === "loading" && <Loading message="Carregando missões…" />}
      {state.status === "error" && <ErrorMessage error={state.error} onRetry={reload} />}
      {state.status === "success" && (
        <>
          <p aria-live="polite" className="mb-5 text-sm text-slate-500">{visible.length} de {missions.length} missões</p>
          {missions.length === 0 ? (
            <EmptyState title="A primeira missão começa aqui" description="Cadastre uma recompensa e crie uma missão para dar início à jornada sustentável." to="/missoes/nova" label="Criar uma missão" />
          ) : visible.length === 0 ? (
            <EmptyState title="Nenhuma missão encontrada" description="Tente outro termo ou remova os filtros para explorar as missões disponíveis." />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((mission) => <MissionCard key={mission.id} mission={mission} />)}</div>
          )}
        </>
      )}
    </div>
  );
}
