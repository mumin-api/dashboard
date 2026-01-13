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
    glow = false
}: IslamicCardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4 } : {}}
            transition={{ duration: 0.3 }}
            className={`
        relative overflow-hidden
        bg-white/90 backdrop-blur-sm
        border border-emerald-900/10
        rounded-2xl
        ${glow ? 'shadow-glow-emerald' : 'shadow-islamic'}
        ${hover ? 'hover:border-gold-500/30 hover:shadow-glow-gold' : ''}
        transition-all duration-300
        ${className}
      `}
        >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-900">
                    <path
                        d="M0,0 L100,0 L100,100 Z"
                        fill="currentColor"
                    />
                    <circle cx="85" cy="15" r="3" fill="white" />
                    <circle cx="70" cy="30" r="3" fill="white" />
                    <circle cx="55" cy="45" r="3" fill="white" />
                </svg>
            </div>

            {children}
        </motion.div>
    )
}
