<template>
	<div id="individualIndicators" class="customer-management-view background-m">
    <div class="envelope-box">
        <div class="envelope-title">
          <el-radio-group @change="changeList" v-model="type">
            <el-radio-button label="month">月指标</el-radio-button>
            <el-radio-button label="year">年指标</el-radio-button>        
          </el-radio-group>

          <div class="pt-20 qb mt-10">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">            
              <el-form-item label="城市公司：" prop="searchCityCompany">
                <el-select clearable v-model="ruleForm.searchCityCompany" placeholder="请选择">
                  <el-option 
                  v-for="(item) in cityCompanyOption"
                  :key="item.id"
                  :label="item.name" 
                  :value="item.id" 
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item 
                label = '选择项目：'
                prop="searchProjectValue"
              >
              <el-select clearable v-model="ruleForm.searchProjectValue" placeholder="请选择">
                <el-option 
                  v-for="(item) in projectNameOption"
                  :key="item.id"
                  :label="item.name" 
                  :value="item.id" 
                >
                </el-option>         
              </el-select>
            </el-form-item>

            <el-form-item 
                label = '选择日期：'
                prop="timeGo"
              >
              <el-date-picker
                v-if="type==='month'"
                v-model="ruleForm.timeMonth"
                type="month"
                value-format="yyyy-M"
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
              <indexView v-show="table === 1" 
              @change= "changePage_Edit" 
              @init= "initTableList" 
              :yearData='ruleForm.timeYearsText' 
             :cityName='ruleForm.searchCityCompanyText'
             :projectName='ruleForm.searchProjectValueText'
             :monthData='ruleForm.timeMonthText' 
             :typeData ='type'
             :obtainCustomerEdit='tableData'></indexView>
              </keep-alive>
            </template>
            <template>
             <index-edit v-show="table===2"
              @change= "changePage_View" 
              @init= "initTableList"
             :yearData='ruleForm.timeYearsText' 
             :cityName='ruleForm.searchCityCompanyText'
             :projectName='ruleForm.searchProjectValueText'
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
import {getCityList, getPrjByCityId, getBathList, getHouseList, getHouseViewByBuildId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
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
        searchCityCompany:'',
        //城市公式文本显示
        searchCityCompanyText:'',
        //项目
        searchProjectValue:'',
        //项目公司文本显示
        searchProjectValueText:'',
        //时间月
        timeMonth:'',
        //时间月回显
        timeMonthText:'',
        //时间年
        timeYears:'',
         //时间年回显
        timeYearsText:''
      },
      //数据
      tableData:[],
      //数据监听
      tableDataA:[],
      list:{
        //城市公司list
        cityCompanieslist:[],
        //项目list
        projectOptions:[]
      },
      //城市公司
      cityCompanyOption:[],
      //项目名称
      projectNameOption:[],
      rules:{

      }
    };
  },
    watch: {
       	"ruleForm.searchCityCompany": function(e) {
				this.ruleForm.searchProjectValue = null;
				if( e ){
					this.handleGetPrjByCityId({ id: e });
				}
			}
    },
    mounted(){
      //this.getTime()
      //this.getmMessages()
    },
  methods: {
    //获取表格数据
      initTableList(){
        let monthA = ''
        let yearA = ''
         if(this.type==='month'||this.type===''){
          this.type='month'
          console.log('时间',this.ruleForm.timeMonth)
          monthA = this.ruleForm.timeMonth.split('-')[0]
          yearA = this.ruleForm.timeMonth.split('-')[1]
        }else if(this.type==='year'){
          monthA = this.ruleForm.timeYears
          yearA = '0'
        }

          let data = {
              scope:'person',
              dateTag:this.type,
              year:monthA,
              month:yearA,
              projectCityId:this.ruleForm.searchCityCompany,
              projectId:this.ruleForm.searchProjectValue
          }
          if(monthA&&yearA){
              getIndexList(data).then((res)=>{
                if(res.status === 200){
                  console.log('获取成功',res)
                  this.tableData = res.data
                  
                }
              })
            }
      },
      //搜索
      handleSearch(){
        console.log('搜索',this.ruleForm.searchProjectValue)
        //项目名称
        if(this.ruleForm.searchProjectValue){
          this.projectNameOption.forEach((v)=>{
            if(this.ruleForm.searchProjectValue === v.id){
                this.ruleForm.searchProjectValueText = v.name
                console.log('this.ruleForm.searchCityCompanyText',this.ruleForm.searchProjectValueText = v.name)
            }
          })
        }else{
          console.log('没有项目',this.ruleForm.searchProjectValueText )
          this.ruleForm.searchProjectValueText = '无'
        }
        	

        //城市公司
          this.cityCompanyOption.forEach((v)=>{
            if(this.ruleForm.searchCityCompany === v.id){
                this.ruleForm.searchCityCompanyText = v.name
                console.log('this.ruleForm.searchCityCompanyText')
            }
        })

        //月
        this.ruleForm.timeMonthText = this.ruleForm.timeMonth
        //年
        this.ruleForm.timeYearsText = this.ruleForm.timeYears

          this.initTableList()
      },
      //页面换到编辑
      changePage_Edit(){
        console.log('触发编辑页面')
        this.table = 2
        this.initTableList()
      },
      //页面换到视图
      changePage_View(){
        this.table = 1
        this.initTableList()
      },

    //更换城市公司重新获取项目公司


     handleGetCityList() {// 获取城市公司
      this.cityCompanyOption = [];
      let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
      if( userInfo.cityId ){
          this.cityCompanyOption.push({
              id: userInfo.cityId,
              name: userInfo.cityName,
              code: userInfo.cityCode
          })
          this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
      }else{
          //获取城市公司列表
          getCityList().then(res => {
              if (res.status === 200) {
                  this.cityCompanyOption = res.data;
                  this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
              }
          });
      }
				
			},
      handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
        console.log('获取城市公司列表',params)
          let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
          if( userInfo.projects&&userInfo.projects.length>0 && userInfo.cityId){
              this.projectNameOption = userInfo.projects;
              this.projectNameOption.map(item=>{
                  item.name = item.projectName
              })
              this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
              this.initTableList()
              this.getTime()
          }else{
              getPrjByCityId(params).then(res => {
                  if (res.status === 200) {
                      this.projectNameOption = res.data;
                      if(this.projectNameOption[0]){
                        this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
                        this.initTableList()
                        this.getTime()
                      }else{
                        this.ruleForm.searchProjectValue=null
                        this.initTableList()
                        this.getTime()
                      }
                      
                  }
              });
          }

          
         
			},
      
      //更换季度
      changeList(){
         this.ruleForm.timeMonth ='',
         this.ruleForm.timeYears ='',
         this.getTime()
         this.initTableList()
      },
          //获取当前时间
      getTime(){
          let Nowdate=new Date();     
          let MonthFirstDay=new Date(Nowdate.getYear(),Nowdate.getMonth());     
          let M=Number(MonthFirstDay.getMonth())+1     
          console.log('本年',Nowdate.getFullYear()) 
          this.ruleForm.timeYears = Nowdate.getFullYear().toString()
          this.ruleForm.timeYearsText = this.ruleForm.timeYears
          //获取当月
          this.ruleForm.timeMonth = Nowdate.getFullYear()+"-"+M
          this.ruleForm.timeMonthText = this.ruleForm.timeMonth
          //获取本年
          //this.ruleForm.timeYears = Nowdate.getFullYear()
         // this.initTableList()
          this.handleSearch()
      },
      //进入默认获取
      getmMessages(){
          
          let useInfo = JSON.parse(sessionStorage.getItem('user-info')) 
          console.log('useInfo',useInfo)
          if(useInfo.cityId===null||useInfo.cityId===''){
            this.handleGetCityList()
          }else if(useInfo.cityId){
           
            this.list.cityCompanieslist.push({
                id: useInfo.cityId,
                name: useInfo.cityName,
                code: useInfo.cityCode
            })
            this.ruleForm.searchCityCompany = this.list.cityCompanieslist[0].id;

            this.handleGetPrjByCityId()
             
            
          }else if(useInfo.projects&&useInfo.projects.length>0){
             if( useInfo.cityId ){
                    this.list.cityCompanieslist.push({
                        id: useInfo.cityId,
                        name: useInfo.cityName,
                        code: useInfo.cityCode
                    })
                    this.ruleForm.searchCityCompany = this.list.cityCompanieslist[0].id;
             }
            this.list.projectOptions = useInfo.projects
            this.list.projectOptions.map((v)=>{
            v.name = v.projectName
            })
            console.log('this.projectNameOption',this.list.projectOptions)
            //默认回显第一个项目
            //this.ruleForm.searchProjectValueText = this.list.projectOptions[0].name
            //默认的项目id
            this.ruleForm.searchProjectValue = this.list.projectOptions[0].id
            //this.handleSearch()
          }

      },

  },
  created() {
   
      //this.handleGetCityList()
      //this.getmMessages()
     this.handleGetCityList()
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
