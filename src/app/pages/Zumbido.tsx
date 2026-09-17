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
  Brain,
  AudioLines,
  HeartHandshake,
  Sparkles,
  Lightbulb,
  Wind,
  Zap,
  Activity,
  Waves,
  MessageCircle,
  Ear,
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

const u = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// Fotografia provisória — PENDÊNCIA: substituir pelo acervo real da clínica.
const IMG = {
  habituacao: u("1506126613408-eca07ce68773"),
  sonora: u("1516627145497-ae6968895b74"),
  aconselhamento: u("1576091160399-112ba8d25d1d"),
  neurocognitivo: u("1522202176988-66273c2fd55f"),
  fotobiomodulacao: u("1629909613654-28e377c37b09"),
  mindfulness: u("1544027993-37dbfe43562a"),
  oque: u("1588776814546-1ffcf47267a5", 900, 900),
  individualizado: u("1573497491208-6b1acb260507", 900, 1000),
};

// ─── Dados (texto 100% literal do copy institucional) ────────────────────────

type TerapiaItem = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  anim: string;
  tag: string;
  image: string;
  title: string;
  desc: string;
};

const TERAPIAS: TerapiaItem[] = [
  {
    Icon: Brain,
    anim: "btt",
    tag: "Habituação",
    image: IMG.habituacao,
    title: "Terapia de Habituação do Zumbido",
    desc: "A terapia de habituação busca ajudar o cérebro a reduzir a importância e a atenção direcionadas ao zumbido. Quando o som é interpretado como uma ameaça, o organismo pode permanecer em estado de alerta, aumentando a vigilância, o estresse e a percepção do sintoma. Com o tratamento, o cérebro aprende gradativamente a reconhecer o zumbido como um estímulo sem significado de perigo. A habituação não significa que o paciente precise ignorar o som ou se acostumar com o sofrimento. O objetivo é fazer com que o zumbido deixe de ocupar o centro da atenção e provoque cada vez menos incômodo durante as atividades diárias. Esse processo pode envolver terapia sonora, aconselhamento, treinamento auditivo, técnicas de atenção e outros recursos terapêuticos.",
  },
  {
    Icon: AudioLines,
    anim: "btt",
    tag: "Som",
    image: IMG.sonora,
    title: "Terapia Sonora",
    desc: "A terapia sonora utiliza sons ambientais, músicas, ruídos terapêuticos, aparelhos auditivos ou estímulos sonoros personalizados. O objetivo é diminuir o contraste entre o zumbido e o silêncio, enriquecer o ambiente auditivo e facilitar o processo de habituação. Os sons são ajustados de acordo com a necessidade de cada paciente, sem necessariamente encobrir completamente o zumbido.",
  },
  {
    Icon: HeartHandshake,
    anim: "ltr",
    tag: "Orientação",
    image: IMG.aconselhamento,
    title: "Aconselhamento",
    desc: "O aconselhamento ajuda o paciente a compreender como o zumbido é percebido e por que fatores como estresse, ansiedade, sono inadequado, silêncio e atenção excessiva podem aumentar o incômodo. Durante o acompanhamento, são fornecidas orientações sobre hábitos auditivos, proteção contra ruídos, sono, rotina, estratégias de enfrentamento e formas de reduzir a reação de alerta associada ao sintoma. Compreender o que acontece no organismo é uma etapa importante para diminuir o medo e a preocupação relacionados ao zumbido.",
  },
  {
    Icon: Sparkles,
    anim: "ltr",
    tag: "Cognição",
    image: IMG.neurocognitivo,
    title: "Treinamento Auditivo Neurocognitivo",
    desc: "O Treinamento Auditivo Neurocognitivo estimula, de forma integrada, as habilidades auditivas e as funções cognitivas envolvidas na escuta. Durante as sessões, podem ser trabalhadas atenção, memória auditiva, localização sonora, compreensão da fala no ruído, figura-fundo e capacidade de direcionar o foco para sons importantes. No tratamento do zumbido, o treinamento ajuda a ampliar a atenção aos sons externos, reduzir a sobrecarga durante a escuta e diminuir o foco excessivo no sintoma.",
  },
  {
    Icon: Lightbulb,
    anim: "ttb",
    tag: "Luz",
    image: IMG.fotobiomodulacao,
    title: "Fotobiomodulação",
    desc: "A fotobiomodulação utiliza luz de baixa intensidade, por meio de laser ou LED, aplicada em regiões selecionadas conforme a avaliação do paciente. A energia luminosa interage com as células e pode auxiliar o metabolismo celular, a produção de energia, a microcirculação e a modulação de processos relacionados à atividade neural. No tratamento do zumbido, pode ser realizada por via transmeatal ou transcraniana, com parâmetros definidos de maneira individualizada.",
  },
  {
    Icon: Wind,
    anim: "ltr",
    tag: "Atenção plena",
    image: IMG.mindfulness,
    title: "Mindfulness",
    desc: "O Mindfulness utiliza exercícios de respiração, atenção plena, percepção corporal e observação das sensações sem julgamentos. A prática ajuda o paciente a modificar sua reação ao zumbido, reduzindo a tensão, o estresse e a necessidade constante de controlar ou vigiar o som. O objetivo não é obrigar a pessoa a ignorar o zumbido, mas permitir que ele seja percebido com menor desconforto emocional.",
  },
];

const NEUROMOD = [
  {
    Icon: Zap,
    title: "Estimulação Transcraniana por Corrente Contínua — tDCS",
    desc: "A tDCS utiliza uma corrente elétrica muito leve, aplicada por meio de eletrodos posicionados no couro cabeludo. No tratamento do zumbido, essa estimulação busca ajudar o cérebro a reorganizar a forma como processa o som, diminuindo a atividade excessiva em áreas relacionadas à audição e reduzindo a atenção e o incômodo provocados pelo sintoma.",
  },
  {
    Icon: Activity,
    title: "Estimulação Transcraniana por Ruído Aleatório — tRNS",
    desc: "A tRNS também utiliza uma corrente elétrica de baixa intensidade, mas com pequenas variações durante a aplicação. Essas variações estimulam o cérebro de forma diferente e podem favorecer sua capacidade de adaptação. No tratamento do zumbido, o objetivo é auxiliar na reorganização das áreas cerebrais envolvidas na percepção contínua do som.",
  },
  {
    Icon: Waves,
    title: "Estimulação Transcutânea do Nervo Vago — tVNS",
    desc: "A tVNS é uma técnica não invasiva realizada por meio da estimulação de regiões da orelha relacionadas ao nervo vago. Esse estímulo pode atuar em redes cerebrais envolvidas na audição, na atenção, no estresse e nas respostas emocionais. A tVNS também pode ser associada a estímulos sonoros para favorecer o processo de reorganização neural.",
  },
];

const TERAPIA_NOMES = TERAPIAS.map((t) => t.title).concat("Neuromodulação");

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

        <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold text-[#02173B] leading-[1.02] tracking-[-0.035em] mb-6">
          <TextReveal text="Tratamento do Zumbido" delay={0.08} />
        </h1>

        <motion.div
          {...delay(0.24)}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mb-9 text-[0.82rem] text-[#02173B]/40"
        >
          {["apito", "chiado", "pressão", "pulsação", "cigarra"].map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && <span className="w-px h-3 bg-[#02173B]/15" aria-hidden="true" />}
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div {...delay(0.34)} className="flex flex-wrap justify-center gap-3.5">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#52D4FF]/30 hover:-translate-y-0.5"
          >
            Agende sua avaliação
            <ArrowRight size={16} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#terapias"
            className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
          >
            Ver as terapias
          </a>
        </motion.div>
      </div>

      <motion.div {...delay(0.44)} className="relative mt-16 lg:mt-20 overflow-hidden">
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
        />
        <div
          className="hidden sm:block absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }}
        />
        <div className="flex w-max synapse-marquee-left">
          {[...TERAPIA_NOMES, ...TERAPIA_NOMES].map((name, i) => (
            <span key={i} className="flex-none inline-flex items-center">
              <span className="px-5 sm:px-8 text-[0.72rem] sm:text-[0.86rem] font-medium text-[#02173B]/55 whitespace-nowrap">
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

// ─── O que é o zumbido ───────────────────────────────────────────────────────

function OQueE() {
  const { ref, show } = useRevealOnScroll<HTMLDivElement>();
  const reduced = useReducedMotion();
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Imagem representativa com tópico sobreposto */}
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
          <div className="relative bg-[#c7ecf8]" style={{ aspectRatio: "5/4" }}>
            <img
              src={IMG.oque}
              alt="Representação do zumbido — som percebido sem fonte externa"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,16,42,0.62) 0%, transparent 55%)",
              }}
            />
          </div>

          <span
            aria-hidden="true"
            className="synapse-pulse-ring absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#52D4FF]/60 pointer-events-none"
          />
          <span
            aria-hidden="true"
            className="synapse-pulse-ring absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#52D4FF]/60 pointer-events-none"
            style={{ animationDelay: "1.8s" }}
          />

          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_44px_-18px_rgba(2,23,59,0.4)] backdrop-blur">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-none"
              style={{ backgroundColor: "rgba(82,212,255,0.18)" }}
            >
              <Ear size={20} style={{ color: C.secondary }} />
            </div>
            <div className="min-w-0">
              <div className="text-[#02173B] text-[0.9rem] font-semibold leading-tight">
                Zumbido
              </div>
              <div className="text-[#02173B]/50 text-[0.74rem]">
                um som sem fonte sonora externa
              </div>
            </div>
            <MiniWave />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div {...delay(0.12)} className="order-1 lg:order-2">
          <h2 className="text-[1.9rem] md:text-[2.6rem] font-semibold text-[#02173B] leading-[1.1] tracking-[-0.02em] mb-6">
            <TextReveal text="O que é o zumbido" />
          </h2>
          <p className="text-[#02173B]/60 text-[1rem] leading-relaxed mb-6">
            O zumbido é a percepção de um som sem que exista uma fonte sonora
            externa correspondente. Pode ser percebido como apito, chiado,
            pressão, pulsação, cigarra ou outros tipos de sons. Seu aparecimento
            pode estar relacionado a fatores auditivos, neurológicos, emocionais,
            musculares, metabólicos ou à combinação de diferentes condições. Por
            esse motivo, o tratamento deve ser individualizado e definido após
            uma avaliação detalhada.
          </p>
          <div className="rounded-2xl bg-[#EEFBFF] p-6">
            <p className="text-[#02173B]/70 text-[1rem] leading-relaxed">
              Nem todos os pacientes precisam realizar todas as terapias. Os
              recursos são selecionados e combinados de acordo com as
              características do zumbido, os exames realizados e o impacto do
              sintoma na qualidade de vida.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Card de terapia (imagem + card interno + acordeão) ──────────────────────

function TerapiaCard({
  Icon,
  anim,
  tag,
  image,
  title,
  desc,
  index = 0,
  fixedWidth = false,
}: TerapiaItem & { index?: number; fixedWidth?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      {...delay(index * 0.05)}
      className={`relative flex flex-col overflow-hidden rounded-[26px] group min-w-0 ${
        fixedWidth
          ? "w-[290px] sm:w-[340px] flex-none"
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
            <h3 className="min-w-0 break-words text-[#02173B] text-[0.98rem] font-semibold leading-snug pt-1">
              {title}
            </h3>
          </div>

          <div
            className={`relative overflow-hidden transition-[max-height] duration-500 ease-out ${
              open ? "max-h-[30rem]" : "max-h-[2.3rem]"
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

function Terapias() {
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
      setDistance(Math.max(0, t.scrollWidth - window.innerWidth + 96));
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

  const Header = (
    <>
      <h2 className="text-[1.9rem] md:text-[2.4rem] font-semibold text-[#02173B] leading-[1.1] tracking-[-0.02em]">
        <TextReveal text="Terapias" />
      </h2>
    </>
  );

  // Mobile / movimento reduzido: grid vertical normal
  if (!pinned) {
    return (
      <section id="terapias" className="py-24 lg:py-28 bg-[#EEFBFF]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...delay(0)} className="max-w-2xl mb-11 lg:mb-14">
            {Header}
          </motion.div>
          <div className="flex flex-wrap justify-center gap-5">
            {TERAPIAS.map((t, i) => (
              <TerapiaCard key={t.title} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="terapias"
      ref={sectionRef}
      className="relative bg-[#EEFBFF]"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="relative max-w-7xl mx-auto px-6 w-full mb-10">{Header}</div>

        <div className="relative">
          <motion.div
            ref={trackRef}
            className="flex gap-5 pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6"
            style={{ x }}
          >
            {TERAPIAS.map((t, i) => (
              <TerapiaCard key={t.title} {...t} index={i} fixedWidth />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Neuromodulação (banda escura) ───────────────────────────────────────────

function Neuromodulacao() {
  return (
    <section className="px-4 pt-20 lg:pt-28 pb-6 bg-white">
      <div
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[36px] px-7 py-20 lg:px-16 lg:py-24"
        style={{ backgroundColor: C.deepNavy }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 15%, rgba(82,212,255,0.14) 0%, transparent 55%)",
          }}
        />

        <div className="relative">
          <div className="max-w-3xl mb-12 lg:mb-14">
            <h2 className="text-[1.9rem] md:text-[2.4rem] font-semibold text-white leading-[1.12] tracking-[-0.02em] mb-5">
              <TextReveal text="Neuromodulação" />
            </h2>
            <p className="text-white/55 text-[1rem] leading-relaxed">
              A neuromodulação utiliza estímulos elétricos de baixa intensidade
              para modificar temporariamente a atividade de redes neurais
              relacionadas à audição, à atenção, às emoções e à percepção do
              zumbido.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {NEUROMOD.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...delay(i * 0.08)}
                className="min-w-0 w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
                >
                  <Icon size={19} style={{ color: C.primary }} />
                </div>
                <h3 className="text-white text-[1rem] font-semibold leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-white/50 text-[0.86rem] leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tratamento individualizado (chamada final) ──────────────────────────────

function TratamentoIndividualizado() {
  const reduced = useReducedMotion();
  return (
    <section className="px-4 pt-6 pb-24 bg-white">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[36px] bg-[#EEFBFF]"
      >
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] items-stretch">
          {/* Imagem à esquerda, na proporção da caixa */}
          <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-full">
            <img
              src={IMG.individualizado}
              alt="Profissional acolhedor em atendimento na clínica"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,23,59,0.5) 0%, transparent 55%)",
              }}
            />
            <div className="float-soft absolute bottom-6 left-6 right-6 sm:right-auto flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_44px_-18px_rgba(2,23,59,0.4)]">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                style={{ backgroundColor: "rgba(82,212,255,0.18)" }}
              >
                <HeartHandshake size={18} style={{ color: C.secondary }} />
              </div>
              <div>
                <div className="text-[#02173B] text-[0.82rem] font-semibold leading-tight">
                  Cuidado individualizado
                </div>
                <div className="text-[#02173B]/50 text-[0.7rem]">
                  avaliação clínica e audiológica
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo à direita */}
          <div className="px-7 py-16 lg:px-14 lg:py-20 flex flex-col justify-center">
            <BigWave bars={26} className="h-9 mb-7 justify-start opacity-80" />
            <h2 className="mt-1 text-[1.7rem] md:text-[2.3rem] font-semibold text-[#02173B] leading-[1.14] tracking-[-0.02em] mb-6">
              <TextReveal text="Tratamento individualizado" />
            </h2>
            <p className="text-[#02173B]/60 text-[1rem] leading-relaxed mb-5">
              A escolha das terapias é realizada após avaliação clínica e
              audiológica. O acompanhamento pode incluir questionários, escalas
              de percepção, acufenometria e outros exames para monitorar a
              evolução do paciente. O tratamento busca reduzir o incômodo
              provocado pelo zumbido, melhorar o sono, a concentração, o
              bem-estar e a qualidade de vida.
            </p>
            <p className="text-[#02173B]/60 text-[1rem] leading-relaxed mb-9">
              As técnicas de neuromodulação e fotobiomodulação são realizadas
              após triagem, análise de contraindicações e definição
              individualizada dos parâmetros.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex self-start items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-7 py-3.5 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={18} className="flex-none" />
              Agende sua avaliação
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Zumbido() {
  return (
    <>
      <Hero />
      <OQueE />
      <Terapias />
      <Neuromodulacao />
      <TratamentoIndividualizado />
    </>
  );
}
