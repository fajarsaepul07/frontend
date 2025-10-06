<template>
  <!-- Footer -->
  <footer class="content-footer footer bg-footer-theme">
    <div class="container-xxl d-flex flex-column flex-md-row flex-column-reverse align-items-center justify-content-md-between gap-3">
      <div class="flex-fill d-flex align-items-center justify-content-center justify-content-md-start gap-3 flex-column flex-md-row mb-3 mb-md-0">
        <div class="d-flex align-items-center gap-2 mb-2 mb-md-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0V0H0.00172773Z"
              fill="#7367F0"
            />
            <path
              opacity="0.06"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
              fill="#161616"
            />
            <path
              opacity="0.06"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
              fill="#161616"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
              fill="#7367F0"
            />
          </svg>
          <span class="fw-medium">Sneat</span>
        </div>
        <span class="text-xs text-muted">© {{ currentYear }} <a href="https://themeselection.com/products/sneat-bootstrap-html-admin-template/" target="_blank" class="text-body text-primary fw-medium">Sneat</a>. Crafted with <i class="bx bx-heart text-danger"></i> by <a href="https://themeselection.com/" target="_blank" class="text-body text-primary fw-medium">ThemeSelection</a>.</span>
      </div>
      <div class="flex-fill d-flex align-items-center justify-content-center justify-content-md-end gap-3 flex-column flex-md-row mb-3 mb-md-0">
        <div class="d-flex align-items-center gap-3">
          <a href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/" target="_blank" class="footer-link d-flex align-items-center">
            <i class="bx bx-file fs-4"></i>
            <span class="ms-1">Docs</span>
          </a>
          <a href="https://themeselection.com/support?ref=33" target="_blank" class="footer-link d-flex align-items-center">
            <i class="bx bx-support fs-4"></i>
            <span class="ms-1">Support</span>
          </a>
        </div>
        <div class="d-flex align-items-center gap-3">
          <a href="https://www.facebook.com/themeselection/" target="_blank" class="footer-link d-flex align-items-center">
            <i class="bx bxl-facebook fs-4"></i>
          </a>
          <a href="https://www.instagram.com/themeselection/" target="_blank" class="footer-link d-flex align-items-center">
            <i class="bx bxl-instagram fs-4"></i>
          </a>
          <a href="https://twitter.com/themeselection" target="_blank" class="footer-link d-flex align-items-center">
            <i class="bx bxl-twitter fs-4"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
  <!-- / Footer -->
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