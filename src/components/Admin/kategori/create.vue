<template>
  <div class="container">
    <h2>Tambah Kategori Baru</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nama_kategori">Nama Kategori</label>
        <input
          v-model="form.nama_kategori"
          type="text"
          class="form-control"
          id="nama_kategori"
          required
        />
      </div>

      <div class="form-group">
        <label for="deskripsi">Deskripsi</label>
        <textarea
          v-model="form.deskripsi"
          class="form-control"
          id="deskripsi"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!form.nama_kategori.trim()">
        Simpan
      </button>

      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KategoriCreate',
  data() {
    return {
      form: {
        nama_kategori: '',
        deskripsi: ''
      },
      error: ''
    };
  },
  methods: {
    async submitForm() {
      this.error = '';
      this.form.nama_kategori = this.form.nama_kategori.trim();

      if (!this.form.nama_kategori) {
        this.error = 'Nama kategori wajib diisi';
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/kategoris', this.form, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Berhasil:', response.data);
        this.$router.push('/admin/kategori');
      } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        this.error = err.response?.data?.message || 'Gagal membuat kategori';
      }
    }
  }
};
</script>

<style scoped>
.container { padding: 20px; }
.form-group { margin-bottom: 15px; }
</style>
