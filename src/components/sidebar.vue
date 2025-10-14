<template>
  <div>
    <!-- Offcanvas for small screens -->
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
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body p-0">
        <div class="p-3">
          <h6 class="mb-3 fw-semibold">Web Helpdesk</h6>
          <nav class="nav flex-column">
            <a class="nav-link text-white active" href="#">Dashboard</a>
            <a class="nav-link text-white-50" href="#">Tickets</a>
            <a class="nav-link text-white-50" href="#">Customers</a>
            <a class="nav-link text-white-50" href="#">Knowledge Base</a>
            <a class="nav-link text-white-50" href="#">Reports</a>
            <a class="nav-link text-white-50" href="#">Settings</a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Static sidebar for md+ screens -->
    <aside class="app-sidebar d-none d-md-block bg-light shadow-sm vh-100">
      <div class="p-3">
        <div class="mb-3">
          <h5 class="mb-1 text-primary">Web Helpdesk</h5>
          <small class="text-muted">Support center</small>
        </div>

        <nav class="nav flex-column sidebar-nav">
          <a class="nav-link active" href="#">Dashboard</a>
          <a class="nav-link" href="#">
            Tickets <span class="badge bg-secondary ms-2">34</span>
          </a>
          <a class="nav-link" href="#">Customers</a>
          <a class="nav-link" href="#">Knowledge Base</a>
          <a class="nav-link" href="#">Reports</a>
          <a class="nav-link" href="#">Settings</a>
        </nav>

        <hr />

        <div class="px-1">
          <small class="text-muted fw-semibold">Filters</small>
          <div class="mt-2 d-grid gap-2">
            <button class="btn btn-sm btn-outline-primary">My Open</button>
            <button class="btn btn-sm btn-outline-secondary">Unassigned</button>
            <button class="btn btn-sm btn-outline-danger">High Priority</button>
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
