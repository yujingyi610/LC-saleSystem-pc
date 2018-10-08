import axios from "@/axios/api.js"

export function getProjectTree(){
  return axios.service({
    url: "/api/project/saleGroup/getPrjAndCityTree",
    method: 'get',
  })
}


export function getProjectTeam(params){
  return axios.service({
    url: "/api/project/saleGroup/getByProjectId",
    method: 'get',
    params
  })
}

export function addProjectTeam(data) {
  return axios.service({
    url: "/api/project/saleGroup/save",
    method: 'post',
    data
  })
}

export function updateProjectTeam(data) {
  return axios.service({
    url: "/api/project/saleGroup/update",
    method: 'post',
    data
  })
}

export function removeProjectTeam(params) {
  return axios.service({
    url: "/api/project/saleGroup/delete",
    method: 'post',
    params
  })
}

export function getSaleGroupUserList(params) {
  return axios.service({
    url: "/api/project/saleGroupUser/listBysaleGroupId?saleGroupId="+params,
    method: 'get'
  })
}

export function removeSaleGroupUser(params) {
  return axios.service({
    url: "/api/project/saleGroupUser/delete",
    method: 'post',
    params
  })
}


export function  editorSaleGroupUser(data) {
  return axios.service({
    url: "/api/project/saleGroupUser/update",
    method: 'post',
    data
  })
}

export function  addSaleGroupUsers(params,data) {
  return axios.service({
    url: "/api/project/saleGroupUser/batchSave",
    method: 'post',
    params,
    data
  })
}

export function  getTeamTreeList(params) {
  return axios.service({
    url: "/api/project/saleGroup/getByProjectIdNoTree",
    method: 'get',
    params
  })
}

export function getOrgUnitTree (params) {
  return axios.service({
    url: '/api/sys/orgUnit/tree',
    method: 'get',
    params
  })
}


export function getUserFromCompanies (params) {
  return axios.service({
    url: '/api/sys/user/list',
    method: 'get',
    params
  })
}

//搜索用户
export function searchUserFromCompanies(params){
  return axios.service({
    url: '/api/sys/user/list',
    method: 'get',
    params
  })
}










