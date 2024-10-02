import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface BrandsState {
  brands: string[]
  loading: boolean
  error: string | null
}

const initialState: BrandsState = {
  brands: [],
  loading: true,
  error: null,
}

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const response = await fetch('https://66a4ef2a5dc27a3c190a3666.mockapi.io/product')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  const uniqueBrands: string[] = Array.from(new Set(data.map((product: any) => product.brand)))
  return uniqueBrands
})

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false
        state.brands = action.payload
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch brands'
      })
  },
})

export default brandsSlice.reducer