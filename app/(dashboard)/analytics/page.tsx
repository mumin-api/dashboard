'use client'

import { BarChart3, Globe, Zap } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { StatsCard } from '@/components/dashboard/stats-card'

export default function AnalyticsPage() {
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
                    value="156,234"
                    subtitle="all time"
                    icon={<BarChart3 className="w-6 h-6" />}
                    color="emerald"
                />

                <StatsCard
                    title="Countries"
                    value="42"
                    subtitle="unique locations"
                    icon={<Globe className="w-6 h-6" />}
                    color="sapphire"
                />

                <StatsCard
                    title="Avg Speed"
                    value="38ms"
                    subtitle="response time"
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
                    <h3 className="text-xl font-display text-emerald-900 mb-6">
                        Geographic Distribution
                    </h3>

                    <div className="space-y-4">
                        {[
                            { country: 'United States', requests: 45230, percentage: 35 },
                            { country: 'United Kingdom', requests: 28450, percentage: 22 },
                            { country: 'Germany', requests: 19340, percentage: 15 },
                            { country: 'France', requests: 15670, percentage: 12 },
                            { country: 'Others', requests: 20544, percentage: 16 },
                        ].map((item) => (
                            <div key={item.country}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-body text-charcoal">{item.country}</span>
                                    <span className="text-sm font-accent text-emerald-600">
                                        {item.requests.toLocaleString()} ({item.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </IslamicCard>

            {/* Top Endpoints */}
            <IslamicCard>
                <div className="p-6">
                    <h3 className="text-xl font-display text-emerald-900 mb-6">
                        Top Endpoints
                    </h3>

                    <div className="space-y-3">
                        {[
                            { endpoint: 'GET /v1/hadiths', requests: 52340 },
                            { endpoint: 'GET /v1/hadiths/:id', requests: 38920 },
                            { endpoint: 'GET /v1/hadiths/random', requests: 28450 },
                            { endpoint: 'GET /v1/hadiths/search', requests: 19230 },
                        ].map((item) => (
                            <div
                                key={item.endpoint}
                                className="flex items-center justify-between p-4 border border-emerald-900/10 rounded-lg"
                            >
                                <code className="text-sm font-mono text-charcoal">{item.endpoint}</code>
                                <span className="text-sm font-accent text-emerald-600">
                                    {item.requests.toLocaleString()} requests
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
