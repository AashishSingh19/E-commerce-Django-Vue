import { defineStore } from 'pinia'
import { fetchCart, addToCart, updateCartItem, removeCartItem } from '@/services/cartService'
import type { CartItem } from '@/types/Cart'

export const useCartStore = defineStore('cart', {
    state: ()=>({
        items: [] as CartItem[],
        loading: false,
    }),
    getters: {
        totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    },
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
        },
        async cleanCart(){
            this.items = []
        },
        async init() {
            const token = localStorage.getItem('access')
            if (token) {
                await this.loadCart()
            }
        },
        reset() {
            this.items = []
        }
    }
})