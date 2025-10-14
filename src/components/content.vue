<template>
  <div class="pt-3">
    <!-- header small -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h4 class="mb-0">Dashboard</h4>
        <small class="text-muted">Overview of support activity</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary">Export</button>
        <button class="btn btn-sm btn-outline-secondary">Refresh</button>
      </div>
    </div>

    <!-- KPI row -->
    <div class="row g-3 mb-3">
      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">Open Tickets</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">34</h3>
            <small class="badge badge-muted py-1 px-2">+5 today</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">Pending</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">12</h3>
            <small class="badge badge-muted py-1 px-2">—</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">Resolved (30d)</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">128</h3>
            <small class="badge badge-muted py-1 px-2">+14%</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">SLA Met</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">92%</h3>
            <small class="badge badge-muted py-1 px-2">Good</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Tickets table -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="card-title mb-0">Recent Tickets</h5>
          <small class="text-muted">Showing 1–10 of 34</small>
        </div>

        <div class="table-responsive">
          <table class="table table-hover table-compact mb-0">
            <thead class="table-light">
              <tr>
                <th style="width:48px;">ID</th>
                <th>Title</th>
                <th>Requester</th>
                <th>Assignee</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1023</td>
                <td class="ticket-title">Cannot login to account — password reset failing</td>
                <td>Arya</td>
                <td>Support 1</td>
                <td><span class="badge bg-danger">High</span></td>
                <td><span class="badge bg-warning text-dark">Pending</span></td>
                <td>2h ago</td>
              </tr>

              <tr>
                <td>#1019</td>
                <td class="ticket-title">Payment not reflected after checkout</td>
                <td>Rina</td>
                <td>Support 2</td>
                <td><span class="badge bg-secondary">Low</span></td>
                <td><span class="badge bg-success">Resolved</span></td>
                <td>1d ago</td>
              </tr>

              <tr>
                <td>#1017</td>
                <td class="ticket-title">Feature request: add export CSV</td>
                <td>Company X</td>
                <td>Unassigned</td>
                <td><span class="badge bg-info text-dark">Medium</span></td>
                <td><span class="badge bg-primary">Open</span></td>
                <td>3d ago</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!-- Placeholder for charts / widgets -->
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <div class="card p-3">
          <h6 class="mb-2">Ticket by Channel</h6>
          <div style="height:160px; display:flex; align-items:center; justify-content:center; color:#6c757d;">
            Chart placeholder
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="card p-3">
          <h6 class="mb-2">SLA Trend</h6>
          <div style="height:160px; display:flex; align-items:center; justify-content:center; color:#6c757d;">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>
