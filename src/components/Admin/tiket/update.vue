<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h4 class="mb-0">
          <i class="bi bi-pencil-square me-2"></i>
          Edit Tiket
        </h4>
        <router-link to="/tiket" class="btn btn-light btn-sm">
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
          <p class="mt-2 text-muted">Memuat data tiket...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="alert alert-danger">
          <i class="bi bi-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="submitForm" v-else>
          <!-- Info Tiket (readonly) -->
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label">Kode Tiket</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="originalTicket?.kode_tiket" 
                  readonly 
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label class="form-label">Judul</label>
                <input 
                  type="text" 
                  class="form-control" 
                  :value="originalTicket?.judul" 
                  readonly 
                />
              </div>
            </div>
          </div>

          <hr class="my-4">

          <!-- Status -->
          <div class="form-group mb-3">
            <label for="status_id" class="form-label">
              Status <span class="text-danger">*</span>
            </label>
            <select 
              v-model="form.status_id" 
              class="form-select" 
              id="status_id" 
              required
            >
              <option value="">-- Pilih Status --</option>
              <option 
                v-for="status in statuses" 
                :key="status.status_id" 
                :value="status.status_id"
              >
                {{ status.nama_status }}
              </option>
            </select>
          </div>

          <!-- Prioritas -->
          <div class="form-group mb-3">
            <label for="prioritas_id" class="form-label">
              Prioritas <span class="text-danger">*</span>
            </label>
            <select 
              v-model="form.prioritas_id" 
              class="form-select" 
              id="prioritas_id" 
              required
            >
              <option value="">-- Pilih Prioritas --</option>
              <option 
                v-for="priority in priorities" 
                :key="priority.prioritas_id" 
                :value="priority.prioritas_id"
              >
                {{ priority.nama_prioritas }}
              </option>
            </select>
          </div>

          <!-- Ditugaskan Ke -->
          <div class="form-group mb-3">
            <label for="assigned_to" class="form-label">
              Ditugaskan Ke
            </label>
            <input
              v-model="form.assigned_to"
              type="text"
              class="form-control"
              id="assigned_to"
              placeholder="Nama atau ID petugas"
            />
            <small class="text-muted">Kosongkan jika belum ditugaskan</small>
          </div>

          <!-- Waktu Selesai -->
          <div class="form-group mb-4">
            <label for="waktu_selesai" class="form-label">
              Waktu Selesai
            </label>
            <input
              v-model="form.waktu_selesai"
              type="datetime-local"
              class="form-control"
              id="waktu_selesai"
            />
            <small class="text-muted">Isi jika tiket sudah selesai</small>
          </div>

          <!-- Submit Buttons -->
          <div class="d-flex gap-2">
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="submitting"
            >
              <i class="bi bi-check-circle me-1"></i>
              {{ submitting ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
            <router-link to="/tiket" class="btn btn-secondary">
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
  name: 'EditTicket',
  
  data() {
    return {
      form: {
        status_id: '',
        prioritas_id: '',
        assigned_to: '',
        waktu_selesai: ''
      },
      originalTicket: null,
      statuses: [],
      priorities: [],
      loading: false,
      submitting: false,
      error: ''
    }
  },

  async created() {
    this.loading = true
    try {
      await Promise.all([
        this.fetchTicket(),
        this.fetchStatuses(),
        this.fetchPriorities()
      ])
    } catch (err) {
      console.error('Error loading data:', err)
      this.error = 'Gagal memuat data. Silakan coba lagi.'
    } finally {
      this.loading = false
    }
  },

  methods: {
    async fetchTicket() {
      const tiket_id = this.$route.params.tiket_id || this.$route.params.id
      
      try {
        const res = await axios.get(`/tikets/${tiket_id}`)
        
        if (res.data.status && res.data.data) {
          const data = res.data.data
          this.originalTicket = data

          this.form.status_id = data.status_id
          this.form.prioritas_id = data.prioritas_id
          this.form.assigned_to = data.assigned_to || ''
          
          if (data.waktu_selesai) {
            this.form.waktu_selesai = data.waktu_selesai.replace(' ', 'T').substring(0, 16)
          }
        } else {
          throw new Error('Tiket tidak ditemukan')
        }
      } catch (err) {
        console.error('Error fetching ticket:', err)
        throw err
      }
    },

    async fetchStatuses() {
      const res = await axios.get('/tiket-statuses')
      this.statuses = res.data.data || []
    },

    async fetchPriorities() {
      const res = await axios.get('/prioritas')
      this.priorities = res.data.data || []
    },

    async submitForm() {
      this.submitting = true
      this.error = ''

      const tiket_id = this.$route.params.tiket_id || this.$route.params.id

      try {
        const payload = {
          status_id: parseInt(this.form.status_id),
          prioritas_id: parseInt(this.form.prioritas_id),
          assigned_to: this.form.assigned_to || null,
          waktu_selesai: this.form.waktu_selesai || null
        }

        const res = await axios.put(`/tikets/${tiket_id}`, payload)

        if (res.data.status) {
          alert('✅ Tiket berhasil diperbarui!')
          this.$router.push('/tiket')
        } else {
          throw new Error(res.data.message || 'Gagal memperbarui tiket')
        }
      } catch (err) {
        console.error('Submit error:', err.response?.data || err)
        
        if (err.response?.data?.errors) {
          const errors = err.response.data.errors
          const errorMessages = Object.values(errors).flat().join(', ')
          this.error = `Validasi gagal: ${errorMessages}`
        } else if (err.response?.data?.message) {
          this.error = err.response.data.message
        } else {
          this.error = err.message || 'Gagal memperbarui tiket'
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
}

.card-header {
  border-radius: 12px 12px 0 0 !important;
  padding: 1.25rem 1.5rem;
}

.form-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.form-control:read-only {
  background-color: #e9ecef;
  cursor: not-allowed;
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

.text-danger {
  font-size: 0.875rem;
}

.alert {
  border-radius: 8px;
}

hr {
  border-top: 2px solid #dee2e6;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

@media (max-width: 768px) {
  .card-header h4 {
    font-size: 1.1rem;
  }
}
</style>