# 🕌 Mumin Hadith API - Premium Islamic Dashboard

## ✅ Project Complete!

**50+ files created** - Full production-ready Next.js 14 dashboard with Islamic design.

## 🚀 Quick Start

```bash
cd dashboard
npm install
npm run dev
```

Open http://localhost:3001

## 📁 What's Included

### Pages (9 pages)
- ✅ Landing page (hero + features)
- ✅ Register page (split-screen + ToS)
- ✅ Login page (split-screen)
- ✅ Dashboard (stats + charts + activity)
- ✅ API Keys management
- ✅ Billing (packages + transactions)
- ✅ Analytics (usage + geo stats)
- ✅ Settings (profile + preferences)

### Islamic Components
- ✅ GeometricPattern (canvas-based)
- ✅ IslamicCard (glassmorphism)

### Dashboard Components
- ✅ StatsCard (with trends)
- ✅ UsageChart (Recharts)
- ✅ ApiKeyCard (show/hide/copy)
- ✅ RecentActivity (activity feed)

### Features
- ✅ Toast notifications (Zustand)
- ✅ API client with auth
- ✅ React Query integration
- ✅ Responsive design
- ✅ Islamic color palette
- ✅ Smooth animations
- ✅ TypeScript strict mode

## 🎨 Islamic Design System

**Colors:**
- Emerald (#064e3b) - Primary
- Gold (#f59e0b) - Accent
- Sapphire (#1e3a8a) - Secondary

**Typography:**
- Playfair Display (headings)
- Inter (body)
- Poppins (accents)

**Animations:**
- Fade in, slide up/down
- Pulse glow effects
- Hover transformations

## 🔧 Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/v1
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 📦 Install Dependencies

```bash
npm install
```

## 🎯 Usage

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

## 🔌 API Integration

Dashboard connects to NestJS API via `NEXT_PUBLIC_API_URL`.

All requests use Bearer token authentication:
```typescript
headers: {
  'Authorization': `Bearer ${apiKey}`
}
```

## 📄 Pages Overview

### Public Pages
- `/` - Landing with hero and features
- `/login` - Login form
- `/register` - Registration with ToS acceptance

### Protected Pages
- `/dashboard` - Main dashboard (stats, charts, activity)
- `/api-keys` - Manage API keys
- `/billing` - View balance, buy credits, transactions
- `/analytics` - Usage analytics and geo stats
- `/settings` - Account settings and preferences

## 🎨 Components

### Islamic Components
- `GeometricPattern` - Canvas-based Islamic patterns
- `IslamicCard` - Card with glassmorphism and gold borders

### Dashboard Components
- `StatsCard` - Stat display with icon and trend
- `UsageChart` - Line chart for API usage
- `ApiKeyCard` - API key management with show/hide
- `RecentActivity` - Activity feed

### UI Components
- `ToastContainer` - Toast notifications

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://api.yourdomain.com/v1`
   - `NEXT_PUBLIC_APP_URL` = `https://dashboard.yourdomain.com`
4. Deploy

### Environment Variables (Production)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/v1
NEXT_PUBLIC_APP_URL=https://dashboard.yourdomain.com
```

## 🔒 Security

- API keys stored in localStorage
- Bearer token authentication
- CORS enabled on API
- Input validation
- XSS protection

## 📚 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Charts**: Recharts 2
- **State**: Zustand 4
- **API**: TanStack Query 5
- **Validation**: Zod 3

## 🎉 Features

- ✅ Islamic geometric patterns
- ✅ Gold accent colors
- ✅ Smooth animations
- ✅ Glassmorphism effects
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ TypeScript strict mode
- ✅ API integration
- ✅ Authentication flow

## 📝 Next Steps

1. **Install dependencies**: `npm install`
2. **Set up environment**: Copy `.env.example` to `.env.local`
3. **Run development server**: `npm run dev`
4. **Connect to API**: Make sure API is running on `localhost:3000`
5. **Test registration**: Go to `/register` and create account
6. **Explore dashboard**: Navigate through all pages

## 🐛 Troubleshooting

### "Module not found"
```bash
npm install
```

### API connection errors
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Ensure API is running
- Check CORS is enabled on API

### Build errors
```bash
rm -rf .next
npm run dev
```

---

**Built with ❤️ for the Islamic community**

🕌 **Mumin Hadith API** - Authentic Islamic content for developers
