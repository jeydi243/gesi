import { createApp } from "vue"
import * as mdiVue from "mdi-vue"
import * as mdijs from "@mdi/js"
import App from "./App.vue"
import "./assets/style.css"
import "./assets/flaticons.css"
import router from "./router"
import store from "./store/index"
import NProgress from "vue-nprogress"
const nprogress = new NProgress()
import "boxicons"

createApp(App)
  .use(router)
  .use(store)
  .use(nprogress)
  .use(mdiVue, {
    icons: mdijs,
  })
  .mount("#app")
