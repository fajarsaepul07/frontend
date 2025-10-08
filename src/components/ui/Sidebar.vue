<template>
  <aside :class="['sidebar', { 'sidebar-collapsed': !isOpen }]">
    <!-- Header -->
    <div class="sidebar-header">
      <h1 v-if="isOpen" class="logo">Helpdesk</h1>
      <button @click="$emit('toggle')" class="toggle-btn">
        <i :class="isOpen ? 'fas fa-chevron-left' : 'fas fa-bars'"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="setActive(item.id)"
        :class="['nav-item', { active: activeMenu === item.id }]"
      >
        <i :class="item.icon"></i>
        <span v-if="isOpen">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <button class="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        <span v-if="isOpen">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeMenu: 'dashboard',
      menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
        { id: 'tickets', label: 'Tiket Management', icon: 'fas fa-ticket-alt' },
        { id: 'users', label: 'User Management', icon: 'fas fa-users' },
        { id: 'reports', label: 'Laporan & Analitik', icon: 'fas fa-chart-line' },
        { id: 'settings', label: 'Pengaturan', icon: 'fas fa-cog' }
      ]
    }
  },
  methods: {
    setActive(id) {
      this.activeMenu = id
      this.$emit('menu-change', id)
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 16rem;
  background: #1f2937; /* warna abu gelap */
  color: white;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar-collapsed {
  width: 5rem;
}

.sidebar-header {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.toggle-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
}

.toggle-btn:hover {
  color: #60a5fa;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  text-align: left;
}

.nav-item i {
  width: 1.25rem;
  text-align: center;
  font-size: 1.1rem;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background: #2563eb;
  color: #fff;
  font-weight: 500;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn i {
  width: 1.25rem;
  text-align: center;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f87171;
}
</style>
