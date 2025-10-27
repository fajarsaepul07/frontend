<template>
  <div class="container mt-4">
    <h2 class="mb-4">🎟️ Create New Ticket</h2>

    <!-- Loading / Error Info -->
    <div v-if="loading" class="alert alert-info">Loading data...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form @submit.prevent="submitForm" v-if="!loading">
      <!-- User ID -->
      <div class="form-group mb-3">
        <label for="user_id" class="form-label">User ID</label>
        <input v-model="form.user_id" type="text" class="form-control" id="user_id" readonly />
      </div>

      <!-- Event -->
      <div class="form-group mb-3">
        <label for="event_id" class="form-label">Event</label>
<select v-model="form.event_id" class="form-select" id="event_id" required>
  <option value="">-- Select Event --</option>
  <option
    v-for="event in events"
    :key="event.event_id"
    :value="event.event_id"
  >
    {{ event.nama_event }}
  </option>
</select>
      </div>

      <!-- Kategori -->
      <div class="form-group mb-3">
        <label for="kategori_id" class="form-label">Kategori</label>
        <select v-model="form.kategori_id" class="form-select" id="kategori_id" required>
          <option value="">-- Select Category --</option>
          <option v-for="kategori in kategoris" :key="kategori.kategori_id" :value="kategori.kategori_id">
            {{ kategori.nama_kategori }}
          </option>
        </select>
      </div>

      <!-- Status -->
      <div class="form-group mb-3">
        <label for="status_id" class="form-label">Status</label>
        <select v-model="form.status_id" class="form-select" id="status_id" required>
          <option value="">-- Select Status --</option>
          <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
            {{ status.nama_status }}
          </option>
        </select>
      </div>

      <!-- Prioritas -->
      <div class="form-group mb-3">
        <label for="prioritas_id" class="form-label">Prioritas</label>
        <select v-model="form.prioritas_id" class="form-select" id="prioritas_id" required>
          <option value="">-- Select Priority --</option>
          <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
            {{ priority.nama_prioritas }}
          </option>
        </select>
      </div>

      <!-- Judul -->
      <div class="form-group mb-3">
        <label for="judul" class="form-label">Judul</label>
        <input v-model="form.judul" type="text" class="form-control" id="judul" required />
      </div>

      <!-- Deskripsi -->
      <div class="form-group mb-4">
        <label for="deskripsi" class="form-label">Deskripsi</label>
        <textarea
          v-model="form.deskripsi"
          class="form-control"
          id="deskripsi"
          rows="4"
          placeholder="Tuliskan deskripsi masalah atau permintaan..."
        ></textarea>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary w-100" :disabled="submitting">
        {{ submitting ? "Submitting..." : "Submit Ticket" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTicket",

  data() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return {
      form: {
        user_id: storedUser?.id || storedUser?.user_id || "",
        event_id: "",
        kategori_id: "",
        status_id: "",
        prioritas_id: "",
        judul: "",
        deskripsi: "",
      },
      events: [],
      statuses: [],
      kategoris: [],
      priorities: [],
      loading: false,
      submitting: false,
      error: "",
    };
  },

  async created() {
    this.loading = true;
    try {
      await Promise.all([
        this.fetchEvents(),
        this.fetchStatuses(),
        this.fetchKategoris(),
        this.fetchPriorities(),
      ]);
    } catch (err) {
      console.error("Error loading data:", err);
      this.error = "Failed to load dropdown data. Please try again.";
    } finally {
      this.loading = false;
    }
  },

  methods: {
    async fetchEvents() {
      const res = await axios.get("/events");
      this.events = res.data.data || [];
    },
    async fetchStatuses() {
      const res = await axios.get("/tiket-statuses");
      this.statuses = res.data.data || [];
    },
    async fetchKategoris() {
      const res = await axios.get("/kategoris");
      this.kategoris = res.data.data || [];
    },
    async fetchPriorities() {
      const res = await axios.get("/prioritas");
      this.priorities = res.data.data || [];
    },
    async submitForm() {
      this.submitting = true;
      this.error = "";
      try {
        await axios.post("/tikets", this.form);
        alert("✅ Ticket successfully created!");
        this.$router.push("/admin/tikets");
      } catch (err) {
        console.error("Submit error:", err.response?.data || err);
        this.error = "Failed to create ticket. Please check your input.";
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.form-label {
  font-weight: 600;
}
button {
  transition: 0.3s;
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
