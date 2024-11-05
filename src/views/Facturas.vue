<template>
  <div>
    <!-- Título de la página con botón para crear una nueva factura -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Facturas</h1>
      <button class="btn btn-primary" @click="crearFactura">
        <i class="fas fa-plus"></i> Nueva Factura
      </button>
    </div>

    <!-- Listado de facturas -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5>Listado de Facturas</h5>
          </div>
          <div class="card-body">
            <table class="table table-sm table-bordered table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="factura in facturas" :key="factura.id">
                <td>{{ factura.idFactura }}</td>
                <td>{{ factura.cliente }}</td>
                <td>{{ factura.total }}</td>
                <td>{{ factura.fecha }}</td>
                <td>
                  <!-- Botón Editar con ícono -->
                  <button
                      class="btn btn-warning btn-sm"
                      @click="editFactura(factura)"
                      style="margin-right: 1rem !important;"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <!-- Botón Eliminar con ícono -->
                  <button
                      class="btn btn-danger btn-sm"
                      @click="confirmDelete(factura.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import Swal from 'sweetalert2';

export default {
  name: 'Facturas',
  data() {
    return {
      facturas: [],
    };
  },
  methods: {
    async fetchFacturas() {
      try {
        const response = await api.get('https://back-kevinc.onrender.com/facturas');
        this.facturas = response.data;
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
      }
    },
    crearFactura() {
      Swal.fire({
        title: 'Crear Nueva Factura',
        text: 'Función para crear una nueva factura.',
        icon: 'info',
      });
    },
    editFactura(factura) {
      Swal.fire({
        title: 'Editar Factura',
        text: `Función para editar la factura con ID ${factura.id}.`,
        icon: 'info',
      });
    },
    confirmDelete(id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFactura(id);
        }
      });
    },
    async deleteFactura(id) {
      try {
        await api.delete(`https://back-kevinc.onrender.com/facturas/${id}`);
        Swal.fire('Eliminado', 'La factura ha sido eliminada', 'success');
        this.fetchFacturas();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar la factura', 'error');
        console.error('Error al eliminar la factura:', error);
      }
    },
  },
  mounted() {
    this.fetchFacturas();
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
