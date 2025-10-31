<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">
          <i class="bi bi-list-ul me-2"></i>
          Daftar Kategori
        </h4>
        <router-link to="/admin/kategori/create" class="btn btn-light">
          <i class="bi bi-plus-circle me-1"></i>
          Tambah Kategori
        </router-link>
      </div>

      <div class="card-body">
        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Memuat data...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="alert alert-danger">
          <i class="bi bi-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Table -->
        <div v-else class="table-responsive">
          <table class="table table-hover table-bordered align-middle">
            <thead class="table-dark">
              <tr>
                <th width="80">ID</th>
                <th>Nama Kategori</th>
                <th>Deskripsi</th>
                <th width="150">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="k in kategori" :key="k.kategori_id">
                <td><strong>#{{ k.kategori_id }}</strong></td>
                <td>{{ k.nama_kategori }}</td>
                <td>{{ k.deskripsi || '-' }}</td>
                <td>
                  <div class="btn-group btn-group-sm" role="group">
                    <router-link 
                      :to="`/admin/kategori/update/${k.kategori_id}`" 
                      class="btn btn-warning"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </router-link>
                    <button 
                      @click="hapusKategori(k.kategori_id)" 
                      class="btn btn-danger"
                      title="Hapus"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="kategori.length === 0">
                <td colspan="4" class="text-center text-muted py-5">
                  <i class="bi bi-inbox fs-1 d-block mb-3"></i>
                  <p class="mb-0">Belum ada kategori</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default {
  name: 'KategoriIndex',
  
  data() {
    return {
      kategori: [],
      loading: false,
      error: ''
    }
  },

  mounted() {
    this.fetchKategori()
  },

  methods: {
    async fetchKategori() {
      this.loading = true
      this.error = ''

      try {
        const res = await axios.get('/kategoris')
        
        console.log('Response:', res.data)
        
        if (res.data.status && res.data.data) {
          this.kategori = res.data.data
        } else {
          this.kategori = []
        }
      } catch (err) {
        console.error('Error fetching kategori:', err)
        this.error = err.response?.data?.message || 'Gagal mengambil data kategori'
      } finally {
        this.loading = false
      }
    },

    async hapusKategori(id) {
      if (!id) {
        alert('ID kategori tidak valid')
        return
      }

      if (!confirm('Yakin ingin menghapus kategori ini?')) return

      try {
        const res = await axios.delete(`/kategoris/${id}`)
        
        if (res.data.status) {
          alert('✅ Kategori berhasil dihapus')
          this.fetchKategori()
        }
      } catch (err) {
        console.error('Error deleting kategori:', err)
        alert('❌ Gagal menghapus kategori')
      }
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
}

.card-header {
  border-radius: 12px 12px 0 0 !important;
  padding: 1.25rem 1.5rem;
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}
</style>