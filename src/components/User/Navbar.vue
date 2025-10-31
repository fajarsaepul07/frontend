<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-brand">
        <h2>Helpdesk</h2>
        <span class="brand-subtitle">Service Portal</span>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
        <span class="hamburger-icon">☰</span>
      </button>

      <!-- Navigation Links -->
      <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
        <router-link 
          to="/user" 
          class="nav-link" 
          :class="{ active: currentPage === 'user' }"
          @click="handleNavClick('user')"
        >
          <span class="nav-icon">🏠</span>
          Home
        </router-link>

        <router-link 
          to="/usertiket" 
          class="nav-link" 
          :class="{ active: currentPage === 'tiket' }"
          @click="handleNavClick('tiket')"
        >
          <span class="nav-icon">🎫</span>
          My Tickets
        </router-link>

        <router-link 
          to="/laporan" 
          class="nav-link" 
          :class="{ active: currentPage === 'laporan' }"
          @click="handleNavClick('laporan')"
        >
          <span class="nav-icon">📊</span>
          Reports
        </router-link>

        <a 
          href="#" 
          class="nav-link"
          @click.prevent="handleNavClick('solutions')"
        >
          <span class="nav-icon">💡</span>
          Solutions
        </a>

        <!-- User Menu -->
        <div class="user-menu">
          <button class="user-btn" @click="userMenuOpen = !userMenuOpen">
            <span class="user-avatar">👤</span>
            <span class="user-name">{{ userName }}</span>
            <span class="dropdown-arrow">▼</span>
          </button>

          <div class="user-dropdown" v-if="userMenuOpen">
            <a href="#" class="dropdown-item" @click.prevent="handleProfile">
              <span>👤</span>
              My Profile
            </a>
            <a href="#" class="dropdown-item" @click.prevent="handleSettings">
              <span>⚙️</span>
              Settings
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item logout" @click.prevent="handleLogout">
              <span>🚪</span>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'UserNavbar',
  
  props: {
    currentPage: {
      type: String,
      default: 'home'
    }
  },

  data() {
    return {
      mobileMenuOpen: false,
      userMenuOpen: false
    }
  },

  computed: {
    userName() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.name || 'Guest'
    }
  },
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 999;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Brand */
.nav-brand {
  display: flex;
  flex-direction: column;
}

.nav-brand h2 {
  margin: 0;
  font-size: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.brand-subtitle {
  font-size: 12px;
  color: #999;
  margin-top: -5px;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #667eea;
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  background: #f5f5f5;
  color: #667eea;
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-link.active .nav-icon {
  filter: none;
}

.nav-icon {
  font-size: 20px;
}

/* User Menu */
.user-menu {
  position: relative;
  margin-left: 10px;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.user-btn:hover {
  background: #e9ecef;
  border-color: #667eea;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.user-name {
  color: #333;
}

.dropdown-arrow {
  font-size: 10px;
  color: #999;
  transition: transform 0.3s;
}

.user-menu:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  overflow: hidden;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-item.logout {
  color: #f44336;
}

.dropdown-item.logout:hover {
  background: #ffebee;
}

.dropdown-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 5px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    gap: 10px;
    transition: left 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .nav-links.mobile-open {
    left: 0;
  }

  .nav-link {
    padding: 15px 20px;
    font-size: 16px;
  }

  .user-menu {
    margin-left: 0;
    width: 100%;
  }

  .user-btn {
    width: 100%;
    justify-content: center;
  }

  .user-dropdown {
    position: relative;
    top: 10px;
    box-shadow: none;
    border: 1px solid #e0e0e0;
  }
}
</style>