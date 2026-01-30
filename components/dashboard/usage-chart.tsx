'use client'

import { IslamicCard } from '@/components/islamic/islamic-card'

export function UsageChart() {
    // TODO: Connect to real API when endpoint is available
    const data: any[] = []

    return (
        <IslamicCard>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-display text-emerald-900">API Usage</h3>
                        <p className="text-sm text-charcoal/60 font-body">Last 7 days</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-sm font-body text-charcoal/60">Requests</span>
                        </div>
                    </div>
                </div>

                <div className="h-[300px] flex items-center justify-center bg-sand/30 rounded-lg">
                    <p className="text-charcoal/60 font-body">No usage logs available yet.</p>
                </div>
            </div>
        </IslamicCard>
    )
}
