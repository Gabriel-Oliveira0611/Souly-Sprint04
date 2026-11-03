import { useCallback, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import { EmptyState, ErrorMessage, Loading } from "../../components/ApiState";
import { Field, Input, inputClass, primaryButton, secondaryButton } from "../../components/FormField";
import { useFeedback } from "../../contexts/feedback";
import { useRequest } from "../../hooks/useRequest";
import { rewardsService } from "../../services/rewards";
import { ApiError } from "../../services/http";
import type { Reward } from "../../types/api";
import { parseRouteId } from "../../utils/format";
import { rewardInput, validateReward } from "../../utils/validation";
import type { FieldErrors, RewardDraft } from "../../utils/validation";

function RewardForm({ reward }: { reward: Reward | null }) {
  const navigate = useNavigate();
  const { notify } = useFeedback();
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [errors, setErrors] = useState<FieldErrors<RewardDraft>>({});
  const [draft, setDraft] = useState<RewardDraft>({
    name: reward?.name || "",
    description: reward?.description || "",
    type: reward?.type || "",
    value: reward ? String(reward.value) : "",
    details: reward?.details || "",
  });
  function change(field: keyof RewardDraft, value: string) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const validation = validateReward(draft);
    setErrors(validation);
    setError(null);
    if (Object.keys(validation).length) {
      const field = Object.keys(validation)[0];
      if (field) document.getElementById("recompensa-" + field)?.focus();
      return;
    }
    lock.current = true;
    setPending(true);
    try {
      const saved = reward ? await rewardsService.update(reward.id, rewardInput(draft)) : await rewardsService.create(rewardInput(draft));
      notify(reward ? "Recompensa atualizada com sucesso." : "Recompensa cadastrada. Agora você pode vinculá-la a uma missão.");
      navigate("/recompensas/" + saved.id, { replace: true });
    } catch (failure) {
      setError(failure);
    } finally {
      lock.current = false;
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit} noValidate aria-busy={pending} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8">
      <p className="mb-6 text-sm text-slate-500">Campos com * são obrigatórios.</p>
      {Object.keys(errors).length > 0 && <p role="alert" className="mb-5 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">Confira os campos indicados antes de salvar.</p>}
      <fieldset disabled={pending} className="min-w-0 space-y-5">
        <Field id="recompensa-name" label="Nome *" error={errors.name}><Input id="recompensa-name" value={draft.name} onChange={(e) => change("name", e.target.value)} required minLength={2} maxLength={150} error={errors.name} placeholder="Ex.: Selo Guardião da Água" /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="recompensa-type" label="Tipo *" error={errors.type}><Input id="recompensa-type" value={draft.type} onChange={(e) => change("type", e.target.value)} required maxLength={80} error={errors.type} placeholder="Ex.: PONTOS ou SELO" /></Field>
          <Field id="recompensa-value" label="Valor *" error={errors.value}><Input id="recompensa-value" type="number" min={0} max={2147483647} step={1} value={draft.value} onChange={(e) => change("value", e.target.value)} required error={errors.value} /></Field>
        </div>
        <Field id="recompensa-description" label="Descrição" error={errors.description}><textarea id="recompensa-description" rows={4} maxLength={2000} value={draft.description} onChange={(e) => change("description", e.target.value)} className={inputClass} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "recompensa-description-error" : undefined} /></Field>
        <Field id="recompensa-details" label="Detalhes e condições" error={errors.details}><textarea id="recompensa-details" rows={4} maxLength={2000} value={draft.details} onChange={(e) => change("details", e.target.value)} className={inputClass} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "recompensa-details-error" : undefined} placeholder="Explique as unidades do valor e as condições do benefício." /></Field>
        {error !== null && <ErrorMessage error={error} />}
        <button type="submit" disabled={pending} className={primaryButton}>{pending ? "Salvando…" : reward ? "Salvar alterações" : "Cadastrar recompensa"}</button>
      </fieldset>
      <Link to={reward ? "/recompensas/" + reward.id : "/recompensas"} className={secondaryButton + " mt-4"}>Cancelar</Link>
    </form>
  );
}

export default function FormularioRecompensa() {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseRouteId(routeId);
  const loader = useCallback((signal: AbortSignal) => id ? rewardsService.find(id, signal) : Promise.resolve(null), [id]);
  const { state, reload } = useRequest(loader);
  if (routeId && !id) return <Navigate to="/recompensas" replace state={{ notice: "O endereço da recompensa é inválido. Escolha uma recompensa na listagem." }} />;
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina etiqueta="GESTÃO DE RECOMPENSAS" titulo={id ? "Editar recompensa" : "Criar uma recompensa"} descricao="Cadastre benefícios que podem ser associados às missões do EcoPulse." />
      {state.status === "loading" && <Loading />}
      {state.status === "error" && (state.error instanceof ApiError && state.error.status === 404 ? <EmptyState title="Recompensa não encontrada" description="Volte para o catálogo e escolha outra recompensa." to="/recompensas" label="Ver recompensas" /> : <ErrorMessage error={state.error} onRetry={reload} />)}
      {state.status === "success" && <RewardForm key={routeId || "nova"} reward={state.data} />}
    </div>
  );
}
