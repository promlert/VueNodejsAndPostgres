import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiFetch } from "@/services/api";

export interface User {
  id?: number;
  username: string;
  email?: string;
  roles?: string[];
  accessToken?: string;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthStatus {
  loggedIn: boolean;
}

const API_AUTH_URL = "/api/auth";

export const useAuthStore = defineStore("auth", () => {
  // state
  const status = ref<AuthStatus>({ loggedIn: false });
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // getters
  const isLoggedIn = computed(() => !!user.value);

  const currentUser = computed(() => user.value);

  const token = computed(() =>
    user.value?.accessToken ||
    user.value?.token ||
    localStorage.getItem("token") ||
    null
  );

  const isAdmin = computed(() =>
    user.value?.roles?.includes("ROLE_ADMIN") ?? false
  );

  // init
  const initializeAuth = () => {
    try {
      const saved = localStorage.getItem("user");
      if (!saved) return;

      user.value = JSON.parse(saved);
      status.value.loggedIn = true;
    } catch {
      logout();
    }
  };

  // login
  const login = async (credentials: LoginCredentials) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await apiFetch(`${API_AUTH_URL}/signin`, {
        method: "POST",
        body: JSON.stringify(credentials),
        skipAuth: true,
      });

      const userData: User = {
        ...data,
        accessToken: data.accessToken || data.token,
      };

      user.value = userData;
      status.value.loggedIn = true;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem(
        "token",
        userData.accessToken || userData.token || ""
      );

      return userData;
    } catch (err: any) {
      error.value =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // register
  const register = async (credentials: RegisterCredentials) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await apiFetch(`${API_AUTH_URL}/signup`, {
        method: "POST",
        body: JSON.stringify(credentials),
        skipAuth: true,
      });

      return res;
    } catch (err: any) {
      error.value =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";

      throw err;
    } finally {
      loading.value = false;
    }
  };

  // logout
  const logout = () => {
    user.value = null;
    status.value.loggedIn = false;
    error.value = null;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    // state
    status,
    user,
    loading,
    error,

    // getters
    isLoggedIn,
    currentUser,
    token,
    isAdmin,

    // actions
    initializeAuth,
    login,
    register,
    logout,
  };
});