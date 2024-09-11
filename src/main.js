import { createApp } from "vue"
import { createPinia } from "pinia"
import { initializeApp } from "firebase/app"
import "./style.css"
import App from "./App.vue"
import router from "./service/router"

const firebaseConfig = {
  apiKey: "AIzaSyCjfCdiHOc1WJZPFmml6cly_tpBT7aiJis",
  authDomain: "vue-project-palmo.firebaseapp.com",
  projectId: "vue-project-palmo",
  storageBucket: "vue-project-palmo.appspot.com",
  messagingSenderId: "945820437459",
  appId: "1:945820437459:web:f6c0652ebbeb6cda8abd26",
}

initializeApp(firebaseConfig)
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount("#app")
