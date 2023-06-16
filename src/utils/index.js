/**
 * @description 工具类函数文件
 */

/**
 * 判断数据类型
 * @param {*} param 需要判断的数据
 * @param {String | Array} types 需要判断对应的类型 - ['string', 'number', ''boolean', ...]
 * @returns {Boolean} 返回判断结构
 */
 export const estimateType = (param, types) => {
  const TYPES = {
    'string': '[object String]',
    'number': '[object Number]',
    'boolean': '[object Boolean]',
    'object': '[object Object]',
    'array': '[object Array]',
    'date': '[object Date]',
    'function': '[object Function]',
    'null': '[object Null]',
    'undefined': '[object Undefined]'
  }
  let res = false
  if (types) {
    if (Array.isArray(types)) {
      res = !!types.find(item => Object.prototype.toString.call(param) === TYPES[item])
    } else {
      res = Object.prototype.toString.call(param) === TYPES[types]
    }
  }
  return res
}

/**
 * 设置缓存数据
 * @param {String} type 缓存类型 - 'session', 'local'
 * @param {String} key 缓存key
 * @param {*} value 缓存value
 */
export const setStorage = (type, key, value) => {
  const keyFlag = estimateType(key, 'string')
  const valueFlag = estimateType(value, ['string', 'number', 'boolean', 'object', 'array', 'date'])
  if (keyFlag && valueFlag) {
    window[`${type}Storage`].setItem(key, JSON.stringify(value))
  } else {
    const msg = !keyFlag ? '第一个参数必须为string' : "第二个参数为['string', 'number', 'boolean', 'object', 'array', 'date']"
    throw Error(msg)
  }
}

/**
 * 获取缓存数据
 * @param {String} type 缓存类型 - 'session', 'local'
 * @param {String} key 缓存key
 * @returns {*} 缓存value
 */
export const getStorage = (type, key) => {
  const flag =  estimateType(key, 'string')
  if (flag) {
    const res = window[`${type}Storage`].getItem(key)
    return res ? JSON.parse(res) : res
  } else {
    throw Error('参数必须是一个字符串')
  }
}

