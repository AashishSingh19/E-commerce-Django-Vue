import type { CartItem } from '@/types/Cart'
import apiClient from './axios'

export const fetchCart = async (): Promise<CartItem[]> => {
    const res = await apiClient.get(`/cart`)
    return res.data
}