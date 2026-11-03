type CardVideoProps = {
  numero: string;
  titulo: string;
  descricao: string;
  arquivo: string;
};

export default function CardVideo({
  numero,
  titulo,
  descricao,
  arquivo,
}: CardVideoProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="bg-teal-50 px-6 py-8">
        <video
          controls
          playsInline
          preload="metadata"
          aria-label={titulo}
          className="mx-auto aspect-[9/20] w-full max-w-60 rounded-2xl bg-slate-950 shadow-lg"
        >
          <source src={arquivo} type="video/mp4" />
          Seu navegador não suporta vídeo. Use o link abaixo para abrir o
          arquivo.
        </video>
      </div>
      <div className="p-6 md:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-700">
          Demonstração {numero}
        </p>
        <h2 className="mb-3 text-2xl font-bold text-teal-950">{titulo}</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600 md:text-base">
          {descricao}
        </p>
        <a
          href={arquivo}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-teal-800 underline underline-offset-4"
        >
          Abrir vídeo em outra aba ↗
        </a>
      </div>
    </article>
  );
}
