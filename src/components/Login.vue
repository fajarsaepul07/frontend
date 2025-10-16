<template>
  <div class="auth-page">
    <div class="background-element"></div>
    
    <div class="auth-wrapper">
      <div class="left-section">
        <div class="left-content">
          <h2 class="tagline">WEB<br>HELPDESK</h2>
          <p class="subtitle">Dukungan Teknis Terpadu</p>
          
          <div class="illustration">
            <div class="icon-wrapper">
              <div class="icon">🎫</div>
            </div>
          </div>

          <div class="features">
            <div class="feature">
              <span class="feature-icon">📝</span>
              <span>Laporan Mudah</span>
            </div>
            <div class="feature">
              <span class="feature-icon">📊</span>
              <span>Tracking Real-time</span>
            </div>
            <div class="feature">
              <span class="feature-icon">⚡</span>
              <span>Respon Cepat</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <div class="auth-card">
          <div class="card-header">
            <h1>Login</h1>
            <p>Belum punya akun? <a href="#" @click.prevent="$router.push('/register')" class="link">Buat akun</a></p>
          </div>

          <form @submit.prevent="login" class="auth-form">
            <div class="form-group">
              <label>Email atau Username</label>
              <input 
                v-model="loginForm.email" 
                type="email" 
                class="form-input" 
                placeholder=""
                required
              >
              <div v-if="loginErrors.email" class="error-message">{{ loginErrors.email }}</div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <input 
                v-model="loginForm.password" 
                type="password" 
                class="form-input" 
                placeholder=""
                required
              >
              <div v-if="loginErrors.password" class="error-message">{{ loginErrors.password }}</div>
            </div>

            <div class="form-footer">
              <label class="checkbox">
                <input type="checkbox">
                <span>Ingat saya</span>
              </label>
              <a href="#" class="forgot-link">Lupa password?</a>
            </div>

            <button type="submit" class="btn-submit">Login</button>
          </form>

          <div class="social-divider">
            <span>atau login dengan</span>
          </div>

          <a :href="googleRedirectUrl" class="btn-social">
            <span>Google</span>
          </a>
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
      console.log('Login attempted');
      localStorage.setItem('token', 'fake-token');
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.auth-page {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
  top: 0;
  left: 0;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.background-element {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
  top: 20%;
  left: 15%;
  filter: blur(60px);
}

.auth-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 90%;
  max-width: 900px;
  height: 600px;
  position: relative;
  z-index: 10;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-radius: 0;
  overflow: hidden;
}

.left-section {
  background: linear-gradient(135deg, #6b4c9a 0%, #5a3f8a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 20px 0 0 20px;
  margin: 0;
  height: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.left-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
  pointer-events: none;
}

.left-content {
  text-align: center;
  z-index: 2;
}

.tagline {
  font-size: 40px;
  font-weight: 900;
  color: white;
  letter-spacing: 2px;
  margin-bottom: 8px;
  line-height: 1.1;
}

.subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 35px;
  font-weight: 500;
}

.illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  height: 140px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.icon {
  font-size: 70px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 10px;
  font-weight: 600;
}

.feature-icon {
  font-size: 24px;
}

.right-section {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 30px;
  border-radius: 0 20px 20px 0;
  margin: 0;
  height: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.auth-card {
  width: 100%;
  max-width: 360px;
}

.card-header {
  margin-bottom: 24px;
}

.card-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
}

.card-header p {
  font-size: 12px;
  color: #666;
}

.link {
  color: #6b4c9a;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.link:hover {
  color: #5a3f8a;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 12px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  font-size: 14px;
  color: #333;
  transition: all 0.3s ease;
  background: transparent;
  font-weight: 500;
}

.form-input::placeholder {
  color: #ccc;
}

.form-input:focus {
  outline: none;
  border-bottom-color: #6b4c9a;
}

.error-message {
  color: #e74c3c;
  font-size: 11px;
  margin-top: 4px;
  font-weight: 500;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  font-size: 12px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
}

.checkbox input {
  width: 14px;
  height: 14px;
  cursor: pointer;
  accent-color: #6b4c9a;
}

.forgot-link {
  color: #6b4c9a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #5a3f8a;
}

.btn-submit {
  background: linear-gradient(135deg, #6b4c9a 0%, #5a3f8a 100%);
  color: white;
  border: none;
  padding: 13px 28px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: 8px;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(107, 76, 154, 0.3);
}

.btn-submit:active {
  transform: translateY(0);
}

.social-divider {
  text-align: center;
  margin: 24px 0;
  font-size: 12px;
  color: #999;
  font-weight: 600;
  position: relative;
}

.social-divider::before,
.social-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #e0e0e0;
}

.social-divider::before {
  left: 0;
}

.social-divider::after {
  right: 0;
}

.btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-social:hover {
  background: #f8f8f8;
  border-color: #6b4c9a;
  color: #6b4c9a;
}

.btn-social::before {
  content: 'G';
  margin-right: 8px;
  font-weight: bold;
  color: #6b4c9a;
}

@media (max-width: 1024px) {
  .auth-wrapper {
    grid-template-columns: 1fr;
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    height: auto;
  }

  .left-section {
    display: none;
  }

  .right-section {
    padding: 40px 20px;
    border-radius: 20px;
  }
}

@media (max-width: 480px) {
  .auth-card {
    max-width: 100%;
  }

  .card-header h1 {
    font-size: 28px;
  }

  .left-section {
    padding: 40px 20px;
  }

  .tagline {
    font-size: 40px;
  }
}
</style>