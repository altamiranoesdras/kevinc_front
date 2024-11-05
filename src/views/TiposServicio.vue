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
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-show="tiposServicios.length==0">
                <td colspan="3" class="text-center">No hay tipos de servicio registrados</td>
              </tr>
              <tr v-for="tipo in tiposServicios" :key="tipo.idTipoServicio">
                <td>{{ tipo.idTipoServicio }}</td>
                <td>{{ tipo.nombreTipoServicio }}</td>
                <td>
                  <!-- Botón Editar con ícono -->
                  <button
                      class="btn btn-warning btn-sm"
                      @click="editTipoServicio(tipo)"
                      style="margin-right: 1rem !important;"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <!-- Botón Eliminar con ícono -->
                  <button
                      class="btn btn-danger btn-sm"
                      @click="confirmDelete(tipo.idTipoServicio)"
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
      try {
        // Mostrar mensaje de espera
        Swal.fire({
          title: this.editMode ? 'Actualizando...' : 'Guardando...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        if (this.editMode) {
          // Actualizar
          await api.put(`/tipos-servicios/${this.form.idTipoServicio}`, {
            Nombre: this.form.Nombre,
          });
          Swal.fire('Actualizado', 'El tipo de servicio fue actualizado exitosamente', 'success');
        } else {
          // Guardar
          await api.post('/tipos-servicios', {
            Nombre: this.form.Nombre,
          });
          Swal.fire('Guardado', 'El tipo de servicio fue guardado exitosamente', 'success');
        }

        this.fetchTiposServicios();
        this.resetForm();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al realizar la operación', 'error');
        console.error('Error en la operación:', error);
      }
    },
    editTipoServicio(tipo) {
      this.form.idTipoServicio = tipo.idTipoServicio;
      this.form.Nombre = tipo.nombreTipoServicio;
      this.editMode = true;
    },
    confirmDelete(idTipoServicio) {
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
          this.deleteTipoServicio(idTipoServicio);
        }
      });
    },
    async deleteTipoServicio(idTipoServicio) {
      try {
        await api.delete(`/tipos-servicios/${idTipoServicio}`);
        Swal.fire('Eliminado', 'El tipo de servicio ha sido eliminado', 'success');
        this.fetchTiposServicios();
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar el tipo de servicio', 'error');
        console.error('Error al eliminar el tipo de servicio:', error);
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
