import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  C,
  delay,
  Eyebrow,
  TextReveal,
  BigWave,
  MiniWave,
} from "../lib/theme";
import {
  WHATSAPP,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  ADDRESS,
  MAPS_EMBED,
  GOOGLE_REVIEWS_URL,
  CONVENIOS,
} from "../lib/data";

// ─── Horário de atendimento (100% literal do copy institucional) ─────────────

const HORARIO: { dia: string; hora: string; fechado?: boolean }[] = [
  { dia: "Segunda-feira", hora: "08h às 18h" },
  { dia: "Terça-feira", hora: "08h às 18h" },
  { dia: "Quarta-feira", hora: "08h às 19h" },
  { dia: "Quinta-feira", hora: "08h às 19h" },
  { dia: "Sexta-feira", hora: "08h às 18h" },
  { dia: "Sábado", hora: "08h às 12h" },
  { dia: "Domingo", hora: "Fechado", fechado: true },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#EEFBFF] to-white overflow-hidden pt-[128px] pb-16 lg:pt-[168px] lg:pb-20">
      <div
        className="absolute top-0 left-1/2 w-[900px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(82,212,255,0.20) 0%, transparent 70%)",
          transform: "translate(-50%, -42%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div {...delay(0)}>
                  </motion.div>

        <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold text-[#02173B] leading-[1.02] tracking-[-0.035em] mb-6">
          <TextReveal text="Fale com a Synapse" delay={0.08} />
        </h1>

        <motion.p
          {...delay(0.24)}
          className="text-[#02173B]/60 text-[1.05rem] lg:text-[1.18rem] leading-relaxed max-w-2xl mb-9"
        >
          Estamos prontos para te ouvir e te ajudar a encontrar o cuidado ideal
          para a sua audição, comunicação e bem-estar.
        </motion.p>

        <motion.div
          {...delay(0.34)}
          className="flex flex-wrap justify-center gap-3.5"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#52D4FF]/30 hover:-translate-y-0.5"
          >
            Agende agora
            <ArrowRight
              size={16}
              className="flex-none transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 text-[#02173B] px-6 py-3 rounded-full font-medium text-[0.92rem] whitespace-nowrap ring-1 ring-[#02173B]/12 hover:ring-[#02173B]/30 hover:bg-white/70 transition-all duration-300"
          >
            Ver localização
          </a>
        </motion.div>

        <motion.div {...delay(0.46)} className="mt-12 opacity-70">
          <BigWave bars={30} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Convênios (marquee infinito com fade — idêntico ao da Home) ─────────────

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

// ─── Informação (ícone à esquerda — estilo limpo da Home) ────────────────────

function InfoItem({
  Icon,
  label,
  content,
  href,
}: {
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  content: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-none mt-0.5"
        style={{ backgroundColor: "rgba(82,212,255,0.1)" }}
      >
        <Icon size={18} style={{ color: C.secondary }} />
      </div>
      <div className="min-w-0">
        <div className="text-[0.8rem] font-semibold text-[#02173B] mb-1">
          {label}
        </div>
        {href ? (
          <a
            href={href}
            className="text-[#02173B]/60 text-sm leading-relaxed hover:text-[#02173B] transition-colors break-words"
          >
            {content}
          </a>
        ) : (
          <div className="text-[#02173B]/60 text-sm leading-relaxed">
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Localização (contato + horário completo + mapa) ─────────────────────────

function Localizacao() {
  return (
    <section id="contato" className="py-24 lg:py-32 bg-white">
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
            <InfoItem Icon={MapPin} label="Endereço" content={ADDRESS} />

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 mt-8">
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

            {/* Horário de atendimento — divisores sutis, sem caixa */}
            <div className="mt-10">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                  style={{ backgroundColor: "rgba(82,212,255,0.1)" }}
                >
                  <Clock size={18} style={{ color: C.secondary }} />
                </div>
                <div className="text-[0.8rem] font-semibold text-[#02173B]">
                  Horário de atendimento
                </div>
              </div>
              <ul className="sm:pl-14">
                {HORARIO.map((h, i) => (
                  <li
                    key={h.dia}
                    className={`flex items-center justify-between py-2.5 ${
                      i > 0 ? "border-t border-[#02173B]/8" : ""
                    }`}
                  >
                    <span className="text-[#02173B]/60 text-sm">{h.dia}</span>
                    <span
                      className={
                        h.fechado
                          ? "text-[#02173B]/35 text-sm"
                          : "text-[#02173B] text-sm font-medium tabular-nums"
                      }
                    >
                      {h.hora}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 sm:gap-2.5 bg-[#52D4FF] text-[#02173B] px-5 sm:px-6 py-3 rounded-full font-medium text-[clamp(0.8rem,3.6vw,0.95rem)] whitespace-nowrap hover:bg-[#02173B] hover:text-white transition-all duration-300 hover:-translate-y-0.5 self-start"
            >
              Agende agora o seu horário
              <ArrowRight
                size={16}
                className="flex-none transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Mapa incorporado (obrigatório) */}
          <motion.div {...delay(0.18)} className="min-h-[380px] lg:min-h-full">
            <div className="overflow-hidden bg-[#EEFBFF] h-full w-full rounded-[24px] min-h-[380px]">
              <iframe
                src={MAPS_EMBED}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Synapse Reabilitação Neurofuncional"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Veja mais avaliações (chamada final — banda escura) ─────────────────────

function Avaliacoes() {
  return (
    <section className="px-4 pt-6 pb-24 lg:pb-28 bg-white">
      <motion.div
        {...delay(0)}
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[36px] px-7 py-16 lg:px-16 lg:py-20 text-center"
        style={{ backgroundColor: C.deepNavy }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(82,212,255,0.16) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto flex flex-col items-center">
          <BigWave bars={28} className="mb-8 opacity-80" />


          <h2 className="text-[1.9rem] md:text-[2.5rem] font-semibold text-white leading-[1.12] tracking-[-0.02em] mb-5">
            <TextReveal text="Veja mais avaliações" />
          </h2>

          <p className="text-white/60 text-[1.05rem] leading-relaxed mb-9">
            Confira outros relatos de quem já passou pela Synapse no nosso
            perfil do Google.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-[#52D4FF] text-[#02173B] px-6 py-3.5 rounded-full font-medium text-[0.92rem] whitespace-nowrap hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <Star size={16} className="flex-none" />
              Ver avaliações no Google
              <ArrowUpRight
                size={16}
                className="flex-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white px-6 py-3.5 rounded-full font-medium text-[0.92rem] whitespace-nowrap ring-1 ring-white/25 hover:bg-white/10 hover:ring-white/40 transition-all duration-300"
            >
              <MessageCircle size={17} className="flex-none" />
              Agende agora
            </a>
          </div>

          <div className="mt-9">
            <MiniWave color={C.primary} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contato() {
  return (
    <>
      <Hero />
      <Convenios />
      <Localizacao />
      <Avaliacoes />
    </>
  );
}
