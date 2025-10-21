<template>
  <div class="container-fluid py-4">
    <!-- User Navbar -->
    <Navbar @go-to-tiket="showModal = true" />

    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-ticket-perforated me-2"></i>
              Manajemen Tiket
            </h5>
            <button class="btn btn-light btn-sm" @click="showModal = true">
              <i class="bi bi-plus-circle me-1"></i>
              Buat Tiket Baru
            </button>
          </div>

          <div class="card-body">
            <!-- Filter Section -->
            <div class="row mb-3">
              <div class="col-md-3">
                <select v-model="filters.status_id" @change="fetchTikets" class="form-select">
                  <option value="">Semua Status</option>
                  <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                    {{ status.nama_status }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <select v-model="filters.kategori_id" @change="fetchTikets" class="form-select">
                  <option value="">Semua Kategori</option>
                  <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
                    {{ kategori.nama_kategori }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <select v-model="filters.prioritas_id" @change="fetchTikets" class="form-select">
                  <option value="">Semua Prioritas</option>
                  <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
                    {{ priority.nama_prioritas }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <button class="btn btn-secondary w-100" @click="resetFilters">
                  <i class="bi bi-arrow-clockwise me-1"></i>
                  Reset Filter
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Tiket Table -->
            <div v-else class="table-responsive">
              <table class="table table-hover">
                <thead class="table-light">
                  <tr>
                    <th>Kode Tiket</th>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Prioritas</th>
                    <th>Status</th>
                    <th>Event</th>
                    <th>Pembuat</th>
                    <th>Waktu Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tiket in tikets" :key="tiket.tiket_id">
                    <td><strong>{{ tiket.kode_tiket }}</strong></td>
                    <td>{{ tiket.judul }}</td>
                    <td>{{ tiket.kategoris?.nama_kategori || '-' }}</td>
                    <td>
                      <span :class="getPriorityBadge(tiket.priorities?.nama_prioritas)">
                        {{ tiket.priorities?.nama_prioritas || '-' }}
                      </span>
                    </td>
                    <td>
                      <span :class="getStatusBadge(tiket.status?.nama_status)">
                        {{ tiket.status?.nama_status || '-' }}
                      </span>
                    </td>
                    <td>{{ tiket.event?.nama_event || '-' }}</td>
                    <td>{{ tiket.user?.name || '-' }}</td>
                    <td>{{ formatDate(tiket.waktu_dibuat) }}</td>
                    <td>
                      <button class="btn btn-sm btn-info me-1" @click="viewDetail(tiket)">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button class="btn btn-sm btn-warning me-1" @click="editTiket(tiket)">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-danger" @click="deleteTiket(tiket.tiket_id)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="tikets.length === 0">
                    <td colspan="9" class="text-center py-4">
                      <i class="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                      Tidak ada data tiket
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form Tiket (Full Screen) -->
    <div class="modal fullscreen-modal" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }" tabindex="-1" v-if="showModal">
      <div class="modal-content-wrapper">
        <div class="modal-content" style="height: 100vh; width: 100vw; overflow-y: auto;">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              {{ isEdit ? 'Edit Tiket' : 'Buat Tiket Baru' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submitForm" class="row g-3">
              <div class="col-md-6 mb-3">
                <label class="form-label">User <span class="text-danger">*</span></label>
                <select v-model="form.user_id" class="form-select" required>
                  <option value="">Pilih User</option>
                  <option v-for="user in users" :key="user.user_id" :value="user.user_id">
                    {{ user.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">Event <span class="text-danger">*</span></label>
                <select v-model="form.event_id" class="form-select" required>
                  <option value="">Pilih Event</option>
                  <option v-for="event in events" :key="event.event_id" :value="event.event_id">
                    {{ event.nama_event }}
                  </option>
                </select>
              </div>

              <div class="col-md-4 mb-3">
                <label class="form-label">Kategori <span class="text-danger">*</span></label>
                <select v-model="form.kategori_id" class="form-select" required>
                  <option value="">Pilih Kategori</option>
                  <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
                    {{ kategori.nama_kategori }}
                  </option>
                </select>
              </div>

              <div class="col-md-4 mb-3">
                <label class="form-label">Prioritas <span class="text-danger">*</span></label>
                <select v-model="form.prioritas_id" class="form-select" required>
                  <option value="">Pilih Prioritas</option>
                  <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
                    {{ priority.nama_prioritas }}
                  </option>
                </select>
              </div>

              <div class="col-md-4 mb-3">
                <label class="form-label">Status <span class="text-danger">*</span></label>
                <select v-model="form.status_id" class="form-select" required>
                  <option value="">Pilih Status</option>
                  <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                    {{ status.nama_status }}
                  </option>
                </select>
              </div>

              <div class="col-12 mb-3">
                <label class="form-label">Judul <span class="text-danger">*</span></label>
                <input type="text" v-model="form.judul" class="form-control" required maxlength="255" />
              </div>

              <div class="col-12 mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea v-model="form.deskripsi" class="form-control" rows="4"></textarea>
              </div>

              <div class="col-12 d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="closeModal">
                  Batal
                </button>
                <button type="submit" class="btn btn-primary" :disabled="submitting">
                  <span v-if="submitting" class="spinner-border spinner-border-sm me-1"></span>
                  {{ isEdit ? 'Update' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }" v-if="showModal"></div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
  name: 'Tiket',
  components: {
    Navbar
  },
  data() {
    return {
      tikets: [],
      users: [],
      events: [],
      kategoris: [],
      priorities: [],
      statuses: [],
      showModal: false,
      loading: false,
      submitting: false,
      isEdit: false,
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
        deskripsi: ''
      },
      editId: null
    }
  },
  mounted() {
    this.fetchTikets()
    this.fetchMasterData()
  },
  methods: {
    async fetchTikets() {
      this.loading = true
      try {
        const params = new URLSearchParams()
        if (this.filters.status_id) params.append('status_id', this.filters.status_id)
        if (this.filters.kategori_id) params.append('kategori_id', this.filters.kategori_id)
        if (this.filters.prioritas_id) params.append('prioritas_id', this.filters.prioritas_id)

        const response = await axios.get(`/api/tikets?${params.toString()}`)
        this.tikets = response.data.data
      } catch (error) {
        console.error('Error fetching tikets:', error)
        alert('Gagal mengambil data tiket')
      } finally {
        this.loading = false
      }
    },
    async fetchMasterData() {
      try {
        const [users, events, kategoris, priorities, statuses] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/events'),
          axios.get('/api/kategoris'),
          axios.get('/api/priorities'),
          axios.get('/api/tiket-statuses')
        ])

        this.users = users.data.data
        this.events = events.data.data
        this.kategoris = kategoris.data.data
        this.priorities = priorities.data.data
        this.statuses = statuses.data.data
      } catch (error) {
        console.error('Error fetching master data:', error)
      }
    },
    async submitForm() {
      this.submitting = true
      try {
        if (this.isEdit) {
          await axios.put(`/api/tikets/${this.editId}`, this.form)
          alert('Tiket berhasil diupdate')
        } else {
          await axios.post('/api/tikets', this.form)
          alert('Tiket berhasil dibuat')
        }
        this.closeModal()
        this.fetchTikets()
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('Gagal menyimpan tiket: ' + (error.response?.data?.message || error.message))
      } finally {
        this.submitting = false
      }
    },
    editTiket(tiket) {
      this.isEdit = true
      this.editId = tiket.tiket_id
      this.form = {
        user_id: tiket.user_id,
        event_id: tiket.event_id,
        kategori_id: tiket.kategori_id,
        prioritas_id: tiket.prioritas_id,
        status_id: tiket.status_id,
        judul: tiket.judul,
        deskripsi: tiket.deskripsi
      }
      this.showModal = true
    },
    async deleteTiket(id) {
      if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) return

      try {
        await axios.delete(`/api/tikets/${id}`)
        alert('Tiket berhasil dihapus')
        this.fetchTikets()
      } catch (error) {
        console.error('Error deleting tiket:', error)
        alert('Gagal menghapus tiket')
      }
    },
    viewDetail(tiket) {
      // Implementasi detail view
      this.$router.push(`/tikets/${tiket.tiket_id}`)
    },
    closeModal() {
      this.showModal = false
      this.isEdit = false
      this.editId = null
      this.form = {
        user_id: '',
        event_id: '',
        kategori_id: '',
        prioritas_id: '',
        status_id: '',
        judul: '',
        deskripsi: ''
      }
    },
    resetFilters() {
      this.filters = {
        status_id: '',
        kategori_id: '',
        prioritas_id: ''
      }
      this.fetchTikets()
    },
    getPriorityBadge(priority) {
      const badges = {
        'Tinggi': 'badge bg-danger',
        'Sedang': 'badge bg-warning text-dark',
        'Rendah': 'badge bg-success'
      }
      return badges[priority] || 'badge bg-secondary'
    },
    getStatusBadge(status) {
      const badges = {
        'Open': 'badge bg-primary',
        'In Progress': 'badge bg-info',
        'Resolved': 'badge bg-success',
        'Closed': 'badge bg-secondary'
      }
      return badges[status] || 'badge bg-secondary'
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.modal-content {
  flex: 1;
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 1rem;
  flex-shrink: 0;
}

.modal-body {
  padding: 2rem;
  flex-grow: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 1rem;
  flex-shrink: 0;
  border-top: 1px solid #dee2e6;
}

.form-label {
  font-weight: 500;
}

.btn-close {
  font-size: 1.5rem;
}

.badge {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
</style>