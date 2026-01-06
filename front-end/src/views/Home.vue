<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div class="relative px-6 py-8">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h1 class="text-6xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg font-impact tracking-wider">
              ⚡ DOLL WISHLIST ⚡
            </h1>
            <p class="text-center text-pink-300 text-lg">Olá, {{ authStore.user?.name }}!</p>
          </div>
          <button
            @click="handleLogout"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg border-2 border-red-400 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>

    <div class="px-6 py-6">
      <div v-if="dollsStore.stats" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 border-4 border-pink-400 shadow-2xl transform hover:scale-105 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-pink-200 text-sm font-bold uppercase">Total Wishlist</p>
              <p class="text-4xl font-bold text-white">R$ {{ dollsStore.stats.totalValue.toFixed(2) }}</p>
            </div>
            <DollarSign class="w-12 h-12 text-pink-300" />
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl p-6 border-4 border-purple-400 shadow-2xl transform hover:scale-105 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-200 text-sm font-bold uppercase">Já Investido</p>
              <p class="text-4xl font-bold text-white">R$ {{ dollsStore.stats.acquiredValue.toFixed(2) }}</p>
            </div>
            <Check class="w-12 h-12 text-purple-300" />
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 border-4 border-yellow-400 shadow-2xl transform hover:scale-105 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-200 text-sm font-bold uppercase">Progresso</p>
              <p class="text-4xl font-bold text-white">{{ dollsStore.stats.percentage }}%</p>
            </div>
            <Star class="w-12 h-12 text-yellow-300" />
          </div>
        </div>
      </div>

      <div v-if="dollsStore.stats" class="mb-8 bg-black bg-opacity-50 rounded-full h-8 border-4 border-pink-400 overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-green-400 transition-all duration-500 flex items-center justify-center text-sm font-bold"
          :style="{ width: `${dollsStore.stats.percentage}%` }"
        >
          <span v-if="dollsStore.stats.percentage > 10">{{ dollsStore.stats.percentage }}%</span>
        </div>
      </div>

      <button 
        @click="showAddForm = !showAddForm"
        class="w-full mb-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl border-4 border-white shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-2"
      >
        <Plus class="w-6 h-6" />
        ADICIONAR BONECA
      </button>

      <div v-if="showAddForm" class="mb-8 bg-gradient-to-br from-purple-900 to-black border-4 border-pink-400 rounded-2xl p-6">
        <h2 class="text-2xl font-bold text-pink-300 mb-4">Nova Boneca</h2>
        <form @submit.prevent="handleAddDoll" class="space-y-4">
          <div>
            <label class="block text-pink-200 font-bold mb-2">Nome</label>
            <input
              v-model="newDoll.name"
              type="text"
              required
              class="w-full px-4 py-2 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="Ex: Draculaura Sweet 1600"
            />
          </div>
          <div>
            <label class="block text-pink-200 font-bold mb-2">Linha</label>
            <input
              v-model="newDoll.line"
              type="text"
              required
              class="w-full px-4 py-2 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="Ex: Monster High"
            />
          </div>
          <div>
            <label class="block text-pink-200 font-bold mb-2">Preço (R$)</label>
            <input
              v-model.number="newDoll.price"
              type="number"
              step="0.01"
              required
              class="w-full px-4 py-2 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="250.00"
            />
          </div>
          <div>
            <label class="block text-pink-200 font-bold mb-2">Prioridade</label>
            <select
              v-model.number="newDoll.priority"
              class="w-full px-4 py-2 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
            >
              <option :value="1">1 - Alta</option>
              <option :value="2">2 - Média</option>
              <option :value="3">3 - Baixa</option>
            </select>
          </div>
          <div>
            <label class="block text-pink-200 font-bold mb-2">URL da Imagem</label>
            <input
              v-model="newDoll.imageUrl"
              type="url"
              class="w-full px-4 py-2 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="https://..."
            />
          </div>
          <div>
            <label class="block text-pink-200 font-bold mb-2">Notas</label>
            <textarea
              v-model="newDoll.notes"
              class="w-full px-4 py-2 bg-black border-2 border-pink-400 rounded-lg text-white focus:outline-none focus:border-purple-400"
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
        <p class="text-pink-300 mt-4">Carregando...</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="doll in dollsStore.sortedDolls"
          :key="doll.id"
          :class="`relative rounded-2xl overflow-hidden border-4 shadow-2xl transform hover:scale-105 transition ${
            doll.acquired 
              ? 'border-green-400 bg-gradient-to-br from-green-900 to-black' 
              : 'border-pink-400 bg-gradient-to-br from-purple-900 to-black'
          }`"
        >
          <div class="absolute top-3 left-3 z-10">
            <div class="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Star class="w-3 h-3" fill="currentColor" />
              P{{ doll.priority }}
            </div>
          </div>
          <div v-if="doll.acquired" class="absolute top-3 right-3 z-10">
            <div class="bg-green-400 text-black font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Check class="w-3 h-3" />
              ADQUIRIDA
            </div>
          </div>

          <div class="relative h-64 bg-black overflow-hidden">
            <img 
              v-if="doll.imageUrl"
              :src="doll.imageUrl" 
              :alt="doll.name"
              :class="`w-full h-full object-cover ${doll.acquired ? 'opacity-50' : 'opacity-90'}`"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Heart class="w-24 h-24 text-pink-400 opacity-30" />
            </div>
            <div v-if="doll.acquired" class="absolute inset-0 flex items-center justify-center">
              <Check class="w-24 h-24 text-green-400" :stroke-width="4" />
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold mb-1 text-pink-300">{{ doll.name }}</h3>
            <p class="text-sm text-purple-300 mb-3">{{ doll.line }}</p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-green-400">R$ {{ doll.price.toFixed(2) }}</span>
            </div>
            <p v-if="doll.notes" class="text-sm text-gray-400 mb-4">{{ doll.notes }}</p>

            <div class="flex gap-2">
              <button
                @click="dollsStore.toggleAcquired(doll.id)"
                :class="`flex-1 font-bold py-2 rounded-lg border-2 transition ${
                  doll.acquired
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    : 'bg-pink-600 border-pink-400 text-white hover:bg-pink-700'
                }`"
              >
                {{ doll.acquired ? 'Desmarcar' : 'Adquirir' }}
              </button>
              <button
                @click="handleDeleteDoll(doll.id)"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border-2 border-red-400 transition"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!dollsStore.loading && dollsStore.dolls.length === 0" class="text-center py-16">
        <Heart class="w-24 h-24 text-pink-400 mx-auto mb-4 opacity-50" />
        <p class="text-2xl text-pink-300 font-bold">Sua wishlist está vazia!</p>
        <p class="text-purple-300 mt-2">Adicione suas bonecas dos sonhos</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDollsStore } from '@/stores/dolls'
import { Heart, Check, Trash2, Plus, DollarSign, Star } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const dollsStore = useDollsStore()

const showAddForm = ref(false)
const newDoll = ref({
  name: '',
  line: '',
  price: 0,
  priority: 3,
  imageUrl: '',
  notes: '',
})

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