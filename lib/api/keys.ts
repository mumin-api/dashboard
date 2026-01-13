import { apiClient } from './client'
import type { ApiKey } from '@/types/api'

export const keysApi = {
    getAll: async (): Promise<ApiKey[]> => {
        return apiClient.get('/auth/me')
    },

    getMe: async () => {
        return apiClient.get('/auth/me')
    },

    rotate: async () => {
        return apiClient.post('/auth/rotate')
    },

    updateSettings: async (data: { allowedIPs?: string[]; webhookUrl?: string }) => {
        return apiClient.patch('/auth/settings', data)
    },
}
