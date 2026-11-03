type ItemFaqProps = {
  pergunta: string;
  resposta: string;
};

export default function ItemFaq({ pergunta, resposta }: ItemFaqProps) {
  return (
    <details className="rounded-xl border border-slate-200 bg-white open:border-teal-600">
      <summary className="cursor-pointer rounded-xl px-6 py-5 font-semibold text-teal-950 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-teal-700">
        {pergunta}
      </summary>
      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 md:text-base">
        {resposta}
      </p>
    </details>
  );
}
