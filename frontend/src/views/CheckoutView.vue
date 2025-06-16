<template>
    <div class="checkout">
        <h1>Checkout</h1>
            <div class="checkout-container">
                <div class="billing-details">
                    <h2>Billing Details</h2>
                    <label for="name">
                        Full Name:
                        <input type="text" class="fullname" v-model="fullname" readonly>
                    </label>
                    <label for="email">
                        Email:
                        <input type="text" class="email" v-model="email" readonly>
                    </label>
                    <label for="phone">
                        Phone:
                        <input type="number" class="phone" v-model="phone">
                    </label>
                    <label for="address">
                        Delivery Address:
                        <input type="text" class="address" v-model="address">
                    </label>
                    <label for="payment">
                        Payment:
                        <select id="payment" class="payment" v-model="payment">
                            <option disabled value="">Select payment method</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="khalti">Khalti</option>
                            <option value="card">Debit/Credit Card</option>
                        </select>
                    </label>
                </div>
                <div class="cart-summary">
                    <h2>Order Summary</h2>
                    <ul>
                        <li v-for="item in cartItems" :key="item.id">
                            <img :src="item.product.image" alt="Product" class="item-image" />
                            {{ item.product.name }} x {{ item.quantity }} -  Rs. {{ item.product.price }} * {{ item.quantity }}
                        </li>
                    </ul>
                    <p class="total">Total: Rs. {{ totalPrice }}</p>

                    <button class="checkout-button">Proceed to Checkout</button>
                </div>
            </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/services/axios'
import { useAuthStore } from '@/store/auth'
import type { CartItem } from '@/types/Cart';
import { useCartStore } from '@/store/cart'
import { fetchCart } from '@/services/cartService'


const fullname = ref('')
const email = ref('')
const address = ref('')
const phone = ref('')
const payment = ref('')
const authStore = useAuthStore()
const cartStore = useCartStore()
const cartItems = ref<CartItem[]>([])
const loading = ref(true)

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)


const loadCart = async() => {
    try {
        cartItems.value = await fetchCart()
    }catch(err){
        console.error('Error loading cart:', err)
    }finally{
        loading.value = false
    }
}

onMounted(async() =>{
    await loadCart()
    try{
        const response = await apiClient.get('auth/users/me')
        const user = response.data

        fullname.value = `${authStore.user?.first_name} ${authStore.user?.last_name}`
        email.value = authStore.user?.email || ''
    }catch(error){
        console.error('Failed to load user info:', error)
    }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
.checkout {
  max-width: 1200px;
  margin: 0 auto; 
  padding: 2rem 1rem 1rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
  color: #2c3e50;
}

.checkout h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 0; 
  margin-bottom: 1.5rem; 
  color: #1a1a1a;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
  letter-spacing: 1px;
}

.checkout-container {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-button:hover {
  background-color: #45a049;
}

.billing-details,
.cart-summary {
  flex: 1 1 48%;
  max-width: 48%;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.billing-details h2,
.cart-summary h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.billing-details label {
  display: block;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  color: #444;
  font-weight: 500;
}

.billing-details input,
.billing-details select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 0.5rem;
  background-color: #fdfdfd;
  transition: border-color 0.3s;
}

.billing-details input:focus,
.billing-details select:focus {
  border-color: #5a67d8;
  outline: none;
}

.billing-details input[readonly] {
  background-color: #f0f0f0;
  color: #777;
  cursor: not-allowed;
}

.cart-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-summary li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eaeaea;
  font-size: 1rem;
  color: black;
}

.cart-summary li:last-child {
  border-bottom: none;
}

.cart-summary .total {
  font-size: 1.25rem;
  font-weight: 700;
  text-align: right;
  margin-top: 1rem;
  color: #000;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-right: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.item-image:hover {
  transform: scale(1.05);
}


/* Mobile Responsive */
@media (max-width: 768px) {
  .billing-details,
  .cart-summary {
    flex: 1 1 100%;
    max-width: 100%;

  }
  .checkout-container {
    flex-direction: column;
    padding: 1rem 0.5rem;
  }
}
</style>