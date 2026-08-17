"use client";

import * as React from "react";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { ZodType } from "zod";

import { toast } from "@/components/ui/toast";

/*
  Estado compartilhado dos formulários do site: validação com o mesmo schema
  do servidor, envio, retorno em toast e a tela de confirmação.

  O relógio é lido no primeiro foco dentro do formulário, não na montagem.
  Isso mede o que interessa — quanto tempo a pessoa levou preenchendo — em vez
  de quanto tempo a aba ficou aberta, e mantém a leitura do relógio dentro de
  um evento, onde ela é legítima. Quem só abriu a página e foi embora não
  carimba nada, e o servidor trata a ausência pulando a checagem.

  Devolve `propsDoFormulario` para o <form> em vez de um punhado de handlers
  soltos, para nenhuma tela esquecer de ligar o carimbo.
*/
export function useFormularioDoSite<T extends FieldValues>({
  esquema,
  endpoint,
  padroes,
  aoConcluir,
}: {
  esquema: ZodType<T>;
  endpoint: string;
  padroes: DefaultValues<T>;
  aoConcluir?: () => void;
}) {
  const [enviado, setEnviado] = React.useState(false);
  const iniciadoEm = React.useRef<number | undefined>(undefined);

  const marcarInicio = React.useCallback(() => {
    iniciadoEm.current ??= Date.now();
  }, []);

  const form = useForm<T>({
    resolver: standardSchemaResolver(esquema),
    defaultValues: padroes,
    mode: "onBlur",
  });

  /*
    O carimbo é lido aqui, no evento de submit, e entra no callback como valor
    comum. Ler o ref dentro do callback entregue ao `handleSubmit` funcionaria
    igual, mas o React não tem como saber que aquele callback não roda durante
    a renderização.
  */
  const enviar = (evento: React.FormEvent<HTMLFormElement>) => {
    const carimbo = iniciadoEm.current;
    return form.handleSubmit(async (dados) => {
      try {
        const resposta = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...dados, iniciadoEm: carimbo }),
        });

        const corpo = (await resposta.json()) as {
          ok: boolean;
          motivo?: string;
        };

        if (!resposta.ok || !corpo.ok) {
          toast.add({
            title: "Não deu para enviar",
            description: corpo.motivo ?? "Tente de novo em alguns minutos.",
          });
          return;
        }

        setEnviado(true);
        aoConcluir?.();
      } catch {
        toast.add({
          title: "Não deu para enviar",
          description: "Verifique sua conexão e tente de novo.",
        });
      }
    })(evento);
  };

  return {
    form,
    enviado,
    enviando: form.formState.isSubmitting,
    propsDoFormulario: {
      onSubmit: enviar,
      onFocusCapture: marcarInicio,
      noValidate: true,
    },
  };
}
