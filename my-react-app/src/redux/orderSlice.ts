import { UserInterface } from '../types/User.interface.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store.ts'
import { createFetchThunk } from './createFetchThunk.ts'

interface UserStateInterface {
  users: UserInterface[]
  error: string | null
  isLoading: boolean
}

const initialState: UserStateInterface = {
  users: [],
  error: null,
  isLoading: false
}

export const fetchAllUsers = createFetchThunk<UserInterface>('users/fetchAllUsers')

export const usersSlice = createSlice<unknown>({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false
        if (action.payload instanceof Error) {
          state.error = action.payload.message
        } else {
          state.error = 'An error occurred'
        }
      })
  }
})

export const selectUsers = (state: RootState) => state.users.users
export const selectUsersLoading = (state: RootState) => state.users.isLoading
export const selectUsersError = (state: RootState) => state.users.error

export default usersSlice.reducer