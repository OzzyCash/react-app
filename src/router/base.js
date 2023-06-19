import { Navigate } from 'react-router-dom'
import Home from '../home/home'
import NotFind from '../404'

const baseRouterList = [
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
    // 未匹配，，跳转404页面
    path: '*',
    element: <Navigate to="/404" />,
  },
  {
    // 404页面
    path: '/404',
    element: <NotFind/>,
  },
]

export default baseRouterList