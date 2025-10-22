<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow-lg border-0">
          <div class="card-header bg-primary text-white p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="mb-0 fw-bold">
                <i class="bi bi-ticket-perforated me-3"></i>
                Manajemen Tiket
              </h2>
              <button class="btn btn-light btn-lg px-4 py-2" @click="showModal = true">
                <i class="bi bi-plus-circle me-2"></i>
                Buat Tiket Baru
              </button>
            </div>
          </div>

          <div class="card-body p-4">
            <!-- Filter Section -->
            <div class="row mb-4">
              <div class="col-md-3">
                <label class="form-label fw-semibold mb-2">Status</label>
                <select v-model="filters.status_id" @change="fetchTikets" class="form-select form-select-lg">
                  <option value="">Semua Status</option>
                  <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                    {{ status.nama_status }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label fw-semibold mb-2">Kategori</label>
                <select v-model="filters.kategori_id" @change="fetchTikets" class="form-select form-select-lg">
                  <option value="">Semua Kategori</option>
                  <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
                    {{ kategori.nama_kategori }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label fw-semibold mb-2">Prioritas</label>
                <select v-model="filters.prioritas_id" @change="fetchTikets" class="form-select form-select-lg">
                  <option value="">Semua Prioritas</option>
                  <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
                    {{ priority.nama_prioritas }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <button class="btn btn-secondary btn-lg w-100 py-2" @click="resetFilters">
                  <i class="bi bi-arrow-clockwise me-2"></i>
                  Reset Filter
                </button>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Table -->
            <div v-else>
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">ID Tiket</th>
                      <th class="border-0">Judul Laporan</th>
                      <th class="border-0">Kategori</th>
                      <th class="border-0">Status</th>
                      <th class="border-0">Prioritas</th>
                      <th class="border-0">Dibuat</th>
                      <th class="border-0">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tiket in tikets" :key="tiket.tiket_id" class="align-middle">
                      <td><strong>#{{ tiket.kode_tiket }}</strong></td>
                      <td>{{ tiket.judul }}</td>
                      <td>
                        <span class="badge bg-secondary px-3 py-2">{{ tiket.kategoris?.nama_kategori || '-' }}</span>
                      </td>
                      <td>
                        <span :class="getStatusBadge(tiket.status?.nama_status)" class="px-3 py-2">
                          {{ tiket.status?.nama_status || '-' }}
                        </span>
                      </td>
                      <td>
                        <span :class="getPriorityBadge(tiket.priorities?.nama_prioritas)" class="px-3 py-2">
                          {{ tiket.priorities?.nama_prioritas || '-' }}
                        </span>
                      </td>
                      <td>{{ formatDate(tiket.waktu_dibuat) }}</td>
                      <td>
                        <button class="btn btn-primary btn-sm me-2 px-3" @click="viewDetail(tiket)">
                          <i class="bi bi-eye"></i> Lihat
                        </button>
                      </td>
                    </tr>
                    <tr v-if="tikets.length === 0">
                      <td colspan="7" class="text-center py-5">
                        <i class="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                        <h5 class="text-muted">Tidak ada data tiket</h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FORM BESAR (SESUAI GAMBAR) -->
    <div class="modal fade" :class="{ show: showModal, 'd-block': showModal }" tabindex="-1" v-if="showModal">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-primary text-white p-4 border-0">
            <h3 class="modal-title mb-0 fw-bold">
              {{ isEdit ? 'Edit Tiket' : 'Buat Tiket Baru' }}
            </h3>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          
          <div class="modal-body p-5">
            <form @submit.prevent="submitForm">
              <!-- ROW 1 -->
              <div class="row mb-4">
                <div class="col-md-6">
                  <label class="form-label fw-semibold fs-5 mb-3">User <span class="text-danger">*</span></label>
                  <select v-model="form.user_id" class="form-select form-select-lg" required>
                    <option value="">Pilih User</option>
                    <option v-for="user in users" :key="user.user_id" :value="user.user_id">
                      {{ user.name }}
                    </option>
                  </select>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label fw-semibold fs-5 mb-3">Event <span class="text-danger">*</span></label>
                  <select v-model="form.event_id" class="form-select form-select-lg" required>
                    <option value="">Pilih Event</option>
                    <option v-for="event in events" :key="event.event_id" :value="event.event_id">
                      {{ event.nama_event }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- ROW 2 -->
              <div class="row mb-4">
                <div class="col-md-4">
                  <label class="form-label fw-semibold fs-5 mb-3">Kategori <span class="text-danger">*</span></label>
                  <select v-model="form.kategori_id" class="form-select form-select-lg" required>
                    <option value="">Pilih Kategori</option>
                    <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
                      {{ kategori.nama_kategori }}
                    </option>
                  </select>
                </div>
                
                <div class="col-md-4">
                  <label class="form-label fw-semibold fs-5 mb-3">Prioritas <span class="text-danger">*</span></label>
                  <select v-model="form.prioritas_id" class="form-select form-select-lg" required>
                    <option value="">Pilih Prioritas</option>
                    <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
                      {{ priority.nama_prioritas }}
                    </option>
                  </select>
                </div>
                
                <div class="col-md-4">
                  <label class="form-label fw-semibold fs-5 mb-3">Status <span class="text-danger">*</span></label>
                  <select v-model="form.status_id" class="form-select form-select-lg" required>
                    <option value="">Pilih Status</option>
                    <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
                      {{ status.nama_status }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- JUDUL -->
              <div class="mb-4">
                <label class="form-label fw-semibold fs-5 mb-3">Judul <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  v-model="form.judul" 
                  class="form-control form-control-lg border border-primary" 
                  required 
                  maxlength="255"
                  placeholder="Masukkan judul tiket"
                />
              </div>

              <!-- DESKRIPSI -->
              <div class="mb-5">
                <label class="form-label fw-semibold fs-5 mb-3">Deskripsi</label>
                <textarea 
                  v-model="form.deskripsi" 
                  class="form-control form-control-lg border border-primary" 
                  rows="8"
                  placeholder="Masukkan deskripsi lengkap masalah..."
                ></textarea>
              </div>

              <!-- BUTTONS -->
              <div class="d-flex justify-content-end gap-3 pt-3">
                <button type="button" class="btn btn-secondary btn-lg px-4 py-2" @click="closeModal">
                  <i class="bi bi-x-circle me-2"></i>
                  Batal
                </button>
                <button type="submit" class="btn btn-primary btn-lg px-4 py-2" :disabled="submitting">
                  <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEdit ? 'Update Tiket' : 'Simpan Tiket' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Tiket',
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
        console.error('Gagal mengambil tiket:', error)
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
        console.error('Gagal mengambil data master:', error)
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
        console.error('Gagal menyimpan formulir:', error)
        alert('Gagal menyimpan tiket: ' + (error.response?.data?.message || error.message))
      } finally {
        this.submitting = false
      }
    },

    editTiket(tiket) {
      this.isEdit = true
      this.editId = tiket.tiket_id
      this.form = { ...tiket }
      this.showModal = true
    },

    async deleteTiket(id) {
      if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) return
      try {
        await axios.delete(`/api/tikets/${id}`)
        alert('Tiket berhasil dihapus')
        this.fetchTikets()
      } catch (error) {
        alert('Gagal menghapus tiket')
      }
    },

    viewDetail(tiket) {
      this.$router.push(`/tikets/${tiket.tiket_id}`)
    },

    closeModal() {
      this.showModal = false
      this.isEdit = false
      this.editId = null
      this.form = {
        user_id: '', event_id: '', kategori_id: '', prioritas_id: '',
        status_id: '', judul: '', deskripsi: ''
      }
    },

    resetFilters() {
      this.filters = { status_id: '', kategori_id: '', prioritas_id: '' }
      this.fetchTikets()
    },

    getPriorityBadge(priority) {
      const badges = {
        'Tinggi': 'badge bg-danger text-white',
        'Sedang': 'badge bg-warning text-dark', 
        'Rendah': 'badge bg-success text-white'
      }
      return badges[priority] || 'badge bg-secondary'
    },

    getStatusBadge(status) {
      const badges = {
        'Open': 'badge bg-primary text-white',
        'In Progress': 'badge bg-warning text-dark',
        'Resolved': 'badge bg-success text-white',
        'Closed': 'badge bg-secondary text-white'
      }
      return badges[status] || 'badge bg-secondary'
    },

    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
/* Custom Styles untuk Form Besar */
.modal-xl {
  max-width: 90%;
}

.form-label {
  color: #495057;
  letter-spacing: 0.5px;
}

.form-control-lg,
.form-select-lg {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  padding: 12px 16px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.form-control-lg:focus,
.form-select-lg:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-lg {
  border-radius: 10px;
  font-weight: 600;
  padding: 10px 20px;
}

.table {
  font-size: 1rem;
}

.badge {
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 20px;
}

.card {
  border-radius: 15px;
  overflow: hidden;
}

.card-header {
  border-radius: 15px 15px 0 0 !important;
}

.modal-content {
  border-radius: 15px;
}

textarea.form-control-lg {
  resize: vertical;
  min-height: 200px;
  font-family: inherit;
}

/* Hover Effects */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.table tr:hover {
  background-color: rgba(0,123,255,.05);
}
</style>