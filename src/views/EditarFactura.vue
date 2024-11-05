<template>
  <div class="container">
    <h1 class="mb-4">Editar Factura</h1>
    <div class="row">
      <!-- Columna para el formulario de la factura -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="cliente" class="form-label">Cliente</label>
                <input type="text" id="cliente" v-model="form.Cliente" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="total" class="form-label">Total</label>
                <input type="number" id="total" v-model="form.Total" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input type="date" id="fecha" v-model="form.Fecha" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Actualizar</button>
              <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Columna para la tabla y formulario de servicios -->
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Servicios de la Factura</h5>
          </div>
          <div class="card-body">
            <table class="table table-sm table-bordered table-striped">
              <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-show="servicios.length==0">
                <td colspan="4" class="text-center">No hay servicios registrados</td>
              </tr>
              <tr v-for="servicio in servicios" :key="servicio.idServicioFacturado">
                <td>{{ servicio.descripcion }}</td>
                <td>{{ servicio.cantidad }}</td>
                <td>{{ servicio.precioUnitario }}</td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="eliminarServicio(servicio)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Formulario para agregar un nuevo servicio -->
        <div class="card">
          <div class="card-header">
            <h5>Agregar Servicio</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="agregarServicio">
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <input type="text" id="descripcion" v-model="nuevoServicio.descripcion" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad</label>
                <input type="number" id="cantidad" v-model="nuevoServicio.cantidad" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="precioUnitario" class="form-label">Precio Unitario</label>
                <input type="number" id="precioUnitario" v-model="nuevoServicio.precioUnitario" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Agregar Servicio</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
  name: 'EditarFactura',
  data() {
    return {
      form: {
        Cliente: '',
        Total: '',
        Fecha: '',
      },
      servicios: [], // Lista de servicios de la factura
      nuevoServicio: {
        descripcion: '',
        cantidad: 1,
        PrecioUnitario: 0,
        idFactura: null, // Se asignará al cargar la factura
      },
    };
  },
  async created() {
    await this.cargarFactura();
    await this.cargarServicios();
  },
  methods: {
    async cargarFactura() {
      try {
        const id = this.$route.params.id; // Obtiene el ID desde la ruta
        const response = await api.get(`/facturas/${id}`);
        const factura = response.data[0];

        this.form = {
          Cliente: factura.cliente,
          Total: factura.total,
          Fecha: moment(factura.fecha).format('YYYY-MM-DD'),
        };
        this.nuevoServicio.idFactura = factura.idFactura; // Asigna el ID de la factura
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al cargar la factura', 'error');
        console.error('Error al cargar la factura:', error);
      }
    },
    async cargarServicios() {
      try {
        const idFactura = this.$route.params.id;
        const response = await api.get(`/servicios/${idFactura}`); // Usa el parámetro idFactura
        this.servicios = response.data;

      } catch (error) {
        const message = error.response.data || 'Hubo un problema al cargar los servicios de la factura';
        Swal.fire('Advertencia', message, 'warning');
        console.error('Error al cargar los servicios:', error);
      }
    },
    async agregarServicio() {
      try {
        this.nuevoServicio.idFactura = this.$route.params.id; // Asegura el ID de la factura
        await api.post(`/servicios`, this.nuevoServicio); // Endpoint para agregar un servicio
        Swal.fire('Agregado', 'El servicio fue agregado exitosamente', 'success');
        this.cargarServicios(); // Recarga la lista de servicios
        this.nuevoServicio = { descripcion: '', cantidad: 1, PrecioUnitario: 0, idFactura: this.nuevoServicio.idFactura };
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al agregar el servicio', 'error');
        console.error('Error al agregar el servicio:', error);
      }
    },
    async eliminarServicio(servicio) {
      try {
        await api.delete(`/servicios/${servicio.idServicioFacturado}`); // Endpoint para eliminar un servicio
        Swal.fire('Eliminado', 'El servicio fue eliminado exitosamente', 'success');
        this.cargarServicios(); // Recarga la lista de servicios
      } catch (error) {
        const message = error.response.data || 'Hubo un problema al eliminar el servicio';
        Swal.fire('Advertencia', message, 'warning');
        console.error('Error al eliminar el servicio:', error);
      }
    },
    async handleSubmit() {
      try {
        const id = this.$route.params.id;
        await api.put(`/facturas/${id}`, this.form);
        Swal.fire('Actualizado', 'La factura fue actualizada exitosamente', 'success');
        this.$router.push('/facturas'); // Redirige a la lista de facturas después de actualizar
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al actualizar la factura', 'error');
        console.error('Error al actualizar la factura:', error);
      }
    },
    cancelar() {
      this.$router.push('/facturas'); // Redirige a la lista de facturas si se cancela
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
