type CardIntegranteProps = {
  nome: string;
  rm: string;
  foto: string;
  github: string;
  linkedin: string;
};

export default function CardIntegrante({
  nome,
  rm,
  foto,
  github,
  linkedin,
}: CardIntegranteProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <img
        src={foto}
        alt={`Foto de ${nome}`}
        loading="lazy"
        className="mb-6 h-28 w-28 rounded-full border-4 border-teal-50 object-cover"
      />
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
        RM {rm}
      </p>
      <h2 className="text-xl font-bold text-teal-950">{nome}</h2>
      <p className="mb-7 mt-3 flex-1 text-sm leading-relaxed text-slate-500">
        Turma 1TDSPW · Análise e Desenvolvimento de Sistemas · FIAP
      </p>
      <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-sm font-semibold text-teal-800">
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          aria-label={`GitHub de ${nome} (nova aba)`}
          className="underline-offset-4 hover:underline"
        >
          GitHub ↗
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`LinkedIn de ${nome} (nova aba)`}
          className="underline-offset-4 hover:underline"
        >
          LinkedIn ↗
        </a>
      </div>
    </article>
  );
}
