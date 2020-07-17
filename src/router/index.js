import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Progress from '../views/Progress.vue'
import Complete from '../views/Complete.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
