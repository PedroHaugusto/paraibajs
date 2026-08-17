/*
  Links úteis, agrupados por intenção — o que a pessoa quer fazer agora, não
  o tipo de mídia.

  A linha `porque` não é decorativa: um link sem motivo vira lista de
  favoritos de outra pessoa. Se não der para explicar por que está aqui, o
  link não entra.

  TODO(dono): troque pelos que a comunidade realmente indica. Os abaixo são
  referências estáveis e de acesso livre, para o site não nascer vazio.
*/

export type Link = {
  titulo: string;
  url: string;
  porque: string;
};

export type Categoria = {
  nome: string;
  descricao: string;
  links: Link[];
};

export const categorias: Categoria[] = [
  {
    nome: "Começar do zero",
    descricao: "Para quem está escrevendo as primeiras linhas.",
    links: [
      {
        titulo: "MDN Web Docs",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
        porque:
          "A referência da linguagem, em português. Quando a resposta do fórum discordar da MDN, confie na MDN.",
      },
      {
        titulo: "javascript.info",
        url: "https://javascript.info/",
        porque:
          "O tutorial mais completo de JavaScript moderno, na ordem certa e com exercício em cada capítulo.",
      },
      {
        titulo: "web.dev — Learn",
        url: "https://web.dev/learn",
        porque:
          "Cursos curtos de HTML, CSS e acessibilidade escritos por quem trabalha no navegador.",
      },
    ],
  },
  {
    nome: "Ir mais fundo",
    descricao: "Quando o básico já não explica o que está acontecendo.",
    links: [
      {
        titulo: "You Don't Know JS Yet",
        url: "https://github.com/getify/You-Dont-Know-JS",
        porque:
          "Explica o que a linguagem faz por baixo: escopo, closures, coerção. Livre para ler no GitHub.",
      },
      {
        titulo: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
        porque:
          "A documentação oficial cobre 90% do que se usa no dia a dia, incluindo os erros que mais confundem.",
      },
      {
        titulo: "Node.js — documentação",
        url: "https://nodejs.org/docs/latest/api/",
        porque:
          "A API completa do runtime. Útil para parar de instalar pacote que a biblioteca padrão já resolve.",
      },
    ],
  },
  {
    nome: "Ferramentas do dia a dia",
    descricao: "O que abre junto com o editor.",
    links: [
      {
        titulo: "Can I use",
        url: "https://caniuse.com/",
        porque:
          "Antes de usar um recurso novo, confira em quais navegadores ele funciona de verdade.",
      },
      {
        titulo: "Bundlephobia",
        url: "https://bundlephobia.com/",
        porque:
          "Mostra quanto peso um pacote npm adiciona ao seu bundle antes de você instalar.",
      },
      {
        titulo: "RegExr",
        url: "https://regexr.com/",
        porque:
          "Testa e explica expressões regulares em tempo real, parte por parte.",
      },
    ],
  },
  {
    nome: "Comunidades vizinhas",
    descricao: "Gente boa fazendo coisa parecida em outros lugares.",
    links: [
      {
        titulo: "BrazilJS",
        url: "https://braziljs.org/",
        porque:
          "A comunidade JavaScript brasileira mais antiga em atividade, com conteúdo e eventos nacionais.",
      },
      {
        titulo: "Front-end Brasil",
        url: "https://github.com/frontendbr/forum",
        porque:
          "Fórum no GitHub onde dá para perguntar em português e receber resposta de gente sênior.",
      },
    ],
  },
];
