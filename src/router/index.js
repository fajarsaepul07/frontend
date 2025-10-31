import { createRouter, createWebHistory } from 'vue-router'

// ===== Tiket Components (FIXED) =====
import TiketIndex from '../components/Admin/tiket/tiket.vue'
import TiketCreate from '../components/Admin/tiket/create.vue'
import TiketShow from '../components/Admin/tiket/show.vue'
import TiketUpdate from '../components/Admin/tiket/update.vue'

// ===== Admin Components =====
import Content from '../components/Admin/content.vue'
import Report from '../components/Admin/report/report.vue'
import ReportUpdate from '../components/Admin/report/update.vue'

// ===== Auth Components =====
import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'
import LoginSuccess from '../components/Auth/LoginSuccess.vue'

// ===== User Components =====
import User from '../components/User/ServicePortal.vue'
import UserTiket from '../components/User/Tiket.vue'
import Laporan from '../components/User/Laporan.vue'

// ===== Master Data Components =====
import KategoriIndex from '../components/Admin/kategori/index.vue'
import KategoriCreate from '../components/Admin/kategori/create.vue'
import KategoriUpdate from '../components/Admin/kategori/update.vue'

import StatusIndex from '../components/Admin/status/index.vue'
import StatusCreate from '../components/Admin/status/create.vue'
import StatusUpdate from '../components/Admin/status/update.vue'

// ===== Error Components =====
import Forbidden from '../components/Error/Forbidden.vue'

const routes = [
  // ===== Redirect Root =====
  {
    path: '/',
    redirect: '/dashboard'
  },

  // ===== Dashboard =====
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Content,
    meta: { requiresAuth: true, layout: 'default' }
  },

  // ===== Authentication Routes =====
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
    path: '/login-success',
    name: 'LoginSuccess',
    component: LoginSuccess,
    meta: { requiresAuth: false, layout: 'auth' }
  },

  // ===== User Routes =====
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true, layout: 'auth' }
  },
  {
    path: '/usertiket',
    name: 'UserTiket',
    component: UserTiket,
    meta: { requiresAuth: false, layout: 'auth' }  // ✅ Temporary: false untuk testing
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: Laporan,
    meta: { requiresAuth: true, layout: 'auth' }
  },

  // ===== Report Routes =====
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/report/update/:id',
    name: 'ReportUpdate',
    component: ReportUpdate,
    meta: { requiresAuth: true, layout: 'default' }
  },

  // ===== TIKET ROUTES (FIXED - Urutan Penting!) =====
  {
    path: '/tiket',
    name: 'TiketIndex',
    component: TiketIndex,
    meta: { requiresAuth: true, layout: 'default' }  // ✅ UBAH KE 'default' untuk admin layout
  },
  {
    path: '/tiket/create',  // ✅ HARUS SEBELUM :tiket_id
    name: 'TiketCreate',
    component: TiketCreate,
    meta: { requiresAuth: true, layout: 'default' }  // ✅ UBAH KE 'default'
  },
  {
    path: '/tiket/edit/:tiket_id',  // ✅ HARUS SEBELUM :tiket_id
    name: 'TiketEdit',
    component: TiketUpdate,
    meta: { requiresAuth: true, layout: 'default' }  // ✅ UBAH KE 'default'
  },
  {
    path: '/tiket/:tiket_id',  // ✅ Route dinamis TERAKHIR
    name: 'TiketShow',
    component: TiketShow,
    meta: { requiresAuth: true, layout: 'default' }  // ✅ UBAH KE 'default'
  },

  // ===== Kategori Routes =====
  {
    path: '/admin/kategori',
    name: 'KategoriIndex',
    component: KategoriIndex,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/kategori/create',
    name: 'KategoriCreate',
    component: KategoriCreate,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/kategori/update/:id',
    name: 'KategoriUpdate',
    component: KategoriUpdate,
    meta: { requiresAuth: true, layout: 'default' }
  },

  // ===== Status Routes =====
  {
    path: '/admin/status',
    name: 'StatusIndex',
    component: StatusIndex,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/status/create',
    name: 'StatusCreate',
    component: StatusCreate,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/status/update/:id',
    name: 'StatusUpdate',
    component: StatusUpdate,
    meta: { requiresAuth: true, layout: 'default' }
  },

  // ===== Prioritas Routes =====
  {
    path: '/admin/prioritas',
    name: 'PrioritasIndex',
    component: () => import('../components/Admin/prioritas/index.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/prioritas/create',
    name: 'PrioritasCreate',
    component: () => import('../components/Admin/prioritas/create.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/prioritas/update/:id',
    name: 'PrioritasUpdate',
    component: () => import('../components/Admin/prioritas/update.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },

  // ===== Event Routes =====
  {
    path: '/admin/event',
    name: 'EventIndex',
    component: () => import('../components/Admin/Event/index.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/event/create',
    name: 'EventCreate',
    component: () => import('../components/Admin/Event/create.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/admin/event/update/:id',
    name: 'EventUpdate',
    component: () => import('../components/Admin/Event/update.vue'),
    meta: { requiresAuth: true, layout: 'default' }
  },

  // ===== Error Routes =====
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden,
    meta: { requiresAuth: false, layout: 'auth' }
  },

  // ===== 404 Not Found =====
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ===== Navigation Guards =====
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Debug log
  console.log('Navigation Guard:', {
    to: to.path,
    name: to.name,
    requiresAuth: to.meta.requiresAuth,
    isAuthenticated
  })

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Not authenticated, redirecting to login')
    next('/login')
    return
  }

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    console.log('Already authenticated, redirecting to dashboard')
    next('/dashboard')
    return
  }

  if (to.meta.requiresAdmin && user.role !== 'admin') {
    console.log('Not admin, access forbidden')
    next('/forbidden')
    return
  }

  console.log(' Navigation allowed')
  next()
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Service Portal'
  window.scrollTo(0, 0)
})

export default router