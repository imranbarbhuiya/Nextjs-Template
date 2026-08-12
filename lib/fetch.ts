import createClient from 'openapi-fetch';

import type { paths as ApiPaths } from '@/openapi/api';

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error && error.message) return error.message;
	return fallback;
}

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const Api = createClient<ApiPaths>({ baseUrl: API_BASE });
