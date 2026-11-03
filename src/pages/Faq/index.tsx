import TituloPagina from "../../components/TituloPagina";
import ItemFaq from "../../components/ItemFaq";
import BotaoLink from "../../components/BotaoLink";
import { perguntas } from "../../data/perguntas";

export default function Faq() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina
        etiqueta="VAMOS DESCOMPLICAR"
        titulo="Perguntas frequentes"
        descricao="O Souly reuniu as principais dúvidas sobre a nossa proposta. Selecione uma pergunta para ler a resposta."
      />
      <div className="grid items-start gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {perguntas.map((item) => (
            <ItemFaq
              key={item.pergunta}
              pergunta={item.pergunta}
              resposta={item.resposta}
            />
          ))}
        </div>
        <aside className="rounded-2xl border border-teal-100 bg-teal-50 p-7">
          <img
            src="/images/souly-perfil.jpg"
            alt="Souly, o guia do projeto"
            className="mb-6 h-32 w-32 rounded-full object-contain"
          />
          <h2 className="mb-3 text-xl font-bold text-teal-950">
            Ainda ficou com uma dúvida?
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-teal-900">
            Conheça nossa página de contato e veja como foi pensado o
            atendimento da plataforma.
          </p>
          <BotaoLink destino="/contato">Ir para contato</BotaoLink>
        </aside>
      </div>
    </div>
  );
}
