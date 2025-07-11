import { defineStore } from 'pinia';
import api from '../lib/axios';
import { useCartStore } from './cart';

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
    getters: {
    isAuthenticated: (state) => !!state.tokens?.access,
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('auth/jwt/create/', { email, password });
      this.tokens = data;

      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`

      await this.fetchUser()

      const cartStore = useCartStore()
      await cartStore.loadCart()
    },
    logout(){
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.user = null
      this.tokens = null

      const cartStore: ReturnType<typeof useCartStore> = useCartStore()
      cartStore.reset()
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
    async init() {
      const token = localStorage.getItem('access')

      if (token) {
        this.tokens = {
          access: token,
          refresh: localStorage.getItem('refresh') || ''
        }

        try {
          const res = await api.get('/auth/users/me/')
          this.user = res.data
        } catch (err) {
          console.warn('[Auth] Token invalid or expired')
          this.tokens = null
          this.user = null
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
        }
      }
    }
  },
});
