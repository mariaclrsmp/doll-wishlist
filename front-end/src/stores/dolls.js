import { defineStore } from 'pinia'
import api from '@/services/api'

export const useDollsStore = defineStore('dolls', {
    state: () => ({
        dolls: [],
        stats: null,
        loading: false,
        error: null,
    }),

    getters: {
        sortedDolls: (state) => {
            return [...state.dolls].sort((a, b) => {
                if (a.priority !== b.priority) return a.priority - b.priority
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
        },
        acquiredDolls: (state) => state.dolls.filter(d => d.acquired),
        pendingDolls: (state) => state.dolls.filter(d => !d.acquired),
    },

    actions: {
        async fetchDolls() {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.get('/dolls')
                this.dolls = data
            } catch (error) {
                this.error = error.response?.data?.error || 'Erro ao carregar bonecas'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchStats() {
            try {
                const { data } = await api.get('/dolls/stats')
                this.stats = data
            } catch (error) {
                console.error('Erro ao carregar estatísticas:', error)
            }
        },

        async createDoll(dollData) {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.post('/dolls', dollData)
                this.dolls.push(data)
                await this.fetchStats()
                return data
            } catch (error) {
                this.error = error.response?.data?.error || 'Erro ao criar boneca'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateDoll(id, dollData) {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.put(`/dolls/${id}`, dollData)
                const index = this.dolls.findIndex(d => d.id === id)
                if (index !== -1) {
                    this.dolls[index] = data
                }
                await this.fetchStats()
                return data
            } catch (error) {
                this.error = error.response?.data?.error || 'Erro ao atualizar boneca'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteDoll(id) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/dolls/${id}`)
                this.dolls = this.dolls.filter(d => d.id !== id)
                await this.fetchStats()
            } catch (error) {
                this.error = error.response?.data?.error || 'Erro ao deletar boneca'
                throw error
            } finally {
                this.loading = false
            }
        },

        async toggleAcquired(id) {
            const doll = this.dolls.find(d => d.id === id)
            if (doll) {
                const updatedData = {
                    acquired: !doll.acquired,
                    acquiredAt: !doll.acquired ? new Date().toISOString() : null,
                }
                await this.updateDoll(id, updatedData)
            }
        },
    },
})
