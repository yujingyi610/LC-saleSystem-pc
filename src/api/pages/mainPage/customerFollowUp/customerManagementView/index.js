import axios from "@/axios/api.js"

let api = '/api/custom';
// let api = '';

//集团标签管理

//新增/跟新客户标签
//http://192.168.9.48:7008/api/custom/groupLabel/saveOrUpdate

export function getLabel(data){
    return axios.service({
      url:  api+`/groupLabel/saveOrUpdate`,
      method: 'post',
      data,
    })
  }

  //获取集团标签分页列表
  //http://192.168.9.48:7008/api/custom/groupLabel/list?pageNum=1&pageSize=10
  
export function getGroupLabel(params){
    return axios.service({
      url: api+`/groupLabel/list`,
      method: 'get',
      params,
    })
  }

  //获取集团标签分页
  //http://127.0.0.1:7008/api/custom/projectLabel/getLabelByGroupCode

  // export function getGroupLabel(params){
  //   return axios.service({
  //     url: api+`/projectLabel/getLabelByGroupCode`,
  //     method: 'get',
  //     params,
  //   })
  // }

  
  //删除集团标签
  //http://192.168.9.48:7008/api/custom/groupLabel/delete?id=1

  export function deteleGroupLabel(params){
    return axios.service({
      url: api+`/groupLabel/delete`,
      method: 'get',
      params,
    })
  }

  //编辑页面通过id获取集团标签详情
  //http://192.168.9.48:7008/api/custom/groupLabel/getGroupLabelInfoById?id=1
  
  export function editGroupLabel(params){
    return axios.service({
      url: api+`/groupLabel/getGroupLabelInfoById`,
      method: 'get',
      params,
    })
  }


  //获取数据字典list
  //http://192.168.9.48:7008/api/sys/dict/type/listAll
  export function getDictionary(params){
    return axios.service({
      url: `/api/sys/dict/type/listAll`,
      method: 'get',
      params,
    })
  }

  //根据数据类型获取字典条目
  //http://192.168.9.48:7008/api/sys/dict/item/findDictIteymByDictType?typeCode=123
  export function getDictionaryEntry(data){
    return axios.service({
      url:  `/api/sys/dict/item/findDictIteymByDictType`,
      method: 'post',
      data,
    })
  }

