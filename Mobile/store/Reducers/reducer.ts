import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DataUser } from '@/types/global';

export interface AppState {
  user: DataUser | null;
  socket: WebSocket | null;
  token: string | null;
  new_msg_counter: number;
}

const initialState: AppState = {
  user: null,
  socket: null,
  token: null,
  new_msg_counter: 0,
}

export const appStateSlice = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<DataUser | null>) => {
      state.user = action.payload
    },
    setSocket: (state, action: PayloadAction<WebSocket | null>) => { // Reducer pour le socket
      state.socket = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => { // Reducer pour le socket
      state.token = action.payload
    },
    increment_new_msg_counter: (state) => {
      state.new_msg_counter += 1
    },
  },
})

export const { setUser, setSocket, setToken, increment_new_msg_counter } = appStateSlice.actions

export default appStateSlice.reducer
