/*
  Conteúdo do Call For Papers.

  TODO(dono): as datas abaixo são de exemplo e estão marcadas como `null`
  para não anunciar prazo que não existe. Preencha `prazo` de cada etapa
  quando a chamada abrir de verdade.
*/

export const chamadaAberta = true;

export const etapas: Array<{
  titulo: string;
  texto: string;
  prazo: string | null;
}> = [
  {
    titulo: "Você envia",
    texto:
      "Preencha o formulário desta página. Não precisa de slide pronto nem de apresentação gravada — a ideia importa mais que o acabamento.",
    prazo: null,
  },
  {
    titulo: "A curadoria lê",
    texto:
      "Um grupo da organização lê todas as propostas. Se faltar contexto para decidir, a gente escreve perguntando.",
    prazo: null,
  },
  {
    titulo: "Você recebe a resposta",
    texto:
      "Todo mundo recebe retorno, aprovado ou não. Proposta recusada vem com o motivo — serve para a próxima.",
    prazo: null,
  },
  {
    titulo: "A gente ensaia junto",
    texto:
      "Quem nunca palestrou pode ensaiar com alguém da organização antes do dia. É opcional e ajuda mais do que parece.",
    prazo: null,
  },
];

export const criterios = [
  {
    titulo: "Conte o que você viveu",
    texto:
      "A palestra que fica na memória é a que mostra um problema real e o que deu errado no caminho. Vale bug de produção, migração que travou, decisão de arquitetura que envelheceu mal.",
  },
  {
    titulo: "Assunto batido, olhar novo",
    texto:
      "Não descarte um tema por ser comum. Uma talk sobre useEffect com um exemplo que ninguém mostrou é melhor que uma sobre tecnologia obscura sem aplicação.",
  },
  {
    titulo: "Primeira vez conta ponto",
    texto:
      "A gente reserva espaço para quem nunca subiu num palco. Se for seu caso, marque no formulário — não é desvantagem.",
  },
  {
    titulo: "Palestra não é anúncio",
    texto:
      "Falar da ferramenta que você usa no trabalho é ótimo. Transformar os 40 minutos em demonstração de produto, não.",
  },
];
