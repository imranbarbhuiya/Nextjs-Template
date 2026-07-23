'use client';

import { setCookie } from 'cookies-next/client';
import { Check, Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LOCALES = [
	{ value: 'en', label: 'English' },
	{ value: 'ar', label: 'العربية' },
] as const;

export function LocaleDropdown() {
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
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button aria-label="Change language" size="icon" variant="outline">
						<Languages />
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				{LOCALES.map((item) => (
					<DropdownMenuItem key={item.value} onClick={() => changeLocale(item.value)}>
						{item.label}
						{locale === item.value && <Check className="ms-auto" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
