import { cn } from "@/lib/utils";

/*
  A assinatura da página: o feixe do Farol do Cabo Branco varrendo o hero.

  Um único elemento com `conic-gradient` — dois setores luminosos opostos, um
  vermelho e um solar, como as duas faces de um farol real — girando devagar.
  A máscara radial dissolve a luz longe da lanterna, para o feixe se dissipar
  em vez de terminar numa borda dura. Sem canvas, sem biblioteca, sem
  `box-shadow` com glow.

  `motion-reduce:animate-none` congela a varredura numa posição fixa: a
  composição continua de pé, só não há movimento.
*/
export function FeixeDoFarol({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden",
        className,
      )}
    >
      {/*
        Dois elementos, e não um: o de fora centraliza, o de dentro gira.
        Manter a rotação num nó sem posicionamento evita que qualquer ajuste
        futuro de `transform` no wrapper brigue com o keyframe. (No Tailwind
        v4 o `-translate-x-1/2` sai na propriedade `translate`, separada de
        `transform`, então hoje os dois já conviveriam no mesmo nó.)
      */}
      <div className="absolute top-1/2 left-1/2 aspect-square w-[190%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="size-full animate-[varredura_18s_linear_infinite] blur-[2px] motion-reduce:animate-none"
          style={{
            background: `conic-gradient(from 0deg,
              transparent 0deg,
              color-mix(in oklch, var(--farol) 55%, transparent) 3deg,
              color-mix(in oklch, var(--farol) 12%, transparent) 17deg,
              transparent 30deg,
              transparent 180deg,
              color-mix(in oklch, var(--sol) 34%, transparent) 183deg,
              color-mix(in oklch, var(--sol) 8%, transparent) 195deg,
              transparent 208deg,
              transparent 360deg)`,
            maskImage:
              "radial-gradient(circle at center, #000 4%, rgba(0,0,0,.85) 22%, transparent 62%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, #000 4%, rgba(0,0,0,.85) 22%, transparent 62%)",
          }}
        />
      </div>

      {/* a lanterna: o ponto de onde a luz sai */}
      <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-sol" />
      <div className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 bg-sol/12 blur-xl" />
    </div>
  );
}
