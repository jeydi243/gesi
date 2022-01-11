import App from "./App.vue"
import store from "./store/index"
import { createApp } from "vue"
import * as mdiVue from "mdi-vue3"
import * as mdijs from "@mdi/js"
import "./assets/style.css"
import "./assets/flaticons.css"
import "vue-cal/dist/vuecal.css"
import router from "./router"
import NProgress from "vue-nprogress"
const nprogress = new NProgress()
import VueApexCharts from "vue3-apexcharts"
import "boxicons"

const app = createApp(App)
  .use(router)
  .use(store)
  .use(VueApexCharts)
  .use(nprogress)
  .use("mdicon", mdiVue, {
    icons: mdijs,
  })
  .mount("#app")

app.component(VueApexCharts)
