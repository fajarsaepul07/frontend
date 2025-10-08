<template>
  <footer class="bg-light border-top mt-auto py-4">
    <div class="container-fluid">
      <div class="row align-items-center">
        <!-- Left Section -->
        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <svg width="24" height="24" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0V0H0.00172773Z" fill="#7367F0"/>
              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"/>
              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="#7367F0"/>
            </svg>
            <span class="fw-bold text-dark">Web Helpdesk</span>
          </div>
          <p class="text-muted small mb-0">
            © {{ currentYear }} 
            <a href="#" class="text-decoration-none text-primary">Web Helpdesk</a>. 
            Integrated ticketing platform for clients and vendors.
          </p>
        </div>

        <!-- Right Section -->
        <div class="col-md-6">
          <div class="d-flex align-items-center justify-content-center justify-content-md-end gap-4">
            <!-- Links -->
            <div class="d-flex gap-3">
              <a href="#" class="text-decoration-none text-muted hover-primary d-flex align-items-center gap-1">
                <i class="bi bi-file-text"></i>
                <span class="small">Docs</span>
              </a>
              <a href="#" class="text-decoration-none text-muted hover-primary d-flex align-items-center gap-1">
                <i class="bi bi-question-circle"></i>
                <span class="small">Support</span>
              </a>
            </div>

            <!-- Social Media -->
            <div class="d-flex gap-2">
              <a href="#" class="text-muted hover-primary">
                <i class="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" class="text-muted hover-primary">
                <i class="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" class="text-muted hover-primary">
                <i class="bi bi-twitter fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
footer {
  background-color: #f8f9fa !important;
  position: relative;
  bottom: 0;
  width: 100%;
}

.hover-primary:hover {
  color: #7367F0 !important;
  transition: color 0.3s ease;
}

.border-top {
  border-top: 1px solid #e9ecef !important;
}
</style>