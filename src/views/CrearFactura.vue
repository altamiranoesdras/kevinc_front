<template>
  <div class="container">
    <h1 class="mb-4">Crear Nueva Factura</h1>
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
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import Swal from 'sweetalert2';

export default {
  name: 'CrearFactura',
  data() {
    return {
      form: {
        Cliente: '',
        Total: '',
        Fecha: '',
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await api.post('/facturas', this.form);
        Swal.fire('Guardado', 'La factura fue creada exitosamente', 'success');
        this.$router.push('/facturas'); // Redirige a la lista de facturas después de guardar
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al crear la factura', 'error');
        console.error('Error al crear la factura:', error);
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
