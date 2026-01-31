'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { authApi } from '@/lib/api/auth'

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showVerifiedMessage, setShowVerifiedMessage] = useState(false)

    useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            setShowVerifiedMessage(true)
            // Hide message after 5 seconds
            setTimeout(() => setShowVerifiedMessage(false), 5000)
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await authApi.login({
                email: formData.email,
                password: formData.password,
            })

            const returnUrl = searchParams.get('returnUrl') || '/dashboard'
            window.location.href = returnUrl
        } catch (err: any) {
            // Check if email is not verified
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
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="flex items-center justify-center p-8 bg-ivory">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 bg-emerald-900 rounded-lg flex items-center justify-center">
                            <span className="text-gold-400 font-display text-2xl">م</span>
                        </div>
                        <span className="text-emerald-900 font-display text-2xl">Mumin API</span>
                    </div>

                    <h2 className="text-xl font-display text-emerald-900">Welcome to Mumin&apos;s API</h2>
                    <h1 className="text-4xl font-display text-emerald-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-charcoal/60 mb-8 font-body">
                        Sign in to access your dashboard
                    </p>

                    {showVerifiedMessage && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-800 text-sm font-accent">
                                Email verified successfully! You can now log in.
                            </span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-accent text-charcoal">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-11 h-12 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-accent text-charcoal">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-11 h-12 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                    className="w-4 h-4 text-emerald-600 border-emerald-900/20 rounded focus:ring-emerald-600"
                                />
                                <label className="text-sm text-charcoal/70 font-body">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-emerald-600 hover:underline font-accent">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-emerald-900 hover:bg-emerald-800 text-ivory font-accent rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-charcoal/60 font-body">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-emerald-600 hover:underline font-accent">
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right side - Islamic Design */}
            <div className="hidden lg:block relative bg-gradient-islamic overflow-hidden">
                <GeometricPattern className="absolute inset-0 opacity-[0.05]" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-md"
                    >
                        <div className="w-32 h-32 mx-auto mb-8 bg-gold-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-gold-400/50">
                            <span className="text-6xl">📖</span>
                        </div>

                        <h2 className="text-4xl font-display text-ivory mb-4">
                            Access Your Dashboard
                        </h2>
                        <p className="text-ivory/80 font-body text-lg">
                            Manage your API keys, view analytics, and track usage
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900"></div></div>}>
            <LoginContent />
        </Suspense>
    )
}
