<template>
  <div class="container-fluid py-4">
    <div class="row">
      <!-- Card Total Tickets -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Total Tickets
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">150</div>
                <div class="text-muted small">Tiket dibuat hari ini: <span class="text-success">12</span></div>
              </div>
              <div class="col-auto">
                <i class="fas fa-ticket fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card System Performance -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  System Performance
                </div>
                <div class="h5 mb-1 font-weight-bold text-gray-800">98% Uptime</div>
                <div class="progress" style="height: 6px;">
                  <div class="progress-bar bg-success" role="progressbar" style="width: 98%" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="text-muted small mt-1">Latency: 120ms</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-chart-line fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card User Activity -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                  User Activity
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">45 Active Users</div>
                <div class="text-muted small">Geolocation: Mostly Jakarta</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-users fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Welcome -->
      <div class="col-12 mb-4">
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title text-primary">Welcome to Web Helpdesk 🎉</h5>
            <p class="card-text">This is your integrated helpdesk platform for clients and vendors.</p>
            <a href="#" class="btn btn-primary btn-sm">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.border-left-primary {
  border-left: 0.25rem solid #4e73df;
}

.border-left-success {
  border-left: 0.25rem solid #1cc88a;
}

.border-left-info {
  border-left: 0.25rem solid #36b9cc;
}

.shadow {
  box-shadow: 0 0.15rem 1.75rem rgba(0, 0, 0, 0.1);
}

.text-gray-800 {
  color: #3a3b45 !important;
}

.text-gray-300 {
  color: #d1d3e2 !important;
}
</style>