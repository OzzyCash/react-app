import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '../login/login'
import Entry from '../entry/index'
import Home from '../home/home'

// 全局路由
export const globalRouters = createHashRouter([
  // 对精确匹配"/login"，跳转Login页面
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: ( <Entry /> ),
    children: [
      {
        // 精确匹配"/home"，跳转Home页面
        path: '/home',
        element: <Home />,
      },
      {
        // 如果URL没有"#路由"，跳转Home页面
        path: '/',
        element: <Navigate to="/login" />,
      },
      {
        // 未匹配，，跳转Login页面
        path: '*',
        element: <Navigate to="/login" />,
      },
    ],
  },
])
