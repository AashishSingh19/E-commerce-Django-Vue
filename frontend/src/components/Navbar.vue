<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo" @click="toHomePage">MyShop</div>

      <!-- <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cart"><font-awesome-icon :icon="faShoppingCart" /></router-link></li>
      </ul> -->

      <!-- Search form moved before login -->
      <form class="search-form" @submit.prevent="handleSearch" role="search" aria-label="Site Search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input"
        />
        <button type="submit" class="search-button">Search</button>
      </form>

      <div class="cart" @click="goToCart">
        <font-awesome-icon :icon="faShoppingCart" />
        <span v-if="cartStore" class="cart-badge">{{ cartStore.totalCount }}</span>
      </div>

      <!-- Login/User Dropdown -->
      <div class="user-dropdown">
        <template v-if="auth.user">
          <span class="user-name" @click="toggleDropdown">
            <img src="../assets/default-user.png" alt="User" class="user-avatar">
            <span class="user-label">{{ auth.user.first_name }}</span>
          </span>

          <div v-if="dropdownOpen" class="dropdown-menu">
            <ul>
                <li><a @click="goToUser" href="#">User Settings</a></li>
                <li><a @click="goToHelp" href="#">Help & Support</a></li>
                <li><a href="#">Display & Accessibility</a></li>
                <li><button @click="handleLogout">Logout</button></li>
              </ul>
          </div>
        </template>

        <template v-else>
          <router-link to="/login" class="user-name">
            <img src="../assets/default-user.png" alt="User" class="user-avatar">
            <span class="user-label">Login</span>
          </router-link>
        </template>
      </div>

    </div>
  </nav>
</template>


<script lang="ts" setup>
import router from '../router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { fetchCart } from '@/services/cartService'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const cartCount = ref(0)
const dropdownOpen = ref(false)
const auth = useAuthStore()
const route = useRouter()
const searchQuery = ref('')

onMounted(async () => {
  const cartItems = await fetchCart()
  cartCount.value = cartItems.reduce((sum, item)=> sum + item.quantity, 0)
})

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if(query){
    router.push({path: '/', query: {q: query}})
    searchQuery.value = ''
  }
}

const goToUser = async() =>{
  router.push('/user-profile')
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleLogout = async() =>{
  await auth.logout()
  dropdownOpen.value = false
  router.push('/')
}

const goToCart =  async() =>{
  route.push({ name: 'Cart' })
}
const goToHelp =  async() =>{
  route.push({ name: 'Help' })
}

const toHomePage =  async() =>{
  route.push({ name: 'Home' })
}
</script>

<style scoped>
.navbar {
  background-color: #e0e7ff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  font-size: 1.75rem;
  font-weight: bold;
  color: #4f46e5;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links a {
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #4f46e5;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
}

.search-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #c7d2fe;
  border-radius: 6px;
  font-size: 1rem;
  width: 250px;
  max-width: 100%;
}

.search-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #4338ca;
}

.user-dropdown {
  position: relative;
  display: inline-block;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  user-select: none;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9f9f9;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  transition: background-color 0.3s ease;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.user-label {
  display: inline-block;
  padding-top: 4px; /* Moves text slightly lower */
  line-height: 1.2;
}

.user-label a {
  text-decoration: none;
  color: inherit;
}

.user-name:hover {
  background-color: #e5e7eb;
}

 .cart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1.2rem;
  color: #333; 
 }

.cart:hover {
  background-color: #e5e7eb;
  transform: scale(1.05);
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #ef4444;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 9999px;
  font-weight: bold;
  line-height: 1;
} 


.dropdown-menu {
  position: absolute;
  right: 0;
  top: 110%;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 1000;
  padding: 0.5rem 0;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  width: 100%;
}

.dropdown-menu a,
.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  background: none;
  text-align: left;
  font-size: 0.9rem;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #f3f4f6;
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .search-form {
    width: 100%;
    margin-top: 0.5rem;
  }

  .search-input {
    width: 100%;
  }

  .search-button {
    width: 100%;
  }
}
</style>
