import App from "./App.vue"
import store from "./store/index"
import router from "./router"
import NProgress from "vue-nprogress"
import { useToast } from "vue-toastification"
import { createApp } from "vue"
import { setLocale } from "yup"
import VueApexCharts from "vue3-apexcharts"
import VueSweetalert2 from "vue-sweetalert2"
import Toast, { POSITION } from "vue-toastification"
import { configure } from "vee-validate"
import * as mdiVue from "mdi-vue3"
import * as mdijs from "@mdi/js"
import { vfmPlugin } from "vue-final-modal"

import "./assets/css/style.css"
import "vue-cal/dist/vuecal.css"
import "vue-cal/dist/i18n/fr.js"
import "vue-toastification/dist/index.css"
import "sweetalert2/dist/sweetalert2.min.css"
import "boxicons"

setLocale({
  mixed: {
    default: "Não é válido",
    required: "Ce champ est requis",
  },
  number: {
    min: "La valeur minimum n'est pas respecté",
  },
  string: { min: "Le minimum de caractères n'est pas respecté" },
})

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
}

const app = createApp(App)
  .use(router)
  .use(
    vfmPlugin({
      key: "$modal",
      componentName: "Modal",
      dynamicContainerName: "modal-content",
    })
  )
  .use(store)
  .use(Toast, { position: POSITION.TOP_RIGHT })
  .use(VueApexCharts)
  .use(new NProgress())
  .use(VueSweetalert2, options)
  //   .use(socket)
  .use("mdicon", mdiVue, {
    icons: mdijs,
  })

app.config.globalProperties.filters = {
  firstUpper(value) {
    //upper the first letter
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
}

app.config.globalProperties.toast = useToast()
app.mount("#app")
