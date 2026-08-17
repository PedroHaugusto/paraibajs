import { ArrowRightIcon } from "lucide-react";

import { proximoEvento } from "@/content/eventos";

/*
  Faixa fina no topo anunciando o próximo evento. Só existe quando há evento
  marcado E com inscrição aberta — sem isso o componente não renderiza nada,
  então nenhuma página precisa saber se deve escondê-la.

  O texto é branco puro, não `cal`: sobre o vermelho da marca só o #fff cruza
  4.5:1, e aqui o texto é pequeno.
*/
export function FaixaDeAnuncio() {
  const evento = proximoEvento();
  if (!evento?.urlIngressos) return null;

  const [, mes, dia] = evento.data.split("-");
  const mesCurto = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(2000, +mes - 1, 1)))
    .replace(".", "");

  return (
    <a
      href={evento.urlIngressos}
      target="_blank"
      rel="noreferrer noopener"
      className="group block bg-farol text-white transition-colors hover:bg-white hover:text-breu"
    >
      <div className="envelope flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center">
        <span className="rotulo font-bold">
          {dia} {mesCurto}
        </span>
        {/* O local é o pedaço mais longo e o primeiro a sair no telefone. */}
        <span className="text-sm font-semibold">
          {evento.titulo}
          <span className="hidden md:inline"> no {evento.local}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-bold">
          Garantir ingresso
          <ArrowRightIcon
            className="size-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </a>
  );
}
