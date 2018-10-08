<template>
	<div id="zIndicators" class="customer-management-view background-m min">
    <div class="envelope-box min ">
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">综合指标完成率比重</span>
          <div class="fr">
            <el-button v-has="'crm:zb:edit'" @click="handleEdit" type="primary">编辑</el-button>
          </div>
        </div>
         
      </div>
       <el-form :inline="true">
        <div class="mt-20">
          <span class="color-title-green bx">月度综合指标完成率比重</span>
          <el-row class="text_a">
            <el-col :span="12">
                <el-form-item label="合同指标完成率所占比重">
                {{ruleForm.monthContract}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回款指标完成率所占比重：">
                {{ruleForm.monthReturn}}
              </el-form-item>
            </el-col>
          </el-row>
          <span class="color-title-green bx">年度综合指标完成率比重</span>
          <el-row class="text_a">
            <el-col :span="12">
                <el-form-item label="合同指标完成率所占比重">
                {{ruleForm.yearContract}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回款指标完成率所占比重：">
                {{ruleForm.yearReturn}}
              </el-form-item>
            </el-col>
          </el-row>

        </div>
       </el-form>
       
    </div>
	</div>
</template>

<script>

import {
  synthesizeProportion,//获取综合指标比重
} from '@/api/pages/mainPage/dataAnalysis/indexEntry'

export default {
  data() {
    return {
        name:'综合指标比重',
        ruleForm:{
          //月度合同指标完成率所占比重
          monMontract:'48',
          //月度指标完成率所占比重：
          monBackMoney:'42',
           //年度合同指标完成率所占比重
          yearMontract:'42',
          //年度指标完成率所占比重：
          yearBackMoney:'48',

        }      
    };
  },
  methods: {
    //编辑
    handleEdit(){
      this.$router.push({path:'/mainPage/dataAnalysis/indexEntry/zIndicatorsEdit'});
    },
    getMessage(){
      synthesizeProportion().then((res)=>{
        if(res.status===200){
          this.ruleForm = res.data
        }
      })
    },
  },
  created() {
      this.getMessage()
  }
};
</script>

<style lang="scss" scoped>
.min{
  min-height: 400px;
}
.bx{
  display: block;
  margin-left: 100px;
  padding: 20px 0;
}
.text_a{
  text-align: center
}
</style>
