# 🕌 Mumin Hadith Dashboard - Premium Management Ecosystem

```text
██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██████╔╝██████╔╝
╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═════╝ 
```

> **The Definitive Premium Interface for Prophetic Traditions.**

The **Mumin Hadith Dashboard** is a state-of-the-art administrative and user interface tailored for the modern Islamic scholar and developer. Built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**, it offers a visually stunning experience that blends centuries of Islamic geometric art with the latest in glassmorphism and motion design.

---

## 📖 Table of Contents

1.  [Vision & Philosophy](#1-vision--philosophy)
2.  [Exhaustive Technical Stack](#2-exhaustive-technical-stack)
3.  [Architectural Design Patterns](#3-architectural-design-patterns)
    - [The Feature-First Structure](#the-feature-first-structure)
    - [Atomic Component Strategy](#atomic-component-strategy)
4.  [Premium Design System](#4-premium-design-system)
    - [Islamic Color tokens](#islamic-color-tokens)
    - [Geometric Pattern Engine (Canvas API)](#geometric-pattern-engine-canvas-api)
    - [Typography & Scholarly Aesthetics](#typography--scholarly-aesthetics)
5.  [Functional Page Reference](#5-functional-page-reference)
    - [Authentication Hub](#authentication-hub)
    - [Analytics & Usage Command Center](#analytics--usage-command-center)
    - [Billing & Financial Management](#billing--financial-management)
    - [Developer Portal (API Keys)](#developer-portal-api-keys)
    - [GDPR & Privacy Self-Service](#gdpr--privacy-self-service)
6.  [Core Component Documentation](#6-core-component-documentation)
    - [IslamicCard](#islamiccard)
    - [GeometricPattern](#geometricpattern)
    - [StatsCard](#statscard)
    - [ApiKeyCard](#apikeycard)
7.  [State Management Architecture](#7-state-management-architecture)
    - [TanStack Query (Server State)](#tanstack-query-server-state)
    - [Zustand (Client State)](#zustand-client-state)
8.  [Security & Identity Protocol](#8-security--identity-protocol)
    - [httpOnly Cookie Auth Flow](#httponly-cookie-auth-flow)
    - [CSRF & XSS Protection](#csrf--xss-protection)
9.  [Performance Engineering](#9-performance-engineering)
    - [Lighthouse 100 Checklist](#lighthouse-100-checklist)
    - [Lazy Loading & Splitting](#lazy-loading--splitting)
10. [Setup & Local Development](#10-setup--local-development)
    - [Prerequisites](#prerequisites)
    - [Step-by-Step Installation](#step-by-step-installation)
11. [Deployment & Environment](#11-deployment--environment)
    - [Vercel Deployment Flow](#vercel-deployment-flow)
    - [Production Environment Variables](#production-environment-variables)
12. [Maintenance & Scaling](#12-maintenance--scaling)
13. [Troubleshooting & Support](#13-troubleshooting--support)
14. [Appendix: Islamic Motifs](#appendix-islamic-motifs)
15. [Final Word](#15-final-word)

---

## 1. Vision & Philosophy

The Mumin Dashboard is rooted in the concept of **Adab (Decorum/Etiquette)** in technology. We believe that an interface used to manage sacred knowledge should itself be managed with excellence. 

Our mission:
- To eliminate friction for developers using the API.
- To provide transparent billing and analytics.
- To wow the user with a "Premium-First" aesthetic that honors Islamic history.

---

## 2. Exhaustive Technical Stack

### The Core
- **Next.js 14**: Utilizing the App Router for server-side rendering and static optimization.
- **TypeScript 5.x**: Strict mode enabled to prevent type-related bugs in financial data.

### Styling & Motion
- **Tailwind CSS 3.x**: Utility-first CSS with a custom HSL-based design system.
- **Framer Motion 11**: For physics-based animations and layout transitions.
- **Lucide React**: Holistic icon set chosen for its clean, geometric lines.

### Data & State
- **TanStack Query v5**: Handling caching, synchronization, and optimistic updates for API data.
- **Zustand**: Lightweight global state for notifications and UI preferences.
- **Zod**: Runtime schema validation for forms and API responses.

---

## 3. Architectural Design Patterns

### The Feature-First Structure
We organize code by "feature" rather than "type":
- `features/auth/`: Components, hooks, and store logic for login.
- `features/billing/`: Everything related to credits and payments.
- `features/analytics/`: Charting and table logic.

### Atomic Component Strategy
1.  **Atoms**: Buttons, Inputs, Badges.
2.  **Molecules**: FormFields, CardHeaders.
3.  **Organisms**: Navbar, Sidebar, StatsGrid.
4.  **Templates**: AuthLayout, DashboardLayout.

---

## 4. Premium Design System

### Islamic Color Tokens
We use a primary emerald and gold theme.
- **Emerald Primary**: `hsl(158, 86%, 17%)`
- **Gold Accent**: `hsl(38, 92%, 50%)`
- **Surface Dark**: `hsl(164, 91%, 9%)`

### Geometric Pattern Engine (Canvas API)
Backgrounds are generated in real-time. The `GeometricPattern` component calculate vertices for 8-fold stars (the Khatim) and 12-fold patterns, drawing them on a canvas with a subtle emerald-to-transparent gradient. This makes the UI feel "alive".

### Typography & Scholarly Aesthetics
- **Serif Excellence**: `Playfair Display` for page titles, mirroring classical manuscript typography.
- **Sans Detail**: `Inter` for data density and readability.

---

## 5. Functional Page Reference

### Authentication Hub
- **Login**: Clean, high-security portal.
- **Register**: Integrated with ToS/Privacy policy versioning.
- **Password Reset**: Secure email-based recovery flow.

### Analytics & Usage Command Center
- **Dynamic Charts**: Interactive line and area charts.
- **Heatmap**: Visualization of API request density.
- **Export Data**: CSV/PDF export for billing reports.

### Billing & Financial Management
- **Token Packages**: Intuitive UI to select and purchase credit bundles.
- **Invoices**: Searchable list of past transactions with ID tracking.

### Developer Portal (API Keys)
- **Status Monitoring**: See active vs. revoked keys.
- **Rotation Tool**: Instantly kill a compromised key and generate a new one.

### GDPR & Privacy Self-Service
- **Request Data**: One-click download of all held information.
- **Delete Account**: Final, irreversible account closure.

---

## 6. Core Component Documentation

### `IslamicCard`
A high-order component wrapping children in a luxury frame.
```tsx
<IslamicCard glow={true}>
  <h2>Your Content Here</h2>
</IslamicCard>
```

### `StatsCard`
Displays metrics with an "Animated Number" component that counts up on load.

---

## 7. State Management Architecture

### TanStack Query (Server State)
- **Key Factories**: Centralized query keys for consistent caching.
- **Prefetching**: Hovering over "Analytics" pre-warms the data cache.

### Zustand (Client State)
- **Toast Store**: Queue-based notification system (`success`, `error`, `warning`).

---

## 8. Security & Identity Protocol

### httpOnly Cookie Auth Flow
The dashboard never handles the `RefreshToken` directly. It only knows about the `AccessToken` (short-lived). This makes "Token Theft" via XSS attacks extremely difficult.

---

## 9. Performance Engineering

### Lighthouse 100 Checklist
- [x] All images use `next/image` for WebP optimization.
- [x] Critical CSS is inlined.
- [x] Gzip/Brotli compression enabled.

---

## 10. Setup & Local Development

### Installation Steps
1.  `npm install`
2.  `cp .env.example .env.local`
3.  `npm run dev`

---

## 11. Deployment & Environment

### Vercel Deployment Flow
Recommended for the App Router. Build time < 2 minutes.

---

## 12. Maintenance & Scaling

Horizontal scaling is handled by Next.js. Image assets are served via a global CDN.

---

## 13. Troubleshooting & Support

**"Request failed with 401"**: Your access token has expired. The dashboard should automatically refresh it; if not, re-log.

---

## 14. Appendix: Islamic Motifs
The 8-point star used in the background symbolizes the "Seal of the Prophets" and is a recurring theme of protection throughout the app.

---

## 15. Final Word

This dashboard is built for those who serve the words of the Prophet (PBUH). May it be a source of ease (Yusr) in your work.

---

🕌 Mumin Development Team
[dashboard.mumin.ink](https://dashboard.mumin.ink)
