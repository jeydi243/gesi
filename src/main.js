import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAnime from 'vue-animejs';
import moment from 'moment'
import getUserLocale from 'get-user-locale'
moment.locale(getUserLocale());
Vue.use(moment);
Vue.use(VueAnime)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
