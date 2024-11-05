<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" id="sidebar">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Menú</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link link-dark">Inicio</router-link>
      </li>
      <li>
        <router-link to="/facturas" class="nav-link link-dark">Facturas</router-link>
      </li>
      <li>
        <router-link to="/tipos-servicio" class="nav-link link-dark">Tipos de Servicio</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
#sidebar {
  width: 250px;
  height: 100vh;
}
</style>
