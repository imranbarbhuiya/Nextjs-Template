---
applyTo: '**/*.tsx'
---

# URL State (nuqs)

Use `nuqs` for any client-side state that should be persisted in URL query parameters. The `NuqsAdapter` is already configured in `components/providers.tsx`.

## Import

```ts
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState, useQueryStates } from 'nuqs';
```

## Patterns

### Pagination

```ts
const [{ page, limit }, setPagination] = useQueryStates({
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(10),
});
```

### Search

```ts
const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
```

Pass `search || undefined` to API hooks so empty strings are not sent as query params.

### Tab state

```ts
const [activeTab, setActiveTab] = useQueryState(
	'tab',
	parseAsStringLiteral(['overview', 'technical'] as const).withDefault('overview'),
);
```

## Rules

- Always provide `.withDefault()` — never leave the value nullable unless intentional
- Use `parseAsInteger` for numeric params, `parseAsString` for text, `parseAsStringLiteral` for union/enum-like values
- Use `useQueryState` for independent params (single search, tab selection)
- Use `useQueryStates` when multiple params are logically grouped (e.g. pagination `page`+`limit`, bulk filters) — this batches URL updates into a single history entry
- Reset `page` to `1` when search or filters change
