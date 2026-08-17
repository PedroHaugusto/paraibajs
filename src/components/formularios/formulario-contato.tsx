"use client";

import { ArrowRightIcon } from "lucide-react";

import {
  Armadilha,
  CampoDeSelecao,
  ConfirmacaoDeEnvio,
  alturaDoCampo,
} from "@/components/formularios/campos";
import { useFormularioDoSite } from "@/components/formularios/usar-formulario";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ASSUNTOS, esquemaContato, type DadosContato } from "@/lib/esquemas";

export function FormularioContato() {
  const { form, enviado, enviando, propsDoFormulario } = useFormularioDoSite<DadosContato>({
    esquema: esquemaContato,
    endpoint: "/api/contato",
    padroes: {
      nome: "",
      email: "",
      assunto: undefined,
      mensagem: "",
      armadilha: "",
    } as never,
  });

  const { register, control, formState } = form;

  if (enviado) {
    return (
      <ConfirmacaoDeEnvio
        titulo="Mensagem enviada"
        texto="A organização responde no mesmo e-mail que você informou. Se for urgente, o WhatsApp é mais rápido."
      />
    );
  }

  return (
    <form {...propsDoFormulario} className="flex flex-col gap-8">
      <Armadilha control={control} nome="armadilha" />

      <FieldGroup>
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!formState.errors.nome || undefined}>
            <FieldLabel htmlFor="nome">Nome</FieldLabel>
            <Input
              id="nome"
              className={alturaDoCampo}
              autoComplete="name"
              aria-invalid={!!formState.errors.nome || undefined}
              {...register("nome")}
            />
            <FieldError errors={[formState.errors.nome]} />
          </Field>

          <Field data-invalid={!!formState.errors.email || undefined}>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              type="email"
              className={alturaDoCampo}
              autoComplete="email"
              aria-invalid={!!formState.errors.email || undefined}
              {...register("email")}
            />
            <FieldError errors={[formState.errors.email]} />
          </Field>
        </div>

        <div className="max-w-md">
          <CampoDeSelecao
            control={control}
            nome="assunto"
            rotulo="Assunto"
            opcoes={ASSUNTOS}
          />
        </div>

        <Field data-invalid={!!formState.errors.mensagem || undefined}>
          <FieldLabel htmlFor="mensagem">Mensagem</FieldLabel>
          <Textarea
            id="mensagem"
            rows={7}
            className="px-4 py-3"
            aria-invalid={!!formState.errors.mensagem || undefined}
            {...register("mensagem")}
          />
          <FieldError errors={[formState.errors.mensagem]} />
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-4 border-t border-risco pt-8 sm:flex-row sm:items-center">
        <Button type="submit" variant="farol" size="xl" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar mensagem"}
          {!enviando && <ArrowRightIcon data-icon="inline-end" />}
        </Button>
      </div>
    </form>
  );
}
