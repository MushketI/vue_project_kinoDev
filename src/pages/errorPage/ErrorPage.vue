<template>
  <div class="h-screen pt-32">
    <h1 class="text-center text-2xl text-slate-600 font-semibold">
      {{ movieStore.moviesError }}
    </h1>
    <p class="text-center text-2xl text-slate-600 font-semibold">
      Повторите попытку позже
    </p>
  </div>
</template>
<script>
import { useMovieStore } from "../../stores/MoviesStore"

export default {
  data() {
    return {
      movieStore: useMovieStore(),
    }
  },
}
</script>
<style></style>
