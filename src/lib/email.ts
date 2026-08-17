import { Resend } from "resend";

import { comunidade } from "@/content/comunidade";

/*
  Envio dos formulários por e-mail.

  Sem RESEND_API_KEY o comportamento muda por ambiente: em desenvolvimento o
  conteúdo vai para o console e o envio é dado como bem-sucedido, para dar
  para trabalhar nas telas sem credencial; em produção o envio falha com uma
  mensagem clara, porque perder silenciosamente a proposta de palestra de
  alguém seria pior do que devolver erro.
*/

const chave = process.env.RESEND_API_KEY;
const remetente = process.env.EMAIL_REMETENTE ?? "ParaibaJS <onboarding@resend.dev>";
const destinatario = process.env.EMAIL_ORGANIZACAO ?? comunidade.emailContato;

export type Resultado = { ok: true } | { ok: false; motivo: string };

export async function enviarEmail({
  assunto,
  linhas,
  responderPara,
}: {
  assunto: string;
  linhas: Array<[string, string]>;
  responderPara?: string;
}): Promise<Resultado> {
  const texto = linhas
    .map(([rotulo, valor]) => `${rotulo}\n${valor || "—"}`)
    .join("\n\n");

  if (!chave) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        motivo:
          "O envio de e-mail ainda não foi configurado no servidor. Fale com a organização pelos canais diretos.",
      };
    }
    console.info(`\n[formulário: ${assunto}]\n${texto}\n`);
    return { ok: true };
  }

  try {
    const resend = new Resend(chave);
    const { error } = await resend.emails.send({
      from: remetente,
      to: destinatario,
      subject: assunto,
      replyTo: responderPara,
      text: texto,
    });

    if (error) {
      console.error("Falha no envio pela Resend:", error);
      return {
        ok: false,
        motivo: "Não foi possível enviar agora. Tente de novo em alguns minutos.",
      };
    }

    return { ok: true };
  } catch (erro) {
    console.error("Erro inesperado no envio:", erro);
    return {
      ok: false,
      motivo: "Não foi possível enviar agora. Tente de novo em alguns minutos.",
    };
  }
}
