import axios from "@/axios/api.js"

// var api = '';
var api = '/api/project';

/******************房源管理父组件*********************/
// 获取所有项目城市公司
export function getCityList(){
  return axios.service({
    url: api + "/houseManage/city/listall",
    method: 'get'
  })
}
// 通过城市公司获取项目
export function getPrjByCityId(params){
  return axios.service({
    url: api + "/houseManage/tree/getPrjByCityId",
    method: 'get',
    params
  })
}
// 通过项目获取推盘
export function getBathList(params){
  return axios.service({
    url: "/api/project/elecOpen/elec/sign/setting/listBath",
    method: 'get',
    params
  })
}
// 通过推盘获取楼栋
export function getHouseList(params){
  return axios.service({
    url: api + "/pushPlate/bulid/list",
    method: 'get',
    params
  })
}
// 通过楼栋ID获取楼栋列表
export function getHouseViewByBuildId(params){
  return axios.service({
    url: api + "/houseQuery/houseList",
    method: 'get',
    params
  })
}
