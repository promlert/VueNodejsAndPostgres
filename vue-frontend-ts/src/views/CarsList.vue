<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="name"
        />
      </div>
    </div>

    <div class="col-md-6">
      <h4>Cars List</h4>

      <ul class="list-group">
        <li
          v-for="(car, index) in filteredCars"
          :key="car.id"
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          @click="setActiveCar(car, index)"
        >
          {{ car.name }}
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentCar">
        <h4>Car</h4>

        <div>
          <label><strong>Name:</strong></label>
          {{ currentCar.name }}
        </div>

        <div>
          <label><strong>Price:</strong></label>
          {{ currentCar.price }}
        </div>

        <router-link
          :to="`/car/${currentCar.id}`"
          class="btn btn-warning"
        >
          Edit
        </router-link>
      </div>

      <div v-else>
        <br />
        <p>Please click on a Car...</p>
      </div>

      <div>
        {{ publishedMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { carService } from '@/services/carService'
import type { Car } from '@/services/carService'

const cars = ref<Car[]>([])
const currentCar = ref<Car | null>(null)
const currentIndex = ref(-1)
const name = ref('')

const publishedMessage = computed(() => name.value)

const filteredCars = computed(() =>
  cars.value.filter(car =>
    car.name
      .toLowerCase()
      .includes((name.value ?? '').toLowerCase())
  )
)

const retrieveCars = async () => {
  try {
    const response = await carService.getAll()
    cars.value = response.rows
  } catch (error) {
    console.error('Failed to load cars:', error)
  }
}

const refreshList = async () => {
  await retrieveCars()
  currentCar.value = null
  currentIndex.value = -1
}

const setActiveCar = (car: Car, index: number) => {
  currentCar.value = car
  currentIndex.value = index
  name.value = car.name
}

onMounted(refreshList)
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>