<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h4 class="mb-0">
          <i class="bi bi-pencil-square me-2"></i>
          Edit Kategori
        </h4>
        <router-link to="/admin/kategori" class="btn btn-light btn-sm">
          <i class="bi bi-arrow-left me-1"></i>
          Kembali
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

        <!-- Form -->
        <form @submit.prevent="updateKategori" v-else>
          <!-- Nama Kategori -->
          <div class="form-group mb-3">
            <label for="nama_kategori" class="form-label">
              Nama Kategori <span class="text-danger">*</span>
            </label>
            <input
              v-model="form.nama_kategori"
              type="text"
              class="form-control"
              id="nama_kategori"
              placeholder="Masukkan nama kategori"
              required
            />
          </div>

          <!-- Deskripsi -->
          <div class="form-group mb-4">
            <label for="deskripsi" class="form-label">Deskripsi</label>
            <textarea
              v-model="form.deskripsi"
              class="form-control"
              id="deskripsi"
              rows="4"
              placeholder="Masukkan deskripsi kategori (opsional)"
            ></textarea>
          </div>

          <!-- Submit Buttons -->
          <div class="d-flex gap-2">
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="submitting || !form.nama_kategori.trim()"
            >
              <i class="bi bi-check-circle me-1"></i>
              {{ submitting ? 'Menyimpan...' : 'Update' }}
            </button>
            <router-link to="/admin/kategori" class="btn btn-secondary">
              <i class="bi bi-x-circle me-1"></i>
              Batal
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default {
  name: 'KategoriUpdate',
  
  data() {
    return {
      form: {
        nama_kategori: '',
        deskripsi: ''
      },
      loading: false,
      submitting: false,
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

      const id = this.$route.params.id

      if (!id) {
        this.error = 'ID kategori tidak ditemukan'
        this.loading = false
        return
      }

      try {
        const res = await axios.get(`/kategoris/${id}`)

        console.log('Response:', res.data)

        if (res.data.status && res.data.data) {
          this.form = {
            nama_kategori: res.data.data.nama_kategori || '',
            deskripsi: res.data.data.deskripsi || ''
          }
        } else {
          throw new Error('Data kategori tidak ditemukan')
        }
      } catch (err) {
        console.error('Error fetching kategori:', err)
        
        if (err.response?.status === 404) {
          this.error = 'Kategori tidak ditemukan'
        } else {
          this.error = err.response?.data?.message || 'Gagal mengambil data kategori'
        }
      } finally {
        this.loading = false
      }
    },

    async updateKategori() {
      this.submitting = true
      this.error = ''

      const id = this.$route.params.id

      if (!id) {
        this.error = 'ID kategori tidak valid'
        this.submitting = false
        return
      }

      // Validasi
      this.form.nama_kategori = this.form.nama_kategori.trim()

      if (!this.form.nama_kategori) {
        this.error = 'Nama kategori wajib diisi'
        this.submitting = false
        return
      }

      try {
        const res = await axios.put(`/kategoris/${id}`, this.form)

        console.log('Response:', res.data)

        if (res.data.status) {
          alert('✅ Kategori berhasil diperbarui!')
          this.$router.push('/admin/kategori')
        } else {
          throw new Error(res.data.message || 'Gagal memperbarui kategori')
        }
      } catch (err) {
        console.error('Error updating kategori:', err.response?.data || err)
        
        if (err.response?.data?.errors) {
          const errors = err.response.data.errors
          const errorMessages = Object.values(errors).flat().join(', ')
          this.error = `Validasi gagal: ${errorMessages}`
        } else {
          this.error = err.response?.data?.message || err.message || 'Gagal memperbarui kategori'
        }
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
  max-width: 700px;
  margin: 0 auto;
}

.card-header {
  border-radius: 12px 12px 0 0 !important;
  padding: 1.25rem 1.5rem;
}

.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>