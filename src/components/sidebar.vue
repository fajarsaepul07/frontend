<template>
  <div>
    <!-- Offcanvas untuk layar kecil -->
    <div
      class="offcanvas offcanvas-start bg-primary text-white"
      tabindex="-1"
      id="sidebarOffcanvas"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div class="offcanvas-header border-bottom border-light-subtle">
        <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">Menu</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Tutup"
        ></button>
      </div>
      <div class="offcanvas-body p-0">
        <div class="p-3">
          <h6 class="mb-3 fw-semibold">Web Helpdesk</h6>
          <nav class="nav flex-column">
            <a class="nav-link text-white active" href="#">Dasbor</a>
            <a class="nav-link text-white-50" href="#">Tiket</a>
            <a class="nav-link text-white-50" href="#">Pelanggan</a>
            <a class="nav-link text-white-50" href="#">Basis Pengetahuan</a>
            <a class="nav-link text-white-50" href="#">Laporan</a>
            <a class="nav-link text-white-50" href="#">Pengaturan</a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Sidebar statis untuk layar md+ -->
    <aside class="app-sidebar d-none d-md-block bg-light shadow-sm vh-100">
      <div class="p-3">
        <div class="mb-3">
          <h5 class="mb-1 text-primary">Web Helpdesk</h5>
          <small class="text-muted">Pusat Bantuan</small>
        </div>

        <nav class="nav flex-column sidebar-nav">
          <a class="nav-link active" href="#">Dasbor</a>
          <a class="nav-link" href="#">
            Tiket <span class="badge bg-secondary ms-2">34</span>
          </a>
          <a class="nav-link" href="#">Pelanggan</a>
          <a class="nav-link" href="#">Basis Pengetahuan</a>
          <a class="nav-link" href="#">Laporan</a>
          <a class="nav-link" href="#">Pengaturan</a>
        </nav>

        <hr />

        <div class="px-1">
          <small class="text-muted fw-semibold">Filter</small>
          <div class="mt-2 d-grid gap-2">
            <button class="btn btn-sm btn-outline-primary">Tiket Saya</button>
            <button class="btn btn-sm btn-outline-secondary">Belum Ditugaskan</button>
            <button class="btn btn-sm btn-outline-danger">Prioritas Tinggi</button>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
