<template>
  <nav class="navbar">
    <div class="container">
        <div class="logo"></div>
        <ul class="nav-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>

            <form class="search-form" @submit.prevent="handleSearch">
                <input 
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search..."
                    class="search-input"
                />
                <button type="submit" class="search-button">🔍</button>
            </form>
            <li><router-link to="/login">Login</router-link></li>
        </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
    if(searchQuery.value.trim()){
        searchQuery.value= ''
    }
}
</script>

<style scoped>
.navbar {
  background-color: #4f46e5; /* Indigo */
  padding: 1rem 0;
  color: white;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  outline: none;
}

.search-button {
  background: white;
  color: #4f46e5;
  border: none;
  border-radius: 6px;
  padding: 0.45rem 0.75rem;
  cursor: pointer;
  font-size: 1rem;
}

.search-button:hover {
  background: #e0e7ff;
}
</style>