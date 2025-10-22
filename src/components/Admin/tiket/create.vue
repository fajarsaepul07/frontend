<template>
  <div class="container">
    <h2>Create New Ticket</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="user_id">User ID</label>
        <input v-model="form.user_id" type="text" class="form-control" id="user_id" required>
      </div>
      <div class="form-group">
        <label for="event_id">Event ID</label>
        <select v-model="form.event_id" class="form-control" id="event_id" required>
          <option v-for="event in events" :key="event.event_id" :value="event.event_id">{{ event.nama_event }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="kategori_id">Category ID</label>
        <select v-model="form.kategori_id" class="form-control" id="kategori_id" required>
          <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">{{ kategori.nama_kategori }}</option>
        </select>
      </div>
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
        <label for="judul">Title</label>
        <input v-model="form.judul" type="text" class="form-control" id="judul" required>
      </div>
      <div class="form-group">
        <label for="deskripsi">Description</label>
        <textarea v-model="form.deskripsi" class="form-control" id="deskripsi"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateTicket',
  data() {
    return {
      form: {
        user_id: '',
        event_id: '',
        kategori_id: '',
        status_id: '',
        prioritas_id: '',
        judul: '',
        deskripsi: ''
      },
      events: [],
      statuses: [],
      kategoris: [],
      priorities: []
    };
  },
  created() {
    this.fetchEvents();
    this.fetchStatuses();
    this.fetchKategoris();
    this.fetchPriorities();
  },
  methods: {
    async fetchEvents() {
      const response = await axios.get('/api/events');
      this.events = response.data.data;
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
      try {
        await axios.post('/api/tickets', this.form);
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