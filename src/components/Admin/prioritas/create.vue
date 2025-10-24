<template>
  <div class="container py-4">
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Tambah Prioritas</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="simpanData">
          <div class="mb-3">
            <label for="nama_prioritas" class="form-label">Nama Prioritas</label>
            <input
              type="text"
              id="nama_prioritas"
              class="form-control"
              v-model="form.nama_prioritas"
              placeholder="Masukkan nama prioritas (contoh: Tinggi, Sedang, Rendah)"
              required
            />
          </div>
          <div class="d-flex justify-content-end gap-2">
            <router-link to="/admin/prioritas" class="btn btn-secondary">Batal</router-link>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PrioritasCreate',
  data() {
    return {
      form: {
        nama_prioritas: ''
      }
    }
  },
  methods: {
    async simpanData() {
      try {
        await axios.post('http://localhost:8000/api/prioritas', this.form)
        this.$router.push('/admin/prioritas')
      } catch (error) {
        console.error(error.response?.data || error)
        alert('Gagal menambah prioritas!')
      }
    }
  }
}
</script>
