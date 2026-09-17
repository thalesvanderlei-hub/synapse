import { Eyebrow } from "../lib/theme";

/** Stub temporário — páginas internas entram uma a uma, na ordem combinada. */
export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="bg-[#EEFBFF] pt-[170px] pb-32 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-6">
        <Eyebrow>Em construção</Eyebrow>
        <h1 className="text-[2.4rem] lg:text-[3.3rem] font-semibold text-[#02173B] leading-[1.04] tracking-[-0.03em] mb-6">
          {title}
        </h1>
        <p className="text-[#02173B]/55 text-lg max-w-md">
          Conteúdo desta página será construído na próxima etapa do projeto.
        </p>
      </div>
    </section>
  );
}
