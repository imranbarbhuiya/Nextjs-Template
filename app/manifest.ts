import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Next.js Template',
		short_name: 'Template',
		description: 'A Next.js App Router template with PWA, i18n and shadcn/ui',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#0A0A0A',
		orientation: 'portrait',
		categories: ['productivity', 'utilities'],
		icons: [
			{ src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
			{ src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
			{ src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
		],
	};
}
