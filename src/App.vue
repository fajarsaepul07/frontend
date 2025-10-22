<template>
  <div>
    <!-- Loading screen ketika verifikasi auth -->
    <div v-if="$authState.isChecking" class="loading-screen">
      <p>Memeriksa sesi...</p>
    </div>

    <!-- Layout Auth (Login / Register) -->
    <router-view v-else-if="isAuthLayout" />

    <!-- Layout Default (dengan Navbar & Sidebar) -->
    <div v-else>
      <Navbar />
      <div class="d-flex">
        <Sidebar />
        <main class="app-main flex-grow-1">
          <div class="container-fluid">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Admin/navbar.vue'
import Sidebar from './components/Admin/sidebar.vue'

export default {
  name: 'App',
  components: { Navbar, Sidebar },
  computed: {
    isAuthLayout() {
      // Jika route pakai meta.layout = 'auth'
      return this.$route.meta.layout === 'auth'
    }
  }
}
</script>

<style scoped>
.app-main {
  padding-top: 60px;
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
