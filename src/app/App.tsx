import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Lenis from "lenis";
import { globalCss } from "./lib/theme";
import { Nav, Footer, FloatingCTA, ScrollToTop } from "./components/layout";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Exames from "./pages/Exames";
import Zumbido from "./pages/Zumbido";
import Equipe from "./pages/Equipe";
import Contato from "./pages/Contato";

/**
 * Scroll suave (Lenis). Desligado para quem prefere movimento reduzido —
 * parte do público da Synapse trata vertigem/tontura.
 */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      anchors: true,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <style>{globalCss}</style>
      <SmoothScroll />
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/tratamento-do-zumbido" element={<Zumbido />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
        <Footer />
        <FloatingCTA />
      </div>
    </BrowserRouter>
  );
}
