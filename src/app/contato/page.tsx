import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { FormularioContato } from "@/components/formularios/formulario-contato";
import { CapaDePagina } from "@/components/site/capa-de-pagina";
import { TituloSecao } from "@/components/site/titulo-secao";
import { canais } from "@/content/comunidade";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Canais diretos da organização da ParaibaJS, além de parceria e patrocínio.",
};

export default function Contato() {
  return (
    <>
      <CapaDePagina
        rotulo="Contato"
        titulo={
          <>
            Fale com a <span className="text-farol">gente</span>
          </>
        }
        apoio="Escolha o canal que preferir. Todos chegam nas mesmas pessoas — a diferença é só a velocidade da resposta."
      />

      {/* --- canais ------------------------------------------------------- */}
      <section className="claro">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Canais diretos"
            titulo="Onde a gente está"
            apoio="O WhatsApp é o mais rápido. O e-mail é o certo para assunto que precisa ficar registrado."
          />

          <ul className="mt-16 border-t border-risco">
            {canais.map((canal) => (
              <li key={canal.nome}>
                <a
                  href={canal.url}
                  target={canal.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    canal.url.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                  className="group grid gap-2 border-b border-risco py-8 transition-colors hover:bg-foreground/4 md:grid-cols-[minmax(0,12rem)_1fr_auto] md:items-baseline md:gap-10 md:px-4"
                >
                  <span className="display text-xl md:text-2xl">
                    {canal.nome}
                  </span>
                  <span className="leading-relaxed text-mare">
                    {canal.descricao}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-sm">
                    {canal.identificador}
                    <ArrowUpRightIcon
                      className="size-4 shrink-0 text-farol transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- patrocínio ---------------------------------------------------- */}
      <section className="bg-breu">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Empresas"
            titulo="Apoiar a comunidade"
            apoio="A ParaibaJS é gratuita e continua assim. O que os encontros custam — espaço, comida, equipamento — sai de empresas daqui que resolvem bancar."
          />
          <div className="flex flex-col justify-end gap-6 border-t border-risco pt-8 md:border-t-0 md:pt-0">
            <p className="leading-relaxed text-mare">
              Apoiar não é só dinheiro. Ceder uma sala para trinta pessoas numa
              noite de semana, pagar o café ou liberar alguém do time para
              palestrar já resolve boa parte.
            </p>
            <p className="leading-relaxed text-mare">
              Escreva pelo formulário abaixo escolhendo{" "}
              <strong className="font-semibold text-cal">Patrocínio</strong> e a
              gente manda como funciona.
            </p>
          </div>
        </div>
      </section>

      {/* --- formulário ----------------------------------------------------- */}
      <section className="border-t border-risco bg-breu">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Formulário"
            titulo="Escrever agora"
            apoio="Chega no e-mail da organização e a resposta volta para o endereço que você informar."
          />

          <div className="mt-16 max-w-3xl">
            <FormularioContato />
          </div>
        </div>
      </section>
    </>
  );
}
