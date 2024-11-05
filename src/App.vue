<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <main class="flex-grow-1 p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
