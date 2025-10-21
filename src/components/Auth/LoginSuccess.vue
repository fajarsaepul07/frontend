<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h2 class="text-2xl font-bold mb-2">Login berhasil!</h2>
    <p class="text-gray-600">Mengarahkan ke halaman user...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const redirect = urlParams.get('redirect') || '/user';

    if (token) {
      localStorage.setItem('token', token);
      setTimeout(() => {
        window.location.href = redirect;
      }, 1000);
    } else {
      window.location.href = '/login';
    }
  }
};
</script>

<style scoped>
.text-2xl {
  font-size: 1.5rem;
}
.font-bold {
  font-weight: bold;
}
</style>
