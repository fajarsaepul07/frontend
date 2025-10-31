<!-- ==============================
     FILE: src/components/Admin/sidebar.vue
     ============================== -->

<template>
  <div>
    <!-- Offcanvas untuk layar kecil -->
    <div
      class="offcanvas offcanvas-start bg-primary text-white"
      tabindex="-1"
      id="sidebarOffcanvas"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div class="offcanvas-header border-bottom border-light-subtle">
        <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">Menu</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Tutup"
        ></button>
      </div>
      <div class="offcanvas-body p-0">
        <div class="p-3">
          <h6 class="mb-3 fw-semibold">Web Helpdesk</h6>
          <nav class="nav flex-column">
            <router-link to="/dashboard" class="nav-link text-white">
              <i class="bi bi-speedometer2 me-2"></i>
              Dasbor
            </router-link>
            <router-link to="/tiket" class="nav-link text-white">
              <i class="bi bi-ticket-detailed me-2"></i>
              Tiket
            </router-link>
            <router-link to="/report" class="nav-link text-white">
              <i class="bi bi-file-earmark-text me-2"></i>
              Report
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <!-- Sidebar statis untuk layar md+ -->
    <aside class="app-sidebar d-none d-md-block bg-light shadow-sm vh-100 position-fixed" style="width: 250px;">
      <div class="p-3">
        <div class="mb-4">
          <h5 class="mb-1 text-primary fw-bold">
            <i class="bi bi-headset me-2"></i>
            Web Helpdesk
          </h5>
          <small class="text-muted">Pusat Bantuan</small>
        </div>

        <nav class="nav flex-column sidebar-nav">
          <!-- Dashboard -->
          <router-link 
            to="/dashboard" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-speedometer2 me-2"></i>
            Dasbor
          </router-link>

          <!-- Tiket - FIXED -->
          <router-link 
            to="/tiket" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-ticket-detailed me-2"></i>
            Tiket
            <span class="badge bg-primary ms-2">{{ ticketCount }}</span>
          </router-link>

          <!-- Report -->
          <router-link 
            to="/report" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-file-earmark-text me-2"></i>
            Report
          </router-link>

          <hr class="my-3" />

          <!-- Master Data Section -->
          <div class="nav-section-title mb-2">
            <small class="text-muted fw-semibold text-uppercase">Master Data</small>
          </div>

          <router-link 
            to="/admin/kategori" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-tags me-2"></i>
            Kategori
          </router-link>

          <router-link 
            to="/admin/status" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-circle me-2"></i>
            Status
          </router-link>

          <router-link 
            to="/admin/prioritas" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-exclamation-triangle me-2"></i>
            Prioritas
          </router-link>

          <router-link 
            to="/admin/event" 
            class="nav-link mb-1"
            active-class="active"
          >
            <i class="bi bi-calendar-event me-2"></i>
            Event
          </router-link>
        </nav>

        <hr class="my-3" />

        <!-- Filter Section -->
        <div class="px-1">
          <small class="text-muted fw-semibold text-uppercase">Quick Filter</small>
          <div class="mt-2 d-grid gap-2">
            <button class="btn btn-sm btn-outline-primary text-start">
              <i class="bi bi-person me-2"></i>
              Tiket Saya
            </button>
            <button class="btn btn-sm btn-outline-secondary text-start">
              <i class="bi bi-inbox me-2"></i>
              Belum Ditugaskan
            </button>
            <button class="btn btn-sm btn-outline-danger text-start">
              <i class="bi bi-flag-fill me-2"></i>
              Prioritas Tinggi
            </button>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  
  data() {
    return {
      ticketCount: 0
    }
  },

  mounted() {
    // Optional: Fetch ticket count dari API
    this.fetchTicketCount()
  },

  methods: {
    async fetchTicketCount() {
      try {
        // Uncomment jika sudah ada API endpoint
        // const res = await axios.get('http://localhost:8000/api/tikets/count')
        // this.ticketCount = res.data.count
        
        // Sementara pakai dummy data
        this.ticketCount = 0
      } catch (error) {
        console.error('Error fetching ticket count:', error)
      }
    }
  }
}
</script>

<style scoped>
.app-sidebar {
  overflow-y: auto;
  z-index: 1000;
}

.sidebar-nav .nav-link {
  color: #495057;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.sidebar-nav .nav-link:hover {
  background-color: #e9ecef;
  color: #0d6efd;
  transform: translateX(5px);
}

.sidebar-nav .nav-link.active {
  background-color: #0d6efd;
  color: white;
}

.sidebar-nav .nav-link.active i {
  color: white;
}

.nav-section-title {
  padding: 0.5rem 1rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
}

/* Scrollbar styling */
.app-sidebar::-webkit-scrollbar {
  width: 6px;
}

.app-sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.app-sidebar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.app-sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsiveness */
@media (max-width: 767.98px) {
  .app-sidebar {
    display: none !important;
  }
}
</style>