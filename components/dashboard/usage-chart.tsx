'use client'

import { IslamicCard } from '@/components/islamic/islamic-card'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const mockData = [
    { date: 'Jan 1', requests: 1200 },
    { date: 'Jan 2', requests: 1800 },
    { date: 'Jan 3', requests: 1600 },
    { date: 'Jan 4', requests: 2200 },
    { date: 'Jan 5', requests: 2400 },
    { date: 'Jan 6', requests: 2100 },
    { date: 'Jan 7', requests: 2800 },
]

export function UsageChart() {
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

                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData}>
                            <defs>
                                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="requests"
                                stroke="#059669"
                                strokeWidth={3}
                                fill="url(#colorRequests)"
                                dot={{ fill: '#059669', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </IslamicCard>
    )
}
