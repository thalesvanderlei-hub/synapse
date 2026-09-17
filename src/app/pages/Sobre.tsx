import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Ear, Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  C,
  ease,
  delay,
  Eyebrow,
  MiniWave,
  TextReveal,
  WaveFormation,
  useRevealOnScroll,
} from "../lib/theme";
import { WHATSAPP } from "../lib/data";
import heroAmbiente from "../../assets/fotos/ambiente/3.webp";

const HERO_IMG = heroAmbiente;

// Fotos reais do ambiente — largar arquivos em src/assets/fotos/ambiente/.
// A galeria se monta sozinha com o que houver na pasta (ordem alfabética do nome).
const AMBIENTE = Object.entries(
  import.meta.glob<string>(
    "../../assets/fotos/ambiente/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    { eager: true, query: "?url", import: "default" },
  ),
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url]) => ({ url, name: path.split("/").pop() ?? "" }));

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const fn = () => setDesktop(mql.matches);
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, []);
  return desktop;
}

// ─── Imagem com reveal da esquerda para a direita (padrão da Home) ───────────

function ClipReveal({
  src,
  alt,
  aspect = "5/4",
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  // Revela ao entrar na tela (IntersectionObserver) COM fallback por timeout —
  // assim a imagem nunca fica presa escondida (ex.: se o IO não disparar no mobile).
  useEffect(() => {
    if (reduced || show) return;
    const el = ref.current;
    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setShow(true);
      }
    };
    let io: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => entries.some((e) => e.isIntersecting) && reveal(),
        { threshold: 0.15 },
      );
      io.observe(el);
    }
    const fallback = setTimeout(reveal, 2000);
    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, [reduced, show]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { clipPath: "inset(0 100% 0 0 round 28px)" }}
      animate={
        reduced
          ? undefined
          : { clipPath: show ? "inset(0 0% 0 0 round 28px)" : "inset(0 100% 0 0 round 28px)" }
      }
      transition={{ duration: 1.1, ease }}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: "28px" }}
    >
      <motion.div
        initial={reduced ? false : { scale: 1.18 }}
        animate={reduced ? undefined : { scale: show ? 1 : 1.18 }}
        transition={{ duration: 1.3, ease }}
        className="relative bg-[#EEFBFF]"
        style={{ aspectRatio: aspect }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

// ─── Imagem com reveal em fatias + parallax sutil ────────────────────────────

function SliceReveal({
  src,
  alt,
  aspect = "5/4",
  className = "",
  parallax,
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  parallax?: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const { ref, show } = useRevealOnScroll<HTMLDivElement>();
  const slices = 5;
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: "28px" }}
    >
      <motion.div
        className="relative bg-[#EEFBFF]"
        style={{
          aspectRatio: aspect,
          ...(parallax && !reduced ? { y: parallax, scale: 1.1 } : {}),
        }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>

      {!reduced && (
        <div className="absolute inset-0 flex pointer-events-none" aria-hidden="true">
          {Array.from({ length: slices }, (_, i) => (
            <motion.span
              key={i}
              className="flex-1 bg-white"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: show ? 0 : 1 }}
              transition={{ duration: 0.85, ease, delay: 0.1 + i * 0.09 }}
              style={{ transformOrigin: "top" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Hero: Quem somos ────────────────────────────────────────────────────────

type HeroBox = {
  top: number;
  left: number;
  w: number;
  h: number;
  sw: number;
  sh: number;
};

function HeroImage({ radius = 32 }: { radius?: number }) {
  return (
    <div
      className="relative overflow-hidden bg-[#c7ecf8] h-full w-full"
      style={{ borderRadius: radius }}
    >
      <img
        src={HERO_IMG}
        alt="Ambiente de clínica moderno e acolhedor"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(2,23,59,0.3) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

function BrandCard({ delaySec = 0.7 }: { delaySec?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease, delay: delaySec }}
      className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-[#02173B]/12 flex items-center gap-3"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
        style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
      >
        <MiniWave />
      </div>
      <div>
        <div className="text-[#02173B] text-[0.82rem] font-semibold leading-tight">
          Synapse Reabilitação Neurofuncional
        </div>
        <div className="text-[#02173B]/50 text-[0.72rem]">
          Fonoaudiologia e Otorrinolaringologia
        </div>
      </div>
    </motion.div>
  );
}

function QuemSomos() {
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  const heroRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<HeroBox | null>(null);

  const entryFx = desktop && !reduced;

  // Mede o destino da imagem: ela entra cobrindo a hero inteira e assenta ali.
  useLayoutEffect(() => {
    if (!entryFx) {
      setBox(null);
      return;
    }
    const measure = () => {
      const sec = heroRef.current;
      const slot = slotRef.current;
      if (!sec || !slot) return;
      const s = sec.getBoundingClientRect();
      const r = slot.getBoundingClientRect();
      setBox({
        top: r.top - s.top,
        left: r.left - s.left,
        w: r.width,
        h: r.height,
        sw: s.width,
        sh: s.height,
      });
    };
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [entryFx]);

  const overlayActive = entryFx && box !== null;

  return (
    <section
      ref={heroRef}
      className="relative bg-[#EEFBFF] overflow-hidden pt-[120px] pb-16 lg:pt-[160px] lg:pb-24"
    >
      <div
        className="absolute top-0 right-0 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(82,212,255,0.22) 0%, transparent 70%)",
          transform: "translate(28%, -34%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(66,173,208,0.13) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <motion.div {...delay(entryFx ? 0.75 : 0)}>
                      </motion.div>
          <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.3rem] font-semibold text-[#02173B] leading-[1.04] tracking-[-0.03em] mb-7">
            <TextReveal text="Quem somos" delay={entryFx ? 0.85 : 0.08} />
          </h1>
          <motion.p
            {...delay(entryFx ? 1 : 0.2)}
            className="text-[#02173B]/58 text-[1rem] leading-relaxed mb-9 max-w-[560px]"
          >
            A Synapse Reabilitação Neurofuncional é uma clínica especializada
            nas diversas áreas da Fonoaudiologia, com atuação em motricidade
            orofacial, disfagia, voz, linguagem e audiologia. Foi criada com o
            propósito de oferecer um atendimento integrado, científico e
            humanizado para crianças, adultos e idosos.
          </motion.p>
          <motion.div {...delay(entryFx ? 1.12 : 0.3)} className="flex flex-wrap gap-3.5">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.95rem] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#52D4FF]/30 hover:-translate-y-0.5"
            >
              Agende agora
              <ArrowRight size={16} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.95rem] whitespace-nowrap ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
            >
              Conheça nossos serviços
            </Link>
          </motion.div>
        </div>

        {/* Slot da imagem — no desktop ela entra como overlay full-bleed */}
        <div
          ref={slotRef}
          className="relative order-1 lg:order-2 h-[340px] sm:h-[440px] lg:h-[560px]"
        >
          {!overlayActive && (
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.25 }}
              className="relative h-full w-full"
            >
              <HeroImage />
              <BrandCard />
            </motion.div>
          )}
        </div>
      </div>

      {/* Entrada: cobre a hero inteira e se transforma até o estágio final */}
      {overlayActive && (
        <motion.div
          className="absolute z-10"
          initial={{
            top: 0,
            left: 0,
            width: box!.sw,
            height: box!.sh,
          }}
          animate={{
            top: box!.top,
            left: box!.left,
            width: box!.w,
            height: box!.h,
          }}
          transition={{ duration: 1.25, ease, delay: 0.2 }}
        >
          <motion.div
            className="relative h-full w-full overflow-hidden bg-[#c7ecf8]"
            initial={{ borderRadius: 0 }}
            animate={{ borderRadius: 32 }}
            transition={{ duration: 1.25, ease, delay: 0.2 }}
          >
            <img
              src={HERO_IMG}
              alt="Ambiente de clínica moderno e acolhedor"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,23,59,0.3) 0%, transparent 50%)",
              }}
            />
          </motion.div>
          <BrandCard delaySec={1.4} />
        </motion.div>
      )}
    </section>
  );
}

// ─── Forte atuação em audição (parágrafo 2 do Quem somos) ────────────────────

function FocoAudicao() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        {/* Imagem com camadas decorativas sutis em volta */}
        <div className="relative order-2 lg:order-1">
          <div
            aria-hidden="true"
            className="synapse-glow absolute -top-12 -left-12 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(82,212,255,0.35) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <ClipReveal
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=720&fit=crop&auto=format&q=80"
            alt="Profissional de saúde utilizando tecnologia no atendimento"
            className="relative z-10"
          />
          <div
            className="float-soft absolute -top-5 -left-5 z-20 w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_16px_40px_rgba(2,23,59,0.2)]"
            style={{ backgroundColor: C.primary, animationDelay: "1.2s" }}
          >
            <Ear size={22} strokeWidth={2} style={{ color: C.navy }} aria-hidden="true" />
          </div>
        </div>
        <motion.div {...delay(0.14)} className="order-1 lg:order-2">
                    <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] mb-6">
            <TextReveal text="Ciência e tecnologia a serviço da audição" />
          </h2>
          <p className="text-[#02173B]/58 text-[1rem] leading-relaxed mb-7">
            Embora contemple diferentes especialidades, a clínica tem forte
            atuação na área da audição, com avaliações e tratamentos voltados à
            perda auditiva, ao processamento auditivo, ao zumbido, à tontura, ao
            equilíbrio e à sensibilidade aos sons. Cada caso é conduzido de
            forma individualizada, unindo profissionais qualificados, tecnologia
            e práticas baseadas em evidências científicas.
          </p>
          <MiniWave />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Como cuidamos — intro centrada ──────────────────────────────────────────

function ComoCuidamos() {
  return (
    <section className="py-28 lg:py-32 bg-[#EEFBFF]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...delay(0)} className="flex flex-col items-center text-center">
                    <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] mb-6">
            <TextReveal text="Como cuidamos" />
          </h2>
          <p className="max-w-[62ch] text-[#02173B]/58 text-[1rem] leading-relaxed">
            Na Synapse, cada atendimento nasce da escuta atenta antes de
            qualquer indicação técnica. Entendemos que cuidar da audição é
            cuidar da forma como cada pessoa se comunica, se equilibra e se
            relaciona com o mundo ao seu redor, e é esse entendimento que
            orienta cada avaliação e cada plano de tratamento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Ética, ciência e humanização — seção com pin + reveal por scroll ────────

const ETICA_TEXT =
  "Ética, ciência e humanização caminham juntas em nosso trabalho. Respeitamos a individualidade de cada paciente, com responsabilidade em cada decisão clínica e compromisso genuíno com a evolução de quem confia seu cuidado à nossa equipe.";
const ETICA_ACCENT_WORDS = 4; // "Ética, ciência e humanização"

function ScrubWord({
  progress,
  start,
  end,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  accent: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  return (
    <motion.span
      style={{ opacity, color: accent ? C.primary : undefined }}
      className="inline"
    >
      {children}
    </motion.span>
  );
}

function EticaScrollLock() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Progresso medido direto no rect (sem cache) — imune a mudanças de layout.
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      scrollYProgress.set(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);

  // Fundo azul marinho expande em círculo enquanto a seção está "travada".
  const circle = useTransform(
    scrollYProgress,
    [0.04, 0.32],
    ["circle(0% at 50% 55%)", "circle(140% at 50% 55%)"],
  );
  const waveProgress = useTransform(scrollYProgress, [0.14, 0.5], [0, 1]);

  const words = ETICA_TEXT.split(" ");

  if (reduced) {
    return (
      <section className="py-28 bg-[#02173B]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[1.3rem] md:text-[1.65rem] font-medium text-white leading-[1.5] tracking-[-0.01em]">
            <span style={{ color: C.primary }}>
              Ética, ciência e humanização
            </span>{" "}
            {ETICA_TEXT.split(" ").slice(ETICA_ACCENT_WORDS).join(" ")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[240vh] bg-[#EEFBFF]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Camada clara: só a wave — o texto não existe fora da máscara */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <WaveFormation progress={waveProgress} className="mb-10" />
            <p
              aria-hidden="true"
              className="invisible text-[1.4rem] sm:text-[1.7rem] md:text-[2rem] font-medium leading-[1.5] tracking-[-0.01em]"
            >
              {ETICA_TEXT}
            </p>
          </div>
        </div>

        {/* Camada escura mascarada: o texto aparece apenas aqui dentro */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: circle, backgroundColor: C.navy }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <WaveFormation progress={waveProgress} className="mb-10" />
              <p className="text-[1.4rem] sm:text-[1.7rem] md:text-[2rem] font-medium text-white leading-[1.5] tracking-[-0.01em]">
                {words.map((w, i) => {
                  const start = 0.3 + (i / words.length) * 0.52;
                  return (
                    <span key={i}>
                      <ScrubWord
                        progress={scrollYProgress}
                        start={start}
                        end={start + 0.08}
                        accent={i < ETICA_ACCENT_WORDS}
                      >
                        {w}
                      </ScrubWord>{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Nossa trajetória — slice reveal + parallax sutil ────────────────────────

function Trajetoria() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <section ref={ref} className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        <motion.div {...delay(0)}>
                    <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] mb-6">
            <TextReveal text="Nossa trajetória" />
          </h2>
          <p className="text-[#02173B]/58 text-[1rem] leading-relaxed mb-6">
            Ao longo do nosso caminho, consolidamos uma equipe formada por
            profissionais de diferentes áreas da Fonoaudiologia, capazes de
            olhar para cada paciente de forma integral. Implantamos avaliações
            auditivas, eletrofisiológicas e vestibulares especializadas, e
            desenvolvemos tratamentos voltados à audição, ao zumbido, à
            tontura, ao equilíbrio, ao processamento auditivo e à intolerância
            a sons.
          </p>
          <p className="text-[#02173B]/58 text-[1rem] leading-relaxed">
            Essa trajetória se sustenta na integração entre prática clínica,
            pesquisa científica, inovação tecnológica e formação profissional
            contínua, pilares que seguem guiando cada etapa do nosso
            crescimento.
          </p>
        </motion.div>

        <SliceReveal
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=720&fit=crop&auto=format&q=80"
          alt="Equipe de profissionais estudando em conjunto"
          parallax={imgY}
        />
      </div>
    </section>
  );
}

// ─── Imagem que preenche a altura da seção (padrão da chamada final de Exames) ─

function ParaOndeImage() {
  const reduced = useReducedMotion();
  const { ref, show } = useRevealOnScroll<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
      animate={
        reduced
          ? undefined
          : { clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }
      }
      transition={{ duration: 1.1, ease }}
      className="relative min-h-[340px] lg:min-h-full overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&h=1200&fit=crop&auto=format&q=80"
        alt="Sala de atendimento clínico com equipamentos modernos"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(2,16,42,0.6) 0%, transparent 55%)",
        }}
      />
      <div className="float-soft absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 rounded-2xl px-4 py-3 shadow-2xl shadow-[#02102A]/30 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
          style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
        >
          <MiniWave />
        </div>
        <div>
          <div className="text-[#02173B] text-[0.82rem] font-semibold leading-tight">
            Excelência no atendimento
          </div>
          <div className="text-[#02173B]/50 text-[0.72rem]">
            inovação e produção científica
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Para onde caminhamos — banda escura com imagem e reveal ─────────────────

function ParaOnde() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });

  const target = Math.min(1280, vw - 32);
  const bandWidth = useTransform(
    scrollYProgress,
    (v) => target * 0.85 + target * 0.15 * v,
  );

  return (
    <section ref={ref} className="pt-20 pb-20 bg-white overflow-hidden">
      <motion.div
        className="relative mx-auto overflow-hidden"
        style={
          reduced
            ? {
                width: "min(1280px, calc(100% - 32px))",
                borderRadius: 36,
                backgroundColor: C.deepNavy,
              }
            : {
                width: bandWidth,
                borderRadius: 36,
                backgroundColor: C.deepNavy,
              }
        }
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(82,212,255,0.14) 0%, transparent 55%)",
          }}
        />
        <div className="relative grid lg:grid-cols-[1fr_0.92fr] items-stretch">
          <div className="px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center">
            <h2 className="text-[2rem] md:text-[2.6rem] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-6">
              <TextReveal text="Para onde caminhamos" />
            </h2>
            <motion.p
              {...delay(0.12)}
              className="text-white/55 text-[1rem] leading-relaxed mb-10 max-w-[540px]"
            >
              Seguimos em busca de nos consolidar como referência em audição e
              reabilitação neurofuncional, tanto pela excelência no atendimento
              quanto pela inovação e pela produção científica que sustentam
              nosso trabalho. Também investimos na formação de outros
              profissionais da Fonoaudiologia, para que mais pessoas tenham
              acesso a um cuidado qualificado e atualizado.
            </motion.p>
            <motion.div {...delay(0.2)}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 sm:gap-2.5 bg-[#52D4FF] text-[#02173B] px-5 sm:px-6 py-3 rounded-full font-medium text-[clamp(0.8rem,3.6vw,0.95rem)] whitespace-nowrap hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Agende agora
                <ArrowRight size={16} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          <ParaOndeImage />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Nosso espaço — galeria de fotos reais (grade quadrada + lightbox) ────────

function NossoEspaco() {
  const reduced = useReducedMotion();
  const { ref, show } = useRevealOnScroll<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(null);

  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i === null ? i : (i - 1 + AMBIENTE.length) % AMBIENTE.length));
  const next = () =>
    setOpen((i) => (i === null ? i : (i + 1) % AMBIENTE.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Sem fotos na pasta ainda → não renderiza a seção.
  if (AMBIENTE.length === 0) return null;

  const doubled = [...AMBIENTE, ...AMBIENTE];

  const Card = (foto: (typeof AMBIENTE)[number], i: number) => (
    <button
      key={i}
      type="button"
      onClick={() => setOpen(i % AMBIENTE.length)}
      className="group/card relative flex-none mx-2 sm:mx-2.5 w-[230px] sm:w-[300px] lg:w-[340px] aspect-[4/3] overflow-hidden rounded-2xl bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#52D4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEFBFF]"
      aria-label={`Ampliar foto ${(i % AMBIENTE.length) + 1} do ambiente`}
    >
      <img
        src={foto.url}
        alt="Ambiente da Synapse Reabilitação Neurofuncional"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
      />
      <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        <Expand size={15} style={{ color: C.navy }} />
      </span>
    </button>
  );

  return (
    <section className="py-24 lg:py-32 bg-[#EEFBFF] overflow-hidden">
      {/* Título e subtítulo centralizados */}
      <motion.div
        {...delay(0)}
        className="max-w-2xl mx-auto px-6 text-center mb-12 lg:mb-16"
      >
        <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] mb-4">
          <TextReveal text="Conheça nosso espaço" />
        </h2>
        <p className="text-[#02173B]/58 text-[1rem] leading-relaxed">
          Um ambiente pensado para acolher crianças, adultos e idosos com
          conforto, segurança e privacidade.
        </p>
      </motion.div>

      {/* Carrossel infinito (movimento reduzido → faixa rolável manualmente) */}
      {reduced ? (
        <div className="flex overflow-x-auto px-6 pb-2 snap-x snap-mandatory">
          {AMBIENTE.map((foto, i) => (
            <div key={i} className="snap-start">
              {Card(foto, i)}
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          ref={ref}
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{
            clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            opacity: show ? 1 : 0,
          }}
          transition={{ duration: 1.1, ease }}
          className="relative"
        >
          <div
            className="hidden sm:block absolute inset-y-0 left-0 w-24 lg:w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #EEFBFF 0%, transparent 100%)" }}
          />
          <div
            className="hidden sm:block absolute inset-y-0 right-0 w-24 lg:w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #EEFBFF 0%, transparent 100%)" }}
          />
          <div
            className="flex w-max synapse-marquee-left hover:[animation-play-state:paused]"
            style={{ animationDuration: "55s" }}
          >
            {doubled.map((foto, i) => Card(foto, i))}
          </div>
        </motion.div>
      )}

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <div
            className="absolute inset-0 bg-[#02102A]/85 backdrop-blur-sm"
            onClick={close}
          />

          <motion.img
            key={open}
            src={AMBIENTE[open].url}
            alt="Ambiente da Synapse Reabilitação Neurofuncional"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease }}
            className="relative max-w-full max-h-full rounded-2xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
          />

          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>

          {AMBIENTE.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Foto anterior"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próxima foto"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-[0.8rem] font-medium tabular-nums">
                {open + 1} / {AMBIENTE.length}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Sobre() {
  return (
    <>
      <QuemSomos />
      <FocoAudicao />
      <ComoCuidamos />
      <EticaScrollLock />
      <Trajetoria />
      <NossoEspaco />
      <ParaOnde />
    </>
  );
}
