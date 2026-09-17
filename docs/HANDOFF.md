# Synapse — Handoff de contexto do projeto

> Documento de continuidade. Contém stack, regras invioláveis, sistema de design,
> estado de cada página, padrões de componente, armadilhas técnicas já resolvidas
> e pendências abertas. Use como contexto ao retomar o trabalho em nova sessão.
> **Última atualização:** as 7 páginas estão construídas — Home, Sobre, Serviços,
> Exames, Tratamento do Zumbido, Equipe e **Contato**. Site completo; restam apenas
> as pendências de conteúdo real (fotos, URLs) da seção 11.

---

## 1. O projeto

**Cliente:** Synapse Reabilitação Neurofuncional — clínica de Fonoaudiologia e
Otorrinolaringologia em Maceió/AL, foco forte em audição (perda auditiva,
zumbido, tontura/equilíbrio, processamento auditivo).

**Entrega:** site institucional de 7 páginas (Home + 6 internas). A página do
curso é externa — no site aparece só como chamada com botão.

**Público-alvo (orienta toda decisão de UX):**
1. Mães de crianças de 2 a 14 anos
2. Responsáveis por idosos
3. Adultos/idosos como pacientes diretos (zumbido, voz, tontura, perda auditiva)

---

## 2. Stack e comandos

Projeto **Vite + React 18 + TypeScript** (veio de export do Figma Make). Versão
antiga em Next.js arquivada em `_archive/next-app/` — **não usar**.

| Item | Versão |
|---|---|
| Vite | 6.3.5 |
| React | 18 |
| react-router | 7.13.0 (`BrowserRouter`) |
| motion | 12.23.24 (`import { … } from "motion/react"`) |
| tailwindcss | 4.1.12 |
| lucide-react | 0.487.0 |
| lenis | scroll suave (instância em `window.__lenis`) |
| Fonte | **Geist** (`src/styles/fonts.css`) |

```bash
npm run dev     # http://localhost:5173
npm run build   # valida TS/JSX e gera dist/  → SEMPRE rodar após editar
```

Preview no `.claude/launch.json` (nome `synapse-vite`, porta 5173).

---

## 3. Estrutura de arquivos

```
src/app/
  App.tsx                    # BrowserRouter, rotas, Lenis (SmoothScroll), ScrollToTop
  lib/
    theme.tsx                # C, ease, fadeUp/delay, Eyebrow, TextReveal,
                             # useRevealOnScroll, MiniWave/BigWave/WaveFormation, globalCss
    data.ts                  # contatos, NAV_LINKS, CONVENIOS, SERVICES, BENEFITS, TESTIMONIALS
  components/layout.tsx      # Nav, Footer, FloatingCTA, ScrollToTop
  pages/
    Home.tsx  Sobre.tsx  Servicos.tsx  Exames.tsx  Zumbido.tsx  Equipe.tsx  Placeholder.tsx
src/imports/                 # logos SVG, PNGs dos convênios (reais), foto do hero da Home
docs/
  synapse-copy-institucional.md   # FONTE DE VERDADE do texto
  HANDOFF.md                      # este arquivo
```

Rotas (em `App.tsx`): `/` `/sobre` `/servicos` `/exames` `/tratamento-do-zumbido`
`/equipe` `/contato` (esta ainda é `<Placeholder>`).

---

## 4. Regra inegociável — copy 100% literal

Todo texto vem de `docs/synapse-copy-institucional.md`, **exatamente como está**.
Não resumir, não reescrever, não "melhorar". **O layout se adapta ao texto, nunca
o contrário** — inclusive quando a tentação for encurtar para caber. Faltando algo
→ **sinalizar pendência**, não inventar.

**O que é literal x derivado (padrão adotado e aceito pelo cliente):**
- **Headings (H1/H2):** literais — nome da página ou título de seção do copy.
- **Eyebrows** (rótulos curtos com bolinha acima dos títulos): **REMOVIDOS de todo
  o site** por decisão do cliente — não reintroduzir. Vão direto ao H2.
- **Tags de card / chips:** derivados (ex.: "Audição", "Vestibular").
- **Copy do card CTA nos grids** foi escrito pelo cliente:
  *"Precisa de algum desses atendimentos? / Fale com a nossa equipe e agende a sua consulta."*
  (variações por página adaptam o substantivo — exames/horário — com o mesmo aval).
- **Fechamentos derivados sinalizados:** algumas páginas sem frase final no copy
  usam título derivado (Zumbido → "Tratamento individualizado"; Equipe → "Fale
  com a nossa equipe"). Sempre avisar o cliente que é ajustável.

---

## 5. Paleta e tipografia

```ts
const C = {
  primary:   "#52D4FF",  // azul primário — botões e acentos
  secondary: "#42ADD0",  // azul secundário — ícones, eyebrows
  navy:      "#02173B",  // azul marinho — textos, boxes e bandas escuras
  deepNavy:  "#02102A",  // azul profundo — bandas escuras
  ice:       "#EEFBFF",  // branco gelo — fundos alternados
  white:     "#FFFFFF",
};
```

Página **majoritariamente clara**; azul escuro só em detalhes, cards e bandas.
`#52D4FF`/`#42ADD0` **reprovam como texto sobre fundo claro** — só ícone/preenchimento.
Sobre fundo escuro, texto claro (white/… ou primary).

**Tipografia:** corpo reduzido para **~16px** em todo o site (`text-[1rem]
leading-relaxed`; descrições de card `~0.82–0.86rem`). Títulos com
`tracking-[-0.02em]`. Fonte Geist.

---

## 6. Acessibilidade e movimento (crítico)

Parte do público **trata tontura e vertigem**:
- **Sempre** respeitar `prefers-reduced-motion` — marquees pausam, waves param,
  pin/parallax/deck viram layout estático.
- Sem parallax pesado nem scroll-jacking. **Pin via `position: sticky`** é aceito
  (o scroll nativo continua livre); hijack real não.
- **Parallax e deck horizontal desativados no mobile** (causavam sensação de
  página "bamba"). No mobile essas seções viram layout vertical simples.
- Corpo ≥ 16px, alvos ≥ 44px.

---

## 7. Sistema de design — componentes e padrões

### Helpers (`lib/theme.tsx`)
| Item | Função |
|---|---|
| `C` | paleta |
| `ease` | `[0.22, 1, 0.36, 1]` — curva padrão |
| `fadeUp` / `delay(d)` | entrada padrão (opacity+y, `whileInView`) |
| `Eyebrow` | ⚠️ **descontinuado** — removido de todas as páginas; componente mantido em theme mas não usar |
| `TextReveal` | revela palavra a palavra (máscara), ao entrar na tela |
| `useRevealOnScroll(offset)` | hook robusto (IO + fallback de scroll VERTICAL). Retorna `{ref, show}` |
| `MiniWave` / `BigWave` | onda sonora — assinatura da marca |
| `WaveFormation` | onda que se forma barra a barra ligada ao scroll (recebe `progress`) |
| `globalCss` | keyframes: marquee, wave, icon-wipe (ltr/btt/ttb), pulse-ring, glow, float-soft, nudge |

### Separadores de hero e marquees (padrão atualizado)
- **Chips de tópico da hero** (ex.: "Crianças · Adultos …"): separador é um
  **divisor vertical fino** `w-px h-3 bg-[#02173B]/15` (NÃO mais a bolinha azul).
- **Marquee de especialidades após a hero** (Serviços/Exames/Zumbido): palavras
  **sem pílula/borda/fundo** — só texto `text-[#02173B]/55` com **divisor vertical
  sutil** `w-px h-4 bg-[#02173B]/12` entre cada uma.
- Títulos longos com risco de viúva usam `[text-wrap:balance]` (ex.: "Seleção e
  Adaptação de Aparelhos Auditivos", "Em Maceió, tudo que você precisa…").

### Botões (padrão)
Pílula `px-6 py-3 rounded-full font-medium`, seta que desliza no hover.
Mobile: `whitespace-nowrap` + fonte fluida `clamp()` (pílulas longas viram
`w-full justify-center` no mobile quando necessário).
Primário: `bg-[#52D4FF] text-[#02173B]`.

### Card padrão de conteúdo (imagem + card interno + acordeão) — SEM bordas
**Esta é a versão definitiva (após várias iterações).** Usada em Serviços, Exames,
Zumbido. Estrutura que cobre a imagem no card todo E cresce ao expandir sem cortar:

```
<article class="relative flex flex-col overflow-hidden rounded-[26px] group min-w-0 [larguras]">
  <img  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105" />  ← cobre TODO o card em qualquer altura
  <div  class="absolute inset-0" gradiente escuro (0.82→0.05) />
  <span class="absolute top-5 left-5" pill da tag />
  <div  class="h-[240px] sm:h-[260px] flex-none" aria-hidden />   ← ESPAÇADOR reserva a área da imagem
  <div  class="relative px-4 pb-4 mt-auto">                        ← box COMPACTO, ancorado no rodapé
     <div class="bg-white rounded-2xl p-5">                        ← altura do conteúdo (não estica)
        <div class="flex items-start gap-3.5 mb-3 min-h-[2.9rem]"> ← título reserva 2 linhas
           [ícone box #52D4FF] + <h3 class="min-w-0 break-words …">  ← break-words: nomes longos não vazam
        <div class="relative overflow-hidden transition-[max-height] max-h-[2.3rem] | max-h-[…] (open)">
           <p>desc</p>  (+ <ul> credenciais quando houver)
           fade no rodapé quando fechado
        </div>
        <button> "Ler mais" / "Ler menos" (ChevronDown gira)
```
Por que assim: a imagem `absolute inset-0` cobre o card em qualquer altura; o
espaçador + card branco em fluxo dão a altura; ao abrir o acordeão o card cresce
(altura auto) e a imagem acompanha — **sem `aspect-ratio` fixo** (que travava a
altura e cortava o topo).
**Boxes internos — padrão COMPACTO (não esticar):** o box tem **altura do conteúdo**
e é ancorado no rodapé do card via `mt-auto` no wrapper (imagem preenche o topo).
⚠️ **NÃO usar `flex-1` para esticar o box** — foi tentado e gerou espaço branco
enorme (rejeitado pelo cliente; o padrão certo é o box compacto colado embaixo).
Para os cards ficarem alinhados lado a lado: `h3` com `min-w-0 break-words` (nome
longo tipo "Videonaso.../Video..." não vaza na horizontal) + linha do título
reservando `min-h-[2.9rem]` (≈2 linhas → cards de título 1 e 2 linhas ficam iguais).
Títulos muito longos (3–4 linhas, ex.: exames auditivos) deixam aquele card um pouco
mais alto — inerente ao box compacto sem cortar texto; comportamento normal de grid.

### Card CTA (fecha o grid)
Mesmas dimensões/aparência, `bg-navy`, glow radial, ícone, título, botão primário.
Usa `aspect-ratio: 4/5` + `min-h-[470px] sm:min-h-0` (não expande, então tudo bem).

### Grid de cards com centralização de órfãos (padrão)
Trocar `grid` por **flex-wrap centralizado** para a última linha incompleta ficar
centrada (funciona para qualquer quantidade):
```
<div class="flex flex-wrap justify-center gap-5">
  {items.map(...)}   // cada card:
  // className: min-w-0 w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]
```

### Seção horizontal travada (pinned) — 3 variações já usadas
Padrão: `sectionRef` + mede `distance = track.scrollWidth - innerWidth`; altura da
seção = `calc(100vh + distance)`; `useScroll(offset ["start start","end end"])` →
`x = useTransform(scrollYProgress,[0,1],[0,-distance])`; `sticky top-0 h-screen
overflow-hidden`. **Só em `md+` e sem reduced-motion**; senão fallback vertical.
- **Exames › Zumbido** (banda escura, cards `fixedWidth`).
- **Zumbido › Terapias** (carrossel de 6 cards no scroll).
- **Equipe › deck** (um painel por profissional, tela cheia).

### Ícones no hover
`synapse-icon-wipe-ltr | -btt | -ttb` — reveal interno com direção coerente à função.

### Marquees
`synapse-marquee-left` / `-right`, translate −50%, **as duas metades idênticas**.
Pausam com `prefers-reduced-motion`.

### Ritmo de seções
`py-24 lg:py-32`, container `max-w-7xl mx-auto px-6`, fundos alternando
branco / `#EEFBFF`, com bandas escuras pontuais (`rounded-[36px]` + glow radial).

---

## 8. Estado das páginas

| Rota | Página | Status |
|---|---|---|
| `/` | Home | ✅ aprovada |
| `/sobre` | Sobre | ✅ aprovada |
| `/servicos` | Serviços | ✅ aprovada |
| `/exames` | Exames | ✅ aprovada |
| `/tratamento-do-zumbido` | Tratamento do Zumbido | ✅ aprovada |
| `/equipe` | Equipe | ✅ aprovada |
| `/contato` | Contato | ✅ construída (aguarda aprovação) |

### Home
Hero claro (imagem à direita com cards flutuantes; no mobile a imagem vem acima
do título; card de agenda revela CTA verde de WhatsApp — no mobile por toque com
indutor "TOQUE PARA AGENDAR"; ao rolar a imagem **expande pelos 4 lados** e os
cards somem) → Convênios (marquee de logos reais) → Sobre → Áreas de atuação
(cards com imagem) → Diferencial + 4 benefícios → Curso (banda escura, mockup
placeholder) → Depoimentos (2 marquees opostos) → Contato + mapa → CTA final
(wave se formando no scroll) → Footer.

### Sobre
Hero cuja imagem **entra cobrindo a seção** e assenta → "Ciência e tecnologia a
serviço da audição" (clip reveal + glow + badge) → "Como cuidamos" → **seção
travada "Ética, ciência e humanização"** (círculo navy expande, texto revelado
palavra a palavra pelo scroll; o texto **só existe dentro da camada escura
mascarada**) → "Nossa trajetória" (reveal em fatias + parallax) → **"Conheça nosso espaço"**
(título/subtítulo **centralizados**; fotos reais do ambiente em **carrossel infinito
suave** — marquee `synapse-marquee-left` 55s, pausa no hover, fade nas bordas, entra
com **clip-reveal**; movimento reduzido → faixa `overflow-x-auto` rolável;
**lightbox** ao clicar, com prev/next, contador, Esc e trava de scroll; lê
`src/assets/fotos/ambiente/*` via `import.meta.glob`, ordena numérica e **some se a
pasta estiver vazia** — componente `NossoEspaco`). Hero do Sobre usa `HERO_IMG` =
`src/assets/fotos/ambiente/3.webp` (import direto). → "Para onde
caminhamos" (banda que expande; **imagem à direita preenche a altura total da
seção** — `items-stretch` + `img absolute inset-0 object-cover`, padrão da chamada
final de Exames; componente `ParaOndeImage`).

### Serviços
Hero centrado (marquee de especialidades) → **8 especialidades numa única seção**
+ card CTA (cards com imagem/acordeão) → **Aparelhos Starkey** (highlights em
linha + **galeria do app My Starkey**: desktop = 2 colunas verticais com parallax
oposto de borda a borda, sem sombra; mobile = **marquee horizontal infinito
full-bleed**, telas coladas 0px, sem margens laterais) → Otorrino (imagem +
overlays animados) → cards de navegação cruzada (Exames + Zumbido) → chamada final.

### Exames
Nota: **Auditivos e Vestibulares agora usam `withCta`** — o `CtaCard` fecha a última
linha do grid para não deixar card órfão sozinho (Auditivos 7+CTA=8, Vestibulares
4+CTA=5). Padrão para evitar "card solto": ligar `withCta` na seção.
Hero → **Exames Auditivos e Eletrofisiológicos** (7 cards) → **Zumbido e Vias
Auditivas** = seção **escura com scroll horizontal travado** → **Vestibulares**
(4) → **Voz e Laringe** (2 + card CTA) → chamada final com **imagem à esquerda +
conteúdo à direita** (split na banda, paddings iguais).

### Tratamento do Zumbido
Hero (chips sutis "apito · chiado · …" sem box) → **O que é o zumbido** (imagem
representativa com card de tópico + callout) → **Terapias** = 6 cards em
**carrossel horizontal travado** → **Neuromodulação** = banda deepNavy com as 3
subtécnicas (tDCS/tRNS/tVNS) → **Tratamento individualizado** = chamada final com
imagem à esquerda + wave + botão "Agende sua avaliação".

### Equipe
Hero (SEM marquee) → **deck horizontal navy**: cada profissional é um painel de
tela cheia, **currículo à esquerda + retrato à direita**, passando horizontalmente
no scroll (seção travada, fundo azul marinho, header "Nossa equipe" fixo, dots de
progresso). **Slice reveal** cobre a seção com fatias brancas e as abre quando ela
**fixa no topo** (foco). Retratos usam **foto real** (proporção **3/4**, ~380px no deck; `object-cover`,
corte mínimo pois as fotos são retrato ~3/4); sem foto para as iniciais → cai no
placeholder (monograma + wave + "FOTO EM BREVE") — reveal em clip da esquerda p/ direita, controlado pelo
índice ativo. Mobile: empilhado vertical navy (retrato + currículo), mais leve.
→ Chamada final "Fale com a nossa equipe" (banda gelo).
Header **"Nossa equipe" centralizado**, entra com **destaque** (scale 1.35→1) ao
fixar/entrar na tela e assenta na posição natural. No `MemberInfo`: **nome completo**
(h2) + **um único rótulo abaixo** do nome (`m.crfa ?? m.tag`). A tag uppercase que
ficava ACIMA do nome foi **removida** (era redundante com o rótulo de baixo).

### Contato
Hero editorial centrado (glow + eyebrow derivado "Estamos por perto" + H1 "Fale com
a Synapse" + parágrafo literal + botões "Agende agora"/"Ver localização" + BigWave)
→ **Convênios** = **marquee infinito idêntico ao da Home** (`Convenios()` copiada:
banda branca `border-y`, label "Convênios atendidos", 10 logos reais duplicados,
`synapse-marquee-left` + fade branco nas bordas) → **`#contato` "Venha nos conhecer"**
(mesmo bloco da Home, mais limpo): coluna esquerda com **InfoItem estilo Home**
(ícone à esquerda) — Endereço, Telefone, E-mail (literais) + **horário completo
Seg–Dom com divisores sutis** (`border-t`, SEM caixa; Domingo em texto apagado) +
botão "Agende agora o seu horário"; coluna direita = **mapa Google incorporado**
(obrigatório, `items-stretch` faz o mapa acompanhar a altura da coluna) → **Veja
mais avaliações** = banda `deepNavy` final (wave + parágrafo literal + botão "Ver
avaliações no Google" → `GOOGLE_REVIEWS_URL` real + "Agende agora").
Página leve, sem seções pinadas — boa no mobile. Heading "Venha nos conhecer" +
parágrafo são **derivados** (reaproveitados da Home — sinalizar); demais literais.

---

## 9. Armadilhas técnicas já diagnosticadas (NÃO repetir)

1. **`min-h-[Xpx]` + `aspect-ratio` em item de grid/flex** infla o tamanho mínimo
   automático → infla a coluna → **overflow horizontal** (página escorrega no
   mobile). **Fix:** `min-w-0` no item.

2. **Coluna implícita de grid é `auto`** e cresce até o max-content (um marquee
   `w-max` dentro dela esticou uma coluna para ~2000px). **Fix:**
   `grid-cols-[minmax(0,1fr)]` e/ou trocar por `flex flex-wrap`.

3. **Card com `aspect-ratio` + `overflow-hidden` + card interno `absolute`**
   corta o conteúdo ao expandir (o card não cresce). **Fix:** usar a estrutura da
   seção 7 (imagem absolute cobrindo + espaçador + card em fluxo, sem aspect-ratio).

4. **Full-bleed dentro de pai com `overflow-hidden`** é recortado pelo pai — a
   margem negativa (`-mx-6`) precisa estar **no elemento que recorta**.
   ⚠️ `getBoundingClientRect()` **não revela recorte de ancestral** — validar pela
   **interseção de todos os ancestrais que recortam**.

5. **`h-full` com pai de altura indefinida** vira `auto` e o elemento passa a
   *contribuir* altura (inflou seção). **Fix:** `absolute inset-0`.

6. **`whileInView` do Motion NÃO é confiável dentro de seção pinada/transformada**
   (deck horizontal) nem sempre em clip reveals — o elemento fica invisível
   (clip 100% preso). **Fix:** revelar de forma **determinística**:
   - por índice ativo do scroll (`revealed={i <= active}`), ou
   - por gatilho de posição da seção (revela quando `section.top <= 2`, para o
     slice reveal), ou
   - `useRevealOnScroll` (VERTICAL — bom para mobile empilhado; NÃO serve para
     entrada horizontal, pois só checa `top`).

7. **`useRevealOnScroll` com IntersectionObserver num overlay ALTO** (tela inteira)
   dispara cedo demais (aciona quando só o rodapé aparece). Para "revelar ao fixar",
   observar a **posição real da seção**, não um overlay alto.

8. **NUNCA reescrever arquivos-fonte via PowerShell** (`Get-Content`/`Set-Content`
   no PS 5.1 leem UTF-8-sem-BOM como ANSI e **corrompem acentos**: "até" → "atÃ©").
   Usar as ferramentas de edição de arquivo. Se corromper: reverter byte a byte
   (UTF-8 → 1252 → UTF-8) e regravar sem BOM.

9. **Painel de preview reporta `document.hidden: true`** com frequência → `rAF`
   congela; `getBoundingClientRect` e transições Motion ficam com valores
   "presos"; screenshots saem em branco. **Validar por medição no DOM**
   (`getComputedStyle(...).height`, classes, computed styles), não por print.
   Para medir scroll com Lenis ativo, usar `window.__lenis.scrollTo(y,{immediate:true})`
   (o `window.scrollTo` é sobrescrito pelo Lenis).

10. **Marquee com translate −50%** exige metades idênticas (mesma contagem e margens).

12. **`clip-path: inset(...)` ignora `border-radius`** → cantos quadrados ("sobra"
    sem arredondamento) no reveal de imagens com cantos arredondados. **Fix:** incluir
    `round <raio>` no inset (ex.: `inset(0 0% 0 0 round 26px)`) nos estados aberto E
    fechado. Aplicado nos retratos da equipe (`round 26px`) e no `ClipReveal` do Sobre
    (`round 28px`).

13. **Reveal por scroll pode ficar preso escondido no mobile** (IO não dispara em
    algum caso, ou o painel de preview está congelado). Para imagens de conteúdo que
    NÃO podem sumir (ex.: `ClipReveal` da 2ª seção do Sobre), usar IntersectionObserver
    **+ fallback por `setTimeout` (~2s)** que revela de qualquer forma — a imagem nunca
    fica permanentemente oculta.

11. **Não fabricar rosto de pessoa real** com foto stock (equipe). Usar placeholder
    de marca (monograma/"FOTO EM BREVE") até virem as fotos reais.

---

## 10. Dados de contato (em `lib/data.ts`)

```
WHATSAPP      https://wa.me/5582981135309
PHONE         (82) 98113-5309
EMAIL         synapsern.al@gmail.com
ENDEREÇO      Empresarial Business Tower, Av. Gov. Osman Loureiro, 49, Sl 6,
              Mangabeiras, Maceió, AL, 57037-630
MAPS_EMBED    iframe do Google Maps já configurado
```
**Convênios (logos reais em `src/imports/`):** Unimed, Bradesco Saúde, Amil, Caixa,
Asfal/AL, Petrobras, Postal Saúde, GEAP, Cassi, CAPESESP.

---

## 11. Pendências abertas

| # | Pendência | Onde |
|---|---|---|
| 1 | **Fotos reais** — seções internas ainda usam stock (Unsplash); trocar objetos `IMG`/`heroImg`. **Ambiente já resolvido** (13 fotos reais na galeria "Conheça nosso espaço"). Cliente larga imagens em `src/assets/fotos/{ambiente,equipe,home}/` (ver `LEIA-ME.md`) | páginas |
| 2 | ~~Fotos reais da equipe~~ — **resolvido**. `Portrait` usa `EQUIPE_FOTOS` (glob de `src/assets/fotos/equipe/<INICIAIS>.webp`, chave = iniciais em maiúsculas). 7 fotos ligadas (TG/AC/DV/CM/MC/KL/WG); sem foto → cai no monograma "Foto em breve" | ✅ |
| 3 | ~~URL do perfil do Google (avaliações)~~ — **resolvida** (link real em `GOOGLE_REVIEWS_URL`, `lib/data.ts`) | ✅ |
| 4 | ~~URL da página externa do curso~~ — **resolvido**: `COURSE_URL = "https://zumbido360.com.br"` | ✅ |
| 5 | ~~Mockup do curso~~ — **resolvido**. `mockup-curso.webp` em `src/assets/fotos/home/`, sobreposto à banda escura e cortado no limite inferior (`overflow-hidden` da seção + `-bottom-12` no `img`, `right-6 xl:right-12`, `w-330 xl:w-380`). `CURSO_MOCKUP` (glob) em `Home.tsx`; trocar a imagem = só substituir o arquivo | ✅ |
| 6 | **"Fale conosco"** aponta p/ WhatsApp — confirmar se deve ir p/ `/contato` | todas |
| 7 | Títulos de fechamento derivados (Zumbido, Equipe) — confirmar/ajustar | páginas |

---

## 12. Requisitos obrigatórios — checklist

- [x] CTA flutuante em todas as páginas (WhatsApp)
- [x] Mapa do Google (Home + versão completa na Página 6 · Contato)
- [x] Carrossel de depoimentos automático e contínuo, sem clique (Home)
- [x] Link para avaliações no Google (Página 6 · Contato) — URL real aplicada (`GOOGLE_REVIEWS_URL`)
- [x] Navegação cruzada (Serviços → Exames, Serviços → Zumbido)
- [x] Corpo legível ≥16px, alvos ≥44px, `prefers-reduced-motion` respeitado

---

## 13. Próximo passo — site completo

As 7 páginas estão construídas. O que resta é **aprovação do cliente** e o
fechamento das **pendências de conteúdo real** (seção 11): fotos reais (todas as
páginas e a equipe), `GOOGLE_REVIEWS_URL` e `COURSE_URL`, mockup do curso, e
confirmação dos títulos/CTAs derivados sinalizados. Nada de novo a construir
estruturalmente; ao entrar conteúdo real, só trocar os objetos `IMG`/URLs em
`lib/data.ts` e nas páginas. Rodar `npm run build` e validar por DOM após qualquer
ajuste (o preview congela — screenshots saem em branco por `document.hidden`).
