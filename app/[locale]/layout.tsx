import { Providers } from '@/components/Providers'
import { getMessages } from 'next-intl/server'

export default async function LocalizedLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const messages = await getMessages();

    return (
        <Providers locale={locale} messages={messages}>
            {children}
        </Providers>
    )
}
