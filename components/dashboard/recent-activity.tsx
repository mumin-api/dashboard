'use client'

import { useEffect, useState } from 'react'
import { Clock, ArrowUpRight, ArrowDownRight, AlertTriangle, Gift, Loader2 } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { billingApi } from '@/lib/api/billing'
import type { Transaction } from '@/types/api'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'

export function RecentActivity() {
    const t = useTranslations('Dashboard.recentActivity')
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    function timeAgo(dateStr: string): string {
        const diff = Date.now() - new Date(dateStr).getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 1) return t('time.justNow')
        if (mins < 60) return t('time.minutes', { mins })
        const hrs = Math.floor(mins / 60)
        if (hrs < 24) return t('time.hours', { hrs })
        const days = Math.floor(hrs / 24)
        return t('time.days', { days })
    }

    const TYPE_CONFIG: Record<string, { icon: any; color: string; labelKey: string }> = {
        top_up:        { icon: ArrowUpRight,   color: '#34d399', labelKey: 'top_up' },
        usage:         { icon: ArrowDownRight, color: 'rgba(255,255,255,0.4)', labelKey: 'usage' },
        refund:        { icon: ArrowUpRight,   color: '#60a5fa', labelKey: 'refund' },
        bonus:         { icon: Gift,           color: '#fbbf24', labelKey: 'bonus' },
        inactivity_fee:{ icon: AlertTriangle,  color: '#f87171', labelKey: 'inactivity_fee' },
    }

    useEffect(() => {
        billingApi.getTransactions(1, 8)
            .then(res => setTransactions(res.data || []))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    return (
        <IslamicCard>
            <div className="p-6">
                <h3 className="text-base font-display font-bold mb-5 uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
                    {t('title')}
                </h3>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                )}

                {error && (
                    <p className="text-center py-8 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {t('failed')}
                    </p>
                )}

                {!loading && !error && transactions.length === 0 && (
                    <p className="text-center py-8 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {t('noActivity')}
                    </p>
                )}

                {!loading && !error && transactions.length > 0 && (
                    <div className="space-y-1">
                        {transactions.map((tx) => {
                            const cfg = TYPE_CONFIG[tx.type] || TYPE_CONFIG.usage
                            const Icon = cfg.icon
                            const isPositive = tx.amount > 0

                            return (
                                <div key={tx.id}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                                    style={{ cursor: 'default' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    {/* Icon */}
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${cfg.color}18` }}>
                                        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-accent truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>
                                            {tx.description || t(`types.${cfg.labelKey}`)}
                                        </p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.2)' }} />
                                            <span className="text-xs font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>
                                                {timeAgo(tx.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <span className="text-sm font-display font-bold flex-shrink-0"
                                        style={{ color: isPositive ? '#34d399' : 'rgba(255,255,255,0.35)' }}>
                                        {isPositive ? '+' : ''}{tx.amount.toLocaleString()}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}

                {!loading && !error && (
                    <Link href="/billing" className="block w-full mt-4 text-center py-2 text-xs font-accent uppercase tracking-widest transition-colors"
                        style={{ color: 'rgba(52,211,153,0.6)' }}
                        onMouseEnter={(e: React.MouseEvent) => (e.currentTarget as HTMLElement).style.color = '#34d399'}
                        onMouseLeave={(e: React.MouseEvent) => (e.currentTarget as HTMLElement).style.color = 'rgba(52,211,153,0.6)'}>
                        {t('viewAllFull')}
                    </Link>
                )}
            </div>
        </IslamicCard>
    )
}
