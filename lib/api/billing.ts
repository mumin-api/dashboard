import { apiClient } from './client'
import type { Transaction, Payment } from '@/types/api'

export const billingApi = {
    getBalance: async () => {
        return apiClient.get('/billing/balance')
    },

    getTransactions: async (page: number = 1, limit: number = 50): Promise<{ data: Transaction[]; pagination: any }> => {
        return apiClient.get(`/billing/transactions?page=${page}&limit=${limit}`)
    },

    getPayments: async (): Promise<Payment[]> => {
        return apiClient.get('/billing/payments')
    },
}
