import { motion } from 'framer-motion'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { LandingContent } from '@/components/landing/landing-content'
import { ArrowRight } from 'lucide-react'

async function getUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return null
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/v1'
        const res = await fetch(`${apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}`, Cookie: `access_token=${token}` },
            cache: 'no-store'
        })
        if (res.ok) return await res.json()
        return null
    } catch (e) {
        return null
    }
}

export default async function LandingPage() {
    const user = await getUser()

    return (
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#060d0a' }}>
            {/* Background Pattern */}
            <GeometricPattern className="absolute inset-0 opacity-[0.025]" />

            {/* Deep gradient overlay */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(5,150,105,0.12) 0%, transparent 60%)' }} />

            {/* Navbar */}
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
                                <Link href="/login">
                                    <button className="px-4 py-2 font-accent text-sm transition-colors"
                                        style={{ color: 'rgba(255,255,255,0.5)' }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                                        Login
                                    </button>
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

            {/* Content */}
            <LandingContent user={user} />
        </div>
    )
}
