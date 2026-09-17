import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  Smile,
  Mic2,
  MessagesSquare,
  Utensils,
  Ear,
  Compass,
  AudioLines,
  Headphones,
  Stethoscope,
  BatteryCharging,
  Cpu,
  Smartphone,
  Droplets,
  FlaskConical,
  Waves,
  MessageCircle,
  SlidersHorizontal,
  Mic,
  LayoutGrid,
  Volume1,
  Volume2,
} from "lucide-react";
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

const u = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const IMG = {
  consulta: u("1576091160399-112ba8d25d1d"),
  motricidade: u("1476703993599-0035a21b17a9"),
  voz: u("1516280440614-37939bbacd81"),
  linguagem: u("1503919545889-aef636e10ad4"),
  disfagia: u("1490645935967-10de6ba17061"),
  audiologia: u("1588776814546-1ffcf47267a5"),
  vestibular: u("1544027993-37dbfe43562a"),
  taac: u("1516627145497-ae6968895b74"),
  otorrino: u("1584982751601-97dcc096659c", 1000, 760),
};

// ─── Dados (texto 100% literal do copy institucional) ────────────────────────

const INTRO =
  "Na Synapse, oferecemos atendimento especializado para crianças, adolescentes, adultos e idosos, com profissionais de diferentes áreas da Fonoaudiologia, além de consultas em Otorrinolaringologia.";

const FONO = [
  {
    Icon: ClipboardList,
    anim: "ltr",
    tag: "Consulta",
    image: IMG.consulta,
    title: "Consulta Fonoaudiológica",
    desc: "A consulta fonoaudiológica permite identificar as necessidades de cada paciente e definir um plano de avaliação ou tratamento individualizado.",
  },
  {
    Icon: Smile,
    anim: "ltr",
    tag: "Motricidade",
    image: IMG.motricidade,
    title: "Motricidade Orofacial",
    desc: "Avaliação e tratamento das alterações relacionadas à respiração, mastigação, deglutição, fala e movimentos da face, língua, lábios e mandíbula. Também realizamos acompanhamento de dificuldades alimentares e seletividade alimentar, considerando aspectos sensoriais, motores e funcionais envolvidos na aceitação de diferentes alimentos, sabores e texturas.",
  },
  {
    Icon: Mic2,
    anim: "btt",
    tag: "Voz",
    image: IMG.voz,
    title: "Voz",
    desc: "Atendimento para pessoas com rouquidão, cansaço ao falar, falhas na voz, perda de potência vocal ou desconforto na garganta. Também acompanhamos profissionais que utilizam a voz como instrumento de trabalho, como professores, cantores, atores, palestrantes e comunicadores.",
  },
  {
    Icon: MessagesSquare,
    anim: "ltr",
    tag: "Linguagem",
    image: IMG.linguagem,
    title: "Linguagem",
    desc: "Avaliação e tratamento de atrasos na fala e na linguagem, trocas de sons, dificuldades de compreensão, comunicação, leitura e escrita. O atendimento também é indicado para alterações da comunicação relacionadas ao neurodesenvolvimento ou adquiridas após condições neurológicas.",
  },
  {
    Icon: Utensils,
    anim: "ttb",
    tag: "Disfagia",
    image: IMG.disfagia,
    title: "Disfagia",
    desc: "Avaliação e reabilitação das dificuldades para engolir alimentos, líquidos, saliva ou medicamentos. O acompanhamento busca tornar a alimentação mais segura e eficiente, reduzindo sintomas como engasgos, tosse durante as refeições, sensação de alimento parado e alterações na voz após engolir.",
  },
];

const AUDIO = [
  {
    Icon: Ear,
    anim: "btt",
    tag: "Audiologia",
    image: IMG.audiologia,
    title: "Audiologia e Reabilitação Auditiva",
    desc: "Atendimento direcionado às alterações da audição e do equilíbrio, incluindo perda auditiva, dificuldade para compreender a fala, zumbido, hipersensibilidade aos sons, alterações do processamento auditivo, tontura e desequilíbrio.",
  },
  {
    Icon: Compass,
    anim: "ltr",
    tag: "Vestibular",
    image: IMG.vestibular,
    title: "Reabilitação Vestibular",
    desc: "Tratamento individualizado para pessoas com tontura, vertigem, instabilidade, desequilíbrio ou dificuldade para movimentar a cabeça e os olhos. São utilizados exercícios específicos para melhorar o equilíbrio corporal, a estabilidade do olhar e a segurança durante as atividades diárias.",
  },
  {
    Icon: AudioLines,
    anim: "btt",
    tag: "TAAC",
    image: IMG.taac,
    title: "Treinamento Auditivo Acusticamente Controlado — TAAC",
    desc: "O TAAC é realizado em ambiente preparado, com equipamentos e estímulos sonoros específicos. Durante as sessões, são treinadas habilidades como atenção auditiva, memória, localização sonora e compreensão da fala em ambientes com ruído. Pode ser indicado para pessoas com alterações do processamento auditivo, dificuldades escolares ou dificuldade para compreender conversas, inclusive usuários de aparelhos auditivos.",
  },
];

const SERVICE_NAMES = [
  "Consulta Fonoaudiológica",
  "Motricidade Orofacial",
  "Voz",
  "Linguagem",
  "Disfagia",
  "Audiologia e Reabilitação Auditiva",
  "Reabilitação Vestibular",
  "TAAC",
  "Seleção e Adaptação de Aparelhos Auditivos",
  "Otorrinolaringologia",
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#EEFBFF] to-white overflow-hidden pt-[128px] pb-20 lg:pt-[168px] lg:pb-24">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(82,212,255,0.20) 0%, transparent 70%)",
          transform: "translate(-50%, -42%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h1 className="text-[2.8rem] sm:text-[3.6rem] lg:text-[4.4rem] font-semibold text-[#02173B] leading-[1] tracking-[-0.035em] mb-6">
          <TextReveal text="Serviços" delay={0.08} />
        </h1>

        <motion.p
          {...delay(0.24)}
          className="max-w-[60ch] text-[#02173B]/58 text-[1.02rem] lg:text-[1.08rem] leading-relaxed mb-7"
        >
          {INTRO}
        </motion.p>

        <motion.div
          {...delay(0.34)}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-9 text-[0.8rem] font-semibold text-[#02173B]/45"
        >
          {["Crianças", "Adolescentes", "Adultos", "Idosos"].map((a, i) => (
            <span key={a} className="flex items-center gap-3">
              {i > 0 && <span className="w-px h-3 bg-[#02173B]/15" aria-hidden="true" />}
              {a}
            </span>
          ))}
        </motion.div>

        <motion.div {...delay(0.42)} className="flex flex-wrap justify-center gap-3.5">
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
            href="#servicos"
            className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
          >
            Ver especialidades
          </a>
        </motion.div>
      </div>

      {/* Marquee de especialidades */}
      <motion.div {...delay(0.5)} className="relative mt-16 lg:mt-20">
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
        />
        <div
          className="hidden sm:block absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }}
        />
        <div className="flex w-max synapse-marquee-left">
          {[...SERVICE_NAMES, ...SERVICE_NAMES].map((name, i) => (
            <span key={i} className="flex-none inline-flex items-center">
              <span className="px-6 sm:px-8 text-[0.86rem] font-medium text-[#02173B]/55 whitespace-nowrap">
                {name}
              </span>
              <span className="w-px h-4 bg-[#02173B]/12" aria-hidden="true" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Card de serviço (imagem + rótulo + texto acordeão) ──────────────────────

type CardItem = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  anim: string;
  tag: string;
  image: string;
  title: string;
  desc: string;
};

function ServiceCard({
  Icon,
  anim,
  tag,
  image,
  title,
  desc,
  index = 0,
}: CardItem & { index?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      {...delay(index * 0.06)}
      className="relative flex flex-col w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] min-w-0 overflow-hidden rounded-[26px] group"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(2,16,42,0.82) 0%, rgba(2,16,42,0.28) 42%, rgba(2,16,42,0.05) 100%)",
        }}
      />
      {/* Pill label */}
      <div className="absolute top-5 left-5">
        <span className="inline-flex items-center bg-white/15 backdrop-blur-md text-white text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full">
          {tag}
        </span>
      </div>

      <div className="h-[240px] sm:h-[260px] flex-none" aria-hidden="true" />

      {/* Card interno sobre a imagem — texto expande em acordeão */}
      <div className="relative px-4 pb-4 mt-auto">
        <div className="bg-white rounded-2xl p-5 transition-all duration-500 ease-out group-hover:shadow-[0_18px_44px_rgba(2,23,59,0.28)]">
          <div className="flex items-start gap-3.5 mb-3 min-h-[2.9rem]">
            <div
              className={`synapse-icon-wipe-${anim} w-10 h-10 rounded-xl flex items-center justify-center flex-none`}
              style={{ backgroundColor: C.primary }}
            >
              <Icon size={18} strokeWidth={2} style={{ color: C.navy }} />
            </div>
            <h3 className="min-w-0 break-words text-[#02173B] text-[1rem] font-semibold leading-snug pt-0.5">
              {title}
            </h3>
          </div>

          <div
            className={`relative overflow-hidden transition-[max-height] duration-500 ease-out ${
              open ? "max-h-[22rem]" : "max-h-[2.3rem]"
            }`}
          >
            <p className="text-[#02173B]/55 text-[0.82rem] leading-snug">
              {desc}
            </p>
            {!open && (
              <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-2.5 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#42ADD0] hover:text-[#02173B] transition-colors"
          >
            {open ? "Ler menos" : "Ler mais"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/** Card de chamada no fim do grid de especialidades. */
function CtaCard({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      {...delay(index * 0.06)}
      className="min-w-0 w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
    >
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full w-full min-w-0 max-w-full flex-col justify-between overflow-hidden p-7 min-h-[470px] sm:min-h-0 transition-transform duration-300 hover:-translate-y-1"
        style={{
          borderRadius: "26px",
          aspectRatio: "4/5",
          backgroundColor: C.navy,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 15%, rgba(82,212,255,0.20) 0%, transparent 58%)",
          }}
        />
        <div className="relative">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
          >
            <MessageCircle size={20} style={{ color: C.primary }} />
          </div>
          <h3 className="text-white text-[1.3rem] font-semibold leading-tight mb-3">
            Precisa de algum desses atendimentos?
          </h3>
          <p className="text-white/55 text-[0.92rem] leading-relaxed">
            Fale com a nossa equipe e agende a sua consulta.
          </p>
        </div>
        <span className="relative inline-flex items-center justify-center gap-2.5 self-start bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.9rem] whitespace-nowrap transition-colors duration-300 group-hover:bg-white">
          Agende agora
          <ArrowRight
            size={15}
            className="flex-none transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </a>
    </motion.div>
  );
}

function CardSection({
  eyebrow,
  heading,
  items,
  bg,
  id,
}: {
  eyebrow: string;
  heading: string;
  items: CardItem[];
  bg: "white" | "ice";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-32 ${bg === "ice" ? "bg-[#EEFBFF]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...delay(0)} className="max-w-2xl mb-11 lg:mb-14">
          <h2 className="text-[1.9rem] md:text-[2.4rem] font-semibold text-[#02173B] leading-[1.1] tracking-[-0.02em]">
            <TextReveal text={heading} />
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-5">
          {items.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
          <CtaCard index={items.length} />
        </div>
      </div>
    </section>
  );
}

// ─── Aparelhos Auditivos (Starkey) — texto + mockup do app My Starkey ────────

/** Moldura de celular usada na galeria de telas do app. */
function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[230px] sm:w-[200px] lg:w-[250px] flex-none rounded-[30px] bg-[#0a1226] p-[6px] transition-transform duration-500 hover:-translate-y-2 ${className}`}
    >
      <div
        className="relative overflow-hidden rounded-[25px]"
        style={{ aspectRatio: "375/812" }}
      >
        {children}
      </div>
    </div>
  );
}

const APP_BG = "linear-gradient(155deg,#0d47a1 0%,#0a2a5e 45%,#061024 100%)";

function ScreenSplash() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: APP_BG }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-3.5"
        style={{ background: "linear-gradient(150deg,#4fb8f5,#1e6fd0)" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 18l5.5-8 3.5 4.5L15.5 10 21 18" />
        </svg>
      </div>
      <div className="text-[0.95rem] font-semibold tracking-tight">
        <span className="text-[#4fb8f5]">My</span>{" "}
        <span className="text-white">Starkey</span>
      </div>
    </div>
  );
}

function AppTabBar({ active = 0 }: { active?: number }) {
  return (
    <div className="flex items-center justify-around py-2.5 bg-black/45">
      {["Home", "Health", "Learn", "More"].map((t, i) => (
        <span
          key={t}
          className={`text-[0.48rem] font-medium ${
            i === active ? "text-[#4fb8f5]" : "text-white/45"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ScreenHome() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: APP_BG }}>
      <div className="flex items-center justify-between px-3.5 pt-3 text-[0.48rem] text-white/80 font-medium">
        <span>3:30</span>
        <span className="flex items-center gap-[3px]">
          <span className="w-3 h-1.5 rounded-[1px] bg-white/70" />
          <span className="w-[7px] h-[7px] rounded-full border border-white/70" />
          <span className="px-[3px] rounded-[3px] bg-[#4fb8f5] text-[0.4rem] text-white">
            47
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between px-3.5 mt-3">
        <div className="flex items-center gap-1.5 text-[0.46rem] text-white/85">
          <span className="w-4 h-[9px] rounded-[2px] border border-white/70" />
          L
          <span className="w-4 h-[9px] rounded-[2px] border border-white/70" />
          R
        </div>
        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
          <Mic size={12} className="text-white" />
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-end justify-around px-2.5 mb-4">
        {[
          { Icon: AudioLines, label: "Edge Mode+" },
          { Icon: LayoutGrid, label: "Programs" },
          { Icon: Ear, label: "My Hearing" },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon size={17} className="text-white" />
            </div>
            <span className="text-[0.45rem] text-white/85">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3.5 mb-4">
        <Volume1 size={11} className="text-white/70 flex-none" />
        <div className="relative flex-1 h-[3px] rounded-full bg-white/25">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-white" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-3 h-3 rounded-full bg-white" />
        </div>
        <Volume2 size={11} className="text-white/70 flex-none" />
      </div>

      <AppTabBar active={0} />
    </div>
  );
}

function ScreenHearing() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: APP_BG }}>
      <div className="px-4 pt-5">
        <div className="text-[0.45rem] text-white/50 uppercase tracking-[0.14em]">
          My Starkey
        </div>
        <div className="text-[0.8rem] text-white font-semibold">My Hearing</div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <span className="absolute inset-0 rounded-full border border-white/15" />
          <span className="absolute inset-3 rounded-full border border-white/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MiniWave color="#4fb8f5" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-2.5">
        {["Realçar a fala", "Reduzir ruídos"].map((label) => (
          <div
            key={label}
            className="rounded-lg px-2.5 py-2 flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <span className="text-[0.45rem] text-white/85">{label}</span>
            <span className="w-6 h-3 rounded-full bg-[#4fb8f5] flex items-center px-[2px]">
              <span className="w-2 h-2 rounded-full bg-white ml-auto" />
            </span>
          </div>
        ))}
      </div>

      <AppTabBar active={2} />
    </div>
  );
}

function ScreenBattery() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: APP_BG }}>
      <div className="px-4 pt-5">
        <div className="text-[0.45rem] text-white/50 uppercase tracking-[0.14em]">
          Bateria
        </div>
        <div className="text-[0.8rem] text-white font-semibold">
          até 51h de autonomia
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(79,184,245,0.16)" }}
        >
          <BatteryCharging size={24} className="text-[#4fb8f5]" />
        </div>
        <div className="w-24 h-[5px] rounded-full bg-white/20 relative">
          <div className="absolute inset-y-0 left-0 w-4/5 rounded-full bg-[#4fb8f5]" />
        </div>
        <span className="text-[0.45rem] text-white/60">Carga completa</span>
      </div>

      <AppTabBar active={1} />
    </div>
  );
}

/** Galeria de telas do app: duas colunas que deslizam em sentidos opostos no scroll. */
function AppGallery() {
  const reduced = useReducedMotion();
  // Parallax só a partir de sm — no mobile o movimento deixava a página trepidando.
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches,
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const fn = () => setWide(mql.matches);
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const colA = useTransform(scrollYProgress, [0, 1], [40, -300]);
  const colB = useTransform(scrollYProgress, [0, 1], [-300, 40]);
  const animate = wide && !reduced;

  return (
    <div
      ref={ref}
      className="relative h-auto -mx-6 sm:mx-0 sm:h-[620px] lg:absolute lg:inset-0 lg:h-auto overflow-hidden"
    >
      {/* Mobile: telas deslizando na horizontal, de ponta a ponta da tela */}
      <div className="sm:hidden overflow-hidden">
        <div className="flex w-max synapse-marquee-left">
          {[
            ScreenHome,
            ScreenHearing,
            ScreenBattery,
            ScreenSplash,
            ScreenHome,
            ScreenHearing,
            ScreenBattery,
            ScreenSplash,
          ].map((Screen, i) => (
            <PhoneFrame key={i} className="mx-2">
              <Screen />
            </PhoneFrame>
          ))}
        </div>
      </div>

      {/* Desktop: duas colunas verticais com parallax de scroll */}
      <div className="hidden sm:flex justify-center gap-5">
        <motion.div
          className="flex flex-col gap-5 -mt-40"
          style={animate ? { y: colA } : undefined}
        >
          <PhoneFrame>
            <ScreenBattery />
          </PhoneFrame>
          <PhoneFrame>
            <ScreenHome />
          </PhoneFrame>
          <PhoneFrame>
            <ScreenSplash />
          </PhoneFrame>
          <PhoneFrame>
            <ScreenHearing />
          </PhoneFrame>
        </motion.div>

        <motion.div
          className="flex flex-col gap-5 -mt-64"
          style={animate ? { y: colB } : undefined}
        >
          <PhoneFrame>
            <ScreenSplash />
          </PhoneFrame>
          <PhoneFrame>
            <ScreenHearing />
          </PhoneFrame>
          <PhoneFrame>
            <ScreenBattery />
          </PhoneFrame>
          <PhoneFrame>
            <ScreenHome />
          </PhoneFrame>
        </motion.div>
      </div>
    </div>
  );
}


function Aparelhos() {
  return (
    <section className="py-24 lg:py-32 bg-[#EEFBFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center lg:items-stretch">
        <div>
          <h2 className="text-[1.9rem] md:text-[2.4rem] font-semibold text-[#02173B] leading-[1.12] tracking-[-0.02em] mb-5 [text-wrap:balance]">
            <TextReveal text="Seleção e Adaptação de Aparelhos Auditivos" />
          </h2>
          <p className="text-[#02173B]/60 text-[1rem] leading-relaxed mb-4">
            Realizamos a seleção e a adaptação de aparelhos auditivos de acordo
            com o tipo de perda auditiva, as dificuldades de comunicação, a
            rotina e as preferências de cada paciente. Trabalhamos com aparelhos
            auditivos Starkey, que oferecem tecnologias avançadas de
            inteligência artificial para analisar o ambiente, destacar a fala,
            reduzir ruídos e realizar ajustes automáticos ao longo do dia.
          </p>
          <p className="text-[#02173B]/60 text-[1rem] leading-relaxed mb-8">
            Alguns modelos recarregáveis apresentam autonomia de até 51 horas,
            uma das maiores disponíveis no mercado, além de proteção contra
            água, suor, poeira e umidade. O portfólio também oferece modelos
            discretos, personalizados e recarregáveis, com conectividade para
            smartphones, transmissão de chamadas e músicas e controle pelo
            aplicativo My Starkey. A adaptação inclui programação
            individualizada, verificação do desempenho, orientações sobre uso e
            conservação, ajustes periódicos e acompanhamento durante todo o
            processo de reabilitação auditiva.
          </p>

          {/* highlights em linha */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 border-t border-[#02173B]/10 pt-7">
            {[
              { Icon: BatteryCharging, label: "até 51h de autonomia" },
              { Icon: Cpu, label: "Inteligência artificial" },
              { Icon: Smartphone, label: "App My Starkey" },
              { Icon: Droplets, label: "Resistente à água e poeira" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col gap-2.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
                >
                  <Icon size={16} style={{ color: C.secondary }} />
                </div>
                <span className="text-[0.78rem] font-medium leading-snug text-[#02173B]/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* galeria de telas do app My Starkey — sangra até as bordas da seção */}
        <div className="relative min-w-0 sm:-my-24 lg:-my-32 lg:self-stretch">
          <AppGallery />

          <div className="float-soft absolute left-0 top-32 lg:top-44 z-10 hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_44px_-18px_rgba(2,23,59,0.35)]">
            <Smartphone size={17} style={{ color: C.secondary }} />
            <span className="text-[#02173B] text-[0.78rem] font-semibold">
              App My Starkey
            </span>
          </div>
          <div
            className="float-soft absolute right-0 bottom-32 lg:bottom-44 z-10 hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_44px_-18px_rgba(2,23,59,0.35)]"
            style={{ animationDelay: "1.6s" }}
          >
            <Headphones size={17} style={{ color: C.secondary }} />
            <span className="text-[#02173B] text-[0.78rem] font-semibold">
              Aparelhos Starkey
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Otorrinolaringologia — imagem com overlay animado ───────────────────────

function Otorrino() {
  const reduced = useReducedMotion();
  const { ref, show } = useRevealOnScroll<HTMLDivElement>();
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div
          ref={ref}
          initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            reduced
              ? undefined
              : { clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }
          }
          transition={{ duration: 1.1, ease }}
          className="order-2 lg:order-1 relative overflow-hidden rounded-[28px]"
        >
          <motion.div
            initial={reduced ? false : { scale: 1.16 }}
            animate={reduced ? undefined : { scale: show ? 1 : 1.16 }}
            transition={{ duration: 1.3, ease }}
            className="relative bg-[#c7ecf8]"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={IMG.otorrino}
              alt="Consulta médica em otorrinolaringologia"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* overlays animados */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(2,16,42,0.5) 0%, transparent 55%)",
            }}
          />
          <span
            aria-hidden="true"
            className="synapse-pulse-ring absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#52D4FF]/60 pointer-events-none"
          />
          <span
            aria-hidden="true"
            className="synapse-pulse-ring absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#52D4FF]/60 pointer-events-none"
            style={{ animationDelay: "1.8s" }}
          />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_44px_-18px_rgba(2,23,59,0.35)]">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
              style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
            >
              <Stethoscope size={18} style={{ color: C.secondary }} />
            </div>
            <div>
              <div className="text-[#02173B] text-[0.82rem] font-semibold leading-tight">
                Atuação integrada
              </div>
              <div className="text-[#02173B]/50 text-[0.7rem]">
                médico e fonoaudiólogo
              </div>
            </div>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <h2 className="text-[1.9rem] md:text-[2.4rem] font-semibold text-[#02173B] leading-[1.12] tracking-[-0.02em] mb-5">
            <TextReveal text="Consulta em Otorrinolaringologia" />
          </h2>
          <p className="text-[#02173B]/60 text-[1rem] leading-relaxed">
            A Otorrinolaringologia é a especialidade médica responsável pela
            investigação e pelo tratamento das alterações dos ouvidos, nariz,
            garganta e estruturas relacionadas. A consulta pode ser indicada em
            casos de perda auditiva, zumbido, dor ou sensação de ouvido tampado,
            infecções recorrentes, tontura, vertigem, desequilíbrio, alterações
            na voz, dificuldades respiratórias, ronco, sinusite, rinite ou
            problemas para engolir. A atuação integrada entre o médico
            otorrinolaringologista e o fonoaudiólogo permite uma avaliação mais
            completa e a definição da melhor conduta para cada paciente.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Exames + Zumbido (navegação cruzada) ────────────────────────────────────

function CrossLinks() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <motion.div
          {...delay(0)}
          className="relative overflow-hidden rounded-[28px] bg-[#EEFBFF] p-9 lg:p-11 flex flex-col"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
          >
            <FlaskConical size={22} style={{ color: C.secondary }} />
          </div>
          <h3 className="text-[1.4rem] font-semibold text-[#02173B] leading-tight mb-3">
            Exames especializados
          </h3>
          <p className="text-[#02173B]/60 text-[1rem] leading-relaxed mb-8 flex-1">
            Além do atendimento clínico, a Synapse realiza exames auditivos,
            eletrofisiológicos, vestibulares e de voz para apoiar o diagnóstico
            com precisão.
          </p>
          <Link
            to="/exames"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 self-start bg-[#02173B] text-white px-6 py-3 rounded-full font-medium text-[clamp(0.82rem,3.4vw,0.9rem)] hover:bg-[#52D4FF] hover:text-[#02173B] transition-all duration-300 hover:-translate-y-0.5"
          >
            Ver todos os exames
            <ArrowRight size={15} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          {...delay(0.1)}
          className="relative overflow-hidden rounded-[28px] p-9 lg:p-11 flex flex-col"
          style={{ backgroundColor: C.navy }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 85% 20%, rgba(82,212,255,0.16) 0%, transparent 55%)",
            }}
          />
          <div className="relative flex flex-col h-full">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
            >
              <Waves size={22} style={{ color: C.primary }} />
            </div>
            <h3 className="text-[1.4rem] font-semibold text-white leading-tight mb-3">
              Tratamento especializado do zumbido
            </h3>
            <p className="text-white/55 text-[1rem] leading-relaxed mb-8 flex-1">
              A Synapse conta com um protocolo próprio e individualizado para o
              tratamento do zumbido, unindo diferentes abordagens terapêuticas
              conforme a necessidade de cada paciente.
            </p>
            <Link
              to="/tratamento-do-zumbido"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 self-start bg-[#52D4FF] text-[#02173B] px-5 sm:px-6 py-3 rounded-full font-medium text-[clamp(0.78rem,3.2vw,0.9rem)] text-center hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Conhecer o tratamento do zumbido
              <ArrowRight size={15} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Chamada final ───────────────────────────────────────────────────────────

function ChamadaFinal() {
  return (
    <section className="px-4 pt-4 pb-24 bg-white">
      <motion.div
        {...delay(0)}
        className="relative max-w-7xl mx-auto overflow-hidden text-center rounded-[36px] bg-[#EEFBFF] px-6 py-20 lg:py-24"
      >
        <div className="relative max-w-2xl mx-auto">
          <BigWave bars={30} className="mx-auto h-9 mb-8 opacity-80" />
          <h2 className="text-[1.7rem] md:text-[2.3rem] font-semibold text-[#02173B] leading-[1.14] tracking-[-0.02em] mb-8">
            <TextReveal text="Não sabe qual serviço procurar? Fale conosco e nossa equipe vai te orientar." />
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

export default function Servicos() {
  return (
    <>
      <Hero />
      <CardSection
        id="servicos"
        eyebrow="Especialidades"
        heading="Áreas de atuação"
        items={[...FONO, ...AUDIO]}
        bg="white"
      />
      <Aparelhos />
      <Otorrino />
      <CrossLinks />
      <ChamadaFinal />
    </>
  );
}
