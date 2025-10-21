import { createRouter, createWebHistory } from 'vue-router'

// ===== Admin Components =====
import Content from '../components/Admin/content.vue'
import Report from '../components/Admin/report.vue'
import AdminTiket from '../components/Admin/tiket.vue'

// ===== Auth Components =====
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import LoginSuccess from '../components/Auth/LoginSuccess.vue'

// ===== User Components =====
import User from '../components/User/ServicePortal.vue'
import Tiket from '../components/User/Tiket.vue'
import Laporan from '../components/User/Laporan.vue'

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
    path: '/tiket',
    name: 'Tiket',
    component: Tiket,
    meta: { requiresAuth: true, layout: 'auth' } // User Tiket
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: Laporan,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/login-success',
    name: 'LoginSuccess',
    component: LoginSuccess,
    meta: { requiresAuth: false, layout: 'auth' }
  },
  {
    path: '/admin/tickets',
    name: 'AdminTickets',
    component: AdminTiket,
    meta: { requiresAuth: true, layout: 'default' }
  }
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