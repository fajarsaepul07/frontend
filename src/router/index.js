import { createRouter, createWebHistory } from 'vue-router'

// Import komponen
import TicketIndex from '../components/Admin/tiket/index.vue'
import TicketCreate from '../components/Admin/tiket/create.vue'
import TicketUpdate from '../components/Admin/tiket/update.vue'

// ===== Admin Components =====
import Content from '../components/Admin/content.vue'
import Report from '../components/Admin/report.vue'
import AdminTiket from '../components/Admin/tiket/tiket.vue'

// ===== Auth Components =====
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import LoginSuccess from '../components/Auth/LoginSuccess.vue' // Pastikan file ini ada
// ===== User Components =====
import User from '../components/User/ServicePortal.vue'
import Tiket from '../components/User/Tiket.vue'
import Laporan from '../components/User/Laporan.vue'

import KategoriIndex from '../components/Admin/kategori/index.vue'
import KategoriCreate from '../components/Admin/kategori/create.vue'
import KategoriUpdate from '../components/Admin/kategori/update.vue'

import StatusIndex from '../components/Admin/status/index.vue'
import StatusCreate from '../components/Admin/status/create.vue'
import StatusUpdate from '../components/Admin/status/update.vue'


const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Content,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, layout: 'auth' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false, layout: 'auth' }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/usertiket',
    name: 'UserTiket',
    component: Tiket,
    meta: { requiresAuth: true, layout: 'auth' } 
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: Laporan,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/admin/tickets',
    name: 'AdminTickets',
    component: AdminTiket,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/tiket',
    name: 'Tiket',
    component: TicketIndex,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/tiket/create',
    name: 'TiketCreate',
    component: TicketCreate,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/tiket/update/:id',
    name: 'TiketUpdate',
    component: TicketUpdate,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/login-success',
    name: 'LoginSuccess',
    component: LoginSuccess, // Komponen baru untuk menangani login Google
    meta: { requiresAuth: false, layout: 'auth' }
  },
  {
    path: '/admin/kategori',
    name: 'KategoriIndex',
    component: KategoriIndex
  },
  {
    path: '/admin/kategori/create',
    name: 'KategoriCreate',
    component: KategoriCreate
  },
  {
    path: '/admin/kategori/update/:id',
    name: 'KategoriUpdate',
    component: KategoriUpdate
  },
  {
    path: '/admin/status',
    name: 'StatusIndex',
    component: StatusIndex
  },
  {
    path: '/admin/status/create',
    name: 'StatusCreate',
    component: StatusCreate
  },
  {
  path: '/admin/status/update/:id',
  name: 'StatusUpdate',
  component: StatusUpdate
  },
  {
  path: '/admin/prioritas',
  name: 'PrioritasIndex',
  component: () => import('../components/Admin/prioritas/index.vue')
  },
  {
    path: '/admin/prioritas/create',
    name: 'PrioritasCreate',
    component: () => import('../components/Admin/prioritas/create.vue')
  },
  {
    path: '/admin/prioritas/update/:id',
    name: 'PrioritasUpdate',
    component: () => import('../components/Admin/prioritas/update.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Middleware: proteksi halaman
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router