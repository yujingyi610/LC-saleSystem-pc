import axios from 'axios'
import {
  getToken, removeToken
} from '../util/auth.js';

import {
  Message, MessageBox
} from 'element-ui';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 100000 // 请求超时时间
});

service.defaults.withCredentials=true;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(function(config) {
  if( config.url === 'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4' ){
    return config
  }
    // 获取TOKEN信息
    const token = getToken();
    if (token) {
        // 这里将token设置到headers中，header的key是Authorization
        config.headers.Authorization = token;
    }
    return config;
  }, function(error) {
    return Promise.reject(error);
  });
  // 响应拦截器
service.interceptors.response.use(
  response => {

    const res = response.data;
    if (response.status === 401||response.status === 40101) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // store.dispatch('FedLogOut').then(() => {
        //   location.reload(); // 为了重新实例化vue-router对象 避免bug
        // });
        //removeToken('crm-token')
        //this.$router.push({path : '/login'});
      })
      return Promise.reject('error');
    }
    // if (res.status === 40301) {
    //   Message({
    //     message: '当前用户无相关操作权限！',
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //   return Promise.reject('error');
    // }
    if ( response.status !== 200 ) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true,
      });
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000,
    //   showClose: true,
    // });
    return Promise.reject(error);
  }
);

// 封装axios的post请求
export function fetch(url, params) {

  return new Promise((resolve, reject) => {
    service.post(url,params)
      .then(response => {

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
 // 封装axios的get请求
export function get(url) {
  return new Promise((resolve, reject) => {
    service.get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        resolve(error);
        // reject(error);
      })
  })
}


export default {
  JH_news(url, params) {
    return fetch(url, params);
  },
  JH_news2(url) {
    return get(url);
  },
  service
}
