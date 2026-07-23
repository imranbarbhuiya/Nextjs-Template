'use client';

import { Download, PlusSquare, Share, X } from 'lucide-react';
import { useExtracted } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function PwaInstallPrompt() {
	const t = useExtracted();

	const [isIOS, setIsIOS] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);
	const [showPrompt, setShowPrompt] = useState(false);
	const [deferredPrompt, setDeferredPrompt] = useState<{
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	} | null>(null);

	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
		setIsIOS(isIosDevice);
		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(
				e as Event & {
					prompt: () => Promise<void>;
					userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
				},
			);
			const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
			if (!isDismissed) setShowPrompt(true);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		if (isIosDevice && !window.matchMedia('(display-mode: standalone)').matches) {
			const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
			if (!isDismissed) {
				const timer = setTimeout(() => setShowPrompt(true), 3_000);
				return () => {
					clearTimeout(timer);
					window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
				};
			}
		}

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	const dismissPrompt = () => {
		setShowPrompt(false);
		localStorage.setItem('pwa-prompt-dismissed', 'true');
	};

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;

		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === 'accepted') {
			setDeferredPrompt(null);
			setShowPrompt(false);
		}
	};

	if (!showPrompt || isStandalone) return null;

	const installContent = isIOS ? (
		<div className="mt-4 space-y-2 text-sm">
			<div className="flex items-center gap-2">
				<span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
					1
				</span>
				<span className="text-muted-foreground">
					{t('Tap the')} <Share className="inline size-4" /> {t('Share button')}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
					2
				</span>
				<span className="text-muted-foreground">
					{t('Select')} <span className="font-medium">{t('Add to Home Screen')}</span>{' '}
					<PlusSquare className="inline size-4" />
				</span>
			</div>
		</div>
	) : (
		<div className="mt-4">
			<Button className="w-full" onClick={handleInstallClick}>
				<Download className="size-4" />
				{t('Install Now')}
			</Button>
		</div>
	);

	return (
		<div className="fixed inset-x-4 bottom-4 z-50 md:right-6 md:bottom-6 md:left-auto md:w-96">
			{/* eslint-disable-next-line better-tailwindcss/no-unknown-classes */}
			<div className="shadow-elegant rounded-2xl border border-border bg-card p-4">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h3 className="font-semibold text-foreground">{t('Install App')}</h3>
						<p className="text-sm text-muted-foreground">{t('Install this application for quick access.')}</p>
					</div>
					<Button
						className="ms-2 size-6 p-0 text-muted-foreground hover:text-foreground"
						onClick={dismissPrompt}
						size="icon-xs"
						variant="ghost"
					>
						<X className="size-4" />
					</Button>
				</div>
				{installContent}
			</div>
		</div>
	);
}
