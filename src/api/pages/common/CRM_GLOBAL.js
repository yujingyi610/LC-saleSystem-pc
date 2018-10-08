//全局变量定义

//var REPORT_HOME_KHFX = process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/statistical/customerDemand.rpx";//工作台首页-客户分析
let REPORT_GLOBAL = {
    //客户分析
    HOME_KHFX:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/statistical/customerDemand.rpx",//工作台首页-客户分析
    DATA_PROJECT_DETAILTABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesDailyBriefDay.rpx",//数据分析-营销报表-项目销售日报简表
    DATA_DETAIL_TABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesDailyBriefDayDetail.rpx",//数据分析-营销报表-项目销售日报详表
    DATA_YEARS_DETAILTABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesYearsBrief.rpx",//数据分析-营销报表-历年销售情况统计
    DATA_STOCK_ANALYSIS:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesStockHouse.rpx",//数据分析-营销报表-存量房源分析
    DATA_STRUCK_TABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/houses/precinctStockSalesAnalysisReport.rpx",//数据分析-营销报表-去化结构表
    DATA_SALE_STRUCK_TABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesStructure.rpx",//数据分析-营销报表-项目销售结构表
    DATA_ACHIEVEMENT_RANK_TABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesPerformanceRanking.rpx",//数据分析-营销报表-经纪人业绩排名
    DATA_RETURNMONEY_STRUCK_TABLE:process.env.REPORT_ROOT + "reportJsp/showReport.jsp?rpx=/sales/salesCashCollection.rpx",//数据分析-营销报表-回款结构表

    DATA_DEBIT_DETAIL:process.env.REPORT_ROOT + "/reportJsp/showReport.jsp?rpx=/finance/financeReceiveReport.rpx",//数据分析-财务报表-收款明细表
    DATA_DEBIT_COUNT:process.env.REPORT_ROOT + "/reportJsp/showReport.jsp?rpx=/finance/totalFinanceReceiveReport.rpx",//数据分析-财务报表-收款统计表
    DATA_CONTRACT_DETAIL:process.env.REPORT_ROOT+"/reportJsp/showReport.jsp?rpx=/finance/signContractReceive.rpx",//数据分析-财务报表-签约合同收款明细表
    DATA_CONTRACT_COUNT:process.env.REPORT_ROOT+"/reportJsp/showReport.jsp?rpx=/finance/totalSignContractReceive.rpx",//数据分析-财务报表-签约合同收款汇总表
    DATA_SHOULD_DEBIT_DETAIL:process.env.REPORT_ROOT + "/reportJsp/showReport.jsp?rpx=/finance/receiveAmountDetails.rpx",//数据分析-财务报表-应收款余额明细表

    DATA_EVALUATE_SIGN_COUNT:process.env.REPORT_ROOT + "/reportJsp/showReport.jsp?rpx=/evaluate/signEvaluateStatistics.rpx",//数据分析--短信评价报表--签约评价统计
}
export default REPORT_GLOBAL
