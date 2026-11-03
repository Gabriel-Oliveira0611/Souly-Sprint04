import TituloPagina from "../../components/TituloPagina";
import CardIntegrante from "../../components/CardIntegrante";
import { integrantes } from "../../data/integrantes";

export default function Integrantes() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina
        etiqueta="QUEM FAZ ACONTECER"
        titulo="Nossa equipe"
        descricao="Pessoas, ideias e aprendizado compartilhado. Conheça os integrantes do projeto EcoPulse."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {integrantes.map((integrante) => (
          <CardIntegrante
            key={integrante.rm}
            nome={integrante.nome}
            rm={integrante.rm}
            foto={integrante.foto}
            github={integrante.github}
            linkedin={integrante.linkedin}
          />
        ))}
      </div>
      <p className="mt-8 text-sm leading-relaxed text-slate-500">
        Projeto desenvolvido no curso de Análise e Desenvolvimento de Sistemas
        da FIAP, para o SoulUp Challenge.
      </p>
    </div>
  );
}
