import {ProductInterface} from "../types/Product.Interface.ts"
import {PostInterface} from "../types/Post.Interface.ts"

export interface ProductCategoriesInterface {
  value: string,
  text: string
}

export const PRODUCT_CATEGORIES: ProductCategoriesInterface[] = [
  {
    value: 'Laptops',
    text: 'Laptops'
  },
  {
    value: 'Smartphones',
    text: 'Smartphones'
  },
  {
    value: 'Cameras',
    text: 'Cameras'
  },
  {
    value: 'Headphones',
    text: 'Headphones'
  },
  {
    value: 'Accessories',
    text: 'Accessories'
  },
  {
    value: 'Software',
    text: 'Software'
  },
  {
    value: 'Monitors',
    text: 'Monitors'
  },
  {
    value: 'Graphics Cards',
    text: 'Graphics Cards'
  }
]

export const INITIAL_PRODUCT: Partial<ProductInterface> = {
  name: '',
  brand: '',
  description: '',
  price: 0,
  image: '',
  category: ''
}

export interface SortByListInterface {
  value: string
  text: string
}

export const SORT_BY_LIST: SortByListInterface[] = [
  {
    value: '',
    text: 'Sort by default'
  },
  {
    value: 'price',
    text: 'Sort by price'
  },
  {
    value: 'name',
    text: 'Sort by name'
  },
  {
    value: 'category',
    text: 'Sort by category'
  }
]

export interface OrderByListInterface {
  value: string
  text: string
}

export const ORDER_BY_LIST: OrderByListInterface[] = [
  {
    value: 'asc',
    text: 'Sort ascending'
  },
  {
    value: 'desc',
    text: 'Sort descending'
  }
]

export const INITIAL_POST: PostInterface = {
  title: '',
  description: '',
  image: '',
  id: 0,
}
