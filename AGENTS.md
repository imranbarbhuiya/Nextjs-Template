<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Next.js Template

PWA-enabled Next.js 16 App Router starter. Bilingual English / Arabic with RTL.

- **Package Manager:** Bun
- **Stack:** TypeScript, Tailwind CSS 4, shadcn/ui (base-rhea on `@base-ui/react`), TanStack React Query, openapi-fetch, React Hook Form, Zod 4, next-intl, nuqs, Serwist

## Commands

| Task               | Command                                                   |
| ------------------ | --------------------------------------------------------- |
| Dev                | `bun dev`                                                 |
| Build              | `bun run build`                                           |
| Lint               | `bun lint`                                                |
| Format             | `bun format`                                              |
| Typecheck          | `bun typecheck`                                           |
| Generate API types | `bun api:generate` (requires backend at `localhost:3001`) |

There is no test framework configured. After meaningful changes, run `bun typecheck` and `bun lint`. Husky runs `bun typecheck` on commit.

## Architecture

- **Routing** — App Router under `app/`.
- **Data** — a single typed `Api` client (`lib/fetch.ts`) built from the generated OpenAPI schema, consumed through TanStack Query. `components/providers.tsx` holds the `QueryClient` and the nuqs adapter.
- **i18n** — next-intl extracted messages (`messages/{en,ar}.po`), locale from the `locale` cookie.
- **PWA** — `@serwist/next` generates `public/sw.js` from `app/sw.ts` in production only.

## Conventions

Detailed conventions are split by topic:

- [API & Data Fetching](.github/docs/api-data-fetching.md)
- [Components](.github/docs/components.md)
- [i18n](.github/docs/i18n.md)
- [Styling](.github/docs/styling.md)
- [Forms](.github/docs/forms.md)
- [URL State (nuqs)](.github/docs/url-state.md)
- [File Organization](.github/docs/file-organization.md)
- [Pitfalls](.github/docs/pitfalls.md)
