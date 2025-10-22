import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

// Import komponen
import TicketIndex from '../components/Admin/tiket/index.vue'
import TicketCreate from '../components/Admin/tiket/create.vue'
import TicketUpdate from '../components/Admin/tiket/update.vue'


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

// ===== Error Page =====
import Forbidden from '../components/Error/Forbidden.vue'

const routes = [
<<<<<<< HEAD
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
=======
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Content, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false, layout: 'auth' } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresAuth: false, layout: 'auth' } },
  { path: '/user', name: 'User', component: User, meta: { requiresAuth: true, layout: 'auth' } },
  { path: '/report', name: 'Report', component: Report, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/tiket', name: 'Tiket', component: Tiket, meta: { requiresAuth: true, layout: 'auth' } },
  { path: '/laporan', name: 'Laporan', component: Laporan, meta: { requiresAuth: true, layout: 'auth' } },
  { path: '/admin/tickets', name: 'AdminTickets', component: AdminTiket, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/forbidden', name: 'Forbidden', component: Forbidden, meta: { requiresAuth: false, layout: 'auth' } },
>>>>>>> 80982fcaa5dda0c01447ed5d37337e6a11372fe2
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ===== Middleware =====
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  // Belum login tapi butuh auth → arahkan ke login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // Sudah login tapi ke login/register → arahkan sesuai role
  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    try {
      const res = await axios.get('http://localhost:8000/api/cek-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const user = res.data

      if (user.role === 'admin') return next('/dashboard')
      else return next('/user')
    } catch {
      localStorage.removeItem('token')
      return next('/login')
    }
  }

  // Kalau sudah login, cek role
  if (isAuthenticated) {
    try {
      const res = await axios.get('http://localhost:8000/api/cek-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const user = res.data

      const isAdminRoute =
        to.path.startsWith('/dashboard') ||
        to.path.startsWith('/report') ||
        to.path.startsWith('/admin')

      // Hanya customer yang dilarang ke admin route
      if (user.role === 'customer' && isAdminRoute) {
        return next('/forbidden')
      }

      // Admin bisa ke mana saja ✅
      next()
    } catch (e) {
      console.error('Gagal memeriksa user:', e)
      localStorage.removeItem('token')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
