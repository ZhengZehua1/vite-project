import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import('../views/order/index.vue')
  },
  {
    path: '/production/:id',
    name: 'production',
    component: () => import('../views/production/index.vue')
  },
  {
    path: '/delivery/:id',
    name: 'Delivery',
    component: () => import('../views/Delivery/index.vue')
  },
  /* 404 */
  { path: '/:catchAll(.*)', component: () => import('../components/404.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
