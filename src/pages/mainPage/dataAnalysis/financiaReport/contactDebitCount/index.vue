<template>
  <div id="debitDetail">
    <header class="head-title">签约合同收款汇总表</header>
    <div class="head-container">
      <div class="box">
        <el-form ref="searchForm" :model="searchForm" label-width="150px" label-position="right">
          <el-form-item label="城市公司">
            <el-select v-model="searchForm.cityId" placeholder="请选择城市公司" @change="getProjectByCompanyId">
              <el-option
                v-for="item in cityOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同日期">
            <el-date-picker suffix-icon="el-icon-date" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="searchForm.contract_start_date"></el-date-picker> -
            <el-date-picker suffix-icon="el-icon-date" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="searchForm.contract_end_date"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <el-form ref="searchForm" :model="searchForm" label-width="120px" label-position="right">
          <el-form-item label="项目名称">
            <el-select v-model="searchForm.project_id" placeholder="请选择项目">
              <el-option
                v-for="item in projectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="clear: both"></div>
      <el-form>
        <el-form-item>
          <el-button style="float:right;margin-right:20px;" type="success" @click="exportExcel" v-show="isShow">导出</el-button>
          <el-button style="float:right;margin-right:20px;" type="success" @click="statistics">统计</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="clear:both"></div>
    <div id="iframeBox"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <iframe id="innerRame" style="width:100%!important;" name="child" :src="tableSrc" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  import CRM_GLOBAL from '@/api/pages/common/CRM_GLOBAL.js'
  import { loginUser } from "@/api/pages/login/index.js";
  import { getCityCompany,getProject } from "@/api/pages/mainPage/dataAnalysis/marketingReport"
  export default {
    data(){
      return{
        name:'收款明细表1',
        searchForm:{},
        tableSrc:null,
        projectOption:[],
        cityOption:[],
        isShow:false,
        uid:null,
        loading: false
      }
    },
    methods:{
      exportExcel:function(){
        child.window.exportExcel('report1');
      },
      statistics(){
        let project_city_id = typeof(this.searchForm.cityId)=='undefined'?'':this.searchForm.cityId==null?'':this.searchForm.cityId;
        let project_id = typeof(this.searchForm.project_id)=='undefined'?'':this.searchForm.project_id==null?'':this.searchForm.project_id;
        let contract_start_date = typeof(this.searchForm.contract_start_date)=='undefined'?'':this.searchForm.contract_start_date==null?'':this.searchForm.contract_start_date;
        let contract_end_date = typeof(this.searchForm.contract_end_date)=='undefined'?'':this.searchForm.contract_end_date==null?'':this.searchForm.contract_end_date;
        let user_id = this.uid;

        this.tableSrc = CRM_GLOBAL.DATA_CONTRACT_COUNT+"&project_id="+project_id+"&contract_start_date="+contract_start_date+"&contract_end_date="+contract_end_date+"&user_id="+user_id;

        if(this.tableSrc != null){
          this.isShow = true;
          this.loading = true;
        }else{
          this.isShow = false;
        }
      },
      getProjectByCompanyId:function(val){//根据项目公司ID获取项目
        let that = this;
        this.projectOption = [];
        let params = {
          id:val
        }
        getProject(params).then(function(res){
          if(res.status == 200){
            for(let i=0;i<res.data.length;i++){
              let opv = new Object();
              opv.label = res.data[i].name;
              opv.value = res.data[i].id;
              that.projectOption.push(opv);
            }
          }else{
            that.$message({
              message:res.message,
              type:'error'
            })
          }
        })
      },
    },
    created:function(){
      let that = this;
      loginUser().then(function(res){
        if(res.status == 200){
          that.uid = res.data.id;
          if(res.data.cityName != null && res.data.cityName != '' && typeof(res.data.cityName) != 'undefined'){//城市项目公司成员
            that.cityOption = [{label:res.data.cityName,value:res.data.cityId}];
            that.searchForm.cityId = that.cityOption[0].value;
            if(res.data.projects.length != 0 && res.data.projects.length != null && res.data.projects.length != '' && typeof(res.data.projects) != 'undefined'){
              //城市项目公司下成员，且拥有项目
              for(let i=0;i<res.data.projects.length;i++){//可供筛选的项目为自己所拥有的项目
                let obj = new Object();
                obj.label = res.data.projects[i].projectName;
                obj.value = res.data.projects[i].id;
                that.projectOption.push(obj);
              }
            }else{//城市项目公司下成员且没有项目
              that.getProjectByCompanyId(res.data.cityId);//获取当前所在城市公司下的项目
            }
          }else{//集团用户
            getCityCompany().then(function(res){//获取所有城市公司
              if(res.status == 200){
                for(let i=0;i<res.data.length;i++){
                  let opv = new Object();
                  opv.label = res.data[i].name;
                  opv.value = res.data[i].id;
                  that.cityOption.push(opv);
                }
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          }
        }else{
          that.$message({
            message:res.message,
            type:'error'
          })
        }
      })
    },
    mounted:function(){
      let wHeight = document.getElementsByClassName('page_2')[0].offsetHeight*0.88;
      let thisPage = document.getElementById('debitDetail');
      let headHeight = document.getElementsByClassName('head-container')[0].offsetHeight;
      thisPage.style = "min-height:"+wHeight+"px";
      let tableBox = document.getElementById('innerRame');
      tableBox.style = "min-height:"+parseFloat(wHeight-headHeight)+"px";

      if (tableBox.attachEvent){ // 监听iframe是否加载完毕
        tableBox.attachEvent("onload", ()=>{ 
          this.loading = false;
        }); 
      } else { 
          tableBox.onload = ()=>{ 
            this.loading = false;
        }; 
      } 
    }
  }
</script>

<style scoped>
  #debitDetail{
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
  .head-container .box{
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
    width:100%!important;
  }
</style>
