import { createRouter, createWebHistory } from 'vue-router'
import Content from '../components/content.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
  {
  path: '/',
  redirect: '/dashboard'
},
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Content,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } 
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false } 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Proteksi rute berdasarkan autentikasi
router.beforeEach((to, from, next) => {
  // Hapus atau komentari logika guard untuk sementara
  // const isAuthenticated = !!localStorage.getItem('token');
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next('/login');
  // } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
  //   next('/');
  // } else {
  //   next();
  // }
  next(); // Izinkan semua navigasi
});

export default router