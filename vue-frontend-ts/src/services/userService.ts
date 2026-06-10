// services/userService.ts

import { apiFetch } from './api'

export const userService = {
  getPublicContent() {
    return apiFetch<string>('/api/test/all', {
      skipAuth: true
    })
  },

  getUserBoard() {
    return apiFetch<string>('/api/test/user')
  },

  getModeratorBoard() {
    return apiFetch<string>('/api/test/mod')
  },

  getAdminBoard() {
    return apiFetch<string>('/api/test/admin')
  }
}