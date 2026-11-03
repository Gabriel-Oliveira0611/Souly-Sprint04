import BotaoLink from "../../components/BotaoLink";

export default function NaoEncontrada() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-20 text-center">
      <p className="mb-4 text-sm font-bold tracking-widest text-teal-700">
        ERRO 404
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-teal-950 md:text-4xl">
        Esse caminho não existe.
      </h1>
      <p className="mb-8 mt-5 leading-relaxed text-slate-600">
        Não encontramos a página que você procurou. Que tal voltar ao início e
        explorar o EcoPulse?
      </p>
      <BotaoLink destino="/">Voltar para a Home</BotaoLink>
    </div>
  );
}
