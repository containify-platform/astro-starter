import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
	return Response.json({ message: 'Hello from Astro', path: url.pathname, at: new Date().toISOString() });
};
