'use client'

import { Key, Plus } from 'lucide-react'
import { ApiKeyCard } from '@/components/dashboard/api-key-card'

export default function ApiKeysPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display text-emerald-900">API Keys</h1>
                    <p className="text-charcoal/60 mt-2 font-body">
                        Manage your API keys and access tokens
                    </p>
                </div>

                <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Key
                </button>
            </div>

            <ApiKeyCard />
        </div>
    )
}
