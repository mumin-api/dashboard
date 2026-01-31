import { useState, useEffect } from 'react'
import { Copy, Eye, EyeOff, MoreVertical, Trash2, RefreshCw, AlertCircle, Key } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { keysApi } from '@/lib/api/keys'
import { toast } from '@/components/ui/toast'

interface ApiKey {
    id: string
    keyPrefix: string
    createdAt: string
    lastUsedAt?: string
    totalRequests: number
}

export function ApiKeyCard() {
    const [keys, setKeys] = useState<ApiKey[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newFullKey, setNewFullKey] = useState<string | null>(null)

    useEffect(() => {
        console.log('[ApiKeyCard] Mounted. Initial load...');
        loadKeys()
    }, [])

    const loadKeys = async () => {
        try {
            console.log('[ApiKeyCard] Loading keys...');
            setLoading(true)
            setError(null)
            const res: any = await keysApi.getMe()
            console.log('[ApiKeyCard] Keys received:', res);

            if (Array.isArray(res)) {
                setKeys(res)
            } else if (res && res.keyPrefix) {
                setKeys([res])
            } else {
                setKeys([])
            }
        } catch (err: any) {
            console.error('[ApiKeyCard] Load failed:', err)
            setError(err.message || 'API Connection Error. Verify server at http://127.0.0.1:3333/v1')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateKey = async () => {
        console.log('[ApiKeyCard] Create button clicked!');

        if (keys.length >= 5) {
            toast('Maximum limit of 5 keys reached.', 'error')
            return
        }

        try {
            setLoading(true)
            const res: any = await keysApi.create()
            console.log('[ApiKeyCard] Key created:', res);

            if (res && res.apiKey) {
                setNewFullKey(res.apiKey)
                toast('API Key created! Save it somewhere safe.', 'success')
            } else {
                toast('New key generated.', 'success')
            }
            await loadKeys()
        } catch (error: any) {
            console.error('[ApiKeyCard] Create failed:', error)
            toast(error.message || 'Failed to create key. Try again maybe?', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleRotateKey = async (apiKeyId: string) => {
        if (!confirm('Rotate this key? Old one will stop working.')) return;

        try {
            setLoading(true)
            const res: any = await keysApi.rotate()
            if (res && res.apiKey) {
                setNewFullKey(res.apiKey)
                toast('Key rotated successfully!', 'success')
            }
            await loadKeys()
        } catch (error: any) {
            console.error('[ApiKeyCard] Rotation failed:', error)
            toast('Rotating failed. Check connection.', 'error')
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast('Copied!', 'info')
    }

    return (
        <IslamicCard>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-display text-emerald-900">API Keys</h3>
                    <button
                        onClick={handleCreateKey}
                        disabled={loading || keys.length >= 5}
                        className="relative z-10 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-ivory rounded-lg text-sm font-accent transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                        {loading && keys.length === 0 ? 'Loading...' : '+ New Key'}
                    </button>
                </div>

                <div className="space-y-4">
                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="font-accent text-sm">{error}</p>
                                <button
                                    onClick={loadKeys}
                                    className="text-xs underline mt-1 hover:text-rose-900 font-bold"
                                >
                                    Try Refreshing
                                </button>
                            </div>
                        </div>
                    )}

                    {loading && keys.length === 0 ? (
                        <div className="text-center p-8 bg-sand/20 rounded-xl">
                            <RefreshCw className="w-8 h-8 animate-spin text-emerald-900/20 mx-auto mb-2" />
                            <p className="text-sm text-charcoal/40 font-body italic">Connecting to API...</p>
                        </div>
                    ) : keys.length === 0 && !error ? (
                        <div className="text-center p-8 bg-sand/30 rounded-xl border border-dashed border-emerald-900/10">
                            <Key className="w-8 h-8 text-emerald-900/20 mx-auto mb-2" />
                            <p className="text-sm text-charcoal/60 font-body mb-4">No API keys active</p>
                            <button
                                onClick={handleCreateKey}
                                className="px-6 py-2 bg-emerald-900 text-ivory rounded-lg font-accent hover:shadow-glow-emerald transition-all active:scale-95"
                            >
                                Create First Key
                            </button>
                        </div>
                    ) : (
                        keys.map((key) => (
                            <div
                                key={key.id}
                                className="p-4 border border-emerald-900/10 rounded-xl hover:border-gold-500/30 transition-colors bg-white/50 relative overflow-hidden group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-accent text-emerald-900 mb-1">Production Key</h4>
                                        <p className="text-sm text-charcoal/60 font-body">
                                            Created {new Date(key.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="p-1 px-2 bg-emerald-100 text-emerald-700 text-[10px] rounded uppercase tracking-wider font-bold">
                                        Active
                                    </div>
                                </div>

                                {newFullKey && newFullKey.startsWith(key.keyPrefix) && (
                                    <div className="mb-4 animate-in fade-in slide-in-from-top-4">
                                        <div className="p-3 bg-emerald-900 text-ivory rounded-lg shadow-inner">
                                            <p className="text-[10px] font-accent uppercase tracking-widest text-gold-400 mb-2">Secret Key (Save it now!):</p>
                                            <div className="flex items-center space-x-2">
                                                <code className="flex-1 text-sm font-mono break-all font-bold selection:bg-gold-500/30">
                                                    {newFullKey}
                                                </code>
                                                <button
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                                    onClick={() => copyToClipboard(newFullKey)}
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2 bg-sand/50 p-3 rounded-lg mb-3 border border-emerald-900/5">
                                    <code className="flex-1 text-sm font-mono text-charcoal opacity-70">
                                        {key.keyPrefix}*****************************
                                    </code>
                                    <button
                                        className="p-2 hover:bg-emerald-900/5 rounded transition-all"
                                        onClick={() => {
                                            if (newFullKey && newFullKey.startsWith(key.keyPrefix)) {
                                                copyToClipboard(newFullKey)
                                            } else {
                                                copyToClipboard(key.keyPrefix)
                                                toast('Only prefix copied. Key is secret.', 'info')
                                            }
                                        }}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between text-[11px]">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-charcoal/40 font-body">
                                            Usage: {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'None yet'}
                                        </span>
                                        <button
                                            onClick={() => handleRotateKey(key.id)}
                                            disabled={loading}
                                            className="text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 font-accent"
                                        >
                                            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                                            <span>Refresh Key</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
        </IslamicCard>
    )
}
