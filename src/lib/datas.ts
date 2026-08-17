/*
  Datas dos eventos são dias, não instantes — e precisam ser comparadas e
  exibidas no fuso da Paraíba (UTC-3 o ano inteiro), não no do servidor, que
  na Vercel roda em UTC. Sem isso, das 21h à meia-noite o site já consideraria
  passado um evento que ainda acontece hoje.
*/

const FUSO = "America/Recife";

/** Hoje na Paraíba, no formato `yyyy-mm-dd` — comparável como string. */
export function hojeNaParaiba(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * "Sábado, 23 de agosto" a partir de `yyyy-mm-dd`.
 *
 * A maiúscula sai daqui e não de um `capitalize` no CSS, que capitalizaria
 * cada palavra e produziria "Sábado, 23 De Agosto".
 */
export function porExtenso(data: string): string {
  const [ano, mes, dia] = data.split("-").map(Number);
  const texto = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(ano, mes - 1, dia)));
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** "23/08/2026" a partir de `yyyy-mm-dd`. */
export function emNumeros(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}
