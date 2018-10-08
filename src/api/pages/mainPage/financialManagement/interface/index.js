import axios from "@/axios/api.js"
let api = '/api/finance';
// let api = '';

/*************************************会计科目设置******************************************/
export function getNodeTree(params){//获取科目详情树节点
  return axios.service({
    url: api+"/accountSubject/getSubjectTree",
    method: 'get',
    params
  })
}

export function addNodeTree(data){//新增科目详情
  return axios.service({
    url: api+"/accountSubject/saveAccountSubject",
    method: 'post',
    data
  })
}

export function deleteNodeTree(params){//删除科目树节点
  return axios.service({
    url: api+"/accountSubject/deleteAccountSubject",
    method: 'get',
    params
  })
}

export function getSubjectDtail(params){//根据id获取科目详情
  return axios.service({
    url: api+"/accountSubject/getAccountSubjectInfoById",
    method: 'get',
    params
  })
}

export function saveSubjectEdit(data){//保存编辑科目详情信息
  return axios.service({
    url: api+"/accountSubject/updateAccountSubject",
    method: 'post',
    data
  })
}

export function getCompanyTree(){
  return axios.service({
    url: api+"/accountSubject/getSubjectTree",
    method: 'get',
  })
}

/********************************************收付科目对照******************************************/

export function getSubjectTableList(params){//获取科目对照表
  return axios.service({
    url:api+"/subjectRelation/getSubjectRelationForm",
    method:'get',
    params
  })
}

export function getChargeProject(){//获取收费项目
  return axios.service({
    url:api+"/subjectRelation/getItemList",
    method:'get'
  })
}



export function buildRelation(data){//建立关系
  return axios.service({
    url:api+"/subjectRelation/buildSubjectRelation",
    method:'post',
    data
  })
}

export function deleteRelation(params){//删除关系
  return axios.service({
    url:api+"/subjectRelation/deleteSubjectRelation",
    method:'get',
    params
  })
}

export function deleteBorrowSubject(params){//删除借方科目
  return axios.service({
    url:api+"/subjectRelation/deleteDebitSubjectRelation",
    method:'get',
    params
  })
}

export function deleteLendSubject(params){//删除贷方科目
  return axios.service({
    url:api+"/subjectRelation/deleteCreditSubjectRelation",
    method:'get',
    params
  })
}

export function useToOtherProject(data){//用于其他项目
  return axios.service({
    url:api+"/subjectRelation/applyElse",
    method:'post',
    data
  })
}
