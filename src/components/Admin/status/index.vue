<template>
  <div class="container">
    <h2>Ticket Status List</h2>
    <router-link to="/status/create" class="btn btn-primary mb-3">Create New Status</router-link>
    <table class="table" v-if="statuses.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="status in statuses" :key="status.status_id">
          <td>{{ status.status_id }}</td>
          <td>{{ status.nama_status }}</td>
          <td>
            <!-- GANTI status.id MENJADI status.status_id -->
            <router-link :to="`/status/update/${status.status_id}`" class="btn btn-warning btn-sm">Edit</router-link>
            <button @click="deleteStatus(status.status_id)" class="btn btn-danger btn-sm ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">No status found. <a href="/status/create">Create one</a></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StatusIndex',
  data() {
    return {
      statuses: []
    };
  },
  created() {
    this.fetchStatuses();
  },
  methods: {
    async fetchStatuses() {
      try {
        const response = await axios.get('/tiket-statuses');
        console.log('Statuses response:', response.data.data); // Debug: lihat struktur data
        this.statuses = response.data.data;
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    },
    async deleteStatus(id) {
      if (confirm('Are you sure you want to delete this status?')) {
        try {
          await axios.delete(`/tiket-statuses/${id}`);
          this.fetchStatuses();
        } catch (error) {
          console.error('Error deleting status:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.container { padding: 20px; }
.table { margin-top: 20px; }
.ml-2 { margin-left: 0.5rem; }
</style>