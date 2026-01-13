'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { authApi } from '@/lib/api/auth'

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        acceptPrivacy: false,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (!formData.acceptTerms || !formData.acceptPrivacy) {
            setError('Please accept Terms of Service and Privacy Policy')
            return
        }

        setLoading(true)

        try {
            await authApi.register({
                email: formData.email,
                password: formData.password,
                acceptTerms: formData.acceptTerms,
                termsVersion: '2.0',
                acceptPrivacyPolicy: formData.acceptPrivacy,
                privacyPolicyVersion: '1.0',
            })

            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || 'Registration failed')
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

                    <h1 className="text-4xl font-display text-emerald-900 mb-2">
                        Create Account
                    </h1>
                    <p className="text-charcoal/60 mb-8 font-body">
                        Start your journey with authentic Hadith data
                    </p>

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

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-accent text-charcoal">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full pl-11 h-12 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms & Privacy */}
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                    className="mt-1 w-4 h-4 text-emerald-600 border-emerald-900/20 rounded focus:ring-emerald-600"
                                />
                                <label className="text-sm text-charcoal/70 font-body">
                                    I accept the{' '}
                                    <a href="#" className="text-emerald-600 hover:underline">
                                        Terms of Service
                                    </a>{' '}
                                    (v2.0)
                                </label>
                            </div>

                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptPrivacy}
                                    onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                                    className="mt-1 w-4 h-4 text-emerald-600 border-emerald-900/20 rounded focus:ring-emerald-600"
                                />
                                <label className="text-sm text-charcoal/70 font-body">
                                    I accept the{' '}
                                    <a href="#" className="text-emerald-600 hover:underline">
                                        Privacy Policy
                                    </a>{' '}
                                    (v1.0)
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !formData.acceptTerms || !formData.acceptPrivacy}
                            className="w-full h-12 bg-emerald-900 hover:bg-emerald-800 text-ivory font-accent rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                            {!loading && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-charcoal/60 font-body">
                        Already have an account?{' '}
                        <Link href="/login" className="text-emerald-600 hover:underline font-accent">
                            Sign in
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
                            <span className="text-6xl">🕌</span>
                        </div>

                        <h2 className="text-4xl font-display text-ivory mb-4">
                            Join Thousands of Developers
                        </h2>
                        <p className="text-ivory/80 font-body text-lg">
                            Building applications with authentic Islamic content
                        </p>

                        <div className="mt-12 space-y-4">
                            {['100 free credits', 'Instant API access', '24/7 support'].map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="flex items-center space-x-3 text-ivory/90"
                                >
                                    <div className="w-2 h-2 bg-gold-400 rounded-full" />
                                    <span className="font-body">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
