import axios from "@/axios/api.js"

var api = '/api/project';
// var api = '';



// 保存
export function saveTrdChange(data){
    return axios.service({
      url: api + "/trdChange/save",
      method: 'post',
      data
    })
}
// 提交
export function submitTrdChange(data){
    return axios.service({
      url: api + "/trdChange/submit",
      method: 'post',
      data
    })
}
// 获取列表
export function getList(params){
  return axios.service({
    url: api + "/trdChange/list",
    method: 'get',
    params
  })
}
// 获取详情
export function getInfo(params){
  return axios.service({
    url: api + "/trdChange/get",
    method: 'get',
    params
  })
}
// 删除
export function deleteTrdChange(data){
  return axios.service({
    url: api + "/trdChange/delete",
    method: 'post',
    data
  })
}

// 撤回
export function revokeTrdChange(data){
  return axios.service({
    url: api + "/trdChange/revoke",
    method: 'post',
    data
  })
}