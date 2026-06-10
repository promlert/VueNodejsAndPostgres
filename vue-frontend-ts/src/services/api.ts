import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = 'http://localhost:3000'

interface ApiOptions extends Omit<RequestInit, 'headers'> {
  skipAuth?: boolean
  retries?: number          // Number of retry attempts
  retryDelay?: number       // Base delay in ms
  retryOn?: number[]        // Status codes to retry on (e.g. [429, 500, 502, 503, 504])
  headers?: Record<string, string> // Explicitly allow string record
}

const DEFAULT_RETRIES = 3
const DEFAULT_DELAY = 1000

/**
 * Global API fetch with retry logic, auth, and error handling
 */
export const apiFetch = async <T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const {
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_DELAY,
    retryOn = [429, 500, 502, 503, 504],
    skipAuth = false,
    ...fetchOptions
  } = options

  const authStore = useAuthStore()
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  const executeRequest = async (attempt: number): Promise<T> => {
    // === Request Interceptor ===
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers
    }

    if (!skipAuth) {
      const token = authStore.token || localStorage.getItem('token')
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    const config: RequestInit = {
      ...fetchOptions,
      headers
    }

    try {
      const response = await fetch(url, config)

      // === Response Interceptor ===
      if (!response.ok) {
        let errorMessage = `HTTP Error! Status: ${response.status}`

        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Ignore JSON parse failure
        }

        // Handle authentication errors
        if (response.status === 401) {
          authStore.logout()
          window.location.href = '/login'
          throw new Error('Session expired. Please login again.')
        }

        if (response.status === 403) {
          throw new Error('Access denied.')
        }

        // Retry logic
        if (attempt < retries && retryOn.includes(response.status)) {
          const delay = retryDelay * Math.pow(2, attempt) // Exponential backoff
          console.warn(`Request failed (${response.status}). Retrying in ${delay}ms... (Attempt ${attempt + 1}/${retries})`)
          
          await new Promise(resolve => setTimeout(resolve, delay))
          return executeRequest(attempt + 1)
        }

        throw new Error(errorMessage)
      }

      // Empty response (e.g. 204 No Content)
      if (response.status === 204) {
        return {} as T
      }

      return await response.json()

    } catch (error: any) {
      // Network errors or other fetch failures
      if (attempt < retries && 
          (error.name === 'TypeError' || error.message.includes('Failed to fetch'))) {
        
        const delay = retryDelay * Math.pow(2, attempt)
        console.warn(`Network error. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${retries})`)
        
        await new Promise(resolve => setTimeout(resolve, delay))
        return executeRequest(attempt + 1)
      }

      console.error(`API Error [${endpoint}] (Attempt ${attempt + 1}):`, error.message)
      throw error
    }
  }

  return executeRequest(0)
}