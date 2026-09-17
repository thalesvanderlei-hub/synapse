import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Link } from "react-router";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock,
  GraduationCap,
  Microscope,
  Users,
  CalendarCheck,
  Layers,
} from "lucide-react";
import heroImg from "../../imports/young-mixed-race-mother-babysitting-her-adorable-three-year-old-son-using-wireless-headset.jpg";
import {
  C,
  ease,
  delay,
  Eyebrow,
  MiniWave,
  TextReveal,
  WaveFormation,
} from "../lib/theme";
import {
  CONVENIOS,
  SERVICES,
  BENEFITS,
  TESTIMONIALS,
  WHATSAPP,
  COURSE_URL,
  MAPS_EMBED,
  ADDRESS,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
} from "../lib/data";

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

// ─── Hero ───────────────────────────────────────────────────────────────────

type HeroBox = {
  top: number;
  left: number;
  w: number;
  h: number;
  sw: number;
  sh: number;
};

/** Imagem + cards flutuantes da hero (usada inline no mobile, overlay no desktop). */
function HeroVisual({
  radius,
  cardsOpacity,
  cardsY,
  cardsPE,
  cardsVis,
}: {
  radius: MotionValue<number> | number;
  cardsOpacity?: MotionValue<number>;
  cardsY?: MotionValue<number>;
  cardsPE?: MotionValue<string>;
  cardsVis?: MotionValue<string>;
}) {
  const reduced = useReducedMotion();
  // Mobile: o CTA verde fica oculto até o toque no card (equivalente ao hover).
  const [openMobile, setOpenMobile] = useState(false);
  const cardFade = cardsOpacity
    ? ({
        opacity: cardsOpacity,
        y: cardsY,
        pointerEvents: cardsPE,
        visibility: cardsVis,
      } as const)
    : undefined;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease, delay: 0.25 }}
      className="relative h-full w-full"
    >
      <motion.div
        className="relative overflow-hidden bg-[#c7ecf8] h-full w-full"
        style={{ borderRadius: radius }}
      >
        <img
          src={heroImg}
          alt="Mãe e filho utilizando fone de ouvido durante atendimento"
          className="w-full h-full object-cover object-[30%_center] lg:object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(2,23,59,0.35) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Card: destaque (topo) — sai de cena quando a imagem expande */}
      <motion.div
        className="absolute top-4 left-4 lg:top-5 lg:left-5"
        style={cardFade}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl shadow-[#02173B]/12 flex items-center gap-3"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
            style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
          >
            <MiniWave />
          </div>
          <div>
            <div className="text-[#02173B] text-[0.82rem] font-semibold leading-tight">
              Avaliação auditiva
            </div>
            <div className="text-[#02173B]/50 text-[0.72rem]">
              completa e humanizada
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Card: agenda (base) — no mobile fica meio dentro, meio fora da imagem */}
      <motion.div
        className="absolute -bottom-16 left-4 right-4 lg:bottom-5 lg:left-5 lg:right-5"
        style={cardFade}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.85 }}
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          className="group/card bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-[#02173B]/14 px-3.5 sm:px-[18px] py-[12px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(2,23,59,0.22)] cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-none"
                style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
              >
                <CalendarCheck size={16} style={{ color: C.secondary }} />
              </div>
              <div className="text-[#02173B] text-[clamp(0.7rem,3vw,0.82rem)] font-semibold whitespace-nowrap">
                Sua próxima avaliação
              </div>
            </div>
            <span
              className="hidden min-[340px]:inline-block text-[clamp(0.56rem,2.4vw,0.65rem)] font-semibold px-2 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: "rgba(82,212,255,0.18)", color: C.navy }}
            >
              Confirmada
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-[#EEFBFF]">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-none text-white text-xs font-semibold"
                style={{ backgroundColor: C.secondary }}
              >
                A
              </div>
              <div>
                <div className="text-[#02173B] text-[0.78rem] font-semibold leading-tight">
                  Anália Correia
                </div>
                <div className="text-[#02173B]/50 text-[0.68rem]">
                  Fonoaudióloga
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#02173B] text-[0.78rem] font-semibold leading-tight">
                08:30
              </div>
              <div className="text-[#02173B]/50 text-[0.68rem] whitespace-nowrap">Seg, 21 jul</div>
            </div>
          </div>

          {/* Indutor de toque — só mobile, some quando o botão está aberto */}
          <div
            className={`lg:hidden items-center justify-center gap-1.5 pt-3 pb-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#42ADD0] ${
              openMobile ? "hidden" : "flex"
            }`}
          >
            Toque para agendar
            <ChevronDown size={14} className="synapse-nudge flex-none" />
          </div>

          {/* CTA verde — abre no toque (mobile) ou no hover (desktop) */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full text-white text-[clamp(0.64rem,2.9vw,0.95rem)] whitespace-nowrap font-medium px-3 sm:px-4 py-3 overflow-hidden transition-all duration-500 ease-out ${
              openMobile ? "mt-3 max-h-16 opacity-100" : "mt-0 max-h-0 opacity-0"
            } lg:mt-0 lg:max-h-0 lg:opacity-0 lg:group-hover/card:mt-3 lg:group-hover/card:max-h-16 lg:group-hover/card:opacity-100 hover:brightness-105`}
            style={{ backgroundColor: "#25D366" }}
          >
            Quero agendar a minha avaliação
            <ArrowRight size={15} className="flex-none" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -top-8 -right-6 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(82,212,255,0.45) 0%, transparent 70%)",
          filter: "blur(22px)",
          ...(cardFade ? { opacity: cardsOpacity, visibility: cardsVis } : null),
        }}
      />
    </motion.div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  const heroRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<HeroBox | null>(null);

  const scrollFx = desktop && !reduced;

  // Mede a posição da imagem dentro da seção para expandir pelos 4 lados.
  useLayoutEffect(() => {
    if (!scrollFx) {
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
  }, [scrollFx]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Expansão completa aos 75% do scroll da hero; volta ao subir.
  const t = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
  const top = useTransform(t, (v) => (box ? box.top * (1 - v) : 0));
  const left = useTransform(t, (v) => (box ? box.left * (1 - v) : 0));
  const width = useTransform(t, (v) => (box ? box.w + (box.sw - box.w) * v : 0));
  const height = useTransform(t, (v) => (box ? box.h + (box.sh - box.h) * v : 0));
  const radius = useTransform(t, (v) => 32 * (1 - v));

  const cardsOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 0.12], [0, -20]);
  const cardsPE = useTransform(cardsOpacity, (v) => (v < 0.05 ? "none" : "auto"));
  const cardsVis = useTransform(cardsOpacity, (v) =>
    v < 0.02 ? "hidden" : "visible",
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -48]);

  const overlayActive = scrollFx && box !== null;

  return (
    <section
      ref={heroRef}
      className="relative bg-[#EEFBFF] overflow-hidden flex items-center pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 lg:min-h-screen"
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

      <div className="relative w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_700px] gap-12 lg:gap-16 items-stretch">
        {/* Texto */}
        <motion.div
          className="flex flex-col order-2 lg:order-1"
          style={scrollFx ? { opacity: textOpacity, y: textY } : undefined}
        >
          <h1 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.3rem] font-semibold text-[#02173B] leading-[1.04] tracking-[-0.03em] mb-6">
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.08 }}
              >
                Cuidar da <span style={{ color: C.secondary }}>audição</span>
              </motion.span>
            </span>
            <TextReveal
              text="é cuidar da comunicação, do equilíbrio e da qualidade de vida."
              delay={0.2}
            />
          </h1>

          <motion.p
            {...delay(0.5)}
            className="text-[#02173B]/55 text-[1rem] leading-relaxed mb-9 max-w-md"
          >
            Ciência, tecnologia e cuidado humano para sua audição, em todas as idades.
          </motion.p>

          <motion.div {...delay(0.6)} className="flex flex-wrap gap-3.5 mb-12 lg:mb-0">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.95rem] hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#52D4FF]/30 hover:-translate-y-0.5"
            >
              Agende agora
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.95rem] ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
            >
              Conheça nossos serviços
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            {...delay(0.7)}
            className="grid grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:gap-x-12 lg:gap-y-6 lg:mt-auto lg:pt-10"
          >
            {[
              { n: "5", l: "áreas de atuação", Icon: Layers },
              { n: "+10", l: "exames auditivos", Icon: Microscope },
              { n: "Todas", l: "as idades", Icon: Users },
            ].map(({ n, l, Icon }, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 lg:gap-2.5 mb-1.5 lg:mb-2">
                  <div
                    className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-none"
                    style={{ backgroundColor: "rgba(82,212,255,0.14)" }}
                  >
                    <Icon size={15} strokeWidth={2} style={{ color: C.secondary }} />
                  </div>
                  <div className="text-[1.05rem] lg:text-[1.45rem] font-semibold leading-none text-[#02173B]">
                    {n}
                  </div>
                </div>
                <div className="text-[#02173B]/50 text-[0.7rem] lg:text-[0.82rem]">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Slot da imagem — mantém o layout; no desktop a imagem vira overlay */}
        <div
          ref={slotRef}
          className="relative order-1 lg:order-2 h-[400px] sm:h-[480px] mb-12 lg:mb-0 lg:h-full lg:min-h-[620px]"
        >
          {!overlayActive && <HeroVisual radius={32} />}
        </div>
      </div>

      {/* Overlay: expande pelos 4 lados até cobrir toda a seção */}
      {overlayActive && (
        <motion.div
          className="absolute z-20"
          style={{ top, left, width, height }}
        >
          <HeroVisual
            radius={radius}
            cardsOpacity={cardsOpacity}
            cardsY={cardsY}
            cardsPE={cardsPE}
            cardsVis={cardsVis}
          />
        </motion.div>
      )}
    </section>
  );
}

// ─── Convênios (infinite marquee w/ white fade edges) ────────────────────────

function Convenios() {
  const doubled = [...CONVENIOS, ...CONVENIOS];
  return (
    <section className="bg-white py-12 border-y border-[#02173B]/06">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[0.72rem] font-semibold text-[#02173B]/35 uppercase tracking-[0.18em] mb-8">
          Convênios atendidos
        </p>
        <div className="relative overflow-hidden">
          {/* fade edges */}
          <div
            className="absolute inset-y-0 left-0 w-8 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-8 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }}
          />
          <div className="flex w-max synapse-marquee-left items-center">
            {doubled.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-10 flex-none h-16"
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{ maxHeight: c.h }}
                  className="w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sobre ───────────────────────────────────────────────────────────────────

function Sobre() {
  const reduced = useReducedMotion();
  return (
    <section id="sobre" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Reveal da esquerda para a direita */}
        <motion.div
          initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease }}
          className="relative order-2 lg:order-1 overflow-hidden"
          style={{ borderRadius: "28px" }}
        >
          <motion.div
            initial={reduced ? false : { scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease }}
            className="relative bg-[#EEFBFF]"
            style={{ aspectRatio: "5/4" }}
          >
            <img
              src="https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?w=800&h=640&fit=crop&auto=format&q=80"
              alt="Atendimento de fonoaudiologia em clínica moderna"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div {...delay(0.14)} className="order-1 lg:order-2">
                    <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] mb-6">
            <TextReveal text="Ciência, tecnologia e cuidado humano em cada atendimento" />
          </h2>
          <p className="text-[#02173B]/58 text-[1rem] leading-relaxed mb-8">
            A Synapse Reabilitação Neurofuncional atua nas diferentes áreas da
            Fonoaudiologia, incluindo motricidade orofacial, disfagia, voz,
            linguagem e audiologia. Cada atendimento é conduzido de forma
            individual, unindo profissionais qualificados, tecnologia e prática
            baseada em evidências científicas para promover comunicação,
            autonomia e bem-estar em cada fase da vida.
          </p>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 text-[#02173B] font-medium text-base group border-b-2 border-[#52D4FF] pb-1"
          >
            Conheça nossa história
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Serviços (image cards w/ pill label + internal description) ─────────────

function Servicos() {
  return (
    <section id="servicos" className="py-28 lg:py-36 bg-[#EEFBFF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div {...delay(0)} className="max-w-xl">
                        <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em]">
              <TextReveal text="Cuidado especializado em todas as fases da vida" />
            </h2>
          </motion.div>
          <motion.div {...delay(0.1)} className="flex-none">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 bg-[#02173B] text-white font-medium text-sm px-6 py-3.5 rounded-full hover:bg-[#52D4FF] hover:text-[#02173B] transition-all duration-300 group"
            >
              Ver todos os serviços
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ Icon, tag, description, anim }, i) => (
            <motion.div
              key={i}
              {...delay(i * 0.08)}
              className="relative overflow-hidden group cursor-default"
              style={{ borderRadius: "26px", aspectRatio: "4/5" }}
            >
              <img
                src={SERVICES[i].image}
                alt={SERVICES[i].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(2,16,42,0.88) 0%, rgba(2,16,42,0.25) 45%, rgba(2,16,42,0.05) 100%)",
                }}
              />

              {/* Pill label */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center bg-white/15 backdrop-blur-md text-white text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              </div>

              {/* Internal description card — eleva no hover, ícone com reveal interno */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white rounded-2xl px-5 h-[104px] flex items-center gap-3.5 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_18px_44px_rgba(2,23,59,0.28)]">
                  <div
                    className={`synapse-icon-wipe-${anim} w-10 h-10 rounded-xl flex items-center justify-center flex-none`}
                    style={{ backgroundColor: C.primary }}
                  >
                    <Icon size={18} strokeWidth={2} style={{ color: C.navy }} />
                  </div>
                  <div>
                    <h3 className="text-[#02173B] text-[1.05rem] font-semibold mb-1">
                      {SERVICES[i].title}
                    </h3>
                    <p className="text-[#02173B]/55 text-[0.82rem] leading-snug line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div {...delay(SERVICES.length * 0.08)}>
            <Link
              to="/servicos"
              className="relative overflow-hidden flex flex-col justify-between p-7 group hover:-translate-y-1 transition-transform duration-300 h-full"
              style={{
                borderRadius: "26px",
                aspectRatio: "4/5",
                background: `linear-gradient(150deg, ${C.navy} 0%, ${C.secondary} 140%)`,
              }}
            >
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
                >
                  <ArrowUpRight size={20} className="text-white" />
                </div>
                <h3 className="text-white text-[1.4rem] font-semibold leading-tight mb-2">
                  Explore todos os nossos serviços
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Consulta, exames especializados, reabilitação vestibular,
                  tratamento do zumbido e muito mais.
                </p>
              </div>
              <div className="relative flex items-center gap-2 text-white font-medium text-sm">
                Ver todos os serviços
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Diferencial + Benefits ──────────────────────────────────────────────────

function Diferencial() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start mb-20">
          <motion.div {...delay(0)}>
            <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] [text-wrap:balance]">
              <TextReveal text="Em Maceió, tudo que você precisa em um só lugar" />
            </h2>
          </motion.div>
          <motion.p {...delay(0.14)} className="text-[#02173B]/58 text-[1rem] leading-relaxed">
            Em Maceió, é raro encontrar uma clínica que reúna, em um só espaço,
            todas as áreas da Fonoaudiologia com foco especial em audição. A
            Synapse nasceu para oferecer esse cuidado completo, unindo
            especialidades que normalmente estão espalhadas em diferentes locais.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[#02173B]/08">
          {BENEFITS.map(({ Icon, title, text }, i) => (
            <motion.div
              key={i}
              {...delay(0.1 + i * 0.08)}
              className="group py-9 lg:pr-8 border-b sm:border-b-0 border-[#02173B]/08 lg:border-r lg:last:border-r-0 lg:pl-8 lg:first:pl-0"
            >
              <div
                className="synapse-icon-wipe-ltr w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(82,212,255,0.12)" }}
              >
                <Icon size={20} style={{ color: C.secondary }} />
              </div>
              <h3 className="text-[#02173B] text-[1.05rem] font-semibold mb-2.5">{title}</h3>
              <p className="text-[#02173B]/55 text-[0.9rem] leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Curso (dark band) ───────────────────────────────────────────────────────

// Mockup do curso — largar a imagem (tablet) em src/assets/fotos/home/.
// Pega o arquivo cujo nome tenha mockup/curso/zumbido/360, senão o primeiro.
const CURSO_MOCKUP: string | null = (() => {
  const files = import.meta.glob<string>(
    "../../assets/fotos/home/*.{png,webp,jpg,jpeg,PNG,WEBP,JPG,JPEG}",
    { eager: true, query: "?url", import: "default" },
  );
  const entries = Object.entries(files);
  if (entries.length === 0) return null;
  const preferred = entries.find(([p]) => /mockup|curso|zumbido|360/i.test(p));
  return (preferred ?? entries[0])[1];
})();

function Curso() {
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

  // A banda entra ocupando a tela inteira e encolhe até o estágio padrão.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.15"],
  });
  const target = Math.min(1280, vw - 32);
  const bandWidth = useTransform(scrollYProgress, (v) => vw - (vw - target) * v);
  const bandRadius = useTransform(scrollYProgress, (v) => 36 * v);

  return (
    <section ref={ref} className="relative pt-4 pb-24 bg-white overflow-hidden">
      <motion.div
        className="relative mx-auto overflow-hidden"
        style={
          reduced
            ? {
                width: "min(1280px, calc(100% - 32px))",
                borderRadius: 36,
                backgroundColor: C.navy,
              }
            : {
                width: bandWidth,
                borderRadius: bandRadius,
                backgroundColor: C.navy,
              }
        }
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 85% 30%, rgba(82,212,255,0.14) 0%, transparent 55%)",
          }}
        />
        <div className="relative px-8 py-16 lg:px-16 lg:py-20 grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">
          <motion.div {...delay(0)} className="max-w-xl">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
              >
                <GraduationCap size={17} style={{ color: C.primary }} />
              </div>
              <span className="text-[0.7rem] font-semibold text-[#52D4FF] uppercase tracking-[0.16em]">
                Formação
              </span>
            </div>
            <h2 className="text-[2rem] md:text-[2.6rem] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-5 text-balance">
              <TextReveal text="Para profissionais que querem ir além" />
            </h2>
            <p className="text-white/55 text-[1rem] leading-relaxed mb-9 max-w-[440px] text-pretty">
              Além do atendimento clínico, a Synapse também oferece formação para
              fonoaudiólogos interessados em aprofundar seus conhecimentos e sua
              prática clínica.
            </p>
            <a
              href={COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.95rem] hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Conheça o curso
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Coluna direita — mockup do curso */}
          {CURSO_MOCKUP ? (
            // Reserva de altura da banda (o mockup é sobreposto e cortado embaixo).
            <div className="h-[300px] sm:h-[360px] lg:h-[320px]" aria-hidden="true" />
          ) : (
            <motion.div {...delay(0.14)} className="relative">
              <div
                className="relative overflow-hidden flex items-center justify-center"
                style={{
                  borderRadius: "24px",
                  aspectRatio: "4/3",
                  background:
                    "linear-gradient(150deg, rgba(255,255,255,0.06) 0%, rgba(82,212,255,0.10) 100%)",
                  border: "1px dashed rgba(255,255,255,0.18)",
                }}
              >
                <div className="flex flex-col items-center gap-3 text-center px-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(82,212,255,0.16)" }}
                  >
                    <GraduationCap size={22} style={{ color: C.primary }} />
                  </div>
                  <span className="text-white/50 text-sm">
                    Mockup do curso em breve
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mockup dentro do frame azul — cortado no limite inferior da banda */}
        {CURSO_MOCKUP && (
          <img
            src={CURSO_MOCKUP}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[300px] sm:w-[360px] lg:left-auto lg:translate-x-0 lg:right-12 xl:right-24 lg:w-[380px] xl:w-[420px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
          />
        )}
      </motion.div>
    </section>
  );
}

// ─── Depoimentos ─────────────────────────────────────────────────────────────

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div
      className="flex-none w-[340px] bg-white rounded-[22px] p-6 mx-2.5"
      style={{ boxShadow: "0 4px 24px rgba(2,23,59,0.06)" }}
    >
      <div className="flex gap-1 mb-4" style={{ color: C.primary }}>
        {"★★★★★".split("").map((s, i) => (
          <span key={i} className="text-sm">
            {s}
          </span>
        ))}
      </div>
      <p className="text-[#02173B]/70 text-[0.88rem] leading-relaxed mb-5 line-clamp-5">
        {text}
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex-none flex items-center justify-center"
          style={{ backgroundColor: "rgba(82,212,255,0.2)" }}
        >
          <span className="text-[#02173B] text-xs font-semibold">{name[0]}</span>
        </div>
        <span className="text-[#02173B] text-sm font-semibold">{name}</span>
      </div>
    </div>
  );
}

function Depoimentos() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="depoimentos" className="py-28 lg:py-36 overflow-hidden bg-[#EEFBFF]">
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <motion.div {...delay(0)} className="flex flex-col items-center">
                    <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] max-w-2xl">
            <TextReveal text="Quem passou pela Synapse conta" />
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #EEFBFF 0%, transparent 100%)" }}
        />
        <div
          className="hidden sm:block absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #EEFBFF 0%, transparent 100%)" }}
        />

        <div className="flex w-max synapse-marquee-left mb-5">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} name={t.name} text={t.text} />
          ))}
        </div>
        <div className="flex w-max synapse-marquee-right">
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={i} name={t.name} text={t.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contato ─────────────────────────────────────────────────────────────────

function Contato() {
  return (
    <section id="contato" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...delay(0)} className="mb-16 max-w-2xl">
                    <h2 className="text-[2.1rem] md:text-[2.7rem] font-semibold text-[#02173B] leading-[1.08] tracking-[-0.02em] mb-4">
            <TextReveal text="Venha nos conhecer" />
          </h2>
          <p className="text-[#02173B]/58 text-[1rem] leading-relaxed">
            Estamos localizados em um ponto de fácil acesso em Maceió, prontos
            para te receber com atenção e cuidado especializado.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Coluna de informações */}
          <motion.div {...delay(0.08)} className="flex flex-col">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              <InfoItem
                Icon={MapPin}
                label="Endereço"
                content={ADDRESS}
              />
              <InfoItem
                Icon={Clock}
                label="Horário"
                content="Segunda a sexta, das 8h às 18h ou 19h conforme o dia"
                extra={
                  <Link to="/contato" className="text-[#42ADD0] text-[0.8rem] font-semibold mt-1 inline-block hover:underline">
                    Ver horário completo
                  </Link>
                }
              />
              <InfoItem
                Icon={Phone}
                label="Telefone"
                content={PHONE_DISPLAY}
                href={PHONE_HREF}
              />
              <InfoItem
                Icon={Mail}
                label="E-mail"
                content={EMAIL}
                href={`mailto:${EMAIL}`}
              />
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 sm:gap-2.5 bg-[#52D4FF] text-[#02173B] px-5 sm:px-6 py-3 rounded-full font-medium text-[clamp(0.8rem,3.6vw,0.95rem)] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:-translate-y-0.5 self-start"
            >
              Agende agora o seu horário
              <ArrowRight size={16} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Mapa */}
          <motion.div {...delay(0.18)} className="min-h-[380px] lg:min-h-full">
            <div className="overflow-hidden bg-[#EEFBFF] h-full w-full" style={{ borderRadius: "24px", minHeight: "380px" }}>
              <iframe
                src={MAPS_EMBED}
                className="w-full h-full border-0"
                loading="lazy"
                title="Localização da Synapse Reabilitação Neurofuncional"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  Icon,
  label,
  content,
  href,
  extra,
}: {
  Icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  label: string;
  content: string;
  href?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-none mt-0.5"
        style={{ backgroundColor: "rgba(82,212,255,0.1)" }}
      >
        <Icon size={18} style={{ color: C.secondary }} />
      </div>
      <div>
        <div className="text-[0.8rem] font-semibold text-[#02173B] mb-1">{label}</div>
        {href ? (
          <a
            href={href}
            className="text-[#02173B]/60 text-sm leading-relaxed hover:text-[#02173B] transition-colors"
          >
            {content}
          </a>
        ) : (
          <div className="text-[#02173B]/60 text-sm leading-relaxed">{content}</div>
        )}
        {extra}
      </div>
    </div>
  );
}

// ─── CTA Final ───────────────────────────────────────────────────────────────

function CTAFinal() {
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

  // A onda se forma organicamente, barra a barra, conforme a seção entra na tela.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });

  // A banda entra menor e se expande até o estágio padrão conforme o scroll.
  const target = Math.min(1280, vw - 32);
  const bandWidth = useTransform(
    scrollYProgress,
    (v) => target * 0.85 + target * 0.15 * v,
  );

  return (
    <section ref={ref} className="pt-8 pb-20 bg-white overflow-hidden">
      <motion.div
        className="relative mx-auto overflow-hidden text-center"
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
            background: "radial-gradient(ellipse at 50% 120%, rgba(82,212,255,0.16) 0%, transparent 60%)",
          }}
        />
        <div className="relative px-6 py-24 lg:py-32 max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <WaveFormation progress={scrollYProgress} />
          </div>
          <motion.div {...delay(0)}>
            <h2 className="text-[2rem] md:text-[3rem] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-10">
              <TextReveal text="Marque sua avaliação e dê o primeiro passo para cuidar da sua audição, do seu equilíbrio e da sua comunicação." stagger={0.025} />
            </h2>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-2.5 bg-[#52D4FF] text-[#02173B] px-5 sm:px-6 py-3 rounded-full font-medium text-[clamp(0.8rem,3.6vw,0.95rem)] whitespace-nowrap hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Agende agora o seu horário
              <ArrowRight size={16} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <Convenios />
      <Sobre />
      <Servicos />
      <Diferencial />
      <Curso />
      <Depoimentos />
      <Contato />
      <CTAFinal />
    </>
  );
}
