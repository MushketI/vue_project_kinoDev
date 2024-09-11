<template>
  <div class="w-7/12 h-20 flex mx-auto">
    <div class="w-6/12 flex items-center bg-slate-200">
      <Search />
    </div>
    <div class="w-6/12 flex justify-end items-center pr-5 bg-slate-200">
      <Select />
    </div>
  </div>
  <div className="w-7/12 mt-5 mx-auto  p-5  bg-slate-200">
    <div v-if="movieStore.isLoadingMovie" class="flex justify-center p-10">
      <div class="loader"></div>
    </div>
    <div v-if="movieStore.moviesError">
      <ErrorPage />
    </div>
    <div class="flex flex-wrap gap-7 pb-5">
      <transition-group :name="movieStore.isAnimate ? 'fade' : ''">
        <div v-for="item in movieStore.movies" :key="item" class="mx-auto">
          <Movie v-bind:movie="item" />
        </div>
      </transition-group>
    </div>
    <Pagination />
  </div>
</template>

<script>
import { useMovieStore } from "../../../stores/MoviesStore"
import Pagination from "../../../components/paginate/Pagination.vue"
import Movie from "../movie/Movie.vue"
import Search from "../../../components/navigation/search/Search.vue"
import Select from "../../../components/navigation/select/Select.vue"
import ErrorPage from "../../errorPage/ErrorPage.vue"

export default {
  data() {
    return {
      movieStore: useMovieStore(),
    }
  },
  props: {},
  components: {
    Movie,
    Pagination,
    Search,
    Select,
    ErrorPage,
  },

  created() {
    // console.log("animate", this.movieStore.isAnimate)
    // console.log("this.$route.params.pageNumber", this.$route.params.pageNumber)
    // console.log("this.movieStore.page", this.movieStore.page)
    this.movieStore.page = this.$route.params.pageNumber
    this.movieStore.getMovies()
  },
  mounted() {},
  updated() {},
  watch: {},
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #514b82;
  animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;
}
@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }
  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}
@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
