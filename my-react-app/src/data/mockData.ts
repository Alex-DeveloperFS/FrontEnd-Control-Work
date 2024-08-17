import {ProductInterface} from "../types/Product.Interface.ts";

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
  name: 'AMD Radeon RX 7800 XT Graphics Card',
  description:
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
  price: 386.00,
  image: 'https://loremflickr.com/640/480/random',
  category: 'Graphics Cards'
}

export interface SortByListInterface {
  value: string
  text: string
}

export const SORT_BY_LIST: SortByListInterface[] = [
  {
    value: '',
    text: 'Default order'
  },
  {
    value: 'price',
    text: 'Price'
  },
  {
    value: 'name',
    text: 'Name'
  },
  {
    value: 'category',
    text: 'Category'
  }
]

export interface OrderByListInterface {
  value: string
  text: string
}

export const ORDER_BY_LIST: OrderByListInterface[] = [
  {
    value: 'asc',
    text: 'Ascending'
  },
  {
    value: 'desc',
    text: 'Descending'
  }
]
