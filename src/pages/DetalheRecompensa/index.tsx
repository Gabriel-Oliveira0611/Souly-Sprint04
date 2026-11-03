import { useCallback, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import { EmptyState, ErrorMessage, Loading } from "../../components/ApiState";
import ConfirmDelete from "../../components/ConfirmDelete";
import { primaryButton, secondaryButton } from "../../components/FormField";
import { useFeedback } from "../../contexts/feedback";
import { useRequest } from "../../hooks/useRequest";
import { ApiError } from "../../services/http";
import { rewardsService } from "../../services/rewards";
import { parseRouteId } from "../../utils/format";

function RewardDetails({ id }: { id: number }) {
  const navigate = useNavigate();
  const { notify } = useFeedback();
  const loader = useCallback((signal: AbortSignal) => rewardsService.find(id, signal), [id]);
  const { state, reload } = useRequest(loader);
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<unknown>(null);
  async function remove() {
    if (lock.current) return;
    lock.current = true;
    setPending(true);
    setError(null);
    try {
      await rewardsService.remove(id);
      notify("Recompensa excluída com sucesso.");
      navigate("/recompensas", { replace: true });
    } catch (failure) {
      setError(failure);
    } finally {
      lock.current = false;
      setPending(false);
    }
  }
  if (state.status === "loading") return <Loading message="Carregando os detalhes da recompensa…" />;
  if (state.status === "error") return state.error instanceof ApiError && state.error.status === 404 ? <EmptyState title="Recompensa não encontrada" description="Ela pode ter sido excluída. Escolha outra recompensa no catálogo." to="/recompensas" label="Ver recompensas" /> : <ErrorMessage error={state.error} onRetry={reload} />;
  const reward = state.data;
  return (
    <>
      <TituloPagina etiqueta={reward.type} titulo={reward.name} descricao={reward.description || "Consulte os detalhes e as condições desta recompensa."} />
      <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-slate-500">Valor cadastrado <strong className="ml-3 text-3xl text-teal-950">{reward.value}</strong></p>
        <div><h2 className="text-lg font-bold text-teal-950">Detalhes e condições</h2><p className="mt-3 whitespace-pre-wrap break-words leading-relaxed">{reward.details || "Nenhuma condição adicional informada."}</p></div>
        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <Link to={"/recompensas/" + id + "/editar"} className={primaryButton}>Editar recompensa</Link>
          <Link to="/missoes/nova" className={secondaryButton}>Criar missão</Link>
          <button type="button" onClick={() => setConfirming(true)} className="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-rose-700">Excluir recompensa</button>
        </div>
      </section>
      {confirming && <ConfirmDelete name={reward.name} pending={pending} error={error} onClose={() => { setConfirming(false); setError(null); }} onConfirm={remove} />}
    </>
  );
}

export default function DetalheRecompensa() {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseRouteId(routeId);
  if (!id) return <Navigate to="/recompensas" replace state={{ notice: "O endereço da recompensa é inválido. Escolha uma recompensa na listagem." }} />;
  return <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16"><Link to="/recompensas" className="mb-7 inline-flex rounded text-sm font-semibold text-teal-800 hover:underline focus-visible:outline-2 focus-visible:outline-teal-700">← Todas as recompensas</Link><RewardDetails key={id} id={id} /></div>;
}
