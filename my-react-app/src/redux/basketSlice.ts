import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductInterface } from '../types/Product.interface.ts'

interface BasketState {
  items: {
    [id: number]:
      { product: ProductInterface;
        quantity: number
      }
  }
}

const initialState: BasketState = {
  items: {},
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {

    addToBasket: (state, action: PayloadAction<ProductInterface>) => {
      const product = action.payload;
      if (state.items[product.id]) {
        state.items[product.id].quantity += 1
      } else {
        state.items[product.id] = { product, quantity: 1 }
      }
    },

    removeFromBasket: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },

    clearBasket: (state) => {
      state.items = {}
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      if (state.items[action.payload]) {
        state.items[action.payload].quantity += 1
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      if (state.items[action.payload] && state.items[action.payload].quantity > 1) {
        state.items[action.payload].quantity -= 1
      }
    },
  },
})

export const { addToBasket, removeFromBasket, clearBasket, increaseQuantity, decreaseQuantity } = basketSlice.actions
export default basketSlice.reducer
