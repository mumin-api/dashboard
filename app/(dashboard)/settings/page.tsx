'use client'

import { User, Bell, Shield, Trash2 } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-display text-emerald-900">Settings</h1>
                <p className="text-charcoal/60 mt-2 font-body">
                    Manage your account preferences and security
                </p>
            </div>

            {/* Profile Settings */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <User className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl font-display text-emerald-900">Profile</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">Email</label>
                            <input
                                type="email"
                                value="ahmad@example.com"
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">Display Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent">
                            Save Changes
                        </button>
                    </div>
                </div>
            </IslamicCard>

            {/* API Preferences */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl font-display text-emerald-900">API Preferences</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">Webhook URL</label>
                            <input
                                type="url"
                                placeholder="https://your-domain.com/webhook"
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-accent text-charcoal mb-2 block">
                                IP Whitelist (comma-separated)
                            </label>
                            <textarea
                                placeholder="192.168.1.1, 10.0.0.1"
                                rows={3}
                                className="w-full px-4 py-3 border border-emerald-900/20 rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent">
                            Update Preferences
                        </button>
                    </div>
                </div>
            </IslamicCard>

            {/* Notifications */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <Bell className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-xl font-display text-emerald-900">Notifications</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Low balance alerts', description: 'Get notified when balance is low' },
                            { label: 'Usage reports', description: 'Weekly usage summary emails' },
                            { label: 'Security alerts', description: 'Suspicious activity notifications' },
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
                        <h3 className="text-xl font-display text-rose-600">Danger Zone</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border border-rose-200 bg-rose-50 rounded-lg">
                            <h4 className="font-accent text-charcoal mb-2">Delete Account</h4>
                            <p className="text-sm text-charcoal/60 font-body mb-4">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-accent">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
