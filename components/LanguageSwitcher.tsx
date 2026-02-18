'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/lib/navigation'
import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLanguage = (newLocale: 'en' | 'ru') => {
        router.replace(pathname, { locale: newLocale })
    }

    return (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/20 border border-white/5">
            <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-accent transition-all ${
                    locale === 'en' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => switchLanguage('ru')}
                className={`px-3 py-1.5 rounded-lg text-xs font-accent transition-all ${
                    locale === 'ru' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
            >
                RU
            </button>
        </div>
    )
}
