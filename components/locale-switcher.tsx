'use client';

import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';

export function LocaleSwitcher() {
	const locale = useLocale();
	const router = useRouter();

	const changeLocale = useCallback(
		(next: string) => {
			setCookie('locale', next, { maxAge: 365 * 24 * 60 * 60 });
			router.refresh();
		},
		[router],
	);

	return (
		<div className="flex gap-2">
			<Button onClick={() => changeLocale('en')} size="sm" variant={locale === 'en' ? 'default' : 'outline'}>
				English
			</Button>
			<Button onClick={() => changeLocale('ar')} size="sm" variant={locale === 'ar' ? 'default' : 'outline'}>
				العربية
			</Button>
		</div>
	);
}
