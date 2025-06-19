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
                </div>
                <div class="cart-summary">
                    <h2>Order Summary</h2>
                    <ul>
                      <li v-for="item in cartItems" :key="item.id">
                          <img :src="item.product.image ?? ''" alt="Product" class="item-image" />
                          <div class="item-details">
                              <p>{{ item.product.name }}</p>
                              <p>Rs. {{ item.product.price }}</p>
                              <div class="quantity-control">
                                <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">−</button>
                                <input 
                                  type="number" 
                                  min="1" 
                                  :value="item.quantity"
                                  @change="updateQuantity(item, $event)" 
                                />
                                <button @click="increaseQuantity(item)">+</button>
                              </div>
                          </div>
                      </li>
                    </ul>
                    <p class="subtotal">Sub Total: Rs. {{ subtotal }}</p>
                    <p class="delivery">Delivery: Rs. {{ delivery }}</p>
                    <p class="total">TOTAL TO PAY: Rs. {{ totalPrice }}</p>

                    <label for="payment">
                        Payment:
                        <select id="payment" class="payment" v-model="payment">
                            <option disabled value="">Select payment method</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="khalti">Khalti</option>
                            <option value="card">Debit/Credit Card</option>
                        </select>
                    </label>
                    <button @click="handleCheckout" class="checkout-button">Proceed to Checkout</button>
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
import { updateCartItem } from '@/services/cartService';
import api from '@/lib/axios';

const fullname = ref('')
const email = ref('')
const address = ref('')
const phone = ref('')
const payment = ref('')
const authStore = useAuthStore()
const cartStore = useCartStore()
const cartItems = ref<CartItem[]>([])
const loading = ref(true)

const delivery = computed(()=>{
  const deliveryCharge = 50
  return deliveryCharge
})

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)


const totalPrice = computed(() => subtotal.value + delivery.value)

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

async function updateQuantity(item: CartItem, event: Event) {
  const newQuantity = parseInt((event.target as HTMLInputElement).value, 10)
  if (newQuantity >= 1) {
    item.quantity = newQuantity
    syncQuantityWithBackend(item)
  }
}

async function syncQuantityWithBackend(item: CartItem) {
  try {
    console.log("Sending PUT to backend:", item.id, item.quantity)
    await updateCartItem(item.id, item.quantity)
    console.log(`Updated item ${item.id} to quantity ${item.quantity}`)
  } catch (error) {
    console.error('Failed to update quantity to backend:', error)
  }
}

function increaseQuantity(item: CartItem){
  item.quantity += 1
  syncQuantityWithBackend(item)
}

function decreaseQuantity(item: CartItem){
    if (item.quantity > 1) {
    item.quantity -= 1;
    syncQuantityWithBackend(item)
  }
}

async function handleCheckout(){
  if(!phone.value || !address || !payment){
    alert("Please fill in the details.")
    return
  }
  if(cartItems.value.length === 0){
    alert("Your cart is empty.")
    return
  }
  const payload = {
    phone: phone.value,
    address: address.value,
    payment_method: payment.value,
    items: cartItems.value.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }))
  }
  console.log("Payload being sent:", payload);

try{
  await apiClient.post('/checkout/', payload)
  alert("Order placed successfully!")
  cartItems.value = []
  cartStore.cleanCart()
  }catch(error: any){
    console.error("Checkout failed:", error.response?.data || error)
    alert("Checkout failed.")
  }
}
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
  text-align: left;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0; 
  margin-bottom: 0.5rem; 
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
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.billing-details h2,
.cart-summary h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.billing-details label,
.cart-summary label {
  display: block;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  color: #444;
  font-weight: 500;
}

.billing-details input,
.cart-summary input,
.cart-summary select {
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
  font-weight: 500;
}

.cart-summary li:last-child {
  border-bottom: none;
}

.cart-summary .total
 {
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  margin-top: 1rem;
  color: #000;
}

.cart-summary .subtotal,
    .delivery
 {
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  margin-top: 1rem;
  color: #777;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.quantity-control input {
  width: 50px;
  height: 36px;
  text-align: center;
  font-size: 1rem;
  padding: 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  appearance: textfield;
}

.quantity-control input::-webkit-inner-spin-button,
.quantity-control input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-control button {
  width: 36px;
  height: 36px;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.quantity-control button:hover {
  background-color: #ddd;
}


.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
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

.item-details {
  flex-direction: column;
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