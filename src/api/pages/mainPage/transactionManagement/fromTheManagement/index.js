import axios from "@/axios/api.js"
import qs from 'qs'
var api = '/api/project';

/******************查询相关父组件*********************/
// 获取所有项目城市公司
export function getCityList() {
  return axios.service({
    url: api + "/houseManage/city/listall",
    method: 'get'
  })
}

// 通过城市公司获取项目
export function getPrjByCityId(params) {
  return axios.service({
    url: api + "/houseManage/tree/getPrjByCityId",
    method: 'get',
    params
  })
}

//查询项目下的推盘批次
export function getBatchByPorject(params) {
  return axios.service({
    url: api + "/trdRaiseForm/batchList",
    method: 'get',
    params
  })
}

//根据项目id及手机号、客户姓名等获取客户信息
export function getCustomerInfo(params) {
  return axios.service({
    url: `/api/custom/custom/getCustomInfoList`,
    method: 'get',
    params,
  })
}

//获取label
export function getCustomerLabel() {
  // let params = {
  //   groupCodes: 'customInfo'
  // }
  // return axios.service({
  //   url: '/api/custom/projectLabel/getLabelByGroupCode',
  //   method: 'get',
  //   params
  // })
  let data = {
      typeCode: 'certificate_type'
  }
  data = qs.stringify(data)
  return axios.service({
      url: "/api/sys/dict/item/findDictIteymByDictType",
      method: 'post',
      data
  })
}

/******************认筹管理父组件*********************/
//认筹详情
export function getRaise(params) {
  return axios.service({
    url: api + "/trdRaiseForm/get",
    method: 'get',
    params
  })
}

//通过批次获取认筹列表
export function getRaiseByBatch(params) {
  return axios.service({
    url: api + "/trdRaiseForm/getByBatch",
    method: 'get',
    params
  })
}

//通过用户获取认筹列表
export function getRaiseByUser(params) {
  return axios.service({
    url: api + "/trdRaiseForm/getByUser",
    method: 'get',
    params
  })
}

//条件查询认筹列表
export function getRaiseList(params) {
  return axios.service({
    url: api + "/trdRaiseForm/list",
    method: 'get',
    params
  })
}

//业务操作
export function businessOperation(data) {
  return axios.service({
    url: api + "/trdRaiseForm/businessOperation",
    method: 'post',
    data
  })
}

//彻底删除认筹
export function deleteRaise(data) {
  return axios.service({
    url: api + "/trdRaiseForm/delete",
    method: 'post',
    data
  })
}

//删除认筹
export function deleteRaiseYn(data) {
  return axios.service({
    url: api + "/trdRaiseForm/deleteYn",
    method: 'post',
    data
  })
}

//保存认筹
export function saveRaise(data) {
  return axios.service({
    url: api + "/trdRaiseForm/save",
    method: 'post',
    data
  })
}
