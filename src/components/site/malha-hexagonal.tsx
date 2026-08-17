import { cn } from "@/lib/utils";

/*
  Malha de hexágonos que acendem e apagam fora de sincronia.

  Substitui o feixe de farol, que desenhava um cone com borda reta e deixava
  visível o retângulo do próprio container. Aqui não há máscara nem recorte:
  os hexágonos são elementos discretos, então não existe emenda para aparecer.

  A forma vem da identidade — o símbolo da ParaibaJS é um hexágono e o
  material gráfico do evento usa a mesma malha de fundo. O piscar mantém a
  ideia do farol (luz intermitente) sem precisar desenhar o feixe, e lê como
  uma rede de pontos se comunicando, que é o que a comunidade é.

  As posições saem de uma grade hexagonal de verdade, calculada abaixo, e não
  de coordenadas escolhidas a esmo: é isso que faz o conjunto parecer um
  padrão em vez de decoração espalhada.
*/

const RAIO = 34;
const PASSO_X = Math.sqrt(3) * RAIO;
const PASSO_Y = 1.5 * RAIO;

/** Vértices de um hexágono pointy-top centrado em (cx, cy). */
function hexagono(cx: number, cy: number, r: number) {
  const meiaLargura = (Math.sqrt(3) / 2) * r;
  return [
    [cx, cy - r],
    [cx + meiaLargura, cy - r / 2],
    [cx + meiaLargura, cy + r / 2],
    [cx, cy + r],
    [cx - meiaLargura, cy + r / 2],
    [cx - meiaLargura, cy - r / 2],
  ]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

/*
  Células da grade. `aceso` marca as poucas que ganham cor — o resto fica em
  contorno neutro, senão a malha inteira compete com o texto.
*/
const celulas: Array<{
  coluna: number;
  linha: number;
  cor?: "farol" | "sol";
  duracao: number;
  atraso: number;
}> = [
  { coluna: 0, linha: 0, duracao: 9, atraso: 0 },
  { coluna: 1, linha: 0, cor: "sol", duracao: 7, atraso: 1.5 },
  { coluna: 2, linha: 0, duracao: 11, atraso: 3 },
  { coluna: 0, linha: 1, cor: "farol", duracao: 8, atraso: 2.2 },
  { coluna: 1, linha: 1, duracao: 10, atraso: 0.6 },
  { coluna: 2, linha: 1, duracao: 7.5, atraso: 4 },
  { coluna: 0, linha: 2, duracao: 12, atraso: 1 },
  { coluna: 1, linha: 2, cor: "sol", duracao: 9.5, atraso: 3.4 },
  { coluna: 2, linha: 2, duracao: 8.5, atraso: 5 },
  { coluna: 0, linha: 3, duracao: 10.5, atraso: 2.8 },
  { coluna: 1, linha: 3, cor: "farol", duracao: 7, atraso: 0.3 },
  { coluna: 2, linha: 3, duracao: 11.5, atraso: 4.6 },
  { coluna: 1, linha: 4, duracao: 9, atraso: 2 },
  { coluna: 2, linha: 4, cor: "sol", duracao: 8, atraso: 5.4 },
];

export function MalhaHexagonal({ className }: { className?: string }) {
  const largura = 3 * PASSO_X + PASSO_X;
  const altura = 5 * PASSO_Y + RAIO * 2;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${largura} ${altura}`}
      className={cn("pointer-events-none absolute", className)}
      fill="none"
    >
      {celulas.map(({ coluna, linha, cor, duracao, atraso }) => {
        const x =
          coluna * PASSO_X + (linha % 2 ? PASSO_X / 2 : 0) + PASSO_X / 2;
        const y = linha * PASSO_Y + RAIO;
        const traco = cor ? `var(--${cor})` : "var(--cal)";

        return (
          <polygon
            key={`${coluna}-${linha}`}
            points={hexagono(x, y, RAIO)}
            stroke={traco}
            strokeWidth={cor ? 1.5 : 1}
            fill={cor ? traco : "none"}
            fillOpacity={cor ? 0.06 : 0}
            style={{
              animation: `pulsar ${duracao}s ease-in-out ${atraso}s infinite`,
            }}
          />
        );
      })}
    </svg>
  );
}
