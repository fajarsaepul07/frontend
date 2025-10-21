<template>
  <div class="pt-3">
    <!-- header kecil -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <h4 class="mb-0">Dasbor</h4>
        <small class="text-muted">Ringkasan aktivitas dukungan</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary">Ekspor</button>
        <button class="btn btn-sm btn-outline-secondary">Muat Ulang</button>
      </div>
    </div>

    <!-- Baris KPI -->
    <div class="row g-3 mb-3">
      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">Tiket Terbuka</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">34</h3>
            <small class="badge badge-muted py-1 px-2">+5 hari ini</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">Menunggu</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">12</h3>
            <small class="badge badge-muted py-1 px-2">—</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">Terselesaikan (30h)</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">128</h3>
            <small class="badge badge-muted py-1 px-2">+14%</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="card p-3 kpi-card">
          <small class="text-muted">SLA Terpenuhi</small>
          <div class="d-flex align-items-end justify-content-between mt-2">
            <h3 class="mb-0">92%</h3>
            <small class="badge badge-muted py-1 px-2">Baik</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabel Tiket -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="card-title mb-0">Tiket Terbaru</h5>
          <small class="text-muted">Menampilkan 1–10 dari 34</small>
        </div>

        <div class="table-responsive">
          <table class="table table-hover table-compact mb-0">
            <thead class="table-light">
              <tr>
                <th style="width:48px;">ID</th>
                <th>Judul</th>
                <th>Pemohon</th>
                <th>Petugas</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Diperbarui</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1023</td>
                <td class="ticket-title">Tidak bisa masuk ke akun — gagal reset kata sandi</td>
                <td>Arya</td>
                <td>Dukungan 1</td>
                <td><span class="badge bg-danger">Tinggi</span></td>
                <td><span class="badge bg-warning text-dark">Menunggu</span></td>
                <td>2 jam lalu</td>
              </tr>

              <tr>
                <td>#1019</td>
                <td class="ticket-title">Pembayaran tidak tercatat setelah checkout</td>
                <td>Rina</td>
                <td>Dukungan 2</td>
                <td><span class="badge bg-secondary">Rendah</span></td>
                <td><span class="badge bg-success">Selesai</span></td>
                <td>1 hari lalu</td>
              </tr>

              <tr>
                <td>#1017</td>
                <td class="ticket-title">Permintaan fitur: tambah ekspor CSV</td>
                <td>Perusahaan X</td>
                <td>Belum Ditugaskan</td>
                <td><span class="badge bg-info text-dark">Sedang</span></td>
                <td><span class="badge bg-primary">Terbuka</span></td>
                <td>3 hari lalu</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!-- Placeholder untuk grafik / widget -->
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <div class="card p-3">
          <h6 class="mb-2">Tiket Berdasarkan Kanal</h6>
          <div style="height:160px; display:flex; align-items:center; justify-content:center; color:#6c757d;">
            Tempat grafik
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="card p-3">
          <h6 class="mb-2">Tren SLA</h6>
          <div style="height:160px; display:flex; align-items:center; justify-content:center; color:#6c757d;">
            Tempat grafik
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
