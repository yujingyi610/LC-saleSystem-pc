import axios from "@/axios/api.js"
let pApi = '/api/project';

/*****************************项目销售日报详表*******************************/
export function getCityCompany(){//获取城市公司
  return axios.service({
    url:pApi+"/houseManage/city/listall",
    method:'get',
  })
}

export function getProject(params){//根据城市公司ID获取项目
  return axios.service({
    url:pApi+"/houseManage/tree/getPrjByCityId",
    method:'get',
    params
  })
}

