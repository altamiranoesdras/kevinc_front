// src/services/api.js
import axios from 'axios';

const api = axios.create({
    //url producción
    // baseURL: 'https://back-kevinc.onrender.com',
    //url local
    baseURL: 'http://localhost:3001',
});

export default api;
