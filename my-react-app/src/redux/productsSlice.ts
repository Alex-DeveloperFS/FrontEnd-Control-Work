import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductInterface} from "../types/Product.Interface.ts";
import {UserInterface} from "../types/User.interface.ts";
import {fetchAllUsers} from "./userSlice.ts";
import {createFetchThunk} from "./createFetchThunk.ts";
import {RootState} from "./store.ts";

interface ProductStateInterface {
  products: ProductInterface[]
  error: string | null
  isLoading: boolean
}

const initialState: ProductStateInterface = {
  products: [],
  error: null,
  isLoading: false,
}

export const fetchAllProducts = createFetchThunk<ProductInterface>('users/fetchAllProducts')

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state: ProductStateInterface) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state: ProductStateInterface, action: PayloadAction<UserInterface[]>) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state: ProductStateInterface, action: PayloadAction<unknown>) => {
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