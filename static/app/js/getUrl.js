function getUrl(baseUrl,start,end){
	urlC = baseUrl+`/api/report/reportJsp/showReport.jsp?rpx=/statistical/appCustomerDemand.rpx&START_DATE=
        ${start}&END_DATE=${end}&project_id=${dataC.projectId}&property_consult_id=${dataC.userId}`
        
        $('.action').find('iframe').attr('src',urlC)
}
