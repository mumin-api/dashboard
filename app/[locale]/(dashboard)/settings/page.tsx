'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Shield, Trash2 } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { authApi } from '@/lib/api/auth'
import { toast } from '@/components/ui/toast'
import { useTranslations } from 'next-intl'

export default function SettingsPage() {
    const t = useTranslations('Settings')
    const tc = useTranslations('Common')
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        displayName: '',
    })

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSaveProfile = async () => {
        try {
            setSaving(true)
            await authApi.updateProfile(formData)
            toast(t('profile.updated'), 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error: any) {
            console.error('Failed to update profile', error)
            toast(error.message || t('profile.fail'), 'error')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center text-charcoal">{t('loading')}</div>

    return (
        <div className="space-y-8">
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

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">{t('profile.email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">{t('profile.displayName')}</label>
                            <input
                                type="text"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleInputChange}
                                placeholder={t('profile.placeholder')}
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-ivory rounded-lg font-accent transition-all"
                        >
                            {saving ? tc('saving') : tc('save')}
                        </button>
                    </div>
                </div>
            </IslamicCard>

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
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">
                                {t('apiPref.ipWhitelist')}
                            </label>
                            <textarea
                                placeholder="192.168.1.1, 10.0.0.1"
                                rows={3}
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent">
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
                        <div className="p-4 border border-rose-200 bg-rose-50 rounded-lg">
                            <h4 className="font-accent text-charcoal mb-2">{t('danger.delete')}</h4>
                            <p className="text-sm text-charcoal/60 font-body mb-4">
                                {t('danger.deleteDesc')}
                            </p>
                            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-accent">
                                {t('danger.delete')}
                            </button>
                        </div>
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
