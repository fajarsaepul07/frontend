<template>
  <div class="container">
    <h2>Ticket List</h2>
    <router-link to="/tiket/create" class="btn btn-primary mb-3">Create New Ticket</router-link>
    <div class="mb-3">
      <select v-model="filters.status_id" @change="fetchTickets" class="form-control">
        <option value="">All Statuses</option>
        <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">{{ status.nama_status }}</option>
      </select>
      <select v-model="filters.kategori_id" @change="fetchTickets" class="form-control mt-2">
        <option value="">All Categories</option>
        <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">{{ kategori.nama_kategori }}</option>
      </select>
      <select v-model="filters.prioritas_id" @change="fetchTickets" class="form-control mt-2">
        <option value="">All Priorities</option>
        <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">{{ priority.nama_prioritas }}</option>
      </select>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Kode Tiket</th>
          <th>Judul</th>
          <th>Event</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.kode_tiket }}</td>
          <td>{{ ticket.judul }}</td>
          <td>{{ ticket.event ? ticket.event.nama_event : 'N/A' }}</td>
          <td>{{ ticket.status ? ticket.status.nama_status : 'N/A' }}</td>
          <td>{{ ticket.priorities ? ticket.priorities.nama_prioritas : 'N/A' }}</td>
          <td>
            <router-link :to="`/tiket/update/${ticket.id}`" class="btn btn-warning btn-sm">Edit</router-link>
            <button @click="deleteTicket(ticket.id)" class="btn btn-danger btn-sm ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TicketIndex',
  data() {
    return {
      tickets: [],
      statuses: [],
      kategoris: [],
      priorities: [],
      filters: {
        status_id: '',
        kategori_id: '',
        prioritas_id: ''
      }
    };
  },
  created() {
    this.fetchTickets();
    this.fetchStatuses();
    this.fetchKategoris();
    this.fetchPriorities();
  },
  methods: {
    async fetchTickets() {
      const params = { ...this.filters };
      const response = await axios.get('/tikets', { params });
      console.log(response.body);
      
      this.tickets = response.data.data;
    },
    async fetchStatuses() {
      const response = await axios.get('/tiket-statuses');
      this.statuses = response.data.data;
    },
    async fetchKategoris() {
      const response = await axios.get('/kategoris');
      this.kategoris = response.data.data;
    },
    async fetchPriorities() {
      const response = await axios.get('/priorities');
      this.priorities = response.data.data;
    },
    async deleteTicket(id) {
      if (confirm('Are you sure you want to delete this ticket?')) {
        try {
          await axios.delete(`/tikets/${id}`);
          this.fetchTickets();
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.table {
  margin-top: 20px;
}
.form-control {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
}
</style>