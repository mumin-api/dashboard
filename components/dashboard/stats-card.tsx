'use client'

import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'

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

const COLOR_MAP = {
    emerald: { bg: 'rgba(5,150,105,0.12)', icon: '#34d399', glow: 'rgba(5,150,105,0.15)', border: 'rgba(5,150,105,0.2)', text: '#34d399' },
    gold:    { bg: 'rgba(245,158,11,0.12)', icon: '#fbbf24', glow: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.2)', text: '#fbbf24' },
    sapphire:{ bg: 'rgba(59,130,246,0.12)', icon: '#60a5fa', glow: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
}

export function StatsCard({ title, value, subtitle, icon, trend, color = 'emerald' }: StatsCardProps) {
    const c = COLOR_MAP[color]

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative p-6 rounded-[1.5rem] border overflow-hidden group"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${c.glow} 0%, transparent 60%)` }} />
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${c.icon}, transparent)` }} />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: c.bg }}>
                        <span style={{ color: c.icon }}>{icon}</span>
                    </div>

                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-accent px-2 py-1 rounded-full`}
                            style={{
                                backgroundColor: trend.isPositive ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                                color: trend.isPositive ? '#34d399' : '#f87171',
                            }}>
                            {trend.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {trend.value}%
                        </div>
                    )}
                </div>

                <h3 className="text-xs font-accent uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {title}
                </h3>
                <p className="text-3xl font-display mb-1" style={{ color: c.text }}>{value}</p>
                <p className="text-xs font-body" style={{ color: 'rgba(255,255,255,0.25)' }}>{subtitle}</p>
            </div>
        </motion.div>
    )
}
