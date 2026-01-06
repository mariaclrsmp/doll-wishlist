import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async register(email, password, name) {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.post('/auth/register', { email, password, name })
                this.user = data.user
                this.token = data.token
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                return data
            } catch (error) {
                this.error = error.response?.data?.error || 'Erro ao registrar'
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(email, password) {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.post('/auth/login', { email, password })
                this.user = data.user
                this.token = data.token
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                return data
            } catch (error) {
                this.error = error.response?.data?.error || 'Erro ao fazer login'
                throw error
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },

        async getProfile() {
            try {
                const { data } = await api.get('/auth/profile')
                this.user = data
                localStorage.setItem('user', JSON.stringify(data))
                return data
            } catch (error) {
                this.logout()
                throw error
            }
        },
    },
})