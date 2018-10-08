import axios from "@/axios/api.js"

var api = '';

// 登录
export function login(data) {
  return axios.service({
    url: api + "/api/auth/jwt/token",
    method: 'post',
    data
  })
}

// 登录
export function casLogin(params) {
  return axios.service({ 
    url: api + "/api/auth/jwt/casToken",
    method: 'get',
    params
  })
}

// 登录用户
export function loginUser() {
  return axios.service({
    url: api + "/api/sys/user/loginUser",
    method: 'get',
  })
}
// 登出用户
export function logout() {
  return axios.service({
    url: api + "/api/auth/jwt/logout",
    method: 'get',
  })
}

// 菜单
export function menus() {
  return axios.service({
    url: api + "/api/sys/menu/user/authorityTree?rootType=pc",
    method: 'get'
  })
}

export function element(){
  return axios.service({
    url: api + "/api/sys/element/user/authorityElement",
    method: 'get'
  })
}