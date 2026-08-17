import { MalhaHexagonal } from "@/components/site/malha-hexagonal";

/*
  Abertura padrão das páginas internas.

  A altura é FIXA, e o conteúdo fica centrado dentro dela. Antes a capa
  crescia conforme o texto, então uma página com título de duas linhas ficava
  visivelmente maior que outra de uma linha — as telas pareciam desiguais
  mesmo usando o mesmo componente. Com altura mínima e centralização, título
  curto ou longo entregam a mesma caixa.

  A medida saiu da página de eventos, que era a que estava com a proporção
  certa: título em duas linhas mais apoio em duas.
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
      {/*
        No telefone a malha recua e clareia: com 375px de largura ela passaria
        por cima do título inteiro, não só pelo fundo.
      */}
      <MalhaHexagonal className="top-1/2 -right-40 h-[120%] w-auto -translate-y-1/2 opacity-35 md:-right-20 md:h-[150%] md:opacity-70" />

      <div className="envelope abertura relative flex min-h-[21rem] flex-col justify-center md:min-h-[25rem]">
        <p className="rotulo text-sol">{rotulo}</p>
        <h1 className="display titulo-capa mt-5 max-w-[20ch]">{titulo}</h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-mare md:text-lg">
          {apoio}
        </p>
      </div>
    </section>
  );
}
