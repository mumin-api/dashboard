'use client'

import { Clock } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'

interface Activity {
    id: string
    type: 'request' | 'topup' | 'error'
    description: string
    timestamp: string
    status: 'success' | 'warning' | 'error'
}

export function RecentActivity() {
    const activities: Activity[] = [
        {
            id: '1',
            type: 'request',
            description: 'GET /v1/hadiths/1234',
            timestamp: '2 minutes ago',
            status: 'success',
        },
        {
            id: '2',
            type: 'topup',
            description: 'Balance topped up: +10,000 credits',
            timestamp: '1 hour ago',
            status: 'success',
        },
        {
            id: '3',
            type: 'request',
            description: 'GET /v1/hadiths/search',
            timestamp: '3 hours ago',
            status: 'success',
        },
        {
            id: '4',
            type: 'error',
            description: 'Rate limit exceeded',
            timestamp: '5 hours ago',
            status: 'error',
        },
    ]

    const statusColors = {
        success: 'bg-emerald-500',
        warning: 'bg-gold-500',
        error: 'bg-rose-500',
    }

    return (
        <IslamicCard>
            <div className="p-6">
                <h3 className="text-xl font-display text-emerald-900 mb-6">Recent Activity</h3>

                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[activity.status]}`} />

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-body text-charcoal truncate">
                                    {activity.description}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Clock className="w-3 h-3 text-charcoal/40" />
                                    <span className="text-xs text-charcoal/60 font-body">
                                        {activity.timestamp}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-6 text-sm text-emerald-600 hover:text-emerald-700 font-accent">
                    View All Activity →
                </button>
            </div>
        </IslamicCard>
    )
}
