<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">

          <div class="card-header bg-dark text-white text-center py-3">
            <h4 class="mb-0">
              <font-awesome-icon icon="sign-in-alt" class="me-2" />
              Login
            </h4>
          </div>

          <div class="card-body p-4">

            <!-- Error -->
            <div
              v-if="message"
              class="alert"
              :class="success ? 'alert-success' : 'alert-danger'"
            >
              {{ message }}
            </div>

            <Form
              :validation-schema="schema"
              @submit="onSubmit"
            >
              <!-- Username -->
              <div class="mb-3">
                <label>Username</label>
                <Field
                  name="username"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage
                  name="username"
                  class="text-danger"
                />
              </div>

              <!-- Password -->
              <div class="mb-4">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  class="form-control"
                />
                <ErrorMessage
                  name="password"
                  class="text-danger"
                />
              </div>

              <button
                class="btn btn-primary w-100"
                :disabled="authStore.loading"
              >
                <span
                  v-if="authStore.loading"
                  class="spinner-border spinner-border-sm me-2"
                />
                Login
              </button>
            </Form>

            <div class="text-center mt-3">
              <router-link to="/register">
                Create account
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import type { SubmissionHandler } from "vee-validate";

import { useAuthStore } from "@/stores/auth";

interface LoginForm {
  username: string;
  password: string;
}

const router = useRouter();
const authStore = useAuthStore();

const message = ref("");
const success = ref(false);

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push("/profile");
  }
});

const onSubmit: SubmissionHandler = async (values) => {
  message.value = "";
  success.value = false;

  try {
    await authStore.login(values as LoginForm);

    success.value = true;
    message.value = "Login successful";

    setTimeout(() => {
      router.push("/home"); // หรือ /profile
    }, 800);

  } catch (err: any) {
    message.value =
      err?.response?.data?.message ||
      err?.message ||
      authStore.error ||
      "Login failed";

    success.value = false;
  }
};
</script>