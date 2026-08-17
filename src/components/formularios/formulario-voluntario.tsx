"use client";

import { Controller } from "react-hook-form";
import { ArrowRightIcon } from "lucide-react";

import {
  Armadilha,
  CampoDeSelecao,
  ConfirmacaoDeEnvio,
  alturaDoCampo,
} from "@/components/formularios/campos";
import { useFormularioDoSite } from "@/components/formularios/usar-formulario";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { funcoes } from "@/content/funcoes-voluntario";
import {
  DISPONIBILIDADES,
  esquemaVoluntario,
  type DadosVoluntario,
} from "@/lib/esquemas";

export function FormularioVoluntario() {
  const { form, enviado, enviando, propsDoFormulario } =
    useFormularioDoSite<DadosVoluntario>({
      esquema: esquemaVoluntario,
      endpoint: "/api/voluntarios",
      padroes: {
        nome: "",
        email: "",
        whatsapp: "",
        funcoes: [],
        disponibilidade: undefined,
        experiencia: "",
        armadilha: "",
      } as never,
    });

  const { register, control, formState } = form;

  if (enviado) {
    return (
      <ConfirmacaoDeEnvio
        titulo="Inscrição recebida"
        texto="A organização entra em contato para combinar como você entra. Não precisa esperar: o grupo do WhatsApp já está aberto para você."
      />
    );
  }

  return (
    <form {...propsDoFormulario} className="flex flex-col gap-12">
      <Armadilha control={control} nome="armadilha" />

      <FieldSet>
        <FieldLegend className="rotulo text-mare">Seus dados</FieldLegend>
        <FieldGroup>
          <div className="grid gap-5 md:grid-cols-3">
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

            <Field>
              <FieldLabel htmlFor="whatsapp">WhatsApp</FieldLabel>
              <Input
                id="whatsapp"
                className={alturaDoCampo}
                autoComplete="tel"
                {...register("whatsapp")}
              />
              <FieldDescription>Opcional.</FieldDescription>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <Controller
        control={control}
        name="funcoes"
        render={({ field, fieldState }) => (
          <FieldSet data-invalid={fieldState.invalid || undefined}>
            <FieldLegend className="rotulo text-mare">
              Onde você quer ajudar
            </FieldLegend>
            <FieldDescription>
              Escolha quantas quiser. Ninguém fica preso à escolha de hoje.
            </FieldDescription>
            <FieldGroup className="mt-4 grid gap-px border border-risco bg-risco md:grid-cols-2">
              {funcoes.map((funcao) => {
                const marcada = field.value?.includes(funcao.nome);
                return (
                  <Field
                    key={funcao.nome}
                    orientation="horizontal"
                    className="bg-background p-5"
                  >
                    <Checkbox
                      id={`funcao-${funcao.nome}`}
                      checked={marcada}
                      onCheckedChange={(marcado) => {
                        const atual = field.value ?? [];
                        field.onChange(
                          marcado
                            ? [...atual, funcao.nome]
                            : atual.filter((item) => item !== funcao.nome),
                        );
                      }}
                    />
                    <FieldContent>
                      <FieldLabel
                        htmlFor={`funcao-${funcao.nome}`}
                        className="text-base font-semibold"
                      >
                        {funcao.nome}
                      </FieldLabel>
                      <FieldDescription>{funcao.custo}</FieldDescription>
                    </FieldContent>
                  </Field>
                );
              })}
            </FieldGroup>
            <FieldError errors={[fieldState.error]} />
          </FieldSet>
        )}
      />

      <FieldSet>
        <FieldLegend className="rotulo text-mare">
          Quanto tempo você tem
        </FieldLegend>
        <FieldGroup>
          <div className="max-w-md">
            <CampoDeSelecao
              control={control}
              nome="disponibilidade"
              rotulo="Disponibilidade"
              opcoes={DISPONIBILIDADES}
            />
          </div>

          <Field>
            <FieldLabel htmlFor="experiencia">
              Alguma experiência que ajude?
            </FieldLabel>
            <Textarea
              id="experiencia"
              rows={4}
              className="px-4 py-3"
              {...register("experiencia")}
            />
            <FieldDescription>
              Opcional, e não é pré-requisito. Já organizou evento, mexe com
              câmera, escreve bem — qualquer coisa serve.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex flex-col gap-4 border-t border-risco pt-8 sm:flex-row sm:items-center">
        <Button type="submit" variant="farol" size="xl" disabled={enviando}>
          {enviando ? "Enviando…" : "Quero ajudar"}
          {!enviando && <ArrowRightIcon data-icon="inline-end" />}
        </Button>
        <p className="text-sm text-mare">
          Sem compromisso de carga fixa. A gente combina o que dá.
        </p>
      </div>
    </form>
  );
}
