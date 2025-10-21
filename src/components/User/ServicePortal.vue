<template>
  <div class="app">
    <!-- Navigation -->
    <Navbar :current-page="currentPage" @show-page="showPage" @go-to-tiket="goToTiket" />

    <!-- Hero Section -->
    <div class="hero">
      <h1>Welcome. How can we help?</h1>
      <div class="search-container">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          placeholder="Find help, services and solutions"
          v-model="search"
        />
      </div>
    </div>

    <!-- Services Grid -->
    <div class="services-container">
      <div
        v-for="(service, key) in serviceList"
        :key="key"
        class="service-card"
        @click="handleServiceClick(key)"
      >
        <div class="service-icon" :class="service.iconClass">{{ service.icon }}</div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" v-if="modalVisible" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ modalData[modalType]?.title || 'Information' }}</h2>
        <div v-html="modalData[modalType]?.content || 'Coming soon...'"></div>
        <button class="close-modal" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: "ServicePortal",
  components: {
    Navbar
  },
  data() {
    return {
      search: "",
      modalVisible: false,
      modalType: "",
      currentPage: "home",
      serviceList: {
        itSupport: {
          title: "IT Support",
          description: "Need help with your hardware or software?",
          icon: "⚙️",
          iconClass: "icon-blue",
          action: "tiket"
        },
        accounting: {
          title: "Accounting & Finance",
          description: "Have a request related to payment or finance?",
          icon: "💰",
          iconClass: "icon-green",
          action: "tiket"
        },
        schedule: {
          title: "Schedule",
          description: "Check the schedule and book a classroom",
          icon: "📅",
          iconClass: "icon-blue",
          action: "modal"
        },
        communication: {
          title: "Communication",
          description: "Have a request related to communications?",
          icon: "💬",
          iconClass: "icon-teal",
          action: "tiket"
        },
        facilities: {
          title: "Campus Facilities",
          description: "Have a request related to campus facilities?",
          icon: "🏢",
          iconClass: "icon-orange",
          action: "tiket"
        },
        hr: {
          title: "Human Resources",
          description: "Open a ticket with Human Resources",
          icon: "👥",
          iconClass: "icon-purple",
          action: "tiket"
        },
        training: {
          title: "Training",
          description: "Schedule a training session",
          icon: "🎓",
          iconClass: "icon-blue",
          action: "modal"
        },
        suggestions: {
          title: "Suggestions",
          description: "Do you have a suggestion?",
          icon: "💡",
          iconClass: "icon-red",
          action: "tiket"
        },
      },
      modalData: {
        home: {
          title: "Welcome Home",
          content: "<p>This is your service portal home page.</p>"
        },
        dashboard: {
          title: "Dashboard",
          content: "<p>View your statistics and reports here.</p>"
        },
        laporan: {
          title: "Laporan",
          content: "<p>Access your reports and documents.</p>"
        },
        solutions: {
          title: "Solutions",
          content: "<p>Browse our knowledge base and solutions.</p>"
        },
        schedule: {
          title: "Schedule Information",
          content: "<p>Check available schedules and book resources.</p>"
        },
        training: {
          title: "Training Sessions",
          content: "<p>View and schedule training sessions.</p>"
        }
      },
    };
  },
  methods: {
    handleServiceClick(key) {
      const service = this.serviceList[key];
      
      // Jika action adalah tiket, arahkan ke halaman tiket
      if (service.action === 'tiket') {
        this.goToTiket();
      } else {
        // Jika action adalah modal, tampilkan modal
        this.showModal(key);
      }
    },
    goToTiket() {
      this.$router.push('/tiket');
    },
    showModal(type) {
      this.modalType = type;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    showPage(page) {
      this.currentPage = page;
      this.showModal(page);
    },
  },
};
</script>

<style scoped>
/* Hero Section */
.hero {
  text-align: center;
  padding: 80px 20px 60px;
  color: white;
}

.hero h1 {
  font-size: 42px;
  margin-bottom: 30px;
  font-weight: 300;
}

.search-container {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 18px 50px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

/* Services Grid */
.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 30px;
}

.service-card h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;
}

.service-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

/* Icon Colors */
.icon-blue {
  background: #e3f2fd;
  color: #2196f3;
}
.icon-green {
  background: #e8f5e9;
  color: #4caf50;
}
.icon-orange {
  background: #fff3e0;
  color: #ff9800;
}
.icon-purple {
  background: #f3e5f5;
  color: #9c27b0;
}
.icon-red {
  background: #ffebee;
  color: #f44336;
}
.icon-teal {
  background: #e0f2f1;
  color: #009688;
}

/* Modal */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h2 {
  color: #667eea;
  margin-bottom: 20px;
}

.modal-content p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
}

.close-modal {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
}

.close-modal:hover {
  background: #5568d3;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .services-container {
    grid-template-columns: 1fr;
  }
}

body,
.app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style>