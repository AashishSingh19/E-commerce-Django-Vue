<template>
  <section class="products">
    <h1>Products</h1>

    <p v-if="loading" class="status">Loading...</p>

    <div v-else class="grid">
      <div v-for="product in products" :key="product.id" class="card">
        <img :src="product.image ?? './default-image.png'" alt="Product Image" />
        <h2>{{ product.name }}</h2>
        <p class="category">{{ product.category.name }}</p>
        <p class="price">Rs. {{ product.price }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Product } from '../types/Product'
import { fetchProducts } from '../services/productService'

const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  products.value = await fetchProducts()
  loading.value = false
})
</script>

<style scoped>
:root {
  --text-color: #333;
  --muted-color: #777;
  --primary: #2c7a2c;
  --border: #ddd;
  --radius: 0.5rem;
}

.products {
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
  color: var(--text-color);
}

.products h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.status {
  font-size: 1rem;
  color: var(--muted-color);
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.card h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.category {
  font-size: 0.875rem;
  color: var(--muted-color);
  margin-bottom: 0.25rem;
}

.price {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary);
}
</style>
