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

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
