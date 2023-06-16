import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from '@/router'
import { ConfigProvider } from 'antd'
import { store } from '@/store'
import { Provider } from 'react-redux'
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN'
import '@/common/styles/frame.less'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={globalRouters} />
    </ConfigProvider>
  </Provider>
)
