import { createSlice } from '@reduxjs/toolkit'
import { setStorage, getStorage } from '../../utils/index'


const initialState = {
  user: null,
  token: getStorage('session', 'token') || '',
  topLayLoading: false
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    // 设置token
    setToken: (state, action) => {
      state.token = action.payload
      setStorage('session', 'token', action.payload)
    },

    // 设置用户信息
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setToken } = commonSlice.actions
export const { setUser } = commonSlice.actions

export default commonSlice.reducer