<template>
  <div class="flex flex-col">
    <select v-model="movieStore.selectGenres" @change="movieStore.getMovies">
      <option disabled value="null">Movie</option>
      <option
        v-for="genres in movieStore.genresId"
        :key="genres.id"
        :value="genres.id"
      >
        {{ genres.name }}
      </option>
    </select>
  </div>
</template>
<script>
import { useMovieStore } from "../../../stores/MoviesStore"

export default {
  data() {
    return {
      movieStore: useMovieStore(),
    }
  },
}
</script>
<style></style>
