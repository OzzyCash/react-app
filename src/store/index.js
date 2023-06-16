import { configureStore } from '@reduxjs/toolkit'
// 引入主题换肤store分库
import themeReducer from '@/store/slices/theme'
import commonReducer from '@/store/slices/common'

export const store = configureStore({
  reducer: {
    // 主题换肤store分库
    theme: themeReducer,
    // 可以根据需要在这里继续追加其他分库
    common: commonReducer
  },
})