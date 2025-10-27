<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-ticket-detailed me-2"></i>
              Manajemen Tiket Admin
            </h5>
            <router-link to="/tiket/create" class="btn btn-light">
              <i class="bi bi-plus-circle me-1"></i>
              Buat Tiket Baru
            </router-link>
          </div>

          <div class="card-body">
            <!-- Filter -->
            <div class="row mb-4">
              <div class="col-md-3">
                <label class="form-label">Status</label>
                <select v-model="filters.status_id" @change="fetchTickets" class="form-select">
                  <option value="">Semua Status</option>
                  <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                    {{ status.nama_status }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Kategori</label>
                <select v-model="filters.kategori_id" @change="fetchTickets" class="form-select">
                  <option value="">Semua Kategori</option>
                  <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
                    {{ kategori.nama_kategori }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Prioritas</label>
                <select v-model="filters.prioritas_id" @change="fetchTickets" class="form-select">
                  <option value="">Semua Prioritas</option>
                  <option v-for="priority in prioritas" :key="priority.prioritas_id" :value="priority.prioritas_id">
                    {{ priority.nama_prioritas }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <button class="btn btn-outline-secondary w-100" @click="resetFilters">
                  <i class="bi bi-arrow-clockwise me-1"></i>
                  Reset Filter
                </button>
              </div>
            </div>

            <!-- Statistik -->
            <div class="row mb-4">
              <div class="col-md-3" v-for="card in statsCards" :key="card.title">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5 class="card-title text-muted">{{ card.title }}</h5>
                    <h3 :class="card.class">{{ card.value }}</h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Table -->
            <div v-else>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th>ID Tiket</th>
                      <th>Kode</th>
                      <th>Judul</th>
                      <th>User</th>
                      <th>Event</th>
                      <th>Kategori</th>
                      <th>Prioritas</th>
                      <th>Status</th>
                      <th>Waktu Dibuat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ticket in filteredTickets" :key="ticket.tiket_id">
                      <td><strong>#{{ ticket.tiket_id }}</strong></td>
                      <td>{{ ticket.kode_tiket }}</td>
                      <td>{{ ticket.judul }}</td>
                      <td>{{ ticket.user?.name || 'N/A' }}</td>
                      <td>{{ ticket.event?.nama_event || 'N/A' }}</td>
                      <td><span class="badge bg-info">{{ ticket.kategoris?.nama_kategori || 'N/A' }}</span></td>
                      <td><span :class="getPriorityClass(ticket.prioritas?.nama_prioritas)">
                        {{ ticket.prioritas?.nama_prioritas || 'N/A' }}
                      </span></td>
                      <td><span :class="getStatusClass(ticket.status?.nama_status)">
                        {{ ticket.status?.nama_status || 'N/A' }}
                      </span></td>
                      <td>{{ formatDate(ticket.waktu_dibuat) }}</td>
                      <td>
                        <button class="btn btn-sm btn-info me-1" @click="viewDetail(ticket)">
                          <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-warning me-1" @click="editTicket(ticket)">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteTicket(ticket.tiket_id)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredTickets.length === 0">
                      <td colspan="10" class="text-center py-4 text-muted">
                        <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                        Tidak ada tiket yang ditemukan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="text-muted">
                  Menampilkan {{ filteredTickets.length }} dari {{ totalTickets }} tiket
                </div>
                <nav>
                  <ul class="pagination mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="currentPage = 1">Pertama</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="currentPage--">&laquo; Sebelumnya</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === lastPage }">
                      <button class="page-link" @click="currentPage++">Selanjutnya &raquo;</button>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === lastPage }">
                      <button class="page-link" @click="currentPage = lastPage">Terakhir</button>
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

// ✅ Tambahkan baseURL agar semua request langsung ke Laravel
axios.defaults.baseURL = 'http://localhost:8000'

export default {
  name: 'AdminTiket',
  data() {
    return {
      tickets: [],
      users: [],
      events: [],
      kategoris: [],
      prioritas: [],
      statuses: [],
      admins: [],
      loading: false,
      currentPage: 1,
      filters: { status_id: '', kategori_id: '', prioritas_id: '' },
    }
  },
  computed: {
    filteredTickets() {
      let f = [...this.tickets]
      if (this.filters.status_id) f = f.filter(t => t.status_id == this.filters.status_id)
      if (this.filters.kategori_id) f = f.filter(t => t.kategori_id == this.filters.kategori_id)
      if (this.filters.prioritas_id) f = f.filter(t => t.prioritas_id == this.filters.prioritas_id)
      const start = (this.currentPage - 1) * 10
      return f.slice(start, start + 10)
    },
    totalTickets() { return this.tickets.length },
    processingTickets() { return this.tickets.filter(t => t.status?.nama_status === 'Dalam Proses').length },
    completedTickets() { return this.tickets.filter(t => t.status?.nama_status === 'Selesai').length },
    highPriorityTickets() { return this.tickets.filter(t => ['Tinggi','Kritis'].includes(t.prioritas?.nama_prioritas)).length },
    statsCards() {
      return [
        { title: 'Total Tiket', value: this.totalTickets, class: 'text-primary' },
        { title: 'Dalam Proses', value: this.processingTickets, class: 'text-warning' },
        { title: 'Selesai', value: this.completedTickets, class: 'text-success' },
        { title: 'Prioritas Tinggi', value: this.highPriorityTickets, class: 'text-danger' }
      ]
    },
    lastPage() { return Math.ceil(this.tickets.length / 10) }
  },
  mounted() {
    this.fetchTickets()
    this.fetchMasterData()
  },
  methods: {
    async fetchTickets() {
      this.loading = true
      try {
        const res = await axios.get('/api/tikets')
        this.tickets = res.data.data
      } catch (e) {
        console.error('Error fetching tickets:', e)
      } finally {
        this.loading = false
      }
    },
    async fetchMasterData() {
      try {
        const [users, events, kategoris, prioritas, statuses] = await Promise.all([
          axios.get('/users'),
          axios.get('/events'),
          axios.get('/kategoris'),
          axios.get('/prioritas'),
          axios.get('/tiket-statuses')
        ])
        this.users = users.data.data
        this.events = events.data.data
        this.kategoris = kategoris.data.data
        this.prioritas = prioritas.data.data
        this.statuses = statuses.data.data
      } catch (e) {
        console.error('Error fetching master data:', e)
      }
    },
    resetFilters() {
      this.filters = { status_id: '', kategori_id: '', prioritas_id: '' }
      this.fetchTickets()
    },
    getPriorityClass(p) {
      return {
        'Kritis': 'badge bg-danger',
        'Tinggi': 'badge bg-warning text-dark',
        'Sedang': 'badge bg-info',
        'Rendah': 'badge bg-success'
      }[p] || 'badge bg-secondary'
    },
    getStatusClass(s) {
      return {
        'Baru': 'badge bg-primary',
        'Dalam Proses': 'badge bg-warning text-dark',
        'Menunggu Respon': 'badge bg-info',
        'Selesai': 'badge bg-success'
      }[s] || 'badge bg-secondary'
    },
    formatDate(d) {
      if (!d) return '-'
      return new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    },
    viewDetail(ticket) { this.$router.push(`/admin/tikets/${ticket.tiket_id}`) },
    editTicket(ticket) { this.$router.push(`/tiket/edit/${ticket.tiket_id}`) },
    async deleteTicket(id) {
      if (!confirm('Yakin hapus tiket ini?')) return
      try {
        await axios.delete(`/api/tikets/${id}`)
        alert('Tiket berhasil dihapus')
        this.fetchTickets()
      } catch (e) {
        console.error(e)
        alert('Gagal menghapus tiket')
      }
    }
  }
}
</script>

<style scoped>
.card { border: none; box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075); }
.badge { padding: 0.5em 0.75em; font-size: 0.875em; }
.table th { border-top: none; background-color: #f8f9fa; }
.pagination .page-link { color: #0d6efd; }
.form-label { font-weight: 600; color: #495057; }
</style>
