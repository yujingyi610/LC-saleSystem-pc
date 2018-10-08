<template>
  <div id="projectSalesDaily" class="projectDailySheet">
    <header class="head-title">项目销售结构表</header>
    <div class="head-container">
      <div>
        <el-form ref="searchForm" :model="searchForm" label-width="150px" label-position="right">
          <el-form-item label="城市公司">
            <el-select v-model="searchForm.cityId" multiple style="width: 250px" placeholder="请选择城市公司" @change="getProjectByCompanyId">
              <el-option
                v-for="item in cityOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管控类型">
            <el-select v-model="searchForm.escrowType" placeholder="请选择管控类型">
              <el-option label="投资" value="0"></el-option>
              <el-option label="代建" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资金是否包括定金">
            <el-checkbox v-model="searchForm.isMoney" :true-label="1" :false-label="0"></el-checkbox>
          </el-form-item>
          <el-form-item label="指标类型">
            <el-select v-model="searchForm.indexType" placeholder="请选择管控类型">
              <el-option label="考核指标" value="0"></el-option>
              <el-option label="奖励指标" value="1"></el-option>
              <el-option label="挑战指标" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form ref="searchForm" :model="searchForm" label-width="120px" label-position="right">
          <el-form-item label="项目名称">
            <el-select v-model="searchForm.projectId" clearable placeholder="请选择项目" :disabled="disabledFlag">
              <el-option
                v-for="item in projectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form label-width="120px" label-position="right">
          <el-form-item label="资金复核状态">
            <el-radio-group v-model="searchForm.isChecked" style="vertical-align:middle">
              <el-radio label="unRecheck">未复核</el-radio>
              <el-radio label="rechecked">复核通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合同审核状态">
            <el-radio-group v-model="searchForm.status" style="vertical-align:middle">
              <el-radio label="SUBMIT">待提交</el-radio>
              <el-radio label="APPROVED">已审批</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="统计日期">
            <el-date-picker suffix-icon="el-icon-date" type="date" :clearable="false" placeholder="请选择日期" v-model="searchForm.date"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button style="float:right;margin-right:20px;" type="success" @click="exportExcel" v-show="isShow">导出</el-button>
            <el-button style="float:right;margin-right:20px;" type="success" @click="statistics">统计</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div style="clear:both"></div>
    <div id="iframeBox"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <iframe id="innerRame" style="min-height:365px;" :src="tableSrc" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  import CRM_GLOBAL from '@/api/pages/common/CRM_GLOBAL.js'
  import { loginUser } from "@/api/pages/login/index.js";
  import { getCityCompany,getProject } from "@/api/pages/mainPage/dataAnalysis/marketingReport"
  export default {
    data() {
      return {
        name:'项目销售日报简表',
        searchForm:{
          date:new Date(),
          isMoney:1,
          isChecked:'rechecked',
          status:'APPROVED',
          projectId: '',
          cityId:[]
        },//筛选区数据
        cityOption:[],//城市公司数组
        projectOption:[],//项目数组
        projectNameForm:{},
        tableSrc:null,
        isShow:false,
        loading: false,
        disabledFlag: false
      };
    },
    methods: {
      getProjectByCompanyId:function(val){//根据项目公司ID获取项目
        let str = '';
        if( Array.isArray(val) ){
          val.map((item, index)=>{
            if( index !== val.length - 1 ){
              str = str + item + ','
            }else{
              str = str + item
            }
          })
          if( val.length > 1 ){
            this.searchForm.projectId = '';
            this.disabledFlag = true
          }else{
            this.disabledFlag = false
          }
          
        }else{
          str = val;
        }
        if( !str ){
          this.searchForm.projectId = '';
          return
        }
        let that = this;
        this.projectOption = [];
        let params = {
          id:str
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
      statistics:function(){

        let date = this.searchForm.date
        let y = date.getFullYear();
        let M = parseInt(date.getMonth() + 1);
        let d = date.getDate();
        if(M < 10){M = '0'+M;}
        if(d < 10){d = '0'+d;}
        let str = '';
        if( Array.isArray(this.searchForm.cityId) ){
          this.searchForm.cityId.map((item, index)=>{
            if( index !== this.searchForm.cityId.length - 1 ){
              str = str + item + ','
            }else{
              str = str + item
            }
          })
          if( this.searchForm.cityId.length > 1 ){
            this.searchForm.projectId = null;
            this.disabledFlag = true
          }else{
            this.disabledFlag = false
          }
          
        }else{
          str = this.searchForm.cityId;
        }
        console.log(this.searchForm.cityId)
      let CITY_ID = str;
        // let CITY_ID = typeof(this.searchForm.cityId)=='undefined'?'':this.searchForm.cityId;
        let PROJECT_ID = typeof(this.searchForm.projectId)=='undefined'?'':this.searchForm.projectId;
        let ESCROW_TYPE = typeof(this.searchForm.escrowType)=='undefined'?'':this.searchForm.escrowType;
        let IS_CHECKED = typeof(this.searchForm.isChecked)=='undefined'?'':this.searchForm.isChecked;
        let STATUS = typeof(this.searchForm.status)=='undefined'?'':this.searchForm.status;
        let DATE = typeof(this.searchForm.date)=='undefined'?'':y+'-'+M+'-'+d;
        let IS_MONEY = typeof(this.searchForm.isMoney)=='undefined'?'':this.searchForm.isMoney;
        let REAL_NAME = unescape(document.cookie.split("userRealName=")[1].split(";")[0]);

        this.tableSrc = CRM_GLOBAL.DATA_SALE_STRUCK_TABLE+"&CITY_ID="+CITY_ID+"" +
          "&PROJECT_ID="+PROJECT_ID+"&ESCROW_TYPE="+ESCROW_TYPE+"&IS_CHECKED="+IS_CHECKED+"&STATUS="+STATUS+"&DATE="+DATE+"&IS_MONEY="+IS_MONEY+'&DATE='+DATE+'&REAL_NAME='+REAL_NAME+'&scroll=yes';
        if(this.tableSrc != null){
          this.isShow = true;
           this.loading = true;
        }else{
          this.isShow = false;
        }
      },
      exportExcel:function(){
        child.window.exportExcel('report1');
      },
    },
    created() {
      let that = this;
      loginUser().then(function(res){
        if(res.status == 200){
          if(res.data.cityName != null && res.data.cityName != '' && typeof(res.data.cityName) != 'undefined'){//城市项目公司成员
            that.cityOption = [{label:res.data.cityName,value:res.data.cityId}];
            that.searchForm.cityId = [that.cityOption[0].value];
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
      let thisPage = document.getElementById('projectSalesDaily');
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
  };
</script>

<style lang="scss" scoped>
  #projectSalesDaily{
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
    overflow: hidden;
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

