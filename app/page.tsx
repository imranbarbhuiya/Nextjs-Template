import { getExtracted } from 'next-intl/server';

import { LocaleSwitcher } from '@/components/locale-switcher';
import { Button } from '@/components/ui/button';

export default async function Page() {
	const t = await getExtracted();

	return (
		<div className="flex min-h-svh p-6">
			<div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
				<div>
					<h1 className="font-medium">{t('Project ready!')}</h1>
					<p>{t('You may now add components and start building.')}</p>
					<p>{t("We've already added the button component for you.")}</p>
					<Button className="mt-2">{t('Button')}</Button>
				</div>
				<LocaleSwitcher />
				<div className="font-mono text-xs text-muted-foreground">
					{t('Press {key} to toggle dark mode', { key: 'd' })}
				</div>
			</div>
		</div>
	);
}
