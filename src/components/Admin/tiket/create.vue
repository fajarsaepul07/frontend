<template>
  <div class="container mt-4">
    <h2 class="mb-4">🎟️ Create New Ticket</h2>

    <!-- Loading / Error Info -->
    <div v-if="loading" class="alert alert-info">Loading data...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form @submit.prevent="submitForm" v-if="!loading">
      <!-- User ID (readonly - dari localStorage) -->
      <div class="form-group mb-3">
        <label for="user_id" class="form-label">User ID</label>
        <input v-model="form.user_id" type="text" class="form-control" id="user_id" readonly />
      </div>

      <!-- Event -->
      <div class="form-group mb-3">
        <label for="event_id" class="form-label">Event <span class="text-danger">*</span></label>
        <select v-model="form.event_id" class="form-select" id="event_id" required>
          <option value="">-- Pilih Event --</option>
          <option
            v-for="event in events"
            :key="event.event_id"
            :value="event.event_id"
          >
            {{ event.nama_event }}
          </option>
        </select>
      </div>

      <!-- Kategoris -->
      <div class="form-group mb-3">
        <label for="kategori_id" class="form-label">Kategoris <span class="text-danger">*</span></label>
        <select v-model="form.kategori_id" class="form-select" id="kategori_id" required>
          <option value="">-- Pilih Kategoris --</option>
          <option v-for="kategoris in kategoris" :key="kategoris.kategori_id" :value="kategoris.kategori_id">
            {{ kategoris.nama_kategori }}
          </option>
        </select>
      </div>

      <!-- Status -->
      <div class="form-group mb-3">
        <label for="status_id" class="form-label">Status <span class="text-danger">*</span></label>
        <select v-model="form.status_id" class="form-select" id="status_id" required>
          <option value="">-- Pilih Status --</option>
          <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
            {{ status.nama_status }}
          </option>
        </select>
      </div>

      <!-- Prioritas -->
      <div class="form-group mb-3">
        <label for="prioritas_id" class="form-label">Prioritas <span class="text-danger">*</span></label>
        <select v-model="form.prioritas_id" class="form-select" id="prioritas_id" required>
          <option value="">-- Pilih Prioritas --</option>
          <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
            {{ priority.nama_prioritas }}
          </option>
        </select>
      </div>

      <!-- Judul -->
      <div class="form-group mb-3">
        <label for="judul" class="form-label">Judul <span class="text-danger">*</span></label>
        <input 
          v-model="form.judul" 
          type="text" 
          class="form-control" 
          id="judul" 
          placeholder="Masukkan judul tiket"
          maxlength="255"
          required 
        />
        <small class="text-muted">Maksimal 255 karakter</small>
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

      <!-- Submit Buttons -->
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          <i class="bi bi-check-circle me-1"></i>
          {{ submitting ? "Menyimpan..." : "Buat Tiket" }}
        </button>
        <router-link to="/tiket" class="btn btn-secondary">
          <i class="bi bi-x-circle me-1"></i>
          Batal
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api'

export default {
  name: "CreateTicket",

  data() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return {
      form: {
        user_id: storedUser?.user_id || storedUser?.id || "",
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
      this.error = "Gagal memuat data dropdown. Silakan coba lagi.";
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
        if (!this.form.user_id) {
          throw new Error("User ID tidak ditemukan. Silakan login ulang.");
        }

        const res = await axios.post("/tikets", this.form);
        
        if (res.data.status) {
          alert("✅ Tiket berhasil dibuat!");
          this.$router.push("/tiket");
        } else {
          throw new Error(res.data.message || "Gagal membuat tiket");
        }
      } catch (err) {
        console.error("Submit error:", err.response?.data || err);
        
        if (err.response?.data?.errors) {
          const errors = err.response.data.errors;
          const errorMessages = Object.values(errors).flat().join(", ");
          this.error = `Validasi gagal: ${errorMessages}`;
        } else if (err.response?.data?.message) {
          this.error = err.response.data.message;
        } else {
          this.error = err.message || "Gagal membuat tiket. Silakan periksa input Anda.";
        }
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
}

.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

button {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 500;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.text-danger {
  font-size: 0.875rem;
}

.alert {
  border-radius: 8px;
}

h2 {
  color: #212529;
  font-weight: 700;
}
</style>