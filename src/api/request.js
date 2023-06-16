import { createHashHistory } from 'history'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/common'
import Axios from 'axios'
import Qs from 'qs'
import { getStorage } from '../utils/index'
// const getToken  = () => localStorage.getItem('token') || ""
// const setToken  = token => { localStorage.setItem('token', token) }

let history = createHashHistory()

export const goto = (path) => {
  history.push(path)
}


const CONFIG = {
  post: {
    timeout: 1000 * 360,
    transformRequest: [
      function (data) {
        data = Qs.stringify(data)
        return data
      }
    ]
  },
  download: {
    timeout: 1000 * 300,
    responseType: 'blob',
    transformRequest: [
      function (data) {
        data = Qs.stringify(data)
        return data
      }
    ]
  },
  formData: {
    timeout: 1000 * 60,
  }
}

export const BUSE = {
  // 10.22.82.150
  baseURL: 'http://10.22.82.150:8903/base.api',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true,

}

export const setConfig = (baseURL) => {
  CONFIG.baseURL = baseURL
}


// 登录失效，跳转登录界面
function ToLogin () {
  const dispatch = useDispatch()
  dispatch(setUser(null))
  // const route = Vue.prototype.$routers.history.current
  // store.commit('setUser', null)
  // if (route.path != '/login') {
  //   Vue.prototype.$routers.replace({
  //     path: '/login',
  //     query: { redirect: route.fullPath }
  //   })
  // }
}

// 设置拦截器
function interceptors (request) {

  // 请求拦截
  request.interceptors.request.use(config => {
    // 请求前一些什么
    // config.headers['token'] = getToken()
    config.headers['token'] = getStorage('session', 'token') || undefined
    return config
  }, err => {
    // 请求错误时做些什么
    return Promise.reject(err)
  })

  // 返回拦截
  request.interceptors.response.use(response => {
    // 对响应数据做些处理
    // let params = response.config.data + ""
    // if(params.indexOf("LoginService") != -1 && params.indexOf("login") != -1){
    //   setToken(response.headers['token'] || "")
    // }
    return response.data
  }, err => {
    // 响应错误做些什么
    err.response.status === 401 && ToLogin()
    return Promise.reject(err)
  })
}


export default function createRequest (type) {
  const request = Axios.create({ ...BUSE, ...CONFIG[type] })
  interceptors(request)
  return request
}
