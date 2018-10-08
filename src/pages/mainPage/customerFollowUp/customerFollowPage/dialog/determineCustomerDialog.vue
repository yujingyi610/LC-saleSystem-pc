<template>
  <div class="give-up-business-opportunities">
    <el-dialog
      title="再次购买"
      width="550px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div class="text-center">
        <h3 v-if="flag === true" class="h3_1">该用户可添加</h3>
        <h3 v-if="flag === false" class="h3_2">客户已存在，请重新添加</h3>
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
        flag:true,
        tel:'',
        projectId:''
      }
    },
    methods : {
      show(data,id) {
        this.dialogVisible = true;
        this.tel = data;
        this.projectId = id;
      },

      //判客
      saveleMobileAdd(){
        let data={
            projectId:this.projectId,
            mobile:this.tel
          }   
          determineCustomer(data).then((res) => {
            if(res.status === 200){
                this.flag = res.data.flag
            }
          }) 
          
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

.h3_2{
    color: red;
    font-size: 14px;
    border-top: none;
    margin-top: 0;
}
</style>