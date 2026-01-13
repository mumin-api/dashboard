'use client'

import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'

interface StatsCardProps {
    title: string
    value: string
    subtitle: string
    icon: React.ReactNode
    trend?: {
        value: number
        isPositive: boolean
    }
    color?: 'emerald' | 'gold' | 'sapphire'
}

export function StatsCard({
    title,
    value,
    subtitle,
    icon,
    trend,
    color = 'emerald'
}: StatsCardProps) {
    const colorClasses = {
        emerald: 'bg-emerald-500/10 text-emerald-600',
        gold: 'bg-gold-500/10 text-gold-600',
        sapphire: 'bg-sapphire-500/10 text-sapphire-600',
    }

    return (
        <IslamicCard hover glow={color === 'gold'}>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                        {icon}
                    </div>

                    {trend && (
                        <div className={`flex items-center space-x-1 text-sm font-accent ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                            {trend.isPositive ? (
                                <ArrowUp className="w-4 h-4" />
                            ) : (
                                <ArrowDown className="w-4 h-4" />
                            )}
                            <span>{trend.value}%</span>
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-sm font-accent text-charcoal/60">{title}</h3>
                    <p className="text-3xl font-display text-emerald-900">{value}</p>
                    <p className="text-xs text-charcoal/50 font-body">{subtitle}</p>
                </div>
            </div>
        </IslamicCard>
    )
}
