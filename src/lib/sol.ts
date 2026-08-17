/*
  Nascer do sol na Ponta do Seixas — o ponto mais oriental das Américas, a
  poucos metros do Farol do Cabo Branco.

  Algoritmo do Almanac for Computers (NOAA), com precisão de cerca de um
  minuto — mais do que suficiente para um eyebrow. A Paraíba fica em UTC-3 o
  ano inteiro, sem horário de verão, então o deslocamento é constante.
*/

const PONTA_DO_SEIXAS = { latitude: -7.1489, longitude: -34.7936 };
const FUSO_HORARIO = -3;
/* Zênite oficial: 90° mais a refração atmosférica. */
const ZENITE = 90.8333;

const paraRadianos = (graus: number) => (graus * Math.PI) / 180;
const paraGraus = (radianos: number) => (radianos * 180) / Math.PI;

function normalizar(valor: number, limite: number) {
  const resto = valor % limite;
  return resto < 0 ? resto + limite : resto;
}

function diaDoAno(data: Date) {
  const inicio = Date.UTC(data.getUTCFullYear(), 0, 0);
  const atual = Date.UTC(
    data.getUTCFullYear(),
    data.getUTCMonth(),
    data.getUTCDate(),
  );
  return Math.floor((atual - inicio) / 86_400_000);
}

/** Horário do nascer do sol em "HH:MM", ou null se o sol não nascer no dia. */
export function nascerDoSol(data = new Date()): string | null {
  const { latitude, longitude } = PONTA_DO_SEIXAS;
  const longitudeEmHoras = longitude / 15;
  const tempoAproximado = diaDoAno(data) + (6 - longitudeEmHoras) / 24;

  const anomaliaMedia = 0.9856 * tempoAproximado - 3.289;
  const longitudeVerdadeira = normalizar(
    anomaliaMedia +
      1.916 * Math.sin(paraRadianos(anomaliaMedia)) +
      0.02 * Math.sin(paraRadianos(2 * anomaliaMedia)) +
      282.634,
    360,
  );

  let ascensaoReta = normalizar(
    paraGraus(
      Math.atan(0.91764 * Math.tan(paraRadianos(longitudeVerdadeira))),
    ),
    360,
  );
  /* A ascensão reta precisa cair no mesmo quadrante da longitude verdadeira. */
  const quadranteLongitude = Math.floor(longitudeVerdadeira / 90) * 90;
  const quadranteAscensao = Math.floor(ascensaoReta / 90) * 90;
  ascensaoReta = (ascensaoReta + (quadranteLongitude - quadranteAscensao)) / 15;

  const senoDeclinacao =
    0.39782 * Math.sin(paraRadianos(longitudeVerdadeira));
  const cossenoDeclinacao = Math.cos(Math.asin(senoDeclinacao));

  const cossenoAngulo =
    (Math.cos(paraRadianos(ZENITE)) -
      senoDeclinacao * Math.sin(paraRadianos(latitude))) /
    (cossenoDeclinacao * Math.cos(paraRadianos(latitude)));

  /* Fora de [-1, 1] o sol não chega a nascer — impossível nesta latitude. */
  if (cossenoAngulo > 1 || cossenoAngulo < -1) return null;

  const anguloHorario = (360 - paraGraus(Math.acos(cossenoAngulo))) / 15;
  const tempoLocal =
    anguloHorario + ascensaoReta - 0.06571 * tempoAproximado - 6.622;
  const horaUniversal = normalizar(tempoLocal - longitudeEmHoras, 24);
  const horaLocal = normalizar(horaUniversal + FUSO_HORARIO, 24);

  const horas = Math.floor(horaLocal);
  const minutos = Math.round((horaLocal - horas) * 60);
  /* O arredondamento dos minutos pode estourar para 60. */
  const ajuste = minutos === 60;

  return `${String(ajuste ? horas + 1 : horas).padStart(2, "0")}:${String(
    ajuste ? 0 : minutos,
  ).padStart(2, "0")}`;
}
