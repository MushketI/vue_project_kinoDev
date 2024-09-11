<template>
  <div class="w-7/12 flex mx-auto mt-5 h-screen bg-slate-100">
    <div class="w-10/12 p-5">
      <h1 class="text-2xl text-slate-600">
        Welcome, <span class="font-semibold">{{ setUserName }}</span>
      </h1>
      <h1 class="mt-10 text-xl text-slate-600 font-medium">
        My favorite movies:
      </h1>
      <div class="flex gap-5 mt-3">
        <div
          v-for="item in favoriteMovie"
          :key="item.id"
          class="cursor-pointer"
        >
          <RouterLink :to="'/movie/' + item.id">
            <div class="w-20">
              <img :src="item.img" class="w-20" alt="" />
              <h2
                class="text-sm mt-1 text-slate-600 font-semibold break-normal"
              >
                {{ item.title }}
              </h2>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="w-2/12 p-5 flex h-16 text-slate-800 justify-end">
      <button @click="getLogout()" class="w-16 bg-slate-400">Выйти</button>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "../../stores/AuthStore"

export default {
  data() {
    return {
      authStore: useAuthStore(),
      favoriteMovie: "",
      userName: "",
    }
  },
  methods: {
    getLogout() {
      this.authStore.logout()
      this.$router.push("/movies/page=1")
    },
  },
  created() {
    this.favoriteMovie = JSON.parse(localStorage.getItem("favoriteMovies"))
  },
  computed: {
    setUserName() {
      this.userName = this.authStore.userInfo.email.split("@")[0]
      return (this.userName =
        this.userName.charAt(0).toUpperCase() + this.userName.slice(1))
    },
    // getMoviesInFavorite() {},
  },
}
</script>
<style></style>
