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

import VueSweetalert2 from "vue-sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
// import VueSocketIO from "vue-3-socket.io"
// var socketOption = {
//   debug: true,
//   connection: "http://localhost:3000",
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",w
//     mutationPrefix: "SOCKET_",
//   },
//   //   options: { path: "/events/" }, //Optional options
// }
// var socket = new VueSocketIO(socketOption)

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
}
const app = createApp(App)
  .use(router)
  .use(store)
  .use(VueApexCharts)
  .use(nprogress)
  .use(VueSweetalert2, options)
  //   .use(socket)
  .use("mdicon", mdiVue, {
    icons: mdijs,
  })
  .mount("#app")

app.component(VueApexCharts)
