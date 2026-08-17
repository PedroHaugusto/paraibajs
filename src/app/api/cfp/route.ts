import { receberFormulario } from "@/lib/receber-formulario";
import { esquemaCfp, noServidor } from "@/lib/esquemas";

export async function POST(requisicao: Request) {
  return receberFormulario({
    requisicao,
    esquema: noServidor(esquemaCfp),
    assunto: (dados) => `[CFP] ${dados.titulo} — ${dados.nome}`,
    responderPara: (dados) => dados.email,
    montarLinhas: (dados) => [
      ["Palestrante", dados.nome],
      ["E-mail", dados.email],
      ["WhatsApp", dados.whatsapp ?? ""],
      ["Redes", dados.redes ?? ""],
      ["Bio", dados.bio],
      ["Título", dados.titulo],
      ["Resumo", dados.resumo],
      ["Trilha", dados.trilha],
      ["Formato", dados.formato],
      ["Nível", dados.nivel],
      ["Já palestrou antes", dados.jaPalestrou ? "Sim" : "Não"],
      ["Observações", dados.observacoes ?? ""],
    ],
  });
}
