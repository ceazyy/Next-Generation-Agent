import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref(localStorage.getItem('token'));

  async function login(credentials) {
    try {
      const response = await api.auth.login(credentials);
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      await router.push('/dashboard');
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async function register(userData) {
    try {
      const response = await api.auth.register(userData);
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      await router.push('/dashboard');
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  }

  function isAuthenticated() {
    return !!token.value;
  }

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated
  };
}); 