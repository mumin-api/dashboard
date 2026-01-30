'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Globe, Zap } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { StatsCard } from '@/components/dashboard/stats-card'
import { billingApi } from '@/lib/api/billing'

export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        billingApi.getBalance()
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="p-8 text-center text-charcoal">Loading analytics...</div>

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-display text-emerald-900">Analytics</h1>
                <p className="text-charcoal/60 mt-2 font-body">
                    Track your API usage and performance metrics
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Requests"
                    value={(stats?.totalRequests || 0).toLocaleString()}
                    subtitle="all time"
                    icon={<BarChart3 className="w-6 h-6" />}
                    color="emerald"
                />

                <StatsCard
                    title="Countries"
                    value="-"
                    subtitle="unique locations"
                    icon={<Globe className="w-6 h-6" />}
                    color="sapphire"
                />

                <StatsCard
                    title="Avg Speed"
                    value="-"
                    subtitle="response time"
                    icon={<Zap className="w-6 h-6" />}
                    trend={{ value: 0, isPositive: true }}
                    color="gold"
                />
            </div>

            {/* Usage Over Time */}
            <UsageChart />

            {/* Geographic Distribution */}
            <IslamicCard>
                <div className="p-6">
                    <h3 className="text-xl font-display text-emerald-900 mb-6">
                        Geographic Distribution
                    </h3>
                    <div className="text-center p-8 text-charcoal/60 bg-sand/30 rounded-lg">
                        No geographic data available yet.
                    </div>
                </div>
            </IslamicCard>

            {/* Top Endpoints */}
            <IslamicCard>
                <div className="p-6">
                    <h3 className="text-xl font-display text-emerald-900 mb-6">
                        Top Endpoints
                    </h3>
                    <div className="text-center p-8 text-charcoal/60 bg-sand/30 rounded-lg">
                        No endpoint data available yet.
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
