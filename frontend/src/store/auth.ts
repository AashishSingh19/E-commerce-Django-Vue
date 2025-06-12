import { defineStore } from 'pinia';
import api from '../lib/axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    tokens: null as Tokens | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('auth/jwt/create/', { email, password });
      this.tokens = data;

      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      await this.fetchUser();
    },
    logout(){
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.user = null
      this.tokens = null
    },
    async fetchUser() {
      if (!this.tokens) return;

      const { data } = await api.get('auth/users/me/', {
        headers: {
          Authorization: `Bearer ${this.tokens.access}`,
        },
      });
      this.user = data;
    },
    init(){
      const access = localStorage.getItem('access')
      const refresh = localStorage.getItem('refresh')
      if(access && refresh){
        this.tokens = { access, refresh}

        // Set default Authorization header globally
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      }
    }
  },
});
