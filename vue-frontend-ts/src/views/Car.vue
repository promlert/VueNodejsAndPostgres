<template>
  <div v-if="currentCar" class="edit-form">
    <h4>Car</h4>

    <form>
      <div class="form-group">
        <label for="name">Name</label>

        <input
          id="name"
          v-model="currentCar.name"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>

        <VueNumber
          v-model="currentCar.price"
          class="form-control"
          v-bind="numberFormat"
        />
      </div>

      <button
        type="button"
        class="btn btn-danger mr-2"
        @click="deleteCar"
      >
        Delete
      </button>

      <button
        type="button"
        class="btn btn-primary mr-2"
        @click="updateCar"
      >
        Update
      </button>

      <button
        type="button"
        class="btn btn-info"
        @click="goBack"
      >
        Back
      </button>
    </form>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Car...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { component as VueNumber } from '@coders-tm/vue-number-format'

import { carService } from '@/services/carService'
import type { Car } from '@/services/carService'

const route = useRoute()
const router = useRouter()

const currentCar = ref<Car | null>(null)

const message = ref('')

const numberFormat = {
  decimal: '.',
  separator: ',',
  prefix: '',
  precision: 2,
  masked: false
}

const getCar = async (id: number) => {
  try {
     const response = await carService.getById(id)

    return {
    ...response.rows[0]
  }
  } catch (error) {
    console.error(error)
  }
}

const updateCar = async () => {
  if (!currentCar.value) return

  try {
    await carService.update(currentCar.value)

    message.value =
      'The car was updated successfully!'
  } catch (error) {
    console.error(error)
  }
}

const deleteCar = async () => {
  if (!currentCar.value) return

  try {
    await carService.delete(currentCar.value.id)

    router.push('/cars')
  } catch (error) {
    console.error(error)
  }
}

const goBack = () => {
  router.push('/cars')
}

onMounted(async () => {
  message.value = ''

  const id = Number(route.params.id)

  if (!Number.isNaN(id)) {
    await getCar(id)
  }
})
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>