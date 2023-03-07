import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CapitalH from '../components/CapitalH.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: HomeView
  },
  {
    path: '/',
    component: CapitalH,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../components/CapitalH.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
