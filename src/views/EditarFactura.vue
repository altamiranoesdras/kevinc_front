<template>
  <div class="container">
    <h1 class="mb-4">Editar Factura</h1>
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
    };
  },
  async created() {
    await this.cargarFactura();
  },
  methods: {
    async cargarFactura() {
      try {
        const id = this.$route.params.id; // Obtiene el ID desde la ruta
        const response = await api.get(`/facturas/${id}`);

        console.log('Factura:', response.data);

        const factura = response.data[0];

        this.form = {
          Cliente: factura.cliente,
          Total: factura.total,
          Fecha: moment(factura.fecha).format('YYYY-MM-DD'),
        };
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al cargar la factura', 'error');
        console.error('Error al cargar la factura:', error);
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
