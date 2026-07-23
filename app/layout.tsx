import { Geist_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { PwaInstallPrompt } from '@/components/pwa-install-prompt';
import { ThemeProvider } from '@/components/theme-provider';
import { DirectionProvider } from '@/components/ui/direction';
import { cn } from '@/lib/utils';

import type { Metadata, Viewport } from 'next';

import './globals.css';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
	subsets: ['arabic', 'latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-ibm-plex-sans-arabic',
});

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ['latin'],
	weight: 'variable',
	variable: '--font-ibm-plex-sans',
});

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: 'Next.js Template',
	description: 'A Next.js App Router template',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Next.js Template',
	},
	icons: {
		icon: '/logo.png',
		apple: '/logo.png',
	},
	other: {
		google: 'notranslate',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const direction = locale === 'ar' ? 'rtl' : 'ltr';

	return (
		<html
			lang={locale}
			dir={direction}
			suppressHydrationWarning
			translate="no"
			className={cn(
				'antialiased',
				'font-sans',
				ibmPlexSansArabic.variable,
				ibmPlexSans.variable,
				fontMono.variable,
			)}
		>
			<body className="notranslate" suppressHydrationWarning>
				<DirectionProvider direction={direction}>
					<NextIntlClientProvider>
						<ThemeProvider>
							<PwaInstallPrompt />
							{children}
						</ThemeProvider>
					</NextIntlClientProvider>
				</DirectionProvider>
			</body>
		</html>
	);
}
