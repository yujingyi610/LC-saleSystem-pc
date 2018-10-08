import axios from "@/axios/api.js"
let api = '/api/project';
  // let api = '';
/******************房源管理父组件*********************/
// 获取房源管理模块树状控件数据
export function getHouseTreeAll(){
  return axios.service({
    url: api + "/houseManage/tree/all",
    method: 'get'
  })
}
// 获取房源管理模块树状控件数据
export function getHouseTree(){
  return axios.service({
    url: api + "/houseManage/city/listall",
    method: 'get'
  })
}
// 获取房源管理模块树状控件各个子节点数据
export function getHouseTreeChild(url){
    return axios.service({
      url: api + url,
      method: 'get'
    })
}
/*******************项目详情页面*******************/
// 获取项目详情页面上半部分项目详情数据
export function getProjectInfo(params){
    return axios.service({
      url: '/api/project/projectInfo/getById',
      method: 'get',
      params
    })
}
// 获取项目详情页面下半部分项目分期分页数据
export function getDevstList(params){
    return axios.service({
      url: api + '/houseManage/devst/list',
      method: 'get',
      params
    })
}
// 修改分期
export function updateDevst(data){
    return axios.service({
      url: api + '/houseManage/devst/update',
      method: 'post',
      data
    })
}
// 新增分期
export function saveDevst(data){
    return axios.service({
      url: api + '/houseManage/devst/save',
      method: 'post',
      data
    })
}
// 删除分期
export function deleteDevst(params){
    return axios.service({
      url: api + '/houseManage/devst/delete',
      method: 'post',
      params
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
// 通过城市公司name查找项目公司
export function getProjectCompanyAll(params){
  return axios.service({
    url: api + '/houseManage/sync/getPrjCompanyByCityCode',
    method: 'get',
    params
  })
}
// 通过项目公司ID查找项目
export function getPrjByCompanyId(params){
  return axios.service({
    url: api + '/houseManage/sync/getPrjByCompanyId',
    method: 'get',
    params
  })
}
// 通过项目ID查找分期
export function getDevstByprjInfoId(params){
  return axios.service({
    url: api + '/houseManage/sync/getDevstByprjInfoId',
    method: 'get',
    params
  })
}
// 引入分期
export function joinSync(data){
  return axios.service({
    url: api + '/houseManage/sync/join',
    method: 'post',
    data
  })
}
/*****************分期页面******************/
// 获取分期页面上半部分分期详情数据
export function getDevstInfo(params){
    return axios.service({
      url: api + '/houseManage/devst/getById',
      method: 'get',
      params
    })
}
// 获取分期页面下半部分区域/组团分页数据
export function getAreaList(params){
    return axios.service({
      url: api + '/houseManage/area/list',
      method: 'get',
      params
    })
}
// 新增区域
export function saveArea(data){
    return axios.service({
      url: api + '/houseManage/area/save',
      method: 'post',
      data
    })
}
// 修改区域
export function updateArea(data){
    return axios.service({
      url: api + '/houseManage/area/update',
      method: 'post',
      data
    })
}
// 删除区域
export function deleteArea(params){
    return axios.service({
      url: api + '/houseManage/area/delete',
      method: 'post',
      params
    })
}
// 获取项目业态
export function getFormat(params){
  return axios.service({
    url: '/api/project/projectInfo/format/list',
    method: 'get',
    params
  })
}
/**********分期页面户型相关*****************/
// 获取户型分页
export function getLayoutList(params){
  return axios.service({
    url: api + '/houseManage/layout/list',
    method: 'get',
    params
  })
}
// 获取户型详情
export function getLayoutInfo(params){
  return axios.service({
    url: api + '/houseManage/layout/getLayOutById',
    method: 'get',
    params
  })
}
// 新增户型
export function saveLayout(data){
  return axios.service({
    url: api + '/houseManage/layout/save',
    method: 'post',
    data
  })
}

// 修改户型
export function updateLayout(data){
  return axios.service({
    url: api + '/houseManage/layout/update',
    method: 'post',
    data
  })
}
// 删除户型
export function deleteLayout(data){
  return axios.service({
    url: api + '/houseManage/layout/delete',
    method: 'post',
    data
  })
}


/*****************区域页面******************/
// 获取区域页面上半部分区域详情数据
export function getAreaInfo(params){
    return axios.service({
      url: api + '/houseManage/area/getById',
      method: 'get',
      params
    })
}
// 获取区域页面下半部分楼栋分页数据
export function getBuildList(params){
    return axios.service({
      url: api + '/houseManage/build/list',
      method: 'get',
      params
    })
}
// 获取区域页面下半部分别墅区楼栋视图数据
export function getVillaView(params){
  return axios.service({
    url: api + '/houseManage/house/getHouseViewByAreaId',
    method: 'get',
    params
  })
}
// 获取引入楼栋的列表
export function getSyncBuildList(params){
  return axios.service({
    url: api + '/houseManage/sync/build/list',
    method: 'get',
    params
  })
}
// 引入楼栋
export function addFromBuild(data){
  return axios.service({
    url: api + '/houseManage/sync/build/join',
    method: 'post',
    data
  })
}
// 新增楼栋
export function saveBuild(data){
    return axios.service({
      url: api + '/houseManage/build/save',
      method: 'post',
      data
    })
}
// 修改楼栋
export function updateBuild(data){
    return axios.service({
      url: api + '/houseManage/build/update',
      method: 'post',
      data
    })
}
// 删除楼栋
export function deleteBuild(params){
    return axios.service({
      url: api + '/houseManage/build/delete',
      method: 'post',
      params
    })
}
/*****************楼栋页面******************/
// 获取楼栋页面上半部分楼栋详情数据
export function getBuildInfo(params){
    return axios.service({
      url: api + '/houseManage/item/getItemRelById',
      method: 'get',
      params
    })
}
// 获取楼栋页面下半部分房间视图
export function getHouseView(params){
    return axios.service({
      url: api + '/houseManage/house/getByBuildId',
      method: 'get',
      params
    })
}
// 获取单元视图分页数据
export function getUnitList(params){
    return axios.service({
      url: api + '/houseManage/unit/list',
      method: 'get',
      params
    })
}
// 新增单元
export function saveUnit(data){
    return axios.service({
      url: api + '/houseManage/unit/save',
      method: 'post',
      data
    })
}
// 更新单元
export function updataUnit(data){
    return axios.service({
      url: api + '/houseManage/unit/update',
      method: 'post',
      data
    })
}
// 删除单元
export function deleteUnit(data){
  return axios.service({
    url: api + '/houseManage/unit/delete',
    method: 'post',
    data
  })
}
// 批量生成房间
export function saveBathHouse(data){
  return axios.service({
    url: api + '/houseManage/house/saveBath',
    method: 'post',
    data
  })
}
/*****************单元页面******************/
// 获取单元页面上半部分单元详情数据
export function getUnitInfo(params){
  return axios.service({
    url: api + '/houseManage/item/getItemRelById',
    method: 'get',
    params
  })
}
// 获取单元页面下半部分房间分页
export function getHouseList(params){
  return axios.service({
    url: api + '/houseManage/house/list',
    method: 'get',
    params
  })
}
// 新增房间
export function saveHouse(data){
  return axios.service({
    url: api + '/houseManage/house/save',
    method: 'post',
    data
  })
}
// （批量）修改房间
export function upDateHouse(data){
  return axios.service({
    url: api + '/houseManage/house/updateBatch',
    method: 'post',
    data
  })
}
// 删除房间
export function deleteHouse(params){
  return axios.service({
    url: api + '/houseManage/house/delete',
    method: 'post',
    params
  })
}
// 获取单元楼层
export function getUnitFloor(params){
  return axios.service({
    url: api + '/houseManage/floor/getByUnitId',
    method: 'get',
    params
  })
}
// 获取单个房间数据
export function getHouseInfo(params){
  return axios.service({
    url: api + '/houseManage/item/getItemRelById',
    method: 'get',
    params
  })
}
// 新增楼层
export function saveFloor(params){
  return axios.service({
    url: api + '/houseManage/floor/add',
    method: 'get',
    params
  })
}
// 上传附件
export function upload(data){
  return axios.service({
    url: '/zuul/api/storage/files/multipart/file',
    method: 'post',
    data
  })
}
// 导入别墅
export const importVillaUrl = api + '/houseManage/house/importVilla';

// 获取户型
export function getHouseType(params){
  return axios.service({
    url: api + '/houseManage/layout/listAll',
    method: 'get',
    params
  })
}
// 获取三级业态
export function getLevel3(params){
  return axios.service({
    url: api + "/houseManage/format/getLevel3",
    method: 'get',
    params
  })
}
