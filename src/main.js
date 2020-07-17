import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { firestorePlugin } from 'vuefire'
import VueFilterDateFormat from 'vue-filter-date-format'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(ElementUI)
Vue.use(VueFilterDateFormat)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
