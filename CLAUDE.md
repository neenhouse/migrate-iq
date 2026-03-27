# MigrateIQ

Legacy codebase migration intelligence platform. Upload a repo, get a complete migration plan with dependency graphs, risk scores, breaking change detection, effort estimation, auto-generated migration scripts, progress tracking, and rollback planning.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Styling | CSS custom properties |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Dev Commands

```bash
pnpm dev           # Start dev server
pnpm build         # TypeScript check + Vite production build
pnpm test          # Run Vitest
pnpm lint          # ESLint
pnpm preview       # Preview production build locally
```

## Conventions

- Use **pnpm** as the package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)
- WebP format for images where possible

## Project Structure

```
src/
  pages/           Route-level components
  components/
    ui/            Reusable UI components
    sections/      Page sections
  hooks/           Custom React hooks
  lib/             Utilities and helpers
docs/
  vision.md        North star vision and design principles
  prd.md           Product requirements
.claude/
  agents/          Agent definitions
public/            Static assets
```

## Single Source of Truth

| Concern | Source File |
|---------|------------|
| Vision and design principles | `docs/vision.md` |
| Product requirements | `docs/prd.md` |
| Runtime versions | `.mise.toml` |
| Deploy config | `wrangler.jsonc` |
| CI/CD pipeline | `.github/workflows/deploy.yml` |
