/*
  Identidade e canais da comunidade.

  TODO(dono): confirme os handles e o e-mail antes de publicar. Os valores
  abaixo são suposições a partir do nome da comunidade — nenhum deles foi
  verificado.
*/

export const comunidade = {
  nome: "ParaibaJS",
  nomeCompleto: "ParaibaJS — comunidade JavaScript da Paraíba",
  cidade: "João Pessoa, PB",
  chamada: "A comunidade de JavaScript (E todo seu ecossistema) da Paraíba",
  descricao:
    "Um ponto de encontro para quem escreve JavaScript na Paraíba: encontros presenciais, palestras, código aberto e gente disposta a ensinar o que sabe.",
  emailContato: "paraibajscrud@gmail.com",
} as const;

export type Canal = {
  nome: string;
  descricao: string;
  url: string;
  identificador: string;
};

export const canais: Canal[] = [
  {
    nome: "WhatsApp",
    descricao: "O grupo do dia a dia. É onde as coisas acontecem primeiro.",
    url: "https://chat.whatsapp.com/KwmvmPtUSpAFyzBj2IkUZI?s=sw&p=a&ilr=0",
    identificador: "Grupo da comunidade",
  },
  {
    nome: "Instagram",
    descricao: "Datas dos encontros, chamadas abertas e registro do que rolou.",
    url: "https://instagram.com/paraibajs",
    identificador: "@paraibajs",
  },
  {
    nome: "LinkedIn",
    descricao: "Nosso canal de anúncios e publicações.",
    url: "https://linkedin.com/company/paraibajs",
    identificador: "/company/paraibajs",
  },
  {
    nome: "E-mail",
    descricao: "Para patrocínio, parceria e qualquer assunto formal.",
    url: `mailto:${comunidade.emailContato}`,
    identificador: comunidade.emailContato,
  },
];

/*
  Letreiro do hero. É o ecossistema, não uma lista de tecnologias que a
  comunidade "usa" — a graça do JavaScript é caber tudo isso.
*/
export const ecossistema = [
  "Node.js",
  "TypeScript",
  "React",
  "Vue",
  "Svelte",
  "Angular",
  "Next.js",
  "Deno",
  "Bun",
  "Astro",
  "Vite",
  "Nest",
  "Electron",
  "React Native",
  "Three.js",
  "WebAssembly",
];

/* Os encontros ficam em `eventos.ts`. */
