import { Navigate } from 'react-router-dom'
import NotFind from '../../404'

/**
 * 参数管理
 * */
const routerList = [
  {
    // 通用参数管理
    path: '/param/generalparam',
    element: <NotFind/>,
  },
]

export default routerList
