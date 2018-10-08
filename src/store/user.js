import {
  element,//获取按钮权限
  menus,//获取权限列表
  login,
  casLogin,
  logout
} from '../api/pages/login';

import {
  getToken,
  setToken,
  removeToken,
  removePermission,
  getPermission,
  setPermission,
  setUserInfo,
  setCustomFilter,
  getCustomFilter
} from '../util/auth.js';
import {
  Message
} from 'element-ui';

const user = {
  state: {
    userBtn : 'init',
    token: getToken(),
    topMenus:[],
    leftMenus:[],
    userInfo:undefined,
    projectList:[],
    permissionList:getPermission(),
    CustomFilter:getCustomFilter()
  },
  mutations: {
    SET_USER_BTN(state,data) {
      state.userBtn = data;
    },
    SET_TOKEN(state, data) {
      state.token = data;
    }
  },
  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      commit('SET_TOKEN', '');
      commit('SET_USER_BTN', '');
      removeToken();
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response;
          if (data.status === 500) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            });
            return Promise.reject('error');
          } else {
            setToken(data.token);
            commit('SET_TOKEN', data.token);
            resolve();
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    CasLogin({
      commit
    },params) {
      commit('SET_TOKEN', '');
      commit('SET_USER_BTN', '');
      removeToken();
      return new Promise((resolve, reject) => {
        casLogin(params).then(res => {
          // debugger;
          const data = res;
          if (data.status === 500) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            });
            return Promise.reject('error');
          } else {
            if (data.token != undefined){
              setToken(data.token);
              commit('SET_TOKEN', data.token);
              resolve();
              return;
            }
            if (data.urlToRedirectTo != undefined){
              window.location.href = data.urlToRedirectTo;
              return;
            }
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //登出
    LoginOut({
      commit
    }){
      commit('SET_TOKEN', '');
      commit('SET_USER_BTN', '');
      removePermission();
      removeToken();
      logout();
    },

     //获取权限
  getPermissionList({
    commit
  }){
    commit('SET_USER_BTN', '');
    removePermission()
    return new Promise((resolve,reject)=>{
        element().then((res)=>{         
          if(res){
            const dataList = res
            //console.log('获取了权限按钮',res)
            setPermission(dataList)
            commit('SET_USER_BTN',dataList);
            resolve();
          }else{
            return Promise.reject('error');
          }
        }).catch(error =>{
          reject(error);
        })
    })
  }


  },

 
}

export default user;
