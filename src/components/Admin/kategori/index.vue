<template>
  <div class="container">
    <h2>Daftar Kategori</h2>
    <router-link to="/admin/kategori/create" class="btn btn-success mb-3">Tambah Kategori</router-link>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Kategori</th>
          <th>Deskripsi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="k in kategoris" :key="k.kategori_id">
          <td>{{ k.kategori_id }}</td>
          <td>{{ k.nama_kategori }}</td>
          <td>{{ k.deskripsi }}</td>
          <td>
            <router-link :to="`/admin/kategori/update/${k.kategori_id}`" class="btn btn-primary btn-sm">Edit</router-link>
            <button @click="hapusKategori(k.kategori_id)" class="btn btn-danger btn-sm">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="error" class="text-danger">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'KategoriIndex',
  data() {
    return {
      kategoris: [],
      error: ''
    }
  },
  methods: {
    fetchKategoris() {
      axios.get('http://localhost:8000/api/kategoris')
        .then(res => this.kategoris = res.data.data || [])
        .catch(err => this.error = err.response?.data?.message || 'Gagal mengambil data')
    },
    hapusKategori(id) {
      if (!id) return
      if (confirm('Yakin ingin menghapus kategori ini?')) {
        axios.delete(`http://localhost:8000/api/kategoris/${id}`)
          .then(() => this.fetchKategoris())
          .catch(err => this.error = err.response?.data?.message || 'Gagal menghapus kategori')
      }
    }
  },
  mounted() {
    this.fetchKategoris()
  }
}
</script>

<style scoped>
.container { padding: 20px; }
.table { width: 100%; }
.btn { margin-right: 5px; }
</style>
