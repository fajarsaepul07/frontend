import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

// ===== Admin Components =====
import Content from '../components/Admin/content.vue'
import Report from '../components/Admin/report.vue'
import AdminTiket from '../components/Admin/tiket.vue'
import TicketIndex from '../components/Admin/tiket/index.vue'
import TicketCreate from '../components/Admin/tiket/create.vue'
import TicketUpdate from '../components/Admin/tiket/update.vue'

// ===== Status Components =====
import StatusIndex from '../components/Admin/status/index.vue'
import StatusCreate from '../components/Admin/status/create.vue'
import StatusUpdate from '../components/Admin/status/update.vue'

// ===== Auth Components =====
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'

// ===== User Components =====
import User from '../components/User/ServicePortal.vue'
import Tiket from '../components/User/Tiket.vue'
import Laporan from '../components/User/Laporan.vue'

// ===== Error Page =====
import Forbidden from '../components/Error/Forbidden.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },

  // ===== Admin Routes =====
  { path: '/dashboard', name: 'Dashboard', component: Content, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/report', name: 'Report', component: Report, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/admin/tickets', name: 'AdminTickets', component: AdminTiket, meta: { requiresAuth: true, layout: 'default' } },

  // CRUD Tiket Admin
  { path: '/tiket', name: 'TiketIndex', component: TicketIndex, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/tiket/create', name: 'TiketCreate', component: TicketCreate, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/tiket/update/:id', name: 'TiketUpdate', component: TicketUpdate, meta: { requiresAuth: true, layout: 'default' } },

  // CRUD Status Admin
  { path: '/status', name: 'StatusIndex', component: StatusIndex, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/status/create', name: 'StatusCreate', component: StatusCreate, meta: { requiresAuth: true, layout: 'default' } },
  { path: '/status/update/:id', name: 'StatusUpdate', component: StatusUpdate, meta: { requiresAuth: true, layout: 'default' } },

  // ===== User Routes =====
  { path: '/user', name: 'User', component: User, meta: { requiresAuth: true, layout: 'auth' } },
  { path: '/usertiket', name: 'UserTiket', component: Tiket, meta: { requiresAuth: true, layout: 'auth' } },
  { path: '/laporan', name: 'Laporan', component: Laporan, meta: { requiresAuth: true, layout: 'auth' } },

  // ===== Auth Routes =====
  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false, layout: 'auth' } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresAuth: false, layout: 'auth' } },

  // ===== Error Page =====
  { path: '/forbidden', name: 'Forbidden', component: Forbidden, meta: { requiresAuth: false, layout: 'auth' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ===== Middleware Auth & Role =====
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  // Jika route butuh login tapi belum login → ke login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // Jika sudah login tapi mau ke login/register → arahkan sesuai role
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

  // Kalau sudah login, cek role-nya
  if (isAuthenticated) {
    try {
      const res = await axios.get('http://localhost:8000/api/cek-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const user = res.data

      const isAdminRoute =
        to.path.startsWith('/dashboard') ||
        to.path.startsWith('/report') ||
        to.path.startsWith('/admin') ||
        to.path.startsWith('/tiket') ||
        to.path.startsWith('/status')

      // Customer tidak boleh ke admin route
      if (user.role === 'customer' && isAdminRoute) {
        return next('/forbidden')
      }

      // Admin bebas ke mana saja ✅
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