import axios from "@/axios/api.js"

var api = '/api/project';
// var api = '';

/***************************************/
// 查询房间详情
export function getHouse(params){
    return axios.service({
      url: api + "/trdSign/getHouse",
      method: 'get',
      params
    })
}
// 获取银行数据
export function getBank(params){
  return axios.service({
    url: "/api/finance/bankAccount/listBankNames",
    method: 'get',
    params
  })
}
// 保存签约单
export function saveAdd(data){
  return axios.service({
    url: api + "/trdSign/save",
    method: 'post',
    data
  })
}
// 提交签约单
export function sendTrdSign(data){
  return axios.service({
    url: api + "/trdSign/submit",
    method: 'post',
    data
  })
}
// 获取签约分页
export function getList(params){
  return axios.service({
    url: api + "/trdSign/list",
    method: 'get',
    params
  })
}
// 获取签约详情
export function getInfo(params){
  return axios.service({
    url: api + "/trdSign/get",
    method: 'get',
    params
  })
}
// 删除
export function deleteTrdSign(data){
  return axios.service({
    url: api + "/trdSign/delete",
    method: 'post',
    data
  })
}
// 撤回
export function revokeTrdSign(data){
  return axios.service({
    url: api + "/trdSign/revoke",
    method: 'post',
    data
  })
}
// 通过手机号查找置业顾问
export function getUserByMobile(params){
  return axios.service({
    url: "/api/sys/user/getByMobile",
    method: 'get',
    params
  })
}
// 获取所有项目城市公司
export function getCityList(){
  return axios.service({
    url: "/api/project/houseManage/city/listall",
    method: 'get'
  })
}
// 查找项目公司分页
export function getProjectCompanyList(params){
  return axios.service({
    url: '/api/sys/orgUnit/getPorjectOrgByPCode',
    method: 'get',
    params
  })
}