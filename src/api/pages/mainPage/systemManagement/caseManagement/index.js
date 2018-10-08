import axios from "@/axios/api.js"

// 获取签到记录列表
export function receptionList(data){
  return axios.service({
    url: `/api/custom/case/getCaseSignListAll`,
    method: 'post',
    data,
  })
}
// 获取评价列表
export function getEvaluateVoList(params){
  return axios.service({
    url: `/api/custom/case/getEvaluateVoList`,
    method: 'get',
    params,
  })
}
  // 获取案场列表
  export function getAllProject(data){
    return axios.service({
      url: `/api/custom/case/getAllProjectInfo`,
      method: 'post',
      data,
    })
  }
/*********案场维护********/
// 新增或保存案场配置
export function caseSaveOrUpdate(data){
    return axios.service({
      url: `/api/custom/case/saveOrUpdate`,
      method: 'post',
      data,
    })
  }
  // 获取案场维护列表
export function GetCaseList(params){
    return axios.service({
      url: `/api/custom/case/getCstCaseFieldList`,
      method: 'get',
      params,
    })
  }
    // 获取案场详情
export function GetCaseInfo(params){
    return axios.service({
      url: `/api/custom/case/get`,
      method: 'get',
      params,
    })
  }
// 删除案场配置
export function deleteCase(data){
    return axios.service({
      url: `/api/custom/case/remove`,
      method: 'post',
      data,
    })
  }
// 获取版本信息
export function getIpadVersion(params){
  return axios.service({
    url: `/api/custom/case/getIpadVersion`,
    method: 'get',
    params,
  })
}
// 更新版本信息
export function updateIpadVersion(data){
  return axios.service({
    url: `/api/custom/case/updateIpadVersion`,
    method: 'post',
    data,
  })
}