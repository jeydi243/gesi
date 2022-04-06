import App from "./App.vue"
import store from "./store/index"
import { createApp } from "vue"

import Toast, { POSITION } from "vue-toastification"
import { configure } from "vee-validate"
import * as mdiVue from "mdi-vue3"
import * as mdijs from "@mdi/js"

import "./assets/style.css"
import "vue-cal/dist/vuecal.css"
import 'vue-cal/dist/i18n/fr.js'
import "vue-toastification/dist/index.css"
import "sweetalert2/dist/sweetalert2.min.css"
import "boxicons"
import router from "./router"
import NProgress from "vue-nprogress"
import VueApexCharts from "vue3-apexcharts"
import VueSweetalert2 from "vue-sweetalert2"
import { setLocale } from "yup"
// Import the CSS or use your own!

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
  .use(store)
  .use(Toast, { position: POSITION.TOP_RIGHT })
  .use(VueApexCharts)
  .use(new NProgress())
  .use(VueSweetalert2, options)
  //   .use(socket)
  .use("mdicon", mdiVue, {
    icons: mdijs,
  })
  .mount("#app")
