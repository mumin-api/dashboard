'use client'

import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-ivory relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <GeometricPattern />
            </div>

            {/* Header */}
            <header className="relative z-20 bg-emerald-900 shadow-islamic py-6">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-900 font-display text-xl">م</span>
                        </div>
                        <span className="text-ivory font-display text-xl">Mumin API</span>
                    </Link>
                    
                    <Link 
                        href="/register" 
                        className="flex items-center space-x-2 text-ivory/80 hover:text-gold-400 transition-colors font-accent text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Register</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-islamic p-8 lg:p-12 border border-emerald-900/10"
                >
                    <article className="prose prose-emerald lg:prose-lg max-w-none prose-headings:font-display prose-headings:text-emerald-900 prose-p:text-charcoal/80 prose-li:text-charcoal/80 prose-strong:text-emerald-800">
                        {children}
                    </article>
                </motion.div>
                
                <footer className="mt-12 text-center text-charcoal/40 text-sm font-body">
                    <p>&copy; {new Date().getFullYear()} Mumin Hadith API. All rights reserved.</p>
                </footer>
            </main>
        </div>
    )
}
