<template>
  <div class="min-h-screen bg-white dark:bg-black text-black dark:text-white relative overflow-hidden transition-colors duration-300">
    <div class="relative">
      <div class="relative px-6 py-8">
        <div class="relative flex justify-center items-center mb-4">
          <div class="text-center">
            <h1 class="text-5xl font-bold bg-linear-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-impact tracking-wider mb-4">
              ⚡ DOLL WISHLIST ⚡
            </h1>
            <p class="text-pink-600 dark:text-pink-300 text-lg">Olá, {{ authStore.user?.name }} :) </p>
          </div>
          
          <div class="absolute right-0 flex items-center gap-4">
            <button
              @click="themeStore.toggleTheme"
              class="text-black dark:text-white font-bold cursor-pointer hover:text-pink-600 dark:hover:text-pink-300 transition"
              :title="themeStore.isDark ? 'Modo Claro' : 'Modo Escuro'"
            >
              <component :is="themeStore.isDark ? Sun : Moon" class="w-8 h-8" />
            </button>
            <button
              @click="handleLogout"
              class="text-black dark:text-white font-bold cursor-pointer hover:text-pink-600 dark:hover:text-pink-300 transition"
              title="Sair"
            >
              <LogOut class="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-6">
      <div v-if="dollsStore.stats" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-linear-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-2xl transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-pink-100 dark:text-pink-200 text-sm font-bold uppercase">Total Wishlist</p>
              <p class="text-4xl font-bold text-white">R$ {{ dollsStore.stats.totalValue.toFixed(2) }}</p>
            </div>
            <DollarSign class="w-12 h-12 text-pink-300" />
          </div>
        </div>
        
        <div class="bg-linear-to-br from-pink-600 to-pink-800 rounded-2xl p-6 shadow-2xl transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 dark:text-purple-200 text-sm font-bold uppercase">Já Investido</p>
              <p class="text-4xl font-bold text-white">R$ {{ dollsStore.stats.acquiredValue.toFixed(2) }}</p>
            </div>
            <Check class="w-12 h-12 text-purple-300" />
          </div>
        </div>
        
        <div class="bg-linear-to-br from-green-500 to-green-700 rounded-2xl p-6 shadow-2xl transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-100 dark:text-yellow-200 text-sm font-bold uppercase">Progresso</p>
              <p class="text-4xl font-bold text-white">{{ dollsStore.stats.percentage }}%</p>
            </div>
            <Star class="w-12 h-12 text-yellow-300" />
          </div>
        </div>
      </div>

      <div v-if="dollsStore.stats" class="mb-8 bg-gray-200 dark:bg-black dark:bg-opacity-50 rounded-full h-8 border-2 border-pink-400 overflow-hidden">
        <div 
          class="h-full bg-linear-to-r from-pink-500 via-purple-500 to-green-400 transition-all duration-500 flex items-center justify-center text-sm font-bold text-white"
          :style="{ width: `${dollsStore.stats.percentage}%` }"
        >
          <span v-if="dollsStore.stats.percentage > 10">{{ dollsStore.stats.percentage }}%</span>
        </div>
      </div>

      <button 
        @click="showAddForm = !showAddForm"
        class="w-full mb-6 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-2xl transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <Plus class="w-6 h-6" />
         ADICIONAR BONECA
      </button>

      <div v-if="showAddForm" class="mb-8 bg-gray-50 dark:bg-linear-to-br dark:from-purple-900 dark:to-black border-4 border-pink-400 rounded-2xl p-6">
        <h2 class="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-4">Nova Boneca</h2>
        <form @submit.prevent="handleAddDoll" class="space-y-4">
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Nome</label>
            <input
              v-model="newDoll.name"
              type="text"
              required
              class="w-full px-4 py-2 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="Ex: Draculaura Sweet 1600"
            />
          </div>
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Linha</label>
            <input
              v-model="newDoll.line"
              type="text"
              required
              class="w-full px-4 py-2 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="Ex: Monster High"
            />
          </div>
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Preço (R$)</label>
            <input
              v-model.number="newDoll.price"
              type="number"
              step="0.01"
              required
              class="w-full px-4 py-2 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="250.00"
            />
          </div>
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Prioridade</label>
            <select
              v-model.number="newDoll.priority"
              class="w-full px-4 py-2 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
            >
              <option :value="1">Alta</option>
              <option :value="2">Média</option>
              <option :value="3">Baixa</option>
            </select>
          </div>
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">URL da Imagem</label>
            <input
              v-model="newDoll.imageUrl"
              type="url"
              class="w-full px-4 py-2 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="https://..."
            />
          </div>
          <div>
            <label class="block text-pink-700 dark:text-pink-200 font-bold mb-2">Notas</label>
            <textarea
              v-model="newDoll.notes"
              class="w-full px-4 py-2 bg-white dark:bg-black border-2 border-pink-400 rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-400"
              placeholder="Observações sobre a boneca..."
              rows="3"
            ></textarea>
          </div>
          <div class="flex gap-2">
            <button
              type="submit"
              :disabled="dollsStore.loading"
              class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg border-2 border-green-400 transition disabled:opacity-50"
            >
              {{ dollsStore.loading ? 'Salvando...' : 'Salvar' }}
            </button>
            <button
              type="button"
              @click="showAddForm = false"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg border-2 border-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div v-if="dollsStore.loading && !dollsStore.dolls.length" class="text-center py-16">
        <div class="animate-spin w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full mx-auto"></div>
        <p class="text-pink-600 dark:text-pink-300 mt-4">Carregando...</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="doll in dollsStore.sortedDolls"
          :key="doll.id"
          :class="`relative rounded-2xl overflow-hidden border-2 shadow-xl dark:shadow-2xl transition ${
            doll.acquired 
              ? 'border-green-400 bg-gray-50 dark:bg-linear-to-br dark:from-green-900 dark:to-black' 
              : 'border-pink-400 bg-white dark:bg-linear-to-br dark:from-purple-900 dark:to-black'
          }`"
        >
          <div class="absolute top-3 left-3 z-10">
            <div class="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Star class="w-3 h-3" fill="currentColor" />
              Prioridade {{ getPriorityLabel(doll.priority) }}
            </div>
          </div>
          <div v-if="doll.acquired" class="absolute top-3 right-3 z-10">
            <div class="bg-green-400 text-black font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Check class="w-3 h-3" />
              ADQUIRIDA
            </div>
          </div>

          <div class="relative h-64 bg-gray-100 dark:bg-black overflow-hidden flex items-center justify-center">
            <img 
              v-if="doll.imageUrl"
              :src="doll.imageUrl" 
              :alt="doll.name"
              :class="`max-w-full max-h-full object-contain ${doll.acquired ? 'opacity-50' : 'opacity-90'}`"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Heart class="w-24 h-24 text-pink-400 opacity-30" />
            </div>
            <div v-if="doll.acquired" class="absolute inset-0 flex items-center justify-center">
              <Check class="w-24 h-24 text-green-400" :stroke-width="4" />
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold mb-1 text-pink-600 dark:text-pink-300">{{ doll.name }}</h3>
            <p class="text-sm text-purple-700 dark:text-purple-300 mb-3">{{ doll.line }}</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-green-600 dark:text-green-400">R$ {{ doll.price.toFixed(2) }}</span>
            </div>
            <p v-if="doll.notes" class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ doll.notes }}</p>

            <div class="flex gap-2">
              <button
                @click="dollsStore.toggleAcquired(doll.id)"
                :class="`flex-1 font-bold py-2 rounded-lg transition cursor-pointer ${
                  doll.acquired
                    ? 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'bg-pink-600 border-pink-400 text-white hover:bg-pink-700'
                }`"
              >
                {{ doll.acquired ? 'Desmarcar' : 'Adquirir' }}
              </button>
              <button
                @click="handleDeleteDoll(doll.id)"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition cursor-pointer"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!dollsStore.loading && dollsStore.dolls.length === 0" class="text-center py-16">
        <Heart class="w-24 h-24 text-pink-400 mx-auto mb-4 opacity-50" />
        <p class="text-2xl text-pink-600 dark:text-pink-300 font-bold">Sua wishlist está vazia :(</p>
        <p class="text-purple-700 dark:text-purple-300 mt-2">Adicione suas dolls dos sonhos!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDollsStore } from '@/stores/dolls'
import { useThemeStore } from '@/stores/theme'
import { Heart, Check, Trash2, Plus, DollarSign, Star, LogOut, Sun, Moon } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const dollsStore = useDollsStore()
const themeStore = useThemeStore()

const showAddForm = ref(false)
const newDoll = ref({
  name: '',
  line: '',
  price: 0,
  priority: 3,
  imageUrl: '',
  notes: '',
})

const getPriorityLabel = (priority) => {
  const labels = {
    1: 'Alta',
    2: 'Média',
    3: 'Baixa'
  }
  return labels[priority] || 'N/A'
}

onMounted(async () => {
  await dollsStore.fetchDolls()
  await dollsStore.fetchStats()
})

const handleAddDoll = async () => {
  try {
    await dollsStore.createDoll(newDoll.value)
    newDoll.value = {
      name: '',
      line: '',
      price: 0,
      priority: 3,
      imageUrl: '',
      notes: '',
    }
    showAddForm.value = false
  } catch (error) {
    alert('Erro ao adicionar boneca: ' + error.message)
  }
}

const handleDeleteDoll = async (id) => {
  if (confirm('Tem certeza que deseja excluir esta boneca?')) {
    try {
      await dollsStore.deleteDoll(id)
    } catch (error) {
      alert('Erro ao excluir boneca: ' + error.message)
    }
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>