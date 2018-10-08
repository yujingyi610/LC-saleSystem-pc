<template>
  <div class="give-up-business-opportunities">
    <el-dialog
      title="再次购买"
      width="550px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div class="text-center">
        <h3 class="h3_1">是否调整购房需求</h3>
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
    //放弃商机商机  
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