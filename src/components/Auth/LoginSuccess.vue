<template>
  <div class="loading-screen">
    <p>Memproses login...</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'LoginSuccess',
  setup() {
    const router = useRouter()

    // Ekstrak parameter dari URL
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const redirect = urlParams.get('redirect') || '/'

    if (token) {
      localStorage.setItem('token', token)
      checkUserAndRedirect(redirect)
    } else {
      router.push('/login')
    }

    function checkUserAndRedirect(redirect) {
      axios.get('/cek-user')
        .then(res => {
          const user = res.data
          if (user.role === 'admin') {
            router.push('/dashboard')
          } else {
            router.push(redirect || '/user')
          }
        })
        .catch(error => {
          console.error('Gagal cek user:', error)
          localStorage.removeItem('token')
          router.push('/login')
        })
    }

    return {}
  }
}
</script>

<style scoped>
.loading-screen {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafc;
  font-size: 18px;
  font-weight: bold;
  color: #4f46e5;
}
</style>