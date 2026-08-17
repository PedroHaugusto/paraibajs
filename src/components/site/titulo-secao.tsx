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
      <Tag className="display text-[clamp(2rem,6vw,4.5rem)]">{titulo}</Tag>
      {apoio ? (
        <p className="max-w-2xl text-base leading-relaxed text-mare md:text-lg">
          {apoio}
        </p>
      ) : null}
    </div>
  );
}
