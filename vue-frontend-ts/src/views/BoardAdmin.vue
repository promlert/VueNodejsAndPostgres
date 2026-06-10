<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { userService } from '@/services/userService'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const content = ref('')

onMounted(async () => {
  try {

    content.value =
      await userService.getAdminBoard()
      console.log('Admin board content:', content.value)
  } catch (error) {
    if (error instanceof Error) {
      content.value = error.message
    }

    authStore.logout()
  }
})
</script>