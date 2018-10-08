function getData() {
	var message = document.getElementById('message')
	message.innerHTML = '步骤1'
	    //alert( shopInfId+productId+skuId+num);
    var Terminal = {
        // 辨别移动终端类型
        platform : function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                // android终端或者uc浏览器
                android : u.indexOf('Android') > -1
                || u.indexOf('Linux') > -1,
                // 是否为iPhone或者QQHD浏览器
                iPhone : u.indexOf('iPhone') > -1,
                // 是否iPad
                iPad : u.indexOf('iPad') > -1
            };
        }(),
        // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
        language : (navigator.browserLanguage || navigator.language)
        .toLowerCase()
    }


		   if (Terminal.platform.android) {
		   	    message.innerHTML = 'android'
		   	   // message.style.backgroundColor=blur
			 window.WebViewJavascriptBridge.callHandler(
                'submitFromWeb'
                , ''
                , function(responseData) {
                	alert('1231231321321')     
                	message.innerHTML = "data"+responseData
                    dataC = JSON.parse(responseData)
                  	
                  	$.ajax({ 
						type : "GET",
						dataType:"jsonp", 
						beforeSend: function(request) {
	                         request.setRequestHeader("Authorization", "131231");
	                     },
						url: "http://10.100.26.150:8006/workbench/getDPNum",
						 data:{
	                     	'projectId':dataC.projectId,
	                     	'propertyConsultId':'',
							'timeType':'DAY'
	                     },
						jsonpCallback:"jsonpCallback",
			
	                     success : function(data) {
	                     	//message.innerHTML = "成功"+data
	                         //var result = JSON.stringify(data); //json对象转成字符串
	                        //$("#text").val(result);receptionCustomCount
	                        console.log('chengg',data)
	                        var html = '<li><span>'+data.newCustomCount+'</span>今日新增客户</li>'
	                         html += '<li><span>'+data.receptionCustomCount+'</span>今日接待客户</li>'
	                         html += '<li><span>'+data.raiseCount+'</span>今日认筹</li>'
	                         html += '<li><span>'+data.subscribeCount+'</span>今日认购</li>'
	                         html += '<li><span>'+data.signCount+'</span>今日签约</li>'
	                         html += '<li><span>'+data.returnMoneyCount+'</span>今日回款</li>'
	                         console.log('html',html)
	                        $('#con_list').html(html)
	                    },
	                    
	                    error: function(res){
	                 		console.log("error",res); 
	                    }
                 });
  		
                }
            );
		} else if (Terminal.platform.iPhone) {
				message.innerHTML = '步骤2，I'
            setupWebViewJavascriptBridge(function(bridge) {
            	
            		bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
						message.innerHTML = '123123123'+data
						var responseData = { 'Javascript Sayshgggfhgfhfg':'Right back atcha!' }
						//log('JS responding with', responseData)
						responseCallback(responseData)
					})
            	
	            bridge.callHandler('SendUserInfo','',function(data){
	            	message.innerHTML = '步骤3，I'
                    //var obj = JSON.stringify(data);
                    //var dataA = JSON.parse(data)
                    var dataV = data
                    message.innerHTML = '2222'+dataV
                    
                    $.ajax({ 
							type : "GET",
							dataType:"jsonp", 
							beforeSend: function(request) {
		                         request.setRequestHeader("Authorization", "131231");
		                     },
							url: "http://10.100.26.150:8006/workbench/getDPNum",
							 data:{
		                     	'projectId':dataV.projectID,
		                     	'propertyConsultId':'',
								'timeType':'DAY'
		                     },
							jsonpCallback:"jsonpCallback",
				
		                     success : function(data) {
		                     	message.innerHTML = '1231231'
		                     	//message.innerHTML = "成功"+data
		                         //var result = JSON.stringify(data); //json对象转成字符串
		                        //$("#text").val(result);receptionCustomCount
		                        console.log('chengg',data)
		                        var html = '<li><span>'+data.newCustomCount+'</span>今日新增客户</li>'
		                         html += '<li><span>'+data.receptionCustomCount+'</span>今日接待客户</li>'
		                         html += '<li><span>'+data.raiseCount+'</span>今日认筹</li>'
		                         html += '<li><span>'+data.subscribeCount+'</span>今日认购</li>'
		                         html += '<li><span>'+data.signCount+'</span>今日签约</li>'
		                         html += '<li><span>'+data.returnMoneyCount+'</span>今日回款</li>'
		                         console.log('html',html)
		                        $('#con_list').html(html)
		                    },
		                    
		                    error: function(res){
		                 		console.log("error",res); 
		                 		message.innerHTML = 'error'
		                    }
		                });
                })
            })
		}
}


			function bridgeLog(logContent) {
			    document.getElementById("show").innerHTML = logContent;
	        }

			function connectWebViewJavascriptBridge(callback) {
			            if (window.WebViewJavascriptBridge) {
			                callback(WebViewJavascriptBridge)
			            } else {
			                document.addEventListener(
			                    'WebViewJavascriptBridgeReady'
			                    , function() {
			                        callback(WebViewJavascriptBridge)
			                    },
			                    false
			                );
			            }
			        }

	        connectWebViewJavascriptBridge(function(bridge) {
	            bridge.init(function(message, responseCallback) {
	                console.log('JS got a message', message);
	                var data = {
	                    'Javascript Responds': '测试中文!'
	                };
	
	                if (responseCallback) {
	                    console.log('JS responding with', data);
	                    responseCallback(data);
	                }
            });

            bridge.registerHandler("functionInJs", function(data, responseCallback) {
                document.getElementById("show").innerHTML = ("data from Java: = " + data);
	                if (responseCallback) {
	                    var responseData = "Javascript Says Right back aka!";
	                    responseCallback(responseData);
	                }
	            });
	        })
        
        function setupWebViewJavascriptBridge(callback) {
		    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		    window.WVJBCallbacks = [callback];
		    var WVJBIframe = document.createElement('iframe');
		    WVJBIframe.style.display = 'none';
		    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		    document.documentElement.appendChild(WVJBIframe);
		    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
		}
