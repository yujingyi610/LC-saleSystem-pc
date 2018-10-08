<template>
	<div>
         <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">个人月度指标-编辑</span>
           <div class="mr-10 fr">
            <el-button v-has="'tj:pso:save'" @click="handleSeave" type="primary">保存</el-button>
            <el-button v-has="'tj:pso:can'" @click="handleDefine" type="primary">取消</el-button>
           </div>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column :label="this.label">
            <el-table-column
            prop="projectCityName"
            label="城市公司(万元)"
            width="120">
            </el-table-column>
            <el-table-column
            prop="projectName"
            label="项目名称(万元)"
            width="120">
            </el-table-column>
            <el-table-column
            prop="agentUserRealName"
            label="置业顾问(万元)"
            width="70">
            </el-table-column>
            <el-table-column label="考核指标">
            <el-table-column
                prop="checkAgreement"
                label="新增协议(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.checkAgreement" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
                
            </el-table-column>
            <el-table-column
                prop="checkContract"
                label="新增合同(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.checkContract" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            
            <el-table-column
                prop="checkReturn"
                label="新增回款(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.checkReturn" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>

            </el-table-column>

            <el-table-column label="奖励指标">
            <el-table-column
                prop="rewardAgreement"
                label="新增协议(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.rewardAgreement" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="rewardContract"
                label="新增合同(万元)"
                >
                <template slot-scope="scope">
                    <el-input  type="number" min="0" v-model="scope.row.rewardContract" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="rewardReturn"
                label="新增回款(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.rewardReturn" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>

            </el-table-column>

            <el-table-column label="挑战指标">
            <el-table-column
                prop="challengeAgreement"
                label="新增协议(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.challengeAgreement" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="challengeContract"
                label="新增合同(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.challengeContract" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="challengeReturn"
                label="新增回款(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0" v-model="scope.row.challengeReturn" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>

            </el-table-column>

        </el-table-column>
        </el-table>
         
	</div>
</template>

<script>
import {
  saveIndexMonthP,//保存个人月指标
  saveIndexYearP,//保存个人年指标
} from '@/api/pages/mainPage/dataAnalysis/indexEntry'

  export default {
    data() {
      return {
        tableData: [{
            //城市公司
            cityCompany:'上海城市公司',
            //项目公司
            projectCompany:'第一期项目公司',
            //经纪人
            broker: '李二',
            //--------考核指标
            //新增协议
            newAgreement:'1',
            //新增合同
            newContract:'30',
            //新增回款
            newCollection:'100',
            //-----------奖励指标
             //新增协议
            jNewAgreement:'1',
            //新增合同
            jNewContract:'30',
            //新增回款
            jNewCollection:'100',
            //---------挑战指标
             //新增协议
            tNewAgreement:'1',
            //新增合同
            tNewContract:'30',
            //新增回款
            tNewCollection:'100',

        }],
         //月时间
        month:'',
        //年时间
        year:'',
        //季度
        type:'month',
        //城市公司
        cityNameA:'',
        //项目公司
        projectNameA:'',
        //标签
        label:'',

      }
    },
     props:["obtainCustomerEdit",'yearData','monthData','typeData','cityName','projectName'],
     watch:{
      obtainCustomerEdit(curVal,oldVal){
        if(curVal){
          ;
          //this.customerDetails=curVal;
          
          this.tableData = curVal
          //console.log('view22222222',this.tableData)
          //this.determineOutput(curVal)
        }
      },
      yearData(curVal,oldVal){
        if(curVal){
          ;
          this.year = curVal
          //console.log('季度年',this.year)
          //this.determineOutput(curVal)
          this.changeLabel()
        }
      },
      monthData(curVal,oldVal){
        if(curVal){
          ;
          this.month = curVal
          console.log('季度月',this.month)
          //this.determineOutput(curVal)
          this.changeLabel()
        }
      },
      typeData(curVal,oldVal){
        if(curVal){
          ;
          this.type = curVal
          console.log('类型',this.type)
          //this.determineOutput(curVal)
          this.changeLabel()
        }
      },
      cityName(curVal,oldVal){
        if(curVal){
          ;
          this.cityNameA = curVal
          console.log('城市公司',this.cityNameA)
          //this.determineOutput(curVal)
          this.changeLabel()
        }
      },
      projectName(curVal,oldVal){
        if(curVal){
          ;
          this.projectNameA = curVal
          console.log('项目名称',this.projectNameA)
          //this.determineOutput(curVal)
          this.changeLabel()
        }
      }
    },
    mounted(){
        this.changeLabel()
    },
    methods:{

    initTableList(){},
         //保存
      handleSeave(){
           console.log('提交的数据',this.tableData)
         console.log('类型',this.type)
        if(this.type ==='month'){
            console.log('月',this.type)
            let monthA = ''
            let yearA = ''       
            //console.log('时间',month)
            monthA = this.month.split('-')[0]
            yearA = this.month.split('-')[1]

            let data = this.tableData;
            let that = this;
            let params = new URLSearchParams();
            //console.log("提交添加的人员数组",data);
            params.append( "month",yearA );
            params.append( "year",monthA);
            
            saveIndexMonthP(params,data).then((res)=>{
                if(res.status === 200){
                    console.log('成功')
                    this.tableData =[]
                      this.$emit('change')
                }
            })
        }else if(this.type ==='year'){
             let data = this.tableData;
            let that = this;
            let params = new URLSearchParams();
            //console.log("提交添加的人员数组",data);
            params.append( "year",this.year);
             params.append( "month",'0');
            console.log('年',this.year)
            saveIndexYearP(params,data).then((res)=>{
                if(res.status === 200){
                    console.log('成功')
                    this.tableData =[]
                     this.$emit('change')
                }
            })
        }
       
      },
      //取消
      handleDefine(){
        this.$emit('change')
      },

      //更新表头
        changeLabel(){
            console.log('1111111111111111')
            if(this.type ==='month'){
                //console.log('时间',month)
                let monthA = this.month.split('-')[0]
                let yearA = this.month.split('-')[1]
                this.label = `${this.cityNameA}城市公司-${this.projectNameA}项目-${monthA}年${yearA}月个人月指标`
            }else if(this.type ==='year'){
                this.label = `${this.cityNameA}城市公司-${this.projectNameA}项目-${this.year}年个人年指标`
            }
        },

    }
  }
</script>

<style lang="scss" scoped>

.login-form-input{
    .el-input__inner {
       border: none!important;
    }
} 
</style>
