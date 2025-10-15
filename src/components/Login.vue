<template>
  <div class="auth-page d-flex align-items-center justify-content-center">
    <div class="card auth-card shadow-lg">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="loginForm.email" type="email" class="form-control" required>
            <div v-if="loginErrors.email" class="text-danger">{{ loginErrors.email }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="loginForm.password" type="password" class="form-control" required>
            <div v-if="loginErrors.password" class="text-danger">{{ loginErrors.password }}</div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <a href="#" @click.prevent="$router.push('/register')" class="d-block text-center mt-3">Don't have an account? Register</a>
          <a :href="googleRedirectUrl" class="btn btn-danger mt-3 w-100">Sign in with Google</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginErrors: {},
      googleRedirectUrl: 'http://localhost:8000/auth/google/redirect'
    };
  },
  methods: {
    async login() {
      // Simulasi login (karena belum connect API, redirect langsung ke dashboard untuk tes tampilan)
      console.log('Login attempted');
      localStorage.setItem('token', 'fake-token'); // Fake token untuk tes
      this.$router.push('/dashboard');
      // Nanti ganti dengan API call: await axios.post('http://localhost:8000/login', this.loginForm); dll.
    }
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh; /* Full height */
  background: linear-gradient(135deg, #0d6efd 0%, #ffffff 100%); /* Gradient biru-putih menarik */
  /* Atau gunakan image: background: url('@/assets/background.jpg') no-repeat center center/cover; */
}
.auth-card {
  width: 100%;
  max-width: 400px; /* Lebar form */
  padding: 20px;
  border-radius: 15px; /* Sudut melengkung untuk tampilan menarik */
}
</style>