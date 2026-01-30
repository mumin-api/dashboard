'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/lib/api/auth'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'

export default function TelegramAuthPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('Verifying your Telegram account...')

    useEffect(() => {
        if (!token) {
            setStatus('error')
            setMessage('Invalid verification link. Token is missing.')
            return
        }

        const verify = async () => {
            try {
                // 1. Check if logged in
                try {
                    await authApi.getCurrentUser()
                } catch {
                    // Not logged in -> Redirect to login
                    const currentPath = `/auth/telegram?token=${token}`
                    router.push(`/login?returnUrl=${encodeURIComponent(currentPath)}`)
                    return
                }

                // 2. Claim Token
                await authApi.claimTelegram(token)
                
                setStatus('success')
                setMessage('Successfully linked your Telegram account!')
                
                // Redirect to dashboard after delay
                setTimeout(() => {
                    router.push('/dashboard')
                }, 3000)

            } catch (err: any) {
                console.error(err)
                setStatus('error')
                setMessage(err.response?.data?.message || 'Failed to link account. The link might be expired.')
            }
        }

        verify()
    }, [token, router])

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Status */}
            <div className="flex items-center justify-center p-8 bg-ivory">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md text-center"
                >
                    <div className="mb-6 flex justify-center">
                        {status === 'loading' && (
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-rose-600" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-display text-emerald-900 mb-4">
                        {status === 'loading' && 'Linking Account...'}
                        {status === 'success' && 'Account Linked!'}
                        {status === 'error' && 'Link Failed'}
                    </h1>
                    
                    <p className="text-charcoal/70 font-body mb-8">
                        {message}
                    </p>

                    {status === 'success' && (
                        <p className="text-sm text-emerald-600">
                             Redirecting to dashboard...
                        </p>
                    )}

                    {status === 'error' && (
                        <Link 
                            href="/dashboard"
                            className="inline-flex items-center justify-center h-10 px-6 bg-emerald-900 text-ivory rounded-lg hover:bg-emerald-800 transition-colors font-accent"
                        >
                            Return to Dashboard
                        </Link>
                    )}
                </motion.div>
            </div>

            {/* Right side - Pattern */}
            <div className="hidden lg:block relative bg-gradient-islamic overflow-hidden">
                <GeometricPattern className="absolute inset-0 opacity-[0.05]" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center text-ivory">
                     <span className="text-6xl mb-4">🤖</span>
                     <h2 className="text-3xl font-display">Telegram Integration</h2>
                </div>
            </div>
        </div>
    )
}
