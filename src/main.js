import App from "./App.vue"
import router from "./router"
import VueApexCharts from "vue3-apexcharts"
import VueSweetalert2 from "vue-sweetalert2"
import Toast from "vue-toastification"
import { useToast } from "vue-toastification"
import { vfmPlugin } from "vue-final-modal"
import { createApp } from "vue"
import { createPinia } from 'pinia'
import "tw-elements"
import "./assets/css/style.css"
import "boxicons/css/boxicons.min.css"
import "vue-cal/dist/vuecal.css"
import "vue-cal/dist/i18n/fr.js"
import "v-calendar/dist/style.css"
import "vue-toastification/dist/index.css"
import "sweetalert2/dist/sweetalert2.min.css"
import "boxicons"
import VCalendar from "v-calendar"
const optionsSweetAlert = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
}
const pinia = createPinia()

const app = createApp(App)
  .use(router)
  .use(
    vfmPlugin({
      key: "$vfm",
      componentName: "Modal",
      dynamicContainerName: "modal-content",
    })
  )
  .use(pinia)
  .use(Toast)
  .use(VCalendar, {
    componentPrefix: "vc",
  })
  .use(VueApexCharts)
  .use(VueSweetalert2, optionsSweetAlert)

app.config.globalProperties.filters = {
  firstUpper(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
  toiso(value) {
    return new Date(value).getFullYear()
  },
}
app.config.globalProperties.toast = useToast()

app.config.errorHandler = (err, vm, info) => {
  console.log(`${err.stack}`, { err, vm })
}
app.config.warnHandler = (msg, instance, trace) => {
  console.log({ msg }, JSON.stringify(trace))
}
app.mount("#app")
