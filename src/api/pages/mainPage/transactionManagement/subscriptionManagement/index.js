import axios from "@/axios/api.js"

var api = '/api/project';
// var api = '';

/***************************************/
// 查询认购设置信息
export function getSubscripeSetting(params){
    return axios.service({
      url: api + "/pushPlate/subscripe/setting/get",
      method: 'get',
      params
    })
}
// 通过用户获取认筹列表
export function getByUser(params){
    return axios.service({
      url: api + "/trdRaiseForm/getByUser",
      method: 'get',
      params
    })
}
// 删除认购
export function deleteTrdSubscribeForm(data){
  return axios.service({
    url: api + "/trdSubscribeForm/delete",
    method: 'post',
    data
  })
}
// 撤回
export function revokeTrdSubscribeForm(data){
  return axios.service({
    url: api + "/trdSubscribeForm/revoke",
    method: 'post',
    data
  })
}
// 认购详情
export function getTrdSubscribeForm(params){
    return axios.service({
      url: api + "/trdSubscribeForm/get",
      method: 'get',
      params
    })
}
// 条件查询认购列表
export function listTrdSubscribeForm(params){
    return axios.service({
      url: api + "/trdSubscribeForm/list",
      method: 'get',
      params
    })
}
// 保存认购
export function saveTrdSubscribeForm(data){
    return axios.service({
      url: api + "/trdSubscribeForm/save",
      method: 'post',
      data
    })
  }
  // 提交
export function sumbitOperationTrdSubscribeForm(data){
    return axios.service({
      url: api + "/trdSubscribeForm/sumbitOperation",
      method: 'post',
      data
    })
}