'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/components/ui/toast'

export default function VerifyEmailPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const emailParam = searchParams?.get('email')
    const [email, setEmail] = useState(emailParam || '')

    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
    const [attemptsRemaining, setAttemptsRemaining] = useState(3)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Update email when searchParams change
    useEffect(() => {
        if (emailParam) {
            setEmail(emailParam)
        }
    }, [emailParam])

    // Countdown timer for code expiration
    useEffect(() => {
        if (timeRemaining <= 0) return

        const timer = setInterval(() => {
            setTimeRemaining((prev) => Math.max(0, prev - 1))
        }, 1000)

        return () => clearInterval(timer)
    }, [timeRemaining])

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0) return

        const timer = setInterval(() => {
            setResendCooldown((prev) => Math.max(0, prev - 1))
        }, 1000)

        return () => clearInterval(timer)
    }, [resendCooldown])

    // Auto-focus first input
    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    const handleInputChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        setError(null)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        // Auto-submit when all 6 digits are entered
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

        // Focus last filled input or first empty
        const lastFilledIndex = newCode.findIndex((digit) => digit === '')
        const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex
        inputRefs.current[focusIndex]?.focus()

        // Auto-submit if complete
        if (pastedData.length === 6) {
            handleVerify(pastedData)
        }
    }

    const handleVerify = async (codeString: string) => {
        if (!email) {
            setError('Email address is missing')
            return
        }

        setLoading(true)
        setError(null)

        try {
            await apiClient.post('/auth/verify-email', {
                email,
                code: codeString,
            })

            setSuccess(true)
            toast('Email verified successfully!', 'success')

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login?verified=true')
            }, 2000)
        } catch (err: any) {
            console.error('Verification failed:', err)

            const errorCode = err.response?.data?.error || err.error
            const errorMessage = err.response?.data?.message || err.message || 'Verification failed'
            const remaining = err.response?.data?.remainingAttempts

            if (remaining !== undefined) {
                setAttemptsRemaining(remaining)
            }

            setError(errorMessage)
            setCode(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()

            // Handle specific errors
            if (errorCode === 'CODE_EXPIRED') {
                setTimeRemaining(0)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        if (resendCooldown > 0 || !email) return

        setLoading(true)
        setError(null)

        try {
            await apiClient.post('/auth/resend-code', { email })
            toast('Verification code sent to your email', 'success')
            setResendCooldown(60) // 60 second cooldown
            setTimeRemaining(15 * 60) // Reset timer
            setAttemptsRemaining(3) // Reset attempts
            setCode(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to resend code'
            setError(errorMessage)
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

    if (success) {
        return (
            <div className="min-h-screen bg-sand flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-display text-emerald-900 mb-2">Email Verified!</h1>
                    <p className="text-charcoal/60 font-body">Redirecting to login...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-sand flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <IslamicCard>
                        <div className="p-8">
                            {/* Header */}
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
                                    {email}
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
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        disabled={loading || success}
                                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                ))}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start space-x-2">
                                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-rose-800 font-accent">{error}</p>
                                        {attemptsRemaining > 0 && attemptsRemaining < 3 && (
                                            <p className="text-xs text-rose-600 mt-1">
                                                {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Resend Button */}
                            <button
                                onClick={handleResend}
                                disabled={resendCooldown > 0 || loading}
                                className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-emerald-900/10 rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-accent text-emerald-700"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span>
                                    {resendCooldown > 0
                                        ? `Resend in ${resendCooldown}s`
                                        : 'Resend Code'}
                                </span>
                            </button>

                            {/* Help Text */}
                            <p className="text-xs text-center text-charcoal/40 mt-6 font-body">
                                Didn't receive the code? Check your spam folder or click resend.
                            </p>
                        </div>
                    </IslamicCard>
                </motion.div>
            </div>
        </div>
    )
}
