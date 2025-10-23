<template>
  <div class="container">
    <h2>Edit Kategori</h2>
    <form @submit.prevent="updateKategori">
      <div class="form-group">
        <label for="nama_kategori">Nama Kategori</label>
        <input v-model="form.nama_kategori" type="text" class="form-control" id="nama_kategori" required>
      </div>

      <div class="form-group">
        <label for="deskripsi">Deskripsi</label>
        <textarea v-model="form.deskripsi" class="form-control" id="deskripsi"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!form.nama_kategori.trim()">Update</button>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'KategoriUpdate',
  data() {
    return {
      form: {
        nama_kategori: '',
        deskripsi: ''
      },
      error: ''
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (!id) {
      this.error = 'ID kategori tidak ditemukan'
      return
    }

    axios.get(`http://localhost:8000/api/kategoris/${id}`)
      .then(res => {
        this.form = res.data.data || { nama_kategori: '', deskripsi: '' }
      })
      .catch(err => this.error = err.response?.data?.message || 'Gagal mengambil data')
  },
  methods: {
    updateKategori() {
      const id = this.$route.params.id
      if (!id) {
        this.error = 'ID kategori tidak valid'
        return
      }

      this.form.nama_kategori = this.form.nama_kategori.trim()
      if (!this.form.nama_kategori) {
        this.error = 'Nama kategori wajib diisi'
        return
      }

      axios.put(`http://localhost:8000/api/kategoris/${id}`, this.form)
        .then(() => this.$router.push('/admin/kategori'))
        .catch(err => this.error = err.response?.data?.message || 'Gagal memperbarui kategori')
    }
  }
}
</script>

<style scoped>
.container { padding: 20px; }
.form-group { margin-bottom: 15px; }
</style>
