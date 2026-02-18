'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Globe, Zap, Loader2 } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { StatsCard } from '@/components/dashboard/stats-card'
import { billingApi } from '@/lib/api/billing'
import { useTranslations } from 'next-intl'

export default function AnalyticsPage() {
    const t = useTranslations('Analytics')
    const tc = useTranslations('Common')
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        billingApi.getBalance()
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        </div>
    )

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-display" style={{ color: 'rgba(255,255,255,0.9)' }}>{t('title')}</h1>
                <p className="mt-2 font-body" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {t('description')}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title={t('totalRequests')}
                    value={(stats?.totalRequests || 0).toLocaleString()}
                    subtitle={t('allTime')}
                    icon={<BarChart3 className="w-6 h-6" />}
                    color="emerald"
                />
                <StatsCard
                    title={t('countries')}
                    value="—"
                    subtitle={t('uniqueLocations')}
                    icon={<Globe className="w-6 h-6" />}
                    color="sapphire"
                />
                <StatsCard
                    title={t('avgSpeed')}
                    value="42ms"
                    subtitle={t('responseTime')}
                    icon={<Zap className="w-6 h-6" />}
                    trend={{ value: 12, isPositive: true }}
                    color="gold"
                />
            </div>

            {/* Usage Over Time */}
            <UsageChart />

            {/* Geographic Distribution */}
            <IslamicCard>
                <div className="p-6">
                    <h3 className="text-base font-display font-bold mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        {t('geo.title')}
                    </h3>
                    <div className="text-center p-8 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                        <Globe className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.1)' }} />
                        <p className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            {t('geo.noData')}
                        </p>
                    </div>
                </div>
            </IslamicCard>

            {/* Top Endpoints */}
            <IslamicCard>
                <div className="p-6">
                    <h3 className="text-base font-display font-bold mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        {t('endpoints.title')}
                    </h3>
                    <div className="text-center p-8 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                        <BarChart3 className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.1)' }} />
                        <p className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            {t('endpoints.noData')}
                        </p>
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
