<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login Helpdesk</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="user">User</label>
          <input
            type="text"
            id="user"
            v-model="form.user"
            placeholder="Masukkan user"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Masukkan password"
            required
          />
        </div>
        
        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = ref({
  user: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Simulasi login - ganti dengan API call sesungguhnya
    if (form.value.user === 'admin' && form.value.password === 'password') {
      // Simpan token (dummy)
      localStorage.setItem('token', 'dummy-token-12345')
      localStorage.setItem('user', JSON.stringify({
        user: form.value.user,
        role: 'admin'
      }))
      
      router.push('/dashboard')
    } else {
      error.value = 'Username atau password salah!'
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan saat login'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover:not(:disabled) {
  background: #5a6fd8;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 5px;
  color: #c33;
  text-align: center;
}
</style>