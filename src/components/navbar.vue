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

        <!-- user dropdown -->
        <div class="dropdown">
          <button class="btn btn-sm btn-light rounded-circle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false" style="width:38px;height:38px;">
            <span class="text-muted">U</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
            <li><a class="dropdown-item" href="#" @click.prevent="goToProfile">Profile</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="goToSettings">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" @click.prevent="logout">Keluar</a></li>
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
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
    goToSettings() {
      this.$router.push('/settings');
    },
    async logout() {
      try {
        await axios.get('/sanctum/csrf-cookie'); // Ambil CSRF token
        const response = await axios.post('/logout'); // Sesuaikan dengan baseURL
        console.log(response.data.message); // "Logout berhasil"
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