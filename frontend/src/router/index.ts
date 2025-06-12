import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomeView},
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
