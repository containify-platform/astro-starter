// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	// Render pages on request by default; add `export const prerender = true` to a page to
	// build it as static HTML instead.
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	security: {
		// HTTPS ends at Containify's edge, which forwards requests with X-Forwarded-Proto and
		// X-Forwarded-Host. Trusting them gives Astro.url the public https:// address, on the
		// containify.app domain and on custom domains alike.
		allowedDomains: [{}]
	}
});
