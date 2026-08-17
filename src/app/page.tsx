import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { FeixeDoFarol } from "@/components/site/feixe-do-farol";
import { Letreiro } from "@/components/site/letreiro";
import { TituloSecao } from "@/components/site/titulo-secao";
import { Button } from "@/components/ui/button";
import {
  canais,
  comunidade,
  ecossistema,
  proximoEncontro,
} from "@/content/comunidade";
import { nascerDoSol } from "@/lib/sol";

const pilares = [
  {
    titulo: "Gente daqui",
    texto:
      "Dá para trabalhar com tecnologia na Paraíba sem estar sozinho. Aqui você encontra quem já passou pelo problema que você está encarando hoje.",
  },
  {
    titulo: "Conhecimento que circula",
    texto:
      "Encontros com palestra, código ao vivo e conversa depois. Quem aprendeu alguma coisa nova volta para contar como foi.",
  },
  {
    titulo: "Porta aberta",
    texto:
      "Primeiro dia de JavaScript ou dez anos de produção, tanto faz. A única exigência é querer trocar o que sabe.",
  },
];

const portas = [
  {
    rotulo: "Palestre",
    titulo: "Call For Papers",
    texto:
      "Proponha uma talk, uma lightning ou um workshop no próximo encontro.",
    href: "/call-for-papers",
  },
  {
    rotulo: "Ajude a organizar",
    titulo: "Voluntários",
    texto: "As funções abertas, o que cada uma pede e quanto tempo consome.",
    href: "/voluntarios",
  },
  {
    rotulo: "Aprenda",
    titulo: "Links úteis",
    texto:
      "O que a comunidade indica para estudar, construir e se manter em dia.",
    href: "/links",
  },
  {
    rotulo: "Fale com a gente",
    titulo: "Contato",
    texto: "Canais diretos da organização, parceria e patrocínio.",
    href: "/contato",
  },
];

export default function Home() {
  const horaDoNascer = nascerDoSol();
  const grupo = canais[0];

  return (
    <>
      {/* --- hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-breu">
        <FeixeDoFarol className="top-[-35%] left-[38%] h-[150%] w-[95%]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1400px] flex-col justify-center px-5 py-24 md:px-8">
          <p className="rotulo text-sol">
            {horaDoNascer
              ? `O sol nasce às ${horaDoNascer} na Ponta do Seixas`
              : "Ponta do Seixas, o ponto mais oriental das Américas"}
          </p>

          <h1 className="display mt-8 max-w-[14ch] text-[clamp(2.75rem,12vw,9.5rem)]">
            Onde o <span className="text-farol">JS</span> nasce primeiro
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mare md:text-xl">
            {comunidade.descricao}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button
              variant="farol"
              size="xl"
              nativeButton={false}
              render={<Link href="/contato" />}
            >
              Entrar na comunidade
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="contorno"
              size="xl"
              nativeButton={false}
              render={<Link href="/call-for-papers" />}
            >
              Propor uma palestra
            </Button>
          </div>
        </div>
      </section>

      <Letreiro itens={ecossistema} className="bg-breu" />

      {/* --- o que é ---------------------------------------------------- */}
      <section className="claro">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Isso é a ParaibaJS"
            titulo={
              <>
                Uma comunidade,
                <br />
                não uma plateia
              </>
            }
          />

          <div className="mt-16 grid gap-px border border-risco bg-risco md:grid-cols-3">
            {pilares.map((pilar) => (
              <article key={pilar.titulo} className="bg-cal p-8 md:p-10">
                <h3 className="rotulo">{pilar.titulo}</h3>
                <p className="mt-6 leading-relaxed text-mare">{pilar.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- portas de entrada ------------------------------------------ */}
      <section className="bg-breu">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Por onde entrar"
            titulo="Escolha uma porta"
            apoio="Cada uma leva a um jeito diferente de participar. Nenhuma exige convite."
          />

          <div className="mt-16 grid gap-px border border-risco bg-risco md:grid-cols-2">
            {portas.map((porta) => (
              <Link
                key={porta.href}
                href={porta.href}
                className="group flex flex-col justify-between gap-10 bg-breu p-8 transition-colors hover:bg-card md:p-12"
              >
                <div>
                  <p className="rotulo text-sol">{porta.rotulo}</p>
                  <h3 className="display mt-6 text-[clamp(1.75rem,4vw,3rem)]">
                    {porta.titulo}
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-mare">
                    {porta.texto}
                  </p>
                </div>
                <ArrowRightIcon className="size-7 text-farol transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- próximo encontro ------------------------------------------- */}
      <section className="border-t border-risco bg-breu">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Próximo encontro"
            titulo={proximoEncontro ? proximoEncontro.tema : "Ainda sem data"}
            apoio={
              proximoEncontro
                ? `${proximoEncontro.local} — ${proximoEncontro.endereco}`
                : "O próximo encontro ainda não foi anunciado. Quem está no grupo do WhatsApp fica sabendo primeiro."
            }
          />

          <div className="flex flex-col justify-end gap-8">
            {proximoEncontro ? (
              <dl className="flex flex-col gap-5 border-t border-risco pt-8">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="rotulo text-mare">Data</dt>
                  <dd className="display text-2xl">{proximoEncontro.data}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="rotulo text-mare">Horário</dt>
                  <dd className="display text-2xl">
                    {proximoEncontro.horario}
                  </dd>
                </div>
              </dl>
            ) : null}

            <Button
              variant="contorno"
              size="xl"
              className="self-start"
              nativeButton={false}
              render={
                <a href={grupo.url} target="_blank" rel="noreferrer noopener" />
              }
            >
              Entrar no grupo
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
