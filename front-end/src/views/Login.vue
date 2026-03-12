<template>
  <div class="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 transition-colors duration-300 relative">
    <div class="absolute top-4 right-4">
      <ThemeToggle />
    </div>
    <div class="w-full max-w-md">
      <div class="text-center m-8">
        <h1 class="text-4xl font-bold bg-linear-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-impact tracking-wider mb-2 whitespace-nowrap">
          ⚡DOLL WISHLIST⚡
        </h1>
        <p class="text-pink-600 dark:text-pink-300 text-md">Faça login na sua conta</p>
      </div>

      <div class="bg-gray-50 dark:bg-linear-to-br dark:from-purple-900 dark:to-black border-2 border-pink-400 rounded-2xl p-8 shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white dark:bg-black border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Senha</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-white dark:bg-black border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
            />
          </div>

          <div v-if="authStore.error" class="bg-red-500 bg-opacity-20 border-red-400 rounded-lg p-3">
            <p class="text-red-600 dark:text-red-200 text-sm font-bold">{{ authStore.error }}</p>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg border-white shadow-2xl transition disabled:opacity-50 cursor-pointer"
          >
            {{ authStore.loading ? 'Entrando...' : 'ENTRAR' }}
          </button>

          <div class="text-center">
            <button
              @click="router.push('/register')"
              class="text-pink-600 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-200 font-semibold border-pink-400 border rounded-lg py-3 w-full cursor-pointer"
            >
              Não tem conta? Cadastre-se
            </button>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex-1 h-px bg-pink-200 dark:bg-pink-900"></div>
            <span class="text-sm text-pink-400 dark:text-pink-500 font-medium">ou</span>
            <div class="flex-1 h-px bg-pink-200 dark:bg-pink-900"></div>
          </div>

          <div class="flex justify-center">
            <GoogleButton @success="handleGoogleSuccess" @error="handleGoogleError" />
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
import GoogleButton from '@/components/GoogleButton.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

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

const handleGoogleSuccess = async (credential) => {
  try {
    await authStore.loginWithGoogle(credential)
    router.push('/')
  } catch (error) {
    // Erro já tratado no store
  }
}

const handleGoogleError = (message) => {
  authStore.error = message
}
</script>