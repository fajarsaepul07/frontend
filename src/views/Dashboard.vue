<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard Helpdesk</h1>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </header>
    
    <main class="dashboard-content">
      <div class="welcome">
        <h2>Selamat datang, {{ user.username }}!</h2>
        <p>Role: {{ user.role }}</p>
      </div>
      
      <!-- Tambahkan konten dashboard helpdesk di sini -->
      <div class="stats">
        <div class="stat-card">
          <h3>Tiket Baru</h3>
          <p class="stat-number">5</p>
        </div>
        <div class="stat-card">
          <h3>Dalam Proses</h3>
          <p class="stat-number">12</p>
        </div>
        <div class="stat-card">
          <h3>Selesai</h3>
          <p class="stat-number">28</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard-header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.dashboard-content {
  padding: 2rem;
}

.welcome {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin: 0.5rem 0 0 0;
}
</style>