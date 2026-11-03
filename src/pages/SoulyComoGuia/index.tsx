import TituloPagina from "../../components/TituloPagina";
import CardVideo from "../../components/CardVideo";
import BotaoLink from "../../components/BotaoLink";

export default function SoulyComoGuia() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina
        etiqueta="DO CONCEITO À EXPERIÊNCIA"
        titulo="Souly como guia interativo"
        descricao="Veja como imaginamos a orientação dentro da plataforma: o usuário pergunta, o Souly explica e a interface ajuda a encontrar o próximo passo."
      />
      <p className="mb-8 rounded-xl border border-teal-200 bg-teal-50 px-5 py-4 text-sm leading-relaxed text-teal-900">
        Estes são os vídeos demonstrativos do projeto original. As ações
        acontecem nas gravações, não em um aplicativo conectado a este site. Use
        os controles para reproduzir e pausar.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <CardVideo
          numero="01"
          titulo="Auxílio de navegação"
          descricao="A gravação demonstra como o Souly orientaria uma publicação no feed, indicando visualmente o caminho para realizar a ação."
          arquivo="/videos/souly-navegacao.mp4"
        />
        <CardVideo
          numero="02"
          titulo="Consulta de recompensas"
          descricao="A gravação apresenta uma conversa sobre saldo de pontos, possíveis benefícios e sugestões de missões para continuar a jornada."
          arquivo="/videos/souly-recompensas.mp4"
        />
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-white p-7 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold text-teal-950">
            Entenda o que está por trás da ideia.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Conheça as funcionalidades propostas para o nosso guia.
          </p>
        </div>
        <BotaoLink destino="/sobre-souly">Sobre o Souly</BotaoLink>
      </div>
    </div>
  );
}
