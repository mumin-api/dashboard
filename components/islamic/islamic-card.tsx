'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface IslamicCardProps {
    children: ReactNode
    className?: string
    hover?: boolean
    glow?: boolean
}

export function IslamicCard({
    children,
    className = '',
    hover = true,
    glow = false,
}: IslamicCardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -2 } : {}}
            transition={{ duration: 0.25 }}
            className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
            style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: glow
                    ? '0 0 30px rgba(5,150,105,0.15)'
                    : '0 4px 24px rgba(0,0,0,0.3)',
            }}
        >
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(5,150,105,0.3), transparent)' }} />

            {children}
        </motion.div>
    )
}
