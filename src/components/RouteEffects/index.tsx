import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFeedback } from "../../contexts/feedback";

const titles: Record<string, string> = {
  "/": "Início", "/sobre": "Sobre", "/integrantes": "Integrantes",
  "/faq": "Perguntas frequentes", "/contato": "Contato",
  "/sobre-souly": "Sobre o Souly", "/souly-como-guia": "Souly como guia",
};

export default function RouteEffects() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notify } = useFeedback();
  useEffect(() => {
    const title = location.pathname.startsWith("/missoes") ? "Missões" : location.pathname.startsWith("/recompensas") ? "Recompensas" : titles[location.pathname] || "Página não encontrada";
    document.title = title + " | EcoPulse";
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
    else {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("conteudo")?.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const state: unknown = location.state;
    if (state && typeof state === "object" && "notice" in state && typeof state.notice === "string") {
      notify(state.notice);
      navigate(location.pathname + location.search + location.hash, { replace: true, state: null });
    }
  }, [location, navigate, notify]);
  return null;
}
