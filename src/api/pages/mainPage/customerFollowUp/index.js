import axios from "@/axios/api.js"

// get 数据放在 params 中
// post 数据放在 data 中


/* -------------------------------客户管理---------------------------------------- */

//获取客户分页列表

export function getCustomerPaging(params){
  return axios.service({
    url:  `/api/custom/custom/list`,
    method: 'get',
    params,
  })
}

//查询项目
//http://192.168.9.48:7008/api/project/saleGroup/getProjectListByUserId?userId=123

export function getProjectName(params){
  return axios.service({
    url: `/api/project/saleGroup/getProjectListByUserId`,
    method: 'get',
    params,
  })
}

//保存客户简要信息
// http://192.168.9.48:7008/api/custom/custom/saveCustom

export function saveCustomerInformation(data){
  return axios.service({
    url:  `/api/custom/custom/saveCustom`,
    method: 'post',
    data,
  })
}

//通过项目id获取客户信息
// http://192.168.9.48/api/project/projectInfo/getById?id=478e279e37ad11e8af88005056b44833

export function getCustomerInformation (params){
  return axios.service({
    url: `/api/project/projectInfo/getById`,
    method: 'get',
    params,
  })
}

//根据id获取客户详情
//http://192.168.9.48:7008/api/custom/custom/getCustomInfoById?id=1

export function getCustomerDetails (params){
  return axios.service({
    url: `/api/custom/custom/getCustomInfoById`,
    method: 'get',
    params,
  })
}

//上传客户详细信息
//http://192.168.9.48:7008/api/custom/custom/saveCustomMore

export function uploadCustomerDetails(data){
  return axios.service({
    url:  `/api/custom/custom/saveCustomMore`,
    method: 'post',
    data,
  })
}

//获取城市三级树
export  function  getCityListForCascader(params) {
  return axios.service({
    url: "/api/sys/area/findByParentCode",
    method: 'get',
    params
  })
}

//获取获知途径

export function getLearnWayOne(data){
let key = '';
let value = '';
for(let key1 in data){
  key = key1;
  value = data[key1];
}
  let url = `/api/sys/dict/item/findDictIteymByDictType?${key}=${value}`;
  return axios.service({
    url,
    method: 'post',
  })
}

//获取客户标签
// http://192.168.9.48:7008/api/custom/custom/getCustomTagItemList
//http://192.168.9.48:7008/api/custom/custom/getCustomTagItemList

export  function  getTagListForCascader(data) {
  return axios.service({
    url: "/api/custom/custom/getCustomTagItemList",
    method: 'post',
    data
  })
}

//获取校验等级

//http://192.168.9.48/api/custom/groupLabel/getLabelByGroupCode?groupCode=customInfo,customPurchasingPower
//http://10.100.27.226:7008/api/custom/projectLabel/getLabelByGroupCode?projectId=13&groupCodes=1

export  function  getCheckLevel(params) {
  return axios.service({
    url: `/api/custom/projectLabel/getLabelByGroupCode`,
    method: 'get',
    params
  })
}

//新增客户判客
//http://192.168.9.48:7008/api/custom/custom/judgeCustom?projectId=1&mobile=1  

export  function  determineCustomer(params) {
  return axios.service({
    url: "/api/custom/custom/judgeCustom",
    method: 'get',
    params
  })
}


//添加跟进记录
//http://192.168.9.48:7008/api/custom/custom/saveFollowPC

export  function  addFollowRecord(data) {
  return axios.service({
    url: `/api/custom/custom/saveFollowPC`,
    method: 'post',
    data
  })
}

//http://192.168.9.48:7008/api/custom/custom/followCustom?customId=1&propertyConsultId=1&propertyConsultName=1

export  function  followCustom(params) { 
  return axios.service({
    url: `/api/custom/custom/followCustom`,
    method: 'get',
    params
  })
}


//激活商机
//http://192.168.9.48:7008/api/custom/custom/activateNiche?nicheId=123

export  function  activatOpportunity(params) { 
  return axios.service({
    url: `/api/custom/custom/activateNiche`,
    method: 'get',
    params
  })
}

//关闭商机
//http://192.168.9.48:7008/api/custom/custom/closeNiche?nicheId=1&reason=1

export  function  closeOpportunity(params) { 
  return axios.service({
    url: `/api/custom/custom/activateNiche`,
    method: 'get',
    params
  })
}


//放弃商机
//http://192.168.9.48:7008/api/custom/custom/giveupNiche?nicheId=123

export  function  giveUpOpportunity(params) { 
  return axios.service({
    url: `/api/custom/custom/giveupNiche`,
    method: 'get',
    params
  })
}


//get获取跟进记录list
//http://192.168.9.48:7008/api/custom/custom/getNicheFollowList?pageNum=1&pageSize=10&customId=123

export  function  getOpportunityList(params) { 
  return axios.service({
    url: `/api/custom/custom/getNicheFollowList`,
    method: 'get',
    params
  })
}

//获取关键行为列表  &&&   获取跟进方式
//http://192.168.9.48/api/sys/dict/item/findDictIteymByDictType?typeCode=KEYBEHAVIOR

export  function  getKeyBehavior(data) {
  return axios.service({
    url: `/api/sys/dict/item/findDictIteymByDictType?typeCode=${data.typeCode}`,
    method: 'post',
    data
  })
}

//编辑客户信息
//http://192.168.9.48:7008/api/custom/custom/saveCustomDetail


export  function  upDataCostom(data) {
  return axios.service({
    url: `/api/custom/custom/saveCustomDetailPC`,
    method: 'post',
    data
  })
}


//获取意向户号
//http://192.168.9.48/api/project/projectDevstages/selectAllProjectDevstages

export  function  getIntentionDoor(data) { 
  return axios.service({
    url: `/api/project/projectDevstages/selectAllProjectDevstages`,
    method: 'post',
    data
  })
}

//获取关键事件
//http://192.168.9.48:7008/api/custom/custom/getKeyeventList?pageNum=1&pageSize=10&nicheId=123

export  function  getImportantList(params) { 
  return axios.service({
    url: `/api/custom/custom/getKeyeventList`,
    method: 'get',
    params
  })
}



//获取销售团队下属成员

//http://192.168.9.48:7008/api/project/saleGroupUser/listUser?projectId=123&propertyConsultId=1231

export  function  getPropertyConsultant (params) { 
  return axios.service({
    url: `/api/project/saleGroupUser/listUser`,
    method: 'get',
    params
  })
}


//客户分配（分配置业顾问）、
//http://192.168.9.48:7008/api/custom/custom/customAllocation?customIds=1&propertyConsultId=1&propertyConsultName=1

export  function  distributionCustomers (params) { 
  return axios.service({
    url: `/api/custom/custom/customAllocation`,
    method: 'get',
    params
  })
}


//合并商机
//http://192.168.9.48:7008/api/custom/custom/nicheMergePC

export  function  mergerOpportunities(data) { 
  return axios.service({
    url: `/api/custom/custom/nicheMergePC`,
    method: 'post',
    data
  })
}

//通过id获取（楼栋，房号等）
//http://192.168.9.48:7008/api/project/houseManage/item/getItemRelById?id=096cd66d48c411e8af88005056b44833

export  function  getRoomNumber (params) { 
  return axios.service({
    url: `/api/project/houseManage/item/getItemRelById`,
    method: 'get',
    params
  })
}


/* -------------------------------职业顾问保护期---------------------------------------- */


/* -------------------------------项目标签管理---------------------------------------- */


/* -------------------------------集团标签管理---------------------------------------- */

// 集团标签管理 集团标签 列表
export function groupLabelManagementList(params){
  return axios.service({
    url: `/api/sys/dict/type/listAll`,
    method: 'get',
    params,
  })
}

// 集团标签管理 是否必须启用开关
export function groupLabelManagementSwitch(params){
  return axios.service({
    url: `/api/sys/dict/type/listAll`,
    method: 'get',
    params,
  })
}

// 集团标签管理  新增标签 提交
export function groupLabelManagementAdd(data){
  return axios.service({
    url:  `/api/sys/dict/item/saveOrUpdate`,
    method: 'post',
    data,
  })
}

// 集团标签管理  编辑标签 提交
export function groupLabelManagementEdit(data){
  return axios.service({
    url:  `/api/sys/dict/item/saveOrUpdate`,
    method: 'post',
    data,
  })
}

// 集团标签管理  删除标签
export function groupLabelManagementDelete(data){
  return axios.service({
    url:  `/api/sys/dict/item/saveOrUpdate`,
    method: 'post',
    data,
  })
}

/* -------------------------------置业顾问保护期---------------------------------------- */

// 置业顾问保护期 列表
export function careerAdvisorProtectionPeriodList(data){
  return axios.service({
    url:  `/api/sys/dict/item/saveOrUpdate`,
    method: 'post',
    data,
  })
}

// 置业顾问保护期 修改
export function careerAdvisorProtectionPeriodEdit(data){
  return axios.service({
    url:  `/api/sys/dict/item/saveOrUpdate`,
    method: 'post',
    data,
  })
}


//更换置业顾问
//http://192.168.9.48:7008/api/custom/custom/changePropertyConsult?customId=1&propertyConsultId=1&propertyConsultName=2

export function changeConsultant(params){
  return axios.service({
    url: `/api/custom/custom/changePropertyConsult`,
    method: 'get',
    params,
  })
}


//获取现有的客户标签
//http://192.168.9.48:7008/api/custom/custom/getCustomTagItemList

export function getCouter(params){
  return axios.service({
    url: `/api/custom/custom/getCustomTagItemList`,
    method: 'get',
    params,
  })
}

//手机号码设置常用
//http://192.168.9.48:7008/api/custom/custom/updateIsMain?customId=123&contactMethodId=1231231
export function telIsMain(params){
  return axios.service({
    url: `/api/custom/custom/updateIsMain`,
    method: 'get',
    params,
  })
}

//s设置其他联系人手机号码常用
//http://10.100.27.226:7008/api/custom/custom/updateContactIsMain?contactId=1231&contactMethodId=1231

export function orderTelIsMain(params){
  return axios.service({
    url: `/api/custom/custom/updateContactIsMain`,
    method: 'get',
    params,
  })
}


//上传导出筛选条件
//http://192.168.9.48:7008/api/custom/custom/selectCustomAndTag/downlond

// export function outPut(params){
//   return axios.service({
//     url: `/api/custom/custom/selectCustomAndTag/downlond`,
//     method: 'get',
//     params,
//   })
// }

export function outPut(data){
  return axios.service({
    url:  `/api/custom/custom/selectCustomAndTag/downlond`,
    method: 'post',
    headers: {
      'responseType':'blob',      
    },
    data,
  })
}


//客户复制

export function saveCopiedCustom(data){
  return axios.service({
    url:  `/api/custom/custom/saveCopiedCustom`,
    method: 'post',
    data,
  })
}