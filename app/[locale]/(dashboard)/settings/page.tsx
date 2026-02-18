'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Shield, Trash2, Mail, Loader2, ArrowRight } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { authApi } from '@/lib/api/auth'
import { toast } from '@/components/ui/toast'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

export default function SettingsPage() {
    const t = useTranslations('Settings')
    const tc = useTranslations('Common')
    const locale = useLocale()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        displayName: '',
    })

    // Email Change flow states
    const [showVerifyModal, setShowVerifyModal] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [verifying, setVerifying] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)

    useEffect(() => {
        authApi.getCurrentUser()
            .then((res: any) => {
                const userData = res.user || res
                setUser(userData)
                setFormData({
                    email: userData.email || '',
                    displayName: userData.displayName || userData.firstName || '',
                })
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSaveProfile = async () => {
        try {
            setSaving(true)
            
            // Check if email is being changed
            if (formData.email !== user.email) {
                await authApi.requestEmailChange(formData.email)
                setShowVerifyModal(true)
                toast(tc('verificationCodeSent'), 'success')
                return
            }

            // Regular profile update (displayName only)
            await authApi.updateProfile({ displayName: formData.displayName })
            toast(t('success'), 'success')
            
            // Update local user state
            setUser({ ...user, displayName: formData.displayName })
        } catch (error: any) {
            console.error('Failed to update profile', error)
            toast(error.message || t('fail'), 'error')
        } finally {
            setSaving(false)
        }
    }

    const handleVerifyEmail = async () => {
        if (verificationCode.length !== 6) return
        try {
            setVerifying(true)
            await authApi.verifyEmailChange(verificationCode)
            toast(t('emailChange.success'), 'success')
            
            // Log out and redirect because session/token has changed
            setTimeout(() => {
                window.location.href = `/${locale}/login?reason=email_changed`
            }, 2000)
        } catch (error: any) {
            toast(error.message || t('emailChange.error'), 'error')
        } finally {
            setVerifying(false)
        }
    }

    const handleResendCode = async () => {
        if (resendCooldown > 0) return
        try {
            await authApi.requestEmailChange(formData.email)
            setResendCooldown(60)
            toast(tc('verificationCodeSent'), 'success')
        } catch (error: any) {
            toast(error.message || tc('error'), 'error')
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
    )

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-4xl font-display text-emerald-900">{t('title')}</h1>
                <p className="text-charcoal/60 mt-2 font-body">
                    {t('description')}
                </p>
            </div>

            {/* Profile Settings */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <User className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl font-display text-emerald-900">{t('profile.title')}</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-accent text-charcoal mb-2 block">{t('profile.email')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/40" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 border border-emerald-900/20 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 bg-white/50"
                                    />
                                </div>
                                {formData.email !== user?.email && (
                                    <p className="mt-2 text-xs text-amber-600 font-accent flex items-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        Changing email requires verification
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-accent text-charcoal mb-2 block">{t('profile.displayName')}</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    placeholder={t('profile.placeholder')}
                                    className="w-full px-4 py-3 border border-emerald-900/20 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 bg-white/50"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-3 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-ivory rounded-xl font-accent transition-all shadow-md active:scale-95"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {tc('saving')}
                                    </>
                                ) : tc('save')}
                            </button>
                        </div>
                    </div>
                </div>
            </IslamicCard>

            {/* Verification Modal */}
            <AnimatePresence>
                {showVerifyModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-md bg-ivory rounded-2xl shadow-2xl overflow-hidden border border-emerald-900/10"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-8 h-8 text-emerald-600" />
                                </div>
                                
                                <h3 className="text-2xl font-display text-emerald-900 mb-2">
                                    {t('emailChange.title')}
                                </h3>
                                <p className="text-sm text-charcoal/60 font-body mb-8 leading-relaxed">
                                    {t('emailChange.description').replace('{email}', formData.email)}
                                </p>

                                <div className="space-y-6">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="••••••"
                                        className="w-full text-center text-3xl tracking-[0.5em] py-4 border-2 border-emerald-900/20 rounded-xl focus:border-emerald-600 focus:outline-none font-display text-emerald-950 bg-emerald-50/30"
                                    />

                                    <button
                                        onClick={handleVerifyEmail}
                                        disabled={verifying || verificationCode.length !== 6}
                                        className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-ivory rounded-xl font-accent transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {verifying ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                {t('emailChange.verify')}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={handleResendCode}
                                            disabled={resendCooldown > 0}
                                            className="text-sm font-accent text-emerald-700 hover:text-emerald-600 disabled:opacity-50"
                                        >
                                            {resendCooldown > 0 
                                                ? t('emailChange.resendIn').replace('{seconds}', resendCooldown.toString())
                                                : t('emailChange.resend')
                                            }
                                        </button>
                                        
                                        <button
                                            onClick={() => {
                                                setShowVerifyModal(false)
                                                setFormData({ ...formData, email: user.email })
                                            }}
                                            className="text-sm font-accent text-charcoal/40 hover:text-charcoal/60"
                                        >
                                            {t('emailChange.cancel')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* API Preferences */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl font-display text-emerald-900">{t('apiPref.title')}</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">{t('apiPref.webhook')}</label>
                            <input
                                type="url"
                                placeholder="https://your-domain.com/webhook"
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 bg-white/50"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">
                                {t('apiPref.ipWhitelist')}
                            </label>
                            <textarea
                                placeholder="192.168.1.1, 10.0.0.1"
                                rows={3}
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-xl focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 bg-white/50"
                            />
                        </div>

                        <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-xl font-accent shadow-md transition-all active:scale-95">
                            {t('apiPref.update')}
                        </button>
                    </div>
                </div>
            </IslamicCard>

            {/* Notifications */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <Bell className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl font-display text-emerald-900">{t('notifications.title')}</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: t('notifications.lowBalance'), description: t('notifications.lowBalanceDesc') },
                            { label: t('notifications.usageReports'), description: t('notifications.usageReportsDesc') },
                            { label: t('notifications.securityAlerts'), description: t('notifications.securityAlertsDesc') },
                        ].map((item) => (
                            <div key={item.label} className="flex items-start justify-between">
                                <div>
                                    <p className="font-accent text-charcoal">{item.label}</p>
                                    <p className="text-sm text-charcoal/60 font-body">{item.description}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="mt-1 w-5 h-5 text-emerald-600 border-emerald-900/20 rounded focus:ring-emerald-600"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </IslamicCard>

            {/* Danger Zone */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <Trash2 className="w-5 h-5 text-rose-600" />
                        <h3 className="text-xl font-display text-rose-600">{t('danger.title')}</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border border-rose-200 bg-rose-50/50 rounded-xl">
                            <h4 className="font-accent text-charcoal mb-2">{t('danger.delete')}</h4>
                            <p className="text-sm text-charcoal/60 font-body mb-4">
                                {t('danger.deleteDesc')}
                            </p>
                            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-accent shadow-md transition-all active:scale-95">
                                {t('danger.delete')}
                            </button>
                        </div>
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
