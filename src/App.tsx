import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Integrantes from "./pages/Integrantes";
import Faq from "./pages/Faq";
import SobreSouly from "./pages/SobreSouly";
import SoulyComoGuia from "./pages/SoulyComoGuia";
import Contato from "./pages/Contato";
import NaoEncontrada from "./pages/NaoEncontrada";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-700">
      <a
        href="#conteudo"
        className="sr-only z-50 bg-teal-950 p-4 text-white focus:not-sr-only focus:absolute"
      >
        Pular para o conteúdo
      </a>
      <Header />

      {/* Apenas o conteúdo das rotas muda. Header e Footer são compartilhados. */}
      <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sobre-souly" element={<SobreSouly />} />
          <Route path="/souly-como-guia" element={<SoulyComoGuia />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
