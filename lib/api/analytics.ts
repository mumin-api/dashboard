import { apiClient } from './client'
import type { RequestLog, UsageStats, GeoStats } from '@/types/api'

export const analyticsApi = {
    getUsageStats: async (days: number = 7): Promise<UsageStats[]> => {
        return apiClient.get(`/analytics/usage?days=${days}`)
    },

    getRequestLogs: async (page: number = 1, limit: number = 20): Promise<{ data: RequestLog[]; pagination: any }> => {
        return apiClient.get(`/analytics/logs?page=${page}&limit=${limit}`)
    },

    getGeoStats: async (): Promise<GeoStats[]> => {
        return apiClient.get('/analytics/geo')
    },
}
