import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { caminho: "/", texto: "Início" }, { caminho: "/missoes", texto: "Missões" },
  { caminho: "/recompensas", texto: "Recompensas" }, { caminho: "/sobre", texto: "Sobre" },
  { caminho: "/integrantes", texto: "Integrantes" }, { caminho: "/faq", texto: "FAQ" },
  { caminho: "/contato", texto: "Contato" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-5 md:px-8">
        <Link to="/" aria-label="EcoPulse - página inicial" className="flex w-fit items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:gap-3">
          <img src="/images/headerIcon.png" alt="" className="h-9 w-9 rounded-full sm:h-11 sm:w-11" />
          <span><span className="block text-xl font-bold tracking-tight text-teal-950">EcoPulse<span className="text-teal-600">.</span></span><span className="block text-[8px] tracking-wide text-slate-500 sm:text-xs">TECNOLOGIA COM PROPÓSITO</span></span>
        </Link>
        <button type="button" aria-expanded={open} aria-controls="menu-principal" onClick={() => setOpenPath(open ? null : pathname)} className="cursor-pointer rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-teal-950 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-teal-700 lg:hidden">{open ? "Fechar" : "Menu"}</button>
        <nav id="menu-principal" aria-label="Navegação principal" className={(open ? "block" : "hidden") + " w-full lg:block lg:w-auto"}>
          <ul className="flex flex-col gap-1 lg:flex-row">
            {links.map((link) => <li key={link.caminho}><NavLink to={link.caminho} end={link.caminho === "/"} onClick={() => setOpenPath(null)} className={({ isActive }) => "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 " + (isActive ? "bg-teal-800 text-white" : "text-slate-600 hover:bg-teal-50 hover:text-teal-900")}>{link.texto}</NavLink></li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
}
