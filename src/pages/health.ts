import type { APIRoute } from 'astro';

// The health check Containify polls before sending a new release traffic.
export const GET: APIRoute = () => new Response('ok');
