<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link to="/" class="navbar-brand fw-bold">
        <font-awesome-icon icon="car" class="me-2" />
        Car Management
      </router-link>

      <!-- Toggler for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Content -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <!-- Public Links -->
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>

          <!-- Car Management -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Cars
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/cars">
                  <font-awesome-icon icon="list" class="me-2" />
                  Car List
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/#">
                  <font-awesome-icon icon="plus" class="me-2" />
                  Add New Car
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Admin / Moderator Links -->
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin" class="nav-link">Admin Board</router-link>
          </li>
          <li v-if="showModeratorBoard" class="nav-item">
            <router-link to="/moderator" class="nav-link">Moderator Board</router-link>
          </li>
        </ul>

        <!-- Right Side: Auth -->
        <ul class="navbar-nav ms-auto">
          <!-- Not Logged In -->
          <template v-if="!currentUser">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" class="me-1" />
                Sign Up
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" class="me-1" />
                Login
              </router-link>
            </li>
          </template>

          <!-- Logged In -->
          <template v-else>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <font-awesome-icon icon="user" class="me-2" />
                {{ currentUser.username }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <font-awesome-icon icon="user" class="me-2" />
                    Profile
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                    <font-awesome-icon icon="sign-out-alt" class="me-2" />
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)

const showAdminBoard = computed(() =>
  currentUser.value?.roles?.includes('ROLE_ADMIN') ?? false
)

const showModeratorBoard = computed(() =>
  currentUser.value?.roles?.includes('ROLE_MODERATOR') ?? false
)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>