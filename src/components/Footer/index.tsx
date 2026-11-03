import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-bold text-teal-950">
            EcoPulse · FIAP Challenge 2026
          </p>
          <p className="mt-1 text-slate-500">
            Projeto acadêmico. Uma ideia para um futuro mais sustentável.
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link to="/sobre-souly" className="font-medium text-teal-800 underline-offset-4 hover:underline">Sobre o Souly</Link>
          <Link to="/souly-como-guia" className="font-medium text-teal-800 underline-offset-4 hover:underline">Souly como guia</Link>
          <Link
            to="/integrantes"
            onClick={() => window.scrollTo(0, 0)}
            className="font-medium text-teal-800 underline-offset-4 hover:underline"
          >
            Nossa equipe
          </Link>
          <Link
            to="/contato"
            onClick={() => window.scrollTo(0, 0)}
            className="font-medium text-teal-800 underline-offset-4 hover:underline"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </footer>
  );
}
