import axios from "@/axios/api.js"
let api = '/api/bpm'

// 获取业务表单数据
export function getformInfo(params){
  return axios.service({
    url: '/api/project/trdChange/get',
    method: 'get',
    params
  })
}


/******************工作流*********************/
// 获取流程数据
export function getApprovalHistory(params){
    return axios.service({
      url: api + '/workItem/approvalHistory',
      method: 'get',
      params
    })
}
// 同意修改意见人员列表
export function findCommentList(params){
  return axios.service({
    url: api + '/core/findCommentList',
    method: 'get',
    params
  })
}
// 同意
export function agree(data){
  return axios.service({
    url: api + '/core/handle',
    method: 'post',
    data
  })
}
// 退回修改
export function moveBack(data){
  return axios.service({
    url: api + '/core/moveback',
    method: 'post',
    data
  })
}
// 查询可打回的任务
export function findMoveBackTask(params){
  return axios.service({
    url: api + '/core/findMoveBackTask',
    method: 'get',
    params
  })
}
// 委托
export function transfer(data){
  return axios.service({
    url: api + '/core/transfer',
    method: 'post',
    data
  })
}
// 意见征询
export function additionTask(data){
  return axios.service({
    url: api + '/core/additionTask',
    method: 'post',
    data
  })
}
/******************工作流*********************/
// 获取待办列表
export function getWorkList(params){
  return axios.service({
    url: api + '/workItem/listPage',
    method: 'get',
    params
  })
}
// 获取列表
export function getMyList(params){
  return axios.service({
    url: api + '/workItem/listMyHisPage',
    method: 'get',
    params
  })
}
// 获取已办列表
export function getHisList(params){
  return axios.service({
    url: api + '/workItem/hisListPage',
    method: 'get',
    params
  })
}
// 获取流程节点详情
export function getById(params){
  return axios.service({
    url: api + '/workItem/getAPPById',
    method: 'get',
    params
  })
}



// --------------------------------工作台首页----------
//获取客户待办
//http://192.168.9.48:7008/api/sys/workbench/getNum--customerbacklog
export function customerBacklog(params){
  return axios.service({
    url: '/api/sys/workbench/getNum',
    method: 'get',
    params
  })
}


//获取公告列表
//http://192.168.9.48:7008/api/sys/workbench/wbNotice/list?pageNum=1&pageSize=20
export function announcementList(params){
  return axios.service({
    url: '/api/sys/workbench/wbNotice/list',
    method: 'get',
    params
  })
}


//-------------------------客户待办----------------

///获取未付款的签约单
//http://192.168.9.48:7008/api/project/trdSign/getNonpayment?pageNum=1&pageSize=20
export function noPayAnnouncement(params){
  return axios.service({
    url: '/api/project/trdSign/getNonpayment',
    method: 'get',
    params
  })
}

//获取未签约
//http://192.168.9.48:7008/api/project/trdSubscribeForm/getUnsign?pageNum=1&pageSize=20

export function noSignList(params){
  return axios.service({
    url: '/api/project/trdSubscribeForm/getUnsign',
    method: 'get',
    params
  })
}


//----------------------------------公告列表
//http://192.168.9.48:7008/api/sys/workbench/wbNotice/list?pageNum=1&pageSize=20
export function getAnnouncement(params){
  return axios.service({
    url: '/api/sys/workbench/wbNotice/list',
    method: 'get',
    params
  })
}

//信息来源
//http://192.168.9.48:7008/api/sys/workbench/wbNotice/deptlist
export function getSource(params){
  return axios.service({
    url: '/api/sys/workbench/wbNotice/deptlist',
    method: 'get',
    params
  })
}



//新增公告
//http://192.168.9.48:7008/api/sys/workbench/wbNotice/save

export function saveAnnouncement(data){
  return axios.service({
    url: '/api/sys/workbench/wbNotice/save',
    method: 'post',
    data
  })
}


//获取公告详情
//http://192.168.9.48:7008/api/sys/workbench/wbNotice/get?id=d%20
export function getMessages(params){
  return axios.service({
    url: 'api/sys/workbench/wbNotice/get',
    method: 'get',
    params
  })
}

//获取公告附件
export function getNoticeFiles(params){
  return axios.service({
    url: '/api/storage/files/getFilesById',
    method: 'get',
    params
  })
}


//删除公告
//http://192.168.9.48:7008/api/sys/workbench/wbNotice/delete?id=123

export function deteleAnnouncement(data){
  return axios.service({
    url: '/api/sys/workbench/wbNotice/delete',
    method: 'post',
    data
  })
}

//更新formId
export function updateFormId(params){
  return axios.service({
    url:'/api/storage/files/updateFormId',
    method:'get',
    params
  })
}

//获取实时动态
//http://192.168.9.48:7008/api/sys/workbench/getDPNum?projectId=123123&startTime=123&endTime=123

export function currentMes(params){
  return axios.service({
    url: '/api/sys/workbench/getDPNum',
    method: 'get',
    params
  })
}

//获取排行榜
//http://192.168.9.48:7008/api/project/workbench/ranking?projectId=12312
export function gerTop(params){
  return axios.service({
    url: '/api/project/workbench/ranking',
    method: 'get',
    params
  })
}

//排行榜二级切换（本日，本周，翻页）
//http://192.168.9.48:7008/api/project/workbench/rankingPage?projectId=123&pageNum=1&pageSize=20
export function gerTopPage(params){
  return axios.service({
    url: '/api/project/workbench/rankingPage',
    method: 'get',
    params
  })
}
