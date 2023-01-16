import { json } from '@remix-run/node';

/**
 * Helper functions help us return accurate HTTP status codes.
 */

/**
 * 201 Ok, resource created.
 */
export const createdResponse = (data) => json(data, { status: 201 });

/**
 * 400 Bad Request.
 */
export const badRequest = (data) => json(data, { status: 400 });

/**
 * 404 Bad Request.
 */
export const notFound = (data) => json(data, { status: 404 });
