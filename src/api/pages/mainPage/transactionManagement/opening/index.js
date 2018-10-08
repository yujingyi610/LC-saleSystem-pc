import axios from "@/axios/api.js"

var api = '/api/project';

/***************************************/
// 通过身份证号，认筹号，手机号获取认筹信息
export function getSign(params){
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/get",
    method: 'get',
    params
  })
}
// 签到
export function signIn(data) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/signIn",
    method: 'post',
    data
  })
}
// 全部签到
export function signAll(data) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/batchSignIn",
    method: 'post',
    data
  })
}
// 全部重置
export function signRestAll(data) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/updateBatchSignIn",
    method: 'post',
    data
  })
}
//签到信息列表
export function getSignListSignInfos(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/listSignInfos",
    method: 'get',
    params
  })
}
//下载签到信息列表
export function getSignExportSignInfo(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/exportSignInfo",
    method: 'get',
    responseType: 'blob',
    params
  })
}
// 摇中列表
export function getlistRecords(params) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/listRecords",
    method: 'get',
    params
  })
}
// 摇号
export function lotteRun(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/run",
    method: 'post',
    data
  })
}
// 摇号重置
export function lotteRunRest(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/rest",
    method: 'post',
    data
  })
}