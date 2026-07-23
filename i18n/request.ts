import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'ar'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async () => {
	const cookieStore = await cookies();
	const raw = cookieStore.get('locale')?.value as Locale | undefined;
	const locale = SUPPORTED_LOCALES.includes(raw!) ? raw! : 'en';

	return {
		locale,
		messages: (await import(`../messages/${locale}.po`)).default,
	};
});
