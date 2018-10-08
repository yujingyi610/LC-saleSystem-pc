import axios from "@/axios/api.js"

//获取项目列表list
//http://192.168.9.48:7008/api/custom/projectLabel/list?pageNum=1&pageSize=10

export function getProjectList(params){
  return axios.service({
    url: `/api/custom/projectLabel/list`,
    method: 'get',
    params,
  })
}


//获取城市公司
//http://192.168.9.48:7008/api/project/houseManage/city/listall

export function getCitycompanies(params){
  return axios.service({
    url: `/api/project/houseManage/city/listall`,
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


//新增客户标签
//http://192.168.9.48:7008/api/custom/groupLabel/saveOrUpdate

export function getLabel(data){
    return axios.service({
      url:  `api/custom/groupLabel/saveOrUpdate`,
      method: 'post',
      data,
    })
  }

//从标签库选取标签
//http://192.168.9.48:7008/api/custom/projectLabel/chooseFromLabelStore?projectId=123&groupLabelIds=12
//http://10.100.27.226:7008/api/custom/projectLabel/confirmChoose?projectId=1231231&groupLabelIds=1231

export function getLabelDatabase(params){
  return axios.service({
    url: `/api/custom/projectLabel/confirmChoose`,
    method: 'get',
    params,
  })
}

//根据id获取项目标签详情
//http://192.168.9.48:7008/api/custom/projectLabel/getProjectLabelInfoById?id=123

export function editProjectLabelDetails(params){
  return axios.service({
    url: `/api/custom/projectLabel/getProjectLabelInfoById`,
    method: 'get',
    params,
  })
}

//保存编辑项目标签
//http://192.168.9.48:7008/api/custom/projectLabel/update

export function editLabel(data){
  return axios.service({
    url:  `/api/custom/projectLabel/update`,
    method: 'post',
    data,
  })
}

  //获取集团标签分页列表
  //http://192.168.9.48:7008/api/custom/groupLabel/list?pageNum=1&pageSize=10
  ////http://127.0.0.1:7008/api/custom/groupLabel/chooseFromGroupLabelStore
export function getGroupLabel(params){
    return axios.service({
      url: `/api/custom/groupLabel/chooseFromGroupLabelStore`,
      method: 'get',
      params,
    })
  }


  //删除项目标签
  //http://192.168.9.48:7008/api/custom/projectLabel/delete?id=123

  export function deteleGroupLabel(params){
    return axios.service({
      url: `/api/custom/projectLabel/delete`,
      method: 'get',
      params,
    })
  }



