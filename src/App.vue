<template>
  <div>
    <!-- Jika route adalah login atau register, render langsung tanpa struktur dashboard -->
    <router-view v-if="isAuthRoute" />

    <!-- Jika bukan, render dengan navbar dan sidebar -->
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
import Navbar from './components/navbar.vue';
import Sidebar from './components/sidebar.vue';

export default {
  name: 'App',
  components: { Navbar, Sidebar },
  computed: {
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path);
    }
  }
};
</script>

<style scoped>
.app-main {
  padding-top: 60px; /* Tetap untuk dashboard */
}
</style>