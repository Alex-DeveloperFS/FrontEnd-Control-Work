import { UserInterface } from '../types/User.Interface.ts'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from './store.ts'
import { createFetchThunk } from './createFetchThunk.ts'
import axios from "axios"

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

export const removeUsers = createAsyncThunk('users/removeUsers', async (userId: string) => {
    const response = await fetch(`https://66d6c219006bfbe2e64e791a.mockapi.io/users/${userId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
    return userId; // Возвращаем правильный идентификатор
  }
)

export const clearUsers = createAsyncThunk<void>('users/clearUsers', async (_,  ) => {
    const response = await axios.get('https://66d6c219006bfbe2e64e791a.mockapi.io/users')
    const users = response.data
    await Promise.all(
      users.map((user: UserInterface) =>
        axios.delete(`https://66d6c219006bfbe2e64e791a.mockapi.io/users/${user.id}`)
      )
    )
  }
)

export const usersSlice = createSlice({
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