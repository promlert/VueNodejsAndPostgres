<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="car.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <VueNumber
          :model-value="car.price"
          @update:model-value="handlePriceUpdate"
          type="number"
          class="form-control edit-form"
          required
          v-bind="numberFormat"
          name="price"
        />
      </div>
      <button @click="saveCar" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCar">Add New Car</button>
    </div>

    <button class="btn btn-primary" @click="redirect('/cars')">Back</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { component as VueNumber } from '@coders-tm/vue-number-format'
import CarsDataService from '../services/CarsDataService'
import type { Router } from 'vue-router'

// Define interfaces
interface Car {
  id: number | null
  name: string
  price: number | null
}

interface NumberFormat {
  decimal: string
  separator: string
  prefix: string
  precision: number
  masked: boolean
}

// Reactive data
const car = reactive<Car>({
  id: null,
  name: '',
  price: null,
})

const numberFormat: NumberFormat = {
  decimal: '.',
  separator: ',',
  prefix: '',
  precision: 2,
  masked: false,
}

const submitted = ref(false)

// Handle price update (keeps price as number | null)
const handlePriceUpdate = (value: string | number | null) => {
  if (value === '' || value === null || value === undefined) {
    car.price = null
  } else {
    const num = typeof value === 'string' ? parseFloat(value) : value
    car.price = isNaN(num) ? null : num
  }
}

const saveCar = async () => {
  if (!car.name || car.price === null) {
    alert('Please fill all required fields')
    return
  }

  const data = {
    name: car.name,
    price: car.price,
  }

  try {
    const response = await CarsDataService.create(data)
    car.id = response.data.id
    console.log(response.data)
    submitted.value = true
  } catch (e) {
    console.error(e)
  }
}

const newCar = () => {
  submitted.value = false
  Object.assign(car, {
    id: null,
    name: '',
    price: null,
  })
}

const redirect = (path: string) => {
  // Assuming you have access to router (injected or from useRouter)
  const router = useRouter() // Import from 'vue-router'
  router.push({ path })
}

// Make sure to import useRouter if not already available
import { useRouter } from 'vue-router'
</script>