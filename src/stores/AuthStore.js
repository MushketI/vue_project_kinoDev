import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import axios from "axios"

const apiKeyFirebase = "AIzaSyCjfCdiHOc1WJZPFmml6cly_tpBT7aiJis"

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    userInfo: {
      token: "",
      email: "",
      userId: "",
      refreshToken: "",
      expireIn: "",
    },
    authError: "",
    router: useRouter(),
  }),
  //computed
  getters: () => {},
  //methods
  actions: {
    auth(payload, type) {
      const stringUrl = type === "singUp" ? "signUp" : "signInWithPassword"

      this.authError = ""

      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKeyFirebase}`,
          {
            ...payload,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log("Store reg:", res)

          this.userInfo = {
            token: res.data.idToken,
            email: res.data.email,
            userId: res.data.localId,
            refreshToken: res.data.refreshToken,
            expireIn: res.data.expireIn,
          }

          //Save user in localStorage
          localStorage.setItem(
            "userTokens",
            JSON.stringify({
              token: this.userInfo.token,
              email: this.userInfo.email,
            })
          )

          this.router.push("/profile")
        })
        .catch((error) => {
          console.log(error)
          switch (error.response.data.error.message) {
            case "EMAIL_EXISTS":
              this.authError = "Email exists"
              break
            case "OPERATION_NOT_ALLOWED":
              this.authError = "Operation not allowed"
              break
            case "EMAIL_NOT_FOUND":
              this.authError = "Email not found"
              break
            case "INVALID_PASSWORD":
              this.authError = "Invalid password"
              break
            case "INVALID_LOGIN_CREDENTIALS":
              this.authError = "Invalid login credentials"
              break
            default:
              this.authError = "Error"
              break
          }
        })
    },
    logout() {
      localStorage.removeItem("userTokens")
      this.userInfo = {
        token: "",
        email: "",
        userId: "",
        refreshToken: "",
        expireIn: "",
      }
      console.log("logout")
    },
  },
})
