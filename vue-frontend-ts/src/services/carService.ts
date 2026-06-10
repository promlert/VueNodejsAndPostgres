// services/carService.ts

import { apiFetch } from './api'

export interface Car {
  id: number
  name: string
  price: number | null
}

export interface CarsResponse {
  rows: Car[]
}

export const carService = {
  getAll() {
    return apiFetch<CarsResponse>('/cars')
  },
getById(id: number) {
  return apiFetch<CarsResponse>(`/cars/${id}`)
},

  create(car: Omit<Car, 'id'>) {
    return apiFetch<Car>('/cars', {
      method: 'POST',
      body: JSON.stringify(car)
    })
  },

  update(car: Car) {
    return apiFetch<Car>('/cars', {
      method: 'PUT',
      body: JSON.stringify(car)
    })
  },

  delete(id: number) {
    return apiFetch<void>(`/cars/${id}`, {
      method: 'DELETE'
    })
  }
}