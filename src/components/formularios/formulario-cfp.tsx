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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FORMATOS,
  NIVEIS,
  TRILHAS,
  esquemaCfp,
  type DadosCfp,
} from "@/lib/esquemas";

export function FormularioCfp() {
  const { form, enviado, enviando, propsDoFormulario } = useFormularioDoSite<DadosCfp>({
    esquema: esquemaCfp,
    endpoint: "/api/cfp",
    padroes: {
      nome: "",
      email: "",
      whatsapp: "",
      redes: "",
      bio: "",
      titulo: "",
      resumo: "",
      trilha: undefined,
      formato: undefined,
      nivel: undefined,
      jaPalestrou: false,
      observacoes: "",
      armadilha: "",
    } as never,
  });

  const { register, control, formState } = form;

  if (enviado) {
    return (
      <ConfirmacaoDeEnvio
        titulo="Proposta recebida"
        texto="A curadoria lê tudo e responde por e-mail, aprovada ou não. Se precisarmos de mais contexto, escrevemos antes de decidir."
      />
    );
  }

  return (
    <form {...propsDoFormulario} className="flex flex-col gap-12">
      <Armadilha control={control} nome="armadilha" />

      <FieldSet>
        <FieldLegend className="rotulo text-mare">Sobre você</FieldLegend>
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

            <Field>
              <FieldLabel htmlFor="whatsapp">WhatsApp</FieldLabel>
              <Input
                id="whatsapp"
                className={alturaDoCampo}
                autoComplete="tel"
                {...register("whatsapp")}
              />
              <FieldDescription>Opcional. Agiliza o combinado.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="redes">Redes</FieldLabel>
              <Input
                id="redes"
                className={alturaDoCampo}
                placeholder="@seuperfil, github.com/voce"
                {...register("redes")}
              />
              <FieldDescription>
                Opcional. Usamos na divulgação da palestra.
              </FieldDescription>
            </Field>
          </div>

          <Field data-invalid={!!formState.errors.bio || undefined}>
            <FieldLabel htmlFor="bio">Mini bio</FieldLabel>
            <Textarea
              id="bio"
              rows={3}
              className="px-4 py-3"
              aria-invalid={!!formState.errors.bio || undefined}
              {...register("bio")}
            />
            <FieldDescription>
              Duas ou três linhas, como você quer ser apresentado no palco.
            </FieldDescription>
            <FieldError errors={[formState.errors.bio]} />
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend className="rotulo text-mare">Sobre a palestra</FieldLegend>
        <FieldGroup>
          <Field data-invalid={!!formState.errors.titulo || undefined}>
            <FieldLabel htmlFor="titulo">Título</FieldLabel>
            <Input
              id="titulo"
              className={alturaDoCampo}
              aria-invalid={!!formState.errors.titulo || undefined}
              {...register("titulo")}
            />
            <FieldDescription>
              Pode mudar depois. Escreva o que faria você querer assistir.
            </FieldDescription>
            <FieldError errors={[formState.errors.titulo]} />
          </Field>

          <Field data-invalid={!!formState.errors.resumo || undefined}>
            <FieldLabel htmlFor="resumo">Resumo</FieldLabel>
            <Textarea
              id="resumo"
              rows={7}
              className="px-4 py-3"
              aria-invalid={!!formState.errors.resumo || undefined}
              {...register("resumo")}
            />
            <FieldDescription>
              O problema, o que você vai mostrar e o que a pessoa leva para
              casa.
            </FieldDescription>
            <FieldError errors={[formState.errors.resumo]} />
          </Field>

          <div className="grid gap-5 md:grid-cols-3">
            <CampoDeSelecao
              control={control}
              nome="trilha"
              rotulo="Trilha"
              opcoes={TRILHAS}
            />
            <CampoDeSelecao
              control={control}
              nome="formato"
              rotulo="Formato"
              opcoes={FORMATOS}
            />
            <CampoDeSelecao
              control={control}
              nome="nivel"
              rotulo="Nível do público"
              opcoes={NIVEIS}
            />
          </div>

          <Controller
            control={control}
            name="jaPalestrou"
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="jaPalestrou"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="jaPalestrou" className="font-normal">
                  Já palestrei em algum evento antes
                </FieldLabel>
              </Field>
            )}
          />

          <Field>
            <FieldLabel htmlFor="observacoes">
              Mais alguma coisa que a gente precise saber?
            </FieldLabel>
            <Textarea
              id="observacoes"
              rows={3}
              className="px-4 py-3"
              {...register("observacoes")}
            />
            <FieldDescription>
              Opcional. Restrição de data, necessidade de acessibilidade,
              equipamento específico.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex flex-col gap-4 border-t border-risco pt-8 sm:flex-row sm:items-center">
        <Button type="submit" variant="farol" size="xl" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar proposta"}
          {!enviando && <ArrowRightIcon data-icon="inline-end" />}
        </Button>
        <p className="text-sm text-mare">
          A resposta sai por e-mail para todo mundo que enviar.
        </p>
      </div>
    </form>
  );
}
