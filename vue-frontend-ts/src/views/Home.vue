<template>
  <div class="container mt-4">
    <!-- Welcome Section -->
    <div class="jumbotron bg-light rounded-3 p-5 mb-4 text-center">
      <h1 class="display-5 fw-bold">
        <font-awesome-icon icon="car" class="text-primary me-3" />
        Welcome to Car Management System
      </h1>
      <p class="lead mt-3">
        Manage your vehicle inventory efficiently
      </p>
      
      <div v-if="isLoggedIn" class="mt-4">
        <p class="h5">
          Hello, <strong>{{ currentUser?.username }}</strong>! 👋
        </p>
      </div>
      
     
    </div>

    <!-- Quick Actions -->
    <div class="row g-4">
      <!-- Car Management Card -->
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body text-center">
            <div class="display-1 text-primary mb-3">
              <font-awesome-icon icon="list" />
            </div>
            <h5 class="card-title">Car Inventory</h5>
            <p class="card-text text-muted">
              View, search, and manage all vehicles in the system.
            </p>
            <router-link to="/cars" class="btn btn-primary">
              View All Cars
            </router-link>
          </div>
        </div>
      </div>

      <!-- Add Car Card -->
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body text-center">
            <div class="display-1 text-success mb-3">
              <font-awesome-icon icon="plus" />
            </div>
            <h5 class="card-title">Add New Car</h5>
            <p class="card-text text-muted">
              Register a new vehicle into the system.
            </p>
            <router-link to="#" class="btn btn-success">
              Add Car
            </router-link>
          </div>
        </div>
      </div>

      <!-- Profile / Stats -->
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body text-center">
            <div class="display-1 text-info mb-3">
              <font-awesome-icon icon="user" />
            </div>
            <h5 class="card-title">My Profile</h5>
            <p class="card-text text-muted">
              Manage your account and view activity.
            </p>
            <router-link v-if="isLoggedIn" to="#" class="btn btn-info text-white">
              Go to Profile
            </router-link>
            <router-link v-else to="/login" class="btn btn-info text-white">
              Login to Continue
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Features -->
    <div v-if="isAdmin" class="mt-5">
      <h4 class="mb-3 text-danger">
        <font-awesome-icon icon="shield-alt" class="me-2" />
        Administrator Panel
      </h4>
      <div class="alert alert-warning">
        <router-link to="/admin" class="alert-link">Access Admin Board →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const currentUser = computed(() => authStore.user)
const isAdmin = computed(() => authStore.isAdmin)
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
}
</style>