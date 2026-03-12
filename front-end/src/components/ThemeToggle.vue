<template>
  <button
    @click="themeStore.toggleTheme"
    class="cursor-pointer text-pink-500 dark:text-pink-300 hover:text-purple-500 dark:hover:text-purple-300 transition"
    :title="themeStore.isDark ? 'Modo Claro' : 'Modo Escuro'"
  >
    <component :is="themeStore.isDark ? Sun : Moon" class="w-6 h-6" />
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import { Sun, Moon } from 'lucide-vue-next'

const themeStore = useThemeStore()
</script>
