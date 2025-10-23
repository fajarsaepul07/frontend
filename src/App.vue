<template>
  <div>
    <!-- Loading screen ketika verifikasi auth -->
    <div v-if="authState.isChecking" class="loading-screen">
      <p>Memeriksa sesi...</p>
    </div>

    <!-- Layout Auth (Login / Register) -->
    <router-view v-else-if="isAuthLayout" />

    <!-- Layout Default (dengan Navbar & Sidebar untuk Admin, atau sederhana untuk User) -->
    <div v-else>
      <template v-if="isAdmin">
        <Navbar />
        <div class="d-flex">
          <Sidebar />
          <main class="app-main flex-grow-1">
            <div class="container-fluid">
              <router-view />
            </div>
          </main>
        </div>
      </template>
      <template v-else>
        <main class="app-main">
          <div class="container-fluid">
            <router-view />
          </div>
        </main>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
import Navbar from './components/Admin/navbar.vue'
import Sidebar from './components/Admin/sidebar.vue'

export default {
  name: 'App',
  components: { Navbar, Sidebar },
  setup() {
    const instance = getCurrentInstance()
    const authState = instance.appContext.config.globalProperties.$authState // Mengambil $authState dari globalProperties

    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    // Komputasi apakah pengguna adalah admin
    const isAdmin = computed(() => user.role === 'admin')

    // Komputasi apakah layout adalah auth berdasarkan meta rute
    const isAuthLayout = computed(() => {
      return instance.proxy.$route.meta.layout === 'auth'
    })

    return { authState, isAdmin, isAuthLayout }
  }
}
</script>

<style scoped>
.app-main {
  padding-top: 60px; /* Hanya tambahkan padding jika ada Navbar */
}
.loading-screen {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafc;
  font-size: 18px;
  font-weight: bold;
  color: #4f46e5;
}
</style>