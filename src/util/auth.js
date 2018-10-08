import Cookies from 'js-cookie'

const TokenKey = 'crm-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const Permission = 'permission-list'
//保存权限列表
export function setPermission(permissionList) {
  console.log('setPer',permissionList)

  //return Cookies.set(Permission, permissionList)
  return sessionStorage.setItem(Permission, JSON.stringify(permissionList))
}
//获取权限列表
export function getPermission() {
  //return Cookies.get(Permission)
  return sessionStorage.getItem(Permission)
}
//删除权限列表
export function removePermission() {
  //return Cookies.remove(Permission)
  return sessionStorage.removeItem(Permission)
}
// const userInfo = 'user-info'
//保存用户信息
export function setUserInfo(userInfo) {
  return sessionStorage.setItem('user-info', JSON.stringify(userInfo))
}

const customListFilter = 'custom-filter'

export function setCustomFilter(customFilter) {// 保存客户跟进模块筛选条件
  console.log(customFilter)

  return sessionStorage.setItem(customListFilter, customFilter)
}

export function getCustomFilter() {// 获取
  return sessionStorage.getItem(customListFilter)
}
export function removeCustomFilter() {// 删除
  // return Cookies.remove(customListFilter)
  return sessionStorage.setItem(customListFilter, '')
}