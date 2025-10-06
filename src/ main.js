import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Path ke router/index.js

// === Import CSS Global (Urutan Penting: Base dulu, lalu theme) ===
// Bootstrap dulu (install kalau belum: npm i bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css'

// Sneat Core (kalau file-nya ada di assets/vendor/css/ – download dari Sneat template kalau belum)
import '@/assets/vendor/css/portal-bootstrap.css'  // Bootstrap override Sneat
import '@/assets/vendor/css/portal-utilities.css'  // Utilities
import '@/assets/vendor/css/core.css'              // Core Sneat styles
import '@/assets/vendor/css/theme-default.css'     // Theme default (warna navbar/sidebar)

// Libs (kalau ada – skip kalau error)
import '@/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'  // Scrollbar
import '@/assets/vendor/libs/apex-charts/apex-charts.css'              // Charts (buat RevenueChart nanti)

// Custom CSS proyekmu
import '@/assets/css/demo.css'   // Demo styles kalau ada
import '@/assets/base.css'       // Base dari strukturmu
import '@/assets/main.css'       // Main dari strukturmu

// === Import JS (Setelah CSS) ===
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Sneat JS (kalau file-nya ada – download dari Sneat template)
import '@/assets/vendor/js/helpers.js'  // Helpers (console, etc.)
import '@/assets/vendor/js/menu.js'     // Menu toggle (sidebar collapse)
import '@/assets/js/config.js'          // Config (kalau ada)
import '@/assets/js/main.js'            // Main init (kalau ada)

// === Mount App Sekali Saja (Setelah Semua Import) ===
const app = createApp(App)
app.use(router)
app.mount('#app')