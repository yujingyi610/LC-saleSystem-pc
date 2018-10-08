<template>
	<div id="projectDailySheet">
    <header class="head-title">签约评价统计表</header>
    <div class="head-container">
      
    </div>
    <div style="clear:both"></div>
    <div id="iframeBox">
      <iframe id="innerRame" style="min-height:365px;" :src="tableSrc" frameborder="0"></iframe>
    </div>
	</div>
</template>

<script>
  import CRM_GLOBAL from '@/api/pages/common/CRM_GLOBAL.js';
export default {
  data() {
    return {
      name:'签约评价统计表',
      tableSrc:null,
      isShow:false,
    };
  },
  methods: {
    statistics:function(){

      this.tableSrc = CRM_GLOBAL.DATA_EVALUATE_SIGN_COUNT;
      if(this.tableSrc != null){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    }
  },
  created() {
  },
  mounted:function(){
    let wHeight = document.getElementsByClassName('page_2')[0].offsetHeight*0.88;
    let thisPage = document.getElementById('projectDailySheet');
    let headHeight = document.getElementsByClassName('head-container')[0].offsetHeight;
    thisPage.style = "min-height:"+wHeight+"px";
    let tableBox = document.getElementById('innerRame');
    tableBox.style = "min-height:"+parseFloat(wHeight-headHeight)+"px";

    this.statistics()
  }
};
</script>

<style lang="scss" scoped>
  #projectDailySheet{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .head-title{
    border-bottom: solid thin #dcdfe6;
    line-height: 40px;
    font-size: 14px;
    text-indent: 1em;
    color: #4DBE61;
  }
  .head-container{
    padding-top:30px;
    overflow:hidden;
  }
  .head-container div{
    width: 50%;
    float: left;
  }
  #iframeBox{
    border-top:solid thin #dcdfe6;
    height:auto;
    width:98%;
    text-align:center;
    overflow-x:hidden;
    margin:0 auto
  }
  #innerRame{
    width:100%;
  }
</style>
