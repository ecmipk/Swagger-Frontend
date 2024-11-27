// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.125.115.29:8000/',
});

export default api;
