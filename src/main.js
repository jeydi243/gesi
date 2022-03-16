import App from "./App.vue"
import store from "./store/index"
import { createApp } from "vue"
import Toast, { POSITION } from "vue-toastification"
import { configure } from "vee-validate"
import * as mdiVue from "mdi-vue3"
import * as mdijs from "@mdi/js"
import "./assets/style.css"
import "./assets/flaticons.css"
import "vue-cal/dist/vuecal.css"
import "vue-toastification/dist/index.css"
import "sweetalert2/dist/sweetalert2.min.css"
import "boxicons"
import router from "./router"
import NProgress from "vue-nprogress"
const nprogress = new NProgress()
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

// Default values
configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
})

// import VueSocketIO from "vue-3-socket.io"
// var socketOption = {
//   debug: true,
//   connection: "http://localhost:3000",
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",w
//     mutationPrefix: "SOCKET_",
//   },
//   options: { path: "/events/" }, //Optional options
// }
// var socket = new VueSocketIO(socketOption)

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
}

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Toast, { position: POSITION.TOP_RIGHT })
  .use(VueApexCharts)
  .use(nprogress)
  .use(VueSweetalert2, options)
  //   .use(socket)
  .use("mdicon", mdiVue, {
    icons: mdijs,
  })
  .mount("#app")
