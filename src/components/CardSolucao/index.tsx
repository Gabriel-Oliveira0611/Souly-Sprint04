import BotaoLink from "../BotaoLink/index.tsx";

type CardSolucaoProps = {
  numero: string;
  titulo: string;
  descricao: string;
  imagem: string;
  alt: string;
  destino: string;
};

export default function CardSolucao({
  numero,
  titulo,
  descricao,
  imagem,
  alt,
  destino,
}: CardSolucaoProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <img
        src={imagem}
        alt={alt}
        loading="lazy"
        className="h-56 w-full object-cover md:h-64"
      />
      <div className="flex flex-1 flex-col items-start gap-4 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
          Solução {numero}
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-teal-950">
          {titulo}
        </h3>
        <p className="mb-2 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
          {descricao}
        </p>
        <BotaoLink destino={destino}>Saiba mais</BotaoLink>
      </div>
    </article>
  );
}
