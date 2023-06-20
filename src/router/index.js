import { createHashRouter, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../login/login'
import Entry from '../entry/index'
import baseRouterList from './base'


const routes = []
const files = require.context('./', true, /\.router\.js/)
files.keys().forEach(key => {
  files(key).default.forEach(ele => {
    routes.push(ele)
  })
})

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
    children: [...baseRouterList,...routes],
  },
])

export function PrivateRoute(props) {
  const common = useSelector((state) => state.common)
  console.log(common);
  // 判断localStorage是否有登录用户信息，如果没有则跳转登录页
  return common.token ? (
    props.children
  ) : (
    <Navigate to="/login" />
  )
}
