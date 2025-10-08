import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap CSS & Icons
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import Bootstrap Bundle JS
import * as bootstrap from 'bootstrap'

// Import custom CSS
import './assets/main.css'

const app = createApp(App)

// Make bootstrap available globally
app.config.globalProperties.$bootstrap = bootstrap

app.use(router)
app.mount('#app')
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// Import Bootstrap JS (optional, jika butuh components seperti dropdown, modal)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import custom CSS (jika ada)
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')