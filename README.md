<div align="center">

# Next.js Template

**An opinionated Next.js 16 App Router starter — PWA, bilingual RTL i18n, shadcn/ui and a typed API client, already wired up.**

[![GitHub](https://img.shields.io/github/license/imranbarbhuiya/Nextjs-Template)](https://github.com/imranbarbhuiya/Nextjs-Template/blob/main/LICENSE)
[![Continuous Integration](https://github.com/imranbarbhuiya/Nextjs-Template/actions/workflows/continous-integration.yml/badge.svg)](https://github.com/imranbarbhuiya/Nextjs-Template/actions/workflows/continous-integration.yml)

</div>

## What's in the box

| Area            | Choice                                                                               |
| --------------- | ------------------------------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router, React 19)                                                    |
| Package manager | Bun                                                                                  |
| Styling         | Tailwind CSS 4 with CSS-variable tokens, no `tailwind.config`                        |
| Components      | shadcn/ui — `base-rhea` style on [`@base-ui/react`](https://base-ui.com), RTL-aware  |
| Icons           | lucide-react                                                                         |
| Data            | TanStack Query + an `openapi-fetch` client generated from an OpenAPI schema          |
| Forms           | React Hook Form + Zod 4                                                              |
| URL state       | nuqs                                                                                 |
| i18n            | next-intl extracted messages (`en` / `ar`), locale from a cookie, full RTL           |
| Theming         | next-themes, class-based dark mode, `d` hotkey to toggle                             |
| PWA             | Serwist service worker, web manifest, install prompt, push handlers                  |
| Quality         | ESLint (`eslint-config-mahir`), Prettier, Husky pre-commit typecheck, GitHub Actions |

## Getting started

```bash
bun install
bun dev
```

Then work through the checklist below.

## Steps after creating a repo from this template

1. Replace `nextjs-template` in `package.json` with your project name.
2. Update the app name and description in `app/layout.tsx`, `app/manifest.ts` and `AGENTS.md`.
3. Swap the icons — `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/icon-*.png`.
4. Replace the `neutral` palette in `app/globals.css` (`:root` and `.dark`) with your brand tokens.
5. Point `bun api:generate` at your backend's OpenAPI document and regenerate `openapi/api.ts`.
6. Copy `.env.example` to `.env.local` and fill it in.
7. Drop the locales you don't need from `i18n/request.ts`, `next.config.ts` and `messages/`.
8. Remove this section from the README.

## Commands

| Task               | Command                                                     |
| ------------------ | ----------------------------------------------------------- |
| Dev                | `bun dev`                                                   |
| Build              | `bun run build`                                             |
| Start              | `bun start`                                                 |
| Lint               | `bun lint`                                                  |
| Format             | `bun format`                                                |
| Typecheck          | `bun typecheck`                                             |
| Generate API types | `bun api:generate` (requires a backend at `localhost:3001`) |

## Project layout

```
app/             App Router routes, root layout, manifest and service worker source
components/      Shared components; components/ui is reserved for shadcn/ui primitives
hooks/           Reusable client hooks
i18n/            next-intl request config
lib/             Typed API client and shared non-component code
messages/        Extracted next-intl catalogues (en, ar) — generated, do not hand-edit
openapi/         Generated OpenAPI types plus friendly aliases
.github/docs/    Per-topic conventions, referenced from AGENTS.md
```

## Conventions

`AGENTS.md` (symlinked as `CLAUDE.md`) is the entry point for coding agents and links to the
per-topic guides in [`.github/docs/`](.github/docs) — API & data fetching, components, forms,
i18n, styling, URL state, file organization and pitfalls.

## Notes on pinned tooling

`eslint` is held at `^9` and `typescript` at `^6`. ESLint 10 breaks `eslint-plugin-react`, and
TypeScript 7 breaks `ts-api-utils`, which typescript-eslint depends on. Lift the pins once those
land support.

## License

MIT © [Parbez](https://github.com/imranbarbhuiya)
