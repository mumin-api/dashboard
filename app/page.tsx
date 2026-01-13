'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, Code } from 'lucide-react'
import Link from 'next/link'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-gradient-islamic overflow-hidden">
            {/* Background Pattern */}
            <GeometricPattern className="absolute inset-0 opacity-[0.03]" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-emerald-900/20 via-transparent to-sapphire-900/20 animate-pulse-glow" />

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-900 font-display text-2xl">م</span>
                        </div>
                        <span className="text-ivory font-display text-2xl">Mumin API</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/login">
                            <button className="text-ivory hover:text-gold-400 px-4 py-2">
                                Login
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="bg-gold-500 hover:bg-gold-600 text-emerald-900 px-6 py-2 rounded-lg font-accent">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="inline-block mb-6 px-6 py-2 bg-emerald-900/30 backdrop-blur-sm border border-gold-500/30 rounded-full"
                    >
                        <span className="text-gold-400 text-sm font-accent">
                            🕌 Authentic Islamic Hadith API
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-display text-ivory mb-6 leading-tight">
                        Access <span className="text-gold-400">7,000+</span> Authentic
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-gold-400 text-transparent bg-clip-text">
                            Sahih al-Bukhari
                        </span>
                        <br />
                        Hadiths via API
                    </h1>

                    <p className="text-xl text-ivory/80 mb-10 max-w-2xl mx-auto font-body">
                        Production-ready RESTful API with multi-language support,
                        enterprise security, and Islamic design principles at its core.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <button className="bg-gold-500 hover:bg-gold-600 text-emerald-900 font-accent text-lg px-8 py-4 rounded-lg shadow-glow-gold group flex items-center">
                                Start Free Trial
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '')}/docs`} target="_blank" rel="noopener noreferrer">
                            <button className="border border-ivory/30 text-ivory hover:bg-ivory/10 font-accent text-lg px-8 py-4 rounded-lg flex items-center">
                                <Code className="mr-2" />
                                View Documentation
                            </button>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
                        {[
                            { label: 'Hadiths', value: '7,500+', icon: '📖' },
                            { label: 'Languages', value: '4', icon: '🌍' },
                            { label: 'Uptime', value: '99.9%', icon: '⚡' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-display text-gold-400 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-ivory/60 font-body text-sm">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: <Zap className="w-8 h-8" />,
                            title: 'Lightning Fast',
                            description: 'Redis caching ensures sub-50ms response times',
                        },
                        {
                            icon: <Shield className="w-8 h-8" />,
                            title: 'Enterprise Security',
                            description: 'API key authentication with rate limiting',
                        },
                        {
                            icon: <Globe className="w-8 h-8" />,
                            title: 'Multi-Language',
                            description: 'Arabic, English, Russian, Uzbek support',
                        },
                        {
                            icon: <Code className="w-8 h-8" />,
                            title: 'Developer Friendly',
                            description: 'RESTful API with comprehensive docs',
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 bg-emerald-900/20 backdrop-blur-sm border border-gold-500/20 rounded-2xl hover:border-gold-500/50 transition-all hover:shadow-glow-gold"
                        >
                            <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4 text-gold-400 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-display text-ivory mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-ivory/70 font-body text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
