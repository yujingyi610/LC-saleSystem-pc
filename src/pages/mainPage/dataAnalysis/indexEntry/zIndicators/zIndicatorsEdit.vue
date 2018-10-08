<template>
	<div id="zIndicatorsEdit" class="customer-management-view background-m min">
    <div class="envelope-box min ">
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">综合指标完成率比重-编辑</span>
          <div class="fr">
            <el-button v-has="'crm:zb:save'" @click="handleSave" type="primary">保存</el-button>
            <el-button v-has="'crm:zb:can'" @click="handleDel" type="primary">取消</el-button>
          </div>
        </div>
      </div>
       <el-form :inline="true">
        <div class="mt-20">
          <span class="color-title-green bx">月度综合指标完成率比重</span>
          <el-row class="text_a">
            <el-col :span="12">
                <el-form-item label="合同指标完成率所占比重：">
                <el-input @change="gerNumber_1" type="number" max="100"   v-model="ruleForm.monthContract" placeholder="请输入0-100之间的数字" class="login-form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回款指标完成率所占比重：">
                <el-input @change="gerNumber_2" type="number" max="100"  v-model="ruleForm.monthReturn" placeholder="请输入0-100之间的数字" class="login-form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <span class="color-title-green bx">年度综合指标完成率比重</span>
          <el-row class="text_a">
            <el-col :span="12">
                <el-form-item label="合同指标完成率所占比重：">
                <el-input @change="gerNumber_3" type="number" max="100"  v-model="ruleForm.yearContract" placeholder="请输入0-100之间的数字" class="login-form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="回款指标完成率所占比重：">
                <el-input @change="gerNumber_4" type="number" max="100"  v-model="ruleForm.yearReturn" placeholder="请输入0-100之间的数字" class="login-form-input"></el-input>
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
  saveSynthesize,//保存综合指标比重
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
   props:["ruleF"],
     watch:{
      ruleF(curVal,oldVal){
        if(curVal){
          this.ruleForm = curVal;
        }
      },
    },
  methods: {
    getMessage(){
      synthesizeProportion().then((res)=>{
        if(res.status===200){
          this.ruleForm = res.data
        }
      })
    },
    //保存
    handleSave(){
      saveSynthesize(this.ruleForm).then((res)=>{
        if(res.status===200){
          this.$router.push({path:'/mainPage/dataAnalysis/indexEntry/zIndicators'});
        }
      })
      
    },
     //取消
    handleDel(){
      this.$router.push({path:'/mainPage/dataAnalysis/indexEntry/zIndicators'});
      this.ruleForm={}
    },
    //百分百统一
    gerNumber_1(){
      if(this.ruleForm.monthContract>=0&&this.ruleForm.monthContract<=100){   
        this.ruleForm.monthContract = (this.ruleForm.monthContract)
         this.ruleForm.monthReturn = (100 - this.ruleForm.monthContract)
      }else{
         this.$message.error('请输入正确的范围');
         this.ruleForm.monthContract = 100-this.ruleForm.monthReturn
      }
       
    },
     gerNumber_2(){
        
        if(this.ruleForm.monthReturn>=0&&this.ruleForm.monthReturn<=100){ 
          this.ruleForm.monthReturn = (this.ruleForm.monthContract)       
          this.ruleForm.monthContract = (100-this.ruleForm.monthReturn)
        }else{
          this.$message.error('请输入正确的范围');
          this.ruleForm.monthReturn = (100 - this.ruleForm.monthContract)
      }
    },
     gerNumber_3(){
        if(this.ruleForm.yearContract>=0&&this.ruleForm.yearContract<=100){  
          this.ruleForm.yearContract = (this.ruleForm.yearContract)      
          this.ruleForm.yearReturn = (100-this.ruleForm.yearContract)
        }else{
          this.$message.error('请输入正确的范围');
          this.ruleForm.yearContract = (100-this.ruleForm.yearReturn)
        }
        
    },
     gerNumber_4(){
        if(this.ruleForm.yearReturn>=0&&this.ruleForm.yearReturn<=100){        
          this.ruleForm.yearReturn = (this.ruleForm.yearReturn)
          this.ruleForm.yearContract = (100-this.ruleForm.yearReturn)
        }else{
          this.$message.error('请输入正确的范围');
         this.ruleForm.yearReturn = (100-this.ruleForm.yearContract)
        }
        
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
