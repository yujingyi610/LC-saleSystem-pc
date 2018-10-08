import axios from "@/axios/api.js"

//获取保护期list
//http://192.168.9.48:7008/api/custom/protection/listPage?pageNum=1&pageSize=10


export function getAcquisitionPeriod(params){
    return axios.service({
      url: `/api/custom/protection/listPage`,
      method: 'get',
      params,
    })
  }

 

  //更新保护期
  //http://192.168.9.48:7008/api/custom/protection/update
  export function upDataProjectList(data){
    return axios.service({
      url: `/api/custom/protection/update`,
      method: 'post',
      data,
    })
  }


