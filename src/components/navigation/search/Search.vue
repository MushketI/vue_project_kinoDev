<template>
  <form @submit.prevent="getSearch()" class="p-5 flex">
    <input
      v-model="movieStore.querySearch"
      type="text"
      class="w-64 text-slate-700"
      placeholder="Search"
    />
    <button
      class="flex justify-center items-center bg-slate-300 opacity-60 w-8"
    >
      <img
        src="../../../assets/free-icon-search-6368029.png"
        class="h-5 opacity-60"
        alt=""
      />
    </button>
  </form>
</template>
<script>
import { useMovieStore } from "../../../stores/MoviesStore"

export default {
  data() {
    return {
      movieStore: useMovieStore(),
    }
  },
  methods: {
    getSearch() {
      this.movieStore.getSeachMovie()
    },
  },
}
</script>
<style></style>
