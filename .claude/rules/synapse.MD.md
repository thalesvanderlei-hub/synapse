# Synapse — Style Guide

> Documento vivo. Isto é um ponto de partida sólido, não uma prisão. Qualquer valor aqui — cor, espaçamento, fonte — pode ser ajustado durante o desenvolvimento se algo funcionar melhor na prática. O objetivo é consistência, não rigidez.

---

## 1. Fundamento da marca

**O que a Synapse é:** uma clínica de Fonoaudiologia e Otorrinolaringologia em Maceió, com atuação ampla (motricidade orofacial, disfagia, voz, linguagem) e um foco forte em audição — perda auditiva, zumbido, tontura/equilíbrio, processamento auditivo. O diferencial explícito no copy é reunir, num só espaço, especialidades que normalmente estão espalhadas.

**Tom de posicionamento (extraído do copy validado):** ciência + tecnologia + cuidado humano. As três palavras aparecem lado a lado no Hero da Home e se repetem como fio condutor em todas as páginas ("ética, ciência e humanização caminham juntas").

**O que isso significa visualmente:**
- Precisão e clareza (ciência/tecnologia) → grid limpo, tipografia nítida, dados e credenciais bem organizados.
- Acolhimento (cuidado humano) → cores quentes de fundo, fotografia real, espaço generoso, nada apertado ou clínico-frio.
- Nada gritando. Sobriedade é uma escolha de posicionamento, não só estética — o público inclui pais preocupados com filhos pequenos e famílias cuidando de idosos com tontura/vertigem. Calma visual = confiança.

**Público que baliza toda decisão de UI:**
| Perfil | Necessidade de design |
|---|---|
| Mães de crianças de 2 a 14 anos | Linguagem visual acolhedora, não-clínica; leitura fácil e rápida; prova social (depoimentos) em destaque |
| Responsáveis por idosos | Contraste alto, fontes maiores, alvos de toque grandes, navegação simples e previsível |
| Adultos/idosos pacientes diretos (zumbido, voz, tontura) | Informação técnica acessível sem jargão excessivo; nada de movimento exagerado na tela (ver seção 7 — parte do público lida com tontura/vertigem) |

---

## 2. Cor

Paleta oficial (versão corrigida/validada), seis cores:

| Nome | Hex | Função definida |
|---|---|---|
| **Azul Marinho** | `#02173B` | Textos e detalhes |
| **Azul Profundo** | `#02102A` | Apoio |
| **Azul Primário** | `#52D4FF` | Para fundo escuro |
| **Azul Secundário** | `#42ADD0` | Para fundo claro |
| **Branco Gelo** | `#EEFBFF` | Textos e detalhes |
| **Branco** | `#FFFFFF` | Textos e detalhes |

**Lógica de aplicação (duas bases + dois acentos + dois neutros claros):**
- **Fundo escuro:** base em Azul Marinho ou Azul Profundo → texto/ícone em Branco, Branco Gelo, ou Azul Primário como acento.
- **Fundo claro:** base em Branco Gelo ou Branco → texto em Azul Marinho. Azul Secundário entra como preenchimento/acento sobre esse fundo, não como cor de texto (ver contraste abaixo).

### Contraste — testado, não estimado

Contraste real calculado (fórmula WCAG de luminância relativa) para as combinações que a paleta sugere:

| Combinação | Contraste | Leitura |
|---|---|---|
| Azul Marinho sobre Branco Gelo | **16.7 : 1** | Excelente — AAA com folga. Texto de corpo padrão em fundo claro. |
| Azul Marinho sobre Branco | **17.7 : 1** | Excelente. |
| Branco sobre Azul Profundo | **18.9 : 1** | Excelente — texto padrão em fundo escuro. |
| Branco Gelo sobre Azul Profundo | **17.9 : 1** | Excelente. |
| Azul Primário sobre Azul Profundo | **11.0 : 1** | Muito bom — ótimo como acento/texto de destaque em fundo escuro. |
| Azul Primário sobre Azul Marinho | **10.3 : 1** | Muito bom, mesmo uso. |
| Azul Primário sobre Branco Gelo | **1.6 : 1** | Reprovado — Azul Primário é para fundo escuro, exatamente como a função já define; não usar como texto em fundo claro. |
| Azul Secundário sobre Branco Gelo/Branco (como texto) | **2.4–2.6 : 1** | Reprovado para texto — abaixo do mínimo de 4.5:1. Use Azul Secundário como preenchimento/bloco de cor, não como cor de fonte sobre claro. |
| Azul Marinho sobre Azul Primário (texto em cima do preenchimento) | **10.3 : 1** | Aprovado — esse é o par usado no botão primário. |
| Azul Marinho sobre Azul Secundário (texto em cima do preenchimento) | **6.8 : 1** | Aprovado — se precisar de texto sobre um bloco em Azul Secundário, use Azul Marinho, não branco. |
| Branco sobre Azul Secundário | **2.6 : 1** | Reprovado — evitar texto branco direto sobre Azul Secundário; contraste insuficiente. |

**Resumo prático:** os dois acentos (Azul Primário e Azul Secundário) funcionam muito bem como *blocos de cor, ícones e detalhes gráficos*, mas só o Azul Primário se sustenta como *texto*, e apenas sobre fundo escuro. Se o Azul Secundário for usado como preenchimento de um card ou seção, o texto por cima deve ser Azul Marinho.

Regra de proporção como ponto de partida: ~60% neutros (Branco/Branco Gelo/Azul Profundo, a depender do modo), ~30% Azul Marinho, ~10% acentos (Primário/Secundário). Ajustável.

---

## 3. Tipografia

**Fonte do logotipo:** o PDF traz a fonte **Santral Bold** incorporada — é a família usada no wordmark. Santral é comercial (Taner Ardalı), licenciável via Fontspring/MyFonts. Isso fica restrito ao logotipo (já é vetor).

**Fonte do site — decisão:** em vez de seguir o caráter mais quente/geométrico da Santral no resto da interface, a direção definida é uma fonte **padrão, neutra, menos "amigável"** — uma grotesca de sistema, não uma humanista decorativa. Uma família só, variando peso para hierarquia (mais simples e mais consistente do que combinar duas famílias diferentes):

- **DM Sans** (recomendação principal) — grotesca geométrica de baixo contraste, sóbria, muito usada em produtos/sistemas por ser discreta e legível sem "personalidade" de sobra.
- **Manrope** (alternativa igualmente válida) — mesma categoria, terminações ligeiramente mais fechadas. Troca direta se preferir esse acabamento.

Ambas cobrem acentuação do português, são gratuitas (Google Fonts/Fontshare) e têm peso suficiente (Regular/Medium/Bold) para cobrir toda a hierarquia sem precisar de uma segunda família.

**Corpo de texto:** o site tem páginas densas (Exames, Equipe, Tratamento do Zumbido) — legibilidade pesa mais que personalidade aqui, principalmente para o público 60+. Tamanho generoso importa mais do que a escolha exata entre DM Sans e Manrope.

### Escala tipográfica (ponto de partida, não regra fixa)

| Elemento | Tamanho (desktop) | Tamanho (mobile) | Peso | Line-height |
|---|---|---|---|---|
| H1 / Hero | 48–64px | 32–40px | Bold (700) | 1.1 |
| H2 | 32–40px | 26–30px | Bold (700) | 1.15 |
| H3 | 22–26px | 19–21px | Medium (500) | 1.25 |
| Corpo | **18px** (não 16px) | 16–17px | Regular (400) | 1.6 |
| Legenda/eyebrow (ex.: "SERVIÇOS") | 13–14px, uppercase, letter-spacing | mesmo | Medium (500) | 1.4 |

Corpo em 18px (em vez do padrão web de 16px) é intencional — pensando no público idoso/cuidadores, um pouco mais de tamanho base custa pouco e ajuda muito. Linha de texto ideal: 60–75 caracteres de largura máxima em parágrafos longos (Exames, Equipe).

---

## 4. Componentes de UI

Baseado no clean look de referência (screenshots enviados) adaptado ao tom mais acolhedor da Synapse:

- **Botões:** formato pílula (border-radius total), padding generoso — alvo de toque mínimo 44×44px (acessibilidade para idosos/motricidade reduzida). Botão primário em Azul Primário (`#52D4FF`) com texto em Azul Marinho — é a cor mais viva da paleta, dá o destaque que o CTA principal precisa, e o par tem contraste de 10.3:1 (testado). Botão secundário outline em Azul Marinho.
- **Cards:** cantos arredondados suaves (12–20px), sombra discreta, nunca bordas duras. Cards de estatística (ex.: "87% de adesão", "4.8/5") funcionam bem no estilo do case de referência — números grandes, texto de apoio pequeno.
- **Eyebrow labels:** pequenas tags uppercase com marcador ("• FEATURES", "• EXAMES") acima de cada título de seção — recurso simples que já organiza visualmente uma página com muito conteúdo, como é o caso da Synapse.
- **Ícones:** linha fina, cantos arredondados, um traço só (não preenchidos) — reforça o "clean, nada gritando".
- **Convênios/parceiros:** faixa horizontal em logos monocromáticos (cinza), como no exemplo de referência — funciona bem para a lista de convênios (Unimed, Bradesco Saúde, Amil etc.).
- **Depoimentos:** carrossel contínuo (definido no copy) — sem seta, sem clique, rolagem automática suave e infinita. Cuidado: velocidade de rolagem deve ser lenta o suficiente para leitura confortável por qualquer idade.
- **Formulários/agendamento:** campos grandes, labels sempre visíveis (não só placeholder), foco de teclado bem visível — pensando em quem agenda pelo celular sem pressa.

---

## 5. Fotografia e imagem

- Fotografia real da clínica/equipe/pacientes (quando possível) > banco de imagens genérico. O copy já é muito pessoal (depoimentos reais, currículos da equipe) — a imagem deveria seguir esse mesmo nível de autenticidade.
- Se usar banco de imagens: priorizar luz natural, expressões calmas e reais, evitar "stock clichê" de jaleco branco/sorriso forçado.
- Representar as duas pontas do público visualmente: crianças em ambiente acolhedor (não assustador) e idosos com autonomia e dignidade (não como "frágeis").
- Evitar excesso de elementos médicos frios em primeiro plano (estetoscópios, agulhas) — o tom do copy é sobre comunicação, escuta e qualidade de vida, não sobre procedimento clínico.

---

## 6. Espaçamento e grid

- Base de 8px para toda a escala de espaçamento (8, 16, 24, 32, 48, 64, 96, 128...).
- Whitespace generoso entre seções — o site tem muito conteúdo (6 páginas internas + Home densa); respirar entre blocos é o que evita a sensação de "gritando"/poluído.
- Container máximo sugerido: ~1200–1280px, com padding lateral confortável em mobile (mín. 20–24px).

---

## 7. Movimento e microinterações

Isso merece atenção especial neste projeto: **parte do público da Synapse busca tratamento justamente para tontura, vertigem e desequilíbrio.** Um site com parallax agressivo, scroll-jacking ou animações exageradas não é só "não combina com o clean" — pode literalmente incomodar fisicamente parte de quem visita.

O que vem a seguir é ponto de partida, não uma lista fechada — durante o desenvolvimento pode surgir vontade de testar uma transição nova, um efeito de texto, uma microinteração diferente, e isso é bem-vindo. As duas únicas regras que não mudam são: respeitar `prefers-reduced-motion` e evitar parallax pesado/scroll-jacking — o resto é espaço livre para experimentar.

Princípios (baseline):
- Movimento sutil e funcional: fade-in + leve deslocamento (8–16px) ao entrar na viewport, nunca giros, zooms bruscos ou parallax pesado.
- Duração curta (200–400ms), easing suave (`ease-out` na entrada).
- Sempre respeitar `prefers-reduced-motion` no CSS/JS — reduzir ou remover animações para quem tem essa preferência do sistema ativada. Neste projeto isso não é só boa prática genérica, é coerente com o próprio público-alvo.
- Microinterações (hover em botão, card levantando levemente, ícone animando ao passar o mouse) são bem-vindas — dão a sensação "nível awwwards" sem depender de efeitos grandes na página toda.
- Um destaque visual "assinatura" (ex.: um pulso/onda sutil em Azul Primário, remetendo a sinapse/onda sonora) pode ser o elemento diferenciado do site, usado com moderação — muito mais eficaz que dezenas de pequenas animações espalhadas.

---

## 8. Voz aplicada à interface (microcopy)

O copy já define convenções fortes — vale estender isso a botões, states de erro/sucesso, mensagens de formulário:
- Direto, caloroso, sem formalidade excessiva (consistente com o tom institucional validado).
- CTAs sempre em verbo de ação claro: "Agende agora", "Fale conosco", "Ver todos os serviços" — já estabelecidos no copy, manter esse padrão em qualquer CTA novo que surgir.

---

## 9. O que evitar (resumo rápido)

- ❌ Azul Primário ou Azul Secundário como texto sobre fundo claro (contraste reprovado — ver seção 2)
- ❌ Fontes abaixo de 16px em qualquer texto de leitura
- ❌ Parallax pesado, scroll-jacking, animações bruscas
- ❌ Excesso de cor — a marca é essencialmente bicolor + neutros; resistir à tentação de adicionar cores "de apoio" sem necessidade real
- ❌ Cards/seções muito comprimidos — o conteúdo é extenso, o layout precisa de ar
- ❌ Imagética clínica fria — o tom da marca é científico *e* humano, os dois juntos

---

*Este guia parte do que existe hoje no arquivo de marca (cores, fonte do logo) e do copy validado (tom, estrutura, convênios, depoimentos). Tudo que foi "sugerido" (neutros, fonte de corpo, escala tipográfica, componentes) é extrapolação de boas práticas para este público específico — ajustável a qualquer momento sem quebrar a identidade da marca.*
