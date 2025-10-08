<template>
  <div class="layout-wrapper" style="display: flex; min-height: 100vh; background: #f8f9fa;">
    <!-- Sidebar (Fixed width) -->
    <aside class="sidebar">
      <Sidebar :isOpen="isSidebarOpen" @toggle="toggleSidebar" @menu-change="onMenuChange" />
    </aside>

    <!-- Main Content (Fills remaining space) -->
    <div class="main-content flex-grow-1 d-flex flex-column">
      <!-- Navbar (Fixed top) -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3" style="position: sticky; top: 0; z-index: 999;">
        <Navbar />
      </nav>

      <!-- Content Wrapper -->
      <div class="content-wrapper flex-grow-1">
        <router-view />
      </div>

      <!-- Footer -->
      <Footer />
    </div>

    <!-- Overlay (untuk mobile toggle) -->
    <div class="layout-overlay layout-menu-toggle" v-if="!isSidebarOpen" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/ui/Sidebar.vue'
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'

import { ref } from 'vue'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const onMenuChange = (menuId) => {
  console.log('Menu changed to:', menuId)
}
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  width: 100%;
}

.sidebar {
  width: 16rem;
  flex-shrink: 0;
  background: #1e293b;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  padding: 20px;
  flex: 1;
}

.layout-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar[style*="display: block"] {
    transform: translateX(0);
  }

  .layout-overlay {
    display: block;
  }
}
</style>