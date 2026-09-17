Vamos construir o site institucional da Synapse Reabilitação Neurofuncional. Antes de escrever qualquer código, leia os três arquivos de contexto do projeto:

* .claude/rules/synapse-style-guide.md — paleta de cores, tipografia, componentes, espaçamento, movimento
* .claude/rules/synapse-project-context.md — público-alvo, arquitetura do site, tom de voz, requisitos funcionais
* docs/synapse-copy-institucional.md — texto literal de cada página, fonte única de verdade para todo o conteúdo escrito
Regra inegociável: copy 100% fiel
O texto de synapse-copy-institucional.md deve ir para o site exatamente como está — títulos, corpo, CTAs, depoimentos, currículos da equipe. Não resuma, não reescreva, não "melhore", não corrija estilo. Se um trecho parecer incompleto ou algo estiver faltando pra montar um componente, sinalize como pendência em vez de inventar texto novo. Isso vale para toda a produção, do início ao fim — inclusive se, no meio do desenvolvimento, a tentação for "ajustar uma frase pra caber melhor no layout": não é pra fazer isso — o layout se adapta ao texto, não o contrário.
Direção de design
Tom geral: sério, mas moderno. É uma clínica de saúde — precisa manter credibilidade — mas o resultado não pode parecer institucional datado. Sóbrio, nunca gritante.
UI: minimalista, seguindo à risca a paleta e a tipografia definidas no style guide (Azul Marinho, Azul Profundo, Azul Primário, Azul Secundário, Branco Gelo, Branco — nenhuma cor fora dessa paleta sem justificativa clara). Fonte DM Sans (ou Manrope) em toda a interface.
Animações: transições suaves de entrada e saída de texto — pense em fade + leve deslocamento ao entrar na viewport, stagger em listas/títulos, microinterações de hover. O style guide traz uma tabela de movimento (duração/easing) como ponto de partida, não como teto — fique à vontade para propor transições novas, efeitos de texto, ou animações de página conforme o desenvolvimento avançar. As duas regras que não mudam: sempre respeitar prefers-reduced-motion, e nunca usar parallax pesado ou scroll-jacking — parte do público da Synapse busca tratamento para tontura e vertigem, então excesso de movimento na tela não é só uma questão estética aqui.
Nível de ambição: queremos algo nível awwwards — fora do padrão de site institucional de clínica, com um elemento visual de assinatura, motion com intenção, atenção a detalhe tipográfico. Mas sempre funcional e coerente com quem vai navegar (ver público-alvo abaixo) — "diferente" nunca pode significar confuso ou difícil de usar.
Inspiração estrutural (não copiar)
Em anexo há screenshots de um produto de telemedicina (referência de estrutura de página, não de marca). Use como inspiração de padrões de layout, adaptando ao tom mais acolhedor da Synapse — não replique paleta, fontes, ícones ou fotografia da referência. Padrões que valem observar:

* Hero com CTA único e claro, seguido de prova social imediata (métricas pequenas logo abaixo)
* Faixa de confiança logo após o hero (aqui: convênios atendidos, não logos de parceiros)
* Grid de features/áreas de atuação com card + tag sobreposta
* Seção de benefícios em lista simples, ícone + texto curto
* Alternância entre seções claras e uma seção de fundo escuro para dar ritmo visual a uma página com bastante conteúdo
* CTA final antes do rodapé, rodapé organizado por colunas
O que evitar de propósito na referência: ela é B2B/SaaS, fria e corporativa. A Synapse precisa ser mais quente — pense nas mães de crianças pequenas e nos cuidadores de idosos que vão navegar, não em um comprador corporativo.
Público-alvo (orienta toda decisão de UX)

1. Mães de crianças de 2 a 14 anos
2. Responsáveis por idosos
3. Adultos/idosos como pacientes diretos (zumbido, voz, tontura, perda auditiva)
Implicações práticas: navegação simples e previsível, texto de corpo em 18px (não 16px), alvos de toque grandes (mín. 44×44px), hierarquia clara nas páginas mais densas (Exames, Equipe, Tratamento do Zumbido).
Requisitos funcionais obrigatórios

* Botão fixo flutuante de agendamento/contato, visível em todas as páginas
* Mapa do Google incorporado na seção de contato (Home resumida + Página 6 completa)
* Carrossel de depoimentos com rolagem automática contínua, sem clique necessário
* Link direto para avaliações no perfil do Google (Página 6)
* Navegação cruzada entre páginas conforme definido no copy (ex.: "Ver todos os exames" → Página 3)
Como começar

1. Confirme que leu os três arquivos de contexto e que não há dúvidas sobre a paleta, tipografia ou estrutura de páginas.
2. Proponha a abordagem técnica (stack) antes de gerar código — essa decisão está em aberto de propósito no contexto de produção, então vale alinhar antes de começar a construir.
3. Comece pela Home — é a página mais densa em componentes reutilizáveis (hero, cards, depoimentos, CTA flutuante), então validar o sistema visual nela evita retrabalho nas páginas internas.
4. Depois de aprovada a Home, siga para as páginas internas na ordem: Sobre → Serviços → Exames → Tratamento do Zumbido → Equipe → Contato.
5. A página do curso está fora de escopo — no site institucional ela aparece só como uma chamada breve com botão, sem construir a página em si.
dentro da pasta do projeto tem uma pasta com as logos e pattern para uso, enviei em anexo para reforçar, os docs da copy e do style guide, as imagens citadas no prompt também coloquei como referência, não copiar igual.