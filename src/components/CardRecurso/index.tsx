type CardRecursoProps = {
  numero: string;
  titulo: string;
  descricao: string;
};

export default function CardRecurso({
  numero,
  titulo,
  descricao,
}: CardRecursoProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <p className="mb-5 text-sm font-bold text-teal-700">{numero}</p>
      <h2 className="mb-3 text-xl font-bold text-teal-950">{titulo}</h2>
      <p className="text-sm leading-relaxed text-slate-600 md:text-base">
        {descricao}
      </p>
    </article>
  );
}
