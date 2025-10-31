<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">
          <i class="bi bi-ticket-detailed me-2"></i>
          Detail Tiket
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
          <p class="mt-2 text-muted">Memuat detail tiket...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="alert alert-danger">
          <i class="bi bi-exclamation-triangle me-2"></i>
          {{ error }}
        </div>

        <!-- Content -->
        <div v-else-if="ticket">
          <!-- Kode Tiket & Status -->
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="detail-box">
                <label>Kode Tiket</label>
                <h5 class="text-primary">
                  <span class="badge bg-secondary fs-6">{{ ticket.kode_tiket }}</span>
                </h5>
              </div>
            </div>
            <div class="col-md-6">
              <div class="detail-box">
                <label>Status</label>
                <h5>
                  <span :class="getStatusClass(ticket.status?.nama_status)">
                    {{ ticket.status?.nama_status || '-' }}
                  </span>
                </h5>
              </div>
            </div>
          </div>

          <!-- Judul & Deskripsi -->
          <div class="detail-box mb-4">
            <label>Judul</label>
            <h5>{{ ticket.judul }}</h5>
          </div>

          <div class="detail-box mb-4">
            <label>Deskripsi</label>
            <p class="text-muted mb-0">{{ ticket.deskripsi || 'Tidak ada deskripsi' }}</p>
          </div>

          <!-- Info Grid -->
          <div class="row mb-4">
            <div class="col-md-6 mb-3">
              <div class="detail-box">
                <label>User</label>
                <p class="mb-0">
                  <i class="bi bi-person-circle me-2"></i>
                  {{ ticket.user?.name || '-' }}
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="detail-box">
                <label>Event</label>
                <p class="mb-0">
                  <i class="bi bi-calendar-event me-2"></i>
                  {{ ticket.event?.nama_event || '-' }}
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="detail-box">
                <label>Kategoris</label>
                <p class="mb-0">
                  <span class="badge bg-info">
                    {{ ticket.kategoris?.nama_kategoris || '-' }}
                  </span>
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="detail-box">
                <label>Prioritas</label>
                <p class="mb-0">
                  <span :class="getPriorityClass(ticket.prioritas?.nama_prioritas)">
                    {{ ticket.prioritas?.nama_prioritas || '-' }}
                  </span>
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="detail-box">
                <label>Ditugaskan Ke</label>
                <p class="mb-0">
                  <i class="bi bi-person-badge me-2"></i>
                  {{ ticket.assigned_to || 'Belum ditugaskan' }}
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="detail-box">
                <label>Waktu Dibuat</label>
                <p class="mb-0">
                  <i class="bi bi-clock me-2"></i>
                  {{ formatDate(ticket.waktu_dibuat) }}
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-3" v-if="ticket.waktu_selesai">
              <div class="detail-box">
                <label>Waktu Selesai</label>
                <p class="mb-0">
                  <i class="bi bi-check-circle me-2 text-success"></i>
                  {{ formatDate(ticket.waktu_selesai) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex gap-2 mt-4">
            <router-link 
              :to="`/tiket/edit/${ticket.tiket_id}`" 
              class="btn btn-warning"
            >
              <i class="bi bi-pencil me-1"></i>
              Edit Tiket
            </router-link>
            <button @click="deleteTicket" class="btn btn-danger">
              <i class="bi bi-trash me-1"></i>
              Hapus Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default {
  name: 'ShowTicket',
  
  data() {
    return {
      ticket: null,
      loading: false,
      error: ''
    }
  },

  mounted() {
    this.fetchTicket()
  },

  methods: {
    async fetchTicket() {
      this.loading = true
      this.error = ''

      // ✅ PERBAIKI BAGIAN INI
      const tiket_id = this.$route.params.tiket_id
      
      console.log('Tiket ID:', tiket_id) // Debug: cek nilai tiket_id
      
      if (!tiket_id) {
        this.error = 'ID Tiket tidak ditemukan'
        this.loading = false
        return
      }

      try {
        const res = await axios.get(`/tikets/${tiket_id}`)
        
        if (res.data.status && res.data.data) {
          this.ticket = res.data.data
        } else {
          this.error = 'Tiket tidak ditemukan'
        }
      } catch (err) {
        console.error('Error fetching ticket:', err)
        
        if (err.response?.status === 404) {
          this.error = 'Tiket tidak ditemukan'
        } else {
          this.error = err.response?.data?.message || 'Gagal memuat detail tiket'
        }
      } finally {
        this.loading = false
      }
    },

    getStatusClass(status) {
      const classes = {
        'Baru': 'badge bg-primary fs-6',
        'Dalam Proses': 'badge bg-warning text-dark fs-6',
        'Menunggu Respon': 'badge bg-info fs-6',
        'Selesai': 'badge bg-success fs-6',
        'Ditutup': 'badge bg-secondary fs-6'
      }
      return classes[status] || 'badge bg-secondary fs-6'
    },

    getPriorityClass(priority) {
      const classes = {
        'Kritis': 'badge bg-danger',
        'Tinggi': 'badge bg-warning text-dark',
        'Sedang': 'badge bg-info',
        'Rendah': 'badge bg-success'
      }
      return classes[priority] || 'badge bg-secondary'
    },

    formatDate(date) {
      if (!date) return '-'
      
      const d = new Date(date)
      return d.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    async deleteTicket() {
      if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) return

      try {
        const res = await axios.delete(`/tikets/${this.ticket.tiket_id}`)
        
        if (res.data.status) {
          alert('✅ Tiket berhasil dihapus')
          this.$router.push('/tiket')
        }
      } catch (err) {
        console.error('Error deleting ticket:', err)
        alert('❌ Gagal menghapus tiket')
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

.detail-box {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #0d6efd;
}

.detail-box label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  display: block;
}

.detail-box h5 {
  margin-bottom: 0;
  color: #212529;
}

.detail-box p {
  margin-bottom: 0;
  color: #495057;
  font-size: 1rem;
}

.badge {
  padding: 0.5em 0.75em;
  font-weight: 500;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

@media (max-width: 768px) {
  .card-header h4 {
    font-size: 1.1rem;
  }
  
  .detail-box {
    padding: 0.75rem;
  }
}
</style>