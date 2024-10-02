import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductInterface } from '../types/Product.Interface.ts'

interface CartState {
  items: {
    [id: string]: {
      product: ProductInterface;
      quantity: number
    }
  }
}

const initialState: CartState = {
  items: {},
}

const cartSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ProductInterface>) => {
      const product = action.payload
      const id = product.id.toString()
      if (state.items[id]) {
        state.items[id].quantity += 1
      } else {
        state.items[id] = { product, quantity: 1 }
      }
    },

    removeFromBasket: (state, action: PayloadAction<number>) => {
      const id = action.payload.toString();
      delete state.items[id]
    },

    clearBasket: (state) => {
      state.items = {}
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload.toString();
      if (state.items[id]) {
        state.items[id].quantity += 1
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload.toString()
      if (state.items[id] && state.items[id].quantity > 1) {
        state.items[id].quantity -= 1
      }
    },
  },
})

export const { addToBasket, removeFromBasket, clearBasket, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer
