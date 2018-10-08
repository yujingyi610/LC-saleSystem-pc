import axios from "@/axios/api.js"
let api = '/api/finance';
let pApi = '/api/project';
// let api = '';

/*****************************************收支管理*********************************************/

export function getBalanceList(params){//获取收支单分页列表
  return axios.service({
    url:api+"/balance/getList",
    method:'get',
    params
  })
}

export function getReceiveDetail(params){//获取收支单详情
  return axios.service({
    url:api+"/balance/getPaymentDetail",
    method:'get',
    params
  })
}

export function getDebitDetail(params){//获取收款单详情
  return axios.service({
    url:api+"/debit/getDebitFormDetailById",
    method:'get',
    params
  })
}

export function getRefundDetail(params){//获取退款单详情
  return axios.service({
    url:api+"/refund/getRefundFormDetailById",
    method:'get',
    params
  });
}

export function payMent(data){//收款
  return axios.service({
    url:api+"/balance/payment",
    method:'post',
    data
  });
}

export function editPayment(data){//编辑收款单
  return axios.service({
    url:api+"/debit/updateDebitForm",
    method:'post',
    data
  })
}

export function getRefundList(params){//获取退款单列表
  return axios.service({
    url:api+"/refund/getList",
    method:'get',
    params
  });
}

export function getDebitList(params){//获取收款单列表
  return axios.service({
    url:api+"/debit/getList",
    method:'get',
    params
  });
}

export function getRefundDetailForRefund(params){//获取退款单详情
  return axios.service({
    url:api+"/debit/getRefundDetail",
    method:'get',
    params
  })
}

export function saveRefund(data){//保存退款
  return axios.service({
    url:api+"/debit/refund",
    method:'post',
    data
  })
}

export function editRefundOrder(data){//编辑退款单
  return axios.service({
    url:api+"/refund/updateRefundForm",
    method:'post',
    data
  })
}

export function getPayMethods(){
  return axios.service({
    url:api+"/balance/getPayMethodList",
    method:'get'
  })
}

export function getBankList(params){
  return axios.service({
    url:api+"/subjectRelation/getBankNoList",
    method:'get',
    params
  })
}

export function getPosBankList(params){
  return axios.service({
    url:api+"/subjectRelation/getPOSChargeBankNoList",
    method:'get',
    params
  })
}

export function getRefundBankList(params){
  return axios.service({
    url:api+"/subjectRelation/getRefundChargeBankNoList",
    method:'get',
    params
  })
}

export function getCouldRefundList(params){
  return axios.service({
    url:api+"/debit/getCouldRefundBalanceFormList",
    method:'get',
    params
  })
}

export function getRefundDetailList(params){
  return axios.service({
    url:api+"/debit/getRefundDetailList",
    method:'get',
    params
  })
}

export function getInnerTransList(params){//获取内部转账分页列表
  return axios.service({
    url:api+"/balance/getTransferFormList",
    method:'get',
    params
  })
}

export function getCouldTransferList(params){//获取可转收款单列表
  return axios.service({
    url:api+"/debit/getTransferDebitFormList",
    method:'get',
    params
  })
}

export function sureTransfer(data){//确认转出
  return axios.service({
    url:api+"/debit/confirmTransfer",
    method:'post',
    data
  })
}

export function saveNewRefund(data){
  return axios.service({
    url:api+"/debit/saveRefundList",
    method:'post',
    data
  })
}

//已退款作废
export function deleteReturn(params){
  return axios.service({
    url:api+"/refund/refundCancellation",
    method:'get',
    params
  })
}

//已收款作废
export function deletePay(params){
  return axios.service({
    url:api+"/debit/debitCancellation",
    method:'get',
    params
  })
}
/**********************************************财务复核接口**********************************************/

export function getPageList(params){
  return axios.service({
    url:api+"/financeRecheck/getList",
    method:'get',
    params
  })
}

export function subCheck(data){//复核
  return axios.service({
    url:api+"/financeRecheck/recheck",
    method:'post',
    data
  })
}

export function reSubCheck(params){//反复核
  return axios.service({
    url:api+"/financeRecheck/againRecheck",
    method:'get',
    params
  })
}
/*******************************************获取houseFullName********************************************/

export function getHouseFullName(params){
  return axios.service({
    url:pApi+"/houseQuery/getByItemId",
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

