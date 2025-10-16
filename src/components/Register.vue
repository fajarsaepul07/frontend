<template>
  <div class="auth-page">
    <div class="auth-wrapper">
      <div class="right-section">
        <div class="auth-card">
          <div class="card-header">
            <h1>Register</h1>
            <p>Sudah punya akun? <a href="#" @click.prevent="$router.push('/login')" class="link">Login</a></p>
          </div>

          <form @submit.prevent="register" class="auth-form">
            <div class="form-group">
              <label>Nama</label>
              <input v-model="registerForm.name" type="text" class="form-input" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="registerForm.email" type="email" class="form-input" required>
              <div v-if="registerErrors.email" class="error-message">{{ registerErrors.email }}</div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="registerForm.password" type="password" class="form-input" required>
              <div v-if="registerErrors.password" class="error-message">{{ registerErrors.password }}</div>
            </div>
            <div class="form-group">
              <label>Konfirmasi Password</label>
              <input v-model="registerForm.password_confirmation" type="password" class="form-input" required>
            </div>
            <button type="submit" class="btn-submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      registerErrors: {}
    };
  },
  methods: {
    async register() {
      this.registerErrors = {};
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/register', this.registerForm);
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response?.status === 422) {
          this.registerErrors = error.response.data.errors || { general: 'Validasi gagal' };
        } else {
          this.registerErrors.general = 'Registrasi gagal. Coba lagi.';
        }
      }
    }
  }
};
</script>

<style scoped>
/* Gunakan style dari Login.vue */
</style>