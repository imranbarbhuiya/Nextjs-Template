---
applyTo: '**'
---

# API & Data Fetching

## The client

- All HTTP goes through the typed `Api` client from `@/lib/fetch` — a single `openapi-fetch` client generated from the backend OpenAPI schema. **Never hand-write `fetch` calls or API types.**
- Types live in `openapi/api.ts` (generated, never edit). Import friendly aliases from `openapi/api-types.ts` instead of reaching into deep schema paths.
- When the backend changes, run `bun api:generate` (reads `http://localhost:3001/docs-yaml`) rather than editing `openapi/api.ts` by hand.
- `NEXT_PUBLIC_API_BASE` is the backend base URL.

## Query & mutation rules

- Server state uses TanStack Query. `QueryClient` is configured in `components/providers.tsx`.
- **Throw `ApiError(message, status)` from `@/lib/fetch`, never `new Error(...)`, inside `queryFn`/`mutationFn`.** The client's `retry` logic keys off `error.status` to avoid retrying 400/401/403/404/422. Enforced by the ESLint rule `mahir-api-error/require-api-error`.
- Query keys match the API path: `['/health']`, `['/items', params]`.
- Pass `signal` through to the client, and use `getApiErrorMessage(error, fallback)` when surfacing failures in the UI.

```ts
const { data } = useQuery({
	queryKey: ['/items', { page, limit }],
	queryFn: async ({ signal }) => {
		const { data, error, response } = await Api.GET('/items', {
			signal,
			params: { query: { page, limit } },
		});
		if (error) throw new ApiError(error.message ?? 'Failed to load items', response.status);
		return data;
	},
});
```

## Auth

There is no auth wired up — add it where the app needs it. If the schema marks `Authorization` as a required parameter on operations, it goes through `params.header` rather than the top-level `headers` option.
