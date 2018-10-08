import axios from "@/axios/api.js"
let api = '/api/finance';
let pApi = '/api/project';
// let api = '';

/*****************************************凭证管理*********************************************/

export function getVoucherList(params){//获取凭证分页列表
  return axios.service({
    url:api+"/financeRecheck/getList",
    method:'get',
    params
  })
}

export function getPreviewVoucher(params){//获取凭证预览详情
  return axios.service({
    url:api+"/voucher/previewVoucher",
    method:'get',
    params
  })
}

export function sureBuildVoucher(data){
  return axios.service({
    url:api+"/voucher/generateVoucher",
    method:'post',
    data
  })
}

export function getAllProjectCityCompany(){
  return axios.service({
    url:pApi+"/houseManage/city/listall",
    method:'get',
  })
}

export function getProjectByCityId(params){
  return axios.service({
    url:pApi+"/houseManage/tree/getPrjByCityId",
    method:'get',
    params
  })
}

export function getDevstById(params){
  return axios.service({
    url:pApi+"/houseManage/sync/getDevstByprjInfoId",
    method:'get',
    params
  })
}

export function getDevstByProjectId(params){//根据项目ID获取分期
  return axios.service({
    url:pApi+"/houseManage/devst/list",
    method:'get',
    params
  })
}

export function getAreaBydevstagesId(params){//根据分期ID获取组团
  return axios.service({
    url:pApi+"/houseManage/area/list",
    method:'get',
    params
  })
}

export function getQueryVoucherList(params){//获取凭证查询分页列表
  return axios.service({
    url:api+"/voucher/getList",
    method:'get',
    params
  })
}

export function seeVoucherView(params){//查看凭证
  return axios.service({
    url:api+"/voucher/getVoucherByBatchId",
    method:'get',
    params
  })
}

export function updateVoucherView(data){//修改凭证
  return axios.service({
    url:api+"/voucher/updateVoucher",
    method:'post',
    data
  })
}

export function deleteLocalVoucher(params){//删除本地凭证
  return axios.service({
    url:api+"/voucher/deleteLocalVoucher",
    method:'get',
    params
  })
}

export function deleteNcVoucher(params) {//删除NC凭证
  return axios.service({
    url:api+"/voucher/deleteNCVoucher",
    method:'get',
    params
  })
}

export function sendOutVoucher(params){//发送凭证
  return axios.service({
    url:api+"/voucher/sendVoucher",
    method:'get',
    params
  })
}

export function viewSendOutLog(params){//查看发送日志
  return axios.service({
    url:api+"/voucher/getSendVoucherLog",
    method:'get',
    params
  })
}

export function getSendLogList(params){
  return axios.service({
    url:api+"/sendHistory/getList",
    method:'get',
    params
  })
}
