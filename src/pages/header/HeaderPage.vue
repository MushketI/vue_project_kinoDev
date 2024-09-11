<template>
  <header
    className="w-7/12 h-10 px-5 mt-3 mx-auto flex items-center gap-10 bg-slate-400"
  >
    <div className="w-4/12"></div>
    <div className="w-8/12 flex justify-end items-center gap-5">
      <RouterLink
        :to="'/movies/page=' + getPageBack"
        @click="setPage()"
        class="hover:text-slate-100"
        >Movies</RouterLink
      >
      <RouterLink
        v-if="!authStore.userInfo.email"
        to="/login"
        class="hover:text-slate-100 mr-64"
        >Login</RouterLink
      >
      <RouterLink
        v-if="authStore.userInfo.email"
        to="/profile"
        class="hover:text-slate-100 mr-64"
        >Profile</RouterLink
      >
      <span
        v-if="authStore.userInfo.email"
        class="font-semibold text-slate-900 cursor-pointer"
        >{{ authStore.userInfo.email }}</span
      >
    </div>
  </header>
</template>
<script>
import { useMovieStore } from "../../stores/MoviesStore"
import { useAuthStore } from "../../stores/AuthStore"

export default {
  data() {
    return {
      movieStore: useMovieStore(),
      authStore: useAuthStore(),
    }
  },
  methods: {
    setPage() {
      this.movieStore.isAnimate = false
      this.movieStore.getMovies()
    },
  },
  computed: {
    getPageBack() {
      return this.movieStore.page ? this.movieStore.page : 1
    },
  },
}
</script>
<style>
.router-link-active {
  color: white; /* Цвет активной ссылки */
}
</style>
