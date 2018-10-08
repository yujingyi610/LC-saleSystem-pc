import axios from "@/axios/api.js"
let api = '/api/project';
// let api = '';

//添加和编辑模板
export function addAndEdit(data){
  return axios.service({
    url: api+"/printTemplate/save",
    method: 'post',
    data
  })
}

export function getModelList(params){
  return axios.service({
    url: "/api/sys/dict/item/findDictIteymByDictType",
    method: 'post',
    params
  })

}

export function getModelViewList(params){
  return axios.service({
    url: api+"/printTemplate/list",
    method: 'get',
    params
  })
}

export function getFieldSeting(params){
  return axios.service({
    url:api+"/printTemplate/setting/list",
    method: 'get',
    params
  })
}

export function getEditorDialog(params){
  return axios.service({
    url:api+"/printTemplate/setting/getByType",
    metgod: 'get',
    params
  })
}

export function deleteList(params) {
  return axios.service({
    url:api+"/printTemplate/delete",
    method:'post',
    params
  })
}

export function getModel(params){
  return axios.service({
    url:api+"/printTemplate/get",
    method:'get',
    params
  });
}
