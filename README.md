# rrp-site

Static Next.js foundation prepared for GitHub Pages deployment.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Static export via `next build`
- Locale routes under `/ru` and `/en`

## Local Development

```bash
npm install
npm run dev
```

## Dashboard API Config

- Production default is `https://api.royalratsproductions.ru/api` via `public/runtime-config.js`.
- Local development can use `.env.local` with `NEXT_PUBLIC_DASHBOARD_API_BASE_URL`.
- The dashboard client calls the live Step 1 backend routes only:
  - `/api/v1/servers`
  - `/api/v1/servers/{id}`
  - `/api/v1/servers/{id}/overview`
  - `/api/v1/servers/{id}/settings`
  - `/api/v1/servers/{id}/modules`
  - `/api/v1/servers/{id}/branding`
  - `/api/v1/servers/{id}/licenses`
  - `/api/v1/servers/{id}/status`
- The configured base URL can point at the host root, `/api`, or `/api/v1`; the client normalizes that base and keeps the endpoint contract fixed.
- Static deployments can override `public/runtime-config.js` or the deployed `runtime-config.js` file without changing dashboard components.

## GitHub Pages Notes

- The project uses `output: "export"` and writes a static site to `out/`.
- For repository pages, `next.config.mjs` derives `basePath` from `GITHUB_REPOSITORY`.
- For custom domains, add `public/CNAME` and the config stops assuming a repository base path.
- `public/CNAME.example` is included as a placeholder.
