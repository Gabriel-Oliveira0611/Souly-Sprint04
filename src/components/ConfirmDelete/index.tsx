import { useEffect, useRef } from "react";
import { ErrorMessage } from "../ApiState";
import { secondaryButton } from "../FormField";

export default function ConfirmDelete({ name, pending, error, onClose, onConfirm }: {
  name: string;
  pending: boolean;
  error: unknown;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    cancel.current?.focus();
    return () => element?.close();
  }, []);

  return (
    <dialog ref={dialog} aria-labelledby="excluir-titulo" aria-describedby="excluir-descricao" onCancel={(event) => { event.preventDefault(); if (!pending) onClose(); }} className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-xl backdrop:bg-slate-950/50">
      <h2 id="excluir-titulo" className="text-xl font-bold text-teal-950">Confirmar exclusão</h2>
      <p id="excluir-descricao" className="mb-6 mt-3 break-words text-sm leading-relaxed">Excluir “{name}”? Esta ação remove o registro do servidor.</p>
      {error !== null && <div className="mb-5"><ErrorMessage error={error} /></div>}
      <div className="flex flex-wrap gap-3">
        <button ref={cancel} type="button" disabled={pending} onClick={onClose} className={secondaryButton}>Cancelar</button>
        <button type="button" disabled={pending} onClick={onConfirm} className="cursor-pointer rounded-xl bg-rose-700 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-700 disabled:cursor-wait disabled:opacity-60">{pending ? "Excluindo…" : "Sim, excluir"}</button>
      </div>
    </dialog>
  );
}
