<template>
  <div class="forbidden-page">
    <h1>🚫 403 - Akses Ditolak</h1>
    <p>Kamu tidak memiliki izin untuk mengakses halaman ini.</p>
    <router-link to="/user" class="back-btn">Kembali ke Beranda</router-link>
  </div>
</template>

<style scoped>
.forbidden-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: #f8fafc;
}

h1 {
  color: #e53e3e;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  color: #555;
  margin-bottom: 20px;
}

.back-btn {
  background-color: #667eea;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.back-btn:hover {
  background-color: #5a67d8;
}
</style>
