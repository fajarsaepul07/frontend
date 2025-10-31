<template>
  <div class="user-tiket-wrapper">
    <!-- Navbar -->
    <Navbar 
      :current-page="'tiket'" 
      @show-page="handleShowPage" 
      @go-to-tiket="() => {}"
    />

    <div class="tiket-container">
      <!-- Header -->
      <div class="header-section">
        <div class="header-content">
          <h1>My Tickets</h1>
          <p>View and track your support tickets</p>
        </div>
      </div>

      <!-- Filter & Search -->
      <div class="filter-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search tickets by title, code, or description..."
            @input="filterTickets"
          />
        </div>
        
        <div class="filters">
          <select v-model="filterStatus" @change="filterTickets" class="filter-select">
            <option value="">All Status</option>
            <option v-for="status in statuses" :key="status.status_id" :value="status.status_id">
              {{ status.nama_status }}
            </option>
          </select>

          <select v-model="filterPriority" @change="filterTickets" class="filter-select">
            <option value="">All Priority</option>
            <option v-for="priority in priorities" :key="priority.prioritas_id" :value="priority.prioritas_id">
              {{ priority.nama_prioritas }}
            </option>
          </select>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: #e3f2fd;">📋</div>
          <div class="stat-info">
            <p class="stat-label">Total Tickets</p>
            <h3 class="stat-value">{{ totalTickets }}</h3>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #fff3e0;">⏳</div>
          <div class="stat-info">
            <p class="stat-label">In Progress</p>
            <h3 class="stat-value">{{ inProgressTickets }}</h3>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #e8f5e9;">✅</div>
          <div class="stat-info">
            <p class="stat-label">Completed</p>
            <h3 class="stat-value">{{ completedTickets }}</h3>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon" style="background: #ffebee;">🔥</div>
          <div class="stat-info">
            <p class="stat-label">High Priority</p>
            <h3 class="stat-value">{{ highPriorityTickets }}</h3>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading tickets...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{{ error }}</p>
        <button class="btn-retry" @click="fetchTickets">Try Again</button>
      </div>

      <!-- Tickets List -->
      <div v-else class="tickets-section">
        <div v-if="filteredTickets.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>No tickets found</h3>
          <p>{{ searchQuery ? 'Try adjusting your search or filters' : 'You haven\'t created any tickets yet' }}</p>
          <button class="btn-create" @click="createTicket">
            Create Your First Ticket
          </button>
        </div>

        <div v-else class="tickets-grid">
          <div 
            v-for="ticket in paginatedTickets" 
            :key="ticket.tiket_id"
            class="ticket-card"
            @click="viewTicketDetail(ticket)"
          >
            <!-- Card Header -->
            <div class="ticket-header">
              <span class="ticket-code">{{ ticket.kode_tiket }}</span>
              <span :class="['ticket-status', getStatusClass(ticket.status?.nama_status)]">
                {{ ticket.status?.nama_status || 'Unknown' }}
              </span>
            </div>

            <!-- Card Body -->
            <div class="ticket-body">
              <h3 class="ticket-title">{{ ticket.judul }}</h3>
              <p class="ticket-description">
                {{ truncateText(ticket.deskripsi, 100) }}
              </p>
            </div>

            <!-- Card Footer -->
            <div class="ticket-footer">
              <div class="ticket-meta">
                <span class="meta-item">
                  <i class="icon">📅</i>
                  {{ formatDate(ticket.waktu_dibuat) }}
                </span>
                <span class="meta-item">
                  <i class="icon">📂</i>
                  {{ ticket.kategori?.nama_kategori || 'N/A' }}
                </span>
              </div>
              
              <span :class="['priority-badge', getPriorityClass(ticket.prioritas?.nama_prioritas)]">
                {{ ticket.prioritas?.nama_prioritas || 'N/A' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredTickets.length > perPage" class="pagination">
          <button 
            class="page-btn" 
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </button>
          
          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              class="page-number"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="page-btn" 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Ticket Detail Modal -->
    <div v-if="showDetailModal" class="modal-overlay" @click.self="closeDetailModal">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2>Ticket Details</h2>
          <button class="btn-close" @click="closeDetailModal">✕</button>
        </div>
        
        <div class="modal-body" v-if="selectedTicket">
          <div class="detail-grid">
            <div class="detail-item">
              <label>Ticket Code</label>
              <p class="code-badge">{{ selectedTicket.kode_tiket }}</p>
            </div>
            
            <div class="detail-item">
              <label>Status</label>
              <p>
                <span :class="['ticket-status', getStatusClass(selectedTicket.status?.nama_status)]">
                  {{ selectedTicket.status?.nama_status }}
                </span>
              </p>
            </div>
            
            <div class="detail-item full-width">
              <label>Title</label>
              <p>{{ selectedTicket.judul }}</p>
            </div>
            
            <div class="detail-item full-width">
              <label>Description</label>
              <p class="description-text">{{ selectedTicket.deskripsi || 'No description provided' }}</p>
            </div>
            
            <div class="detail-item">
              <label>Category</label>
              <p>{{ selectedTicket.kategori?.nama_kategori || 'N/A' }}</p>
            </div>
            
            <div class="detail-item">
              <label>Priority</label>
              <p>
                <span :class="['priority-badge', getPriorityClass(selectedTicket.prioritas?.nama_prioritas)]">
                  {{ selectedTicket.prioritas?.nama_prioritas }}
                </span>
              </p>
            </div>
            
            <div class="detail-item">
              <label>Event</label>
              <p>{{ selectedTicket.event?.nama_event || 'N/A' }}</p>
            </div>
            
            <div class="detail-item">
              <label>Created Date</label>
              <p>{{ formatDateFull(selectedTicket.waktu_dibuat) }}</p>
            </div>
            
            <div class="detail-item" v-if="selectedTicket.waktu_selesai">
              <label>Completed Date</label>
              <p>{{ formatDateFull(selectedTicket.waktu_selesai) }}</p>
            </div>
            
            <div class="detail-item" v-if="selectedTicket.assigned_to">
              <label>Assigned To</label>
              <p>{{ selectedTicket.assigned_to }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

axios.defaults.baseURL = 'http://localhost:8000/api'

export default {
  name: 'UserTiket',
  
  components: {
    Navbar
  },

  data() {
    return {
      tickets: [],
      filteredTickets: [],
      statuses: [],
      priorities: [],
      loading: false,
      error: '',
      searchQuery: '',
      filterStatus: '',
      filterPriority: '',
      currentPage: 1,
      perPage: 9,
      showDetailModal: false,
      selectedTicket: null
    }
  },

  computed: {
    totalTickets() {
      return this.tickets.length
    },

    inProgressTickets() {
      return this.tickets.filter(t => t.status?.nama_status === 'Dalam Proses').length
    },

    completedTickets() {
      return this.tickets.filter(t => t.status?.nama_status === 'Selesai').length
    },

    highPriorityTickets() {
      return this.tickets.filter(t => 
        ['Tinggi', 'Kritis'].includes(t.prioritas?.nama_prioritas)
      ).length
    },

    totalPages() {
      return Math.ceil(this.filteredTickets.length / this.perPage) || 1
    },

    paginatedTickets() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredTickets.slice(start, start + this.perPage)
    },

    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.loading = true
      this.error = ''

      try {
        await Promise.all([
          this.fetchTickets(),
          this.fetchMasterData()
        ])
      } catch (err) {
        console.error('Error fetching data:', err)
        this.error = 'Failed to load tickets. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async fetchTickets() {
      try {
        // Ambil user dari localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        
        // Filter berdasarkan user_id jika ada
        const params = user.user_id ? { user_id: user.user_id } : {}
        
        const res = await axios.get('/tikets', { params })
        
        if (res.data.status) {
          this.tickets = res.data.data || []
          this.filteredTickets = this.tickets
        }
      } catch (err) {
        console.error('Error fetching tickets:', err)
        throw err
      }
    },

    async fetchMasterData() {
      try {
        const [statusRes, prioritasRes] = await Promise.all([
          axios.get('/tiket-statuses'),
          axios.get('/prioritas')
        ])

        this.statuses = statusRes.data.data || []
        this.priorities = prioritasRes.data.data || []
      } catch (err) {
        console.error('Error fetching master data:', err)
      }
    },

    filterTickets() {
      let result = [...this.tickets]

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(t => 
          t.judul?.toLowerCase().includes(query) ||
          t.kode_tiket?.toLowerCase().includes(query) ||
          t.deskripsi?.toLowerCase().includes(query)
        )
      }

      // Status filter
      if (this.filterStatus) {
        result = result.filter(t => t.status_id == this.filterStatus)
      }

      // Priority filter
      if (this.filterPriority) {
        result = result.filter(t => t.prioritas_id == this.filterPriority)
      }

      this.filteredTickets = result
      this.currentPage = 1
    },

    createTicket() {
      // Redirect ke halaman create ticket atau tampilkan modal
      this.$router.push('/tiket/create')
    },

    viewTicketDetail(ticket) {
      this.selectedTicket = ticket
      this.showDetailModal = true
    },

    closeDetailModal() {
      this.showDetailModal = false
      this.selectedTicket = null
    },

    getStatusClass(status) {
      const classes = {
        'Baru': 'status-new',
        'Dalam Proses': 'status-progress',
        'Menunggu Respon': 'status-waiting',
        'Selesai': 'status-completed',
        'Ditutup': 'status-closed'
      }
      return classes[status] || 'status-default'
    },

    getPriorityClass(priority) {
      const classes = {
        'Kritis': 'priority-critical',
        'Tinggi': 'priority-high',
        'Sedang': 'priority-medium',
        'Rendah': 'priority-low'
      }
      return classes[priority] || 'priority-default'
    },

    formatDate(date) {
      if (!date) return 'N/A'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },

    formatDateFull(date) {
      if (!date) return 'N/A'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    truncateText(text, length) {
      if (!text) return 'No description'
      return text.length > length ? text.substring(0, length) + '...' : text
    },

    handleShowPage(page) {
      if (page === 'tiket') return
      this.$router.push(`/${page}`)
    }
  }
}
</script>

<style scoped>
.user-tiket-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.tiket-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Header */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.header-content h1 {
  color: white;
  font-size: 36px;
  margin-bottom: 5px;
  font-weight: 600;
}

.header-content p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
}

.btn-create {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Filter Section */
.filter-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  margin-bottom: 15px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px 12px 12px 50px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.filters {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-select {
  flex: 1;
  min-width: 200px;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.stat-value {
  color: #333;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

/* Loading & Error States */
.loading-state, .error-state, .empty-state {
  background: white;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon, .empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.btn-retry {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

/* Tickets Grid */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.ticket-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.ticket-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.ticket-code {
  background: #f5f5f5;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

.ticket-status {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.status-new { background: #e3f2fd; color: #2196f3; }
.status-progress { background: #fff3e0; color: #ff9800; }
.status-waiting { background: #e0f2f1; color: #009688; }
.status-completed { background: #e8f5e9; color: #4caf50; }
.status-closed { background: #f5f5f5; color: #9e9e9e; }

.ticket-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.ticket-description {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.ticket-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #666;
}

.priority-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.priority-critical { background: #ffebee; color: #f44336; }
.priority-high { background: #fff3e0; color: #ff9800; }
.priority-medium { background: #e0f2f1; color: #009688; }
.priority-low { background: #e8f5e9; color: #4caf50; }

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
}

.page-btn, .page-number {
  background: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number.active {
  background: #667eea;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 20px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item label {
  font-weight: 600;
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item p {
  color: #333;
  font-size: 15px;
  margin: 0;
}

.code-badge {
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: monospace;
  display: inline-block;
}

.description-text {
  line-height: 1.8;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }
}
</style>