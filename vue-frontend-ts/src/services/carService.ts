// services/carService.ts

import { api } from './api'

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
    return api.get<CarsResponse>('/cars')
  },
 getById(id: number) {
  return api.get<CarsResponse>(`/cars/${id}`)
},

  create(car: Omit<Car, 'id'>) {
    return api.post<Car>('/cars', car)
  },

  update(car: Car) {
    return api.put<Car>('/cars', car)
  },

  delete(id: number) {
    return api.delete<void>(`/cars/${id}`)
  }
}