/*
  Fica fora de `cabecalho.tsx` de propósito: aquele arquivo é "use client", e
  um array exportado de um módulo cliente chega no server component como
  proxy de referência, não como array.
*/
export const navegacao = [
  { rotulo: "Eventos", href: "/eventos" },
  { rotulo: "Comunidade", href: "/comunidade" },
  { rotulo: "Call For Papers", href: "/call-for-papers" },
  { rotulo: "Voluntários", href: "/voluntarios" },
  { rotulo: "Links úteis", href: "/links" },
] as const;
