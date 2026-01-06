<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black flex items-center justify-center px-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg font-impact tracking-wider mb-2">
          ⚡ DOLL WISHLIST ⚡
        </h1>
        <p class="text-pink-300 text-lg">Faça login na sua conta</p>
      </div>

      <div class="bg-gradient-to-br from-purple-900 to-black border-4 border-pink-400 rounded-2xl p-8 shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-pink-200 font-bold mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label class="block text-pink-200 font-bold mb-2">Senha</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
            />
          </div>

          <div v-if="authStore.error" class="bg-red-500 bg-opacity-20 border-2 border-red-400 rounded-lg p-3">
            <p class="text-red-200 text-sm">{{ authStore.error }}</p>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg border-4 border-white shadow-2xl transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ authStore.loading ? 'Entrando...' : 'ENTRAR' }}
          </button>

          <div class="text-center">
            <router-link to="/register" class="text-pink-300 hover:text-pink-200 font-bold">
              Não tem conta? Cadastre-se
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push('/')
  } catch (error) {
    // Erro já tratado no store
  }
}
</script>