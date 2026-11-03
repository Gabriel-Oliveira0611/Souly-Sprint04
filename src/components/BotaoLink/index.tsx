import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type BotaoLinkProps = {
  destino: string;
  children: ReactNode;
};

export default function BotaoLink({ destino, children }: BotaoLinkProps) {
  return (
    <Link
      to={destino}
      onClick={() => window.scrollTo(0, 0)}
      className="inline-flex w-fit items-center justify-center gap-3 rounded-xl bg-teal-800 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
