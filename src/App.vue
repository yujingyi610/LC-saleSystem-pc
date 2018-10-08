<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'App',
  mounted(){
    // this.getZingYi()
  },
  created(){
    this.getZingYi()
  },
  methods:{
    getZingYi(){
      // console.log('过去按钮权限，并自定义指令v-has')
      //登录成功进行按钮权限控制
      Vue.directive('has', {
        bind: function(el, binding) {
          if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el);
          }
        }
      });
      
      //检验权限的方法
      Vue.prototype.$_has = function(value) {
        
        let isExist=false;
          //console.log('自定义中获取的权限')
        let buttonpermsStr=sessionStorage.getItem("permission-list");
        // console.log('自定义中获取的权限')
        if(buttonpermsStr==undefined || buttonpermsStr==null){
          return false;
        }
        let buttonperms=JSON.parse(buttonpermsStr);
        //console.log('自定义中获取的权限',sessionStorage.getItem("permission-list"))
        // console.log('自定义中获取的权限解析后',value)
        for(let i=0;i<buttonperms.length;i++){
          if(buttonperms[i].code === value){
            isExist=true;
            break;
          }
        }

        return isExist;
      };
    }
  }
}
</script>

<style>
  * {
    padding:0;
    margin:0;
  }
  html{
    overflow: hidden;
  }
  body{
    background-color: #f3f3f3;
  }
  .page_2 {
    position:absolute;
    top:0;
    bottom:0;
    left:180px;
    right: 0;
    background:#f3f3f3;
    padding:20px;
    overflow: auto;
    height:99%;
  }

.el-menu-vertical-demo .el-submenu__title i {
    color: #fff;
    right: 8px;
}
/**********二级菜单样式***********/
.el-menu-vertical-demo .el-menu{
  background: transparent;
}
/* .el-menu-vertical-demo .el-submenu.is-active .el-submenu__title{
  background: url('../static/images/common/check_bg.png') center right no-repeat;
} */
/* .el-menu-vertical-demo .el-submenu.is-active .el-submenu__title .icon_img{
  background: url('../static/images/common/home_check.png')!important;
} */
.el-menu-vertical-demo .el-submenu.is-active{
      background: rgba(0,0,0,0.3);
}
.el-menu-vertical-demo .el-submenu.is-active .el-submenu__title span{
  color: #fff;
}
.el-menu-vertical-demo .el-submenu.is-active .el-submenu__title{
  color: #FFF58D!important;
}
.el-menu-vertical-demo .el-submenu.is-active .el-submenu__title i{
  color: #FFF58D!important;
}
.page .el-menu-vertical-demo .el-menu-item.is-active{
  background: url('../static/images/common/check_bg.png') center right no-repeat;
  border-left: 4px solid #FFF58D;
}

.page .el-menu-vertical-demo .el-submenu .el-menu-item.is-active span{
  color: #FFF58D;
}
/***************************/

.el-submenu .el-submenu__title span{
  color: #fff;
}

  .el-submenu .el-menu-item{
    min-width: initial;
  }
  .page .el-submenu .el-menu-item span{
    font-size: 14px;
  }
  #organization .el-icon-caret-right:before {
    content: url(./assets/images/file_close.png);
  }
  #organization .el-tree-node__expand-icon.expanded {
    transform: rotate(0deg);
    content: url(./assets/images/fileopen.png);
  }
  #organization .el-tree-node__expand-icon.is-leaf {
    content: url(./assets/images/file.png);
  }
  #organization .el-tree-node__expand-icon+span::before {
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: -3px;
    width: 30px;
    height: 30px;
  }
  .widthall .el-form-item__content{
    width: 100%;
}
.buildingPage tr td,.buildingPage tr th{
  text-align: center;
}
.buildingPage tr td:first-child{
  background: #f5f7fa;
}
.buildingPage .normal tr td:first-child{
  background: #fff;
}
.buildingPage .el-table thead.is-group tr:nth-child(2) th:nth-child(n+2){
  background: #fff;
}
.noborder input{
  border: 0;
}
.noBgColor .el-table--enable-row-hover .el-table__body tr:hover td:nth-child(n+2){
  background: #fff!important;
}
.buildingPage .nobgColor tr td:first-child{
  background: #fff;
}
.noBgColor .el-table__row.hover-row td:nth-child(n+2){
  background: #fff;
}
/******************************/
  .pagePrimaryBtn{
    font-size: 12px;
    color: white;
    background-color: #4DBE61;
  }

  .pageSecondaryBtn{
    font-size: 12px;
    color: #4DBE61;
    border-color: #4DBE61;
    background-color: white;
  }

   .el-submenu__title:hover{background-color: transparent!important}
   #mainPage .el-menu-item:hover{background-color: transparent!important}
   #mainPage .el-menu-item:active{background-color: transparent!important}
   #mainPage .el-menu-item:focus{background-color: transparent!important}


.el-menu-vertical-demo.leftNav {
    width:180px;
    /*border-right: #007440 1px solid;*/
    background: url("/static/images/common/left_bg.png");
    background-size:100% 100%;
    background-repeat: repeat ;
    height: 102%;
    /* height: calc(100vh - 67px); */
    /*overflow: hidden;*/
}
.el-menu-vertical-demo.leftNav .el-menu-item {
    color: #fff
}

.el-menu-vertical-demo.leftNav span {
    font-size:14px;
}

  /*#team .el-tree-node__label{*/
    /*width: 100%;*/
    /*white-space: normal;*/
    /**/
  /*}*/
  #editorProject input::-webkit-input-placeholder{
    color:#606266;
  }
  #editorProject input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#606266;
  }
  #editorProject input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#606266;
  }
  #editorProject input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#606266;
  }

  /**********对话窗按钮颜色***********/
  #mainPage .el-button--primary{
    background-color: #4DBE61;
    border-color: #4DBE61;
  }

  /**********************价格管理***********************/
  /***********价格管理需要的卡片头部************/
  #mainPage #price #bottom_card  .el-card__header{
    /*padding: 18px 20px;*/
    border-bottom:none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  /*#mainPage #price #discountHeader .el-card__header{*/
    /*!*padding: 18px 20px;*!*/
    /*border-bottom:none!important;*/
    /*-webkit-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
  /*}*/

  #mainPage #price .noline .el-card__header{
    /*padding: 18px 20px;*/
    border-bottom:none!important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  #mainPage #price .discount .el-card__header{
    /*padding: 18px 20px;*/
    border-bottom:none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  #mainPage #price .el-dialog__body{
    padding: 20px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
  }

  #mainPage #price .upLoadBtn{
    width: 78px!important;
    height: 28px!important;
  }
  #mainPage #price .el-radio__input.is-checked+.el-radio__label {
     color: #808080;
  }

.icon_img{
  width: 16px;
  height: 16px;
  display: inline-block;
  background-size: 100% 100%;
}
#marketingControl .el-table th{
    padding: 0!important
}
</style>
