<template>
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="@/assets/img/favicon/favicon.ico" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
    rel="stylesheet"
  />

  <!-- Icons -->
  <link rel="stylesheet" href="@/assets/vendor/fonts/boxicons.css" />

  <!-- Core CSS -->
  <link
    rel="stylesheet"
    href="@/assets/vendor/css/core.css"
    class="template-customizer-core-css"
  />
  <link
    rel="stylesheet"
    href="@/assets/vendor/css/theme-default.css"
    class="template-customizer-theme-css"
  />
  <link rel="stylesheet" href="@/assets/libs/perfect-scrollbar/perfect-scrollbar.css" />

  <!-- Vendors CSS -->
  <link rel="stylesheet" href="@/assets/vendor/libs/apex-charts/apex-charts.css" />

  <!-- Page CSS -->
  <link rel="stylesheet" href="@/assets/vendor/css/pages/dashboard-analytics.css" />
  <div class="d-flex" style="min-height: 100vh; background: #f8f9fa;">  <!-- Flex utama biar sidebar + content side-by-side -->
    <!-- Sidebar (Fixed width) -->
    <div style="width: 250px; background: #343a40; color: white; padding: 20px; position: fixed; height: 100vh; overflow-y: auto; z-index: 1000;">
      <Sidebar />
    </div>

    <!-- Main Content (Offset buat sidebar) -->
    <div style="margin-left: 250px; flex: 1; padding: 0;">
      <!-- Navbar (Fixed top) -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3" style="position: fixed; top: 0; width: calc(100% - 250px); z-index: 999;">
        <Navbar />
      </nav>

      <!-- Content Wrapper (Offset navbar) -->
      <div style="padding-top: 70px; padding: 20px;">
        <div class="container-fluid">
          <router-view />  <!-- Isi Dashboard/Laporan di sini -->
        </div>

        <!-- Footer -->
        <Footer />
      </div>
    </div>

    <!-- Overlay (untuk mobile toggle, sementara skip) -->
    <div class="layout-overlay layout-menu-toggle"></div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/ui/Sidebar.vue'
import Navbar from '@/components/ui/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'

console.log('AdminLayout mounted! Components:', { Sidebar: !!Sidebar, Navbar: !!Navbar, Footer: !!Footer })  // Debug console


</script>