import { cn } from "@/lib/utils";

/*
  Reconstrução do símbolo da ParaibaJS: o Farol do Cabo Branco dentro do
  hexágono bicolor, com a rampa da Estação Cabo Branco cortando na diagonal.

  TODO(dono): quando o SVG original chegar, troque este desenho por ele. O
  contrato do componente (props `className` e `titulo`) não precisa mudar.
*/
export function Simbolo({
  className,
  titulo = "ParaibaJS",
}: {
  className?: string;
  titulo?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={titulo}
      className={cn("block", className)}
    >
      {/* hexágono: metade no breu, metade no vermelho do farol */}
      <clipPath id="hex">
        <path d="M32 1.5 58.4 16.75v30.5L32 62.5 5.6 47.25v-30.5z" />
      </clipPath>
      <g clipPath="url(#hex)">
        <rect x="0" y="0" width="32" height="64" fill="#0b0b0c" />
        <rect x="32" y="0" width="32" height="64" fill="#e5232b" />
      </g>

      {/* miolo claro onde o farol se apoia */}
      <rect x="14" y="12" width="36" height="36" rx="3" fill="#f4f2ed" />

      {/* farol: torre, faixa, lanterna e cúpula */}
      <path d="M28.6 45.5h6.8L34.1 24h-4.2z" fill="#0b0b0c" />
      <path d="M29.4 37.6h5.2l-.5-6.4h-4.2z" fill="#f4f2ed" />
      <rect x="28.4" y="19.8" width="7.2" height="4.4" fill="#0b0b0c" />
      <path d="M32 14.2l3.4 5.6h-6.8z" fill="#0b0b0c" />

      {/* rampa do mirante do Niemeyer */}
      <path d="M12 43.2 52 35v4.6L12 47.8z" fill="#f4f2ed" stroke="#0b0b0c" strokeWidth="1" />
    </svg>
  );
}

export function Marca({
  className,
  classNameTexto,
}: {
  className?: string;
  classNameTexto?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Simbolo className="size-8 shrink-0" />
      <span className={cn("display text-xl leading-none", classNameTexto)}>
        Paraiba<span className="text-farol">JS</span>
      </span>
    </span>
  );
}
