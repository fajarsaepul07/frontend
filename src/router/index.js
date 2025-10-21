import { createRouter, createWebHistory } from 'vue-router'
import Content from '../components/content.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import User from '../components/user.vue'
import Report from '../components/report.vue'

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
    meta: { requiresAuth: true, layout: 'auth' } // ⬅️ ubah ke 'auth' biar tanpa navbar/sidebar
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: { requiresAuth: true, layout: 'default' }
  },
  {
    path: '/login-success',
    name: 'LoginSuccess',
    component: () => import('../components/LoginSuccess.vue'),
    meta: { requiresAuth: false, layout: 'auth' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ✅ Middleware untuk proteksi halaman login/register
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (
    (to.path === '/login' || to.path === '/register') &&
    isAuthenticated
  ) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router
