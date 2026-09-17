import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  Headphones,
  Radio,
  Baby,
  Waves,
  Activity,
  BarChart3,
  Brain,
  AudioLines,
  Zap,
  Target,
  ScanLine,
  Eye,
  PersonStanding,
  Ear,
  RotateCw,
  Mic2,
  Video,
  MessageCircle,
  FlaskConical,
} from "lucide-react";
import { C, ease, delay, Eyebrow, TextReveal, BigWave } from "../lib/theme";
import { WHATSAPP } from "../lib/data";

const u = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// Fotografia provisória — PENDÊNCIA: substituir pelo acervo real da clínica.
const IMG = {
  fones: u("1516627145497-ae6968895b74"),
  microfoneEstudio: u("1478737270239-2f02b77fc618"),
  crianca: u("1503454537195-1dcabb73ffb9"),
  orelha: u("1588776814546-1ffcf47267a5"),
  salaClinica: u("1629909613654-28e377c37b09"),
  interiorClinica: u("1519494026892-80bbd2d6fd0d"),
  blocos: u("1484820540004-14229fe36ca4"),
  medico: u("1576091160399-112ba8d25d1d"),
  estetoscopio: u("1584982751601-97dcc096659c"),
  livros: u("1503676260728-1c00da094a0b"),
  estudo: u("1522202176988-66273c2fd55f"),
  profissional: u("1512290923902-8a9f81dc236c"),
  maos: u("1544027993-37dbfe43562a"),
  idosa: u("1581579438747-1dc8d17bbce4"),
  maeFilhos: u("1476703993599-0035a21b17a9"),
  criancaAoAr: u("1503919545889-aef636e10ad4"),
  microfone: u("1516280440614-37939bbacd81"),
  cta: u("1629909613654-28e377c37b09", 1400, 900),
};

// ─── Dados (texto 100% literal do copy institucional) ────────────────────────

const INTRO =
  "A Synapse realiza exames especializados para apoiar o diagnóstico e o acompanhamento em audição, equilíbrio e voz, com equipamentos e protocolos adequados para cada faixa etária.";

type ExameItem = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  anim: string;
  tag: string;
  image: string;
  title: string;
  desc: string;
};

const AUDITIVOS: ExameItem[] = [
  {
    Icon: Headphones,
    anim: "btt",
    tag: "Audição",
    image: IMG.fones,
    title:
      "Audiometria Tonal, Comportamental, Condicionada, de Reforço Visual e Vocal",
    desc: "Avalia a capacidade de ouvir diferentes sons e compreender a fala. Nas crianças, o exame é adaptado à idade e ao desenvolvimento, podendo utilizar brincadeiras, respostas comportamentais e reforços visuais para obter resultados confiáveis.",
  },
  {
    Icon: Radio,
    anim: "btt",
    tag: "Audição",
    image: IMG.microfoneEstudio,
    title: "Audiometria de Altas Frequências",
    desc: "Investiga a audição de sons mais agudos, não avaliados na audiometria convencional. Pode auxiliar na identificação precoce de alterações auditivas relacionadas ao zumbido, à exposição ao ruído e ao uso de medicamentos que podem afetar a audição.",
  },
  {
    Icon: Baby,
    anim: "ltr",
    tag: "Audição",
    image: IMG.crianca,
    title: "Imitanciometria com Sonda de Alta Frequência",
    desc: "Avalia o funcionamento da orelha média e a mobilidade da membrana timpânica. A sonda de alta frequência é especialmente indicada para bebês e crianças pequenas, proporcionando uma análise mais adequada às características da orelha nessa faixa etária.",
  },
  {
    Icon: Waves,
    anim: "ltr",
    tag: "Audição",
    image: IMG.orelha,
    title: "Emissões Otoacústicas",
    desc: "Exame rápido e objetivo que avalia o funcionamento das células sensoriais da cóclea. É utilizado na triagem auditiva neonatal e no acompanhamento da audição de crianças e adultos, sem depender da resposta do paciente.",
  },
  {
    Icon: Activity,
    anim: "ltr",
    tag: "Audição",
    image: IMG.salaClinica,
    title: "BERA/PEATE — Integridade da Via Auditiva e Frequência Específica",
    desc: "Exame objetivo que registra as respostas elétricas geradas pelo nervo auditivo e pelo tronco encefálico após a apresentação de sons. O BERA de integridade avalia o funcionamento da via auditiva, enquanto o exame por frequência específica auxilia na estimativa dos níveis de audição em diferentes frequências.",
  },
  {
    Icon: BarChart3,
    anim: "btt",
    tag: "Audição",
    image: IMG.interiorClinica,
    title: "Potencial Evocado Auditivo de Estado Estável — PEAEE/ASSR",
    desc: "Avalia objetivamente os níveis de audição em diferentes frequências. É especialmente útil para bebês, crianças pequenas e pacientes que não conseguem responder de maneira consistente durante a audiometria convencional.",
  },
  {
    Icon: Brain,
    anim: "ltr",
    tag: "Audição",
    image: IMG.blocos,
    title: "Avaliação do Processamento Auditivo Central",
    desc: "Investiga como o cérebro identifica, organiza e interpreta os sons recebidos pelos ouvidos. Avalia habilidades importantes para compreender a fala, principalmente em ambientes barulhentos ou quando várias pessoas falam ao mesmo tempo.",
  },
];

const ZUMBIDO: ExameItem[] = [
  {
    Icon: AudioLines,
    anim: "btt",
    tag: "Zumbido",
    image: IMG.medico,
    title: "Acufenometria",
    desc: "Avaliação utilizada para caracterizar o zumbido percebido pelo paciente. Procura identificar a frequência, a intensidade e outras características do som, fornecendo informações importantes para o planejamento terapêutico.",
  },
  {
    Icon: Zap,
    anim: "ttb",
    tag: "Zumbido",
    image: IMG.estetoscopio,
    title: "Eletrococleografia",
    desc: "Registra as respostas elétricas produzidas pela cóclea e pelo nervo auditivo. Auxilia na investigação de alterações da orelha interna, como a hidropsia endolinfática associada à doença de Ménière, e na avaliação de casos com suspeita de neuropatia auditiva.",
  },
  {
    Icon: Target,
    anim: "ltr",
    tag: "Zumbido",
    image: IMG.livros,
    title: "P300",
    desc: "Potencial auditivo que avalia atividades cerebrais relacionadas à atenção, à discriminação dos sons e à memória auditiva. Durante o exame, o paciente deve prestar atenção e identificar determinados estímulos sonoros.",
  },
  {
    Icon: ScanLine,
    anim: "ltr",
    tag: "Zumbido",
    image: IMG.estudo,
    title: "Mismatch Negativity — MMN",
    desc: "Analisa a capacidade automática do cérebro de perceber mudanças entre os sons. Como não exige uma resposta ativa, pode complementar a avaliação auditiva de crianças e de pacientes com dificuldade para realizar tarefas convencionais.",
  },
  {
    Icon: Brain,
    anim: "btt",
    tag: "Zumbido",
    image: IMG.profissional,
    title: "Potencial Evocado Auditivo de Média Latência",
    desc: "Avalia principalmente a atividade das vias auditivas tálamo-corticais e do córtex auditivo primário, permitindo analisar a chegada e o processamento inicial do som em cada hemisfério cerebral. Possibilita comparar as respostas entre as orelhas e entre os hemisférios, auxiliando na identificação de assimetrias funcionais e de alterações nas vias auditivas centrais.",
  },
];

const VESTIBULARES: ExameItem[] = [
  {
    Icon: Eye,
    anim: "ltr",
    tag: "Equilíbrio",
    image: IMG.maos,
    title: "Vectoeletronistagmografia",
    desc: "Avalia o funcionamento do sistema vestibular, responsável pelo equilíbrio. Registra os movimentos dos olhos durante diferentes provas e auxilia na investigação de tontura, vertigem, náusea e desequilíbrio, ajudando a identificar se a origem do sintoma está no labirinto ou no Sistema Nervoso Central.",
  },
  {
    Icon: PersonStanding,
    anim: "btt",
    tag: "Equilíbrio",
    image: IMG.idosa,
    title: "Posturografia",
    desc: "Analisa o equilíbrio corporal em diferentes condições e verifica como os sistemas visual, vestibular e proprioceptivo participam da manutenção da postura. Contribui para a identificação do risco de quedas e para o planejamento da reabilitação.",
  },
  {
    Icon: Ear,
    anim: "btt",
    tag: "Equilíbrio",
    image: IMG.maeFilhos,
    title: "VEMP Ocular e Cervical",
    desc: "Os Potenciais Evocados Miogênicos Vestibulares avaliam estruturas da orelha interna relacionadas ao equilíbrio. O VEMP ocular investiga principalmente a função utricular e o nervo vestibular superior; o VEMP cervical avalia principalmente a função sacular e o nervo vestibular inferior.",
  },
  {
    Icon: RotateCw,
    anim: "ltr",
    tag: "Equilíbrio",
    image: IMG.criancaAoAr,
    title: "Video Head Impulse Test — vHIT",
    desc: "Avalia o reflexo responsável por manter a visão estável durante os movimentos rápidos da cabeça. Permite analisar o funcionamento dos seis canais semicirculares de forma independente e identificar alterações vestibulares de maneira rápida e objetiva, sem causar sintomas de tontura.",
  },
];

const VOZ: ExameItem[] = [
  {
    Icon: Mic2,
    anim: "btt",
    tag: "Voz",
    image: IMG.microfone,
    title: "Análise Acústica da Voz",
    desc: "Realiza uma análise computadorizada das características da voz, como frequência, intensidade, estabilidade e presença de ruído. Os resultados complementam a avaliação clínica e ajudam no acompanhamento da evolução durante o tratamento vocal.",
  },
  {
    Icon: Video,
    anim: "ltr",
    tag: "Voz",
    image: IMG.salaClinica,
    title: "Videonasolaringoscopia/Videolaringoscopia",
    desc: "Permite visualizar a laringe e as pregas vocais durante a respiração e a produção da voz. Auxilia na identificação de alterações estruturais, lesões, inflamações e dificuldades de movimentação ou fechamento das pregas vocais.",
  },
];

const CATEGORIA_NOMES = [
  "Exames Auditivos e Eletrofisiológicos",
  "Exames Especializados em Zumbido e Vias Auditivas",
  "Exames Vestibulares (Equilíbrio)",
  "Exames de Voz e Laringe",
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
        <motion.div {...delay(0)}>
        </motion.div>

        <h1 className="text-[2.8rem] sm:text-[3.6rem] lg:text-[4.4rem] font-semibold text-[#02173B] leading-[1] tracking-[-0.035em] mb-6">
          <TextReveal text="Exames" delay={0.08} />
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
          {["Audição", "Equilíbrio", "Voz"].map((a, i) => (
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
            href="#exames"
            className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
          >
            Ver todos os exames
          </a>
        </motion.div>
      </div>

      <motion.div {...delay(0.5)} className="relative mt-16 lg:mt-20 overflow-hidden">
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
        />
        <div
          className="hidden sm:block absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }}
        />
        <div className="flex w-max synapse-marquee-left">
          {[...CATEGORIA_NOMES, ...CATEGORIA_NOMES, ...CATEGORIA_NOMES, ...CATEGORIA_NOMES].map(
            (name, i) => (
              <span key={i} className="flex-none inline-flex items-center">
                <span className="px-5 sm:px-8 text-[0.72rem] sm:text-[0.86rem] font-medium text-[#02173B]/55 whitespace-nowrap">
                  {name}
                </span>
                <span className="w-px h-4 bg-[#02173B]/12" aria-hidden="true" />
              </span>
            ),
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Card de exame (imagem + card interno, padrão das áreas de atuação) ──────

function ExameCard({
  Icon,
  anim,
  tag,
  image,
  title,
  desc,
  index = 0,
  fixedWidth = false,
}: ExameItem & { index?: number; fixedWidth?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      {...delay(index * 0.05)}
      className={`relative flex flex-col overflow-hidden rounded-[26px] group min-w-0 ${
        fixedWidth
          ? "w-[280px] sm:w-[330px] flex-none"
          : "w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
      }`}
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
      <div className="absolute top-5 left-5">
        <span className="inline-flex items-center bg-white/15 backdrop-blur-md text-white text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full">
          {tag}
        </span>
      </div>

      <div className="h-[240px] sm:h-[260px] flex-none" aria-hidden="true" />

      <div className="relative px-4 pb-4 mt-auto">
        <div className="bg-white rounded-2xl p-5 transition-all duration-500 ease-out group-hover:shadow-[0_18px_44px_rgba(2,23,59,0.28)]">
          <div className="flex items-start gap-3.5 mb-3 min-h-[2.9rem]">
            <div
              className={`synapse-icon-wipe-${anim} w-10 h-10 rounded-xl flex items-center justify-center flex-none`}
              style={{ backgroundColor: C.primary }}
            >
              <Icon size={18} strokeWidth={2} style={{ color: C.navy }} />
            </div>
            <h3 className="min-w-0 break-words text-[#02173B] text-[0.95rem] font-semibold leading-snug pt-1">
              {title}
            </h3>
          </div>

          <div
            className={`relative overflow-hidden transition-[max-height] duration-500 ease-out ${
              open ? "max-h-[22rem]" : "max-h-[2.3rem]"
            }`}
          >
            <p className="text-[#02173B]/55 text-[0.82rem] leading-snug">{desc}</p>
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

/** Card de chamada no fim de um grid. */
function CtaCard({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      {...delay(index * 0.05)}
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
            Precisa realizar algum desses exames?
          </h3>
          <p className="text-white/55 text-[0.92rem] leading-relaxed">
            Fale com a nossa equipe e agende o seu horário.
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

// ─── Seção de categoria (grid claro) ─────────────────────────────────────────

function CategoriaSection({
  eyebrow,
  title,
  items,
  bg,
  withCta,
  id,
}: {
  eyebrow: string;
  title: string;
  items: ExameItem[];
  bg: "white" | "ice";
  withCta?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-28 ${bg === "ice" ? "bg-[#EEFBFF]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          {...delay(0)}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-11 lg:mb-14"
        >
          <div className="max-w-2xl">
            <h2 className="text-[1.75rem] md:text-[2.2rem] font-semibold text-[#02173B] leading-[1.12] tracking-[-0.02em]">
              <TextReveal text={title} />
            </h2>
          </div>
          <span className="flex-none inline-flex items-center rounded-full bg-white px-4 py-2 text-[0.8rem] font-semibold text-[#02173B]/60 shadow-[0_2px_10px_-4px_rgba(2,23,59,0.2)]">
            {items.length} {items.length === 1 ? "exame" : "exames"}
          </span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-5">
          {items.map((e, i) => (
            <ExameCard key={e.title} {...e} index={i} />
          ))}
          {withCta && <CtaCard index={items.length} />}
        </div>
      </div>
    </section>
  );
}

// ─── Seção escura com scroll horizontal travado ──────────────────────────────

function HorizontalPinned({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: ExameItem[];
}) {
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

  const pinned = wide && !reduced;

  useLayoutEffect(() => {
    if (!pinned) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      // quanto o trilho precisa andar para o último card aparecer
      setDistance(Math.max(0, t.scrollWidth - window.innerWidth + 96));
    };
    measure();
    const id = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [pinned, items.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Fallback (mobile / movimento reduzido): grid vertical normal
  if (!pinned) {
    return (
      <section className="py-24 lg:py-28" style={{ backgroundColor: C.deepNavy }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...delay(0)} className="mb-11">
            <h2 className="text-[1.75rem] md:text-[2.2rem] font-semibold text-white leading-[1.12] tracking-[-0.02em]">
              <TextReveal text={title} />
            </h2>
          </motion.div>
          <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-2 gap-5">
            {items.map((e, i) => (
              <ExameCard key={e.title} {...e} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: `calc(100vh + ${distance}px)`,
        backgroundColor: C.deepNavy,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(82,212,255,0.14) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full mb-10">
          <h2 className="max-w-2xl text-[1.75rem] md:text-[2.2rem] font-semibold text-white leading-[1.12] tracking-[-0.02em]">
            <TextReveal text={title} />
          </h2>
        </div>

        <div className="relative">
          <motion.div
            ref={trackRef}
            className="flex gap-5 pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6"
            style={{ x }}
          >
            {items.map((e, i) => (
              <ExameCard key={e.title} {...e} index={i} fixedWidth />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Chamada final (imagem + card com ícone) ─────────────────────────────────

function ChamadaFinal() {
  const reduced = useReducedMotion();
  return (
    <section className="px-4 py-24 bg-white">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[36px]"
        style={{ backgroundColor: C.navy }}
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] items-stretch">
          {/* Imagem à esquerda */}
          <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[460px]">
            <img
              src={IMG.cta}
              alt="Sala de exames da clínica com equipamentos especializados"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 lg:bg-gradient-to-r"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,23,59,0.55) 0%, transparent 60%)",
              }}
            />

            {/* Card com ícone sobre a imagem */}
            <div className="float-soft absolute bottom-6 left-6 right-6 sm:right-auto flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_44px_-18px_rgba(2,23,59,0.45)]">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                style={{ backgroundColor: "rgba(82,212,255,0.18)" }}
              >
                <FlaskConical size={18} style={{ color: C.secondary }} />
              </div>
              <div>
                <div className="text-[#02173B] text-[0.82rem] font-semibold leading-tight">
                  Exames especializados
                </div>
                <div className="text-[#02173B]/50 text-[0.7rem]">
                  audição, equilíbrio e voz
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo à direita */}
          <div className="relative px-7 py-16 lg:px-14 lg:py-20 flex flex-col justify-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 20%, rgba(82,212,255,0.16) 0%, transparent 58%)",
              }}
            />
            <div className="relative">
              <BigWave bars={26} className="h-9 mb-7 justify-start opacity-90" />
              <h2 className="text-[1.6rem] md:text-[2.1rem] font-semibold text-white leading-[1.16] tracking-[-0.02em] mb-8">
                <TextReveal text="Ficou com alguma dúvida sobre qual exame realizar? Fale conosco antes de agendar." />
              </h2>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex self-start items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-7 py-3.5 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle size={18} className="flex-none" />
                Fale conosco
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Exames() {
  return (
    <>
      <Hero />
      <CategoriaSection
        id="exames"
        eyebrow="Audição"
        title="Exames Auditivos e Eletrofisiológicos"
        items={AUDITIVOS}
        bg="white"
        withCta
      />
      <HorizontalPinned
        eyebrow="Zumbido"
        title="Exames Especializados em Zumbido e Vias Auditivas"
        items={ZUMBIDO}
      />
      <CategoriaSection
        eyebrow="Equilíbrio"
        title="Exames Vestibulares (Equilíbrio)"
        items={VESTIBULARES}
        bg="white"
        withCta
      />
      <CategoriaSection
        eyebrow="Voz"
        title="Exames de Voz e Laringe"
        items={VOZ}
        bg="ice"
        withCta
      />
      <ChamadaFinal />
    </>
  );
}
