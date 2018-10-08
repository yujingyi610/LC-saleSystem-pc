<template>
  <div class="protection-period-dialog">
    <el-dialog
      title="编辑保护期"
      width="520px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    > 
      <div>
        <span class="span_1">意向保护期</span>
        <div class="mb-20">
          <span class="mr-20">未到访期限(天):</span>
          <el-input class="mr-20" v-model.trim="term1" style="width:174px;" />
          <span class="mr-20">是否启用:</span>
          <el-switch
           
            v-model="switch1"
            active-color="#13ce66"
            inactive-color="#E5E5E5">
          </el-switch>
        </div>
        <div class="mb-20">
          <span class="mr-20">转到访期限(天):</span>
          <el-input class="mr-20" v-model.trim="term2" style="width:174px;" />
          <span class="mr-20">是否启用:</span>
          <el-switch
            
            v-model="switch2"
            active-color="#13ce66"
            inactive-color="#E5E5E5">
          </el-switch>
        </div>
        <div class="div_1">
          <span class="mr-20">已到访期限(天):</span>
          <el-input class="mr-20" v-model.trim="term3" style="width:174px;" />
          <span class="mr-20">是否启用:</span>
          <el-switch
            
            v-model="switch3"
            active-color="#13ce66"
            inactive-color="#E5E5E5">
          </el-switch>
        </div>


      </div>
      <div>
        <span class="span_1">成交保护期</span>
         <div class="div_1">
          <span class="mr-20">已签约期限(天):</span>
          <el-input class="mr-20" v-model.trim="term4" style="width:174px;" />
          <span class="mr-20">是否启用:</span>
          <el-switch
            
            v-model="switch4"
            active-color="#13ce66"
            inactive-color="#E5E5E5">
          </el-switch>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//获取详细信息
  import {
    upDataProjectList //上传置业顾问保护期
  } from '@/api/pages/mainPage/customerFollowUp/careerAdvisorProtectionPeriod'
  export default {
    data() {
      return {
        dialogVisible : false,
        term1 : '',
        term2 : '',
        term3 : '',
        term4 : '',
        switch1 : false,
        switch2 : false,
        switch3 : false,
        switch4 : false,
        row:{}
      }
    },
    methods : {
      show(type,row) {
        this.row = row;
        this.term1 = this.row.noVisitDays
        this.term2 = this.row.transVisitDays
        this.term3 = this.row.hasVisitDays
        this.term4 = this.row.signDays

        if(this.row.noVisitFlag === 1){
          this.switch1 = true
        }
        if(this.row.transVisitFlag === 1){
          this.switch2 = true
        }
        if(this.row.hasVisitFlag === 1){
          this.switch3 = true
        }
        if(this.row.signFlag === 1){
          this.switch4 = true
        }

        this.dialogVisible = true;
      },

      handleClose() {
        this.dialogVisible = false;
        // 清空数据
        this.term1 = '';
        this.term2 = '';
        this.term3 = '';
        this.term4 = '';
        this.switch1 = false;
        this.switch2 = false;
        this.switch3 = false;
        this.switch4 = false;

        //更新index的数据
        //1
        this.$emit('closeChild')

      },
      handleSubmit() {
          let data = {
            id:this.row.id,
            projectCityId:this.row.projectCityId,
            projectCityCode:this.row.projectCityCode,
            projectCityName:this.row.projectCityName,
            projectId:this.row.projectId,
            projectCode:this.row.projectCode,
            projectName:this.row.projectName,
            noVisitDays:this.term1,
            noVisitFlag:this.switch1?1:0,
            hasVisitDays:this.term3,
            hasVisitFlag:this.switch3?1:0,
            transVisitDays:this.term2,
            transVisitFlag:this.switch2?1:0,
            signDays:this.term4,
            signFlag:this.switch4?1:0,
            type:this.row.type
          }
        
        upDataProjectList(data).then((res)=>{
                this.handleClose()
            }) 
          
      },
    },
  }
</script>

<style lang="scss" scoped>

.protection-period-dialog{

}
.span_1{
  font-size: 14px;
  color: #4DBE61;
}
.mb-20{
  margin-left: 20px;
}
.div_1{
  margin-left: 20px;
}

</style>