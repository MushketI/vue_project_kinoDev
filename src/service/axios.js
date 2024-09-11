import axios from "axios"
import kinopoiskdev from "@api/kinopoiskdev"

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
})

export default axiosInstance
