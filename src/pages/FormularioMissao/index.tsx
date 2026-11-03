import { useCallback, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import { EmptyState, ErrorMessage, Loading } from "../../components/ApiState";
import { Field, Input, inputClass, primaryButton, secondaryButton } from "../../components/FormField";
import { useFeedback } from "../../contexts/feedback";
import { useRequest } from "../../hooks/useRequest";
import { missionsService } from "../../services/missions";
import { rewardsService } from "../../services/rewards";
import { ApiError } from "../../services/http";
import type { Mission, MissionStatus, Reward } from "../../types/api";
import { parseRouteId, toLocalInput } from "../../utils/format";
import { missionCreateInput, missionInput, validateMission } from "../../utils/validation";
import type { FieldErrors, MissionDraft } from "../../utils/validation";

function MissionForm({ mission, rewards }: { mission: Mission | null; rewards: Reward[] }) {
  const navigate = useNavigate();
  const { notify } = useFeedback();
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [errors, setErrors] = useState<FieldErrors<MissionDraft>>({});
  const [draft, setDraft] = useState<MissionDraft>({
    title: mission?.title || "",
    description: mission?.description || "",
    type: mission?.type || "",
    rules: mission?.rules || "",
    startDate: toLocalInput(mission?.startDate || new Date().toISOString()),
    endDate: mission?.endDate ? toLocalInput(mission.endDate) : "",
    status: mission?.status || "ATIVA",
    rewardIds: mission?.rewards.map((reward) => reward.id) || [],
  });

  function change<K extends keyof MissionDraft>(field: K, value: MissionDraft[K]) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const validation = validateMission(draft, !mission);
    setErrors(validation);
    setError(null);
    if (Object.keys(validation).length) {
      const field = Object.keys(validation)[0];
      if (field) document.getElementById("missao-" + field)?.focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    try {
      const saved = mission
        ? await missionsService.update(mission.id, missionInput(draft))
        : await missionsService.create(missionCreateInput(draft));
      notify(mission ? "Missão atualizada com sucesso." : "Missão cadastrada com sucesso.");
      navigate("/missoes/" + saved.id, { replace: true });
    } catch (failure) {
      setError(failure);
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  if (!mission && rewards.length === 0) {
    return <EmptyState title="Cadastre uma recompensa primeiro" description="Toda missão precisa oferecer ao menos uma recompensa. Depois do cadastro, volte aqui para criar sua missão." to="/recompensas/nova" label="Cadastrar recompensa" />;
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8" aria-busy={pending}>
      <p className="mb-7 text-sm text-slate-500">Campos com * são obrigatórios. As datas usam o horário do seu dispositivo.</p>
      {Object.keys(errors).length > 0 && <p role="alert" className="mb-5 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">Confira os campos indicados antes de salvar.</p>}
      <fieldset disabled={pending} className="min-w-0 space-y-5">
        <Field id="missao-title" label="Título *" error={errors.title}><Input id="missao-title" value={draft.title} onChange={(e) => change("title", e.target.value)} minLength={2} maxLength={150} required error={errors.title} placeholder="Ex.: Uma semana sem copos descartáveis" /></Field>
        <Field id="missao-type" label="Tipo *" error={errors.type}><Input id="missao-type" value={draft.type} onChange={(e) => change("type", e.target.value)} maxLength={80} required error={errors.type} placeholder="Ex.: Reciclagem, energia ou mobilidade" /></Field>
        <Field id="missao-description" label="Descrição" error={errors.description}><textarea id="missao-description" rows={4} maxLength={2000} value={draft.description} onChange={(e) => change("description", e.target.value)} className={inputClass} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "missao-description-error" : undefined} /></Field>
        <Field id="missao-rules" label="Regras" error={errors.rules}><textarea id="missao-rules" rows={4} maxLength={4000} value={draft.rules} onChange={(e) => change("rules", e.target.value)} className={inputClass} aria-invalid={Boolean(errors.rules)} aria-describedby={errors.rules ? "missao-rules-error" : undefined} /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="missao-startDate" label="Início *" error={errors.startDate}><Input id="missao-startDate" type="datetime-local" value={draft.startDate} onChange={(e) => change("startDate", e.target.value)} required error={errors.startDate} /></Field>
          <Field id="missao-endDate" label="Término (opcional)" error={errors.endDate}><Input id="missao-endDate" type="datetime-local" value={draft.endDate} onChange={(e) => change("endDate", e.target.value)} error={errors.endDate} /></Field>
        </div>
        {!mission && (
          <>
            <Field id="missao-status" label="Status inicial"><select id="missao-status" value={draft.status} onChange={(e) => change("status", e.target.value as MissionStatus)} className={inputClass}><option value="ATIVA">Ativa</option><option value="INATIVA">Inativa</option></select></Field>
            <fieldset id="missao-rewardIds" tabIndex={-1} aria-describedby={errors.rewardIds ? "missao-rewardIds-error" : "ajuda-recompensas"} aria-invalid={Boolean(errors.rewardIds)} className="min-w-0 rounded-xl border border-slate-200 p-5 focus:outline-2 focus:outline-teal-700">
              <legend className="px-2 text-sm font-semibold text-teal-950">Recompensas *</legend>
              <p id="ajuda-recompensas" className="mb-4 text-sm text-slate-500">Selecione uma ou mais recompensas do catálogo.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {rewards.map((reward) => (
                  <label key={reward.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-teal-50">
                    <input type="checkbox" value={reward.id} checked={draft.rewardIds.includes(reward.id)} onChange={(e) => change("rewardIds", e.target.checked ? [...draft.rewardIds, reward.id] : draft.rewardIds.filter((id) => id !== reward.id))} className="mt-1 size-4 shrink-0 accent-teal-800" />
                    <span className="min-w-0 break-words text-sm"><span className="block font-semibold text-teal-950">{reward.name}</span><span className="mt-1 block text-slate-500">{reward.type} · valor {reward.value}</span></span>
                  </label>
                ))}
              </div>
              {errors.rewardIds && <p id="missao-rewardIds-error" className="mt-3 text-sm text-rose-700">{errors.rewardIds}</p>}
            </fieldset>
          </>
        )}
        {mission && <p className="text-sm text-slate-500">As recompensas vinculadas são mantidas. Você pode alterar o status na página de detalhes.</p>}
        {error !== null && <ErrorMessage error={error} />}
        <button type="submit" disabled={pending} className={primaryButton}>{pending ? "Salvando…" : mission ? "Salvar alterações" : "Cadastrar missão"}</button>
      </fieldset>
      <Link to={mission ? "/missoes/" + mission.id : "/missoes"} className={secondaryButton + " mt-4"}>Cancelar</Link>
    </form>
  );
}

export default function FormularioMissao() {
  const { id: routeId } = useParams<{ id: string }>();
  const id = parseRouteId(routeId);
  const loader = useCallback(async (signal: AbortSignal) => {
    if (routeId && !id) return { mission: null, rewards: [] };
    if (id) return { mission: await missionsService.find(id, signal), rewards: [] };
    return { mission: null, rewards: await rewardsService.list(signal) };
  }, [id, routeId]);
  const { state, reload } = useRequest(loader);
  if (routeId && !id) return <Navigate to="/missoes" replace state={{ notice: "O endereço da missão é inválido. Escolha uma missão na listagem." }} />;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina etiqueta="GESTÃO DE MISSÕES" titulo={id ? "Editar missão" : "Criar uma missão"} descricao="Transforme uma ação sustentável em um objetivo claro, com regras, período e recompensas." />
      {state.status === "loading" && <Loading />}
      {state.status === "error" && (state.error instanceof ApiError && state.error.status === 404 ? <EmptyState title="Missão não encontrada" description="Ela pode ter sido excluída. Volte para a lista e escolha outra missão." to="/missoes" label="Ver missões" /> : <ErrorMessage error={state.error} onRetry={reload} />)}
      {state.status === "success" && <MissionForm key={routeId || "nova"} mission={state.data.mission} rewards={state.data.rewards} />}
    </div>
  );
}
