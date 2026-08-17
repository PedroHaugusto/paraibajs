import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { CapaDePagina } from "@/components/site/capa-de-pagina";
import { categorias } from "@/content/links";

export const metadata: Metadata = {
  title: "Links úteis",
  description:
    "O que a ParaibaJS indica para estudar JavaScript, construir e se manter em dia — com o motivo de cada indicação.",
};

export default function Links() {
  return (
    <>
      <CapaDePagina
        rotulo="Links úteis"
        titulo={
          <>
            O que vale a <span className="text-farol">pena</span>
          </>
        }
        apoio="Não é uma lista de tudo que existe. É o que gente da comunidade abriu, usou e voltou a recomendar — cada um com o motivo de estar aqui."
      />

      {categorias.map((categoria, indice) => (
        <section
          key={categoria.nome}
          className={indice % 2 === 0 ? "claro" : "bg-breu"}
        >
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
            <div className="flex flex-col gap-3">
              <h2 className="display text-[clamp(1.75rem,5vw,3.5rem)]">
                {categoria.nome}
              </h2>
              <p className="text-mare">{categoria.descricao}</p>
            </div>

            {/*
              Lista com hairlines em vez de cards: o conteúdo é texto, e a
              moldura só acrescentaria ruído. O hover acende a linha inteira.
            */}
            <ul className="mt-12 border-t border-risco">
              {categoria.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group grid gap-3 border-b border-risco py-8 transition-colors hover:bg-foreground/4 md:grid-cols-[minmax(0,20rem)_1fr_auto] md:items-baseline md:gap-10 md:px-4"
                  >
                    <span className="display text-xl md:text-2xl">
                      {link.titulo}
                    </span>
                    <span className="max-w-2xl leading-relaxed text-mare">
                      {link.porque}
                    </span>
                    <ArrowUpRightIcon
                      className="size-5 shrink-0 text-farol transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="border-t border-risco bg-breu">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
          <p className="max-w-2xl text-lg leading-relaxed text-mare">
            Falta alguma coisa que te ajudou de verdade?{" "}
            <a
              href="/contato"
              className="text-sol underline underline-offset-4"
            >
              Manda para a gente
            </a>{" "}
            e conte por que ela merece entrar.
          </p>
        </div>
      </section>
    </>
  );
}
