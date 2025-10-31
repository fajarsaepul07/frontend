<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-ticket-detailed me-2"></i>
              Manajemen Tiket
            </h5>
            <router-link to="/tiket/create" class="btn btn-light">
              <i class="bi bi-plus-circle me-1"></i>
              Buat Tiket Baru
            </router-link>
          </div>

          <div class="card-body">
            <!-- Filter Section -->
            <div class="row mb-4">
              <div class="col-md-3">
                <label class="form-label">Status</label>
                <select v-model="filters.status_id" @change="applyFilters" class="form-select">
                  <option value="">Semua Status</option>
                  <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                    {{ status.nama_status }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Kategoris</label>
                <select v-model="filters.kategoris_id" @change="applyFilters" class="form-select">
                  <option value="">Semua Kategoris</option>
                  <option v-for="kategoris in kategoris" :key="kategoris.kategori_id" :value="kategoris.kategori_id">
                    {{ kategoris.nama_kategori }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Prioritas</label>
                <select v-model="filters.prioritas_id" @change="applyFilters" class="form-select">
                  <option value="">Semua Prioritas</option>
                  <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
                    {{ priority.nama_prioritas }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">&nbsp;</label>
                <button class="btn btn-outline-secondary w-100" @click="resetFilters">
                  <i class="bi bi-arrow-clockwise me-1"></i>
                  Reset Filter
                </button>
              </div>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
              <div class="col-md-3" v-for="card in statsCards" :key="card.title">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h6 class="card-title text-muted mb-2">{{ card.title }}</h6>
                    <h3 :class="card.class" class="mb-0">{{ card.value }}</h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loading Indicator -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-2 text-muted">Memuat data tiket...</p>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
              <i class="bi bi-exclamation-triangle me-2"></i>
              {{ error }}
              <button type="button" class="btn-close" @click="error = ''"></button>
            </div>

            <!-- Table -->
            <div v-else-if="!loading">
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Kode Tiket</th>
                      <th>Judul</th>
                      <th>User</th>
                      <th>Event</th>
                      <th>Kategoris</th>
                      <th>Prioritas</th>
                      <th>Status</th>
                      <th>Waktu Dibuat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ticket in paginatedTickets" :key="ticket.tiket_id">
                      <td><strong>#{{ ticket.tiket_id }}</strong></td>
                      <td>
                        <span class="badge bg-secondary">{{ ticket.kode_tiket }}</span>
                      </td>
                      <td>
                        <div class="text-truncate" style="max-width: 200px;" :title="ticket.judul">
                          {{ ticket.judul }}
                        </div>
                      </td>
                      <td>{{ ticket.user?.name || 'N/A' }}</td>
                      <td>{{ ticket.event?.nama_event || 'N/A' }}</td>
                      <td>
                        <span class="badge bg-info">
                          {{ ticket.kategori?.nama_kategori || '-' }}
                        </span>
                      </td>
                      <td>
                        <span :class="getPriorityClass(ticket.prioritas?.nama_prioritas)">
                          {{ ticket.prioritas?.nama_prioritas || '-' }}
                        </span>
                      </td>
                      <td>
                        <span :class="getStatusClass(ticket.status?.nama_status)">
                          {{ ticket.status?.nama_status || 'N/A' }}
                        </span>
                      </td>
                      <td>{{ formatDate(ticket.waktu_dibuat) }}</td>
                      <td>
                        <div class="btn-group btn-group-sm" role="group">
                          <button class="btn btn-info" @click="viewDetail(ticket)" title="Detail">
                            <i class="bi bi-eye"></i>
                          </button>
                          <button class="btn btn-warning" @click="editTicket(ticket)" title="Edit">
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-danger" @click="deleteTicket(ticket.tiket_id)" title="Hapus">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredTickets.length === 0">
                      <td colspan="10" class="text-center py-5 text-muted">
                        <i class="bi bi-inbox fs-1 d-block mb-3"></i>
                        <p class="mb-0">Tidak ada tiket yang ditemukan</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="d-flex justify-content-between align-items-center mt-4" v-if="filteredTickets.length > 0">
                <div class="text-muted">
                  Menampilkan {{ startIndex + 1 }} - {{ endIndex }} dari {{ filteredTickets.length }} tiket
                </div>
                <nav>
                  <ul class="pagination mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="currentPage = 1" :disabled="currentPage === 1">
                        Pertama
                      </button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                        &laquo;
                      </button>
                    </li>
                    <li 
                      class="page-item" 
                      v-for="page in visiblePages" 
                      :key="page"
                      :class="{ active: currentPage === page }"
                    >
                      <button class="page-link" @click="currentPage = page">
                        {{ page }}
                      </button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === lastPage }">
                      <button class="page-link" @click="currentPage++" :disabled="currentPage === lastPage">
                        &raquo;
                      </button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === lastPage }">
                      <button class="page-link" @click="currentPage = lastPage" :disabled="currentPage === lastPage">
                        Terakhir
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
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
  name: 'TiketIndex',
  
  data() {
    return {
      tickets: [],
      statuses: [],
      kategoris: [],
      priorities: [],
      loading: false,
      error: '',
      currentPage: 1,
      perPage: 10,
      filters: {
        status_id: '',
        kategoris_id: '',
        prioritas_id: ''
      }
    }
  },

  computed: {
    filteredTickets() {
      return this.tickets
    },

    paginatedTickets() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredTickets.slice(start, end)
    },

    lastPage() {
      return Math.ceil(this.filteredTickets.length / this.perPage) || 1
    },

    startIndex() {
      return (this.currentPage - 1) * this.perPage
    },

    endIndex() {
      const end = this.currentPage * this.perPage
      return end > this.filteredTickets.length ? this.filteredTickets.length : end
    },

    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.lastPage, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    },

    totalTickets() {
      return this.tickets.length
    },

    processingTickets() {
      return this.tickets.filter(t => t.status?.nama_status === 'Dalam Proses').length
    },

    completedTickets() {
      return this.tickets.filter(t => t.status?.nama_status === 'Selesai').length
    },

    highPriorityTickets() {
      return this.tickets.filter(t => 
        ['Tinggi', 'Kritis'].includes(t.prioritas?.nama_prioritas)
      ).length
    },

    statsCards() {
      return [
        { title: 'Total Tiket', value: this.totalTickets, class: 'text-primary' },
        { title: 'Dalam Proses', value: this.processingTickets, class: 'text-warning' },
        { title: 'Selesai', value: this.completedTickets, class: 'text-success' },
        { title: 'Prioritas Tinggi', value: this.highPriorityTickets, class: 'text-danger' }
      ]
    }
  },

  mounted() {
    this.fetchAllData()
  },

  methods: {
    async fetchAllData() {
      this.loading = true
      this.error = ''
      
      try {
        await Promise.all([
          this.fetchTickets(),
          this.fetchMasterData()
        ])
      } catch (e) {
        console.error('Error fetching data:', e)
        this.error = 'Gagal memuat data. Silakan refresh halaman.'
      } finally {
        this.loading = false
      }
    },

    async fetchTickets() {
      try {
        const params = {}
        if (this.filters.status_id) params.status_id = this.filters.status_id
        if (this.filters.kategoris_id) params.kategoris_id = this.filters.kategoris_id
        if (this.filters.prioritas_id) params.prioritas_id = this.filters.prioritas_id

        const res = await axios.get('/tikets', { params })
        
        if (res.data.status && res.data.data) {
          this.tickets = res.data.data
        } else {
          this.tickets = []
        }
      } catch (e) {
        console.error('Error fetching tickets:', e)
        throw e
      }
    },

    async fetchMasterData() {
      try {
        const [statusRes, kategorisRes, prioritasRes] = await Promise.all([
          axios.get('/tiket-statuses'),
          axios.get('/kategoris'),
          axios.get('/prioritas')
        ])

        this.statuses = statusRes.data.data || []
        this.kategoris = kategorisRes.data.data || []
        this.priorities = prioritasRes.data.data || []
      } catch (e) {
        console.error('Error fetching master data:', e)
        throw e
      }
    },

    applyFilters() {
      this.currentPage = 1
      this.fetchTickets()
    },

    resetFilters() {
      this.filters = {
        status_id: '',
        kategoris_id: '',
        prioritas_id: ''
      }
      this.currentPage = 1
      this.fetchTickets()
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

    getStatusClass(status) {
      const classes = {
        'Baru': 'badge bg-primary',
        'Dalam Proses': 'badge bg-warning text-dark',
        'Menunggu Respon': 'badge bg-info',
        'Selesai': 'badge bg-success',
        'Ditutup': 'badge bg-secondary'
      }
      return classes[status] || 'badge bg-secondary'
    },

    formatDate(date) {
      if (!date) return '-'
      
      const d = new Date(date)
      return d.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    // Di TiketIndex.vue - methods
    viewDetail(ticket) {
      // Debug: pastikan ticket.tiket_id ada
      console.log('View detail ticket:', ticket)
      console.log('Tiket ID:', ticket.tiket_id)
      
      if (!ticket.tiket_id) {
        alert('ID Tiket tidak valid')
        return
      }
      
      // Navigasi ke halaman detail
      this.$router.push(`/tiket/${ticket.tiket_id}`)
    },

    editTicket(ticket) {
      this.$router.push(`/tiket/edit/${ticket.tiket_id}`)
    },

    async deleteTicket(tiket_id) {
      if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) return

      try {
        const res = await axios.delete(`/tikets/${tiket_id}`)
        
        if (res.data.status) {
          alert('✅ Tiket berhasil dihapus')
          this.fetchTickets()
        }
      } catch (e) {
        console.error('Error deleting ticket:', e)
        alert('❌ Gagal menghapus tiket')
      }
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0 !important;
  padding: 1.25rem;
}

.badge {
  padding: 0.5em 0.75em;
  font-size: 0.875em;
  font-weight: 500;
}

.table {
  margin-bottom: 0;
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.form-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
}

.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.pagination {
  gap: 0.25rem;
}

.page-link {
  color: #0d6efd;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.75rem;
  margin: 0 0.125rem;
  transition: all 0.2s ease;
}

.page-link:hover {
  background-color: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.875rem;
  }
  
  .btn-group-sm > .btn {
    padding: 0.2rem 0.4rem;
  }
  
  .card-header h5 {
    font-size: 1rem;
  }
}
</style>