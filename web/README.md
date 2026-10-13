# Diagnóstico Cambio Fénix — apresentação web

Apresentação em slides horizontais sobre a auditoria PageSpeed do site cambiofenix.com,
escrita para a agência de mídia (público não técnico).

**Stack:** Next.js 16 (App Router, saída `standalone`) · GSAP + ScrollTrigger · Motion · Lenis · next/image.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

## Navegação durante a apresentação

| Ação | Atalho |
|---|---|
| Próximo / anterior | `→` `←`, `Espaço`, roda do mouse, deslizar no celular |
| Primeiro / último | `Home` / `End` |
| Tela cheia | `F` |
| Link direto para um slide | `/#slide-4` |

O slide 4 ("Sinta a espera") roda a simulação sozinho na primeira visita; o botão **Repetir** roda de novo.
O slide 9 tem os controles "Como está / Sugestão" e "Ver sob o sol".

## Deploy no EasyPanel (Docker Compose)

1. Repositório: https://github.com/Renzo26/apresenta-o_cambioFenix
2. No EasyPanel: **Create service → Compose**, aponte para o repositório. O `docker-compose.yml` está na raiz e faz o build da pasta `web/`.
3. Em **Domains**, ligue o seu domínio ao serviço `apresentacao`, porta **3000**.
4. Deploy.

Variáveis de build (no `docker-compose.yml` da raiz → `build.args`):

- `ALLOW_INDEX` — `"false"` (padrão) adiciona `noindex`. O conteúdo expõe pontos fracos do site
  do cliente, então só mude para `"true"` se quiser que ele apareça no Google.
- `SITE_URL` — domínio final (ex.: `https://diagnostico.seudominio.com`), usado nas metatags Open Graph.

Fora do EasyPanel: descomente o bloco `ports` e rode `docker compose up -d --build`.

## Onde editar

- Textos e números: `components/slides/*.tsx` (um arquivo por slide; ordem em `app/page.tsx`).
- Cores, tipografia e layout: `app/globals.css` (tokens no topo).
- Motor de slides (Lenis + pin horizontal + animações de entrada): `components/Deck.tsx`.
- Captura do site usada nos celulares: `public/images/site-mobile.png`.
