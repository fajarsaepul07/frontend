
<template>
  <nav>
    <div class="logo">
      DeLorean<br />
      <span style="font-size: 14px; font-weight: normal">University</span>
    </div>

    <ul class="nav-links">
      <li>
        <a href="#" :class="{ active: currentPage === 'home' }" @click.prevent="$emit('show-page', 'home')">🏠 Home</a>
      </li>
      <li>
        <a href="#" @click.prevent="$emit('show-page', 'dashboard')">📊 Dashboard</a>
      </li>
      <li>
        <router-link to="/laporan" class="laporan-link">📋 Laporan</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="$emit('show-page', 'solutions')">💡 Solutions</a>
      </li>
      <li>
        <router-link to="/tiket" class="tiket-link">🎫 Tiket</router-link>
      </li>
    </ul>

    <div class="nav-right">
      <div class="notification-badge">
        🔔
        <span class="badge-count">3</span>
      </div>
      <button class="new-request-btn" @click="$emit('')">+ NEW REQUEST</button>
      <div class="user-avatar">JD</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ['currentPage'],
  methods: {
    goToTiket() {
      this.$emit('go-to-tiket');
    }
  }
};
</script>

<style scoped>
/* Navigation */
nav {
  background: rgba(255, 255, 255, 0.95);
  padding: 15px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
  list-style: none;
}

.nav-links a,
.nav-links .tiket-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-links a:hover,
.nav-links .tiket-link:hover {
  color: #667eea;
}

.nav-links .active,
.nav-links .router-link-active {
  color: #667eea;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-badge {
  position: relative;
  cursor: pointer;
}

.badge-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.new-request-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.new-request-btn:hover {
  background: #ff5252;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 768px) {
  nav {
    padding: 15px 20px;
  }

  .nav-links {
    gap: 15px;
    font-size: 14px;
  }
}
</style>