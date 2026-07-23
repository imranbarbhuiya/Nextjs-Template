'use client';

import { setCookie } from 'cookies-next/client';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
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
			<Button
				variant={locale === 'en' ? 'default' : 'outline'}
				size="sm"
				onClick={() => changeLocale('en')}
			>
				English
			</Button>
			<Button
				variant={locale === 'ar' ? 'default' : 'outline'}
				size="sm"
				onClick={() => changeLocale('ar')}
			>
				العربية
			</Button>
		</div>
	);
}
