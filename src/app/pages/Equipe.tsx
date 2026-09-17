import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  C,
  ease,
  delay,
  Eyebrow,
  TextReveal,
  BigWave,
  MiniWave,
  useRevealOnScroll,
} from "../lib/theme";
import { WHATSAPP } from "../lib/data";

// Fotos reais da equipe — arquivo nomeado pelas INICIAIS (ex.: TG.webp, AC.webp)
// em src/assets/fotos/equipe/. Mapeadas por iniciais (maiúsculas, sem extensão).
const EQUIPE_FOTOS: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>(
      "../../assets/fotos/equipe/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
      { eager: true, query: "?url", import: "default" },
    ),
  ).map(([path, url]) => [
    (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "").toUpperCase(),
    url,
  ]),
);

// ─── Dados (texto 100% literal do copy institucional) ────────────────────────

const INTRO =
  "Nossa equipe reúne profissionais de diferentes áreas da Fonoaudiologia e da Otorrinolaringologia, com formação especializada e atualização constante, para oferecer um cuidado completo e individualizado em cada etapa do tratamento.";

type Membro = {
  initials: string;
  name: string;
  crfa?: string;
  tag: string;
  desc: string;
  bullets: string[];
};

const EQUIPE: Membro[] = [
  {
    initials: "TG",
    name: "Thales Roges Vanderlei de Góes",
    crfa: "CRFa 4-12154",
    tag: "Responsável técnico",
    desc: "Fonoaudiólogo responsável técnico pela Synapse.",
    bullets: [
      "Doutorando e Mestre em Fonoaudiologia pela UFPB",
      "Especialista em Audiologia pelo Conselho Federal de Fonoaudiologia (CFFa)",
      "Especialista em Motricidade Orofacial pelo Conselho Federal de Fonoaudiologia (CFFa)",
      "Especialista em Processamento Auditivo Central pela Inspirar",
      "Certificação Profissional Internacional em Mindfulness (MBCT)",
      "Formação em Neuromodulação Não Invasiva pelo Napen",
    ],
  },
  {
    initials: "AC",
    name: "Anália Correia",
    tag: "Fonoaudiologia",
    desc: "Fonoaudióloga graduada pela Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL). Dedica-se ao cuidado e ao aprimoramento da comunicação humana, atuando no aperfeiçoamento vocal e na performance de cantores, jornalistas e demais profissionais da voz, além da avaliação e reabilitação de disfonias e do Treinamento Auditivo Acusticamente Controlado (TAAC).",
    bullets: [
      "Especialização em Audiologia pela Faculdade IDE (PE)",
      "Formação em Canto Popular pelo Instituto de Música Sol Maior (AL)",
      "Aperfeiçoamento em Fotobiomodulação",
    ],
  },
  {
    initials: "DV",
    name: "Danmires de Mendonça Vieira",
    tag: "Fonoaudiologia",
    desc: "Fonoaudióloga clínica formada pela Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL).",
    bullets: [
      "Certificação no Método Therapy Taping (2019)",
      "Curso de Avaliação de Seletividade Alimentar no TEA pela Inclusão Eficiente (2021)",
      "Curso de Seletividade Alimentar: avaliação, tratamento e enfoque interdisciplinar pela Clínica Inclusive (2021)",
      "Curso de Motricidade Orofacial: prática com casos, com a Fga. Gislaine Folha (2022)",
      "Curso Descomplicando as disfunções orais no bebê, com a Fga. Ana Carolina Barros (2026)",
    ],
  },
  {
    initials: "CM",
    name: "Caroline Macêdo",
    tag: "Fonoaudiologia",
    desc: "Fonoaudióloga graduada pela Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL). Atua na área de diagnóstico auditivo periférico, central e vestibular.",
    bullets: [
      "Pós-graduada em Audiologia Clínica e Ocupacional pela Faculdade Redentor (RJ)",
      "Aprimoramento em Processamento Auditivo Central pela CEFAC (SP)",
      "Aprimoramento em Otoneurologia pela Escola ENSI de Saúde (SP)",
      "Aprofundamento em Eletrofisiologia pela Voz Ativa Escola Dinâmica e CENA (RS)",
      "Especialista em Audiologia pelo Conselho Federal de Fonoaudiologia",
    ],
  },
  {
    initials: "MC",
    name: "Moses Caetano",
    tag: "Fonoaudiologia",
    desc: "Fonoaudiólogo formado pela Universidade Estadual de Ciências da Saúde de Alagoas (UNCISAL), com residência multiprofissional em Fonoaudiologia Hospitalar e Disfagia pelo Hospital das Clínicas da Faculdade de Medicina da Universidade de São Paulo (HCFMUSP). Ampla experiência com pacientes de alta complexidade, traqueostomizados, disfágicos, com alterações respiratórias, distúrbios laríngeos e avaliação gerontológica global.",
    bullets: [],
  },
  {
    initials: "KL",
    name: "Kryssia Layane",
    tag: "Fonoaudiologia",
    desc: "Fonoaudióloga clínica graduada pela Universidade de Ciências da Saúde de Alagoas (UNCISAL). Atua nas alterações motoras da fala, nos transtornos de linguagem oral e escrita e nos distúrbios miofuncionais, como a respiração oral. Possui diversos cursos e capacitações no âmbito da linguagem e da motricidade orofacial.",
    bullets: [
      "Pós-graduada em Distúrbios da Fala e da Linguagem",
      "Certificação de aplicadora do método ABA e de intervenções baseadas no método Denver",
    ],
  },
  {
    initials: "WG",
    name: "Wilson Gama",
    tag: "Otorrinolaringologia",
    desc: "Médico graduado em Medicina pela Universidade Federal de Alagoas (2001–2006).",
    bullets: [
      "Residência médica em Otorrinolaringologia e Cirurgia Cérvico-Facial pelo Hospital Otorrinos de Feira de Santana (BA), 2008–2011",
      "Título de especialista em Otorrinolaringologia e Cirurgia Cérvico-Facial pela Associação Médica Brasileira (AMB), 2011",
      "Membro efetivo da Associação Brasileira de Otorrinolaringologia e Cirurgia Cérvico-Facial (ABORL) desde 2011",
    ],
  },
];

const TOTAL = EQUIPE.length;

// ─── Retrato do profissional (placeholder — PENDÊNCIA: foto real, "em breve") ─

function Portrait({
  initials,
  name,
  className = "",
  revealed,
}: {
  initials: string;
  name?: string;
  className?: string;
  revealed?: boolean;
}) {
  const reduced = useReducedMotion();
  const controlled = revealed !== undefined;
  const foto = EQUIPE_FOTOS[initials.toUpperCase()];
  const clipOpen = "inset(0 0% 0 0 round 26px)";
  const clipClosed = "inset(0 100% 0 0 round 26px)";
  return (
    <motion.div
      className={`relative overflow-hidden rounded-[26px] border border-white/12 shadow-[0_36px_84px_-34px_rgba(82,212,255,0.42)] ${className}`}
      style={{ aspectRatio: "3/4", backgroundColor: "rgba(255,255,255,0.05)" }}
      initial={reduced ? false : { clipPath: clipClosed }}
      animate={
        reduced || !controlled
          ? undefined
          : { clipPath: revealed ? clipOpen : clipClosed }
      }
      whileInView={reduced || controlled ? undefined : { clipPath: clipOpen }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease }}
    >
      {foto ? (
        <>
          <img
            src={foto}
            alt={name ? `${name} — Synapse` : "Profissional da Synapse"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(2,16,42,0.34) 0%, transparent 44%)",
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 16%, rgba(82,212,255,0.24) 0%, transparent 62%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center shadow-[0_26px_54px_-16px_rgba(82,212,255,0.65)]"
              style={{ background: "linear-gradient(150deg,#52D4FF,#42ADD0)" }}
            >
              <span className="text-[#02173B] text-[2.4rem] font-semibold tracking-tight">
                {initials}
              </span>
            </div>
            <MiniWave color="#52D4FF" />
          </div>
          <span className="absolute bottom-5 inset-x-0 text-center text-white/35 text-[0.66rem] font-medium uppercase tracking-[0.16em]">
            Foto em breve
          </span>
        </>
      )}
    </motion.div>
  );
}

/** Retrato que se revela ao entrar na tela (usado no empilhado vertical). */
function RevealPortrait({
  initials,
  name,
  className = "",
}: {
  initials: string;
  name?: string;
  className?: string;
}) {
  const { ref, show } = useRevealOnScroll<HTMLDivElement>(0.85);
  return (
    <div ref={ref} className={className}>
      <Portrait initials={initials} name={name} revealed={show} />
    </div>
  );
}

// ─── Currículo do profissional (texto claro sobre fundo escuro) ──────────────

function MemberInfo({ m }: { m: Membro }) {
  return (
    <div>
      <h2 className="text-[1.9rem] md:text-[2.4rem] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-1.5 [text-wrap:balance] max-w-[16ch]">
        {m.name}
      </h2>
      <div className="text-[#52D4FF] text-[0.85rem] font-semibold mb-5">
        {m.crfa ?? m.tag}
      </div>
      <p className="text-white/65 text-[0.95rem] leading-relaxed mb-5 max-w-[50ch]">
        {m.desc}
      </p>
      {m.bullets.length > 0 && (
        <ul className="space-y-2 max-w-[50ch]">
          {m.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-white/60 text-[0.84rem] leading-snug">
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full flex-none"
                style={{ backgroundColor: C.primary }}
              />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#EEFBFF] to-white overflow-hidden pt-[128px] pb-24 lg:pt-[168px] lg:pb-28">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(82,212,255,0.20) 0%, transparent 70%)",
          transform: "translate(-50%, -42%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div {...delay(0)}>
                  </motion.div>

        <h1 className="text-[2.8rem] sm:text-[3.6rem] lg:text-[4.4rem] font-semibold text-[#02173B] leading-[1] tracking-[-0.035em] mb-6">
          <TextReveal text="Equipe" delay={0.08} />
        </h1>

        <motion.p
          {...delay(0.24)}
          className="max-w-[62ch] text-[#02173B]/58 text-[1.02rem] lg:text-[1.08rem] leading-relaxed mb-9"
        >
          {INTRO}
        </motion.p>

        <motion.div {...delay(0.36)} className="flex flex-wrap justify-center gap-3.5">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#52D4FF]/30 hover:-translate-y-0.5"
          >
            Agende agora
            <ArrowRight size={16} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#equipe"
            className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
          >
            Conheça a equipe
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Deck horizontal dos profissionais ───────────────────────────────────────

function TeamDeck() {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const fn = () => setWide(mql.matches);
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const pinned = wide && !reduced;

  // Slice reveal: dispara quando a seção fixa no topo (foco total nela).
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!pinned) {
      setRevealed(false);
      return;
    }
    let done = false;
    const check = () => {
      const s = sectionRef.current;
      if (!s || done) return;
      if (s.getBoundingClientRect().top <= 2) {
        done = true;
        setRevealed(true);
        cleanup();
      }
    };
    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return cleanup;
  }, [pinned]);

  useLayoutEffect(() => {
    if (!pinned) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      setDistance(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    const id = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1)))));
  });

  const Header = (
    <div className="max-w-5xl mx-auto px-6 w-full text-center">
      <motion.h2
        className="inline-block text-[1.9rem] md:text-[2.5rem] font-semibold text-white leading-[1.1] tracking-[-0.02em]"
        initial={reduced ? false : { scale: 1.35, opacity: 0 }}
        animate={
          pinned
            ? reduced
              ? undefined
              : { scale: revealed ? 1 : 1.35, opacity: revealed ? 1 : 0 }
            : undefined
        }
        whileInView={!pinned && !reduced ? { scale: 1, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.75, ease, delay: pinned ? 0.55 : 0 }}
      >
        Nossa equipe
      </motion.h2>
    </div>
  );

  // Mobile / movimento reduzido: profissionais empilhados verticalmente
  if (!pinned) {
    return (
      <section id="equipe" className="py-24" style={{ backgroundColor: C.navy }}>
        <div className="mb-14">{Header}</div>
        <div className="max-w-5xl mx-auto px-6 space-y-24 sm:space-y-28">
          {EQUIPE.map((m) => (
            <motion.div
              key={m.name}
              {...delay(0)}
              className="grid gap-9 sm:grid-cols-[0.55fr_1fr] sm:gap-10 items-center"
            >
              <div>
                <RevealPortrait
                  initials={m.initials}
                  name={m.name}
                  className="w-full max-w-[360px] mx-auto sm:max-w-[340px] sm:mx-0"
                />
              </div>
              <MemberInfo m={m} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)`, backgroundColor: C.navy }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 12%, rgba(82,212,255,0.10) 0%, transparent 50%)",
        }}
      />
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-[104px] pb-14">
        <div className="flex-none">{Header}</div>

        <motion.div ref={trackRef} className="flex-1 flex mt-6" style={{ x }}>
          {EQUIPE.map((m, i) => (
            <div key={m.name} className="w-screen flex-none h-full flex items-center">
              <div className="max-w-[62rem] mx-auto px-6 w-full grid md:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
                <div className="order-2 md:order-1">
                  <MemberInfo m={m} />
                </div>
                <div className="order-1 md:order-2 w-full max-w-[380px] mx-auto md:mx-0 md:w-[350px] lg:w-[380px]">
                  <Portrait initials={m.initials} name={m.name} revealed={i <= active} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Indicador de progresso */}
        <div className="flex-none flex items-center justify-center gap-2">
          {EQUIPE.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-[#52D4FF]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Slice reveal — cobre a seção ao fixar e abre em fatias, dando foco */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-30 flex ${
            revealed ? "pointer-events-none" : ""
          }`}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <motion.span
              key={i}
              className="flex-1 bg-white"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: revealed ? 0 : 1 }}
              transition={{ duration: 0.75, ease, delay: 0.05 + i * 0.09 }}
              style={{ transformOrigin: "top" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Chamada final ───────────────────────────────────────────────────────────

function ChamadaFinal() {
  return (
    <section className="px-4 py-24 bg-white">
      <motion.div
        {...delay(0)}
        className="relative max-w-7xl mx-auto overflow-hidden text-center rounded-[36px] bg-[#EEFBFF] px-6 py-20 lg:py-24"
      >
        <div className="relative max-w-2xl mx-auto">
          <BigWave bars={30} className="mx-auto h-9 mb-8 opacity-80" />
                    <h2 className="mt-3 text-[1.7rem] md:text-[2.3rem] font-semibold text-[#02173B] leading-[1.14] tracking-[-0.02em] mb-8">
            <TextReveal text="Fale com a nossa equipe" />
          </h2>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-7 py-3.5 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <MessageCircle size={18} className="flex-none" />
            Fale conosco
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Equipe() {
  return (
    <>
      <Hero />
      <TeamDeck />
      <ChamadaFinal />
    </>
  );
}
