import { ArrowUpRightIcon, ClockIcon, MapPinIcon, MicIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Evento } from "@/content/eventos";
import { emNumeros, porExtenso } from "@/lib/datas";
import { cn } from "@/lib/utils";

/*
  Cartão de evento. `passado` desliga o botão de ingresso e esmaece o bloco —
  o evento continua na página como histórico, mas não compete com o que ainda
  vai acontecer.
*/
export function CartaoDeEvento({
  evento,
  passado = false,
}: {
  evento: Evento;
  passado?: boolean;
}) {
  const [ano, mes, dia] = evento.data.split("-");
  const palestras =
    evento.programacao?.filter((item) => item.palestrante).length ?? 0;

  return (
    <article
      className={cn(
        "grid gap-8 border-b border-risco py-10 md:grid-cols-[9rem_1fr_auto] md:gap-12",
        passado && "opacity-60",
      )}
    >
      {/* bloco da data */}
      <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
        <span className="display titulo-secao leading-none text-farol">
          {dia}
        </span>
        <span className="rotulo text-mare">
          <time dateTime={evento.data}>
            {new Intl.DateTimeFormat("pt-BR", {
              month: "short",
              timeZone: "UTC",
            })
              .format(new Date(Date.UTC(+ano, +mes - 1, +dia)))
              .replace(".", "")}{" "}
            {ano}
          </time>
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {evento.edicao ? (
          <p className="rotulo text-sol">{evento.edicao}</p>
        ) : null}
        <h3 className="display titulo-bloco">
          {evento.titulo}
        </h3>
        <p className="max-w-xl leading-relaxed text-mare">
          {evento.descricao}
        </p>

        <dl className="mt-2 flex flex-col gap-2 text-sm text-mare sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Data e horário</dt>
            <ClockIcon className="size-4 shrink-0" aria-hidden />
            <dd>
              {porExtenso(evento.data)}, {evento.horario}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Local</dt>
            <MapPinIcon className="size-4 shrink-0" aria-hidden />
            <dd>
              {evento.local} — {evento.endereco}
            </dd>
          </div>

          {palestras > 0 ? (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Palestras</dt>
              <MicIcon className="size-4 shrink-0" aria-hidden />
              <dd>
                {palestras} {palestras === 1 ? "palestra" : "palestras"}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end">
        {evento.preco === null ? (
          <span className="rotulo border border-risco px-3 py-2 text-sol">
            Entrada gratuita
          </span>
        ) : (
          <span className="flex items-baseline gap-2">
            <span className="rotulo text-mare">Ingresso</span>
            <span className="display titulo-bloco">{evento.preco}</span>
          </span>
        )}

        {passado ? (
          <span className="rotulo text-mare">
            Realizado em {emNumeros(evento.data)}
          </span>
        ) : evento.urlIngressos ? (
          <Button
            variant="farol"
            size="xl"
            nativeButton={false}
            render={
              <a
                href={evento.urlIngressos}
                target="_blank"
                rel="noreferrer noopener"
              />
            }
          >
            Garantir ingresso
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        ) : (
          <span className="rotulo text-mare">Inscrições em breve</span>
        )}
      </div>
    </article>
  );
}
