<template>
  <div class="activating-business-opportunities">
    <el-dialog
      title="激活商机"
      width="500px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div class="text-center">
        <h3>确认激活商机吗？激活后需继续跟进</h3>
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
    activatOpportunity//激活商机  
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
          activatOpportunity(data).then((res) => {
              if(res.status === 200){
                 this.handleClose()                    
              }
          });       
      }     
    },
  }
</script>

<style lang="scss" scoped>

.activating-business-opportunities{

}

</style>