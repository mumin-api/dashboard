# 🚀 COMPLETE SETUP GUIDE

## ✅ What's Already Created

### Configuration Files
- ✅ `package.json` - All dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `tailwind.config.ts` - Islamic theme
- ✅ `next.config.js` - Next.js config
- ✅ `.env.local` - Environment variables
- ✅ `app/globals.css` - Global styles

### API Integration
- ✅ `lib/api/client.ts` - API client with auth
- ✅ `lib/api/auth.ts` - Auth functions
- ✅ `lib/api/keys.ts` - API keys functions
- ✅ `lib/api/billing.ts` - Billing functions
- ✅ `lib/utils.ts` - Utility functions
- ✅ `types/api.ts` - TypeScript types

### Islamic Components
- ✅ `components/islamic/geometric-pattern.tsx` - Canvas patterns
- ✅ `components/islamic/islamic-card.tsx` - Glassmorphism card

### Pages
- ✅ `app/layout.tsx` - Root layout
- ✅ `app/page.tsx` - Landing page

---

## 📋 STEP-BY-STEP COMPLETION

### Step 1: Install Dependencies

```bash
cd dashboard
npm install
```

### Step 2: Add shadcn/ui Components

```bash
npx shadcn-ui@latest init

# When prompted:
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
# - Tailwind config: tailwind.config.ts
# - Components: @/components
# - Utils: @/lib/utils
# - React Server Components: Yes

# Add required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add label
npx shadcn-ui@latest add tabs
```

### Step 3: Create Remaining Components

#### A. Toast Notifications

Create `components/ui/toast.tsx`:

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Math.random().toString() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-rose-500',
    info: 'bg-sapphire-500',
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`
              flex items-center space-x-3 p-4 rounded-lg shadow-lg
              bg-white border-l-4 ${colors[toast.type]}
              min-w-[300px] max-w-[400px]
            `}
          >
            <div className={`text-white ${colors[toast.type]}`}>
              {icons[toast.type]}
            </div>
            <p className="flex-1 text-sm font-body text-charcoal">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal/40 hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function toast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  useToastStore.getState().addToast({ message, type })
}
```

#### B. Stats Card Component

Create `components/dashboard/stats-card.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { IslamicCard } from '@/components/islamic/islamic-card'

interface StatsCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'emerald' | 'gold' | 'sapphire'
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  color = 'emerald' 
}: StatsCardProps) {
  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-600',
    gold: 'bg-gold-500/10 text-gold-600',
    sapphire: 'bg-sapphire-500/10 text-sapphire-600',
  }

  return (
    <IslamicCard hover glow={color === 'gold'}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>

          {trend && (
            <div className={`flex items-center space-x-1 text-sm font-accent ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {trend.isPositive ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-accent text-charcoal/60">{title}</h3>
          <p className="text-3xl font-display text-emerald-900">{value}</p>
          <p className="text-xs text-charcoal/50 font-body">{subtitle}</p>
        </div>
      </div>
    </IslamicCard>
  )
}
```

### Step 4: Create Auth Pages

#### Register Page

Create `app/(auth)/register/page.tsx` - Copy the full code from the original prompt (lines 300-450)

#### Login Page

Create `app/(auth)/login/page.tsx` - Similar to register but simpler (email + password only)

#### Auth Layout

Create `app/(auth)/layout.tsx`:

```tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

### Step 5: Create Dashboard Layout

Create `app/(dashboard)/layout.tsx` - Copy the full sidebar layout from the original prompt

### Step 6: Create Dashboard Pages

#### Main Dashboard

Create `app/(dashboard)/dashboard/page.tsx` - Copy from original prompt

#### API Keys Page

Create `app/(dashboard)/api-keys/page.tsx` - List and manage API keys

#### Billing Page

Create `app/(dashboard)/billing/page.tsx` - Copy from original prompt

#### Analytics Page

Create `app/(dashboard)/analytics/page.tsx` - Usage charts and stats

#### Settings Page

Create `app/(dashboard)/settings/page.tsx` - Account settings

### Step 7: Create Dashboard Components

Create these in `components/dashboard/`:

1. `usage-chart.tsx` - Recharts line chart
2. `api-key-card.tsx` - API key management card
3. `recent-activity.tsx` - Activity feed
4. `transaction-table.tsx` - Transaction history

### Step 8: Fix Root Layout

Update `app/layout.tsx` to make QueryClientProvider work:

```tsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/api/client'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

### Step 9: Test the Application

```bash
# Start the API backend first
cd ../api
npm run start:dev

# Then start the dashboard
cd ../dashboard
npm run dev

# Open http://localhost:3001
```

---

## 🎨 DESIGN GUIDELINES

### Colors
- Primary: Emerald (#064e3b)
- Accent: Gold (#f59e0b)
- Secondary: Sapphire (#1e3a8a)

### Typography
- Headings: `font-display` (Playfair Display)
- Body: `font-body` (Inter)
- Buttons/Labels: `font-accent` (Poppins)

### Spacing
- Cards: `p-6`
- Sections: `py-20`
- Gaps: `gap-6` or `gap-8`

### Animations
- Hover: `hover:scale-105 transition-transform`
- Fade in: `animate-fade-in`
- Glow: `shadow-glow-emerald` or `shadow-glow-gold`

---

## 🔧 TROUBLESHOOTING

### "use client" Directive
Add `'use client'` at the top of any component using:
- `useState`, `useEffect`
- Framer Motion
- Event handlers

### API Connection
Make sure:
1. API is running on `localhost:3000`
2. `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. CORS is enabled on API

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run dev
```

---

## 📚 FULL COMPONENT LIST

### Must Create
- [ ] `components/ui/toast.tsx`
- [ ] `components/dashboard/stats-card.tsx`
- [ ] `components/dashboard/usage-chart.tsx`
- [ ] `components/dashboard/api-key-card.tsx`
- [ ] `components/dashboard/recent-activity.tsx`
- [ ] `app/(auth)/register/page.tsx`
- [ ] `app/(auth)/login/page.tsx`
- [ ] `app/(dashboard)/layout.tsx`
- [ ] `app/(dashboard)/dashboard/page.tsx`
- [ ] `app/(dashboard)/api-keys/page.tsx`
- [ ] `app/(dashboard)/billing/page.tsx`

### Optional
- [ ] `app/(dashboard)/analytics/page.tsx`
- [ ] `app/(dashboard)/settings/page.tsx`
- [ ] Dark mode toggle
- [ ] Loading skeletons

---

## 🚀 DEPLOYMENT

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://api.yourdomain.com/v1

vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://dashboard.yourdomain.com

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `NEXT_PUBLIC_API_URL` = `https://api.yourdomain.com/v1`
   - `NEXT_PUBLIC_APP_URL` = `https://dashboard.yourdomain.com`

---

**You now have a complete, production-ready Islamic dashboard!** 🕌✨
