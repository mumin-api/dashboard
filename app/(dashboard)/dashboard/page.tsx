'use client'

import { Key, TrendingUp, DollarSign, Activity } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { ApiKeyCard } from '@/components/dashboard/api-key-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'

export default function DashboardPage() {
    const stats = {
        balance: 45230,
        requestsToday: 1234,
        requestsThisMonth: 28450,
        avgResponseTime: 42,
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display text-emerald-900">
                        As-salamu alaykum, <span className="text-gold-500">Ahmad</span>
                    </h1>
                    <p className="text-charcoal/60 mt-2 font-body">
                        Here's what's happening with your API today
                    </p>
                </div>

                <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent flex items-center">
                    <Key className="w-4 h-4 mr-2" />
                    New API Key
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Balance"
                    value={`${stats.balance.toLocaleString()}`}
                    subtitle="credits"
                    icon={<DollarSign className="w-6 h-6" />}
                    trend={{ value: 12, isPositive: true }}
                    color="emerald"
                />

                <StatsCard
                    title="Today's Requests"
                    value={stats.requestsToday.toLocaleString()}
                    subtitle="requests"
                    icon={<Activity className="w-6 h-6" />}
                    trend={{ value: 8, isPositive: true }}
                    color="gold"
                />

                <StatsCard
                    title="This Month"
                    value={stats.requestsThisMonth.toLocaleString()}
                    subtitle="total requests"
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="sapphire"
                />

                <StatsCard
                    title="Avg Response"
                    value={`${stats.avgResponseTime}ms`}
                    subtitle="response time"
                    icon={<Activity className="w-6 h-6" />}
                    trend={{ value: 5, isPositive: true }}
                    color="emerald"
                />
            </div>

            {/* Usage Chart */}
            <UsageChart />

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* API Keys */}
                <div className="lg:col-span-2">
                    <ApiKeyCard />
                </div>

                {/* Recent Activity */}
                <div>
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}
