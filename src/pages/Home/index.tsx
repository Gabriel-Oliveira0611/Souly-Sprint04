import BotaoLink from "../../components/BotaoLink";
import CardSolucao from "../../components/CardSolucao";
import { solucoes } from "../../data/solucoes";

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-teal-700">
              FIAP CHALLENGE · SOULUP
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-teal-950 md:text-6xl">
              Pequenas ações.
              <br />
              <span className="text-teal-700">Um futuro melhor.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              Muito prazer, EcoPulse! Conectamos tecnologia e consciência
              ambiental para transformar a sustentabilidade em um hábito
              coletivo.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <BotaoLink destino="/missoes">Explorar missões</BotaoLink>
              <a
                href="#solucoes"
                className="rounded-lg py-3 text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
              >
                Explore as soluções ↓
              </a>
            </div>
            <p className="mt-7 text-xs text-slate-500">
              Uma proposta acadêmica de tecnologia com impacto positivo.
            </p>
          </div>

          <div className="rounded-3xl border border-teal-100 bg-teal-50 p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-3 text-xs font-semibold text-teal-800">
              <span>SEU COMPANHEIRO DE JORNADA</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="rounded-2xl bg-white p-7">
              <img
                src="/images/souly-perfil.jpg"
                alt="Souly, uma arara-azul de asas abertas"
                className="mx-auto aspect-square w-full max-w-64 object-contain"
              />
            </div>
            <div className="mt-5 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-800 text-white"
              >
                S
              </span>
              <div>
                <p className="font-semibold text-teal-950">
                  Olá, eu sou o Souly!
                </p>
                <p className="mt-1 text-sm leading-relaxed text-teal-800">
                  Sua jornada sustentável pode começar com uma pequena atitude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Pilares da proposta"
        className="bg-teal-950 text-white"
      >
        <div className="mx-auto grid max-w-6xl gap-7 px-5 py-8 md:grid-cols-3 md:px-8">
          <div className="flex items-start gap-4">
            <span className="text-sm font-semibold text-teal-300">01</span>
            <div>
              <h2 className="font-semibold">Aprender</h2>
              <p className="mt-1 text-sm text-teal-100">
                Conhecimento que vira atitude.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-sm font-semibold text-teal-300">02</span>
            <div>
              <h2 className="font-semibold">Participar</h2>
              <p className="mt-1 text-sm text-teal-100">
                Pequenos hábitos, impacto coletivo.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-sm font-semibold text-teal-300">03</span>
            <div>
              <h2 className="font-semibold">Transformar</h2>
              <p className="mt-1 text-sm text-teal-100">
                Uma comunidade mais sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solucoes"
        className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20"
      >
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-700">
            IDEIAS QUE SE CONECTAM
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-teal-950 md:text-4xl">
            Nossas soluções
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Quatro caminhos para aproximar tecnologia, pessoas e
            sustentabilidade. Conheça a proposta de cada um.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* map cria um card para cada objeto do array. As props estão explícitas. */}
          {solucoes.map((solucao) => (
            <CardSolucao
              key={solucao.numero}
              numero={solucao.numero}
              titulo={solucao.titulo}
              descricao={solucao.descricao}
              imagem={solucao.imagem}
              alt={solucao.alt}
              destino={solucao.destino}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-teal-100 p-7 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-teal-950">
              Sua próxima ação começa aqui.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-teal-900">
              Conheça as recompensas e encontre uma missão para transformar sua rotina.
            </p>
          </div>
          <BotaoLink destino="/recompensas">Ver recompensas</BotaoLink>
        </div>
      </section>
    </>
  );
}
