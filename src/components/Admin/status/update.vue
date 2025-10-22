<template>
  <div class="container">
    <h2>Update Ticket Status</h2>
    <div v-if="error && !loading" class="text-danger mb-3">{{ error }}</div>
    <form @submit.prevent="submitForm" v-else-if="!loading">
      <div class="form-group">
        <label for="nama_status">Status Name</label>
        <input v-model="form.nama_status" type="text" class="form-control" id="nama_status" required>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!form.nama_status.trim()">Update</button>
    </form>
    <div v-if="loading" class="text-info">Loading...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StatusUpdate',
  data() {
    return {
      form: {
        nama_status: ''
      },
      error: '',
      loading: false
    };
  },
  created() {
    this.fetchStatus();
  },
  methods: {
    async fetchStatus() {
      this.loading = true;
      const id = this.$route.params.id;
      if (!id || id === 'undefined' || isNaN(parseInt(id))) {
        this.error = 'Invalid or missing status ID. Please select a valid status to edit.';
        this.loading = false;
        return;
      }
      try {
        const response = await axios.get(`/tiket-statuses/${id}`);
        this.form.nama_status = response.data.data.nama_status;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load status data';
        console.error('Fetch error:', error);
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      this.error = '';
      this.loading = true;
      this.form.nama_status = this.form.nama_status.trim();
      if (!this.form.nama_status) {
        this.error = 'Status name is required';
        this.loading = false;
        return;
      }
      const id = this.$route.params.id;
      if (!id || id === 'undefined' || isNaN(parseInt(id))) {
        this.error = 'Invalid or missing status ID.';
        this.loading = false;
        return;
      }
      try {
        const response = await axios.put(`/tiket-statuses/${id}`, this.form, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Success:', response.data);
        this.$router.push('/status');
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update status';
        console.error('Update error:', error.response ? error.response.data : error.message);
      } finally {
        this.loading = false;
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