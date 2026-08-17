import { z } from "zod";

/*
  Um schema por formulário, importado pelo componente cliente e pelo Route
  Handler. A validação é literalmente a mesma nos dois lados — o servidor
  nunca confia no que o navegador mandou, mas também não reimplementa a
  regra.
*/

/*
  `armadilha` é o honeypot: fica fora da tela, então só um robô preenche.
  Aceita qualquer string de propósito. Se o schema
  recusasse o campo preenchido, a resposta 400 apontaria o nome dele e
  ensinaria o robô a deixá-lo em branco. Quem decide é o handler, que responde
  200 silencioso e não envia nada.
*/
const armadilha = z.string();

/*
  `iniciadoEm` NÃO entra nos schemas do formulário: o valor é carimbado no
  momento do envio, não existe como campo, e exigi-lo no cliente faria a
  validação falhar sem nenhum erro visível na tela — o formulário
  simplesmente não enviaria. O servidor valida com `noServidor()` abaixo.
*/
export function noServidor<T extends z.ZodRawShape>(esquema: z.ZodObject<T>) {
  return esquema.extend({
    /*
      Opcional: se por qualquer motivo o cliente não carimbar o horário, o
      envio segue sem a checagem de tempo em vez de ser recusado por um campo
      que a pessoa não tem como corrigir na tela.
    */
    iniciadoEm: z.number().int().positive().optional(),
  });
}

const nome = z
  .string()
  .trim()
  .min(2, "Informe seu nome completo.")
  .max(120, "Use no máximo 120 caracteres.");

const email = z.email("Confira o e-mail: parece incompleto.");

const whatsapp = z
  .string()
  .trim()
  .max(40, "Use no máximo 40 caracteres.")
  .optional()
  .or(z.literal(""));

export const TRILHAS = [
  "Front-end",
  "Back-end e Node",
  "Full-stack",
  "IA e dados",
  "Infra e DevOps",
  "Carreira e comunidade",
  "Outro",
] as const;

export const FORMATOS = [
  "Talk (40 min)",
  "Lightning talk (10 min)",
  "Workshop (2h)",
] as const;

export const NIVEIS = ["Introdutório", "Intermediário", "Avançado"] as const;

export const esquemaCfp = z.object({
  nome,
  email,
  whatsapp,
  redes: z
    .string()
    .trim()
    .max(200, "Use no máximo 200 caracteres.")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .trim()
    .min(20, "Escreva pelo menos 20 caracteres — quem é você, em resumo.")
    .max(600, "Use no máximo 600 caracteres."),
  titulo: z
    .string()
    .trim()
    .min(5, "O título precisa de pelo menos 5 caracteres.")
    .max(140, "Use no máximo 140 caracteres."),
  resumo: z
    .string()
    .trim()
    .min(100, "Conte um pouco mais: pelo menos 100 caracteres.")
    .max(2500, "Use no máximo 2500 caracteres."),
  trilha: z.enum(TRILHAS, "Escolha uma trilha."),
  formato: z.enum(FORMATOS, "Escolha um formato."),
  nivel: z.enum(NIVEIS, "Escolha o nível do público."),
  jaPalestrou: z.boolean(),
  observacoes: z
    .string()
    .trim()
    .max(1000, "Use no máximo 1000 caracteres.")
    .optional()
    .or(z.literal("")),
  armadilha,
});

export const DISPONIBILIDADES = [
  "Só no dia do encontro",
  "Algumas horas por mês",
  "Algumas horas por semana",
  "O quanto precisar",
] as const;

export const esquemaVoluntario = z.object({
  nome,
  email,
  whatsapp,
  funcoes: z
    .array(z.string())
    .min(1, "Escolha pelo menos uma função."),
  disponibilidade: z.enum(DISPONIBILIDADES, "Escolha sua disponibilidade."),
  experiencia: z
    .string()
    .trim()
    .max(1500, "Use no máximo 1500 caracteres.")
    .optional()
    .or(z.literal("")),
  armadilha,
});

export const ASSUNTOS = [
  "Quero participar",
  "Patrocínio",
  "Parceria",
  "Imprensa",
  "Outro",
] as const;

export const esquemaContato = z.object({
  nome,
  email,
  assunto: z.enum(ASSUNTOS, "Escolha um assunto."),
  mensagem: z
    .string()
    .trim()
    .min(20, "Escreva pelo menos 20 caracteres.")
    .max(2500, "Use no máximo 2500 caracteres."),
  armadilha,
});

export type DadosCfp = z.infer<typeof esquemaCfp>;
export type DadosVoluntario = z.infer<typeof esquemaVoluntario>;
export type DadosContato = z.infer<typeof esquemaContato>;
