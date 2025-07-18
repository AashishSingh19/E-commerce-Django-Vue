<template>
  <section v-if="product" class="product-detail">
    <div class="product-image-container">
      <img :src="getImageSrc(product.image)" alt="Product Image" class="product-image" />
    </div>

    <div class="product-info">
      <h1 class="product-title">{{ product.name }}</h1>

    <div class="product-rating">
      <template v-if="product.review_count && product.review_count > 0">
        <span class="stars">⭐️ {{ product.rating?.toFixed(1) ?? 'N/A' }}/5</span>
        <small class="reviews">({{ product.review_count }} reviews)</small>
      </template>
      <template v-else>
        <small class="no-reviews">No reviews yet</small>
      </template>
    </div>

      <ul class="product-meta">
        <li><strong>Category:</strong> <span>{{ product.category.name }}</span></li>
        <li><strong>Price:</strong> <span class="price">Rs. {{ Number(product.price).toFixed(2) }}</span></li>
        <li><strong>In Stock:</strong> <span :class="{ 'out-of-stock': product.stock === 0 }">
          {{ product.stock > 0 ? product.stock : 'Out of stock' }}
        </span></li>
      </ul>

      <p class="product-description">{{ product.description }}</p>

      <AddToCartButton :productId="product.id"/>
    </div>
  </section>

  <div v-else-if="loading" class="skeleton-loader">
    <div class="image-placeholder shimmer"></div>
    <div class="text-placeholder shimmer" v-for="n in 4" :key="n"></div>
  </div>

  <p v-else class="status error">Sorry, we couldn’t find the product. Try browsing other items.</p>
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
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  color: #222;
}

.product-rating {
  font-size: 1rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.product-rating .stars {
  color: #f5b301;
  font-weight: bold;
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

.product-meta .price {
  color: #27ae60;
  font-weight: bold;
}

.out-of-stock {
  color: #e74c3c;
  font-weight: bold;
}

.product-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-top: 1rem;
}

.cta-button {
  margin-top: 1.5rem;
  align-self: flex-start;
}

/* Skeleton loader styles */
.skeleton-loader {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.image-placeholder {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  background: #ddd;
  margin-bottom: 1rem;
}

.text-placeholder {
  height: 20px;
  margin: 0.5rem 0;
  border-radius: 6px;
  background: #ddd;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::before {
  content: '';
  position: absolute;
  top: 0; left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
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
