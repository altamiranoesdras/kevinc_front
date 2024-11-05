<template>
  <div>
    <!-- Título de la página -->
    <h1 class="mb-4">Gestión de Tipos de Servicio</h1>
    <div class="row">
      <!-- Formulario para agregar o editar tipos de servicio -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>{{ editMode ? 'Editar Tipo de Servicio' : 'Agregar Tipo de Servicio' }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="nombreTipoServicio" class="form-label">Nombre del Tipo de Servicio</label>
                <input
                    type="text"
                    id="nombreTipoServicio"
                    v-model="form.Nombre"
                    class="form-control"
                    required
                />
              </div>
              <button type="submit" class="btn btn-primary" style="margin-right: 1rem !important;">
                {{ editMode ? 'Actualizar' : 'Guardar' }}
              </button>
              <button
                  type="button"
                  class="btn btn-secondary"
                  v-if="editMode"
                  @click="resetForm"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Listado de tipos de servicio -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5>Listado de Tipos de Servicio</h5>
          </div>
          <div class="card-body">
            <table class="table table-sm table-bordered table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Tipo de Servicio</th>
                <th style="">Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="tipo in tiposServicios" :key="tipo.idTipoServicio">
                <td>{{ tipo.idTipoServicio }}</td>
                <td>{{ tipo.nombreTipoServicio }}</td>
                <td class="text-center">
                  <!-- Botón Editar con ícono -->
                  <button
                      class="btn btn-warning btn-sm"
                      @click="editTipoServicio(tipo)"
                      style="margin-right: 1rem !important;"
                  >
                    <i class="fas fa-edit"></i> <!-- Ícono de edición -->
                  </button>

                  <!-- Botón Eliminar con ícono -->
                  <button
                      class="btn btn-danger btn-sm"
                      @click="deleteTipoServicio(tipo.idTipoServicio)"
                  >
                    <i class="fas fa-trash"></i> <!-- Ícono de eliminación -->
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

export default {
  name: 'TiposServicio',
  data() {
    return {
      tiposServicios: [],
      form: {
        idTipoServicio: null,
        Nombre: '',
      },
      editMode: false,
    };
  },
  methods: {
    async fetchTiposServicios() {
      try {
        const response = await api.get('/tipos-servicios');
        this.tiposServicios = response.data;
      } catch (error) {
        console.error('Error al obtener los tipos de servicio:', error);
      }
    },
    async handleSubmit() {
      if (this.editMode) {
        // Actualizar
        try {
          await api.put(`/tipos-servicios/${this.form.idTipoServicio}`, {
            Nombre: this.form.Nombre,
          });
          this.fetchTiposServicios();
          this.resetForm();
        } catch (error) {
          console.error('Error al actualizar el tipo de servicio:', error);
        }
      } else {
        // Guardar
        try {
          await api.post('/tipos-servicios', {
            Nombre: this.form.Nombre,
          });
          this.fetchTiposServicios();
          this.resetForm();
        } catch (error) {
          console.error('Error al guardar el tipo de servicio:', error);
        }
      }
    },
    editTipoServicio(tipo) {
      this.form.idTipoServicio = tipo.idTipoServicio;
      this.form.Nombre = tipo.Nombre;
      this.editMode = true;
    },
    async deleteTipoServicio(idTipoServicio) {
      if (confirm('¿Estás seguro de eliminar este tipo de servicio?')) {
        try {
          await api.delete(`/tipos-servicios/${idTipoServicio}`);
          this.fetchTiposServicios();
        } catch (error) {
          console.error('Error al eliminar el tipo de servicio:', error);
        }
      }
    },
    resetForm() {
      this.form.idTipoServicio = null;
      this.form.Nombre = '';
      this.editMode = false;
    },
  },
  mounted() {
    this.fetchTiposServicios();
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
