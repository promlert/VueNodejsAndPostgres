<template>
  <Navbar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>