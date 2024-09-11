<template>
  <div className="w-60 bg-white cursor-pointer">
    <RouterLink :to="'/movie/' + movie.id">
      <div>
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt=""
        />
      </div>
      <div className="px-1">
        <h3
          className="h-5 pt-1 text-center text-xs font-semibold text-slate-600 my-0 mx-auto"
        >
          {{ movie.original_title }}
        </h3>
        <span
          v-for="(item, index) in movie.genre_ids"
          :key="index"
          className="inline text-xs text-slate-600"
        >
          {{ getGenreMovie(item, index) }}
        </span>
      </div>
      <div className="relative flex px-1">
        <p className="text-xs text-slate-500  ">
          {{ updateDateMovie(movie.release_date) }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>
<script>
import { useMovieStore } from "../../../stores/MoviesStore"

export default {
  components: {},
  data() {
    return {
      movieStore: useMovieStore(),
    }
  },
  props: {
    movie: Object,
  },
  computed: {
    getGenreMovie() {
      return (id, index) => {
        //Найти жанры фильмов
        const genres = this.movieStore.genresId.find((item) => item.id === id)
        const lengthGenrIds = this.movie.genre_ids.length

        if (lengthGenrIds === index + 1) {
          return genres.name + " "
        } else {
          return genres.name + ", "
        }
      }
    },
    updateDateMovie() {
      return (str) => {
        //Получаем полную дату, обрезаем до 2024
        return str.slice(0, 4) + " "
      }
    },
  },
  mounted() {},
}
</script>
<style></style>
