<template>
  <nav
    class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
    id="layout-navbar"
  >
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      <div class="navbar-nav align-items-center">
        <div class="nav-item d-flex align-items-center position-relative">
          <input
            v-model="search"
            @focus="showDropdown = true"
            @blur="showDropdown = false"
            type="text"
            class="form-control"
            placeholder="Search..."
            style="width: 200px;"
          />
          <div
            v-if="showDropdown && search"
            class="navbar-dropdown search-dropdown dropdown-menu dropdown-menu-start show"
            style="top: 100%"
          >
            <ul class="dropdown-menu-search">
              <li>
                <div class="dropdown-header rounded-top">
                  <h6 class="mb-0 px-3 py-2 text-xs fw-normal text-body">Search results</h6>
                </div>
              </li>
              <li
                v-for="result in filteredResults"
                :key="result.id"
                class="dropdown-item"
              >
                <a class="dropdown-item-contents d-flex flex-column px-3 py-2">
                  <span class="d-flex align-items-center gap-2 mb-1">
                    <img
                      :src="result.avatar"
                      :alt="`${result.name}-avatar`"
                      class="rounded w-px-40 h-auto"
                    />
                    <span class="text-heading fw-semibold text-truncate me-2">{{ result.name }}</span>
                  </span>
                  <small class="text-body text-truncate mb-0">{{ result.title }}</small>
                </a>
              </li>
              <li v-if="filteredResults.length === 0">
                <div class="dropdown-item px-3 py-2 text-muted">No results found</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Bagian lain navbar seperti user menu, notifications, dll. (jika ada di kode lengkap) -->
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showDropdown = ref(false)
const searchResults = ref([
  { id: 1, name: 'John Doe', title: 'Admin', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Jane Smith', title: 'User', avatar: 'https://i.pravatar.cc/40?img=2' }
])

const filteredResults = computed(() =>
  search.value
    ? searchResults.value.filter(r =>
        r.name.toLowerCase().includes(search.value.toLowerCase())
      )
    : []
)
</script>