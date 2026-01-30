'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ArrowRight, CheckCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { authApi } from '@/lib/api/auth'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/components/ui/toast'
import { useRef, useEffect } from 'react'

export default function RegisterPage() {
    const router = useRouter()
    const [step, setStep] = useState<'register' | 'verify'>('register')
    const [registeredEmail, setRegisteredEmail] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        acceptTerms: false,
        acceptPrivacy: false,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Verification state
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [resendCooldown, setResendCooldown] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(15 * 60)
    const [attemptsRemaining, setAttemptsRemaining] = useState(3)
    const [verifyError, setVerifyError] = useState<string | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Countdown timer
    useEffect(() => {
        if (step !== 'verify' || timeRemaining <= 0) return
        const timer = setInterval(() => {
            setTimeRemaining((prev) => Math.max(0, prev - 1))
        }, 1000)
        return () => clearInterval(timer)
    }, [timeRemaining, step])

    // Resend cooldown
    useEffect(() => {
        if (resendCooldown <= 0) return
        const timer = setInterval(() => {
            setResendCooldown((prev) => Math.max(0, prev - 1))
        }, 1000)
        return () => clearInterval(timer)
    }, [resendCooldown])

    const handleRegisterSubmit = async (e: React.FormEvent) => {
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
                firstName: formData.firstName,
                lastName: formData.lastName,
                acceptTerms: formData.acceptTerms,
                termsVersion: '2.0',
                acceptPrivacyPolicy: formData.acceptPrivacy,
                privacyPolicyVersion: '1.0',
            })

            // Registration successful - show verification form
            setRegisteredEmail(formData.email)
            setStep('verify')
            toast('Registration successful! Check your email for verification code.', 'success')
        } catch (err: any) {
            setError(err.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (index: number, value: string) => {
        if (value && !/^\d$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        setVerifyError(null)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        if (newCode.every((digit) => digit !== '') && !loading) {
            handleVerify(newCode.join(''))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6)
        setCode(newCode)

        const lastFilledIndex = newCode.findIndex((digit) => digit === '')
        const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex
        inputRefs.current[focusIndex]?.focus()

        if (pastedData.length === 6) {
            handleVerify(pastedData)
        }
    }

    const handleVerify = async (codeString: string) => {
        setLoading(true)
        setVerifyError(null)

        try {
            await apiClient.post('/auth/verify-email', {
                email: registeredEmail,
                code: codeString,
            })

            toast('Email verified successfully!', 'success')
            setTimeout(() => {
                router.push('/login?verified=true')
            }, 1500)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Verification failed'
            const remaining = err.response?.data?.remainingAttempts

            if (remaining !== undefined) {
                setAttemptsRemaining(remaining)
            }

            setVerifyError(errorMessage)
            setCode(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (resendCooldown > 0) return

        setLoading(true)
        setVerifyError(null)

        try {
            await apiClient.post('/auth/resend-code', { email: registeredEmail })
            toast('Verification code sent to your email', 'success')
            setResendCooldown(60)
            setTimeRemaining(15 * 60)
            setAttemptsRemaining(3)
            setCode(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to resend code'
            setVerifyError(errorMessage)
            toast(errorMessage, 'error')
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="flex items-center justify-center p-8 bg-ivory">
                <AnimatePresence mode="wait">
                    {step === 'register' ? (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
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
                                Get started with Mumin Hadith API
                            </p>

                            {error && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRegisterSubmit} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-accent text-emerald-900 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-accent text-emerald-900 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-accent text-emerald-900 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-accent text-emerald-900 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-accent text-emerald-900 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                                        <input
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="space-y-3">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                            className="mt-1 w-4 h-4 text-emerald-600 border-emerald-900/20 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-charcoal/80 font-body">
                                            I accept the <Link href="/terms" className="text-emerald-700 hover:underline">Terms of Service</Link>
                                        </span>
                                    </label>

                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.acceptPrivacy}
                                            onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                                            className="mt-1 w-4 h-4 text-emerald-600 border-emerald-900/20 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-charcoal/80 font-body">
                                            I accept the <Link href="/privacy" className="text-emerald-700 hover:underline">Privacy Policy</Link>
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-islamic text-ivory py-3 px-6 rounded-lg font-accent hover:shadow-glow-gold transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                                >
                                    <span>{loading ? 'Creating account...' : 'Create Account'}</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-charcoal/60 font-body">
                                Already have an account?{' '}
                                <Link href="/login" className="text-emerald-700 hover:underline font-accent">
                                    Sign in
                                </Link>
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="verify"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="w-full max-w-md"
                        >
                            {/* Verification Form */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
                                    <Mail className="w-8 h-8 text-ivory" />
                                </div>
                                <h1 className="text-2xl font-display text-emerald-900 mb-2">
                                    Verify Your Email
                                </h1>
                                <p className="text-sm text-charcoal/60 font-body">
                                    Enter the 6-digit code sent to
                                </p>
                                <p className="text-sm font-accent text-emerald-700 mt-1">
                                    {registeredEmail}
                                </p>
                            </div>

                            {/* Timer */}
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <Clock className="w-4 h-4 text-charcoal/40" />
                                <span className={`text-sm font-mono ${timeRemaining < 60 ? 'text-rose-600 font-bold' : 'text-charcoal/60'}`}>
                                    {formatTime(timeRemaining)}
                                </span>
                            </div>

                            {/* Code Input */}
                            <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        disabled={loading}
                                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all disabled:opacity-50"
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>

                            {/* Error */}
                            {verifyError && (
                                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start space-x-2">
                                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-rose-800 font-accent">{verifyError}</p>
                                        {attemptsRemaining > 0 && attemptsRemaining < 3 && (
                                            <p className="text-xs text-rose-600 mt-1">
                                                {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Resend */}
                            <button
                                onClick={handleResend}
                                disabled={resendCooldown > 0 || loading}
                                className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-emerald-900/10 rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-accent text-emerald-700"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span>
                                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                                </span>
                            </button>

                            <p className="text-xs text-center text-charcoal/40 mt-6 font-body">
                                Didn't receive the code? Check your spam folder.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Right side - Decorative */}
            <div className="hidden lg:flex items-center justify-center bg-gradient-islamic p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <GeometricPattern />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 text-center"
                >
                    <h2 className="text-4xl font-display text-ivory mb-6">
                        Access Authentic Hadith
                    </h2>
                    <p className="text-ivory/80 text-lg font-body max-w-md mx-auto">
                        Join thousands of developers building Islamic applications with our comprehensive Hadith API
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
