import { api } from './api'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
authStore.initializeAuth();
export interface TestResponse {
  message: string
}

export const userService = {
  /**
   * Get public content (no authentication required)
   */
  getPublicContent() {
    return api.get<TestResponse>('/test/all')
  },

  /**
   * Get user board content (requires USER role)
   */
  getUserBoard() {
    return api.get<TestResponse>('/test/user')
  },

  /**
   * Get moderator board content (requires MODERATOR role)
   */
  getModeratorBoard() {
    return api.get<TestResponse>('/test/mod', authStore.token)
  },

  /**
   * Get admin board content (requires ADMIN role)
   */
  getAdminBoard() {
    return api.get<string>('/api/test/admin', authStore.token)
  }
}