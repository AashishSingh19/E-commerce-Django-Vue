<template>
    <div class="cart-page">
        <h1>Your Cart</h1>

        <div v-if="loading" class="status-message">
            Loading Cart Items...
        </div>
        <div v-else-if="cartItems.length === 0" class="status-message">
            Your cart is empty
        </div>

        <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <div class="item-info">
                    <img :src="item.product.image" alt="Product" class="item-image" />
                    <div>
                        <h2>{{  item.product.name }}</h2>
                        <p>
                            Quantity: {{ item.quantity }}
                        </p>
                        <p>Price: {{ item.product.price * item.quantity }}</p>
                        <button @click="checkout()" class="checkout-button">Checkout</button>
                    </div>
                </div>
                <button @click="removeItem(item.id)" class="remove-button">Remove</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchCart, removeCartItem } from '@/services/cartService';
import type { CartItem } from '@/types/Cart';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'vue-router';


const router = useRouter()
const cartStore = useCartStore()
const cartItems = ref<CartItem[]>([])
const loading = ref(true)
const loadCart = async() => {
    try {
        cartItems.value = await fetchCart()
    }catch(err){
        console.error('Error loading cart:', err)
    }finally{
        loading.value = false
    }
}

const checkout = async() => {
  router.push('/checkout')
}

const removeItem = async(id: number) =>{
    await cartStore.removeItem(id)
    cartItems.value = cartItems.value.filter(item => item.id !== id)
}

onMounted(() =>{
    loadCart()
})
</script>

<style scoped>
.cart-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.status-message {
  color: #555;
  font-size: 16px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 15px;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}

.checkout-button{
  background-color: #45a049;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
}
</style>