<template>
  <div class="container-fluid py-4">
    <div class="card shadow-sm border-0">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Manajemen Prioritas</h5>
        <button class="btn btn-light btn-sm" @click="openForm()">
          <i class="bi bi-plus-lg"></i> Tambah Prioritas
        </button>
      </div>

      <div class="card-body">
        <!-- Table Responsive -->
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Nama Prioritas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in prioritasList" :key="item.prioritas_id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama_prioritas }}</td>
                <td>
                    <button class="btn btn-outline-warning btn-sm me-2 d-flex align-items-center gap-1" @click="editData(item)">
                        <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" @click="hapusData(item.prioritas_id)">
                        <i class="bi bi-trash"></i> Hapus
                    </button>
                </td>
              </tr>
              <tr v-if="prioritasList.length === 0">
                <td colspan="3" class="text-center text-muted py-4">
                  Tidak ada data prioritas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit -->
    <div class="modal fade" id="formModal" tabindex="-1" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ formMode === 'create' ? 'Tambah Prioritas' : 'Edit Prioritas' }}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="simpanData">
              <div class="mb-3">
                <label for="nama_prioritas" class="form-label">Nama Prioritas</label>
                <input
                  type="text"
                  id="nama_prioritas"
                  class="form-control"
                  v-model="form.nama_prioritas"
                  placeholder="Contoh: Tinggi, Sedang, Rendah"
                  required
                />
              </div>

              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">{{ formMode === 'create' ? 'Simpan' : 'Update' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Modal } from 'bootstrap'

export default {
  name: 'PrioritasIndex',
  data() {
    return {
      prioritasList: [],
      form: {
        prioritas_id: null,
        nama_prioritas: ''
      },
      formMode: 'create',
      modalInstance: null
    }
  },
  mounted() {
    this.getPrioritas()
    this.modalInstance = new Modal(this.$refs.modal)
  },
  methods: {
    async getPrioritas() {
      try {
        const res = await axios.get('http://localhost:8000/api/prioritas')
        this.prioritasList = res.data.data
      } catch (error) {
        console.error(error)
      }
    },
    openForm() {
      this.formMode = 'create'
      this.form = { prioritas_id: null, nama_prioritas: '' }
      this.modalInstance.show()
    },
    editData(item) {
      this.formMode = 'edit'
      this.form = { ...item }
      this.modalInstance.show()
    },
    async simpanData() {
      try {
        if (this.formMode === 'create') {
          await axios.post('http://localhost:8000/api/prioritas', this.form)
        } else {
          await axios.put(`http://localhost:8000/api/prioritas/${this.form.prioritas_id}`, this.form)
        }

        this.modalInstance.hide()
        this.getPrioritas()
      } catch (error) {
        console.error(error.response?.data || error)
      }
    },
    async hapusData(id) {
      if (!confirm('Yakin ingin menghapus prioritas ini?')) return
      try {
        await axios.delete(`http://localhost:8000/api/prioritas/${id}`)
        this.getPrioritas()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
@media (max-width: 768px) {
  .card-header h5 {
    font-size: 1rem;
  }
  .btn-sm {
    font-size: 0.8rem;
  }
}
</style>
