import { NextResponse } from "next/server";
import type { ZodType } from "zod";

import { enviarEmail } from "@/lib/email";
import { dentroDoLimite, identificar } from "@/lib/limite";

/*
  O caminho comum dos três formulários: limite por IP, honeypot, tempo mínimo
  de preenchimento, validação com o mesmo schema do cliente e envio. Cada
  Route Handler só descreve o assunto do e-mail e como transformar os dados
  em linhas legíveis.
*/

const TEMPO_MINIMO_EM_MS = 3000;
/* Acima disso o relógio do cliente está claramente errado; nesse caso o
   tempo de preenchimento é ignorado em vez de barrar alguém legítimo. */
const DIFERENCA_PLAUSIVEL_EM_MS = 24 * 60 * 60 * 1000;

type Campos = { armadilha: string; iniciadoEm?: number };

export async function receberFormulario<T extends Campos>({
  requisicao,
  esquema,
  assunto,
  montarLinhas,
  responderPara,
}: {
  requisicao: Request;
  esquema: ZodType<T>;
  assunto: (dados: T) => string;
  montarLinhas: (dados: T) => Array<[string, string]>;
  responderPara: (dados: T) => string;
}) {
  if (!dentroDoLimite(identificar(requisicao))) {
    return NextResponse.json(
      {
        ok: false,
        motivo:
          "Você já enviou vários formulários na última hora. Espere um pouco e tente de novo.",
      },
      { status: 429 },
    );
  }

  let corpo: unknown;
  try {
    corpo = await requisicao.json();
  } catch {
    return NextResponse.json(
      { ok: false, motivo: "Não foi possível ler o formulário." },
      { status: 400 },
    );
  }

  const analise = esquema.safeParse(corpo);
  if (!analise.success) {
    return NextResponse.json(
      {
        ok: false,
        motivo: "Confira os campos destacados.",
        campos: analise.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const dados = analise.data;

  /*
    Honeypot e tempo mínimo respondem 200 de propósito: para o robô o envio
    parece ter dado certo e ele não fica tentando variações.
  */
  if (dados.armadilha) return NextResponse.json({ ok: true });

  if (dados.iniciadoEm !== undefined) {
    const decorrido = Date.now() - dados.iniciadoEm;
    if (decorrido >= 0 && decorrido < TEMPO_MINIMO_EM_MS) {
      return NextResponse.json({ ok: true });
    }
    if (Math.abs(decorrido) > DIFERENCA_PLAUSIVEL_EM_MS) {
      console.warn("Relógio do cliente fora de sincronia; tempo ignorado.");
    }
  }

  const resultado = await enviarEmail({
    assunto: assunto(dados),
    linhas: montarLinhas(dados),
    responderPara: responderPara(dados),
  });

  if (!resultado.ok) {
    return NextResponse.json(
      { ok: false, motivo: resultado.motivo },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
