'use client'

import { useState } from 'react'
import { Key, Plus } from 'lucide-react'
import { ApiKeyCard } from '@/components/dashboard/api-key-card'
import { keysApi } from '@/lib/api/keys'
import { toast } from '@/components/ui/toast'

export default function ApiKeysPage() {
    const [loading, setLoading] = useState(false)


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display text-emerald-900">API Keys</h1>
                    <p className="text-charcoal/60 mt-2 font-body">
                        Manage your API keys and access tokens
                    </p>
                </div>

            </div>

            <ApiKeyCard />
        </div>
    )
}
