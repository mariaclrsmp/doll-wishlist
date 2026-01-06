<template>
  <div class="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 transition-colors duration-300">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-6xl font-bold bg-linear-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg font-impact tracking-wider mb-2">
          ⚡ DOLL WISHLIST ⚡
        </h1>
        <p class="text-pink-600 dark:text-pink-300 text-lg">Crie sua conta</p>
      </div>

      <div class="bg-gray-50 dark:bg-linear-to-br dark:from-purple-900 dark:to-black border-4 border-pink-400 rounded-2xl p-8 shadow-2xl">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Nome</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Senha</label>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
            />
            <p class="text-xs text-purple-600 dark:text-purple-300 mt-1">Mínimo 6 caracteres</p>
          </div>

          <div v-if="authStore.error" class="bg-red-500 bg-opacity-20 border-2 border-red-400 rounded-lg p-3">
            <p class="text-red-600 dark:text-red-200 text-sm font-bold">{{ authStore.error }}</p>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg border-4 border-white shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ authStore.loading ? 'Criando conta...' : 'CADASTRAR' }}
          </button>

          <div class="text-center">
            <router-link to="/login" class="text-pink-600 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-200 font-bold">
              Já tem conta? Faça login
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
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const form = ref({
  name: '',
  email: '',
  password: '',
})

const handleRegister = async () => {
  try {
    await authStore.register(form.value.email, form.value.password, form.value.name)
    router.push('/')
  } catch (error) {
  }
}
</script>