<template>
  <section v-if="product" class="product-detail">
    <img :src="getImageSrc(product.image)" alt="Product Image" class="product-image" />
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p class="category">Category: <span class="info">{{ product.category.name }}</span></p>
      <p class="price">Price: Rs. <span class="info">{{ product.price }}</span></p>
      <p class="description">Description: <span class="info">{{ product.description }}</span></p>
      <p class="stock">In Stock: <span class="info">{{ product.stock }}</span></p>
      <AddToCartButton :productId="product.id"/>
    </div>
  </section>

    <p v-else-if="loading" class="status">Loading...</p>
    <p v-else class="status error">Product not found.</p>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Product } from '@/types/Product';
import { fetchProduct } from '../services/productService'
import { useRoute } from 'vue-router';
import AddToCartButton from '../components/AddToCartButton.vue'

const route = useRoute()
const slug = route.params.slug as string
const product = ref<Product | null>(null)
const loading = ref(true)

onMounted(async () => {
    try{
        product.value = await fetchProduct(slug)
    }catch(error){
        console.log('Failed to load product:', error)
    }finally{
        loading.value = false
    }
})

const getImageSrc = (image: string | null): string => {
  return image ?? new URL('@/assets/default-image.png', import.meta.url).href
}
</script>

<style>
.product-detail{
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
}
.product-image{
    max-width: 400px;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
}
.product-info{
    flex: 1;
}

.info {
  color: #676262; 
}

.category{
    font-size: 1rem;
    font-weight:500;
    margin: 0.5rem 0;
}
.price{
    font-size: 1rem;
    font-weight:500;
    margin: 0.5rem 0;
}
.description{
    font-size: 1rem;
    font-weight:500;
    margin: 0.5rem 0;
}
.stock{
    font-size: 1rem;
    font-weight:500;
    margin: 0.5rem 0;
}
</style>