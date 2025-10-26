<template>
  <div class="container">
    <h2>Update Ticket</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="status_id">Status ID</label>
        <select v-model="form.status_id" class="form-control" id="status_id" required>
          <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">{{ status.nama_status }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="prioritas_id">Priority ID</label>
        <select v-model="form.prioritas_id" class="form-control" id="prioritas_id" required>
          <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">{{ priority.nama_prioritas }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="kategori_id">Category ID</label>
        <select v-model="form.kategori_id" class="form-control" id="kategori_id" required>
          <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">{{ kategori.nama_kategori }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="assigned_to">Assigned To</label>
        <input v-model="form.assigned_to" type="text" class="form-control" id="assigned_to">
      </div>
      <div class="form-group">
        <label for="waktu_selesai">Completion Time</label>
        <input v-model="form.waktu_selesai" type="datetime-local" class="form-control" id="waktu_selesai">
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateTicket',
  data() {
    return {
      form: {
        status_id: '',
        prioritas_id: '',
        kategori_id: '',
        assigned_to: '',
        waktu_selesai: ''
      },
      statuses: [],
      kategoris: [],
      priorities: []
    };
  },
  created() {
    this.fetchTicket();
    this.fetchStatuses();
    this.fetchKategoris();
    this.fetchPriorities();
  },
  methods: {
    async fetchTicket() {
      const id = this.$route.params.id;
      const response = await axios.get(`/api/tikets/${id}`);
      this.form = {
        status_id: response.data.data.status_id,
        prioritas_id: response.data.data.prioritas_id,
        kategori_id: response.data.data.kategori_id,
        assigned_to: response.data.data.assigned_to || '',
        waktu_selesai: response.data.data.waktu_selesai || ''
      };
    },
    async fetchStatuses() {
      const response = await axios.get('/api/tiket-statuses');
      this.statuses = response.data.data;
    },
    async fetchKategoris() {
      const response = await axios.get('/api/kategoris');
      this.kategoris = response.data.data;
    },
    async fetchPriorities() {
      const response = await axios.get('/api/priorities');
      this.priorities = response.data.data;
    },
    async submitForm() {
      const id = this.$route.params.id;
      try {
        await axios.put(`/api/tikets/${id}`, this.form);
        this.$router.push('/tiket');
      } catch (error) {
        console.error(error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
</style>