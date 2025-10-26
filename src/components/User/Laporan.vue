<template>
  <div class="helpdesk-wrapper">
    <!-- Main Content -->
    <div class="flex-grow-1 p-4" style="background-color: #f8f9fa;">
      <!-- Dashboard Header -->
      <div class="row mb-4">
        <div class="col-md-8">
          <h1 class="display-6">Dashboard Helpdesk</h1>
          <p class="text-muted">Kelola laporan dan tiket Anda dengan mudah</p>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-primary btn-lg" @click="showCreateTicket = true">
            + Buat Laporan Baru
          </button>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title text-muted">Total Tiket</h6>
              <h3 class="mb-0">{{ tickets.length }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title text-muted">Sedang Diproses</h6>
              <h3 class="mb-0 text-warning">{{ countByStatus('Dalam Proses') }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title text-muted">Selesai</h6>
              <h3 class="mb-0 text-success">{{ countByStatus('Selesai') }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title text-muted">Kritis/Tinggi</h6>
              <h3 class="mb-0 text-danger">{{ countByPriority(['urgent', 'tinggi']) }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Search -->
      <div class="row mb-3">
        <div class="col-md-4">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Cari tiket..."
            v-model="searchQuery"
          />
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="filterStatus">
            <option value="">Semua Status</option>
            <option value="Baru">Baru</option>
            <option value="Dalam Proses">Dalam Proses</option>
            <option value="Menunggu Respon">Menunggu Respon</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="filterPriority">
            <option value="">Semua Prioritas</option>
            <option value="urgent">Kritis</option>
            <option value="tinggi">Tinggi</option>
            <option value="sedang">Sedang</option>
            <option value="rendah">Rendah</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>ID Tiket</th>
                <th>Judul Laporan</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Prioritas</th>
                <th>Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in filteredTickets" :key="ticket.id">
                <td><strong>#{{ ticket.id }}</strong></td>
                <td>{{ ticket.judul }}</td>
                <td>{{ ticket.kategori }}</td>
                <td><span :class="getStatusClass(ticket.status)" class="badge">{{ ticket.status }}</span></td>
                <td><span :class="getPriorityClass(ticket.prioritas)" class="badge">{{ ticket.prioritas }}</span></td>
                <td>{{ formatDate(ticket.created_at) }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary" @click="openTicket(ticket)">Lihat</button>
                </td>
              </tr>
              <tr v-if="filteredTickets.length === 0">
                <td colspan="7" class="text-center py-4 text-muted">Tidak ada tiket yang sesuai</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Create Ticket -->
      <div class="modal fade" :class="{ show: showCreateTicket }" tabindex="-1" v-if="showCreateTicket" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Buat Laporan Baru</h5>
              <button type="button" class="btn-close" @click="showCreateTicket = false"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Judul</label>
                <input type="text" class="form-control" v-model="newTicket.judul" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Kategori</label>
                <select class="form-select" v-model="newTicket.kategori" required>
                  <option value="Teknis">Teknis</option>
                  <option value="Logistik">Logistik</option>
                  <option value="Registrasi">Registrasi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Prioritas</label>
                <select class="form-select" v-model="newTicket.prioritas" required>
                  <option value="rendah">Rendah</option>
                  <option value="sedang">Sedang</option>
                  <option value="tinggi">Tinggi</option>
                  <option value="urgent">Kritis</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea class="form-control" v-model="newTicket.deskripsi" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Lampiran (opsional)</label>
                <input type="file" class="form-control" @change="handleFileUpload" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showCreateTicket = false">Batal</button>
              <button type="button" class="btn btn-primary" @click="submitTicket">Kirim</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Detail Ticket -->
      <div class="modal fade" :class="{ show: showDetail }" tabindex="-1" v-if="showDetail" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detail Laporan #{{ selectedTicket.id }}</h5>
              <button type="button" class="btn-close" @click="showDetail = false"></button>
            </div>
            <div class="modal-body">
              <p><strong>Judul:</strong> {{ selectedTicket.judul }}</p>
              <p><strong>Kategori:</strong> {{ selectedTicket.kategori }}</p>
              <p><strong>Status:</strong> <span :class="getStatusClass(selectedTicket.status)" class="badge">{{ selectedTicket.status }}</span></p>
              <p><strong>Prioritas:</strong> <span :class="getPriorityClass(selectedTicket.prioritas)" class="badge">{{ selectedTicket.prioritas }}</span></p>
              <p><strong>Deskripsi:</strong> {{ selectedTicket.deskripsi }}</p>
              <p><strong>Dibuat:</strong> {{ formatDate(selectedTicket.created_at) }}</p>
              <p><strong>Feedback:</strong> {{ selectedTicket.feedback || '-' }}</p>
              <p v-if="selectedTicket.lampiran"><strong>Lampiran:</strong> <a :href="selectedTicket.lampiran" target="_blank">Lihat File</a></p>
              <div class="mb-3" v-if="selectedTicket.resolved">
                <p><strong>Waktu Penyelesaian:</strong> {{ calculateDuration(selectedTicket.created_at, selectedTicket.resolved) }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showDetail = false">Tutup</button>
              <button type="button" class="btn btn-primary" @click="submitFeedback" v-if="selectedTicket.status === 'Selesai' && !selectedTicket.feedback">Berikan Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tickets: [],
      showCreateTicket: false,
      showDetail: false,
      selectedTicket: {},
      newTicket: {
        judul: '',
        kategori: 'Teknis',
        prioritas: 'sedang',
        deskripsi: '',
        file: null
      },
      searchQuery: '',
      filterStatus: '',
      filterPriority: ''
    };
  },
  computed: {
    filteredTickets() {
      return this.tickets.filter(ticket => {
        const matchSearch = ticket.judul.toLowerCase().includes(this.searchQuery.toLowerCase()) || ticket.id.toString().includes(this.searchQuery);
        const matchStatus = !this.filterStatus || ticket.status === this.filterStatus;
        const matchPriority = !this.filterPriority || ticket.prioritas === this.filterPriority;
        return matchSearch && matchStatus && matchPriority;
      });
    }
  },
  mounted() {
    // Cek apakah user bukan admin
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu');
      this.$router.push('/login');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role === 'admin') {
        alert('Admin tidak dapat mengakses halaman user');
        this.$router.push('/dashboard');
        return;
      }
    } catch (e) {
      console.error('Error parsing token:', e);
      alert('Token tidak valid');
      this.$router.push('/login');
      return;
    }
    this.fetchTickets();
  },
  methods: {
    countByStatus(status) {
      return this.tickets.filter(t => t.status === status).length;
    },
    countByPriority(priorities) {
      return this.tickets.filter(t => priorities.includes(t.prioritas)).length;
    },
    getStatusClass(status) {
      const classes = {
        'Baru': 'bg-info',
        'Dalam Proses': 'bg-warning',
        'Menunggu Respon': 'bg-secondary',
        'Selesai': 'bg-success'
      };
      return classes[status] || 'bg-secondary';
    },
    getPriorityClass(priority) {
      const classes = {
        'urgent': 'bg-danger',
        'tinggi': 'bg-warning',
        'sedang': 'bg-info',
        'rendah': 'bg-success'
      };
      return classes[priority] || 'bg-secondary';
    },
    formatDate(dateString) {
      if (!dateString) return '-';
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    handleFileUpload(event) {
      this.newTicket.file = event.target.files[0];
    },
    async submitTicket() {
      if (!this.newTicket.judul || !this.newTicket.deskripsi) {
        alert('Judul dan deskripsi harus diisi');
        return;
      }

      const formData = new FormData();
      formData.append('judul', this.newTicket.judul);
      formData.append('kategori', this.newTicket.kategori);
      formData.append('prioritas', this.newTicket.prioritas);
      formData.append('deskripsi', this.newTicket.deskripsi);
      if (this.newTicket.file) {
        formData.append('lampiran', this.newTicket.file);
      }

      try {
        await axios.post('/reports', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.resetForm();
        this.showCreateTicket = false;
        alert('Laporan berhasil dibuat!');
        this.fetchTickets();
      } catch (error) {
        console.error('Gagal membuat laporan:', error.response || error);
        alert('Gagal membuat laporan: ' + (error.response?.data?.message || error.message));
      }
    },
    resetForm() {
      this.newTicket = {
        judul: '',
        kategori: 'Teknis',
        prioritas: 'sedang',
        deskripsi: '',
        file: null
      };
    },
    async openTicket(ticket) {
      try {
        const response = await axios.get(`/reports/${ticket.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.selectedTicket = response.data.data;
        this.showDetail = true;
      } catch (error) {
        console.error('Gagal memuat detail laporan:', error.response || error);
        alert('Gagal memuat detail laporan: ' + (error.response?.data?.message || error.message));
      }
    },
    submitFeedback() {
      alert('Feedback berhasil disimpan. Terima kasih atas masukan Anda!');
      this.showDetail = false;
    },
    calculateDuration(created, resolved) {
      if (!resolved) return '-';
      const diff = new Date(resolved) - new Date(created);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    },
    async fetchTickets() {
      try {
        const response = await axios.get('/reports', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.tickets = response.data.data.map(ticket => ({
          ...ticket,
          status: ticket.status || 'Baru',
          prioritas: ticket.prioritas,
          judul: ticket.judul,
          kategori: ticket.kategori,
          created_at: ticket.created_at,
          resolved: ticket.updated_at
        }));
      } catch (error) {
        console.error('Gagal memuat laporan:', error.response || error);
        alert('Gagal memuat laporan: ' + (error.response?.data?.message || error.message));
      }
    }
  }
}
</script>

<style scoped>
.helpdesk-wrapper {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.modal.show {
  display: block !important;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.badge {
  padding: 0.5rem 0.75rem;
}
</style>