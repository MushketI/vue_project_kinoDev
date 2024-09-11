<template>
  <div className="w-7/12 mt-5 mx-auto bg-slate-100">
    <div v-if="!isLoading">
      <div class="flex justify-end pl-5 pr-5 pt-5">
        <div class="w-3/12">
          <img :src="posterData" alt="Постер фильма" className="w-60 mt-7" />
        </div>
        <div className="w-9/12">
          <div class="flex justify-end">
            <button @click="addToFavorite" class="text-4xl text-yellow-400">
              {{ isFavorite ? "&#9733;" : "&#9734;" }}
            </button>
          </div>
          <h1 className="text-xl font-semibold ml-36 mb-2">
            {{ singleMovie.title }}
          </h1>
          <div className="">
            <span className="w-28 font-semibold text-lg inline-flex"
              >Дата выхода:
            </span>
            <span className="text-lg">{{ setDateRelease() }}</span>
          </div>
          <div>
            <span className="w-28 font-semibold text-lg inline-flex"
              >Бюджет:
            </span>
            <span className="text-lg">{{ setBudget() }} $</span>
          </div>
          <div>
            <span className="w-28 font-semibold text-lg inline-flex"
              >Страна:
            </span>
            <span
              v-for="(item, index) in singleMovie.origin_country"
              :key="index"
              className="text-lg"
            >
              {{ item }}</span
            >
          </div>
          <div>
            <span className="w-28 font-semibold text-lg inline-flex"
              >Время:
            </span>
            <span className="text-lg">{{ singleMovie.runtime }} мин.</span>
          </div>
          <div>
            <span className="w-28 font-semibold text-lg inline-flex"
              >Слоган:
            </span>
            <span className="text-lg">{{ singleMovie.tagline }}</span>
          </div>
          <div>
            <span className="w-28 font-semibold text-lg inline-flex"
              >Доход:
            </span>
            <span className="text-lg">{{ setRevenue() }} $</span>
          </div>
          <div>
            <span className="w-28 font-semibold text-lg inline-flex"
              >Жанры:
            </span>
            <span
              v-for="(item, index) in singleMovie.genres"
              :key="index"
              className="text-lg"
              >{{ setGenres(item, index) }}</span
            >
          </div>
        </div>
      </div>
      <div className=" p-5">
        <h1 className="font-semibold">
          Про что фильм: {{ singleMovie.title }}
        </h1>
        <p class="description">
          {{ singleMovie.overview }}
        </p>
      </div>
      <div className="mx-auto ">
        <div className="p-5">
          <iframe className="w-full h-[720px]" :src="srcYouTube"></iframe>
        </div>
      </div>
    </div>
    <div v-else className="flex justify-center mt-36 bg-white">
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
import { useMovieStore } from "../../../stores/MoviesStore"
import axios from "axios"

export default {
  data() {
    return {
      movieStore: useMovieStore(),
      singleMovie: null,
      video: null,
      posterData: null,
      srcYouTube: null,
      isLoading: "",
      isFavorite: "",
    }
  },
  updated() {
    console.log("update")
  },
  methods: {
    addToFavorite() {
      const favoriteMovie = {
        id: this.singleMovie.id,
        title: this.singleMovie.title,
        img: this.posterData,
      }

      const storageArray = JSON.parse(localStorage.getItem("favoriteMovies"))

      if (!storageArray.find((item) => item.id === favoriteMovie.id)) {
        storageArray.push(favoriteMovie)
        localStorage.setItem("favoriteMovies", JSON.stringify(storageArray))

        this.isFavorite = true
      } else {
        const removeItem = storageArray.filter(
          (item) => item.id != favoriteMovie.id
        )

        localStorage.setItem("favoriteMovies", JSON.stringify(removeItem))

        this.isFavorite = false
      }
    },
  },
  updated() {},
  mounted() {
    const storageArray = JSON.parse(localStorage.getItem("favoriteMovies"))
    console.log(storageArray)

    if (!storageArray.find((item) => item.id == this.$route.params.id)) {
      this.isFavorite = false
      console.log("true")
    } else {
      console.log("else")
      this.isFavorite = true
    }
  },
  computed: {
    // getMovieInFavorite() {
    //   const arr = JSON.parse(localStorage.getItem("favoriteMovies"))
    //   console.log(arr)

    //   if (arr.find((item) => item.id == this.singleMovie.id)) {
    //     return "&#9733;"
    //   } else {
    //     return "&#9734;"
    //   }
    // },
    setGenres() {
      return (item, index) => {
        const lengthArr = this.singleMovie.genres.length

        if (lengthArr === index + 1) {
          return item.name + ""
        } else {
          return item.name + ", "
        }
      }
    },
    setDateRelease() {
      return () => {
        let str = this.singleMovie.release_date.split("-").join(".")
        return str
      }
    },
    setBudget() {
      return () => {
        let a = this.singleMovie.budget.toString().split("")
        let str = ""

        for (let i = 0; i < a.length; i++) {
          if (i === 2) {
            str += a[i] + " "
          } else if (i === 5) {
            str += a[i] + " "
          } else {
            str += a[i]
          }
        }

        return str
      }
    },
    setRuntime() {
      return () => {
        let a = this.singleMovie.runtime
      }
    },
    setRevenue() {
      return () => {
        let a = this.singleMovie.revenue.toString().split("")
        let str = ""

        for (let i = 0; i < a.length; i++) {
          if (i === 2) {
            str += a[i] + " "
          } else if (i === 5) {
            str += a[i] + " "
          } else {
            str += a[i]
          }
        }

        return str
      }
    },
  },
  created() {
    this.isLoading = true
    //Get info movie
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/" + this.$route.params.id,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU4NjIzYzJkMDQ3Nzk3Y2QzODQxNDRkYTJhZDcyZSIsIm5iZiI6MTcyNDg3MjU5NC43MjgyMDEsInN1YiI6IjY2Y2Y3NjMxOTM1MDE5MTNkNWVjMmRlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7pBaU5luIWeQrKWIrZA3Ng7B5XKwVfhhLKmSE3kfdxQ",
      },
    }

    axios
      .request(options)
      .then((response) => {
        console.log("response single film", response.data)
        this.singleMovie = response.data

        this.posterData =
          "https://image.tmdb.org/t/p/w500" + response.data.poster_path

        this.isLoading = false
      })
      .catch((error) => {
        console.error(error)
      })

    //Get movie video
    const optionsVideoGet = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU4NjIzYzJkMDQ3Nzk3Y2QzODQxNDRkYTJhZDcyZSIsIm5iZiI6MTcyNDg3MjU5NC43MjgyMDEsInN1YiI6IjY2Y2Y3NjMxOTM1MDE5MTNkNWVjMmRlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7pBaU5luIWeQrKWIrZA3Ng7B5XKwVfhhLKmSE3kfdxQ",
      },
    }

    axios
      .request(optionsVideoGet)
      .then((response) => {
        console.log("video:", response.data.results)

        this.video = response.data.results.find(
          (item) => item.name === "Official Trailer"
        )

        if (!this.video) {
          this.video = response.data.results[1]
        }

        this.srcYouTube = "https://www.youtube.com/embed/" + this.video.key
      })
      .catch((error) => {
        console.error(error)
      })
  },
}
</script>

<style>
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
