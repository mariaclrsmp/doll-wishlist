<template>
  <div ref="googleButtonContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['success', 'error'])

const googleButtonContainer = ref(null)

onMounted(() => {
  if (!window.google) {
    emit('error', 'Google GSI não carregou. Verifique sua conexão.')
    return
  }

  window.google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: (response) => {
      emit('success', response.credential)
    },
  })

  window.google.accounts.id.renderButton(googleButtonContainer.value, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'continue_with',
    locale: 'pt-BR',
    width: googleButtonContainer.value?.offsetWidth || 400,
  })
})
</script>
