<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 col-lg-4">

        <div class="card shadow">

          <div class="card-header bg-dark text-white text-center py-3">
            <h4 class="mb-0">
              <font-awesome-icon icon="user-plus" class="me-2" />
              Register
            </h4>
          </div>

          <div class="card-body p-4">

            <!-- Message -->
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
                <Field name="username" class="form-control" />
                <ErrorMessage name="username" class="text-danger" />
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label>Email</label>
                <Field name="email" type="email" class="form-control" />
                <ErrorMessage name="email" class="text-danger" />
              </div>

              <!-- Password -->
              <div class="mb-4">
                <label>Password</label>
                <Field name="password" type="password" class="form-control" />
                <ErrorMessage name="password" class="text-danger" />
              </div>

              <button
                class="btn btn-primary w-100"
                :disabled="authStore.loading"
              >
                <span
                  v-if="authStore.loading"
                  class="spinner-border spinner-border-sm me-2"
                />
                Register
              </button>

            </Form>

            <div class="text-center mt-3">
              <router-link to="/login" class="text-decoration-none">
                Already have an account?
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

import { useAuthStore, type RegisterCredentials } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const successful = ref(false);
const message = ref("");

const schema = yup.object({
  username: yup.string().required().min(3).max(20),
  email: yup.string().required().email().max(50),
  password: yup.string().required().min(6).max(40),
});

const loggedIn = computed(() => authStore.isLoggedIn);

onMounted(() => {
  if (loggedIn.value) {
    router.push("/profile");
  }
});

// ✅ FIX TYPE ERROR HERE
const onSubmit: SubmissionHandler = async (values) => {
  try {
    const res = await authStore.register(values as RegisterCredentials);

    message.value = res?.message || "Register success";

    successful.value = true;

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  } catch (err: any) {
    message.value =
      err?.response?.data?.message ||
      err?.message ||
      authStore.error ||
      "Register failed";

    successful.value = false;
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px;
  padding: 40px;
}

.card {
  background: #f7f7f7;
  margin-top: 50px;
  padding: 20px;
  border-radius: 6px;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: auto;
  display: block;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
