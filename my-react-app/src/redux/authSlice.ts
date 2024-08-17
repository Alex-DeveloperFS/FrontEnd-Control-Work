import { createSlice } from '@reduxjs/toolkit'

export interface AuthStateInterface {
  isLogged: boolean
}

const initialState: AuthStateInterface = {
  isLogged: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true
    },
    logout(state) {
      state.isLogged = false
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer