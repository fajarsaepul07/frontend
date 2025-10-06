import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import AdminLayout from '@/layout/AdminLayout.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: AdminLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      // Tambah route lain di sini
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router