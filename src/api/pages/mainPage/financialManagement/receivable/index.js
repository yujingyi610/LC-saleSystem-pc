import axios from "@/axios/api.js"
let api = '/api/finance';
// let api = '';
import qs from 'qs'
/*****************************************优惠券发放*********************************************/

export function getOverdueReason(){//获取逾期原因
    let data = {
        typeCode: 'OVERDUE_REASON'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getLoanPeriod(){//获取贷款期限
    let data = {
        typeCode: 'LOAN_PERIOD'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getMortgageProgress(){//获取按揭进度
    let data = {
        typeCode: 'MORTGAGE_PROGRESS'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getProjectProgressLoanLimits(){//获取工程进度放款限制
    let data = {
        typeCode: 'PROJECT_PROGRESS_LOAN_LIMITS'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getContractRiskClassification(){//获取合同风险分类
    let data = {
        typeCode: 'CONTRACT_RISK_CLASSIFICATION'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getContractTypes(){//获取合同类型
    let data = {
        typeCode: 'CONTRACT_TYPE'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getCustomClass(){//获取客户分类
    let data = {
        typeCode: 'CUSTOM_CLASS'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}
export function getLoanReferenceRate(){//获取贷款参考利率
    let data = {
        typeCode: 'LOAN_REFERENCE_RATE'
    }
    data = qs.stringify(data)
    return axios.service({
        url: "/api/sys/dict/item/findDictIteymByDictType",
        method: 'post',
        data
    })
}

export function getList(data){//获取分页列表
    return axios.service({
        url: api + "/receivable/getAccountReceivableProcessList",
        method: 'post',
        data
    })
}
export function getAccountReceivable(data){//获取应收盘点信息
    return axios.service({
        url: api + "/receivable/getReceivableInfoById",
        method: 'post',
        data
    })
}
export function receivableCheck(data){//应收盘点
    return axios.service({
        url: api + "/receivable/receivableCheck",
        method: 'post',
        data
    })
}

export function prosecute(data){//起诉
    return axios.service({
        url: api + "/receivable/prosecute",
        method: 'post',
        data
    })
}
export function getOverdueHistory(data){//获取已逾期历史数据
    return axios.service({
        url: api + "/receivable/getOverdueHistory",
        method: 'post',
        data
    })
}
export function exportExcel(data){// 导出excel
    return axios.service({
        url: api + "/receivable/exportExcel",
        method: 'get',
        responseType: 'blob',
        data
    })
}
// export function getOverdueList(data){//获取已逾期分页列表
//     return axios.service({
//         url: api + "/receivable/getOverdueList",
//         method: 'post',
//         data
//     })
// }
// export function getProsecuteList(data){//获取已起诉分页列表
//     return axios.service({
//         url: api + "/receivable/getProsecuteList",
//         method: 'post',
//         data
//     })
// }
// export function getMortgageList(data){//获取已按揭分页列表
//     return axios.service({
//         url: api + "/receivable/getMortgageList",
//         method: 'post',
//         data
//     })
// }


// export function prosecute(data){//起诉
//     return axios.service({
//         url: api + "/receivable/prosecute",
//         method: 'post',
//         data
//     })
// }
// export function getOverdueHistory(data){//获取已逾期历史数据
//     return axios.service({
//         url: api + "/receivable/getOverdueHistory",
//         method: 'post',
//         data
//     })
// }
// export function getOverdue(data){//获取已逾期详情
//     return axios.service({
//         url: api + "/receivable/getOverdue",
//         method: 'post',
//         data
//     })
// }
// export function getProsecuteById(data){//获取已起诉详情
//     return axios.service({
//         url: api + "/receivable/getProsecuteById",
//         method: 'post',
//         data
//     })
// }
// export function getMortgageById(data){//获取已按揭详情
//     return axios.service({
//         url: api + "/receivable/getMortgageById",
//         method: 'post',
//         data
//     })
// }