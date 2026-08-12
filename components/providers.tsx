'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ApiError } from '@/lib/fetch';

import type { PropsWithChildren } from 'react';

const NON_RETRYABLE = new Set([400, 401, 403, 404, 422]);

const makeQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1_000,
				gcTime: 10 * 60 * 1_000,
				refetchOnWindowFocus: true,
				retry: (failureCount, error) => {
					if (error instanceof ApiError && NON_RETRYABLE.has(error.status)) return false;
					return failureCount < 3;
				},
			},
		},
	});

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
	if (typeof window === 'undefined') return makeQueryClient();
	browserQueryClient ??= makeQueryClient();
	return browserQueryClient;
};

export function Providers({ children }: PropsWithChildren) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<NuqsAdapter>{children}</NuqsAdapter>
		</QueryClientProvider>
	);
}
