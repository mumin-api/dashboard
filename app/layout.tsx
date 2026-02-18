import { getLocale } from 'next-intl/server';
import './globals.css';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Mumin Hadith API - Dashboard</title>
        <meta name="description" content="Premium Islamic-themed dashboard for Mumin Hadith API" />
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-gray-200">
        {children}
      </body>
    </html>
  );
}
