'use client'

import { useEffect, useState } from 'react'
import { Key, TrendingUp, DollarSign, Activity, Loader2 } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { ApiKeyCard } from '@/components/dashboard/api-key-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { authApi } from '@/lib/api/auth'
import { billingApi } from '@/lib/api/billing'

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [stats, setStats] = useState({
        balance: 0,
        requestsToday: 0,
        avgResponseTime: 42,
        totalRequests: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes: any = await authApi.getCurrentUser()
                setUser(userRes.user || userRes)

                try {
                    const balanceRes: any = await billingApi.getBalance()
                    setStats(prev => ({
                        ...prev,
                        balance: balanceRes?.balance ?? 0,
                        requestsToday: balanceRes?.requestsToday ?? 0,
                        totalRequests: balanceRes?.totalRequests ?? 0
                    }))
                } catch (e) {
                    console.error('Failed to fetch balance', e)
                }
            } catch (error) {
                console.error('Dashboard data fetch failed', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-display" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    As-salamu alaykum,{' '}
                    <span className="text-gold-400">{user?.displayName || user?.firstName || 'Sahabi'}</span>
                </h1>
                <p className="mt-2 font-body" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Here&apos;s what&apos;s happening with your API today
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Balance"
                    value={`${(stats?.balance ?? 0).toLocaleString()}`}
                    subtitle="credits remaining"
                    icon={<DollarSign className="w-6 h-6" />}
                    trend={{ value: 0, isPositive: true }}
                    color="gold"
                />
                <StatsCard
                    title="Today's Requests"
                    value={(stats?.requestsToday ?? 0).toLocaleString()}
                    subtitle="requests today"
                    icon={<Activity className="w-6 h-6" />}
                    trend={{ value: 0, isPositive: true }}
                    color="emerald"
                />
                <StatsCard
                    title="Total Requests"
                    value={(stats?.totalRequests ?? 0).toLocaleString()}
                    subtitle="lifetime"
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="sapphire"
                />
                <StatsCard
                    title="Avg Response"
                    value={`${stats?.avgResponseTime ?? 0}ms`}
                    subtitle="response time"
                    icon={<Activity className="w-6 h-6" />}
                    trend={{ value: 12, isPositive: true }}
                    color="emerald"
                />
            </div>

            {/* Usage Chart */}
            <UsageChart />

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ApiKeyCard />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}
