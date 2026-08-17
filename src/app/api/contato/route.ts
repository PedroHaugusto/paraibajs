import { receberFormulario } from "@/lib/receber-formulario";
import { esquemaContato, noServidor } from "@/lib/esquemas";

export async function POST(requisicao: Request) {
  return receberFormulario({
    requisicao,
    esquema: noServidor(esquemaContato),
    assunto: (dados) => `[Contato: ${dados.assunto}] ${dados.nome}`,
    responderPara: (dados) => dados.email,
    montarLinhas: (dados) => [
      ["Nome", dados.nome],
      ["E-mail", dados.email],
      ["Assunto", dados.assunto],
      ["Mensagem", dados.mensagem],
    ],
  });
}
