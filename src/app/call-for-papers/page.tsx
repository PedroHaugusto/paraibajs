import type { Metadata } from "next";

import { FormularioCfp } from "@/components/formularios/formulario-cfp";
import { CapaDePagina } from "@/components/site/capa-de-pagina";
import { TituloSecao } from "@/components/site/titulo-secao";
import { Badge } from "@/components/ui/badge";
import { chamadaAberta, criterios, etapas } from "@/content/cfp";
import { FORMATOS } from "@/lib/esquemas";

export const metadata: Metadata = {
  title: "Call For Papers",
  description:
    "Proponha uma palestra, uma lightning talk ou um workshop no próximo encontro da ParaibaJS.",
};

export default function CallForPapers() {
  return (
    <>
      <CapaDePagina
        rotulo="Call For Papers"
        titulo={
          <>
            Sua vez de <span className="text-farol">falar</span>
          </>
        }
        apoio="Todo encontro é feito do que as pessoas daqui têm para contar. Se você resolveu um problema difícil ou quebrou a cara em produção, isso é palestra."
      />

      {/* --- critérios --------------------------------------------------- */}
      <section className="claro">
        <div className="envelope secao">
          <TituloSecao
            rotulo="O que a curadoria procura"
            titulo="Nada de currículo"
            apoio="Não olhamos cargo, empresa nem tempo de carreira. Olhamos se a proposta ensina alguma coisa a quem vai assistir."
          />

          <div className="apos-titulo grid gap-px border border-risco bg-risco md:grid-cols-2">
            {criterios.map((criterio) => (
              <article key={criterio.titulo} className="bg-cal p-8 md:p-10">
                <h3 className="display titulo-bloco">{criterio.titulo}</h3>
                <p className="mt-4 leading-relaxed text-mare">
                  {criterio.texto}
                </p>
              </article>
            ))}
          </div>

          <div className="apos-titulo border-t border-risco pt-10">
            <h3 className="rotulo text-mare">Formatos aceitos</h3>
            <ul className="mt-6 flex flex-wrap gap-3">
              {FORMATOS.map((formato) => (
                <li key={formato}>
                  <Badge variant="outline" className="px-4 py-2 text-sm">
                    {formato}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- etapas ------------------------------------------------------ */}
      <section className="bg-breu">
        <div className="envelope secao">
          <TituloSecao
            rotulo="Como funciona"
            titulo="Do envio ao palco"
            apoio="Quatro etapas, nessa ordem. A numeração aqui é literal — uma coisa acontece depois da outra."
          />

          <ol className="apos-titulo flex flex-col">
            {etapas.map((etapa, indice) => (
              <li
                key={etapa.titulo}
                className="grid gap-6 border-t border-risco py-10 md:grid-cols-[6rem_1fr_14rem] md:gap-10"
              >
                <span
                  className="display titulo-secao text-farol"
                  aria-hidden
                >
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display titulo-bloco">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-mare">
                    {etapa.texto}
                  </p>
                </div>
                <p className="rotulo self-start text-mare md:text-right">
                  {etapa.prazo ?? "Prazo a anunciar"}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- formulário --------------------------------------------------- */}
      <section className="border-t border-risco bg-breu">
        <div className="envelope secao">
          <TituloSecao
            rotulo={chamadaAberta ? "Chamada aberta" : "Chamada fechada"}
            titulo="Enviar proposta"
            apoio={
              chamadaAberta
                ? "Dá para enviar mais de uma proposta. Se tiver dúvida em qualquer campo, escreva do jeito que der — a gente pergunta o resto."
                : "A chamada está fechada no momento. Deixe seu contato pela página de contato para saber quando a próxima abrir."
            }
          />

          {chamadaAberta ? (
            <div className="apos-titulo max-w-3xl">
              <FormularioCfp />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
