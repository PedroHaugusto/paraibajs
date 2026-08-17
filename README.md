# ParaibaJS

Site da comunidade JavaScript da Paraíba. Centraliza os quatro caminhos de
entrada: Call For Papers, voluntariado, links úteis e contato.

## Rodando

```bash
npm install
cp .env.example .env.local
npm run dev
```

O site sobe em `http://localhost:3000`. Sem `RESEND_API_KEY` configurada, os
formulários imprimem o conteúdo no terminal em vez de enviar e-mail — dá para
trabalhar nas telas sem credencial nenhuma.

## Onde mexer

Quase tudo que muda com frequência é conteúdo, e conteúdo mora em
`src/content/` como TypeScript tipado. Nenhum desses arquivos exige tocar em
componente:

| Arquivo | O que controla |
|---|---|
| `comunidade.ts` | nome, descrição, canais, ecossistema do letreiro, próximo encontro |
| `navegacao.ts` | itens do menu (cabeçalho e rodapé leem daqui) |
| `cfp.ts` | etapas, prazos, critérios da curadoria e se a chamada está aberta |
| `funcoes-voluntario.ts` | funções abertas e o custo de tempo de cada uma |
| `links.ts` | links úteis por categoria |

Anunciar um encontro é preencher `proximoEncontro` em `comunidade.ts` — a home
troca sozinha do estado "ainda sem data" para os dados reais. Fechar o Call For
Papers é mudar `chamadaAberta` para `false` em `cfp.ts`.

Procure por `TODO(dono)` para achar tudo que ainda é placeholder.

## Design

O sistema visual está inteiro em `src/app/globals.css`, com os tokens
comentados. Três coisas que não são acidente:

- **Nada tem `border-radius`.** Os tokens de raio são todos `0px`, inclusive
  para os componentes do shadcn.
- **O vermelho do farol é cor gráfica, não cor de texto.** Sobre o fundo escuro
  ele fica em 4.3:1, que reprova em texto pequeno. Use em massas, barras,
  display grande e fundo de botão (com texto branco puro, que dá 4.6:1). Para
  acento em texto pequeno, use `sol`.
- **Seções claras usam a classe `.claro`**, que reescreve os mesmos tokens. Não
  há `dark:` espalhado pelo código, e qualquer componente do shadcn dentro dela
  se adapta sozinho.

O display é **Archivo** no eixo de largura expandido (`font-stretch: 125%`),
carregado com `axes: ["wdth"]` — sem esse campo o eixo não vem e o lettering
sai estreito.

## Formulários

O mesmo schema Zod (`src/lib/esquemas.ts`) valida no navegador e no servidor.
`iniciadoEm` é a única exceção: não é campo do formulário, é carimbado no envio
e validado só no servidor via `noServidor()`.

Três proteções, na ordem em que rodam: limite de 5 envios por IP por hora
(em memória, `src/lib/limite.ts`), honeypot e tempo mínimo de preenchimento de
3 segundos. As duas últimas respondem `200` de propósito — para o robô o envio
parece ter dado certo e ele não fica tentando variações.

## Deploy

Feito para a Vercel: `next build` e pronto. Configure `RESEND_API_KEY`,
`EMAIL_ORGANIZACAO` e `EMAIL_REMETENTE` nas variáveis de ambiente do projeto.
O remetente precisa ser de um domínio verificado na Resend.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui sobre Base UI ·
react-hook-form + Zod · Resend
