export interface ApiKey {
    id: number
    keyPrefix: string
    fullKey?: string
    userEmail: string
    balance: number
    totalRequests: number
    isActive: boolean
    createdAt: string
    lastUsedAt: string | null
    trustScore: number
}

export interface Transaction {
    id: number
    type: 'top_up' | 'usage' | 'refund' | 'bonus' | 'inactivity_fee'
    amount: number
    balanceBefore: number
    balanceAfter: number
    description: string | null
    createdAt: string
}

export interface Payment {
    id: number
    provider: string
    amount: string
    currency: string
    status: 'pending' | 'completed' | 'failed' | 'refunded' | 'chargeback'
    createdAt: string
}

export interface User {
    id: number
    email: string
    apiKeys: ApiKey[]
}

export interface RequestLog {
    id: number
    endpoint: string
    method: string
    responseStatus: number
    responseTimeMs: number
    timestamp: string
}

export interface UsageStats {
    date: string
    requests: number
}

export interface GeoStats {
    country: string
    requests: number
}
