import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

// ─── Palette (Synapse brand) ────────────────────────────────────────────────
export const C = {
  primary: "#52D4FF",
  secondary: "#42ADD0",
  navy: "#02173B",
  deepNavy: "#02102A",
  ice: "#EEFBFF",
  white: "#FFFFFF",
};

// ─── Animation ──────────────────────────────────────────────────────────────

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
};

export function delay(d: number) {
  return { ...fadeUp, transition: { ...fadeUp.transition, delay: d } };
}

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold text-[#42ADD0] uppercase tracking-[0.16em] mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-[#52D4FF]" />
    {children}
  </span>
);

// ─── Reveal on scroll (IO + fallback manual — nunca fica preso) ──────────────

export function useRevealOnScroll<T extends HTMLElement>(offset = 0.88) {
  const ref = useRef<T>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io: IntersectionObserver | null = null;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * offset && r.bottom > 0) reveal();
    };
    const cleanup = () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    function reveal() {
      if (done) return;
      done = true;
      setShow(true);
      cleanup();
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { threshold: 0.1 },
      );
      io.observe(el);
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return cleanup;
  }, [show, offset]);

  return { ref, show };
}

// ─── Text reveal (máscara por palavra, observer único no container) ──────────

export function TextReveal({
  text,
  className = "",
  delay: d = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  // Revela quando o texto entra na tela: IntersectionObserver + checagem
  // manual no scroll (fallback). Nunca revela antes da hora, nunca fica preso.
  useEffect(() => {
    if (reduced || show) return;
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io: IntersectionObserver | null = null;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.88 && r.bottom > 0) reveal();
    };
    const cleanup = () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    function reveal() {
      if (done) return;
      done = true;
      setShow(true);
      cleanup();
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) reveal();
        },
        { threshold: 0.1 },
      );
      io.observe(el);
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return cleanup;
  }, [reduced, show]);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0 }}
              animate={show ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{ duration: 0.85, ease, delay: d + i * stagger }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export function MiniWave({ color = C.secondary }: { color?: string }) {
  const bars = [0.5, 0.9, 0.35, 1, 0.6];
  return (
    <div className="flex items-center gap-[2.5px] h-4" aria-hidden="true">
      {bars.map((b, i) => (
        <span
          key={i}
          className="synapse-wave-bar"
          style={{
            width: 2.5,
            height: `${b * 100}%`,
            background: color,
            animationDuration: "1.3s",
            animationDelay: `${i * 0.13}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Big Wave (onda simétrica, centrada — assinatura) ────────────────────────

function bigWaveHeight(i: number) {
  const v =
    Math.sin(i * 0.45) * 0.5 +
    Math.sin(i * 0.18 + 1.3) * 0.35 +
    Math.sin(i * 0.85 + 0.4) * 0.15;
  return 0.22 + 0.78 * Math.abs(v);
}

export function BigWave({
  bars = 36,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-[4px] h-12 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="synapse-wave-bar synapse-wave-bar--center"
          style={{
            width: 3,
            height: `${Math.round(bigWaveHeight(i) * 100)}%`,
            animationDuration: "2.6s",
            animationDelay: `${(i * 0.07).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Wave Formation (barras nascem do fundo, do centro para as bordas) ───────

function WaveBar({
  progress,
  i,
  n,
}: {
  progress: MotionValue<number>;
  i: number;
  n: number;
}) {
  const center = (n - 1) / 2;
  const dist = center === 0 ? 0 : Math.abs(i - center) / center;
  const start = dist * 0.55;
  const end = start + 0.42;
  const scaleY = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.span
      className="inline-block flex-none"
      style={{
        width: 3,
        height: `${Math.round(bigWaveHeight(i) * 100)}%`,
        scaleY,
        opacity,
        transformOrigin: "center",
      }}
    >
      <span
        className="synapse-wave-bar synapse-wave-bar--center block h-full"
        style={{
          width: 3,
          animationDuration: "2.6s",
          animationDelay: `${(i * 0.07).toFixed(2)}s`,
        }}
      />
    </motion.span>
  );
}

/** Onda que se forma organicamente conforme a seção entra na tela. */
export function WaveFormation({
  progress,
  bars = 36,
  className = "",
}: {
  progress: MotionValue<number>;
  bars?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <BigWave bars={bars} className={className} />;
  }
  return (
    <div
      className={`flex items-center justify-center gap-[4px] h-12 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => (
        <WaveBar key={i} progress={progress} i={i} n={bars} />
      ))}
    </div>
  );
}

// ─── Global styles ───────────────────────────────────────────────────────────

export const globalCss = `
  @keyframes synapse-marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes synapse-marquee-right {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .synapse-marquee-left { animation: synapse-marquee-left 42s linear infinite; }
  .synapse-marquee-right { animation: synapse-marquee-right 48s linear infinite; }

  @keyframes synapse-wave {
    0%, 100% { transform: scaleY(0.35); opacity: 0.7; }
    50%      { transform: scaleY(1); opacity: 1; }
  }
  .synapse-wave-bar {
    display: inline-block;
    width: 4px;
    min-height: 4px;
    border-radius: 999px;
    background: #52D4FF;
    transform-origin: bottom center;
    animation: synapse-wave 1.1s ease-in-out infinite;
  }
  .synapse-wave-bar--center { transform-origin: center; }

  /* Reveal interno dos ícones — direção coerente com a função de cada área */
  @keyframes synapse-wipe-ltr {
    from { clip-path: inset(0 100% 0 0); opacity: 0.4; }
    to   { clip-path: inset(0 0 0 0); opacity: 1; }
  }
  @keyframes synapse-wipe-btt {
    from { clip-path: inset(100% 0 0 0); opacity: 0.4; }
    to   { clip-path: inset(0 0 0 0); opacity: 1; }
  }
  @keyframes synapse-wipe-ttb {
    from { clip-path: inset(0 0 100% 0); opacity: 0.4; }
    to   { clip-path: inset(0 0 0 0); opacity: 1; }
  }
  .group:hover .synapse-icon-wipe-ltr svg { animation: synapse-wipe-ltr 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
  .group:hover .synapse-icon-wipe-btt svg { animation: synapse-wipe-btt 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
  .group:hover .synapse-icon-wipe-ttb svg { animation: synapse-wipe-ttb 0.7s cubic-bezier(0.22, 1, 0.36, 1); }

  @keyframes synapse-nudge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(3px); }
  }
  .synapse-nudge { animation: synapse-nudge 2s ease-in-out infinite; }

  @keyframes synapse-pulse-ring {
    0%   { transform: scale(0.55); opacity: 0.7; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  .synapse-pulse-ring { animation: synapse-pulse-ring 3.6s cubic-bezier(0.22, 1, 0.36, 1) infinite; }

  @keyframes synapse-glow-breathe {
    0%, 100% { transform: scale(1); opacity: 0.75; }
    50%      { transform: scale(1.12); opacity: 1; }
  }
  .synapse-glow { animation: synapse-glow-breathe 6s ease-in-out infinite; }

  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }

  @media (prefers-reduced-motion: reduce) {
    .synapse-marquee-left, .synapse-marquee-right { animation-play-state: paused; }
    .synapse-wave-bar { animation: none; transform: scaleY(0.6); }
    .synapse-nudge { animation: none; }
    .synapse-pulse-ring { animation: none; opacity: 0.25; }
    .synapse-glow { animation: none; }
    .group:hover .synapse-icon-wipe-ltr svg,
    .group:hover .synapse-icon-wipe-btt svg,
    .group:hover .synapse-icon-wipe-ttb svg { animation: none; }
  }
  * { font-family: 'Geist', system-ui, -apple-system, sans-serif; }
  body { letter-spacing: -0.014em; }
  h1, h2, h3, h4 { letter-spacing: -0.028em; }
`;
