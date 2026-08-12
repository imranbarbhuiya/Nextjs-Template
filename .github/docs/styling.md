---
applyTo: '**/*.tsx, **/*.css'
---

# Styling

Tailwind CSS 4 with CSS variables for theming. There is no `tailwind.config` — all tokens are declared in `app/globals.css` under `@theme inline`, with values in `:root` and `.dark`.

## Design Tokens

The palette is the shadcn `neutral` base — swap the values in `:root`/`.dark` for the product's brand and everything downstream follows.

- **Core surfaces:** `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive` (each with a `-foreground` pair)
- **Lines & focus:** `border`, `input`, `ring`
- **Sidebar:** `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring`
- **Charts:** `chart-1` … `chart-5`

## Rules

- Use token-backed utilities (`bg-card`, `text-muted-foreground`, `border-border`) — never hardcode hex values or arbitrary colours in components
- New colours belong in `app/globals.css` as tokens with both light and dark values, then referenced by name
- Radius scales off `--radius` (0.75rem): `rounded-sm/md/lg/xl/2xl/3xl/4xl` all derive from it — prefer the named scale over arbitrary values
- Dark mode is class-based (`@custom-variant dark (&:is(.dark *))`) via `next-themes`; every token added to `:root` needs a `.dark` counterpart
- The app is RTL-aware — use logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) instead of `ml-*`/`mr-*`/`left-*`/`right-*`
- `eslint-config-mahir` sorts class names; those lint errors auto-fix
