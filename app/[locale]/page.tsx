import { cookies } from 'next/headers'
import { GeometricPattern } from '@/components/islamic/geometric-pattern'
import { LandingContent } from '@/components/landing/landing-content'
import { LandingNavbar } from '@/components/landing/landing-navbar'

async function getUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return null
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/v1'
        const res = await fetch(`${apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}`, Cookie: `access_token=${token}` },
            cache: 'no-store'
        })
        if (res.ok) return await res.json()
        return null
    } catch (e) {
        return null
    }
}

export default async function LandingPage() {
    const user = await getUser()

    return (
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#060d0a' }}>
            {/* Background Pattern */}
            <GeometricPattern className="absolute inset-0 opacity-[0.025]" />

            {/* Deep gradient overlay */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(5,150,105,0.12) 0%, transparent 60%)' }} />

            {/* Client Navbar */}
            <LandingNavbar user={user} />

            {/* Client Content */}
            <LandingContent user={user} />
        </div>
    )
}
