import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersReducer from './userSlice'
import postsReducer from './postsSlice'
import productsReducer from './productsSlice'
import basketReducer from './basketSlice'
import orderReducer from './orderSlice'
import brandsReducer from './brandsSlice'
import productsFiltersReducer from './productFiltersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    products: productsReducer,
    basket: basketReducer,
    orders: orderReducer,
    brands: brandsReducer,
    productsFilters: productsFiltersReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch