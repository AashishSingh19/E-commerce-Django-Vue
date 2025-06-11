import apiClient from './axios'
import type { Product } from '@/types/Product'


export async function fetchProducts(): Promise<Product[]> {
    const response = await apiClient.get('/products/')
    return response.data
}

export async function fetchProduct(slug: string): Promise<Product>{
    const response = await apiClient.get('/products/${slug}/')
    return response.data
}