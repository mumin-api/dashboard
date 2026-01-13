import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'
import { gdprAPI } from '@/lib/api/gdpr'

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkConsent = async () => {
            try {
                // Try to fetch consent from DB
                const data = await gdprAPI.getConsent()

                // If we have any consent data, don't show the banner
                if (data && Object.keys(data).length > 0) {
                    setIsVisible(false)
                } else {
                    setIsVisible(true)
                }
            } catch (error) {
                // If unauthorized or error, show banner as it might be the login page
                const localConsent = localStorage.getItem('mumin-cookie-consent')
                if (!localConsent) {
                    setIsVisible(true)
                }
            } finally {
                setIsLoading(false)
            }
        }

        checkConsent()
    }, [])

    const saveConsent = async (type: 'accepted' | 'declined') => {
        const consentData = {
            status: type,
            timestamp: new Date().toISOString(),
            version: '1.0',
        }

        // 1. UI feedback
        localStorage.setItem('mumin-cookie-consent', type)
        setIsVisible(false)

        // 2. Sync to DB
        try {
            await gdprAPI.updateConsent(consentData)
        } catch (error) {
            console.warn('Could not sync consent to DB:', error)
        }
    }

    const handleAccept = () => saveConsent('accepted')
    const handleDecline = () => saveConsent('declined')

    if (isLoading) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-[999] md:left-auto md:right-8 md:max-w-md"
                >
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-2xl backdrop-blur-xl border border-emerald-100/50 dark:bg-emerald-950/90 dark:border-emerald-800/50">
                        {/* Decorative background element */}
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl" />

                        <div className="relative">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-emerald-900 dark:text-emerald-100">
                                    <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/50">
                                        <Cookie className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h3 className="font-display text-lg font-bold">Cookie Consent</h3>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="rounded-full p-1 text-emerald-500/50 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/50 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="mb-6 text-sm leading-relaxed text-emerald-800/80 dark:text-emerald-200/70">
                                We use cookies to enhance your experience, analyze site traffic, and prevent fraud. By clicking "Accept All", you agree to our use of cookies according to our{' '}
                                <Link href="/legal/privacy" className="font-medium text-emerald-600 underline decoration-emerald-500/30 underline-offset-4 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                                    Privacy Policy
                                </Link>.
                            </p>

                            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 text-center">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-gold-400 transition-all hover:bg-emerald-800 active:scale-[0.98] dark:bg-emerald-800 dark:hover:bg-emerald-700"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-100/50 active:scale-[0.98] dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
                                >
                                    Essentials Only
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
