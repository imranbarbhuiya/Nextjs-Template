---
applyTo: '**'
---

# File Organization

- **All filenames use kebab-case** (e.g. `product-card.tsx`, `use-mobile.ts`) — including components
- **Co-locate route-specific components with their route.** A component used by exactly one route lives beside that route's `page.tsx` (e.g. `app/items/item-table.tsx` next to `app/items/page.tsx`)
- **Reusable components go in `@/components`.** If a component is used by more than one route — or is a genuinely generic building block (`app-sidebar`, `mode-toggle`, `locale-switcher`) — it belongs in the shared `components/` folder
- `components/ui/` is reserved for shadcn/ui primitives
- `useQuery`/`useMutation` hooks live in the same file that performs the fetch/mutation — only extract to `hooks/` if the hook is reused across multiple files
- Type aliases in `openapi/api-types.ts` — don't import deep schema paths directly
- Do not create helper/utility files unless the functions are used in multiple files
- Non-component module code (constants, schemas, pure helpers) shared across routes goes in `lib/`
