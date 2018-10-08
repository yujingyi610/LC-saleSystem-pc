import axios from "@/axios/api.js"
// 获取房源管理模块树状控件各个子节点数据
export function getHouseTreeChild(url){
  return axios.service({
    url: "/api/project" + url,
    method: 'get'
  })
}
//获取价格方案列表
export function getPriceSchemeList(params){
  return axios.service({
    url: "/api/project/priceScheme/list",
    method: 'get',
    params
  })
}

//获取价格方案
export function getPriceSchemeDetails(params){
  return axios.service({
      url: "/api/project/priceScheme/get",
      method: 'get',
      params
    })
}

//获取导入方案后的列表
export function getPriceBuildList() {
  return axios.service({
    url: "/api/project/priceScheme/exprotBuild",
    method: 'get',
  })
}

//保存价格方案
export function savePriceScheme(data){
  return axios.service({
    // url: "/priceScheme/save",
    url: "/api/project/priceScheme/save",
    method: 'post',
    data
  })
}

//保存调价方案
export function modifyPrice(data){
  return axios.service({
    url: "/api/project/priceScheme/save",
    method: 'post',
    data
  })
}

//完成折扣方案
export function completeDiscounts(data){
  return axios.service({
    url: "/api/project/priceScheme/discount/save",
    method: 'post',
    data
  })
}
//		获取折扣方案列表
export function getDiscountslist(params){
  return axios.service({
    url: "/api/project/priceScheme/discount/list",
    method: 'get',
    params
  })
}

//删除折扣方案
export function deleteDiscount(data){
  return axios.service({
    url: "/api/project/priceScheme/discount/delete",
    method: 'post',
    data
  })
}

//提交审批
export function submitExamination(params) {
  return axios.service({
    url: "/api/project/priceScheme/send",
    method: 'post',
    params
  })
}

//生效审批
export function commitPriceScheme(params) {
  return axios.service({
    url: "/api/project/priceScheme/commitPriceScheme",
    method: 'post',
    params
  })
}
//获取代办
export function getToDoList(params) {
  return axios.service({
    url: "/api/bpm/workItem/listPage",
    method: 'get',
    params
  })
}

//获取以办列表
export function getFinished(params) {
  return axios.service({
    url: "/api/bpm/workItem/hisListPage",
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
// 通过城市公司获取项目
export function getPrjByCityId(params){
  return axios.service({
    url: "/api/project/houseManage/tree/getPrjByCityId",
    method: 'get',
    params
  })
}


//获取城市方案
export function getPricecity(){
  return axios.service({
      url: "/api/project/houseManage/city/listall",
      method: 'get',
     
    })
}

//获取项目方案
export function getPriceproject(params){
  return axios.service({
      url: "/api/project/houseManage/tree/getPrjByCityId",
      method: 'get',
      params
    })
}

//获取分期
export function getProstages(params){
  return axios.service({
      url: "/api/project/houseManage/tree/getDevstagesByPrjId",
      method: 'get',
      params
    })
}

//获取区域
export function getProarea(params){
  return axios.service({
      url: "/api/project/houseManage/tree/getAreaByDevstId",
      method: 'get',
      params
    })
}

//获取楼栋
export function getProbuild(params){
  return axios.service({
      url: "/api/project/houseManage/tree/getItemByAreaIdOrParentId",
      method: 'get',
      params
    })
}

//获取房间
export function getProhouse(params){
  return axios.service({
      url: "/api/project/houseManage/house/getByBuildId",
      method: 'get',
      params
    })
}

//保存调价楼栋
export function getKeepbuild(data){
  return axios.service({
     url: "/api/project/priceScheme/area/save",
    method: 'post',
    data
  })
}

// 获取调价楼栋列表
export function getpriceSchemeAreaList(params){
  return axios.service({
      url: "/api/project/priceScheme/area/list",
      method: 'get',
      params
    })
}

//删除调价楼栋方案
export function deleteBuildList(data){
  return axios.service({
    url: "/api/project/priceScheme/area/delete",
    method: 'post',
    data
  })
}
//下载调价楼栋方案
export function uploadBuildInfor(params){
  return axios.service({
      url: "/api/project/priceScheme/house/downlond",
      method: 'get',
      params
    })
}

//导入调价楼栋方案
export function exportBuildList(data){
  return axios.service({
    url: "/api/project/priceScheme/house/exprot",
    method: 'post',
    data
  })
}

//编辑调价楼栋方案
export function geteditBuildInfor(params){
  return axios.service({
      url: "/api/project/priceScheme/bulid/list",
      method: 'get',
      params
    })
}

//查看调价楼栋方案
export function lookBuildInfor(params){
  return axios.service({
      url: "/api/project/priceScheme/house/list",
      method: 'get',
      params
    })
}

//删除调价方案
export function deletePriceScheme(data){
  return axios.service({
      url: "/api/project/priceScheme/delete",
      method: 'post',
      data
    })
}
//查看调价方案
export function getPriceScheme(params){
  return axios.service({
      url: "/api/project/priceScheme/get",
      method: 'get',
      params
    })
}

//获取折扣方式下拉数据
export function getOption(data){
  return axios.service({
      url: "/api/sys/dict/item/findDictIteymByDictType",
      method: 'post',
      data
    })
}
//撤回调价方案
export function revokePriceScheme(data){
  return axios.service({
      url: "/api/project/priceScheme/revoke",
      method: 'post',
      data
    })
}