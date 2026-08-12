---
applyTo: '**/*.tsx'
---

# Components

## Exports & Structure

- Components use `export function MyComponent() { ... }` — no default exports, no `export { ... }` re-exports (exception: `components/ui/` files are fine as-is, and `page.tsx`/`layout.tsx` must default-export per the App Router)
- Use `export const` for handlers, utils, hooks, and non-component exports
- `'use client'` directive on all interactive components
- Route-specific components live beside their `page.tsx` (see [File Organization](file-organization.md)); genuinely reusable components go in `@/components`
- Do not over-split into too many components — only extract when explicitly asked

## shadcn/ui

- Style is **base-rhea**, built on `@base-ui/react` primitives. Add components with the CLI: `bunx shadcn@latest add <component>`
- Import from `@/components/ui/<name>`
- Do NOT edit `components/ui/` source files unless specifically asked or needed to match a design — instead, use className overrides where the component is consumed
- Use `cn()` from `@/lib/utils` for conditional class merging

## Responsive & Scrollable Dialogs

- Use `useIsMobile()` from `@/hooks/use-mobile` to switch between `Sheet` (mobile) and `Dialog` (desktop)
- Extract the dialog body into a shared variable rendered inside both wrappers
- Mobile (`Sheet`): wrap content in `<div className="no-scrollbar overflow-y-auto padding-if-any">{content}</div>` inside `SheetContent`
- Desktop (`Dialog`): wrap content in `<div className="no-scrollbar max-h-[50vh] overflow-y-auto padding-if-any">{content}</div>` inside `DialogContent`
- Adjust `max-h-[..vh]` based on expected content length

## Icons

- Icons come from `lucide-react` — this is the project's icon library (`components.json` sets `iconLibrary: "lucide"`)
- Import named icons directly: `import { Plus, Search } from 'lucide-react';`
- Keep icon sizing on the consuming element via Tailwind (`size-4`) rather than the `size` prop, so RTL and text-scale styles stay in CSS
