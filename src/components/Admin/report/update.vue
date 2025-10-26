<template>
  <div class="container mt-4">
    <h1 class="display-6" v-if="ticket.id">Update Tiket #{{ ticket.id }}</h1>
    <h1 class="display-6" v-else>Loading...</h1>
    <p class="text-muted">Edit detail tiket dan status</p>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <form v-if="ticket.id" @submit.prevent="updateTicket">
      <div class="mb-3">
        <label class="form-label">Judul</label>
        <input type="text" class="form-control" v-model="ticket.judul" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Kategori</label>
        <select class="form-select" v-model="ticket.kategori" required>
          <option value="Teknis">Teknis</option>
          <option value="Logistik">Logistik</option>
          <option value="Registrasi">Registrasi</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Status</label>
        <select class="form-select" v-model="ticket.status" required>
          <option value="Baru">Baru</option>
          <option value="Dalam Proses">Dalam Proses</option>
          <option value="Menunggu Respon">Menunggu Respon</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Prioritas</label>
        <select class="form-select" v-model="ticket.prioritas" required>
          <option value="rendah">Rendah</option>
          <option value="sedang">Sedang</option>
          <option value="tinggi">Tinggi</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Deskripsi</label>
        <textarea class="form-control" v-model="ticket.deskripsi" rows="4" required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Lampiran (opsional)</label>
        <input type="file" class="form-control" @change="handleFileUpload" />
        <small v-if="ticket.lampiran">
          Lampiran saat ini:
          <a :href="ticket.lampiran" target="_blank">Lihat File</a>
        </small>
      </div>

      <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
      <button type="button" class="btn btn-secondary ms-2" @click="$router.go(-1)">
        Batal
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ticket: {
        id: null,
        judul: "",
        kategori: "",
        status: "",
        prioritas: "",
        deskripsi: "",
        lampiran: null,
        file: null,
      },
      errorMessage: null,
    };
  },

  async mounted() {
    // Cek peran admin
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Anda harus login sebagai admin';
      this.$router.push('/login');
      return;
    }

    // Asumsi token berisi informasi peran dalam format JWT
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'admin') {
        this.errorMessage = 'Akses ditolak: Hanya admin yang dapat mengedit laporan';
        this.$router.push('/forbidden');
        return;
      }
    } catch (e) {
      this.errorMessage = 'Token tidak valid';
      this.$router.push('/login');
      return;
    }

    await this.fetchTicket();
  },

  methods: {
    async fetchTicket() {
      try {
        const response = await axios.get(`/reports/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Data laporan:', response.data);
        this.ticket = { ...response.data.data, file: null };
      } catch (error) {
        console.error('Error memuat laporan:', error.response || error);
        this.errorMessage = error.response?.data?.message || 'Gagal memuat data laporan';
        this.$router.go(-1);
      }
    },

    handleFileUpload(event) {
      this.ticket.file = event.target.files[0];
    },

    async updateTicket() {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("judul", this.ticket.judul);
      formData.append("kategori", this.ticket.kategori);
      formData.append("status", this.ticket.status);
      formData.append("prioritas", this.ticket.prioritas);
      formData.append("deskripsi", this.ticket.deskripsi);

      if (this.ticket.file) {
        formData.append("lampiran", this.ticket.file);
      }

      try {
        await axios.post(`/reports/${this.ticket.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        alert("Laporan berhasil diperbarui!");
        this.$router.push("/admin/report");
      } catch (error) {
        console.error('Error memperbarui laporan:', error.response || error);
        alert(
          "Gagal memperbarui laporan: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 800px;
}
</style>