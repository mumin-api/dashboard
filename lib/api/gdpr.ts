import { apiClient } from './client'

export const gdprAPI = {
    /**
     * Get user's current cookie consent state from database
     */
    async getConsent(): Promise<any> {
        return apiClient.get('/user/consent')
    },

    /**
     * Save cookie consent state to database
     */
    async updateConsent(consent: any): Promise<any> {
        return apiClient.put('/user/consent', consent)
    }
}
