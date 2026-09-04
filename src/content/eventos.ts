import { hojeNaParaiba } from "@/lib/datas";

/*
  Eventos da comunidade.

  Anunciar um encontro é acrescentar um item aqui — a home e a página de
  eventos se viram sozinhas, e o evento migra para "já aconteceram" no dia
  seguinte, sem ninguém precisar mexer.

  TODO(dono): a lista começa vazia de propósito. Enquanto estiver assim, o
  site diz que ainda não há data marcada em vez de inventar uma.
*/

/*
  Um item da grade. Sem `palestrante` o item é um momento do evento
  (credenciamento, abertura, encerramento) e aparece discreto; com
  `palestrante`, é palestra e ganha destaque.
*/
export type ItemDaProgramacao = {
  horario: string;
  titulo: string;
  palestrante?: string;
  cargo?: string;
};

export type Evento = {
  /** Identificador na URL e na chave de lista. */
  id: string;
  titulo: string;
  /** "3º encontro", "Meetup de agosto" — opcional. */
  edicao?: string;
  /** `yyyy-mm-dd`, sempre. É comparado como string. */
  data: string;
  horario: string;
  local: string;
  endereco: string;
  descricao: string;
  /** Null quando a inscrição ainda não abriu. */
  urlIngressos: string | null;
  /** Null = entrada gratuita. Com valor, o cartão mostra o preço. */
  preco: string | null;
  /** Ausente enquanto a grade não fecha. */
  programacao?: ItemDaProgramacao[];
};

export const eventos: Evento[] = [
  {
    id: "paraibajs-2026",
    titulo: "ParaibaJS 2026",
    edicao: "Edição 2026",
    data: "2026-09-12",
    horario: "13h às 18h",
    local: "Auditório Central da UNIESP",
    endereco: "BR-230, Km 14, Cabedelo, PB",
    descricao:
      "O maior evento do ecossistema JavaScript da Paraíba: cinco palestras numa tarde, de memory leak a segurança em Node, com coffee-break para networking, brindes e sorteio de livros. Para estudante, pessoa desenvolvedora ou quem só quer entender do que se trata.",
    urlIngressos: "https://www.sympla.com.br/evento/paraibajs/3494354",
    preco: "R$ 50",
    programacao: [
      { horario: "13:00", titulo: "Credenciamento" },
      { horario: "13:40", titulo: "Abertura ParaibaJS" },
      {
        horario: "14:00",
        titulo: "Diagnosticando Memory Leaks com MemLab",
        palestrante: "Alan Felipe",
        cargo: "Full-Stack Developer",
      },
      {
        horario: "14:40",
        titulo: "Utilizando JS para construir um SaaS de cibersegurança",
        palestrante: "Jonatas",
        cargo: "Co-founder CarameloSec",
      },
      {
        horario: "15:20",
        titulo:
          "XSS ressuscitou e veio com LLM: renderizando interface que uma IA escreveu",
        palestrante: "Nicoly Almeida",
        cargo: "CEO LoopCraft · Líder GDG João Pessoa",
      },
      {
        horario: "16:00",
        titulo:
          "Instrumentalização de aplicações Node (métricas, traces e profiles)",
        palestrante: "Jonas Ariel",
        cargo: "Software Engineer",
      },
      {
        horario: "16:40",
        titulo: "5 maneiras pelas quais você poderia ter hackeado o Node.js",
        palestrante: "Rafael Gonzaga",
        cargo: "Principal Open Source Engineer, NodeSource",
      },
      { horario: "17:20", titulo: "Encerramento + sorteios" },
    ],
  },
];

/*
  Exemplo do formato, para copiar quando for anunciar o próximo:

  {
    id: "meetup-agosto-2026",
    titulo: "Node.js em produção sem sustos",
    edicao: "4º encontro",
    data: "2026-08-29",
    horario: "19h às 22h",
    local: "Espaço a confirmar",
    endereco: "João Pessoa, PB",
    descricao: "Duas talks sobre observabilidade e uma roda de conversa.",
    urlIngressos: "https://sympla.com.br/...",
    preco: null,          // null = entrada gratuita
  }
*/

function ordenarPorData(a: Evento, b: Evento) {
  return a.data.localeCompare(b.data);
}

/** Eventos de hoje em diante, do mais próximo ao mais distante. */
export function proximosEventos(): Evento[] {
  const hoje = hojeNaParaiba();
  return eventos.filter((e) => e.data >= hoje).sort(ordenarPorData);
}

/** Eventos já realizados, do mais recente ao mais antigo. */
export function eventosPassados(): Evento[] {
  const hoje = hojeNaParaiba();
  return eventos.filter((e) => e.data < hoje).sort((a, b) => ordenarPorData(b, a));
}

/** O próximo evento, ou null se não houver nada marcado. */
export function proximoEvento(): Evento | null {
  return proximosEventos()[0] ?? null;
}
