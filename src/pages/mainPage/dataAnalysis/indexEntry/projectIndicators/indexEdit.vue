<template>
	<div>
         <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">项目月度指标-编辑</span>
           <div class="mr-10 fr">
            <el-button v-has="'tj:pro:save'" @click="handleSeave" type="primary">保存</el-button>
            <el-button v-has="'tj:pro:can'" @click="handleDefine" type="primary">取消</el-button>
           </div>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column :label="this.label">
            <el-table-column
            prop="projectCityName"
            label="城市公司"
            width="136">
            </el-table-column>
            <el-table-column
            prop="projectName"
            label="项目名称"
            width="134">
            </el-table-column>
            <el-table-column label="考核指标">
            <el-table-column
                prop="checkAgreement"
                label="新增协议"
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
                    <el-input type="number" min="0" v-model="scope.row.checkContract" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            
            <el-table-column
                prop="checkReturn"
                label="新增回款(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0" v-model="scope.row.checkReturn" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>

            </el-table-column>

            <el-table-column label="奖励指标">
            <el-table-column
                prop="rewardAgreement"
                label="新增协议(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0" v-model="scope.row.rewardAgreement" placeholder="请输入内容" class="login-form-input"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="rewardContract"
                label="新增合同(万元)"
                >
                <template slot-scope="scope">
                    <el-input type="number" min="0"  v-model="scope.row.rewardContract" placeholder="请输入内容" class="login-form-input"></el-input>
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
                    <el-input type="number" min="0" v-model="scope.row.challengeContract" placeholder="请输入内容" class="login-form-input"></el-input>
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
  saveIndexMonth,//保存项目月指标
  saveIndexYear,//保存项目年指标
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
        //类型
        type:'month',
        //表头label
        label:''
      }

    },
   props:["obtainCustomerEdit",'yearData','monthData','typeData'],
     watch:{
      obtainCustomerEdit(curVal,oldVal){
        if(curVal){
          ;
          //this.customerDetails=curVal;
          this.tableData = []
          this.tableData = curVal
          //this.determineOutput(curVal)
        }
      },
      yearData(curVal,oldVal){
        if(curVal){
          ;
          this.year = curVal
          this.changeLabel()
          //this.determineOutput(curVal)
        }
      },
      monthData(curVal,oldVal){
        if(curVal){
          ;
          this.month = curVal
          this.changeLabel()
          //this.determineOutput(curVal)
        }
      },
      typeData(curVal,oldVal){
        if(curVal){
          this.type = curVal
          this.changeLabel()
          //this.determineOutput(curVal)
        }
      }
    },
    mounted(){
        this.changeLabel()
    },
    methods:{
        //获取表格数据
        initTableList(){},
           //保存
      handleSeave(){
        // saveIndexMonth,//保存项目月指标
        //saveIndexYear,//保存项目年指标
        if(this.type ==='month'){       
            let monthA = ''
            let yearA = ''       
            monthA = this.month.split('-')[0]
            yearA = this.month.split('-')[1]

            let data = this.tableData;
            let that = this;
            let params = new URLSearchParams();
            params.append( "month",yearA );
            params.append( "year",monthA);
            saveIndexMonth(params,data).then((res)=>{
                if(res.status === 200){
                    this.tableData =[]
                     this.$emit('change')
                }
            })
        }else if(this.type ==='year'){
            let data = this.tableData;
            let that = this;
            let params = new URLSearchParams();
            params.append( "year",this.year);
             params.append( "month",'0');
            saveIndexYear(params,data).then((res)=>{
                if(res.status === 200){
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
            if(this.type ==='month'){
                let monthA = this.month.split('-')[0]
                let yearA = this.month.split('-')[1]
                this.label = `${monthA}年${yearA}月项目月指标`
            }else if(this.type ==='year'){
                this.label = `${this.year}年项目年指标`
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
