'use client'

import { useEffect, useState } from 'react'
import { Link, usePathname } from '@/lib/navigation' // Use localized Link and pathname
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import {
    LayoutDashboard,
    Key,
    CreditCard,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Coins,
    ChevronRight,
} from 'lucide-react'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { authApi } from '@/lib/api/auth'
import { billingApi } from '@/lib/api/billing'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const t = useTranslations('Sidebar')
    const td = useTranslations('Dashboard')
    const locale = useLocale()
    
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [balance, setBalance] = useState<number | null>(null)

    const navItems = [
        { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { href: '/api-keys', label: t('apiKeys'), icon: Key },
        { href: '/billing', label: t('billing'), icon: CreditCard },
        { href: '/analytics', label: t('analytics'), icon: BarChart3 },
        { href: '/settings', label: t('settings'), icon: Settings },
    ]

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
    }, [pathname])

    const initials = (user?.displayName || user?.firstName || 'A')[0].toUpperCase()

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#0a0f0d' }}>
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.025] pointer-events-none">
                <GeometricPattern />
            </div>
            {/* Ambient glow */}
            <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
            <aside className={`
                fixed top-0 left-0 h-full w-64 z-50 flex flex-col
                transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
                style={{
                    backgroundColor: 'rgba(10,15,13,0.95)',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                {/* Logo */}
                <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
                            <span className="text-gold-400 font-display text-xl">م</span>
                        </div>
                        <div>
                            <span className="text-ivory font-display text-lg leading-none block">Mumin API</span>
                            <span className="text-[10px] font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Developer Console</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="relative flex items-center gap-3 px-4 py-3 rounded-xl font-accent text-sm transition-all duration-200 group"
                                style={{
                                    backgroundColor: isActive ? 'rgba(5,150,105,0.15)' : 'transparent',
                                    color: isActive ? '#34d399' : 'rgba(255,255,255,0.5)',
                                    border: isActive ? '1px solid rgba(5,150,105,0.25)' : '1px solid transparent',
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                                        style={{ background: 'linear-gradient(180deg, #34d399, #059669)' }}
                                    />
                                )}
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                <span>{item.label}</span>
                                {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* Balance pill */}
                {balance !== null && (
                    <div className="mx-4 mb-4 p-4 rounded-xl border"
                        style={{ backgroundColor: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.15)' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Coins className="w-4 h-4 text-gold-400" />
                            <span className="text-xs font-accent uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {td('stats.balance')}
                            </span>
                        </div>
                        <p className="text-2xl font-display text-gold-400">{balance.toLocaleString()}</p>
                        <p className="text-[10px] font-body mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {td('stats.creditsRemaining')}
                        </p>
                    </div>
                )}

                {/* Language switch in sidebar for mobile/tablet */}
                <div className="px-4 mb-4 lg:hidden">
                    <LanguageSwitcher />
                </div>

                {/* Logout */}
                <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <button
                        onClick={() => authApi.logout().then(() => window.location.href = `/${locale}/login`)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-accent text-sm transition-all"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 border-b"
                    style={{ backgroundColor: 'rgba(10,15,13,0.8)', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
                    <div className="flex items-center justify-between px-6 py-4">
                        <button
                            className="lg:hidden p-2 rounded-lg transition-colors"
                            style={{ color: 'rgba(255,255,255,0.5)' }}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        {/* Page breadcrumb */}
                        <div className="hidden lg:flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            <span>Console</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-ivory/70">{navItems.find(n => n.href === pathname)?.label || 'Dashboard'}</span>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            {/* Language Switcher */}
                            <div className="hidden md:block">
                                <LanguageSwitcher />
                            </div>

                            {/* Balance chip */}
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-accent"
                                style={{ backgroundColor: 'rgba(5,150,105,0.08)', borderColor: 'rgba(5,150,105,0.2)', color: '#34d399' }}>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                {balance !== null ? balance.toLocaleString() : '...'} {td('stats.creditsRemaining').split(' ')[0]}
                            </div>

                            {/* User */}
                            <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-accent text-ivory/80 leading-none mb-1">
                                        {user?.displayName || 'Loading...'}
                                    </p>
                                    <p className="text-xs font-body leading-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                        {user?.email || ''}
                                    </p>
                                </div>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-display text-emerald-900 shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                    {initials}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="relative p-6 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
