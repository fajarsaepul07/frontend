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
              <h3 class="mb-0 text-danger">{{ countByPriority(['Kritis', 'Tinggi']) }}</h3>
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
            <option value="Kritis">Kritis</option>
            <option value="Tinggi">Tinggi</option>
            <option value="Sedang">Sedang</option>
            <option value="Rendah">Rendah</option>
          </select>
        </div>
        <div class="col-md-2">
          <select class="form-select" v-model="sortBy">
            <option value="terbaru">Terbaru</option>
            <option value="prioritas">Prioritas Tertinggi</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <!-- Tickets Table -->
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
                <td>{{ ticket.title }}</td>
                <td>
                  <span class="badge bg-secondary">{{ ticket.category }}</span>
                </td>
                <td>
                  <span 
                    class="badge"
                    :class="getStatusClass(ticket.status)"
                  >
                    {{ ticket.status }}
                  </span>
                </td>
                <td>
                  <span 
                    class="badge"
                    :class="getPriorityClass(ticket.priority)"
                  >
                    {{ ticket.priority }}
                  </span>
                </td>
                <td>{{ formatDate(ticket.created) }}</td>
                <td>
                  <button 
                    class="btn btn-sm btn-outline-primary"
                    @click="openTicket(ticket)"
                  >
                    Lihat
                  </button>
                </td>
              </tr>
              <tr v-if="filteredTickets.length === 0">
                <td colspan="7" class="text-center py-4 text-muted">
                  Tidak ada tiket yang sesuai dengan filter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create Ticket Modal -->
    <div class="modal" :class="{ show: showCreateTicket }" :style="{ display: showCreateTicket ? 'block' : 'none' }">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Buat Laporan Baru</h5>
            <button type="button" class="btn-close" @click="showCreateTicket = false"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Judul Laporan</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newTicket.title"
                  placeholder="Ringkas masalah Anda"
                />
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Kategori</label>
                  <select class="form-select" v-model="newTicket.category">
                    <option>Teknis</option>
                    <option>Logistik</option>
                    <option>Registrasi</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Prioritas</label>
                  <select class="form-select" v-model="newTicket.priority">
                    <option>Rendah</option>
                    <option>Sedang</option>
                    <option>Tinggi</option>
                    <option>Kritis</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Deskripsi Detail</label>
                <textarea 
                  class="form-control" 
                  rows="5"
                  v-model="newTicket.description"
                  placeholder="Jelaskan masalah Anda secara detail"
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Lampiran (opsional)</label>
                <input 
                  type="file" 
                  class="form-control"
                  @change="handleFileUpload"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <small class="text-muted">Ukuran maksimal: 5MB (image, PDF, atau dokumen)</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showCreateTicket = false">
              Batal
            </button>
            <button type="button" class="btn btn-primary" @click="submitTicket">
              Buat Laporan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div class="modal" :class="{ show: showDetail }" :style="{ display: showDetail ? 'block' : 'none' }">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="selectedTicket">Tiket #{{ selectedTicket.id }}</h5>
            <button type="button" class="btn-close" @click="showDetail = false"></button>
          </div>
          <div class="modal-body" v-if="selectedTicket">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Judul:</strong> {{ selectedTicket.title }}</p>
                <p><strong>Kategori:</strong> {{ selectedTicket.category }}</p>
              </div>
              <div class="col-md-6">
                <p>
                  <strong>Status:</strong> 
                  <span class="badge" :class="getStatusClass(selectedTicket.status)">
                    {{ selectedTicket.status }}
                  </span>
                </p>
                <p>
                  <strong>Prioritas:</strong> 
                  <span class="badge" :class="getPriorityClass(selectedTicket.priority)">
                    {{ selectedTicket.priority }}
                  </span>
                </p>
              </div>
            </div>
            <div class="mb-3">
              <strong>Deskripsi:</strong>
              <p class="mt-2">{{ selectedTicket.description }}</p>
            </div>
            <div class="mb-3">
              <strong>Timeline:</strong>
              <p class="text-muted">Dibuat: {{ formatDate(selectedTicket.created) }}</p>
              <p class="text-muted" v-if="selectedTicket.resolved">
                Selesai: {{ formatDate(selectedTicket.resolved) }}
              </p>
            </div>
            <div v-if="selectedTicket.status === 'Selesai'" class="mb-3">
              <label class="form-label"><strong>Feedback Anda</strong></label>
              <textarea 
                class="form-control" 
                rows="3"
                v-model="selectedTicket.feedback"
                placeholder="Bagikan pengalaman Anda..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDetail = false">
              Tutup
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              v-if="selectedTicket && selectedTicket.status === 'Selesai'"
              @click="submitFeedback"
            >
              Simpan Feedback
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div 
      class="modal-backdrop fade" 
      :class="{ show: showCreateTicket || showDetail }"
      :style="{ display: (showCreateTicket || showDetail) ? 'block' : 'none' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Laporan',
  data() {
    return {
      currentView: 'tiket',
      tickets: [
        {
          id: 'TK001',
          title: 'Sound system tidak berfungsi',
          category: 'Teknis',
          status: 'Selesai',
          priority: 'Kritis',
          created: '2025-09-15T10:30:00',
          resolved: '2025-09-15T12:45:00',
          description: 'Sound system di stage utama tidak mengeluarkan suara sejak jam 10 pagi',
          feedback: ''
        },
        {
          id: 'TK002',
          title: 'Kursi tidak sesuai jumlah peserta',
          category: 'Logistik',
          status: 'Dalam Proses',
          priority: 'Tinggi',
          created: '2025-09-16T08:00:00',
          resolved: null,
          description: 'Jumlah kursi yang disiapkan kurang 50 unit dari yang dikontrak',
          feedback: ''
        },
        {
          id: 'TK003',
          title: 'Listrik mati di area VIP',
          category: 'Teknis',
          status: 'Menunggu Respon',
          priority: 'Kritis',
          created: '2025-09-16T14:20:00',
          resolved: null,
          description: 'Pemadaman listrik mendadak di ruang VIP, peserta tidak bisa masuk',
          feedback: ''
        },
        {
          id: 'TK004',
          title: 'Dekorasi panggung belum selesai',
          category: 'Logistik',
          status: 'Dalam Proses',
          priority: 'Sedang',
          created: '2025-09-17T09:15:00',
          resolved: null,
          description: 'Backdrop dan dekorasi panggung belum dipasang sesuai jadwal',
          feedback: ''
        },
        {
          id: 'TK005',
          title: 'WiFi tidak stabil',
          category: 'Teknis',
          status: 'Selesai',
          priority: 'Sedang',
          created: '2025-09-17T11:00:00',
          resolved: '2025-09-17T14:30:00',
          description: 'Koneksi WiFi sering putus di area lobby',
          feedback: ''
        }
      ],
      showCreateTicket: false,
      showDetail: false,
      selectedTicket: null,
      newTicket: {
        title: '',
        category: 'Teknis',
        priority: 'Sedang',
        description: '',
        file: null
      },
      searchQuery: '',
      filterStatus: '',
      filterPriority: '',
      sortBy: 'terbaru'
    }
  },
  computed: {
    filteredTickets() {
      let filtered = this.tickets.filter(ticket => {
        const matchSearch = !this.searchQuery || 
          ticket.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          ticket.id.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchStatus = !this.filterStatus || ticket.status === this.filterStatus;
        const matchPriority = !this.filterPriority || ticket.priority === this.filterPriority;
        
        return matchSearch && matchStatus && matchPriority;
      });

      if (this.sortBy === 'terbaru') {
        filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
      } else if (this.sortBy === 'prioritas') {
        const priorityMap = { 'Kritis': 4, 'Tinggi': 3, 'Sedang': 2, 'Rendah': 1 };
        filtered.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
      }

      return filtered;
    }
  },
  methods: {
    countByStatus(status) {
      return this.tickets.filter(t => t.status === status).length;
    },
    countByPriority(priorities) {
      return this.tickets.filter(t => priorities.includes(t.priority)).length;
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
        'Kritis': 'bg-danger',
        'Tinggi': 'bg-warning',
        'Sedang': 'bg-info',
        'Rendah': 'bg-success'
      };
      return classes[priority] || 'bg-secondary';
    },
    formatDate(dateString) {
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
    submitTicket() {
      if (!this.newTicket.title || !this.newTicket.description) {
        alert('Judul dan deskripsi harus diisi');
        return;
      }

      const ticket = {
        id: `TK${String(this.tickets.length + 1).padStart(3, '0')}`,
        title: this.newTicket.title,
        category: this.newTicket.category,
        status: 'Baru',
        priority: this.newTicket.priority,
        created: new Date().toISOString(),
        resolved: null,
        description: this.newTicket.description,
        feedback: ''
      };

      this.tickets.unshift(ticket);
      this.resetForm();
      this.showCreateTicket = false;
      alert('Laporan berhasil dibuat!');
    },
    resetForm() {
      this.newTicket = {
        title: '',
        category: 'Teknis',
        priority: 'Sedang',
        description: '',
        file: null
      };
    },
    openTicket(ticket) {
      this.selectedTicket = JSON.parse(JSON.stringify(ticket));
      this.showDetail = true;
    },
    submitFeedback() {
      alert('Feedback berhasil disimpan. Terima kasih atas masukan Anda!');
      this.showDetail = false;
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