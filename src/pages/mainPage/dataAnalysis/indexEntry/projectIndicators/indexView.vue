<template>
	<div>
         <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">项目月度指标</span>
           <div class="fr mr-10">
            <el-button v-has="'tj:pro:edit'" @click="handleEdit" type="primary">编辑</el-button>
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
                label="新增协议(万元)"
                >
            </el-table-column>
            <el-table-column
                prop="checkContract"
                label="新增合同(万元)"
                >
            </el-table-column>
            <el-table-column
                prop="checkReturn"
                label="新增回款(万元)"
                >
            </el-table-column>

            </el-table-column>

            <el-table-column label="奖励指标">
            <el-table-column
                prop="rewardAgreement"
                label="新增协议(万元)"
                >
            </el-table-column>
            <el-table-column
                prop="rewardContract"
                label="新增合同(万元)"
                >
            </el-table-column>
            <el-table-column
                prop="rewardReturn"
                label="新增回款(万元)"
                >
            </el-table-column>

            </el-table-column>

            <el-table-column label="挑战指标">
            <el-table-column
                prop="challengeAgreement"
                label="新增协议(万元)"
                >
            </el-table-column>
            <el-table-column
                prop="challengeContract"
                label="新增合同(万元)"
                >
            </el-table-column>
            <el-table-column
                prop="challengeReturn"
                label="新增回款(万元)"
                >
            </el-table-column>

            </el-table-column>
            </el-table-column>
        </el-table>
         
	</div>
</template>

<script>
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
          //动态labenl
            label:'',
            //月时间
            month:'',
            //年时间
            year:'',
            //类型
            type:'month'
      }
    },
    props:["obtainCustomerEdit",'yearData','monthData','typeData'],
     watch:{
      obtainCustomerEdit(curVal,oldVal){
        if(curVal){
          this.tableData = curVal;
         
        }
      },
       yearData(curVal,oldVal){
        if(curVal){
          this.year = curVal;
          this.changeLabel()
        }
      },
      monthData(curVal,oldVal){
        if(curVal){
          ;
          this.month = curVal;
          this.changeLabel()
        }
      },
      typeData(curVal,oldVal){
        if(curVal){
          ;
          this.type = curVal;
          this.changeLabel()
        }
      }
    },
    mounted(){
         this.changeLabel()
    },

    methods:{
        //获取表格数据
        initTableList(){},
        //编辑
        handleEdit(){
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
.tit{
  padding-bottom: 10px;
}
</style>
