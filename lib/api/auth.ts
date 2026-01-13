import { apiClient } from './client'

interface RegisterData {
    email: string
    password: string
    displayName?: string
    tosAccepted: boolean
    tosVersion: string
    privacyAccepted: boolean
    privacyVersion: string
}

interface LoginData {
    email: string
    password: string
}

interface AuthResponse {
    success: boolean
    user: {
        id: string
        email: string
        displayName: string
    }
    message: string
}

export const authAPI = {
    /**
     * Register new user
     * Backend sets httpOnly cookies automatically
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/register', data)
        // No need to store token - it's in httpOnly cookie!
        return response
    },

    /**
     * Login user
     * Backend sets httpOnly cookies automatically
     */
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', data)
        // No need to store token - it's in httpOnly cookie!
        return response
    },

    /**
     * Logout user
     * Backend clears httpOnly cookies
     */
    async logout(): Promise<void> {
        await apiClient.post('/auth/logout')
        // Cookies cleared by backend
    },

    /**
     * Get current user
     * Token sent automatically via cookie
     */
    async getCurrentUser() {
        return apiClient.get('/auth/me')
    },

    /**
     * Update user profile
     */
    async updateProfile(data: { displayName?: string; email?: string }) {
        return apiClient.patch('/auth/profile', data)
    },

    /**
     * Change password
     */
    async changePassword(data: { currentPassword: string; newPassword: string }) {
        return apiClient.patch('/auth/password', data)
    },
}
