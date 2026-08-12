/**
 * Friendly aliases over the generated OpenAPI schema.
 *
 * Import types from here rather than reaching into `./api` — that keeps deep schema
 * paths in one place when the backend regenerates.
 */

import type { components } from './api';

export type HealthDto = components['schemas']['HealthDto'];
export type HealthStatus = HealthDto['status'];
