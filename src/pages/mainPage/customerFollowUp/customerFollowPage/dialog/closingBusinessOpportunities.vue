<template>
  <div class="closing-business-opportunities">
    <el-dialog
      title="关闭商机"
      width="500px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div class="text-center">
        <h3>确认关闭商机吗？关闭后将无法继续跟进</h3>
        <el-form class="mt-30" :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="关闭理由：" prop="reasonForClosure">
            <el-input v-model="ruleForm.reasonForClosure" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入关闭理由" type="textarea" style="width:300px;" />
          </el-form-item>
        </el-form>
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
    closeOpportunity//关闭商机 
  } from '@/api/pages/mainPage/customerFollowUp'


  export default {
    data() {
      return {
        dialogVisible : false,

        ruleForm : {
          // 关闭理由
          reasonForClosure : '',
          //商机id
          nicheId : ''
        },
        rules : {
          reasonForClosure : [
            {required : true , message : '请输入关闭理由' , trigger : 'blur'}
          ],
        },
      }
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
      },
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 浮层提交 
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
              let data={
                nicheId:this.ruleForm.nicheId,
                reason:this.ruleForm.reasonForClosure
              }          
              closeOpportunity(data).then((res) => {
                if(res.status === 200){
                 this.handleClose()                    
                }
             });    
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.closing-business-opportunities{
  .m-item{
    overflow: hidden;
  }
  .m-label{
    float: left;
    width: 80px;
    margin-left: 30px;
  }
  .m-content{
    float: left;
  }
}

</style>