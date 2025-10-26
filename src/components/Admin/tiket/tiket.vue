<template>
  <div class="container-fluid py-4">
    <!-- Admin Navbar - Already handled in App.vue, but if needed for specific styling -->
    
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
            <!-- Filter Section -->
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

            <!-- Stats Cards -->
            <div class="row mb-4">
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5 class="card-title text-muted">Total Tiket</h5>
                    <h3 class="text-primary">{{ totalTickets }}</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5 class="card-title text-muted">Dalam Proses</h5>
                    <h3 class="text-warning">{{ processingTickets }}</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5 class="card-title text-muted">Selesai</h5>
                    <h3 class="text-success">{{ completedTickets }}</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-light">
                  <div class="card-body text-center">
                    <h5 class="card-title text-muted">Prioritas Tinggi</h5>
                    <h3 class="text-danger">{{ highPriorityTickets }}</h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Tickets Table -->
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
                      <td>
                        <span class="badge bg-info">{{ ticket.kategoris?.nama_kategori || 'N/A' }}</span>
                      </td>
                      <td>
                        <span :class="getPriorityClass(ticket.prioritas?.nama_prioritas)">
                          {{ ticket.prioritas?.nama_prioritas || 'N/A' }}
                        </span>
                      </td>
                      <td>
                        <span :class="getStatusClass(ticket.status?.nama_status)">
                          {{ ticket.status?.nama_status || 'N/A' }}
                        </span>
                      </td>
                      <td>{{ formatDate(ticket.waktu_dibuat) }}</td>
                      <td>
                        <button class="btn btn-sm btn-info me-1" @click="viewDetail(ticket)">
                          <i class="bi bi-eye"></i> Lihat
                        </button>
                        <button class="btn btn-sm btn-warning me-1" @click="editTicket(ticket)">
                          <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteTicket(ticket.tiket_id)">
                          <i class="bi bi-trash"></i> Hapus
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

    <!-- Modal Form Tiket -->
    <div class="modal fade" tabindex="-1" v-if="showModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              {{ isEdit ? 'Edit Tiket' : 'Buat Tiket Baru' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">User <span class="text-danger">*</span></label>
                  <select v-model="form.user_id" class="form-select" required>
                    <option value="">Pilih User</option>
                    <option v-for="user in users" :key="user.user_id" :value="user.user_id">
                      {{ user.name }} ({{ user.email }})
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Event <span class="text-danger">*</span></label>
                  <select v-model="form.event_id" class="form-select" required>
                    <option value="">Pilih Event</option>
                    <option v-for="event in events" :key="event.event_id" :value="event.event_id">
                      {{ event.nama_event }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Kategori <span class="text-danger">*</span></label>
                  <select v-model="form.kategori_id" class="form-select" required>
                    <option value="">Pilih Kategori</option>
                    <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
                      {{ kategori.nama_kategori }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Prioritas <span class="text-danger">*</span></label>
                  <select v-model="form.prioritas_id" class="form-select" required>
                    <option value="">Pilih Prioritas</option>
                    <option v-for="priority in prioritas" :key="priority.prioritas_id" :value="priority.prioritas_id">
                      {{ priority.nama_prioritas }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Status <span class="text-danger">*</span></label>
                  <select v-model="form.status_id" class="form-select" required>
                    <option value="">Pilih Status</option>
                    <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                      {{ status.nama_status }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Judul <span class="text-danger">*</span></label>
                  <input type="text" v-model="form.judul" class="form-control" required maxlength="255" />
                </div>
                <div class="col-12">
                  <label class="form-label">Deskripsi</label>
                  <textarea v-model="form.deskripsi" class="form-control" rows="5" maxlength="1000"></textarea>
                </div>
                <div class="col-12" v-if="isEdit">
                  <label class="form-label">Ditetapkan Kepada</label>
                  <select v-model="form.assigned_to" class="form-select">
                    <option value="">Belum Ditetapkan</option>
                    <option v-for="admin in admins" :key="admin.user_id" :value="admin.user_id">
                      {{ admin.name }}
                    </option>
                  </select>
                </div>
                <div class="col-12" v-if="isEdit">
                  <label class="form-label">Waktu Selesai</label>
                  <input type="datetime-local" v-model="form.waktu_selesai" class="form-control" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Batal</button>
            <button type="submit" class="btn btn-primary" @click="submitForm" :disabled="submitting">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ isEdit ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      submitting: false,
      showModal: false,
      isEdit: false,
      editId: null,
      currentPage: 1,
      filters: {
        status_id: '',
        kategori_id: '',
        prioritas_id: ''
      },
      form: {
        user_id: '',
        event_id: '',
        kategori_id: '',
        prioritas_id: '',
        status_id: '',
        judul: '',
        deskripsi: '',
        assigned_to: '',
        waktu_selesai: ''
      }
    }
  },
  computed: {
    filteredTickets() {
      let filtered = [...this.tickets];
      
      // Filter by status
      if (this.filters.status_id) {
        filtered = filtered.filter(t => t.status_id == this.filters.status_id);
      }
      
      // Filter by kategori
      if (this.filters.kategori_id) {
        filtered = filtered.filter(t => t.kategori_id == this.filters.kategori_id);
      }
      
      // Filter by prioritas
      if (this.filters.prioritas_id) {
        filtered = filtered.filter(t => t.prioritas_id == this.filters.prioritas_id);
      }
      
      // Sort by priority and date
      filtered.sort((a, b) => {
        const priorityA = this.getPriorityValue(a.prioritas_id);
        const priorityB = this.getPriorityValue(b.prioritas_id);
        if (priorityA !== priorityB) return priorityB - priorityA;
        return new Date(b.waktu_dibuat) - new Date(a.waktu_dibuat);
      });
      
      // Pagination
      const start = (this.currentPage - 1) * 10;
      const end = start + 10;
      return filtered.slice(start, end);
    },
    totalTickets() {
      return this.tickets.length;
    },
    processingTickets() {
      return this.tickets.filter(t => t.status?.nama_status === 'Dalam Proses').length;
    },
    completedTickets() {
      return this.tickets.filter(t => t.status?.nama_status === 'Selesai').length;
    },
    highPriorityTickets() {
      return this.tickets.filter(t => t.prioritas?.nama_prioritas === 'Tinggi' || t.prioritas?.nama_prioritas === 'Kritis').length;
    },
    lastPage() {
      return Math.ceil(this.tickets.length / 10);
    }
  },
  mounted() {
    this.fetchTickets();
    this.fetchMasterData();
  },
  methods: {
    async fetchTickets() {
      this.loading = true;
      try {
        const params = new URLSearchParams();
        if (this.filters.status_id) params.append('status_id', this.filters.status_id);
        if (this.filters.kategori_id) params.append('kategori_id', this.filters.kategori_id);
        if (this.filters.prioritas_id) params.append('prioritas_id', this.filters.prioritas_id);
        
        const response = await axios.get(`/api/tikets?${params.toString()}`);
        this.tickets = response.data.data;
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Gagal memuat data tiket');
      } finally {
        this.loading = false;
      }
    },
    
    async fetchMasterData() {
      try {
        const [users, events, kategoris, prioritas, statuses] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/events'),
          axios.get('/api/kategoris'),
          axios.get('/api/prioritas'),
          axios.get('/api/tiket-statuses')
        ]);
        
        this.users = users.data.data;
        this.events = events.data.data;
        this.kategoris = kategoris.data.data;
        this.prioritas = prioritas.data.data;
        this.statuses = statuses.data.data;
        
        // Get admins (users with admin role)
        const adminResponse = await axios.get('/api/users?role=admin');
        this.admins = adminResponse.data.data;
      } catch (error) {
        console.error('Error fetching master data:', error);
      }
    },
    
    async submitForm() {
      this.submitting = true;
      try {
        if (this.isEdit) {
          await axios.put(`/api/tikets/${this.editId}`, this.form);
          alert('Tiket berhasil diperbarui');
        } else {
          await axios.post('/api/tikets', this.form);
          alert('Tiket berhasil dibuat');
        }
        this.closeModal();
        this.fetchTickets();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Gagal menyimpan tiket: ' + (error.response?.data?.message || error.message));
      } finally {
        this.submitting = false;
      }
    },
    
    editTicket(ticket) {
      this.isEdit = true;
      this.editId = ticket.tiket_id;
      this.form = {
        user_id: ticket.user_id,
        event_id: ticket.event_id,
        kategori_id: ticket.kategori_id,
        prioritas_id: ticket.prioritas_id,
        status_id: ticket.status_id,
        judul: ticket.judul,
        deskripsi: ticket.deskripsi || '',
        assigned_to: ticket.assigned_to || '',
        waktu_selesai: ticket.waktu_selesai ? new Date(ticket.waktu_selesai).toISOString().slice(0, 16) : ''
      };
      this.showModal = true;
    },
    
    async deleteTicket(id) {
      if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) return;
      
      try {
        await axios.delete(`/api/tikets/${id}`);
        alert('Tiket berhasil dihapus');
        this.fetchTickets();
      } catch (error) {
        console.error('Error deleting ticket:', error);
        alert('Gagal menghapus tiket');
      }
    },
    
    viewDetail(ticket) {
      // Navigate to detail page or open modal
      this.$router.push(`/admin/tikets/${ticket.tiket_id}`);
    },
    
    closeModal() {
      this.showModal = false;
      this.isEdit = false;
      this.editId = null;
      this.form = {
        user_id: '',
        event_id: '',
        kategori_id: '',
        prioritas_id: '',
        status_id: '',
        judul: '',
        deskripsi: '',
        assigned_to: '',
        waktu_selesai: ''
      };
    },
    
    resetFilters() {
      this.filters = { status_id: '', kategori_id: '', prioritas_id: '' };
      this.fetchTickets();
    },
    
    getPriorityClass(priority) {
      const classes = {
        'Kritis': 'badge bg-danger',
        'Tinggi': 'badge bg-warning text-dark',
        'Sedang': 'badge bg-info',
        'Rendah': 'badge bg-success'
      };
      return classes[priority] || 'badge bg-secondary';
    },
    
    getStatusClass(status) {
      const classes = {
        'Baru': 'badge bg-primary',
        'Dalam Proses': 'badge bg-warning text-dark',
        'Menunggu Respon': 'badge bg-info',
        'Selesai': 'badge bg-success'
      };
      return classes[status] || 'badge bg-secondary';
    },
    
    getPriorityValue(prioritasId) {
      const priorityMap = { 1: 4, 2: 3, 3: 2, 4: 1 }; // Assuming 1=Kritis, 2=Tinggi, etc.
      return priorityMap[prioritasId] || 0;
    },
    
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.badge {
  padding: 0.5em 0.75em;
  font-size: 0.875em;
}

.table th {
  border-top: none;
  background-color: #f8f9fa;
}

.pagination .page-link {
  color: #0d6efd;
}

.modal-header {
  border-bottom: none;
}

.form-label {
  font-weight: 600;
  color: #495057;
}
</style>