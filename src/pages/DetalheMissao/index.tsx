import { useCallback, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import { EmptyState, ErrorMessage, Loading } from "../../components/ApiState";
import ConfirmDelete from "../../components/ConfirmDelete";
import { primaryButton, secondaryButton } from "../../components/FormField";
import { useFeedback } from "../../contexts/feedback";
import { useRequest } from "../../hooks/useRequest";
import { ApiError } from "../../services/http";
import { missionsService } from "../../services/missions";
import { formatDate, parseRouteId } from "../../utils/format";

function MissionDetails({ id }: { id: number }) {
  const navigate = useNavigate();
  const { notify } = useFeedback();
  const loader = useCallback((signal: AbortSignal) => missionsService.find(id, signal), [id]);
  const { state, reload } = useRequest(loader);
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function changeStatus() {
    if (state.status !== "success" || lock.current) return;
    lock.current = true;
    setPending(true);
    setError(null);
    try {
      await missionsService.changeStatus(id, state.data.status === "ATIVA" ? "INATIVA" : "ATIVA");
      notify("Status da missão atualizado.");
      reload();
    } catch (failure) {
      setError(failure);
    } finally {
      lock.current = false;
      setPending(false);
    }
  }

  async function remove() {
    if (lock.current) return;
    lock.current = true;
    setPending(true);
    setError(null);
    try {
      await missionsService.remove(id);
      notify("Missão excluída com sucesso.");
      navigate("/missoes", { replace: true });
    } catch (failure) {
      setError(failure);
    } finally {
      lock.current = false;
      setPending(false);
    }
  }

  if (state.status === "loading") return <Loading message="Carregando os detalhes da missão…" />;
  if (state.status === "error") {
    return state.error instanceof ApiError && state.error.status === 404
      ? <EmptyState title="Missão não encontrada" description="Esta missão pode ter sido excluída. Explore as outras missões disponíveis." to="/missoes" label="Ver missões" />
      : <ErrorMessage error={state.error} onRetry={reload} />;
  }
  const mission = state.data;
  return (
    <>
      <TituloPagina etiqueta={mission.type} titulo={mission.title} descricao={mission.description || "Conheça as regras, o período e as recompensas desta missão."} />
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <section className="min-w-0 space-y-7 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <span className={mission.status === "ATIVA" ? "rounded-full bg-teal-100 px-4 py-2 text-teal-900" : "rounded-full bg-slate-100 px-4 py-2 text-slate-600"}>{mission.status === "ATIVA" ? "Ativa" : "Inativa"}</span>
            <span className="rounded-full bg-slate-50 px-4 py-2 text-slate-600">{mission.eligibleNow ? "Disponível no período atual" : "Indisponível no momento"}</span>
          </div>
          <div><h2 className="text-xl font-bold text-teal-950">Como funciona</h2><p className="mt-3 whitespace-pre-wrap break-words leading-relaxed">{mission.rules || "Nenhuma regra adicional informada."}</p></div>
          <dl className="grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div><dt className="text-sm text-slate-500">Início</dt><dd className="mt-2 font-medium">{formatDate(mission.startDate)}</dd></div>
            <div><dt className="text-sm text-slate-500">Término</dt><dd className="mt-2 font-medium">{formatDate(mission.endDate)}</dd></div>
          </dl>
          {error !== null && !confirming && <ErrorMessage error={error} />}
          <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
            <Link to={"/missoes/" + id + "/editar"} className={primaryButton}>Editar missão</Link>
            <button type="button" onClick={changeStatus} disabled={pending} className={secondaryButton}>{pending ? "Aguarde…" : mission.status === "ATIVA" ? "Desativar missão" : "Ativar missão"}</button>
            <button type="button" disabled={pending} onClick={() => { setError(null); setConfirming(true); }} className="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-rose-700 disabled:opacity-60">Excluir missão</button>
          </div>
        </section>
        <aside className="min-w-0 rounded-2xl border border-teal-100 bg-teal-50 p-6">
          <h2 className="text-xl font-bold text-teal-950">Recompensas da missão</h2>
          <p className="mt-2 text-sm text-teal-800">Benefícios previstos para esta ação.</p>
          <ul className="mt-6 space-y-4">
            {mission.rewards.map((reward) => <li key={reward.id} className="rounded-xl bg-white p-4"><Link to={"/recompensas/" + reward.id} className="break-words font-bold text-teal-950 hover:underline">{reward.name}</Link><p className="mt-2 break-words text-sm text-slate-500">{reward.type} · valor {reward.value}</p></li>)}
          </ul>
          {mission.rewards.length === 0 && <p className="mt-4 text-sm text-slate-600">Nenhuma recompensa vinculada.</p>}
        </aside>
      </div>
      {confirming && <ConfirmDelete name={mission.title} pending={pending} error={error} onClose={() => { setConfirming(false); setError(null); }} onConfirm={remove} />}
    </>
  );
}

export default function DetalheMissao() {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseRouteId(routeId);
  if (!id) return <Navigate to="/missoes" replace state={{ notice: "O endereço da missão é inválido. Escolha uma missão na listagem." }} />;
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <Link to="/missoes" className="mb-7 inline-flex rounded text-sm font-semibold text-teal-800 hover:underline focus-visible:outline-2 focus-visible:outline-teal-700">← Todas as missões</Link>
      <MissionDetails key={id} id={id} />
    </div>
  );
}
