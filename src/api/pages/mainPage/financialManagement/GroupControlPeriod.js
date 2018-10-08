import axios from "@/axios/api.js"

/*******************************************************************************/
export function getProjectDevstagesByProjectId(params){// 根据项目id获取分期
  return axios.service({
    url: '/api/project/projectDevstages/getProjectDevstagesByProjectId',
    method: 'get',
    params
  })
}

export function periods(data){//保存
  return axios.service({
    url: "/api/project/devstages/area/periods",
    method: 'post',
    data
  })
}


export function getCompanyInfoByDevstagesId(params){// 根据分期id获取项目公司
  return axios.service({
    url: '/api/project/projectDevstages/getCompanyInfoByDevstagesId',
    method: 'get',
    params
  })
}

export function configuration(params){// 根据分期id获取接口设置格式
  return axios.service({
    url: '/api/finance/configuration',
    method: 'get',
    params
  })
}

export function saveConfiguration(data){//保存接口设置格式
  return axios.service({
    url: "/api/finance/configuration/saveConfiguration",
    method: 'post',
    data
  })
}