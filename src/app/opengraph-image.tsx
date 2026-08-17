import { ImageResponse } from "next/og";

import { comunidade } from "@/content/comunidade";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = comunidade.nomeCompleto;

/*
  Imagem de compartilhamento. Sem fonte customizada de propósito: buscar a
  Archivo no build depende de rede, e uma OG que falha derruba a build
  inteira. O peso vem da composição e da cor.
*/
export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* faixa do farol */}
        <div style={{ display: "flex", height: 12, width: 220, background: "#e5232b" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 8,
              color: "#ffc940",
              textTransform: "uppercase",
            }}
          >
            {comunidade.cidade}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 900,
              color: "#f4f2ed",
              lineHeight: 1,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            Onde o JS nasce primeiro
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(244,242,237,.18)",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 800,
              color: "#f4f2ed",
              textTransform: "uppercase",
            }}
          >
            Paraiba<span style={{ color: "#e5232b" }}>JS</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#7c8188" }}>
            A comunidade JavaScript da Paraíba
          </div>
        </div>
      </div>
    ),
    size,
  );
}
