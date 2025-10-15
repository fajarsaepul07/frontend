<template>
  <div class="auth-page d-flex align-items-center justify-content-center">
    <div class="card auth-card shadow-lg">
      <div class="card-header">Register</div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model="registerForm.name" type="text" class="form-control" required>
            <div v-if="registerErrors.name" class="text-danger">{{ registerErrors.name[0] }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="registerForm.email" type="email" class="form-control" required>
            <div v-if="registerErrors.email" class="text-danger">{{ registerErrors.email[0] }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="registerForm.password" type="password" class="form-control" required>
            <div v-if="registerErrors.password" class="text-danger">{{ registerErrors.password[0] }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input v-model="registerForm.password_confirmation" type="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
          <a href="#" @click.prevent="$router.push('/login')" class="d-block text-center mt-3">Already have an account? Login</a>
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
      // Simulasi register (redirect ke login untuk tes)
      console.log('Register attempted');
      this.$router.push('/login');
      // Nanti ganti dengan API: await axios.post('http://localhost:8000/register', this.registerForm); dll.
    }
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #198754 0%, #ffffff 100%); /* Gradient hijau-putih untuk beda dari login */
  /* Atau image: background: url('@/assets/register-bg.jpg') no-repeat center center/cover; */
}
.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 15px;
}
</style>