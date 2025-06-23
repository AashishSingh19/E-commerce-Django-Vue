import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

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
  {
    path: '/user-profile',
    name: 'Profile',
    component: ()=> import('@/views/UserProfileView.vue'),
  },
  {
    path: '/help-and-support',
    name: 'Help',
    component: ()=> import('@/views/HelpAndSupportView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
