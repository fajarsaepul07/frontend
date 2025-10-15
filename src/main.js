import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

/* Bootstrap 5 CSS & JS */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;


/* optional custom CSS */
import './assets/main.css'


const app = createApp(App);
app.use(router);
app.mount('#app');
