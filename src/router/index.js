import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Facturas from '../views/Facturas.vue';
import TiposServicio from '../views/TiposServicio.vue';
import CrearFactura from '../views/CrearFactura.vue';
import EditarFactura from '../views/EditarFactura.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/facturas', name: 'Facturas', component: Facturas },
    { path: '/facturas/crear', name: 'CrearFactura', component: CrearFactura },
    { path: '/facturas/editar/:id', name: 'EditarFactura', component: EditarFactura, props: true },
    { path: '/tipos-servicio', name: 'TiposServicio', component: TiposServicio },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
