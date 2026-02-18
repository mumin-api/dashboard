import { Providers } from '@/components/Providers'
import { getMessages } from 'next-intl/server'
import '../globals.css'

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <title>Mumin Hadith API - Dashboard</title>
                <meta name="description" content="Premium Islamic-themed dashboard for Mumin Hadith API" />
            </head>
            <body suppressHydrationWarning className="bg-[#050505] text-gray-200">
                <Providers locale={locale} messages={messages}>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
