import { QueryClient } from '@tanstack/react-query'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

class ApiClient {
    private baseUrl: string
    private isRefreshing = false
    private refreshSubscribers: Array<(token: string) => void> = []

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include', // ← ВАЖНО! Отправляет httpOnly cookies
        })

        // Handle 401 - try to refresh token
        if (response.status === 401 && !endpoint.includes('/auth/')) {
            return this.handleUnauthorized(endpoint, options)
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || 'API request failed')
        }

        return response.json()
    }

    /**
     * Handle 401 errors by refreshing token
     */
    private async handleUnauthorized<T>(
        endpoint: string,
        options: RequestInit
    ): Promise<T> {
        // Prevent infinite loops if the refresh call itself is failing or if we're already refreshing
        if (endpoint.includes('/auth/refresh')) {
            throw new Error('Refresh failed')
        }

        if (this.isRefreshing) {
            // Wait for refresh to complete
            return new Promise((resolve, reject) => {
                this.subscribeTokenRefresh((status: string) => {
                    if (status === 'refreshed') {
                        this.request<T>(endpoint, options).then(resolve).catch(reject)
                    } else {
                        reject(new Error('Token refresh failed'))
                    }
                })
            })
        }

        this.isRefreshing = true

        try {
            // Try to refresh token
            const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            })

            if (!refreshResponse.ok) {
                throw new Error('Refresh request failed')
            }

            this.onRefreshed('refreshed')
            // Retry original request
            return this.request<T>(endpoint, options)
        } catch (error) {
            this.onRefreshed('failed')

            // Redirect to login only if it's not a generic failure
            if (typeof window !== 'undefined' && !endpoint.includes('/user/consent')) {
                window.location.href = '/login'
            }

            throw error
        } finally {
            this.isRefreshing = false
        }
    }

    private subscribeTokenRefresh(callback: (status: string) => void) {
        this.refreshSubscribers.push(callback)
    }

    private onRefreshed(status: string) {
        this.refreshSubscribers.forEach((callback) => callback(status))
        this.refreshSubscribers = []
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' })
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async patch<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    }
}

export const apiClient = new ApiClient(API_BASE_URL)

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
        },
    },
})
