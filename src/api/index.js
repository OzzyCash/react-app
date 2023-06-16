import { post,download,formData } from './common.js'

const createCAndM = (className, methodName) => ({ className, methodName });

export const LoginService_login = params => {
  return post({ ...createCAndM('LoginService', 'login'), params })
}

export const LoginService_logout = () => {
  return post({ ...createCAndM('LoginService', 'logout') })
}

export const LoginService_ssoLogin = params => {
  return post({ ...createCAndM('LoginService', 'ssoLogin') , params})
}

/************************************** 用户相关 **************************************/
// 判断密码是否到期
export const UserManagerService_checkPassword = params => {
  return post({ ...createCAndM('UserManagerService', 'checkPassword'), params })
}
// 校验用户是否已登录
export const UserManagerService_checkIfOnline = params => {
  return post({ ...createCAndM('UserManagerService', 'checkIfOnline'), params })
}
// 重置密码
export const UserManagerService_resetPwdBySelf = params => {
  return post({ ...createCAndM('UserManagerService', 'resetPwdBySelf'), params })
}

export const UserManagerService_checkDeadline = params => {
  return post({ ...createCAndM('UserManagerService', 'checkDeadline'), params })
}
// 获取菜单名
export const MenuManagerService_currentUserMenu = () => {
  return post({ ...createCAndM('MenuManagerService', 'currentUserMenu') })
}
// 获取当前权限
export const MenuManagerService_currentOperationMap = () => {
  return post({ ...createCAndM('MenuManagerService', 'currentOperationMap') })
}
// 获取 全部用户信息
export const UserManagerService_getUserTaskProps = params => {
  return post({ ...createCAndM("UserManagerService", "getUserTaskProps"), params })
};
