// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'url-search-params-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/file/iconfont.css'
import './assets/fonts/nav/iconfont.css'
import './assets/fonts/addnav/iconfont.css'
import axios from 'axios'
// import QRCode from 'qrcode'
import store from './store/index.js'
import qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.Axios = axios;
Vue.prototype.Qs = qs;
let $event = new Vue()
Vue.prototype.$event = $event;
Vue.prototype.otherCardNum = function(card) {// 证件号码不能超过9个中文或者18个英文字符，长度不能小于 2
  let flag3 = /[&#<>'"|+%;；《》‘“]+/.test(card) || card.indexOf('\\') !== -1;// 不能包含特殊字符& # < > ' \" | + %；
  if( flag3 ){
    return `证件号不能包含特殊字符& # < > ' \" | + %`
  }
  var len = 0;
  for (var i = 0; i < card.length; i++) {
    var a = card.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null){
      len += 2;
    }else{
      len += 1;
    }
  }
  if( len < 2 ){
    return '证件号码不能小于2位！'
  }else if( len > 18 ){
    return '证件号码不能超过9个中文或者18个英文字符'
  }else{
    return 1
  }
}
Vue.prototype.idCard = function(card) {// 身份证位数只能为15位或18位
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  return reg.test(card)
}
Vue.prototype.noHanzi = function(card, type) {// 证件类型为护照、港澳台居民往来通行证、外国人永久居留证，则其证件号码不能包含中文
  if( type === '护照' || type === '港澳台居民往来通行证' || type === '外国人永久居留证' ){
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g"); 
    if( reg.test(card) ){
      return '证件类型为' + type + '时，证件号码不能包含中文'
    }else{
      return 1
    }
  }else {
    return 1
  }
  
}
Vue.prototype.sexFlag = function(card, type, sex) {// 身份证上的性别与填写的性别不一致！
  if( type !== '居民身份证' && type !== '临时身份证' ){
    return 1
  }
  var sexno;
  if(card.length == 18){
      sexno = card.substring(16,17)
  }else if(card.length == 15){
      sexno = card.substring(14,15)
  }else{
      return '身份证位数只能为15位或18位!'
  }
  var tempid = sexno % 2;
  if((tempid == 0 && sex == '男') || (tempid == 1 && sex == '女')){
    return '身份证上的性别与填写的性别不一致！'
  }else{
    return 1
  }
}
Vue.prototype.isName = function(name) {
  var reg1 = /^\d+$/;
  let flag1 = reg1.test(name)// 姓名不能为纯数字
  if( flag1 ){
    return '姓名不能为纯数字'
  }
  var len = 0;
  for (var i = 0; i < name.length; i++) {
    var a = name.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null){
      len += 2;
    }else{
      len += 1;
    }
  }
  
  if( len > 30 ){// 姓名长度不能超过30字符或者15汉字
    return '姓名长度不能超过30字符或者15汉字'
  }
  let flag3 = /[&#<>'"|+%;；《》‘“]+/.test(name) || name.indexOf('\\') !== -1;// 不能包含特殊字符& # < > ' \" | + %；
  if( flag3 ){
    return `姓名不能包含特殊字符& # < > ' \" | + %`
  }
  return 1
}

Vue.prototype.Time = function(time) {
    let myDate = new Date(time);
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
    let day = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate();
    return year + '-' + month + '-' + day;
}
router.beforeEach((to, from, next) => {
  if (!store.state.user.token) {
    if (to.fullPath !== '/' && to.fullPath !== '/login') {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next('/');
      });
      return
    }
  }
  next();
})

// 引入mockjs
// require('../mock/mock')
import './filter'

/* eslint-disable no-new */
let main = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
Vue.filter('getYMD', function (input) {
  return input.split(' ')[0];
})



export default main;
