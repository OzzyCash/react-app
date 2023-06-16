import Axios from 'axios'
import createRequest from './request'
import { estimateType, } from '@/utils/index'

const url = '/RMIService'
const downloadUrl = '/RMIDownloadService'

const setParams = data => {
  const tag = sessionStorage.getItem('tag') ? JSON.parse(sessionStorage.getItem('tag')) :  {}
  const opMenu = tag.opMenu || ''
  if (estimateType(data.params, 'undefined')) data.params = []
  if (estimateType(data.params, 'object')) data.params = [data.params]
  if (data.params.length > 0) data.params[0].opMenu = opMenu
  data.params = JSON.stringify(data.params)
  return data
}

// 设置 FormData 参数
const setFormData = ({ className, methodName, params = {}, files = {}, config }) => {
  let paramsArray = []
  let formData = new FormData()
  formData.append('className', className)
  formData.append('methodName', methodName)
  for (let key in params) {
    paramsArray[paramsArray.length] = "'" + key + "':'" + params[key] + "'"
  }
  if (paramsArray.length > 0) {
    formData.append('params', paramsArray.join(','))
  }
  for (let key in files) {
    formData.append(key, files[key])
  }
  return formData
}

// post
export const post = params => {
  return new Promise((resolve, reject) => {
    createRequest('post').post(url, setParams(params)).then(res => {
      const flag = res.code === '000000'
      flag ? resolve(res) : reject(res.msg)
    }).catch(err => {
      reject(err.message || '未知错误')
    })
  })
}

// download
export const download = params => {
  return new Promise((resolve, reject) => {
    createRequest('download').post(downloadUrl, setParams(params)).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err.message || '未知错误')
    })
  })
}

// FormData请求
export const formData = (params) => {
  return new Promise((resolve, reject) => {
    createRequest('formData').post(url, setFormData(params), params.config).then(res => {
        res.code === '000000' ? resolve(res) : reject(res.msg)
    }).catch(err => {
      reject(err.message || '未知错误')
    })
  })
}

export const getDownload = url => {
  return new Promise((resolve, reject) => {
    Axios.get(url, { timeout: 1000 * 300, responseType: 'blob' }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err.message || '未知错误')
    })
  })
}
