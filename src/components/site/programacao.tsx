import type { ItemDaProgramacao } from "@/content/eventos";

/*
  Grade do evento. Palestras e momentos operacionais dividem a mesma lista,
  distinguidos pelo peso e não por cor de fundo: quem tem `palestrante` ganha
  nome em display e título grande; credenciamento, abertura e encerramento
  ficam numa linha discreta.

  O horário usa `acento-texto`, que troca sozinho conforme o fundo da seção —
  amarelo no escuro, vermelho escurecido no claro. Fixar `sol` ou `farol` aqui
  quebraria o contraste em um dos dois.
*/
export function Programacao({ itens }: { itens: ItemDaProgramacao[] }) {
  return (
    <ol className="border-t border-risco">
      {itens.map((item) => {
        const ehPalestra = Boolean(item.palestrante);

        return (
          <li
            key={item.horario}
            className="grid gap-x-8 gap-y-3 border-b border-risco py-6 md:grid-cols-[7rem_1fr] md:py-8"
          >
            <span
              className={
                ehPalestra
                  ? "rotulo pt-1 text-acento-texto"
                  : "rotulo pt-1 text-mare"
              }
            >
              <time>{item.horario}</time>
            </span>

            {ehPalestra ? (
              <div className="flex flex-col gap-2">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="display titulo-bloco">
                    {item.palestrante}
                  </span>
                  {item.cargo ? (
                    <span className="font-mono text-xs text-mare">
                      {item.cargo}
                    </span>
                  ) : null}
                </p>
                <p className="max-w-3xl text-lg leading-snug font-medium md:text-xl">
                  {item.titulo}
                </p>
              </div>
            ) : (
              <p className="text-base text-mare">{item.titulo}</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
