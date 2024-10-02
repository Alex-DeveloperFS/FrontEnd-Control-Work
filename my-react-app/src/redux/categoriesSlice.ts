import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface CategoriesState {
  categories: string[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  loading: true,
  error: null,
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch('https://66a4ef2a5dc27a3c190a3666.mockapi.io/product')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json();
  const uniqueCategories: string[] = Array.from(new Set(data.map((product: any) => product.category)))
  console.log(uniqueCategories)
  return uniqueCategories
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch categories'
      })
  },
})

export default categoriesSlice.reducer
