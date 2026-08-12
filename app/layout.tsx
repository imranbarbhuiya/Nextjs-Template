import { Geist_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { Providers } from '@/components/providers';
import { PwaInstallPrompt } from '@/components/pwa-install-prompt';
import { ThemeProvider } from '@/components/theme-provider';
import { DirectionProvider } from '@/components/ui/direction';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
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
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
	title: {
		default: 'Next.js Template',
		template: '%s · Next.js Template',
	},
	description: 'A Next.js App Router template',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Next.js Template',
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
			className={cn('antialiased', 'font-sans', ibmPlexSansArabic.variable, ibmPlexSans.variable, fontMono.variable)}
			dir={direction}
			lang={locale}
			suppressHydrationWarning
			translate="no"
		>
			{/* eslint-disable-next-line better-tailwindcss/no-unknown-classes */}
			<body className="notranslate" suppressHydrationWarning>
				<DirectionProvider direction={direction}>
					<NextIntlClientProvider>
						<ThemeProvider>
							<Providers>
								<TooltipProvider>
									<PwaInstallPrompt />
									{children}
									<Toaster />
								</TooltipProvider>
							</Providers>
						</ThemeProvider>
					</NextIntlClientProvider>
				</DirectionProvider>
			</body>
		</html>
	);
}
