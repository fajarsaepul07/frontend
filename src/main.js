import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// ===== Import Bootstrap & CSS =====
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'

// ===== Konfigurasi Axios =====
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ===== Buat App =====
const app = createApp(App)

// ===== Global Auth State (untuk loading) =====
app.config.globalProperties.$authState = reactive({
  isChecking: true
})

// ===== Router Guard dengan Loading =====
router.beforeEach(async (to, from, next) => {
  const authState = app.config.globalProperties.$authState
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  authState.isChecking = true

  if (to.meta.requiresAuth && !isAuthenticated) {
    authState.isChecking = false
    return next('/login')
  }

  if (isAuthenticated) {
    try {
      const res = await axios.get('/cek-user')
      const user = res.data

      const isAdminRoute =
        to.path.startsWith('/dashboard') ||
        to.path.startsWith('/report') ||
        to.path.startsWith('/admin')

      const isUserRoute =
        to.path.startsWith('/user') ||
        to.path.startsWith('/tiket') ||
        to.path.startsWith('/laporan')

      // 👇 Role check
      if (user.role === 'customer' && isAdminRoute) {
        authState.isChecking = false
        return next('/forbidden')
      }

      // Admin boleh akses semua halaman
      if (user.role === 'admin' && isUserRoute) {
        // biarkan, admin bisa ke mana saja
      }

      authState.isChecking = false
      next()
    } catch (e) {
      console.error('Gagal cek user:', e)
      localStorage.removeItem('token')
      authState.isChecking = false
      next('/login')
    }
  } else {
    authState.isChecking = false
    next()
  }
})

// ===== Mount App =====
app.use(router)
app.mount('#app')
