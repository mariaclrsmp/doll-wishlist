// Este é um exemplo de como configurar o Axios no front-end React
// Salve este arquivo como: src/services/api.js (no front-end)

import axios from 'axios';

// Cria instância do axios com configurações base
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Se receber erro 401 (não autorizado), redireciona para login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        // Tratamento de erros personalizados
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'Erro ao processar requisição';

        console.error('API Error:', errorMessage);

        return Promise.reject(error);
    }
);

export default api;
