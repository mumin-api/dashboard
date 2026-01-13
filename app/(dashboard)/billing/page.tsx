'use client'

import { motion } from 'framer-motion'
import { CreditCard, Download, Plus } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'

export default function BillingPage() {
    const transactions = [
        {
            id: '1',
            type: 'top_up',
            amount: 10000,
            cost: '$10.00',
            date: '2024-01-10',
            status: 'completed',
        },
        {
            id: '2',
            type: 'deduction',
            amount: -1234,
            description: 'API usage',
            date: '2024-01-09',
            status: 'completed',
        },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display text-emerald-900">Billing</h1>
                    <p className="text-charcoal/60 mt-2 font-body">
                        Manage your credits and payment history
                    </p>
                </div>

                <button className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-emerald-900 rounded-lg font-accent flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Top Up Credits
                </button>
            </div>

            {/* Current Balance */}
            <IslamicCard glow>
                <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/10 rounded-full mb-4">
                        <CreditCard className="w-8 h-8 text-gold-500" />
                    </div>
                    <h3 className="text-lg font-accent text-charcoal/60 mb-2">Current Balance</h3>
                    <p className="text-5xl font-display text-emerald-900 mb-2">45,230</p>
                    <p className="text-charcoal/60 font-body">credits (~$45.23)</p>
                </div>
            </IslamicCard>

            {/* Pricing Tiers */}
            <div>
                <h2 className="text-2xl font-display text-emerald-900 mb-6">Credit Packages</h2>

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
                                        Popular
                                    </div>
                                )}

                                <div className="text-center">
                                    <p className="text-3xl font-display text-emerald-900 mb-2">
                                        {pkg.credits.toLocaleString()}
                                    </p>
                                    <p className="text-charcoal/60 font-body mb-4">credits</p>
                                    <p className="text-4xl font-display text-gold-500 mb-6">{pkg.price}</p>

                                    <button className="w-full px-4 py-3 bg-emerald-900 hover:bg-emerald-800 text-ivory rounded-lg font-accent">
                                        Purchase
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
                        <h3 className="text-xl font-display text-emerald-900">Transaction History</h3>
                        <button className="px-4 py-2 border border-emerald-900/20 hover:bg-sand rounded-lg text-sm font-accent flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </button>
                    </div>

                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="flex items-center justify-between p-4 border border-emerald-900/10 rounded-lg"
                            >
                                <div>
                                    <p className="font-accent text-charcoal">
                                        {tx.type === 'top_up' ? 'Credit Purchase' : 'API Usage'}
                                    </p>
                                    <p className="text-sm text-charcoal/60 font-body">{tx.date}</p>
                                </div>

                                <div className="text-right">
                                    <p className={`font-accent ${tx.type === 'top_up' ? 'text-emerald-600' : 'text-charcoal'
                                        }`}>
                                        {tx.type === 'top_up' ? '+' : ''}{tx.amount.toLocaleString()} credits
                                    </p>
                                    {tx.cost && (
                                        <p className="text-sm text-charcoal/60 font-body">{tx.cost}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </IslamicCard>
        </div>
    )
}
