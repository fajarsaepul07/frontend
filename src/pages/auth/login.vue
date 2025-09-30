<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <div>
        <label for="username">Username/Email:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';
import axios from '../utils/axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    validatePassword(password) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      return hasUpperCase && hasLowerCase && hasNumber;
    },
    async handleLogin() {
      this.error = '';

      if (!this.validatePassword(this.password)) {
        this.error = 'Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka.';
        return;
      }

      const authStore = useAuthStore();
      try {
        await authStore.login(this.username, this.password);
        this.$router.push('/admin/dashboard');
      } catch (err) {
        this.error = err.message || 'Login gagal. Silakan coba lagi.';
      }
    },
  },
};
</script>

<style scoped>
/* Sama seperti sebelumnya */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.error {
  color: red;
}
label {
  display: block;
  margin: 10px 0 5px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #369a6b;
}
</style>