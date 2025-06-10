<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">MyShop</div>

      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>

      <form class="search-form" @submit.prevent="handleSearch" role="search" aria-label="Site Search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input"
        />
        <button type="submit" class="search-button">Search</button>
      </form>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Search for:', searchQuery.value)
    searchQuery.value = ''
  }
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
