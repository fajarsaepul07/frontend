<template>
  <div class="container">
    <h2>Tambah Event Baru</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nama_event">Nama Event</label>
        <input v-model="form.nama_event" type="text" class="form-control" id="nama_event" required>
      </div>

      <div class="form-group">
        <label for="lokasi">Lokasi</label>
        <input v-model="form.lokasi" type="text" class="form-control" id="lokasi" required>
      </div>

      <div class="form-group">
        <label for="area">Area</label>
        <input v-model="form.area" type="text" class="form-control" id="area" required>
      </div>

      <div class="form-group">
        <label for="tanggal_mulai">Tanggal Mulai</label>
        <input v-model="form.tanggal_mulai" type="date" class="form-control" id="tanggal_mulai" required>
      </div>

      <div class="form-group">
        <label for="tanggal_selesai">Tanggal Selesai</label>
        <input v-model="form.tanggal_selesai" type="date" class="form-control" id="tanggal_selesai" required>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!form.nama_event.trim()">Simpan</button>
      <router-link to="/admin/event" class="btn btn-secondary ms-2">Batal</router-link>

      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventCreate',
  data() {
    return {
      form: {
        nama_event: '',
        lokasi: '',
        area: '',
        tanggal_mulai: '',
        tanggal_selesai: ''
      },
      error: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:8000/api/events', this.form)
        this.$router.push('/admin/event')
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal membuat event'
      }
    }
  }
}
</script>

<style scoped>
.container { padding: 20px; }
.form-group { margin-bottom: 15px; }
</style>
