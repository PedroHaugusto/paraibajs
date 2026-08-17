import { FeixeDoFarol } from "@/components/site/feixe-do-farol";

/*
  Abertura padrão das páginas internas. Repete o feixe do hero em escala
  menor, para as páginas pertencerem visualmente à home sem competir com ela.
*/
export function CapaDePagina({
  rotulo,
  titulo,
  apoio,
}: {
  rotulo: string;
  titulo: React.ReactNode;
  apoio: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-risco bg-breu">
      <FeixeDoFarol className="top-[-60%] left-[55%] h-[220%] w-[70%]" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <p className="rotulo text-sol">{rotulo}</p>
        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.5rem,9vw,7rem)]">
          {titulo}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mare">
          {apoio}
        </p>
      </div>
    </section>
  );
}
