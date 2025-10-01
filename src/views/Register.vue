<template>
  <div class="register-container">
    <div class="background-image"></div>

    <div class="register-wrapper">
      <div class="register-card">
        <div class="logo-container">
          <div class="logo-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>

        <h2 class="title">Daftar Akun Baru</h2>
        <p class="subtitle">Buat akun Helpdesk Portal Anda</p>

        <form @submit.prevent="handleRegister" class="form-container">
          <div class="form-group">
            <label for="nama" class="label">Nama Lengkap</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="nama"
                v-model="form.nama"
                type="text"
                class="input-field"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="username" class="label">Username</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                id="username"
                v-model="form.username"
                type="text"
                class="input-field"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="label">Email</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="input-field"
                placeholder="Masukkan email"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="label">Password</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="input-field"
                placeholder="Minimal 8 karakter"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="label">Konfirmasi Password</label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                class="input-field"
                placeholder="Ulangi password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="register-btn"
            :disabled="loading"
          >
            <svg v-if="loading" class="spinner" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="loading">Mendaftarkan...</span>
            <template v-else>
              <span>Daftar Sekarang</span>
              <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </template>
          </button>

          <div class="login-link">
            Sudah punya akun? 
            <router-link to="/login">Login di sini</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const form = ref({
  nama: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Password tidak cocok!')
    return
  }
  
  loading.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  alert('Registrasi berhasil! Silakan login.')
  router.push('/login')
  loading.value = false
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: #1a2942;
}

.background-image {
  position: absolute;
  inset: 0;
  background-image: url('/src/assets/backgroundlogin.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
}

.background-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(26, 41, 66, 0.95) 0%, rgba(26, 41, 66, 0.4) 50%, rgba(26, 41, 66, 0.2) 100%);
}

.register-wrapper {
  position: relative;
  width: 100%;
  max-width: 450px;
  z-index: 10;
  margin-left: 5%;
}

.register-card {
  position: relative;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
  transition: transform 0.3s ease;
}

.logo-icon:hover {
  transform: scale(1.1) rotate(5deg);
}

.logo-icon .icon {
  width: 40px;
  height: 40px;
  color: white;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 600;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: #9ca3af;
}

.icon-sm {
  width: 20px;
  height: 20px;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
}

.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.register-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.4);
}

.register-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.register-btn:hover .arrow-icon {
  transform: translateX(5px);
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.login-link a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #1e40af;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-wrapper {
    margin-left: 0;
    max-width: 100%;
  }
  
  .background-image::after {
    background: linear-gradient(180deg, rgba(26, 41, 66, 0.95) 0%, rgba(26, 41, 66, 0.4) 100%);
  }
  
  .register-card {
    padding: 2rem;
  }
}
</style>