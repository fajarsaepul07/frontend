<template>
  <div class="container">
    <h2>Create New Ticket Status</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nama_status">Status Name</label>
        <input v-model="form.nama_status" type="text" class="form-control" id="nama_status" required>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!form.nama_status.trim()">Submit</button>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StatusCreate',
  data() {
    return {
      form: {
        nama_status: ''
      },
      error: ''
    };
  },
  methods: {
    async submitForm() {
      this.error = '';
      this.form.nama_status = this.form.nama_status.trim();
      if (!this.form.nama_status) {
        this.error = 'Status name is required';
        return;
      }
      try {
        const response = await axios.post('/tiket-statuses', this.form, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Success:', response.data);
        this.$router.push('/admin/status');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        this.error = error.response?.data?.message || 'Failed to create status';
      }
    }
  }
};
</script>

<style scoped>
.container { padding: 20px; }
.form-group { margin-bottom: 15px; }
</style>