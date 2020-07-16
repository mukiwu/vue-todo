import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'
import { Form, FormItem } from 'element-ui';

Vue.config.productionTip = false
Vue.use(firestorePlugin)

Vue.use(Form)
Vue.use(FormItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
