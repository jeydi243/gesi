import App from "./App.vue"
import store from "./store/index"
import router from "./router"
import VueApexCharts from "vue3-apexcharts"
import VueSweetalert2 from "vue-sweetalert2"
import Toast from "vue-toastification"
import { useToast } from "vue-toastification"
import { vfmPlugin } from "vue-final-modal"
import { createApp } from "vue"
import "tw-elements"

import "./assets/css/style.css"
import "boxicons/css/boxicons.min.css"
import "vue-cal/dist/vuecal.css"
import "vue-cal/dist/i18n/fr.js"
import "vue-toastification/dist/index.css"
import "sweetalert2/dist/sweetalert2.min.css"
import "boxicons"

const optionsSweetAlert = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
}

const app = createApp(App)
  .use(router)
  .use(
    vfmPlugin({
      key: "$vfm",
      componentName: "Modal",
      dynamicContainerName: "modal-content",
    })
  )
  .use(store)
  .use(Toast)
  .use(VueApexCharts)
  .use(VueSweetalert2, optionsSweetAlert)

app.config.globalProperties.filters = {
  firstUpper(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
}
app.config.globalProperties.toast = useToast()
app.config.errorHandler = (err, vm, info) => {
  console.log({ err })
  console.log({ vm })
//   console.log({ info })
}
app.mount("#app")
