import axios from "@/axios/api.js"
/******************工作流*********************/
// 获取流程数据
export function getIDcardInfo(){
    return axios.service({
      url: 'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4',
      method: 'get'
    })
}