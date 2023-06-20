import { Navigate } from 'react-router-dom'
import GeneralParamManage from '@/views/paramManage/generalParamManage/generalParamManage'

/**
 * 参数管理
 * */
const routerList = [
  {
    // 通用参数管理
    path: '/param/generalparam',
    element: <GeneralParamManage/>,
  },
]

export default routerList
