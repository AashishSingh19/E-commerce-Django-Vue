<template>
  <section v-if="product" class="product-detail">
    <div class="product-image-container">
      <img :src="getImageSrc(product.image)" alt="Product Image" class="product-image" />
    </div>
    <div class="product-info">
      <h1 class="product-title">{{ product.name }}</h1>
      <ul class="product-meta">
        <li><strong>Category:</strong> <span>{{ product.category.name }}</span></li>
        <li><strong>Price:</strong> <span>Rs. {{ Number(product.price).toFixed(2) }}</span></li>
        <li><strong>In Stock:</strong> <span>{{ product.stock }}</span></li>
      </ul>
      <p class="product-description">{{ product.description }}</p>
      <AddToCartButton :productId="product.id" />
    </div>
  </section>

  <p v-else-if="loading" class="status">Loading...</p>
  <p v-else class="status error">Product not found.</p>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Product } from '@/types/Product'
import { fetchProduct } from '../services/productService'
import { useRoute } from 'vue-router'
import AddToCartButton from '../components/AddToCartButton.vue'

const route = useRoute()
const slug = route.params.slug as string
const product = ref<Product | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    product.value = await fetchProduct(slug)
  } catch (error) {
    console.error('Failed to load product:', error)
  } finally {
    loading.value = false
  }
})

const getImageSrc = (image: string | null): string => {
  return image ?? new URL('@/assets/default-image.png', import.meta.url).href
}
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media(min-width: 768px) {
  .product-detail {
    flex-direction: row;
    align-items: flex-start;
  }
}

.product-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #222;
}

.product-meta {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-meta li {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.product-meta span {
  color: #555;
}

.product-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-top: 1rem;
}

.status {
  text-align: center;
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #555;
}

.error {
  color: #d33;
}
</style>
