import { defaultCache } from '@serwist/next/worker';
import { Serwist } from 'serwist';

import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';

declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: defaultCache,
});

self.addEventListener('push', (event) => {
	if (event.data) {
		const data = event.data.json();
		event.waitUntil(
			self.registration.showNotification(data.title, {
				body: data.body,
				icon: '/logo.png',
				badge: '/logo.png',
				data: data.data,
			}),
		);
	}
});

self.addEventListener('notificationclick', (event) => {
	event.notification.close();
	if (event.notification.data?.url) event.waitUntil(self.clients.openWindow(event.notification.data.url));
});

async function registerRotatedSubscription(subscription: PushSubscription): Promise<void> {
	const apiBase = process.env.NEXT_PUBLIC_API_BASE;
	if (!apiBase) return;

	const cookieAware = self as unknown as {
		cookieStore?: { get: (name: string) => Promise<{ value: string } | null> };
	};
	const token = await cookieAware.cookieStore?.get('token').then(
		(c) => c?.value ?? undefined,
		() => undefined,
	);
	if (!token) return;

	await fetch(`${apiBase}/push-notifications/subscribe`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
		body: JSON.stringify(subscription),
	}).catch(() => undefined);
}

self.addEventListener('pushsubscriptionchange', (event) => {
	const changeEvent = event as ExtendableEvent & {
		oldSubscription?: PushSubscription;
		newSubscription?: PushSubscription;
	};

	changeEvent.waitUntil(
		(async () => {
			try {
				const applicationServerKey = changeEvent.oldSubscription?.options.applicationServerKey ?? undefined;
				const subscription =
					changeEvent.newSubscription ??
					(await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey }));
				await registerRotatedSubscription(subscription);
			} catch {
			}
		})(),
	);
});

serwist.addEventListeners();
