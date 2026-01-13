'use client'

import { useState } from 'react'
import { Copy, Eye, EyeOff, MoreVertical, Trash2, RefreshCw } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'

interface ApiKey {
    id: string
    name: string
    keyPrefix: string
    fullKey: string
    createdAt: string
    lastUsed: string
    requests: number
}

export function ApiKeyCard() {
    const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({})

    // Mock data
    const apiKeys: ApiKey[] = [
        {
            id: '1',
            name: 'Production API',
            keyPrefix: 'sk_mumin_abc123...',
            fullKey: 'sk_mumin_abc123def456ghi789jkl012mno345',
            createdAt: '2024-01-01',
            lastUsed: '2 hours ago',
            requests: 28450,
        },
        {
            id: '2',
            name: 'Development API',
            keyPrefix: 'sk_mumin_xyz789...',
            fullKey: 'sk_mumin_xyz789uvw456rst123opq098lmn765',
            createdAt: '2024-01-05',
            lastUsed: '1 day ago',
            requests: 5240,
        },
    ]

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <IslamicCard>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-display text-emerald-900">API Keys</h3>
                    <button className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg text-sm font-accent">
                        + New Key
                    </button>
                </div>

                <div className="space-y-4">
                    {apiKeys.map((key) => (
                        <div
                            key={key.id}
                            className="p-4 border border-emerald-900/10 rounded-xl hover:border-gold-500/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-accent text-emerald-900 mb-1">{key.name}</h4>
                                    <p className="text-sm text-charcoal/60 font-body">
                                        Created {key.createdAt}
                                    </p>
                                </div>

                                <button className="p-2 hover:bg-sand rounded-lg">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center space-x-2 bg-sand p-3 rounded-lg mb-3">
                                <code className="flex-1 text-sm font-mono text-charcoal">
                                    {showKey[key.id] ? key.fullKey : key.keyPrefix}
                                </code>
                                <button
                                    className="p-2 hover:bg-white rounded"
                                    onClick={() => setShowKey({ ...showKey, [key.id]: !showKey[key.id] })}
                                >
                                    {showKey[key.id] ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    className="p-2 hover:bg-white rounded"
                                    onClick={() => copyToClipboard(key.fullKey)}
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-charcoal/60 font-body">
                                    Last used: {key.lastUsed}
                                </span>
                                <span className="text-emerald-600 font-accent">
                                    {key.requests.toLocaleString()} requests
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </IslamicCard>
    )
}
