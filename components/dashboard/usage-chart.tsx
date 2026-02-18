'use client'

import { useEffect, useState } from 'react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { analyticsApi } from '@/lib/api/analytics'
import { Loader2, TrendingUp } from 'lucide-react'
import type { UsageStats } from '@/types/api'
import { useTranslations, useLocale } from 'next-intl'

// Generate last N days as labels
function getLast7Days(locale: string): string[] {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return d.toLocaleDateString(locale, { weekday: 'short' })
    })
}

export function UsageChart() {
    const t = useTranslations('Dashboard.usage')
    const locale = useLocale()
    const [data, setData] = useState<UsageStats[]>([])
    const [loading, setLoading] = useState(true)
    const [totalToday, setTotalToday] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await analyticsApi.getUsageStats(7)
                if (Array.isArray(stats) && stats.length > 0) {
                    setData(stats)
                    const today = stats[stats.length - 1]?.requests ?? 0
                    setTotalToday(today)
                }
            } catch {
                // Endpoint not available or error — show empty state
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const labels = getLast7Days(locale)
    const maxVal = Math.max(...data.map(d => d.requests), 1)
    const totalWeek = data.reduce((s, d) => s + d.requests, 0)

    return (
        <IslamicCard hover={false}>
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-base font-display font-bold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                            {t('title')}
                        </h3>
                        <p className="text-xs font-body mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('subtitle')}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('thisWeek')}</p>
                            <p className="text-xl font-display text-emerald-400">{totalWeek.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('today')}</p>
                            <p className="text-xl font-display text-gold-400">{totalToday.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-xs font-body" style={{ color: 'rgba(255,255,255,0.35)' }}>{t('requests')}</span>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="h-[220px] flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                )}

                {!loading && data.length === 0 && (
                    <div className="h-[220px] flex flex-col items-center justify-center gap-3">
                        <TrendingUp className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.1)' }} />
                        <p className="text-sm font-body px-8 text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            {t('noData')}
                        </p>
                    </div>
                )}

                {!loading && data.length > 0 && (
                    <div className="relative">
                        {/* Y-axis grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                            {[1, 0.75, 0.5, 0.25, 0].map((frac) => (
                                <div key={frac} className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono w-8 text-right flex-shrink-0"
                                        style={{ color: 'rgba(255,255,255,0.2)' }}>
                                        {Math.round(maxVal * frac)}
                                    </span>
                                    <div className="flex-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        <div className="flex items-end gap-2 h-[220px] pl-10 pb-8">
                            {data.map((d, i) => {
                                const heightPct = maxVal > 0 ? (d.requests / maxVal) * 100 : 0
                                const isToday = i === data.length - 1

                                return (
                                    <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono mb-1"
                                            style={{ color: '#34d399' }}>
                                            {d.requests}
                                        </div>

                                        {/* Bar */}
                                        <div
                                            className="w-full rounded-t-lg transition-all duration-500 relative overflow-hidden"
                                            style={{
                                                height: `${Math.max(heightPct, 2)}%`,
                                                background: isToday
                                                    ? 'linear-gradient(180deg, #34d399, #059669)'
                                                    : 'rgba(5,150,105,0.25)',
                                                boxShadow: isToday ? '0 0 12px rgba(52,211,153,0.3)' : 'none',
                                            }}
                                        >
                                            {/* Shimmer on hover */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)' }} />
                                        </div>

                                        {/* Label */}
                                        <span className="text-[10px] font-accent mt-1"
                                            style={{ color: isToday ? '#34d399' : 'rgba(255,255,255,0.25)' }}>
                                            {labels[i]}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </IslamicCard>
    )
}
