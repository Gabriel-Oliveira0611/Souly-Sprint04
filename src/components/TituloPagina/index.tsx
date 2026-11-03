type TituloPaginaProps = {
  etiqueta: string;
  titulo: string;
  descricao: string;
};

export default function TituloPagina({
  etiqueta,
  titulo,
  descricao,
}: TituloPaginaProps) {
  return (
    <div className="mb-10 min-w-0 max-w-2xl break-words">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-700">
        {etiqueta}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-teal-950 md:text-5xl">
        {titulo}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
        {descricao}
      </p>
    </div>
  );
}
