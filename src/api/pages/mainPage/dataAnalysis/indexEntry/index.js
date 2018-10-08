import axios from "@/axios/api.js"
 let api = '/api/project';
//let api = '';
//获取指标列表
//http://192.168.9.48:7008/api/project/indexManage/list?scope=1231&dateTag=123

  export function getIndexList(params){
    return axios.service({
      url: api +`/indexManage/list`,
      method: 'get',
      params,
    })
  }

  //保存项目月指标
  //http://192.168.9.48:7008/api/project/indexManage/project/month/save
  export function saveIndexMonth(params,data) {
    return axios.service({
      url:  api +`/indexManage/project/month/save`,
      method: 'post',
      params,
      data
    })
  }
  
  //保存项目年指标
  //http://192.168.9.48:7008/api/project/indexManage/project/year/save
export function saveIndexYear(params,data) {
    return axios.service({
      url:  api +`/indexManage/project/year/save`,
      method: 'post',
      params,
      data
    })
 }
  //保存个人月指标
  //http://192.168.9.48:7008/api/project/indexManage/person/month/save
export function saveIndexMonthP(params,data) {
    return axios.service({
      url:  api +`/indexManage/person/month/save`,
      method: 'post',
      params,
      data
    })
 }

  //保存个人年指标
  //http://192.168.9.48:7008/api/project/indexManage/person/year/save  
export function saveIndexYearP(params,data) {
    return axios.service({
      url:  api +`/indexManage/person/year/save`,
      method: 'post',
      params,
      data
    })
 }
  //获取综合指标比重
  //http://192.168.9.48:7008/api/project/indexManage/getRate  
  export function synthesizeProportion(params){
    return axios.service({
      url: api +`/indexManage/getRate`,
      method: 'get',
      params,
    })
  }

  //保存综合指标比重
  //http://192.168.9.48:7008/api/project/indexManage/saveRate
  export function saveSynthesize(data){
    return axios.service({
      url:  api +`/indexManage/saveRate`,
      method: 'post',
      data,
    })
  }