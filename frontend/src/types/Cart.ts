import type { Product } from './Product'

export interface CartItem{
    id: number
    product: Product
    product_id?: number
    quantity: number
}