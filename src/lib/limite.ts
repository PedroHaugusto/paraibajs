/*
  Limitador de envios por IP, em memória.

  Escopo consciente: o estado vive no processo, então cada instância tem a
  própria contagem e um redeploy zera tudo. Para o volume de uma comunidade
  isso basta, e evita arrastar um Redis para dentro do projeto. Se um dia o
  site passar a receber abuso de verdade, troque por um armazenamento
  compartilhado — a assinatura da função não muda.
*/

type Janela = { inicio: number; contagem: number };

const janelas = new Map<string, Janela>();

const JANELA_EM_MS = 60 * 60 * 1000;
const MAXIMO_POR_JANELA = 5;
/* Sem isso o Map cresceria para sempre num processo de vida longa. */
const LIMITE_DE_CHAVES = 5000;

export function dentroDoLimite(chave: string): boolean {
  const agora = Date.now();
  const janela = janelas.get(chave);

  if (!janela || agora - janela.inicio > JANELA_EM_MS) {
    if (janelas.size > LIMITE_DE_CHAVES) limparExpiradas(agora);
    janelas.set(chave, { inicio: agora, contagem: 1 });
    return true;
  }

  if (janela.contagem >= MAXIMO_POR_JANELA) return false;

  janela.contagem += 1;
  return true;
}

function limparExpiradas(agora: number) {
  for (const [chave, janela] of janelas) {
    if (agora - janela.inicio > JANELA_EM_MS) janelas.delete(chave);
  }
}

/** IP do cliente atrás do proxy da hospedagem. */
export function identificar(requisicao: Request): string {
  const encaminhado = requisicao.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return requisicao.headers.get("x-real-ip") ?? "desconhecido";
}
