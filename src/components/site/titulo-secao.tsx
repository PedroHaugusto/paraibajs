import { cn } from "@/lib/utils";

/*
  Cabeçalho de seção: eyebrow em mono, título em display e uma linha de
  apoio opcional. Concentra a escala tipográfica em um lugar só, para as
  páginas não divergirem em tamanho e espaçamento.
*/
export function TituloSecao({
  rotulo,
  titulo,
  apoio,
  nivel: Tag = "h2",
  className,
}: {
  rotulo?: string;
  titulo: React.ReactNode;
  apoio?: React.ReactNode;
  nivel?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {rotulo ? <p className="rotulo text-mare">{rotulo}</p> : null}
      <Tag className="display titulo-secao">{titulo}</Tag>
      {apoio ? (
        <p className="max-w-2xl leading-relaxed text-mare">{apoio}</p>
      ) : null}
    </div>
  );
}
