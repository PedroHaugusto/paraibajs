/*
  Funções de voluntariado.

  TODO(dono): ajuste a lista e principalmente o campo `custo` — a estimativa
  de tempo precisa ser honesta, senão o voluntário desiste no meio.
*/

export type Funcao = {
  nome: string;
  texto: string;
  custo: string;
};

export const funcoes: Funcao[] = [
  {
    nome: "Recepção",
    texto:
      "Receber quem chega, conferir a lista, entregar crachá e apontar onde fica o banheiro. É a primeira cara da comunidade.",
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
    nome: "Curadoria",
    texto:
      "Ler as propostas do Call For Papers, dar retorno a quem enviou e ajudar palestrante de primeira viagem a ensaiar.",
    custo: "Concentrado nas semanas antes do encontro",
  },
  {
    nome: "Infraestrutura",
    texto:
      "Cuidar de projetor, som, cabo, wi-fi e do plano B quando algo disso falhar. Sempre falha.",
    custo: "Uma hora antes e durante o encontro",
  },
  {
    nome: "Parcerias",
    texto:
      "Conversar com empresas sobre espaço, comida e patrocínio. Bom para quem gosta de falar com gente.",
    custo: "Algumas conversas por mês",
  },
];
