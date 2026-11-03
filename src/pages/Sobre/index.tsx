import TituloPagina from "../../components/TituloPagina";
import CardRecurso from "../../components/CardRecurso";
import BotaoLink from "../../components/BotaoLink";

export default function Sobre() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina
        etiqueta="NOSSO PROPÓSITO"
        titulo="Sobre o EcoPulse"
        descricao="Acreditamos que a tecnologia pode tornar as escolhas sustentáveis mais simples, acessíveis e presentes no dia a dia."
      />

      <section className="mb-10 grid items-center gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2">
        <img
          src="/images/menu-item-01-img.png"
          alt="Ilustração de pessoas planejando uma plataforma de sustentabilidade"
          className="h-72 w-full object-cover md:h-full"
        />
        <div className="px-6 pb-8 md:py-9 md:pr-8">
          <h2 className="mb-4 text-2xl font-bold text-teal-950">
            Tecnologia a favor do coletivo.
          </h2>
          <p className="mb-4 leading-relaxed text-slate-600">
            O EcoPulse é uma simulação de startup desenvolvida para o SoulUp
            Challenge da FIAP. A proposta conecta gamificação ambiental,
            educação e uma possível rede de benefícios.
          </p>
          <p className="leading-relaxed text-slate-600">
            A ideia é transformar pequenas ações, como economizar energia e
            descartar resíduos corretamente, em uma experiência motivadora. O
            Souly acompanha essa jornada como conceito de guia interativo.
          </p>
        </div>
      </section>

      <section
        aria-label="Missão, visão e valores"
        className="mb-10 grid gap-5 md:grid-cols-3"
      >
        <CardRecurso
          numero="01 · PROPÓSITO"
          titulo="Missão"
          descricao="Conectar tecnologia e consciência ambiental, incentivando comunidades a adotarem hábitos sustentáveis por meio de uma experiência acessível e motivadora."
        />
        <CardRecurso
          numero="02 · DIREÇÃO"
          titulo="Visão"
          descricao="Transformar a sustentabilidade em um hábito coletivo, aproximando pessoas, aprendizado e iniciativas de impacto positivo."
        />
        <CardRecurso
          numero="03 · PRINCÍPIOS"
          titulo="Valores"
          descricao="Sustentabilidade prática, inovação, transparência, inclusão social e cooperação com a comunidade e com futuros parceiros."
        />
      </section>

      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-teal-50 p-7 md:flex-row md:items-center">
        <p className="max-w-xl leading-relaxed text-teal-900">
          Este site apresenta a proposta do projeto. Pontuações, parcerias e
          recompensas não estão integradas a serviços reais.
        </p>
        <BotaoLink destino="/integrantes">Conheça a equipe</BotaoLink>
      </div>
    </div>
  );
}
