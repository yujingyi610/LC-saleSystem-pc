<template>
	<div id="individualIndicators" class="customer-management-view background-m">
    <div class="envelope-box">
        <div class="envelope-title ">
          <el-radio-group @change="changeList" v-model="type">
            <el-radio-button label="month">月指标</el-radio-button>
            <el-radio-button label="year">年指标</el-radio-button>        
          </el-radio-group>

          <div class="pt-20 qb mt-10">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">            

            <el-form-item 
                label = '选择日期：'
                prop="timeGo"
              >
              <el-date-picker
                v-if="type==='month'"
                v-model="ruleForm.timeMonth"
                value-format="yyyy-M"
                type="month"
                placeholder="选择月">
              </el-date-picker>
              <el-date-picker
                v-else
                v-model="ruleForm.timeYears"
                type="year"
                 value-format="yyyy"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item>

              <div class="fr mr-10">
                <el-button @click="handleSearch" type="primary">搜索</el-button>
              </div>

            </el-form>
          </div>
      </div>
          <div class="envelope-title">
            <template >
              <keep-alive>
              <indexView v-show="table === 1" @change= "changePage_Edit" 
               :yearData='ruleForm.timeYearsText' 
               :monthData='ruleForm.timeMonthText'
               :typeData ='type'
               :obtainCustomerEdit='tableData'></indexView>
              </keep-alive>
            </template>
            <template>
             <index-edit v-show="table===2" @change= "changePage_View" 
             :yearData='ruleForm.timeYearsText' 
             :monthData='ruleForm.timeMonthText' 
             :typeData ='type'
             :obtainCustomerEdit='tableData'></index-edit>
            </template>
      </div>
    </div>
	</div>
</template>

<script>
import indexView from './indexView.vue'
import indexEdit from './indexEdit.vue'
import {
  getIndexList,//获取指标列表
} from '@/api/pages/mainPage/dataAnalysis/indexEntry'
export default {
  components:{
    indexView,
    indexEdit
  },
  data() {
    return {
      //季度
      type:'',
      //是否编辑
      table:1,
      ruleForm:{
        //城市公司
        cityCompanieslist:'',
        //项目
        searchProjectValue:'',
         //时间月
        timeMonth:'',
        //时间月回显
        timeMonthText:'',
        //时间年
        timeYears:'',
         //时间年回显
        timeYearsText:''
      },
      list:{
        //城市公司list
        cityCompanieslist:[{id:'1',name:'上海城市公司'},{id:'2',name:'杭州城市公司'},{id:'3',name:'北京城市公司'}],
        //项目list
        projectOptions:[{id:'1',projectName:'上海城市公司'},{id:'2',projectName:'杭州城市公司'},{id:'3',projectName:'北京城市公司'}]
      },
      //请求的数据
      tableData:{},
      rules:{

      }
    };
  },
  mounted(){
    this.getTime()
   
  },
  methods: {
    //获取表格数据
      initTableList(){
        let monthA = ''
        let yearA = ''
        if(this.type === 'month' || this.type === ''){
          this.type = 'month';
          monthA = this.ruleForm.timeMonth.split('-')[0]
          yearA = this.ruleForm.timeMonth.split('-')[1]
        }else if(this.type === 'year'){
          monthA = this.ruleForm.timeYears
          yearA = '0'
        }
          let data = {
              scope:'project',
              dateTag:this.type,
              year:monthA,
              month:yearA,
          }
          getIndexList(data).then((res)=>{
            if(res.status === 200){
              this.tableData = res.data
            }
          })
      },
      //搜索
      handleSearch(){
        
        //月
        this.ruleForm.timeMonthText = this.ruleForm.timeMonth
        //年
        this.ruleForm.timeYearsText = this.ruleForm.timeYears

        this.initTableList()
      },

       //页面换到编辑
      changePage_Edit(){
        this.table = 2
        this.initTableList()
      },
      //页面换到视图
      changePage_View(){
        this.table = 1
        this.initTableList()
      },
      //重新获取
      changeList(){
        // this.ruleForm.timeMonth ='',
        //  this.ruleForm.timeYears ='',
        this.getTime()
        this.initTableList()
      },
      //获取当前时间
      getTime(){
          let Nowdate=new Date();     
          let MonthFirstDay=new Date(Nowdate.getYear(),Nowdate.getMonth());     
          let M=Number(MonthFirstDay.getMonth())+1     
           this.ruleForm.timeYears = Nowdate.getFullYear().toString()
          this.ruleForm.timeYearsText = this.ruleForm.timeYears
          //获取当月
          this.ruleForm.timeMonth = Nowdate.getFullYear()+"-"+M
          this.ruleForm.timeMonthText = this.ruleForm.timeMonth
          this.initTableList()
      }
  },
  created() {
    //this.getTime()
  }
};
</script>

<style lang="scss" scoped>
.login-form-input .el-input__inner{
    border: none!important;
    .el-input__inner{
       border: none!important;
    }
} 

</style>
