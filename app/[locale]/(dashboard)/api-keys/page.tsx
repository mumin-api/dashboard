'use client'

import { useState } from 'react'
import { Key, Plus } from 'lucide-react'
import { ApiKeyCard } from '@/components/dashboard/api-key-card'
import { keysApi } from '@/lib/api/keys'
import { toast } from '@/components/ui/toast'
import { useTranslations } from 'next-intl'

export default function ApiKeysPage() {
    const t = useTranslations('ApiKeys')
    const [loading, setLoading] = useState(false)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display text-emerald-500">{t('title')}</h1>
                    <p className="text-ivory/60 mt-2 font-body">
                        {t('description')}
                    </p>
                </div>
            </div>

            <ApiKeyCard />
        </div>
    )
}
