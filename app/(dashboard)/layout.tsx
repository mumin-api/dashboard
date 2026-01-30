'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    Key,
    CreditCard,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
} from 'lucide-react'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { authApi } from '@/lib/api/auth'
import { billingApi } from '@/lib/api/billing'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/api-keys', label: 'API Keys', icon: Key },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [balance, setBalance] = useState<number | null>(null)

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const userRes: any = await authApi.getCurrentUser()
                setUser(userRes.user || userRes)

                const balanceRes: any = await billingApi.getBalance()
                setBalance(balanceRes?.balance ?? 0)
            } catch (error) {
                console.error('Failed to fetch header data', error)
            }
        }
        fetchHeaderData()
    }, [pathname]) // Refetch on navigation to keep it fresh

    return (
        <div className="min-h-screen bg-sand">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <GeometricPattern />
            </div>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-emerald-900/10
          transform transition-transform duration-300 z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Logo */}
                <div className="p-6 border-b border-emerald-900/10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center">
                            <span className="text-gold-400 font-display text-xl">م</span>
                        </div>
                        <span className="text-emerald-900 font-display text-xl">Mumin API</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  font-accent transition-all
                  ${isActive
                                        ? 'bg-emerald-900 text-ivory shadow-glow-emerald'
                                        : 'text-charcoal hover:bg-emerald-50 hover:text-emerald-900'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-900/10">
                    <button
                        onClick={() => authApi.logout().then(() => window.location.href = '/login')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-charcoal hover:text-rose-600 hover:bg-rose-50 rounded-lg font-accent transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-emerald-900/10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button
                            className="lg:hidden p-2 hover:bg-sand rounded-lg"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X /> : <Menu />}
                        </button>

                        <div className="flex items-center space-x-4 ml-auto">
                            {/* Balance Display */}
                            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-sm font-accent text-emerald-900">
                                    {balance !== null ? balance.toLocaleString() : '...'} tokens
                                </span>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center space-x-3 pl-4 border-l border-emerald-900/10">
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-accent text-emerald-900 leading-none mb-1">
                                        {user?.displayName || 'Loading...'}
                                    </p>
                                    <p className="text-xs font-body text-charcoal/60 leading-none">
                                        {user?.email || ''}
                                    </p>
                                </div>

                                <div className="w-10 h-10 bg-gradient-islamic rounded-full flex items-center justify-center text-ivory font-display shadow-glow-gold relative overflow-hidden group">
                                    <span className="relative z-10">
                                        {(user?.displayName || user?.firstName || 'A')[0].toUpperCase()}
                                    </span>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="relative p-6 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
