import { defineStore } from "pinia"
import axios from "axios"

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    movies: [],
    page: "",
    totalPages: null,
    isLoadingMovie: true,
    isAnimate: false,
    querySearch: null,
    selectGenres: null,
    favoriteMovies: [],
    moviesError: "",
    genresId: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ],
  }),
  getters: {
    setMaxPages() {
      if (this.totalPages > 500) {
        return (this.totalPages = 499)
      } else {
        return this.totalPages
      }
    },
  },

  actions() {
    this.favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"))
  },
  actions: {
    getMovies() {
      this.isLoadingMovie = true

      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/movie", //movie
        params: {
          language: "en-US",
          page: this.page,
          with_genres: this.selectGenres ? this.selectGenres : "",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU4NjIzYzJkMDQ3Nzk3Y2QzODQxNDRkYTJhZDcyZSIsIm5iZiI6MTcyNDg3MjU5NC43MjgyMDEsInN1YiI6IjY2Y2Y3NjMxOTM1MDE5MTNkNWVjMmRlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7pBaU5luIWeQrKWIrZA3Ng7B5XKwVfhhLKmSE3kfdxQ",
        },
      }

      axios
        .request(options)
        .then((response) => {
          this.movies = response.data.results
          this.page = response.data.page
          this.isLoadingMovie = false
          this.totalPages = response.data.total_pages
          this.moviesError = ""
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
          this.isLoadingMovie = false
          this.moviesError = error.message
        })
    },

    getSeachMovie() {
      this.isLoadingMovie = true

      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          language: "en-US",
          page: this.page,
          query: this.querySearch,
          with_genres: this.selectGenres ? this.selectGenres : "",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTU4NjIzYzJkMDQ3Nzk3Y2QzODQxNDRkYTJhZDcyZSIsIm5iZiI6MTcyNDg3MjU5NC43MjgyMDEsInN1YiI6IjY2Y2Y3NjMxOTM1MDE5MTNkNWVjMmRlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7pBaU5luIWeQrKWIrZA3Ng7B5XKwVfhhLKmSE3kfdxQ",
        },
      }

      axios
        .request(options)
        .then((response) => {
          console.log("search", response.data)

          this.totalPages = response.data.total_pages
          this.movies = response.data.results.filter(
            (item) => item.backdrop_path
          )
          this.page = response.data.page
          this.isLoadingMovie = false
          this.moviesError = ""
        })
        .catch((error) => {
          console.error(error)
          this.isLoadingMovie = false
          this.moviesError = error.message
        })
    },
  },
})
