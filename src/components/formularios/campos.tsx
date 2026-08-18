"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { CheckIcon } from "lucide-react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* Campos altos o bastante para o peso tipográfico do resto do site. */
export const alturaDoCampo = "h-12 px-4";

/*
  Honeypot. Fica fora da tela em vez de `display: none` porque alguns robôs
  ignoram campos ocultos por display. `tabIndex={-1}` e `aria-hidden` mantêm
  o campo fora do caminho de quem usa teclado ou leitor de tela.
*/
export function Armadilha<T extends FieldValues>({
  control,
  nome,
}: {
  control: Control<T>;
  nome: Path<T>;
}) {
  return (
    <Controller
      control={control}
      name={nome}
      render={({ field }) => (
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="site-secundario">Não preencha este campo</label>
          <input
            {...field}
            id="site-secundario"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={field.value ?? ""}
          />
        </div>
      )}
    />
  );
}

export function CampoDeSelecao<T extends FieldValues>({
  control,
  nome,
  rotulo,
  descricao,
  opcoes,
  espacoReservado = "Escolha uma opção",
}: {
  control: Control<T>;
  nome: Path<T>;
  rotulo: string;
  descricao?: string;
  opcoes: readonly string[];
  espacoReservado?: string;
}) {
  return (
    <Controller
      control={control}
      name={nome}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel htmlFor={nome}>{rotulo}</FieldLabel>
          {/* Sem `items`: o valor guardado já é o texto exibido. */}
          <Select value={field.value ?? ""} onValueChange={field.onChange}>
            <SelectTrigger
              id={nome}
              className={cn("w-full", alturaDoCampo)}
              aria-invalid={fieldState.invalid || undefined}
              onBlur={field.onBlur}
            >
              <SelectValue placeholder={espacoReservado} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {opcoes.map((opcao) => (
                  <SelectItem key={opcao} value={opcao}>
                    {opcao}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {descricao ? <FieldDescription>{descricao}</FieldDescription> : null}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}

/*
  Confirmação de envio. Substitui o formulário inteiro em vez de mostrar um
  toast e sumir: quem enviou precisa saber o que acontece depois.
*/
export function ConfirmacaoDeEnvio({
  titulo,
  texto,
  children,
}: {
  titulo: string;
  texto: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-start gap-6 border border-risco p-8 md:p-12"
    >
      <span className="flex size-12 items-center justify-center bg-farol-solido text-white">
        <CheckIcon className="size-6" />
      </span>
      <h3 className="display titulo-bloco">{titulo}</h3>
      <p className="max-w-md leading-relaxed text-mare">{texto}</p>
      {children}
    </div>
  );
}
