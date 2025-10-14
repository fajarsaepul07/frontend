import { createRouter, createWebHistory } from 'vue-router'
import Content from '../components/Content.vue' // ini halaman dashboard kamu

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Content, // pas buka '/', langsung ke Content (Dashboard)
  },
  // kalau nanti kamu mau tambah halaman lain tinggal tambahin di sini
  // contoh:
  // {
  //   path: '/tickets',
  //   name: 'Tickets',
  //   component: () => import('../components/Tickets.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
