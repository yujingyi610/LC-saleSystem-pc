import axios from "@/axios/api.js"

var api = '/api/project';
// var api = '';

/******************房源管理父组件*********************/
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
// 通过项目获取分期
export function getDevstagesByPrjId(params) {
  return axios.service({
    url: api + "/houseManage/tree/getDevstagesByPrjId",
    method: 'get',
    params
  })
}

/******************房源管理父组件*********************/
//获取推盘列表
export function getPushPlates(params) {
  return axios.service({
    url: api + "/pushPlate/bath/list",
    method: 'get',
    params
  })
}

//获取完整推盘信息
export function getPushPlateViewsDto(params) {
  return axios.service({
    url: api + "/pushPlate/bath/getDetails",
    method: 'get',
    params
  })
}

//保存推盘信息
export function savePushPlate(data) {
  return axios.service({
    url: api + "/pushPlate/bath/save",
    method: 'post',
    data
  })
}

//修改推盘信息
export function upatePushPlate(data) {
  return axios.service({
    url: api + "/pushPlate/bath/update",
    method: 'post',
    data
  })
}

//删除推盘信息
export function deletePlushPlate(data) {
  return axios.service({
    url: api + "/pushPlate/bath/delete",
    method: 'post',
    data
  })
}

/******************房源认筹设置组件*********************/
//获取认筹设置信息
export function getRaiseSettingDto(params) {
  return axios.service({
    url: api + "/pushPlate/raise/setting/get",
    method: 'get',
    params
  })
}

//保存认筹设置信息
export function saveRaiseSetting(data) {
  return axios.service({
    url: api + "/pushPlate/raise/setting/saveOrUpdate",
    method: 'post',
    data
  })
}

/******************房源认购设置组件*********************/
//获取认购设置信息
export function getSubscripeSettingDto(params) {
  return axios.service({
    url: api + "/pushPlate/subscripe/setting/get",
    method: 'get',
    params
  })
}

//保存认购设置信息
export function saveSubscripeSetting(data) {
  return axios.service({
    url: api + "/pushPlate/subscripe/setting/saveOrUpdate",
    method: 'post',
    data
  })
}

/******************电子开盘——摇号相关组件*********************/
//摇中列表
export function getLotteListRecords(params) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/listRecords",
    method: 'get',
    params
  })
}

//获取摇号设置详情
export function getLotteSettingDto(params) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/setting/getDetails",
    method: 'get',
    params
  })
}

//摇号重置
export function lotteRest(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/rest",
    method: 'post',
    data
  })
}

//摇号
export function lotteRun(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/run",
    method: 'post',
    data
  })
}

//删除VIP
export function deleteVip(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/setting/deleteVip",
    method: 'post',
    data
  })
}

//设置摇号抽取个数
export function saveOrUpdateLotte(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/setting/saveOrUpdate",
    method: 'post',
    data
  })
}

//设置VIP
export function saveVip(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/setting/saveVip",
    method: 'post',
    data
  })
}

//批量设置VIP
export function batchSaveVip(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/setting/batchSaveVip",
    method: 'post',
    data
  })
}

//修改次序
export function updateOrderNum(data) {
  return axios.service({
    url: api + "/elecOpen/elec/lotte/setting/updateOrderNum",
    method: 'post',
    data
  })
}

/******************电子开盘——签到相关组件*********************/
//下载签到信息列表
export function getSignExportSignInfo(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/exportSignInfo",
    method: 'get',
    responseType: 'blob',
    params
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

//电子签到设置——导出认筹列表
export function getSignExport(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/export",
    method: 'get',
    responseType: 'blob',
    params
  })
}

//通过手机号/认筹号/省份证好获取设置过的认筹
export function getSignDto(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/get",
    method: 'get',
    params
  })
}

//查询项目下的推盘批次
export function getSignListBath(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/listBath",
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

//电子签到设置——获取开盘认筹列表
export function getSignListsign(params) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/listsign",
    method: 'get',
    params
  })
}

//电子签到设置——删除认筹
export function deleteSign(data) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/delete",
    method: 'post',
    data
  })
}

//电子签到设置——保存认筹
export function saveSign(data) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/setting/save",
    method: 'post',
    data
  })
}

//签到
export function signIn(data) {
  return axios.service({
    url: api + "/elecOpen/elec/sign/signIn",
    method: 'post',
    data
  })
}
/*********房源销控************/
//设置为可售不可售
export function setHouseStatus(data) {
  return axios.service({
    url: api + "/elecOpen/elec/saleControl/setHouseStatus",
    method: 'post',
    data
  })
}