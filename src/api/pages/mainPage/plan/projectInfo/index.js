import axios from "@/axios/api.js"
let api = '/api/project';
// let api = '';
// 获取二级业态
export function getLevel2(){
  return axios.service({
    url: api + "/houseManage/format/getLevel2",
    method: 'get'
  })
}

export function getProjectInfoList(params){
  return axios.service({
    url: api + "/projectInfo/list",
    method: 'post',
    params
  })
}

export function getCityCompanyList(){
  return axios.service({
    url: api + "/houseManage/city/listall",
    method: 'get',
  })
}

export function projectInfoDelete(params){
  return axios.service({
    url: api + "/projectInfo/delete",
    method: 'post',
    params
  })
}

export function getProjectInfoById(params){
  return axios.service({
    url: api + "/projectInfo/getById",
    method: 'get',
    params
  })
}

export function projectInfoSave(data){
  return axios.service({
    url: api + "/projectInfo/save",
    // url: "/api/project/projectInfo/save",
    method: 'post',
    data
  })
}

export function projectInfoUpdate(data){
  return axios.service({
    url: api + "/projectInfo/update",
    // url: "/api/project/projectInfo/update",
    method: 'post',
    data
  })
}

export  function  getCityListForCascader(params) {
  return axios.service({
    url: "/api/sys/area/findByParentCode",
    method: 'get',
    params
  })
}

/**********************QS测试案例**************************/

// export function test_test (params){
//   return axios.service({
//     url: "http://10.100.25.21:8006/userRole/saveOrUpdate",
//     method: 'post',
//     params
//   })
// }


export  function  deleteCarouselFig(params) {
  return axios.service({
    url: "/zuul/api/storage/files/delete",
    method: 'get',
    params
  })
}








