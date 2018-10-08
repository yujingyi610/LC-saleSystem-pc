import axios from "@/axios/api.js"
let api = '/api/finance';
// let api = '';

/*****************************************优惠券发放*********************************************/

export function getValueVoucherList(params){//获取优惠券分页列表
  return axios.service({
    url: api+"/ticket/grant/getList",
    method: 'get',
    params
  })
}

export function sendValueVoucher(data){//优惠券发放
  return axios.service({
    url: api+"/ticket/grant/grantTicket",
    method: 'post',
    data
  })
}

export function sendValueVoucherGroup(data){
  return axios.service({
    url: api+"/ticket/grant/batchGrantTicket",
    method: 'post',
    data
  })
}

export function batchDelete(params){//批量删除优惠券
  return axios.service({
    url: api+"/ticket/grant/batchDeleteTicket",
    method: 'get',
    params
  })
}

export function batchSubmit(params){//批量提交
  return axios.service({
    url: api+"/ticket/grant/batchSubmit",
    method: 'get',
    params
  })
}

export function deleteValueVoucher(params){//删除优惠券
  return axios.service({
    url: api+"/ticket/grant/delete",
    method: 'get',
    params
  })
}

export function getDetailById(params){//根据ID获取优惠券详情
  return axios.service({
    url: api+"/ticket/grant/getTicketInfoById",
    method: 'get',
    params
  })
}

export function submitSend(data){//提交发放
  return axios.service({
    url: api+"/ticket/grant/submitGrantTicket",
    method:'post',
    data
  })
}

export function updateValueVoucher(data){//更新优惠券
  return axios.service({
    url:api+"/ticket/grant/updateTicket",
    method:'post',
    data
  })
}

export function submitAll(){//全部提交
  return axios.service({
    url:api+"/ticket/grant/allSubmit",
    method:'get',
  })
}

export function checkValueVoucher(params){//审核
  return axios.service({
    url:api+"/ticket/grant/auditTicket",
    method:'get',
    params
  })
}

export function allCheck(params){//全部审核
  return axios.service({
    url:api+"/ticket/grant/allAuditTicket",
    method:'get',
    params
  })
}

export function checkGroup(params){//批量审核
  return axios.service({
    url:api+"/ticket/grant/batchAuditTicket",
    method:'get',
    params
  })
}

export function reCheck(params){//反审核
  return axios.service({
    url:api+"/ticket/grant/afterAuditTicket",
    method:'get',
    params
  })
}

export function allReCheck(){//全部反审核
  return axios.service({
    url:api+"/ticket/grant/allAfterAuditTicket",
    method:'get',
  })
}

export function reCheckGroup(params){//批量反审核
  return axios.service({
    url:api+"/ticket/grant/batchAfterAuditTicket",
    method:'get',
    params
  })
}

/****************************************优惠券转让**********************************************/

export function getTransferList(params){//获取优惠券转让列表
  return axios.service({
    url:api+"/ticket/transfer/getList",
    method:'get',
    params
  });
}

export function getTicketByUserId(params){//通过选择用户获取优惠券
  return axios.service({
    url:api+"/ticket/grant/getTicketListByUserId",
    method:'get',
    params
  });
}

export function getTransferDetailById(params){//根据ID获取优惠券详情
  return axios.service({
    url:api+"/ticket/transfer/getTicketTranInfoById",
    method:'get',
    params
  });
}

export function newAndEditTransfer(data){//新增编辑转让单
  return axios.service({
    url:api+"/ticket/transfer/saveOrUpdate",
    method:'post',
    data
  });
}

export function submitTransfer(data){//提交转让
  return axios.service({
    url:api+"/ticket/transfer/submitTicketTran",
    method:'post',
    data
  });
}

export function deleteTransfer(params){//删除转让单
  return axios.service({
    url:api+"/ticket/transfer/deleteTicketTran",
    method:'get',
    params
  })
}

export function checkTransfer(params){//审批转让单
  return axios.service({
    url:api+"/ticket/transfer/auditTicketTran",
    method:'get',
    params
  })
}

export  function resetTransfer(params){//撤回
  return axios.service({
    url:api+"/ticket/transfer/revocation",
    method:'get',
    params
  })
}

/************************************************优惠券使用管理接口***********************************************/
export function getUseList(params){//获取优惠券使用数据列表
  return axios.service({
    url:api+"/ticket/use/getList",
    method:'get',
    params
  });
}

export function elseUseApi(data){//其他使用接口
  return axios.service({
    url:api+"/ticket/use/elseUseTicket",
    method:'post',
    data
  });
}

export function submitElseUseApi(data){//提交其他使用优惠券
  return axios.service({
    url:api+"/ticket/use/submit",
    method:'post',
    data
  });
}

export function checkElseUseApi(params){//审核其他使用优惠券
  return axios.service({
    url:api+"/ticket/use/auditUseTicket",
    method:'get',
    params
  });
}

export function getOtherUseDetailById(params){//根据ID获取其他使用详情
  return axios.service({
    url:api+"/ticket/use/getTicketUseDetailByFormId",
    method:'get',
    params
  });
}



/**************************************************获取服务器当前时间**************************************/
export function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]); return null;
};

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

export function objLength(o) {
  var count = 0;
  for(var i in o){
    count ++;
  }
  return count;
  };
