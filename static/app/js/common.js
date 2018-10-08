var curWwwPath = window.document.location.href;
var pathName =  window.document.location.pathname;  
var pos = curWwwPath.indexOf(pathName);  
//var baseUrl = curWwwPath.substring(0,pos);/*初始化的方法*/
var baseUrl = 'http://10.100.25.188:8006'
//http://10.100.25.188:8006
document.cookie = 'crm-token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaW5saV9oeiIsInVzZXJJZCI6ImUyY2NhMDY4NDc2NjExZThhZjg4MDA1MDU2YjQ0ODMzIiwicmVhbE5hbWUiOiLmnpfnq4siLCJleHAiOjE1MjgxOTc1NjF9.pghH3ia_axK_yLJs2gRLyi2Swv3A0DxlK4IMX2dbLeo';