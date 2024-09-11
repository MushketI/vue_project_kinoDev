<template>
  <div className="w-full flex justify-center gap-2 bg-slate-300">
    <!-- old <span
      class="w-5 text-slate-600 hover:text-slate-100 text-lg font-semibold text-center cursor-pointer"
      :class="item == pageActive ? 'isActive' : ''"
      @click="setPage(item)"
      v-for="(item, index) in arr"
      :key="index"
      >{{ item }}</span
    > -->
    <div v-if="!storeMovies.isLoadingMovie">
      <paginate
        v-model="storeMovies.page"
        :page-count="storeMovies.setMaxPages"
        :page-range="9"
        :margin-pages="2"
        :click-handler="setPage"
        class="flex text-slate-700 font-semibold gap-3 cursor-pointer"
        active-class="text-slate-400"
      ></paginate>
    </div>
  </div>
</template>
<script>
import { useMovieStore } from "../../stores/MoviesStore"
import Pagination from "vuejs-paginate-next"

export default {
  data() {
    return {
      storeMovies: useMovieStore(),
    }
  },
  components: {
    paginate: Pagination,
  },
  methods: {
    setPage(pageNumber) {
      if (this.storeMovies.querySearch === null) {
        this.$router.push({ path: "/movies/page=" + pageNumber })
        this.storeMovies.page = pageNumber
        this.storeMovies.isAnimate = true
        this.storeMovies.getMovies()
      } else {
        this.$router.push({ path: "/movies/page=" + pageNumber })
        this.storeMovies.page = pageNumber
        this.storeMovies.isAnimate = true
        this.storeMovies.getSeachMovie()
      }

      window.scrollTo(0, 0)
    },
  },
}
</script>
<style scoped>
.isActive {
  background-color: rgb(226 232 240);
}
</style>
