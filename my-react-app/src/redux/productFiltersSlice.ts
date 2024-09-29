import { createSlice } from '@reduxjs/toolkit';

interface ProductsFiltersState {
  page: number;
  name: string;
  sort: string;
  order: string;
  category: string;
  selectedBrand: string | null;
}

const initialState: ProductsFiltersState = {
  page: 1,
  name: '',
  sort: '',
  order: '',
  category: '',
  selectedBrand: null,
};

const productsFiltersSlice = createSlice({
  name: 'productsFilters',
  initialState,
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters(state) {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = productsFiltersSlice.actions;
export default productsFiltersSlice.reducer;
