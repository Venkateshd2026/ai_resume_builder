# AI Resume Builder — Build Track (Project 3)

Route rail and gating system for the KodNest Premium Build System.

## Routes

| Path | Description |
|------|-------------|
| `/rb/01-problem` | Step 1 — Define the problem |
| `/rb/02-market` | Step 2 — Market and opportunity |
| `/rb/03-architecture` | Step 3 — System architecture |
| `/rb/04-hld` | Step 4 — High-level design |
| `/rb/05-lld` | Step 5 — Low-level design |
| `/rb/06-build` | Step 6 — Build |
| `/rb/07-test` | Step 7 — Test |
| `/rb/08-ship` | Step 8 — Ship |
| `/rb/proof` | Proof & submission |

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173/rb/` (or configured port).

## Deploy on Netlify

1. Push the `rb/` folder to a Git repo (or the full KodNest-Design-System repo).
2. In Netlify: **Add new site** → **Import an existing project** → connect your repo.
3. Set **Base directory** to `rb` (if rb is inside a monorepo) or leave blank if rb is the repo root.
4. Build command: `npm run build` (default from netlify.toml)
5. Publish directory: `dist` (default from netlify.toml)

Deploy. The app will be live at `https://your-site.netlify.app/` with routes `/01-problem`, `/02-market`, … `/proof`.

## Gating

- No skipping steps. Step N+1 is accessible only when step N has an artifact.
- Artifacts stored in `localStorage` as `rb_step_1_artifact` … `rb_step_8_artifact`.
- Next button is disabled until artifact is uploaded (via Build panel: It Worked / Error / Add Screenshot).
