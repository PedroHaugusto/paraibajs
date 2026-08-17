import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { CapaDePagina } from "@/components/site/capa-de-pagina";
import { CartaoDeEvento } from "@/components/site/cartao-de-evento";
import { Programacao } from "@/components/site/programacao";
import { TituloSecao } from "@/components/site/titulo-secao";
import { Button } from "@/components/ui/button";
import { canais } from "@/content/comunidade";
import { eventosPassados, proximosEventos } from "@/content/eventos";
import { emNumeros } from "@/lib/datas";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Os próximos encontros da ParaibaJS, com data, local e link de inscrição.",
};

export default function Eventos() {
  const proximos = proximosEventos();
  const passados = eventosPassados();
  const grupo = canais[0];

  return (
    <>
      <CapaDePagina
        rotulo="Eventos"
        titulo={
          <>
            Quando a gente <span className="text-farol">se vê</span>
          </>
        }
        apoio="Encontros presenciais na Grande João Pessoa, com palestra e conversa depois. Aqui ficam as datas confirmadas e o link de inscrição."
      />

      <section className="bg-breu">
        <div className="envelope secao">
          {proximos.length > 0 ? (
            <>
              <TituloSecao
                rotulo={
                  proximos.length === 1
                    ? "1 encontro marcado"
                    : `${proximos.length} encontros marcados`
                }
                titulo="Próximos"
              />
              <div className="apos-titulo border-t border-risco">
                {proximos.map((evento) => (
                  <CartaoDeEvento key={evento.id} evento={evento} />
                ))}
              </div>
            </>
          ) : (
            /*
              Estado vazio com saída: em vez de só informar que não há data,
              leva a pessoa para onde a data será anunciada primeiro.
            */
            <div className="flex flex-col items-start gap-8">
              <TituloSecao
                rotulo="Agenda"
                titulo="Ainda sem data marcada"
                apoio="O próximo encontro ainda não foi anunciado. Quem está no grupo do WhatsApp fica sabendo antes de virar post — e é lá que a gente decide tema e data."
              />
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="farol"
                  size="xl"
                  nativeButton={false}
                  render={
                    <a
                      href={grupo.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    />
                  }
                >
                  Entrar no grupo
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
                <Button
                  variant="contorno"
                  size="xl"
                  nativeButton={false}
                  render={<a href="/call-for-papers" />}
                >
                  Propor uma palestra
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- programação do próximo evento -------------------------------- */}
      {proximos[0]?.programacao ? (
        <section className="claro">
          <div className="envelope secao">
            <TituloSecao
              rotulo={`Programação · ${emNumeros(proximos[0].data)}`}
              titulo="A tarde inteira"
              apoio={`${
                proximos[0].programacao.filter((i) => i.palestrante).length
              } palestras, uma sala só, sem trilha paralela — dá para assistir a tudo sem escolher.`}
            />
            <div className="apos-titulo">
              <Programacao itens={proximos[0].programacao} />
            </div>
          </div>
        </section>
      ) : null}

      {passados.length > 0 ? (
        <section className="claro">
          <div className="envelope secao">
            <TituloSecao
              rotulo="Histórico"
              titulo="Já aconteceram"
              apoio="O que a comunidade já fez até aqui."
            />
            <div className="apos-titulo border-t border-risco">
              {passados.map((evento) => (
                <CartaoDeEvento key={evento.id} evento={evento} passado />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
