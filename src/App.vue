<template>
  <div>
    <HeaderPage />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useAuthStore } from "./stores/AuthStore"
import HeaderPage from "./pages/header/HeaderPage.vue"

const authStore = useAuthStore()

const tokens = JSON.parse(localStorage.getItem("userTokens"))

function chekedUser() {
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.email = tokens.email
  }
}

chekedUser()
</script>
<style scoped></style>
