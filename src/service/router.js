import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/AuthStore"
import Movies from "../pages/moviePages/movies/Movies.vue"
import singleMoviePage from "../pages/moviePages/singleMoviePage/singleMoviePage.vue"
import Register from "../pages/auth/register/Register.vue"
import Login from "../pages/auth/login/Login.vue"
import Profile from "../pages/profile/Profile.vue"
import PageNotFound from "../pages/pageNotFound/PageNotFound.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "pageNotFound", path: "/:pathMatch(.*)*", component: PageNotFound },
    {
      name: "movies",
      path: "/movies/page=:pageNumber",
      component: Movies,
    },
    {
      name: "singleMoviePage",
      path: "/movie/:id",
      component: singleMoviePage,
    },
    {
      name: "register",
      path: "/register",
      component: Register,
      meta: { isAuth: false },
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: { isAuth: false },
    },
    {
      name: "profile",
      path: "/profile",
      component: Profile,
      meta: { isAuth: true },
    },
    { name: "option", path: "/option" },
  ],
})

router.beforeEach((to, from, next) => {
  // from(из) to(куда)
  const authStore = useAuthStore()

  if (to.meta.isAuth && !authStore.userInfo.token) {
    next("/login")
  } else if (to.meta.isAuth === false && authStore.userInfo.token) {
    next("/profile")
  } else {
    next()
  }
})

export default router
