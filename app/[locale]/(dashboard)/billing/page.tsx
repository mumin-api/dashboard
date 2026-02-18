'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Download, Plus } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'
import { billingApi } from '@/lib/api/billing'
import { useTranslations } from 'next-intl'

export default function BillingPage() {
    const t = useTranslations('Billing')
    const tc = useTranslations('Common')
    const [balance, setBalance] = useState<any>(null)
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [balanceData, txData] = await Promise.all([
                    billingApi.getBalance(),
                    billingApi.getTransactions()
                ])
                setBalance(balanceData)

                // Handle various potential response structures
                const txArray = (txData as any).data || (Array.isArray(txData) ? txData : [])
                setTransactions(Array.isArray(txArray) ? txArray : [])
            } catch (error) {
                console.error('Failed to fetch billing data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <div className="p-8 text-center text-charcoal">{t('loading')}</div>

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display text-emerald-900">{t('title')}</h1>
                    <p className="text-charcoal/60 mt-2 font-body">
                        {t('description')}
                    </p>
                </div>

                <button className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-emerald-900 rounded-lg font-accent flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('topUp')}
                </button>
            </div>

            {/* Current Balance */}
            <IslamicCard glow>
                <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/10 rounded-full mb-4">
                        <CreditCard className="w-8 h-8 text-gold-500" />
                    </div>
                    <h3 className="text-lg font-accent text-charcoal/60 mb-2">{t('currentBalance')}</h3>
                    <p className="text-5xl font-display text-emerald-900 mb-2">
                        {(balance?.balance || 0).toLocaleString()}
                    </p>
                    <p className="text-charcoal/60 font-body">{t('credits')}</p>
                </div>
            </IslamicCard>

            {/* Pricing Tiers */}
            <div>
                <h2 className="text-2xl font-display text-emerald-900 mb-6">{t('packages')}</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { credits: 10000, price: '$10', popular: false },
                        { credits: 50000, price: '$45', popular: true },
                        { credits: 100000, price: '$80', popular: false },
                    ].map((pkg) => (
                        <IslamicCard key={pkg.credits} hover>
                            <div className="p-6 relative">
                                {pkg.popular && (
                                    <div className="absolute top-0 right-0 bg-gold-500 text-emerald-900 text-xs font-accent px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                        {t('popular')}
                                    </div>
                                )}

                                <div className="text-center">
                                    <p className="text-3xl font-display text-emerald-900 mb-2">
                                        {pkg.credits.toLocaleString()}
                                    </p>
                                    <p className="text-charcoal/60 font-body mb-4">{t('credits')}</p>
                                    <p className="text-4xl font-display text-gold-500 mb-6">{pkg.price}</p>

                                    <button className="w-full px-4 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent">
                                        {t('purchase')}
                                    </button>
                                </div>
                            </div>
                        </IslamicCard>
                    ))}
                </div>
            </div>

            {/* Transaction History */}
            <IslamicCard>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-display text-emerald-900">{t('history')}</h3>
                        <button className="px-4 py-2 border border-emerald-900/20 hover:bg-sand rounded-lg text-sm font-accent flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            {t('export')}
                        </button>
                    </div>

                    <div className="space-y-3">
                        {!Array.isArray(transactions) || transactions.length === 0 ? (
                            <div className="text-center p-4 text-charcoal/60">{t('noTransactions')}</div>
                        ) : (
                            transactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="flex items-center justify-between p-4 border border-emerald-900/10 rounded-lg"
                                >
                                    <div>
                                        <p className="font-accent text-charcoal">
                                            {tx.type === 'credit' ? t('creditPurchase') : t('usageDeduction')}
                                        </p>
                                        <p className="text-sm text-charcoal/60 font-body">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className={`font-accent ${tx.type === 'credit' ? 'text-emerald-600' : 'text-charcoal'
                                            }`}>
                                            {tx.type === 'credit' ? '+' : ''}{tx.amount.toLocaleString()} {t('credits')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
