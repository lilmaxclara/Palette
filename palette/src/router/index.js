import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/game',
    name: 'game',
    component: HomeView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
