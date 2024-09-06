import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductInterface } from '../types/Product.interface.ts'
import { createFetchThunk } from './createFetchThunk.ts'
import { RootState } from './store.ts'

interface ProductStateInterface {
  products: ProductInterface[]
  error: string | null
  isLoading: boolean
}

const initialState: ProductStateInterface = {
  products: [],
  error: null,
  isLoading: false
}

export const fetchAllProducts = createFetchThunk<ProductInterface>('posts/fetchAllProducts')

const productsSlice = createSlice<unknown>({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<ProductInterface[]>) => {
        state.isLoading = false
        state.products = action.payload
      })

      .addCase(fetchAllProducts.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false

        if (action.payload instanceof Error) {
          state.error = action.payload.message

        } else {
          state.error = 'An error occurred'
        }
      })
  }
})

export const selectProducts = (state: RootState) => state.products.products
export const selectProductsLoading = (state: RootState) => state.products.isLoading
export const selectProductsError = (state: RootState) => state.products.error

export default productsSlice.reducer