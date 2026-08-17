import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Space_Mono } from "next/font/google";

import { Cabecalho } from "@/components/site/cabecalho";
import { Rodape } from "@/components/site/rodape";
import { Toaster } from "@/components/ui/toast";
import { comunidade } from "@/content/comunidade";
import "./globals.css";

/*
  Display. `axes: ["wdth"]` é obrigatório: sem ele o Next serve só o eixo de
  peso e o `font-stretch: 125%` do .display não tem efeito — o lettering sai
  estreito e perde o bloco maciço que o design depende.
*/
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Space_Grotesk({
  subsets: ["latin"],
  variable: "--fonte-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--fonte-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paraibajs.dev"),
  title: {
    default: `${comunidade.nome} — ${comunidade.chamada}`,
    template: `%s — ${comunidade.nome}`,
  },
  description: comunidade.descricao,
  openGraph: {
    title: comunidade.nomeCompleto,
    description: comunidade.descricao,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${corpo.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only rounded-none focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-farol focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
        <Toaster />
      </body>
    </html>
  );
}
