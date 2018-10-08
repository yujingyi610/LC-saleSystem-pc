import axios from "@/axios/api.js"
let api = '/api/finance';
let papi = '/api/project'
//  let api = '';

/*****************************************按揭银行*********************************************/

export function getAllBankList(params) {
  return axios.service({
    url: api+"/bankAccount/listBankRelation",
    method:'get',
    params
  })
}

export function getBankList(params){//获取银行列表
  return axios.service({
    url: api+"/bankAccount/listHeadOffice",
    method: 'get',
    params
  })
}

export function addSaveBank(data){
  return axios.service({
    url:api+"/bankAccount/save",
    method:'post',
    data
  })
}

export function deleteBank(params){
  return axios.service({
    url:api+"/bankAccount/delete",
    method:'post',
    params
  })
}

export function getDevstByid(params){
  return axios.service({
    url:papi+"/houseManage/devst/getById",
    method:'get',
    params
  })
}

export function setDefaultUse(params){
  return axios.service({
    url:api+"/bankAccount/often",
    method:'get',
    params
  })
}


/*******************************************获取当前服务器时间*********************************************/
export function getServerDate(){
  var xhr = null;
  if(window.XMLHttpRequest){
    xhr = new window.XMLHttpRequest();
  }else{ // ie
    xhr = new ActiveObject("Microsoft");
  }

  xhr.open("GET","/",false)//false不可变
  xhr.send(null);
  var date = xhr.getResponseHeader("Date");
  return new Date(date);
}

export function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]); return null;
};
//from "@/api/pages/mainPage/financialManagement/housingFund/index.js";
