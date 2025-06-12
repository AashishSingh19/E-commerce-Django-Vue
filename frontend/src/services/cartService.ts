import type { CartItem } from '@/types/Cart'
import apiClient from './axios'

export const fetchCart = async (): Promise<CartItem[]> => {
    const res = await apiClient.get(`/cart/`)
    return res.data
}

export const addToCart = async (productId: number, quantity = 1): Promise<CartItem> => {
    const res = await apiClient.post(`/cart/`, { product_id: productId, quantity})
    return res.data
}

export const updateCartItem = async (id: number, quantity: number): Promise<CartItem> => {
    const res = await apiClient.put(`/cart/${id}/`, {quantity})
    return res.data
}

export const removeCartItem = async (id:number): Promise<void> =>{
    await apiClient.delete(`/cart/${id}/`)
}