"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { MenuIcon } from "lucide-react";

import { Marca } from "@/components/site/marca";
import { comunidade } from "@/content/comunidade";
import { navegacao } from "@/content/navegacao";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/*
  O rótulo sobe e a cópia entra por baixo no hover — mesmo gesto da
  referência. Duas cópias empilhadas dentro de um recorte da altura de uma
  linha; nada de biblioteca de animação.
*/
function RotuloRolante({ texto, ativo }: { texto: string; ativo: boolean }) {
  return (
    <span className="relative block h-4 overflow-hidden">
      <span
        className={cn(
          "block transition-transform duration-300 ease-out group-hover/link:-translate-y-4",
          ativo && "text-farol",
        )}
      >
        <span className="block h-4 leading-4">{texto}</span>
        <span className="block h-4 leading-4 text-sol">{texto}</span>
      </span>
    </span>
  );
}

export function Cabecalho() {
  const caminho = usePathname();
  const [aberto, setAberto] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-risco bg-breu/85 text-cal backdrop-blur-md">
      <div className="envelope flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={`${comunidade.nome} — início`}>
          <Marca />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={caminho === item.href ? "page" : undefined}
                  className="group/link block text-sm font-semibold"
                >
                  <RotuloRolante
                    texto={item.rotulo}
                    ativo={caminho === item.href}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="farol"
            size="lg"
            className="hidden text-xs sm:inline-flex"
            nativeButton={false}
            render={<Link href="/call-for-papers" />}
          >
            Quero palestrar
          </Button>

          <Sheet open={aberto} onOpenChange={setAberto}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-lg" className="lg:hidden" />
              }
            >
              <MenuIcon />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-risco bg-breu text-cal"
            >
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <nav aria-label="Principal (mobile)" className="px-6 pt-16">
                <ul className="flex flex-col">
                  {navegacao.map((item) => (
                    <li key={item.href} className="border-b border-risco">
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href={item.href}
                            aria-current={
                              caminho === item.href ? "page" : undefined
                            }
                            className={cn(
                              "display titulo-bloco block py-5",
                              caminho === item.href && "text-farol",
                            )}
                          />
                        }
                      >
                        {item.rotulo}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
