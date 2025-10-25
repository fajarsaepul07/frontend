<template>
  <div class="container">
    <h2>Daftar Event</h2>
    <router-link to="/admin/event/create" class="btn btn-success mb-3">Tambah Event</router-link>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Event</th>
          <th>Lokasi</th>
          <th>Area</th>
          <th>Tanggal Mulai</th>
          <th>Tanggal Selesai</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in events" :key="e.event_id">
          <td>{{ e.event_id }}</td>
          <td>{{ e.nama_event }}</td>
          <td>{{ e.lokasi }}</td>
          <td>{{ e.area }}</td>
          <td>{{ e.tanggal_mulai }}</td>
          <td>{{ e.tanggal_selesai }}</td>
          <td>
            <router-link :to="`/admin/event/update/${e.event_id}`" class="btn btn-primary btn-sm">Edit</router-link>
            <button @click="hapusEvent(e.event_id)" class="btn btn-danger btn-sm">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="error" class="text-danger">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventIndex',
  data() {
    return {
      events: [],
      error: ''
    }
  },
  methods: {
    fetchEvents() {
      axios.get('http://localhost:8000/api/events')
        .then(res => this.events = res.data.data || [])
        .catch(err => this.error = err.response?.data?.message || 'Gagal mengambil data event')
    },
    hapusEvent(id) {
      if (!id) return
      if (confirm('Yakin ingin menghapus event ini?')) {
        axios.delete(`http://localhost:8000/api/events/${id}`)
          .then(() => this.fetchEvents())
          .catch(err => this.error = err.response?.data?.message || 'Gagal menghapus event')
      }
    }
  },
  mounted() {
    this.fetchEvents()
  }
}
</script>

<style scoped>
.container { padding: 20px; }
.table { width: 100%; }
.btn { margin-right: 5px; }
</style>
