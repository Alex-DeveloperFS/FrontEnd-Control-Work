import { createSlice } from '@reduxjs/toolkit'

interface ProductsFiltersState {
  page: number
  name: string
  sort: string
  order: string
  selectedCategory: string
  selectedBrand: string | null
}

const initialState: ProductsFiltersState = {
  page: 1,
  name: '',
  sort: '',
  order: '',
  selectedCategory: '',
  selectedBrand: null,
}

const productsFiltersSlice = createSlice({
  name: 'productsFilters',
  initialState,
  reducers: {},
})

export default productsFiltersSlice.reducer