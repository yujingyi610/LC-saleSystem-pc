import Vue from 'vue'
import main from './main'


Vue.directive('btn', {
	inserted : function (el,binding) {
		let value = binding.value;
		let fn = () => {
			if(main.$store.state.userBtn !== 'init'){
				clearInterval(timer);
				if(main.$store.state.userBtn.indexOf(value) === -1){
                    el.parentNode.removeChild(el);
				}
			}
		}
		let timer; 
		setTimeout(() => {
			timer = setInterval(fn,0);
		},0);
	}
})


Vue.filter('TimeMoment', function(time) {
  let getTime = (time, type = 'all') => {
    let myDate = new Date(time);
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
    let day = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate();
    let hours = myDate.getHours() >= 10 ? myDate.getHours() : '0' + myDate.getHours();
    let minutes = myDate.getMinutes() >= 10 ? myDate.getMinutes() : '0' + myDate.getMinutes();
    let seconds = myDate.getSeconds() >= 10 ? myDate.getSeconds() : '0' + myDate.getSeconds();
    if (type === 'year') {
        return year;
    } else if (type === 'month') {
        return year + '-' + month;
    } else if (type === 'day') {
        return year + '-' + month + '-' + day;
    } else if (type === 'hours') {
        return hours;
    } else if (type === 'minutes') {
        return hours + '-' + minutes;
    } else if (type === 'seconds') {
        return hours + '-' + minutes + '-' + seconds;
    } else if (type === 'all') {
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
  }
  return getTime(time);
})




Vue.filter('PriceInWords', function(money) {// 金额转大写
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money == '') { return ''; }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  })