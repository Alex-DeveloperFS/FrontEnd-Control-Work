import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import { OrderInterface } from '../types/Order.interface'

interface OrderStateInterface {
  orders: OrderInterface[]
  error: string | null
  isLoading: boolean
}

const initialState: OrderStateInterface = {
  orders: [],
  error: null,
  isLoading: false,
}

export const fetchAllOrders = createAsyncThunk<OrderInterface[], string>(
  'orders/fetchAllOrders',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data
  }
)

export const removeOrder = createAsyncThunk<void, string>(
  'orders/removeOrder',
  async (orderId: string) => {
    await axios.delete(`https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer/${orderId}`)
  }
)

export const clearOrders = createAsyncThunk<void>(
  'orders/clearOrders',
  async (_, ) => {

    const ordersResponse = await axios.get('https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer');
    const orders = ordersResponse.data;

    await Promise.all(
      orders.map((order: OrderInterface) =>
        axios.delete(`https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer/${order.id}`)
      )
    )
  }
)

export const orderSlice = createSlice<OrderStateInterface>({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<OrderInterface[]>) => {
        state.isLoading = false
        state.orders = action.payload
      })

      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred'
      })
  },
})

export const selectOrders = (state: RootState) => state.orders.orders
export const selectOrdersLoading = (state: RootState) => state.orders.isLoading
export const selectOrdersError = (state: RootState) => state.orders.error

export default orderSlice.reducer
