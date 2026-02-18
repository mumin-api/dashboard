import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Explicitly validate and fallback to default locale
  const safeLocale: string = locales.includes(locale as any) 
    ? (locale as string) 
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
