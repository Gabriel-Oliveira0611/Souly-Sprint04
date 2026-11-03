import { Link } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";
import { integrantes } from "../../data/integrantes";

export default function Contato() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <TituloPagina etiqueta="VAMOS CONVERSAR" titulo="Fale com a equipe" descricao="Tem uma dúvida sobre o EcoPulse ou uma ideia para o projeto? Encontre os responsáveis pelos canais abaixo." />
      <div className="grid items-start gap-7 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl bg-teal-950 p-7 text-white md:p-9">
          <h2 className="text-2xl font-bold">Uma boa ideia começa com diálogo.</h2>
          <p className="mt-4 leading-relaxed text-teal-100">Somos estudantes de Análise e Desenvolvimento de Sistemas da FIAP. Desenvolvemos o EcoPulse para aproximar tecnologia e hábitos sustentáveis.</p>
          <dl className="mt-8 space-y-5 border-t border-teal-800 pt-6 text-sm"><div><dt className="text-teal-200">Instituição</dt><dd className="mt-2 font-semibold">FIAP · São Paulo, Brasil</dd></div><div><dt className="text-teal-200">Turma</dt><dd className="mt-2 font-semibold">1TDSPW · Challenge 2026</dd></div></dl>
          <Link to="/faq" className="mt-8 inline-flex rounded-xl border border-teal-700 px-5 py-3 text-sm font-semibold hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-white">Consultar perguntas frequentes →</Link>
        </section>
        <section aria-label="Contatos dos integrantes" className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white px-6">
          {integrantes.map((integrante) => <div key={integrante.rm} className="py-6"><h2 className="font-bold text-teal-950">{integrante.nome}</h2><p className="mt-1 text-sm text-slate-500">RM {integrante.rm} · 1TDSPW</p><div className="mt-4 flex gap-5 text-sm font-semibold text-teal-800"><a href={integrante.linkedin} target="_blank" rel="noreferrer" className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-teal-700" aria-label={"LinkedIn de " + integrante.nome + " (nova aba)"}>LinkedIn ↗</a><a href={integrante.github} target="_blank" rel="noreferrer" className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-teal-700" aria-label={"GitHub de " + integrante.nome + " (nova aba)"}>GitHub ↗</a></div></div>)}
        </section>
      </div>
    </div>
  );
}
