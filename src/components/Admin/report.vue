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
          class="nav-link active" 
          @click="activeTab = 'overview'"
          :class="{ active: activeTab === 'overview' }"
        >
          Overview
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link"
          @click="activeTab = 'tickets'"
          :class="{ active: activeTab === 'tickets' }"
        >
          Detail Tiket
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link"
          @click="activeTab = 'sla'"
          :class="{ active: activeTab === 'sla' }"
        >
          SLA & Performance
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button 
          class="nav-link"
          @click="activeTab = 'vendor'"
          :class="{ active: activeTab === 'vendor' }"
        >
          Performa Vendor
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
            <option value="event3">Conference Startup</option>
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
        <div class="col-md-3">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h6 class="card-title">Tiket Selesai</h6>
              <h2 class="mb-2">{{ kpiData.completedTickets }}</h2>
              <small>{{ ((kpiData.completedTickets / kpiData.totalTickets) * 100).toFixed(1) }}% resolution rate</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-dark">
            <div class="card-body">
              <h6 class="card-title">Waktu Respon Rata-rata</h6>
              <h2 class="mb-2">{{ kpiData.avgResponseTime }}</h2>
              <small>SLA: 2 jam</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-info text-white">
            <div class="card-body">
              <h6 class="card-title">Kepuasan Client</h6>
              <h2 class="mb-2">{{ kpiData.clientSatisfaction }}%</h2>
              <small>Berdasarkan feedback</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Distribusi Tiket per Kategori</h6>
            </div>
            <div class="card-body">
              <canvas ref="categoryChart" height="80"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Distribusi Prioritas</h6>
            </div>
            <div class="card-body">
              <canvas ref="priorityChart" height="80"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Distribution -->
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Tren Tiket Per Hari</h6>
            </div>
            <div class="card-body">
              <canvas ref="trendChart" height="100"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: DETAIL TIKET -->
    <div v-if="activeTab === 'tickets'" class="tab-content">
      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>ID Tiket</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Prioritas</th>
                <th>Dibuat</th>
                <th>Selesai</th>
                <th>Durasi</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in detailTickets" :key="ticket.id">
                <td><strong>#{{ ticket.id }}</strong></td>
                <td>{{ ticket.title }}</td>
                <td>
                  <span class="badge bg-secondary">{{ ticket.category }}</span>
                </td>
                <td>
                  <span class="badge" :class="getStatusClass(ticket.status)">
                    {{ ticket.status }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="getPriorityClass(ticket.priority)">
                    {{ ticket.priority }}
                  </span>
                </td>
                <td>{{ formatDate(ticket.created) }}</td>
                <td>{{ ticket.resolved ? formatDate(ticket.resolved) : '-' }}</td>
                <td>
                  <small>{{ calculateDuration(ticket.created, ticket.resolved) }}</small>
                </td>
                <td>{{ ticket.vendor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 3: SLA & PERFORMANCE -->
    <div v-if="activeTab === 'sla'" class="tab-content">
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card border-success">
            <div class="card-body">
              <h6 class="card-title">SLA Achievement</h6>
              <h3 class="text-success mb-2">{{ slaData.achievement }}%</h3>
              <p class="text-muted mb-0">Target: 95%</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-warning">
            <div class="card-body">
              <h6 class="card-title">Response Time (Avg)</h6>
              <h3 class="text-warning mb-2">{{ slaData.avgResponseTime }}</h3>
              <p class="text-muted mb-0">SLA: 2 jam</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-info">
            <div class="card-body">
              <h6 class="card-title">Resolution Time (Avg)</h6>
              <h3 class="text-info mb-2">{{ slaData.avgResolutionTime }}</h3>
              <p class="text-muted mb-0">SLA: 8 jam</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header bg-light">
          <h6 class="mb-0">SLA Performance Detail</h6>
        </div>
        <div class="table-responsive">
          <table class="table table-sm mb-0">
            <thead class="table-light">
              <tr>
                <th>Metric</th>
                <th>Target</th>
                <th>Actual</th>
                <th>Status</th>
                <th>% Compliance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Response Time</strong></td>
                <td>2 jam</td>
                <td>{{ slaData.avgResponseTime }}</td>
                <td><span class="badge bg-success">PASS</span></td>
                <td><strong>98%</strong></td>
              </tr>
              <tr>
                <td><strong>Resolution Time</strong></td>
                <td>8 jam</td>
                <td>{{ slaData.avgResolutionTime }}</td>
                <td><span class="badge bg-success">PASS</span></td>
                <td><strong>96%</strong></td>
              </tr>
              <tr>
                <td><strong>First Contact Resolution</strong></td>
                <td>80%</td>
                <td>85%</td>
                <td><span class="badge bg-success">PASS</span></td>
                <td><strong>106%</strong></td>
              </tr>
              <tr>
                <td><strong>Customer Satisfaction</strong></td>
                <td>4.0/5.0</td>
                <td>4.2/5.0</td>
                <td><span class="badge bg-success">PASS</span></td>
                <td><strong>105%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 4: VENDOR PERFORMANCE -->
    <div v-if="activeTab === 'vendor'" class="tab-content">
      <div class="card">
        <div class="card-header bg-light">
          <h6 class="mb-0">Evaluasi Performa Vendor</h6>
        </div>
        <div class="table-responsive">
          <table class="table mb-0">
            <thead class="table-light">
              <tr>
                <th>Vendor</th>
                <th>Tiket Ditangani</th>
                <th>Selesai</th>
                <th>Pending</th>
                <th>Avg Response Time</th>
                <th>Avg Resolution</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vendor in vendorPerformance" :key="vendor.id">
                <td><strong>{{ vendor.name }}</strong></td>
                <td>{{ vendor.handled }}</td>
                <td><span class="badge bg-success">{{ vendor.completed }}</span></td>
                <td><span class="badge bg-warning">{{ vendor.pending }}</span></td>
                <td>{{ vendor.avgResponseTime }}</td>
                <td>{{ vendor.avgResolutionTime }}</td>
                <td>
                  <span class="stars">
                    <i class="bi bi-star-fill text-warning"></i>
                    <span class="ms-1">{{ vendor.rating }}/5.0</span>
                  </span>
                </td>
                <td>
                  <span 
                    class="badge"
                    :class="vendor.status === 'Excellent' ? 'bg-success' : vendor.status === 'Good' ? 'bg-info' : 'bg-warning'"
                  >
                    {{ vendor.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'Report',
  data() {
    return {
      activeTab: 'overview',
      dateFrom: '2025-09-01',
      dateTo: '2025-09-30',
      selectedEvent: '',
      
      kpiData: {
        totalTickets: 127,
        completedTickets: 118,
        avgResponseTime: '1.5 jam',
        clientSatisfaction: 92
      },

      slaData: {
        achievement: 97,
        avgResponseTime: '1 jam 30 menit',
        avgResolutionTime: '6 jam 45 menit'
      },

      detailTickets: [
        {
          id: 'TK001',
          title: 'Sound system tidak berfungsi',
          category: 'Teknis',
          status: 'Selesai',
          priority: 'Kritis',
          created: '2025-09-15T10:30:00',
          resolved: '2025-09-15T12:45:00',
          vendor: 'PT Sound Pro'
        },
        {
          id: 'TK002',
          title: 'Kursi tidak sesuai jumlah peserta',
          category: 'Logistik',
          status: 'Selesai',
          priority: 'Tinggi',
          created: '2025-09-16T08:00:00',
          resolved: '2025-09-16T11:30:00',
          vendor: 'PT Rental Mitra'
        },
        {
          id: 'TK003',
          title: 'Listrik mati di area VIP',
          category: 'Teknis',
          status: 'Selesai',
          priority: 'Kritis',
          created: '2025-09-16T14:20:00',
          resolved: '2025-09-16T16:00:00',
          vendor: 'PT Elektrik Jaya'
        },
        {
          id: 'TK004',
          title: 'Dekorasi panggung belum selesai',
          category: 'Logistik',
          status: 'Selesai',
          priority: 'Sedang',
          created: '2025-09-17T09:15:00',
          resolved: '2025-09-17T14:30:00',
          vendor: 'PT Dekorasi Indah'
        },
        {
          id: 'TK005',
          title: 'WiFi tidak stabil',
          category: 'Teknis',
          status: 'Selesai',
          priority: 'Sedang',
          created: '2025-09-17T11:00:00',
          resolved: '2025-09-17T14:30:00',
          vendor: 'PT Internet Plus'
        }
      ],

      vendorPerformance: [
        {
          id: 1,
          name: 'PT Sound Pro',
          handled: 28,
          completed: 27,
          pending: 1,
          avgResponseTime: '1 jam 15 menit',
          avgResolutionTime: '5 jam 30 menit',
          rating: 4.8,
          status: 'Excellent'
        },
        {
          id: 2,
          name: 'PT Rental Mitra',
          handled: 35,
          completed: 32,
          pending: 3,
          avgResponseTime: '1 jam 45 menit',
          avgResolutionTime: '7 jam',
          rating: 4.5,
          status: 'Excellent'
        },
        {
          id: 3,
          name: 'PT Elektrik Jaya',
          handled: 22,
          completed: 21,
          pending: 1,
          avgResponseTime: '2 jam',
          avgResolutionTime: '6 jam 15 menit',
          rating: 4.6,
          status: 'Excellent'
        },
        {
          id: 4,
          name: 'PT Dekorasi Indah',
          handled: 25,
          completed: 22,
          pending: 3,
          avgResponseTime: '2 jam 30 menit',
          avgResolutionTime: '8 jam',
          rating: 4.2,
          status: 'Good'
        },
        {
          id: 5,
          name: 'PT Internet Plus',
          handled: 17,
          completed: 16,
          pending: 1,
          avgResponseTime: '1 jam 30 menit',
          avgResolutionTime: '6 jam',
          rating: 4.7,
          status: 'Excellent'
        }
      ],

      charts: {
        category: null,
        priority: null,
        trend: null
      }
    }
  },

  mounted() {
    this.initCharts();
  },

  methods: {
    initCharts() {
      // Category Chart
      const categoryCtx = this.$refs.categoryChart?.getContext('2d');
      if (categoryCtx) {
        this.charts.category = new Chart(categoryCtx, {
          type: 'doughnut',
          data: {
            labels: ['Teknis', 'Logistik', 'Registrasi', 'Lainnya'],
            datasets: [{
              data: [45, 35, 28, 19],
              backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#6c757d']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      }

      // Priority Chart
      const priorityCtx = this.$refs.priorityChart?.getContext('2d');
      if (priorityCtx) {
        this.charts.priority = new Chart(priorityCtx, {
          type: 'doughnut',
          data: {
            labels: ['Kritis', 'Tinggi', 'Sedang', 'Rendah'],
            datasets: [{
              data: [25, 38, 42, 22],
              backgroundColor: ['#dc3545', '#fd7e14', '#0dcaf0', '#198754']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      }

      // Trend Chart
      const trendCtx = this.$refs.trendChart?.getContext('2d');
      if (trendCtx) {
        this.charts.trend = new Chart(trendCtx, {
          type: 'line',
          data: {
            labels: ['Sep 1', 'Sep 3', 'Sep 5', 'Sep 7', 'Sep 9', 'Sep 11', 'Sep 13', 'Sep 15', 'Sep 17', 'Sep 19', 'Sep 21', 'Sep 23', 'Sep 25', 'Sep 27', 'Sep 29'],
            datasets: [
              {
                label: 'Tiket Masuk',
                data: [8, 12, 10, 15, 14, 11, 13, 16, 12, 9, 14, 15, 10, 11, 8],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4
              },
              {
                label: 'Tiket Selesai',
                data: [7, 11, 9, 14, 13, 11, 12, 15, 12, 9, 13, 14, 10, 10, 8],
                borderColor: '#198754',
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 20
              }
            }
          }
        });
      }
    },

    getStatusClass(status) {
      const classes = {
        'Baru': 'bg-info',
        'Dalam Proses': 'bg-warning',
        'Menunggu Respon': 'bg-secondary',
        'Selesai': 'bg-success'
      };
      return classes[status] || 'bg-secondary';
    },

    getPriorityClass(priority) {
      const classes = {
        'Kritis': 'bg-danger',
        'Tinggi': 'bg-warning',
        'Sedang': 'bg-info',
        'Rendah': 'bg-success'
      };
      return classes[priority] || 'bg-secondary';
    },

    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    calculateDuration(created, resolved) {
      if (!resolved) return '-';
      const diff = new Date(resolved) - new Date(created);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    },

    applyFilter() {
      alert(`Filter diterapkan:\nDari: ${this.dateFrom}\nSampai: ${this.dateTo}\nEvent: ${this.selectedEvent || 'Semua'}`);
    },

    exportReport() {
      alert('Laporan diexport sebagai PDF');
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

.stars {
  display: inline-flex;
  align-items: center;
}

canvas {
  max-height: 300px;
}
</style>