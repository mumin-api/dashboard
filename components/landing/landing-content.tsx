'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, Code, Terminal, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Redis caching ensures sub-50ms response times globally',
        color: '#f59e0b',
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'API key auth with rate limiting and IP allowlisting',
        color: '#059669',
    },
    {
        icon: Globe,
        title: 'Multi-Language',
        description: 'Arabic, English, Russian, Uzbek, Turkish and more',
        color: '#3b82f6',
    },
    {
        icon: Code,
        title: 'Developer Friendly',
        description: 'RESTful API with OpenAPI docs and SDK support',
        color: '#a855f7',
    },
]

const CODE_EXAMPLE = `curl -X GET \\
  "https://api.mumin.ink/v1/hadiths/random" \\
  -H "X-API-Key: mk_live_••••••••••••" \\
  -H "Accept-Language: en"

# Response
{
  "success": true,
  "data": {
    "id": 7241,
    "collection": "bukhari",
    "hadithNumber": "1",
    "textEnglish": "Actions are judged by intentions...",
    "grade": "Sahih"
  }
}`

const FloatingOrb = ({ size, x, y, color, delay = 0 }: { size: number; x: string; y: string; color: string; delay?: number }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(80px)', opacity: 0.12 }}
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
)

export function LandingContent({ user }: { user: any }) {
    return (
        <>
            {/* Floating orbs */}
            <FloatingOrb size={500} x="-5%" y="5%" color="radial-gradient(circle, #059669, transparent)" delay={0} />
            <FloatingOrb size={400} x="65%" y="-10%" color="radial-gradient(circle, #f59e0b, transparent)" delay={2} />
            <FloatingOrb size={300} x="30%" y="60%" color="radial-gradient(circle, #3b82f6, transparent)" delay={4} />

            {/* Hero Section */}
            <section className="relative z-10 container mx-auto px-6 pt-16 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border text-sm font-accent"
                        style={{ backgroundColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)', color: '#f59e0b' }}
                    >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Authentic Islamic Hadith API — Now in Production
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display text-ivory mb-6 leading-[1.05] tracking-tight"
                    >
                        Access{' '}
                        <span className="text-gold-400">50,000+</span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-gold-400 text-transparent bg-clip-text">
                            Authentic Hadiths
                        </span>
                        <br />
                        via API
                    </motion.h1>

                    {/* Arabic subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-display text-ivory/20 mb-6"
                        dir="rtl"
                    >
                        الحديث النبوي الشريف
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-ivory/70 mb-12 max-w-2xl mx-auto font-body leading-relaxed"
                    >
                        Production-ready RESTful API with multi-language support,
                        enterprise security, and Islamic design principles at its core.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                    >
                        {user ? (
                            <Link href="/dashboard">
                                <button className="group flex items-center gap-3 px-8 py-4 rounded-full font-accent text-lg font-bold text-emerald-900 hover:scale-105 transition-all shadow-2xl"
                                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 20px 60px rgba(245,158,11,0.35)' }}>
                                    Go to Dashboard
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        ) : (
                            <Link href="/register">
                                <button className="group flex items-center gap-3 px-8 py-4 rounded-full font-accent text-lg font-bold text-emerald-900 hover:scale-105 transition-all shadow-2xl"
                                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 20px 60px rgba(245,158,11,0.35)' }}>
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        )}

                        <a href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '')}/docs`} target="_blank" rel="noopener noreferrer">
                            <button className="flex items-center gap-3 px-8 py-4 rounded-full font-accent text-lg border hover:scale-105 transition-all"
                                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
                                <Terminal className="w-5 h-5" />
                                View Docs
                            </button>
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {[
                            { label: 'Hadiths', value: '50,000+' },
                            { label: 'Languages', value: '7' },
                            { label: 'Uptime', value: '99.9%' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl font-display text-gold-400 mb-1">{stat.value}</div>
                                <div className="text-ivory/50 font-body text-sm uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Code Preview */}
            <section className="relative z-10 container mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="rounded-[2rem] overflow-hidden border"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(245,158,11,0.15)', backdropFilter: 'blur(20px)' }}>
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 px-6 py-4 border-b"
                            style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            <span className="ml-4 text-xs font-mono text-ivory/30">mumin-api — bash</span>
                        </div>
                        <pre className="p-8 text-sm font-mono leading-relaxed overflow-x-auto"
                            style={{ color: 'rgba(255,255,255,0.75)' }}>
                            <code>{CODE_EXAMPLE}</code>
                        </pre>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 container mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">Why Mumin API</p>
                    <h2 className="text-4xl md:text-5xl font-display text-ivory mb-4">
                        Built for <span className="text-gold-400">Developers</span>
                    </h2>
                    <p className="text-ivory/60 max-w-xl mx-auto">
                        Everything you need to build world-class Islamic applications.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="group relative p-6 rounded-[1.5rem] border overflow-hidden transition-all duration-500"
                                style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse at top left, ${feature.color}18 0%, transparent 60%)` }} />
                                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }} />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: `${feature.color}18` }}>
                                        <Icon className="w-6 h-6" style={{ color: feature.color }} />
                                    </div>
                                    <h3 className="text-lg font-display text-ivory mb-2">{feature.title}</h3>
                                    <p className="text-ivory/60 font-body text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="relative z-10 container mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16 text-center border"
                    style={{ backgroundColor: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}
                >
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full -mr-48 -mt-48 blur-3xl opacity-10"
                        style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
                    <div className="relative z-10">
                        <p className="text-5xl font-display text-ivory/10 mb-6">بِسْمِ اللَّهِ</p>
                        <h2 className="text-3xl md:text-4xl font-display text-ivory mb-4">
                            Ready to Build?
                        </h2>
                        <p className="text-ivory/60 mb-10 max-w-lg mx-auto">
                            Join developers building the next generation of Islamic applications.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {[
                                'Free tier available',
                                'No credit card required',
                                'Instant API key',
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2 text-sm text-ivory/70">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="mt-10">
                            <Link href={user ? '/dashboard' : '/register'}>
                                <button className="px-10 py-4 rounded-full font-accent font-bold text-emerald-900 hover:scale-105 transition-all shadow-2xl"
                                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 20px 60px rgba(245,158,11,0.3)' }}>
                                    {user ? 'Go to Dashboard' : 'Get Started Free'}
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-ivory/30 text-sm font-body">© 2025 Mumin API. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-sm text-ivory/30">
                        <a href="/privacy" className="hover:text-ivory/60 transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-ivory/60 transition-colors">Terms</a>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '')}/docs`} target="_blank" rel="noopener noreferrer" className="hover:text-ivory/60 transition-colors">API Docs</a>
                    </div>
                </div>
            </footer>
        </>
    )
}
