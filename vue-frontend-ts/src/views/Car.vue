<template>
  <div v-if="currentCar" class="edit-form">
    <h4>Edit Car</h4>

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
        <input
          id="price"
          v-model.lazy="priceDisplay"
          v-number="numberFormat"
          type="text"
          class="form-control"
          required
        />
      </div>

      <button type="button" class="btn btn-danger mr-2" @click="deleteCar">
        Delete
      </button>
      <button type="button" class="btn btn-primary mr-2" @click="updateCar">
        Update
      </button>
      <button type="button" class="btn btn-info" @click="goBack">
        Back
      </button>
    </form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Car...</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { directive as VNumber } from '@coders-tm/vue-number-format'

import { carService } from '@/services/carService'
import type { Car } from '@/services/carService'

const vNumber = VNumber

const route = useRoute()
const router = useRouter()

const currentCar = reactive<Car>({
  id: 0,
  name: '',
  price: null,
})

// Separate display value for better sync with directive
const priceDisplay = ref<string | number>('')

const message = ref('')

const numberFormat = {
  decimal: '.',
  separator: ',',
  prefix: '',
  precision: 2,
  masked: false,
}

// Sync currentCar.price <-> priceDisplay
watch(
  () => currentCar.price,
  (newVal) => {
    priceDisplay.value = newVal !== null ? newVal : ''
  },
  { immediate: true }
)

watch(priceDisplay, (newVal) => {
  if (newVal === '' || newVal === null) {
    currentCar.price = null
  } else {
    const num = parseFloat(String(newVal).replace(/,/g, ''))
    currentCar.price = isNaN(num) ? null : num
  }
})

const getCar = async (id: number) => {
  try {
    const response = await carService.getById(id)

    if (response?.rows?.length > 0) {
      const carData = response.rows[0] as Car
      Object.assign(currentCar, {
        id: carData.id,
        name: carData.name ?? '',
        price: typeof carData.price === 'string'
          ? parseFloat(carData.price.replace(/,/g, ''))
          : Number(carData.price) || null,
      })
    }
  } catch (error) {
    console.error(error)
    message.value = 'Failed to load car'
  }
}

const updateCar = async () => {
  if (!currentCar.name?.trim() || currentCar.price === null) {
    message.value = 'Name and Price are required'
    return
  }

  try {
    await carService.update(currentCar)
    message.value = '✅ Car updated successfully!'
  } catch (error: any) {
    message.value = error.message || 'Update failed'
  }
}

const deleteCar = async () => {
  if (!currentCar.id) return
  if (!confirm('Delete this car?')) return

  try {
    await carService.delete(currentCar.id)
    router.push('/cars')
  } catch (error) {
    console.error(error)
  }
}

const goBack = () => router.push('/cars')

onMounted(async () => {
  const id = Number(route.params.id)
  if (!Number.isNaN(id) && id > 0) {
    await getCar(id)
  }
})
</script>