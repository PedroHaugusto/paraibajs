import { cn } from "@/lib/utils";

/*
  Faixa horizontal em rolagem contínua. A lista é duplicada e o trilho anda
  exatamente -50%, então o ponto de emenda cai onde a segunda cópia começa e
  o laço fica invisível. A cópia duplicada é escondida de leitores de tela.
*/
export function Letreiro({
  itens,
  className,
  separador = "◆",
}: {
  itens: readonly string[];
  className?: string;
  separador?: string;
}) {
  const trilho = (
    <ul className="flex shrink-0 items-center">
      {itens.map((item) => (
        <li key={item} className="flex items-center gap-8 px-4">
          <span className="display text-2xl whitespace-nowrap md:text-3xl">
            {item}
          </span>
          {/*
            Amarelo e não vermelho: no tamanho do separador o vermelho da
            marca fica em 4.3:1 sobre o breu, e o sol resolve com 12.7:1 —
            de quebra ecoando a cor do próprio JavaScript.
          */}
          <span className="text-sm text-sol" aria-hidden>
            {separador}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "flex overflow-hidden border-y border-risco py-5",
        className,
      )}
    >
      <div className="flex animate-[deriva_45s_linear_infinite] motion-reduce:animate-none">
        {trilho}
        <div aria-hidden>{trilho}</div>
      </div>
    </div>
  );
}
