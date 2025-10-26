<template>
  <div class="container-fluid mt-4">
    <!-- Header -->
    <div class="row mb-4">
      <div class="col">
        <h1 class="display-6">Laporan & Analitik</h1>
        <p class="text-muted">Dashboard performa helpdesk dan evaluasi event</p>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="exportReport">
          <i class="bi bi-download"></i> Export Report
        </button>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <ul class="nav nav-tabs mb-4" role="tablist">
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'overview' }"
          @click="setActiveTab('overview')"
        >
          Overview
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link"
          :class="{ active: activeTab === 'tickets' }"
          @click="setActiveTab('tickets')"
        >
          Detail Tiket
        </button>
      </li>
    </ul>

    <!-- TAB 1: OVERVIEW -->
    <div v-if="activeTab === 'overview'" class="tab-content">
      <!-- Filter & Date Range -->
      <div class="row mb-4">
        <div class="col-md-3">
          <label class="form-label">Dari Tanggal</label>
          <input type="date" class="form-control" v-model="dateFrom" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Sampai Tanggal</label>
          <input type="date" class="form-control" v-model="dateTo" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Event</label>
          <select class="form-select" v-model="selectedEvent">
            <option value="">Semua Event</option>
            <option value="event1">Event Seminar IT 2025</option>
            <option value="event2">Workshop Frontend</option>
          </select>
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <button class="btn btn-outline-primary w-100" @click="applyFilter">
            <i class="bi bi-funnel"></i> Filter
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h6 class="card-title">Total Tiket Masuk</h6>
              <h2 class="mb-2">{{ kpiData.totalTickets }}</h2>
              <small>↑ 12% dari periode sebelumnya</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Distribusi Tiket per Kategori</h6>
            </div>
            <div class="card-body">
              <canvas ref="categoryChart" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: DETAIL TIKET -->
    <div v-if="activeTab === 'tickets'" class="tab-content">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Dibuat</th>
              <th>Diperbarui</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in detailTickets" :key="ticket.id">
              <td><strong>#{{ ticket.id }}</strong></td>
              <td>{{ ticket.judul }}</td>
              <td>{{ ticket.kategori }}</td>
              <td><span :class="getStatusClass(ticket.status)" class="badge">{{ ticket.status }}</span></td>
              <td><span :class="getPriorityClass(ticket.prioritas)" class="badge">{{ ticket.prioritas }}</span></td>
              <td>{{ formatDate(ticket.created_at) }}</td>
              <td>{{ formatDate(ticket.updated_at) || '-' }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary" @click="openTicket(ticket)">Detail</button>
                <button class="btn btn-sm btn-outline-secondary ms-1" @click="editTicket(ticket.id)" :disabled="!isAdmin">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js/auto'
import { toRaw } from 'vue'

export default {
  data() {
    return {
      activeTab: 'overview',
      dateFrom: '',
      dateTo: '',
      selectedEvent: '',
      kpiData: {
        totalTickets: 0,
        completedTickets: 0,
        avgResponseTime: '0 jam',
        clientSatisfaction: 0
      },
      detailTickets: [],
      charts: {},
      isAdmin: false
    }
  },
  mounted() {
    this.checkAdminRole()
    this.fetchReports()
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
      if (tab === 'overview' && this.charts.category) {
        this.updateCharts()
      }
    },

    checkAdminRole() {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Tidak ada token, melewati pemeriksaan role.')
        this.isAdmin = false
        return
      }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        this.isAdmin = payload.role === 'admin'
      } catch (e) {
        console.warn('Token bukan format JWT. Melewati pemeriksaan role.')
        this.isAdmin = false
      }
    },

    async fetchReports() {
      try {
        const response = await axios.get('/admin/reports', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        this.detailTickets = response.data.data || []
        this.kpiData.totalTickets = this.detailTickets.length
        this.kpiData.completedTickets = this.detailTickets.filter(t => t.status === 'Selesai').length
        this.initCharts()
      } catch (error) {
        console.error('Gagal memuat laporan:', error)
        alert('Gagal memuat laporan: ' + (error.response?.data?.message || error.message))
      }
    },

    initCharts() {
      const ctx = this.$refs.categoryChart?.getContext('2d')
      if (!ctx) return

      // Hapus chart lama jika ada
      if (this.charts.category) {
        this.charts.category.destroy()
      }

      const categoryCounts = this.getCategoryCounts()
      const labels = Object.keys(categoryCounts)
      const data = Object.values(categoryCounts)

      this.charts.category = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Jumlah Tiket',
            data,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    },

    updateCharts() {
      if (!this.charts.category) return
      const categoryCounts = this.getCategoryCounts()
      const labels = Object.keys(categoryCounts)
      const data = Object.values(categoryCounts)

      // Hindari update berulang tanpa perubahan data
      const sameData =
        JSON.stringify(this.charts.category.data.labels) === JSON.stringify(labels) &&
        JSON.stringify(this.charts.category.data.datasets[0].data) === JSON.stringify(data)

      if (sameData) return

      this.charts.category.data.labels = labels
      this.charts.category.data.datasets[0].data = data
      this.charts.category.update()
    },

    getCategoryCounts() {
      const rawTickets = JSON.parse(JSON.stringify(toRaw(this.detailTickets)))
      return rawTickets.reduce((acc, t) => {
        acc[t.kategori] = (acc[t.kategori] || 0) + 1
        return acc
      }, {})
    },

    getStatusClass(status) {
      const classes = {
        'Baru': 'bg-info',
        'Dalam Proses': 'bg-warning',
        'Menunggu Respon': 'bg-secondary',
        'Selesai': 'bg-success'
      }
      return classes[status] || 'bg-secondary'
    },

    getPriorityClass(priority) {
      const classes = {
        'urgent': 'bg-danger',
        'tinggi': 'bg-warning',
        'sedang': 'bg-info',
        'rendah': 'bg-success'
      }
      return classes[priority] || 'bg-secondary'
    },

    formatDate(dateString) {
      if (!dateString) return '-'
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    },

    applyFilter() {
      alert(`Filter diterapkan:\nDari: ${this.dateFrom}\nSampai: ${this.dateTo}\nEvent: ${this.selectedEvent || 'Semua'}`)
    },

    exportReport() {
      alert('Laporan diexport sebagai PDF')
    },

    openTicket(ticket) {
      console.log('Detail tiket:', ticket)
    },

    editTicket(id) {
      if (!this.isAdmin) {
        alert('Hanya admin yang dapat mengedit laporan')
        this.$router.push('/forbidden')
        return
      }
      if (!id) {
        alert('ID tiket tidak valid')
        return
      }
      console.log('Mengedit laporan dengan ID:', id)
      this.$router.push(`/admin/report/update/${id}`)
    }
  }
}
</script>

<style scoped>
.nav-link {
  cursor: pointer;
  color: #6c757d;
  border-bottom: 2px solid transparent;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.nav-link.active {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1.5rem;
}

.card-header {
  border-bottom: 1px solid #dee2e6;
}

.table-responsive {
  border-radius: 0.25rem;
}

canvas {
  max-height: 300px;
}
</style>
