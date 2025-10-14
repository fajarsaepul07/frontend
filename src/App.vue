<template>
  <div>
    <Navbar />

    <div>
      <Sidebar />
      <main class="app-main">
        <div class="container-fluid">
          <Content />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Content from './components/Content.vue'

export default {
  name: 'App',
  components: { Navbar, Sidebar, Content }
}
</script>
