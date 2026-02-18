'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LandingNavbar({ user }: { user: any }) {
    return (
        <nav className="relative z-10 container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
                        <span className="text-gold-400 font-display text-2xl">م</span>
                    </div>
                    <div>
                        <span className="text-ivory font-display text-xl leading-none block">Mumin API</span>
                        <span className="text-[10px] font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            Developer Platform
                        </span>
                    </div>
                </div>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-accent"
                    style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <a href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '')}/docs`}
                        target="_blank" rel="noopener noreferrer"
                        className="hover:text-ivory transition-colors">Docs</a>
                    <Link href="/about" className="hover:text-ivory transition-colors">About</Link>
                </div>

                {/* Auth buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <Link href="/dashboard">
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-accent text-sm font-bold text-emerald-900 hover:scale-105 transition-all"
                                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                Dashboard <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login"
                                className="px-4 py-2 font-accent text-sm transition-colors hover:text-ivory"
                                style={{ color: 'rgba(255,255,255,0.5)' }}>
                                Login
                            </Link>
                            <Link href="/register">
                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-accent text-sm font-bold text-emerald-900 hover:scale-105 transition-all shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 8px 30px rgba(245,158,11,0.25)' }}>
                                    Get Started
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
