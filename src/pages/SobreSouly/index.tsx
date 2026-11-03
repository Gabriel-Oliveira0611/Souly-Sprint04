import TituloPagina from "../../components/TituloPagina";
import CardRecurso from "../../components/CardRecurso";
import BotaoLink from "../../components/BotaoLink";

export default function SobreSouly() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina
        etiqueta="PRAZER, SOULY"
        titulo="Um guia para cada passo."
        descricao="Uma experiência mais próxima, leve e intuitiva. Conheça a arara-azul que representa o assistente da nossa proposta."
      />
      <section className="mb-10 grid items-center gap-8 rounded-3xl border border-teal-100 bg-teal-50 p-6 md:grid-cols-2 md:p-10">
        <div className="rounded-2xl bg-white p-8">
          <img
            src="/images/souly-perfil.jpg"
            alt="Mascote Souly, uma arara-azul simpática de asas abertas"
            className="mx-auto aspect-square w-full max-w-72 object-contain"
          />
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-700">
            CONCEITO DE ASSISTENTE VIRTUAL
          </p>
          <h2 className="text-3xl font-bold text-teal-950">
            Sustentabilidade pode ser uma conversa simples.
          </h2>
          <p className="mb-7 mt-5 leading-relaxed text-teal-900">
            O Souly foi pensado para transformar dúvidas em próximos passos. Ele
            ajudaria o usuário a entender a plataforma, encontrar missões e
            acompanhar suas conquistas.
          </p>
          <BotaoLink destino="/souly-como-guia">
            Veja o Souly como guia
          </BotaoLink>
        </div>
      </section>
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
          FUNCIONALIDADES PROPOSTAS
        </p>
        <p className="mt-3 leading-relaxed text-slate-600">
          Como esse guia poderia participar da jornada do usuário:
        </p>
      </div>
      <section
        aria-label="Funcionalidades propostas do Souly"
        className="grid gap-5 md:grid-cols-3"
      >
        <CardRecurso
          numero="01 · DESCOBRIR"
          titulo="Missões personalizadas"
          descricao="Sugerir desafios cotidianos de acordo com o contexto do usuário, como reduzir o tempo de banho e evitar desperdício de energia."
        />
        <CardRecurso
          numero="02 · APRENDER"
          titulo="Dicas de consumo"
          descricao="Explicar eficiência energética, reciclagem e hábitos sustentáveis com uma linguagem simples e próxima do dia a dia."
        />
        <CardRecurso
          numero="03 · EVOLUIR"
          titulo="Feedback de conquistas"
          descricao="Ajudar a consultar pontos, entender missões e conhecer as possibilidades de recompensa previstas na proposta."
        />
      </section>
      <p className="mt-8 text-sm leading-relaxed text-slate-500">
        Nesta versão, o Souly é apresentado por imagens, textos e vídeos. Não há
        inteligência artificial ou processamento de conversas integrado ao site.
      </p>
    </div>
  );
}
