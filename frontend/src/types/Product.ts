export interface Category{
    id: number
    name: string
    slug: string
}

export interface Product{
    id: number
    name: string
    slug: string
    description: string
    price: number
    image: string | null
    stock: number
    category: Category
    rating?: number | null
    review_count?: number
}