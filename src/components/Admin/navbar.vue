<template>
  <nav class="navbar navbar-light bg-white border-bottom fixed-top" style="height:60px;">
    <div class="container-fluid">
      <!-- small screen: open sidebar offcanvas -->
      <button
        class="btn btn-outline-secondary d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
      >
        ☰
      </button>

      <div class="d-flex align-items-center">
        <span class="fw-bold ms-2">Helpdesk</span>
      </div>

      <div class="d-flex align-items-center ms-auto gap-2">
        <!-- search -->
        <form class="d-none d-sm-flex align-items-center" @submit.prevent>
          <div class="input-group input-group-sm">
            <input type="search" class="form-control form-control-sm" placeholder="Search tickets, users, ID..." />
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </div>
        </form>

        <!-- quick actions -->
        <button class="btn btn-sm btn-outline-primary">New Ticket</button>

        <!-- notifications -->
        <div class="position-relative">
          <button class="btn btn-sm btn-light rounded-circle position-relative" type="button" style="width:38px;height:38px;">
            <i class="bi bi-bell"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:0.6rem;">
              3
            </span>
          </button>
        </div>

        <!-- user dropdown -->
        <div class="dropdown">
          <button class="btn btn-sm btn-light dropdown-toggle d-flex align-items-center gap-2" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width:32px;height:32px;">
              <i class="bi bi-person-fill"></i>
            </div>
            <span class="d-none d-lg-inline">{{ userName }}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
            <li>
              <div class="dropdown-header">
                <div class="fw-bold">{{ userName }}</div>
                <small class="text-muted">{{ userRole }}</small>
              </div>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="goToProfile">
              <i class="bi bi-person me-2"></i>Profile
            </a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="goToSettings">
              <i class="bi bi-gear me-2"></i>Settings
            </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" @click.prevent="logout">
              <i class="bi bi-box-arrow-right me-2"></i>Keluar
            </a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      userName: 'Admin',
      userRole: 'Administrator'
    }
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.name) {
        this.userName = user.name;
      }
      if (user.role) {
        this.userRole = user.role === 'admin' ? 'Administrator' : user.role === 'agent' ? 'Agent' : 'Customer';
      }
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    async logout() {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/logout');
        console.log(response.data.message);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.$router.push('/login');
        } else {
          alert('Gagal logout: ' + (error.response?.data?.message || 'Unknown error'));
        }
      }
    }
  }
}
</script>

<style scoped>
.dropdown-header {
  padding: 0.5rem 1rem;
}
</style>