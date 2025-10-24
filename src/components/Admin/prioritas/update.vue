<template>
  <div class="container py-4">
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-warning text-white">
        <h5 class="mb-0">Edit Prioritas</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateData">
          <div class="mb-3">
            <label for="nama_prioritas" class="form-label">Nama Prioritas</label>
            <input
              type="text"
              id="nama_prioritas"
              class="form-control"
              v-model="form.nama_prioritas"
              placeholder="Masukkan nama prioritas baru"
              required
            />
          </div>
          <div class="d-flex justify-content-end gap-2">
            <router-link to="/admin/prioritas" class="btn btn-secondary">Batal</router-link>
            <button type="submit" class="btn btn-warning text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PrioritasUpdate',
  data() {
    return {
      form: {
        prioritas_id: null,
        nama_prioritas: ''
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id
    try {
      const res = await axios.get('http://localhost:8000/api/prioritas')
      const data = res.data.data.find(p => p.prioritas_id == id)
      if (data) this.form = data
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async updateData() {
      try {
        await axios.put(`http://localhost:8000/api/prioritas/${this.form.prioritas_id}`, this.form)
        this.$router.push('/admin/prioritas')
      } catch (error) {
        console.error(error.response?.data || error)
        alert('Gagal memperbarui prioritas!')
      }
    }
  }
}
</script>
