import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Simbolo } from "@/components/site/marca";
import { Button } from "@/components/ui/button";
import { canais, comunidade } from "@/content/comunidade";
import { navegacao } from "@/content/navegacao";

export function Rodape() {
  return (
    <footer className="border-t border-risco bg-breu text-cal">
      {/*
        Fecho: o lettering ocupa a largura toda e diz uma verdade geográfica
        de João Pessoa — a Ponta do Seixas é o ponto mais oriental das
        Américas, então o sol nasce ali antes de qualquer outro lugar do
        continente.
      */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <p className="display text-[clamp(2.5rem,10vw,8.5rem)]">
          O sol nasce
          <br />
          primeiro <span className="text-farol">aqui</span>
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            variant="farol"
            size="xl"
            nativeButton={false}
            render={<Link href="/contato" />}
          >
            Entrar na comunidade
            <ArrowUpRightIcon data-icon="inline-end" />
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
      </section>

      <div className="border-t border-risco">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
          <div className="flex flex-col gap-4">
            <Simbolo className="size-12" />
            <p className="max-w-xs text-sm leading-relaxed text-mare">
              {comunidade.descricao}
            </p>
            <p className="rotulo text-mare">{comunidade.cidade}</p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="rotulo text-mare">Navegar</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-sol"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="rotulo text-mare">Onde estamos</h2>
            <ul className="mt-5 flex flex-col gap-3">
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
                    className="group inline-flex items-center gap-1.5 text-sm transition-colors hover:text-sol"
                  >
                    {canal.nome}
                    <ArrowUpRightIcon className="size-3.5 text-mare transition-colors group-hover:text-sol" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-risco">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 text-xs text-mare sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {comunidade.nome}. Feito pela
            comunidade, para a comunidade.
          </p>
          <p className="font-mono uppercase tracking-widest">
            7°09&apos;S 34°47&apos;O
          </p>
        </div>
      </div>
    </footer>
  );
}
