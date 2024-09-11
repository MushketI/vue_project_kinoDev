<template>
  <div class="w-7/12 mx-auto pt-28 h-screen">
    <form @submit.prevent="registerUser()">
      <div class="w-96 h-64 p-2 mx-auto bg-slate-100">
        <h2 class="font-semibold text-slate-700">Sing up</h2>
        <div v-if="authStore.authError" class="text-red-600 font-semibold">
          {{ authStore.authError }}
        </div>
        <div class="flex flex-col py-2">
          <label for="email" class="text-slate-700">Email</label>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Your email"
            class="border-2 border-slate-200 focus:border-slate-500 text-slate-700"
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-slate-700">Password</label>
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
            class="border-2 border-slate-200 focus:border-slate-500 text-slate-700"
          />
        </div>
        <div class="pt-4">
          <button class="w-full bg-slate-600 text-slate-200">Register</button>
        </div>
        <div class="pt-2">
          <span class="text-slate-500 text-sm"
            >Are you already registered?
            <RouterLink to="/login" class="text-slate-700"
              >Sing in</RouterLink
            ></span
          >
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useAuthStore } from "../../../stores/AuthStore"

export default {
  data() {
    return {
      email: "",
      password: "",
      authStore: useAuthStore(),
    }
  },
  methods: {
    registerUser() {
      this.authStore.auth(
        {
          email: this.email,
          password: this.password,
        },
        "singUp"
      )
    },
  },
}
</script>
<style></style>
