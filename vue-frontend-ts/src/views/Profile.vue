<template>
  <div class="container" v-if="currentUser">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>

    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>

    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>

    <strong>Authorities:</strong>

    <ul>
      <li
        v-for="role in currentUser.roles"
        :key="role"
      >
        {{ role }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

interface User {
  id: number
  username: string
  email: string
  accessToken: string
  roles: string[]
}

const router = useRouter()
const authStore = useAuthStore()

const { user: currentUser } =
  storeToRefs(authStore)

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login')
  }
})
</script>