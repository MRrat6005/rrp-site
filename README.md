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

- Local development can use `.env.local` with `NEXT_PUBLIC_DASHBOARD_API_BASE_URL`.
- Static deployments can override `public/runtime-config.js` or the deployed `runtime-config.js` file without changing dashboard components.
- The dashboard client appends the dashboard paths itself, so the base URL can point at the backend API root.

## GitHub Pages Notes

- The project uses `output: "export"` and writes a static site to `out/`.
- For repository pages, `next.config.mjs` derives `basePath` from `GITHUB_REPOSITORY`.
- For custom domains, add `public/CNAME` and the config stops assuming a repository base path.
- `public/CNAME.example` is included as a placeholder.
