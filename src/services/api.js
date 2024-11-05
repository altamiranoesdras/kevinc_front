// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-kevinc.onrender.com', // Reemplaza con la URL base de tu API
});

export default api;
