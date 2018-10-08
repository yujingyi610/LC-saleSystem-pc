<template>
  <div class="main-page" id="mainPage">

    <el-menu :default-active="this.$route.path.split('/')[2]" class="el-menu-demo" mode="horizontal"
      @select="handleSelect" text-color="#fff" active-text-color="#FFF58D" router :style="{height: lineHeight}">
      <img src="static/images/common/logo.png" class="logo" :style="{width: logoWidth, margin: logoMargin}"/>
      <div style="float: right;outline:none">
        <div style="float: left;outline:none">
          <el-menu-item @click.native="handleMenuClick(item)" v-for="(item ,index) in topMenuList" :key = "index"
          :index="item.href.split('/')[2]" :route="item.href" class="titleNav" :style="{'line-height': lineHeight, 'font-size': fontSize}">{{item.label}}</el-menu-item>
        </div>

        <nav class="nav_right" :style="{'line-height': lineHeight}">
          <span class="userName">{{userInfo.realName}}</span>
          <img :src="imgUrl" :style="{marginTop: userImgMarginTop}" @click="handelLoginOut" @mouseover="change" @mouseout="change1"/>
          <!-- <li class="setting_img"><img src="static/images/common/setting.png" :style="{marginTop: settingImgMarginTop, width: settingImgWidth}"/></li>
          <li class="user_img"><img src="static/images/common/user.jpg" :style="{marginTop: userImgMarginTop, width: userImgWidth}"/></li> -->
        </nav>
      </div>
    </el-menu>
    <div style="clear:both;"></div>
    <leftMenu :leftMenuData="leftMenuData" />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
 import "@/assets/styles/index.css"
 import leftMenu from '@/components/leftMenu'
 import api from '@/axios/api.js'
 import Cookies from 'js-cookie'
 import {
  menus,
  element,
  loginUser
  } from '@/api/pages/login/index.js';
import { mapGetters } from 'vuex';
    export default {
      components : {leftMenu},
      data() {
        return {
          activeIndex: this.$route.path,
          clientHeight: '900',
          clientWidth: '1440',
          leftMenuData : [],
          topMenuList : JSON.parse(sessionStorage.getItem("menus")),
          userInfo:{},
          projectList:[],
          imgUrl: 'static/images/common/ic_exit_normal.png'
        };
      },
      computed: {
        lineHeight() {
          if( document.querySelector('.page') ){
            document.querySelector('.page').style.top = (75*this.clientWidth)/1440 + 'px';
          }

          return (75*this.clientWidth)/1440 + 'px';
        },
        fontSize() {
          return (18*this.clientWidth)/1440 + 'px';
        },
        logoWidth() {
          return (180*this.clientWidth)/1440 + 'px';
        },
        logoMargin() {
          return (17*this.clientWidth)/1440 + 'px' + ' ' + (12*this.clientWidth)/1440 + 'px';
        },
        userImgMarginTop() {
          return (26*this.clientWidth)/1440 + 'px';
        },
        userImgWidth() {
          return (42*this.clientWidth)/1440 + 'px';
        },
        settingImgMarginTop() {
          return (24*this.clientWidth)/1440 + 'px';
        },
        settingImgWidth() {
          return (28*this.clientWidth)/1440 + 'px';
        },
        ...mapGetters([
          'token'
        ])
      },
      methods: {
        handleSelect(key, keyPath) {
          //console.log(key,keyPath);
        },
        handleMenuClick(item) {
          this.leftMenuData = item.children;
        },
        handleLoginUser(){
          loginUser().then(res=>{
            if (res.status === 200) {
              this.userInfo = res.data;
              this.projectList = res.data.projects;
              //保存客户信息
              let expireDays = 1000 * 60 * 60 ;
              Cookies.set('session',res.data.id,expireDays); //设置Session
              document.cookie="userRealName="+escape(res.data.realName);
                Cookies.set('userRealPy',res.data.changeUserName,expireDays);
             sessionStorage.setItem("user-info", JSON.stringify(res.data));
            }
          })
        },
        handelLoginOut(){
          this.$store.dispatch('LoginOut').then(() => {
            sessionStorage.removeItem("menus");
            sessionStorage.removeItem("user-info");
            sessionStorage.removeItem("permission-list");
            this.$router.replace('/login');
          })
        },
        change() {
          this.imgUrl = 'static/images/common/ic_exit_hover.png';
        },
        change1() {
          this.imgUrl = 'static/images/common/ic_exit_normal.png';
        }
      },
      created() {
        if (!this.$store.state.user.token){
          this.$router.replace('/');
          return;
        }
        this.handleLoginUser();
      },
      mounted() {
        // 动态设置背景图的高度为浏览器可视区域高度

        // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
        this.clientHeight = document.documentElement.clientHeight >= 500?document.documentElement.clientHeight:500;
        this.clientWidth = document.documentElement.clientWidth >= 1024?document.documentElement.clientWidth:1024;
        // console.log(this.clientWidth)
        if( document.querySelector('.page') ){
          document.querySelector('.page').style.height = (825*this.clientHeight)/900 - 37 + 'px';
          document.querySelector('.page').style.width = this.clientWidth + 'px';
        }
        if( document.querySelector('.el-menu-vertical-demo') ){
            //document.querySelector('.el-menu-vertical-demo').style.width = (200*(825*this.clientHeight)/900)/825 + 'px';
          }
        if( document.querySelector('.page_2') ){
            //document.querySelector('.page_2').style.left = (200*(825*this.clientHeight)/900)/825 + 'px';
          }
        // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
        const that = this;
        window.onresize = function temp() {
            // return;
            that.clientHeight = document.documentElement.clientHeight >= 500?document.documentElement.clientHeight:500;
            that.clientWidth = document.documentElement.clientWidth >= 1024?document.documentElement.clientWidth:1024;
            let pageHeight = (825*that.clientHeight)/900 - 38;
            if( document.querySelector('.page') ){
              document.querySelector('.page').style.height = pageHeight + 'px';
              document.querySelector('.page').style.width = that.clientWidth + 'px';
            }
            if( document.querySelector('.el-menu-vertical-demo') ){
              document.querySelector('.el-menu-vertical-demo').style.width = (200*pageHeight)/825 + 'px';
            }
            if( document.querySelector('.page_2') ){
              document.querySelector('.page_2').style.left = (200*pageHeight)/825 + 'px';
            }
            if( document.querySelector('.el-menu-demo') ){
              document.querySelector('.el-menu-demo').style.width = that.clientWidth + 'px';
            }
        };

        if(!this.leftMenuData || this.leftMenuData.length == 0){
          if(this.topMenuList){
            let path = this.$route.path;
            this.topMenuList.map((v,k) => {
              if(v.href.split("/")[2] == path.split("/")[2]){
                this.leftMenuData = v.children;
              }
            });
          }
        }

      }
    }
</script>

<style lang="scss" scoped>
  // @import '@/assets/styles/index.scss'; // 全局自定义的css样
  .titleNav{
  	float: left;
  }
  .el-menu-demo{
    background: url("/static/images/common/top_bg.png");
    background-size:100% 100%;
  }
  .logo {
    float:left;
    margin: 17px 12px 18px;
  }
  .nav_right {
    float:right;
    color:#fff;
    font-size:12px;
    margin-left: 60px;
    position: relative;
  }
  // .nav_right:hover img{
  //   // background: rgba($color: #000000, $alpha: 0.2)
  //   // background-image: url('../../../static/images/common/ic_exit_hover.png');
  //   // border: 0;
  // }
  .nav_right::before{
    content: '';
    border-left: 1px solid #2c766a;
    height: 70%;
    position: absolute;
    left: 2px;
    top: 15%
  }
  .nav_right .userName{
    float: left;
    margin-right: 12px;
    font-size: 12px;
    margin-left: 22px;
    color: #64b1a3;
  }
  .nav_right img{
    float: left;
    margin-right: 22px;
    cursor: pointer;
        width: 22px;
  }
  .nav_right li {
    float:left;
    margin-right: 30px;
  }
  .nav_right li.user_img img{
    border-radius: 50%;
  }
  .nav_right li.setting_img img{
    margin-top: 24px;
  }
  .page {
    width:100%;
    position:absolute;
    left:0;
    top:70px;
    bottom:0;
    background:#fff;
  }
  #mainPage .el-menu--horizontal .el-menu-item.is-active{
  border-bottom: 0;
  position: relative;
  // border-top: 9px solid #FFF58D;
}
#mainPage .el-menu--horizontal .el-menu-item.is-active::before{
  content: '';
  position: absolute;
  width: 63px;
  height: 9px;
  background-color: #FFF58D;
  left: 24px;
}



</style>
