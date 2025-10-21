<template>
  <div>
    <!-- Jika layout-nya 'auth', tampil tanpa navbar/sidebar -->
    <router-view v-if="isAuthLayout" />

    <!-- Jika layout-nya 'default', tampil dengan navbar & sidebar -->
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
import Navbar from './components/navbar.vue'
import Sidebar from './components/sidebar.vue'

export default {
  name: 'App',
  components: { Navbar, Sidebar },
  computed: {
    isAuthLayout() {
      // jika route pakai meta.layout = 'auth'
      return this.$route.meta.layout === 'auth'
    }
  }
}
</script>

<style scoped>
.app-main {
  padding-top: 60px;
}
</style>
