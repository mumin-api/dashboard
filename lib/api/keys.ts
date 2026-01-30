import { apiClient } from './client'
import type { ApiKey } from '@/types/api'

export const keysApi = {
    getAll: async (): Promise<ApiKey[]> => {
        // Since we only support 1 key per user for now, return getMe result as array?
        // Or create keys/all endpoint? Let's assume getMe is enough or fix getAll later.
        // For now, let's just query getMe as specific method
        return []
    },

    getMe: async () => {
        return apiClient.get('/keys/me')
    },

    create: async () => {
        return apiClient.post('/keys/create')
    },

    rotate: async () => {
        return apiClient.post('/keys/rotate')
    },

    updateSettings: async (data: { allowedIPs?: string[]; webhookUrl?: string }) => {
        return apiClient.patch('/keys/settings', data)
    },
}
