<template>
    <div class="login-box" id="login">
      <div class="login-container">
        <div class="logo_box">
          <img src="/static/images/common/bg_login_logo.png" />
        </div>
        <el-form :model="ruleForm" status-icon :rules="loginRules" ref="loginForm" label-width="0px" class="demo-ruleForm" style="font-size:14px ;color:#666">
          <el-form-item  prop="userName" >
            <el-input type="text" v-model="ruleForm.userName" auto-complete="off" placeholder="请输入用户名" style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item  prop="passWord">
            <el-input type="password" v-model="ruleForm.passWord" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" id="login-btn" @click="handleLogin('loginForm')">登录</el-button>
          </el-form-item>

        </el-form>
      </div>
      <!-- <test-temp></test-temp> -->
    </div>
</template>

<script>
//import test from '@/components/test'
import axios from "@/axios/api.js";
import Cookies from 'js-cookie' //引入cookie
import '@/assets/styles/login.scss';
import Vue from 'vue'
import {login} from '@/api/pages/login'
  export default {
    name: "longin",
    /* components: {
      'test-temp': test
    }, */
    data() {

      var checkUserName = (rule, value, callback)=>{
        if(!value){
          return callback( new Error('用户名不能为空') );
        }else{
          callback();
        }
      };

      var checkPassword = (rule, value, callback)=>{
        if(!value){
          return callback( new Error('密码不能为空') );
        }else{
          callback();
        }
      };


      return {
        disabled : false,
        /******表单验证******/
        ruleForm:{
          userName:'',
          passWord:""
        },
        loginRules:{
          userName:[
            {validator:checkUserName,trigger:'blur' }
          ],
          passWord:[
            {validator:checkPassword,trigger:'blur'}
          ]
        },
        /****页面基本信息*****/
        // pageMsg: {
        //   userNanmePlaceholder:{
        //     text:"请输入用户名"
        //   },
        //   userPasswordPlaceholder:{
        //     text:"请输入密码"
        //   },
        //   loginBtn:{    
        //     text:"登录"
        //   }
        // }
      }
    },
    created() {
      var lett = this;// 键盘事件，回车触发登录
      document.onkeydown = function(e){
        var key = window.event.keyCode;
        if(key === 13){
          lett.handleLogin('loginForm');
        }
      }
    },
    mounted(){
      if(Cookies.get('crm-token')){
        this.$router.push({
          path: '/mainpage'
        });
      }else{
        if(this.$route.path === '/'){
          this.$store.dispatch('CasLogin',{url:window.location.origin+"/#/mainPage"});
        }
      }
    },

    methods: {
      /**********登录按钮相关函数************/
      handleLogin(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            // this.disabled = true;
            let data = {
                username : this.ruleForm.userName,
                password : this.ruleForm.passWord,
              }
              this.$store.dispatch('Login', data).then(() => {
                this.$router.push({
                  path: '/mainpage'
                });
                // this.showDialog = true;

                //获取按钮权限
                this.$store.dispatch('getPermissionList').then(()=>{


                })

              }).catch(() => {
                    
              });
         
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">

  // .login-box {
  //   position: relative;
  //   width: 100%;
  //   height: 100%;
  //   height: 100vh;
  //   background-color: white;
  // }



  // .login-title {
  //   text-align: center;
  //   color: #007440;
  //   margin-bottom: 20px;
  // }

  // .login-input {
  //   margin-bottom: 20px;
  // }

  #login-btn {
    width: 100%;
    background-color: #007440;
    border-color: #007440;
  }

</style>
