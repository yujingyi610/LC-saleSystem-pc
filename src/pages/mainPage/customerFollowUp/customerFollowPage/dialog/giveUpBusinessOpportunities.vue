<template>
  <div class="give-up-business-opportunities">
    <el-dialog
      title="放弃客户"
      width="550px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div class="text-center">
        <h3 class="h3_1">确认放弃当前客户吗？放弃后客户将成为公客，由其他顾问继续跟进</h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {
    giveUpOpportunity//放弃商机商机  
  } from '@/api/pages/mainPage/customerFollowUp'

  export default {
    data() {
      return {
        dialogVisible : false,
        nicheId:''
      }
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.nicheId = data
      },
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
      },
      // 浮层提交 
      handleSubmit() {
        let data={
            nicheId:this.nicheId
            }          
        giveUpOpportunity(data).then((res) => {
            if(res.status === 200){
                this.handleClose() 
                 this.$router.push({
                    path : '/mainPage/customerFollowUp/customerFollowPage',
                  });                 
            }
        }); 
      },
    },
  }
</script>

<style lang="scss" scoped>

.give-up-business-opportunities{

}
.h3_1{
    color: #4dbe61;
    font-size: 14px;
    border-top: none;
    margin-top: 0;
}

</style>