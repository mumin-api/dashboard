'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { authApi } from '@/lib/api/auth'

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({ email: '', password: '', remember: false })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showVerifiedMessage, setShowVerifiedMessage] = useState(false)

    useEffect(() => {
        const reason = searchParams.get('reason')
        const msg = searchParams.get('msg')
        if (reason) {
            let errorMsg = `Auth error: ${reason}`
            if (reason === 'no_token') errorMsg = "Your browser didn't send the authentication cookie. This usually means a domain mismatch."
            if (reason === 'middleware_error') errorMsg = `Connection to API failed: ${msg || 'Unknown error'}`
            if (reason === 'auth_failed') errorMsg = `Session invalid (Status: ${searchParams.get('status')})`
            setError(errorMsg)
        }
        if (searchParams.get('verified') === 'true') {
            setShowVerifiedMessage(true)
            setTimeout(() => setShowVerifiedMessage(false), 5000)
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await authApi.login({ email: formData.email, password: formData.password })
            const returnUrl = searchParams.get('returnUrl') || '/dashboard'
            window.location.href = returnUrl
        } catch (err: any) {
            const errorCode = err.response?.data?.error || err.error
            if (errorCode === 'EMAIL_NOT_VERIFIED') {
                const userEmail = err.response?.data?.email || formData.email
                router.push(`/verify-email?email=${encodeURIComponent(userEmail)}`)
                return
            }
            setError(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2" style={{ backgroundColor: '#0a0f0d' }}>
            {/* Left — Form */}
            <div className="flex items-center justify-center p-8 relative">
                {/* Subtle ambient */}
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
                            <span className="text-gold-400 font-display text-xl">م</span>
                        </div>
                        <span className="text-ivory font-display text-xl">Mumin API</span>
                    </div>

                    <p className="text-xs font-accent uppercase tracking-widest text-emerald-400 mb-3">Developer Console</p>
                    <h1 className="text-4xl font-display text-ivory mb-2">Welcome Back</h1>
                    <p className="mb-8 font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Sign in to access your dashboard
                    </p>

                    {showVerifiedMessage && (
                        <div className="mb-6 p-4 rounded-xl flex items-center gap-3"
                            style={{ backgroundColor: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-emerald-300 text-sm font-accent">
                                Email verified successfully! You can now log in.
                            </span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 rounded-xl text-sm font-body"
                            style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-11 pr-4 h-12 rounded-xl font-body text-sm outline-none transition-all"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'rgba(255,255,255,0.85)',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(52,211,153,0.4)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-11 pr-4 h-12 rounded-xl font-body text-sm outline-none transition-all"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'rgba(255,255,255,0.85)',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(52,211,153,0.4)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                    className="w-4 h-4 rounded"
                                    style={{ accentColor: '#059669' }}
                                />
                                <span className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-accent text-emerald-400 hover:text-emerald-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl font-accent font-bold text-sm tracking-widest uppercase text-emerald-900 hover:scale-[1.02] transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #34d399, #059669)', boxShadow: '0 10px 40px rgba(5,150,105,0.3)' }}
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm font-body" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-accent transition-colors">
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right — Islamic Design */}
            <div className="hidden lg:block relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 50%, #011c16 100%)' }}>
                <GeometricPattern className="absolute inset-0 opacity-[0.06]" />

                {/* Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(circle, #d4af37, transparent)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-15"
                    style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

                <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-md"
                    >
                        {/* Arabic calligraphy */}
                        <p className="text-7xl font-display text-white/10 mb-8">بِسْمِ اللَّهِ</p>

                        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                            <span className="text-4xl">📖</span>
                        </div>

                        <h2 className="text-3xl font-display text-ivory mb-4">
                            Access Your Dashboard
                        </h2>
                        <p className="text-ivory/60 font-body text-lg mb-10">
                            Manage API keys, view analytics, and track usage across all your applications.
                        </p>

                        {/* Feature list */}
                        <div className="space-y-3 text-left">
                            {[
                                '50,000+ authenticated hadiths',
                                '7 language translations',
                                'Real-time usage analytics',
                                'Enterprise-grade security',
                            ].map(item => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: 'rgba(52,211,153,0.15)' }}>
                                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                                    </div>
                                    <span className="text-sm font-body text-ivory/60">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0f0d' }}>
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    )
}
