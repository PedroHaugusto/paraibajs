import { receberFormulario } from "@/lib/receber-formulario";
import { esquemaVoluntario, noServidor } from "@/lib/esquemas";

export async function POST(requisicao: Request) {
  return receberFormulario({
    requisicao,
    esquema: noServidor(esquemaVoluntario),
    assunto: (dados) => `[Voluntário] ${dados.nome}`,
    responderPara: (dados) => dados.email,
    montarLinhas: (dados) => [
      ["Nome", dados.nome],
      ["E-mail", dados.email],
      ["WhatsApp", dados.whatsapp ?? ""],
      ["Funções de interesse", dados.funcoes.join(", ")],
      ["Disponibilidade", dados.disponibilidade],
      ["Experiência", dados.experiencia ?? ""],
    ],
  });
}
