import { defineStore } from 'pinia'
import { fetchCart, addToCart, updateCartItem, removeCartItem } from '@/services/cartService'
import type { CartItem } from '@/types/Cart'

export const useCartStore = defineStore('cart', {
    state: ()=>({
        items: [] as CartItem[],
        loading: false,
    }),
    actions: {
        async loadCart(){
            this.loading = true
            this.items = await fetchCart()
            this.loading = false
        },
        async addItem(productId: number, quantity = 1){
            const item = await addToCart(productId, quantity)
            this.items.push(item)
        },
        async updateItem(id: number, quantity: number){
            const updated = await updateCartItem(id, quantity)
            const idx = this.items.findIndex(item => item.id === id)
            if(idx !== -1) this.items[idx] = updated
        },
        async removeItem(id: number){
            await removeCartItem(id)
            this.items = this.items.filter(item => item.id !== id)
        }
    }
})