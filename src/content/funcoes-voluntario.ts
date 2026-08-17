/*
  Funções de voluntariado abertas.

  TODO(dono): revise principalmente o campo `custo` — a estimativa de tempo
  precisa ser honesta, senão o voluntário desiste no meio.
*/

export type Funcao = {
  nome: string;
  texto: string;
  custo: string;
};

export const funcoes: Funcao[] = [
  {
    nome: "Check-In",
    texto:
      "Receber quem chega, conferir a lista de inscritos, entregar crachá e apontar onde fica o banheiro. É a primeira cara da comunidade para quem nunca veio.",
    custo: "As duas primeiras horas do encontro",
  },
  {
    nome: "Registro",
    texto:
      "Fotografar e gravar trechos das palestras. Não precisa de equipamento profissional — celular bom já resolve.",
    custo: "Durante o encontro",
  },
  {
    nome: "Conteúdo",
    texto:
      "Escrever os posts de divulgação, o resumo do que rolou e manter este site em dia.",
    custo: "Duas a três horas por mês",
  },
  {
    nome: "Parceria",
    texto:
      "Conversar com empresas sobre espaço, comida e patrocínio, e manter a ponte com as comunidades parceiras. Bom para quem gosta de falar com gente.",
    custo: "Algumas conversas por mês",
  },
];
