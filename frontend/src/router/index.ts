import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ()=> import('@/views/CartView.vue'),
  },
  { 
    path: '/login', 
    component: LoginView,
    meta: {
      hideNavbar: true,
    }
  },
  { 
    path: '/register', 
    component: RegisterView,
    meta: {
      hideNavbar: true,
    }
  },
    {
    path: '/checkout',
    name: 'Checkout',
    component: ()=> import('@/views/CheckoutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
