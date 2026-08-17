import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { FormularioContato } from "@/components/formularios/formulario-contato";
import { CapaDePagina } from "@/components/site/capa-de-pagina";
import { TituloSecao } from "@/components/site/titulo-secao";
import { canais } from "@/content/comunidade";

export const metadata: Metadata = {
  title: "Comunidade",
  description:
    "Todos os canais da ParaibaJS num lugar só: WhatsApp, Instagram, GitHub, LinkedIn e e-mail da organização.",
};

export default function Comunidade() {
  return (
    <>
      <CapaDePagina
        rotulo="Comunidade"
        titulo={
          <>
            Onde a gente <span className="text-farol">está</span>
          </>
        }
        apoio="A ParaibaJS não vive num lugar só. O grupo do WhatsApp é o dia a dia, o Instagram é o anúncio, o GitHub é o código. Escolha por onde entrar."
      />

      {/* --- canais ------------------------------------------------------- */}
      <section className="claro">
        <div className="envelope secao">
          <TituloSecao
            rotulo="Canais diretos"
            titulo="Entrar agora"
            apoio="O WhatsApp é o mais rápido e não exige apresentação: entre e leia. O e-mail é o certo para assunto que precisa ficar registrado."
          />

          <ul className="apos-titulo border-t border-risco">
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
                  <span className="display titulo-bloco">
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
        <div className="envelope secao grid gap-12 md:grid-cols-2">
          <TituloSecao
            rotulo="Empresas"
            titulo="Apoiar a comunidade"
            apoio="Entrar na comunidade não custa nada, e continua assim. Os encontros, esses têm custo — espaço, equipamento, coffee-break — e o ingresso cobre só uma parte."
          />
          <div className="flex flex-col justify-end gap-6 border-t border-risco pt-8 md:border-t-0 md:pt-0">
            <p className="leading-relaxed text-mare">
              O resto sai de empresas daqui que resolvem bancar, e é isso que
              segura o ingresso barato. Apoiar também não é só dinheiro: ceder
              uma sala, pagar o café ou liberar alguém do time para palestrar já
              resolve boa parte.
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
        <div className="envelope secao">
          <TituloSecao
            rotulo="Formulário"
            titulo="Falar com a organização"
            apoio="Para quem prefere escrever daqui. Chega no e-mail da organização e a resposta volta para o endereço que você informar."
          />

          <div className="apos-titulo max-w-3xl">
            <FormularioContato />
          </div>
        </div>
      </section>
    </>
  );
}
