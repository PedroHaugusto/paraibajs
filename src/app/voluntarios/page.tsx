import type { Metadata } from "next";

import { FormularioVoluntario } from "@/components/formularios/formulario-voluntario";
import { CapaDePagina } from "@/components/site/capa-de-pagina";
import { TituloSecao } from "@/components/site/titulo-secao";
import { funcoes } from "@/content/funcoes-voluntario";

export const metadata: Metadata = {
  title: "Voluntários",
  description:
    "As funções abertas na organização da ParaibaJS, o que cada uma exige e quanto tempo consome.",
};

export default function Voluntarios() {
  return (
    <>
      <CapaDePagina
        rotulo="Voluntários"
        titulo={
          <>
            Quem faz <span className="text-farol">acontecer</span>
          </>
        }
        apoio="A ParaibaJS não tem funcionário. Cada encontro sai do trabalho de gente que decidiu doar algumas horas. Abaixo está o que precisa ser feito e quanto tempo cada coisa custa — sem romantizar."
      />

      {/* --- funções ------------------------------------------------------ */}
      <section className="claro">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Funções abertas"
            titulo="Escolha o que combina com você"
            apoio="Ninguém precisa fazer tudo. A maioria das pessoas cuida de uma coisa só, e isso já resolve."
          />

          <ul className="mt-16 flex flex-col border-t border-risco">
            {funcoes.map((funcao) => (
              <li
                key={funcao.nome}
                className="grid gap-4 border-b border-risco py-10 md:grid-cols-[16rem_1fr_16rem] md:gap-10"
              >
                <h3 className="display text-2xl md:text-3xl">{funcao.nome}</h3>
                <p className="max-w-xl leading-relaxed text-mare">
                  {funcao.texto}
                </p>
                <p className="rotulo self-start text-mare md:text-right">
                  {funcao.custo}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- formulário ---------------------------------------------------- */}
      <section className="bg-breu">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <TituloSecao
            rotulo="Inscrição"
            titulo="Contar com você"
            apoio="Preencha e a organização entra em contato. Não é entrevista: é só para saber quem você é e onde você encaixa."
          />

          <div className="mt-16 max-w-3xl">
            <FormularioVoluntario />
          </div>
        </div>
      </section>
    </>
  );
}
