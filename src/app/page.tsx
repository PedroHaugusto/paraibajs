import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { CartaoDeEvento } from "@/components/site/cartao-de-evento";
import { Letreiro } from "@/components/site/letreiro";
import { MalhaHexagonal } from "@/components/site/malha-hexagonal";
import { TituloSecao } from "@/components/site/titulo-secao";
import { Button } from "@/components/ui/button";
import { canais, comunidade, ecossistema } from "@/content/comunidade";
import { proximoEvento } from "@/content/eventos";
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
    rotulo: "Entre",
    titulo: "Comunidade",
    texto:
      "WhatsApp, Instagram, GitHub e o e-mail da organização. Nenhum exige convite.",
    href: "/comunidade",
  },
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
      "O que a comunidade indica para estudar, e as comunidades parceiras daqui.",
    href: "/links",
  },
];

export default function Home() {
  const horaDoNascer = nascerDoSol();
  const proximo = proximoEvento();
  const grupo = canais[0];

  return (
    <>
      {/* --- hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-breu">
        {/*
          A malha passa atrás do lettering de propósito — é assim que o padrão
          hexagonal aparece no material gráfico do evento. A opacidade contida
          é o que impede de virar ruído em cima do texto.
        */}
        <MalhaHexagonal className="top-1/2 -right-44 h-[95%] w-auto -translate-y-1/2 opacity-35 md:-right-32 md:h-[125%] md:opacity-60" />

        <div className="envelope secao relative flex min-h-[calc(100svh-var(--altura-do-topo))] flex-col justify-center">
          <p className="rotulo text-sol">
            {horaDoNascer
              ? `O sol nasce às ${horaDoNascer} na Ponta do Seixas`
              : "Ponta do Seixas, o ponto mais oriental das Américas"}
          </p>

          <h1 className="display titulo-hero mt-6 max-w-[16ch]">
            Onde o <span className="text-farol">JS</span> nasce primeiro
          </h1>

          <p className="mt-7 max-w-xl leading-relaxed text-mare md:text-lg">
            {comunidade.descricao}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              variant="farol"
              size="xl"
              nativeButton={false}
              render={<Link href="/comunidade" />}
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
        <div className="envelope secao">
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

          <div className="apos-titulo grid gap-px border border-risco bg-risco md:grid-cols-3">
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
        <div className="envelope secao">
          <TituloSecao
            rotulo="Por onde entrar"
            titulo="Escolha uma porta"
            apoio="Cada uma leva a um jeito diferente de participar. Nenhuma exige convite."
          />

          <div className="apos-titulo grid gap-px border border-risco bg-risco md:grid-cols-2">
            {portas.map((porta) => (
              <Link
                key={porta.href}
                href={porta.href}
                className="group flex flex-col justify-between gap-10 bg-breu p-8 transition-colors hover:bg-card md:p-12"
              >
                <div>
                  <p className="rotulo text-sol">{porta.rotulo}</p>
                  <h3 className="display titulo-bloco mt-5">
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
        <div className="envelope secao">
          {/* O nome do evento é do cartão; o título da seção não o repete. */}
          <TituloSecao
            rotulo="Próximo encontro"
            titulo={proximo ? "Vem aí" : "Ainda sem data"}
            apoio={
              proximo
                ? undefined
                : "O próximo encontro ainda não foi anunciado. Quem está no grupo do WhatsApp fica sabendo primeiro."
            }
          />

          {proximo ? (
            <div className="apos-titulo border-t border-risco">
              <CartaoDeEvento evento={proximo} />
            </div>
          ) : null}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button
              variant={proximo ? "contorno" : "farol"}
              size="xl"
              nativeButton={false}
              render={
                <a href={grupo.url} target="_blank" rel="noreferrer noopener" />
              }
            >
              Entrar no grupo
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="contorno"
              size="xl"
              nativeButton={false}
              render={<Link href="/eventos" />}
            >
              {proximo?.programacao ? "Ver a programação" : "Ver todos os eventos"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
