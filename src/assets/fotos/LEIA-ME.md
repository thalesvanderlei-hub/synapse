# Fotos do site — onde colocar

Largue as fotos reais aqui, dentro da subpasta certa. **Não precisa mexer em código** —
o site lê a pasta automaticamente e monta a galeria com o que estiver dentro.

```
src/assets/fotos/
  ambiente/   ← fotos da clínica, recepção, salas, equipamentos (galeria do "Sobre")
  equipe/     ← retratos dos profissionais (substituem o "FOTO EM BREVE")
  home/       ← foto(s) de destaque da Home, se quiser trocar
```

## Como nomear
- **ambiente/**: nome livre, sem acento e sem espaço. Ex.: `recepcao-01.jpg`, `sala-audiometria.jpg`.
  A ordem na galeria segue a ordem alfabética do nome — use `01-`, `02-`, `03-` na frente
  se quiser controlar a sequência.
- **equipe/**: use as **iniciais do profissional** (as mesmas do site) como nome do arquivo:
  `TG.jpg` (Thales), `AC.jpg` (Anália), `DV.jpg` (Danmires), `CM.jpg` (Caroline),
  `MC.jpg` (Moses), `KL.jpg` (Kryssia), `WG.jpg` (Wilson).

## Formato e tamanho (importa para o site ficar rápido)
- Formatos aceitos: **.jpg, .png, .webp** (`.webp` é o mais leve — se puder, prefira).
- Largura ideal: **1600px** no maior lado para fotos de ambiente; **1000px** para retratos.
- Peso: tente manter cada foto **abaixo de ~500 KB** (o Vite otimiza, mas foto de 8 MB
  vinda direto do celular deixa tudo pesado).
- Retratos da equipe: enquadramento **quadrado** ou vertical fica melhor no card.

## Depois de colocar as fotos
Me avisa aqui no chat (ou é só rodar `npm run build`). A galeria do "Sobre" e os
retratos da equipe passam a aparecer sozinhos, na mesma hora.
