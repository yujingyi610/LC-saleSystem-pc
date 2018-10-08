<template>
  <div class="distribution-advisor-dialog">
    <el-dialog
      title="分配置业顾问"
      width="600px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    > 
      <div>
        <el-radio-group v-model="selectChecked" value-key="id">
          <el-radio class="m-label mb-10" :label="item" :key="item.id" v-for="(item) in selectsOptions">
            {{item.userRealName}}
          </el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import Cookies from 'js-cookie'
//请求数据
  import {
  distributionCustomers,//=上传客户分配
  changeConsultant,//更换置业顾问
  getPropertyConsultant,//通过项目获取置业顾问
  } from '@/api/pages/mainPage/customerFollowUp'
  export default {
    data() {
      return {
        dialogVisible : false,
        selectsOptions : [],
        selectChecked : 0,
        //置业顾问id
        customId:'',
        //客户id
        id:''
      }
    },
    methods : {
      show(row) {
        this.row = row;
        this.dialogVisible = true;
        this.customId = this.row.id
        this.getConsultant(this.row.projectId)
      },
      //获取置业顾问
      getConsultant(id){
        let userId = Cookies.get('session')
        let data = {
          propertyConsultId:userId,
          projectId:id,
        }

        getPropertyConsultant(data).then((res)=>{
          this.selectsOptions = res.data
          if(res.status === 200){            
             this.selectsOptions = res.data           
           }
        })
      },
      handleClose() {
        this.dialogVisible = false;
        this.$emit('closeChild')
        // 清空数据
        this.selectChecked = [];
      },
      handleSubmit() {
       
        let data = {
            customIds:this.row.id,
            propertyConsultId:this.selectChecked.userId,
            propertyConsultName:this.selectChecked.userRealName

        }
        distributionCustomers(data).then((res)=>{
          if(res.status === 200) {
              //this.$emit('changeRight')
              this.$message({
                message: '分配成功',
                type: 'success'
              });
              this.handleClose();              
          }
        })
        
      },
    },
  }
</script>

<style lang="scss">

.distribution-advisor-dialog{
  .m-label{
    width: 150px;
    margin-left: 30px;
  }
}

</style>