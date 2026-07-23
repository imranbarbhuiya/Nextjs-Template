import withSerwistInit from '@serwist/next';
import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin({
	experimental: {
		extract: true,
		srcPath: './',
		messages: {
			sourceLocale: 'en',
			path: './messages',
			format: 'po',
			locales: ['en', 'ar'],
		},
	},
});

const withSerwist = withSerwistInit({
	swSrc: 'app/sw.ts',
	swDest: 'public/sw.js',
	reloadOnOnline: true,
	disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {};

const intlConfig = withNextIntl(nextConfig);

export default process.env.NODE_ENV === 'development' ? intlConfig : withSerwist(intlConfig);
