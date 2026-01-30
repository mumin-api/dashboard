import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, Code } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { LandingContent } from '@/components/landing/landing-content'

async function getUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) return null

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/v1'
        const res = await fetch(`${apiUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Cookie: `access_token=${token}`
            },
            cache: 'no-store'
        })

        if (res.ok) {
            return await res.json()
        }
        return null
    } catch (e) {
        return null
    }
}

export default async function LandingPage() {
    const user = await getUser()

    return (
        <div className="relative min-h-screen bg-gradient-islamic overflow-hidden">
            {/* Background Pattern */}
            <GeometricPattern className="absolute inset-0 opacity-[0.03]" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-emerald-900/20 via-transparent to-sapphire-900/20 animate-pulse-glow" />

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-900 font-display text-2xl">م</span>
                        </div>
                        <span className="text-ivory font-display text-2xl">Mumin API</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <Link href="/dashboard">
                                <button className="bg-gold-500 hover:bg-gold-600 text-emerald-900 px-6 py-2 rounded-lg font-accent flex items-center">
                                    <span className="mr-2">Dashboard</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="text-ivory hover:text-gold-400 px-4 py-2">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/register">
                                    <button className="bg-gold-500 hover:bg-gold-600 text-emerald-900 px-6 py-2 rounded-lg font-accent">
                                        Get Started
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Content Component (Client Side for animations) */}
            <LandingContent user={user} />
        </div>
    )
}
