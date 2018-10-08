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
        this.getConsultant(this.row[0].projectId)
      },
      //获取置业顾问
      getConsultant(id){
        let userId = Cookies.get('session')
        let data = {
          propertyConsultId:'',
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
       
        this.$emit('handleCloseir')
        // 清空数据
        this.selectChecked = [];
      },
      handleSubmit() {
        let Str = ''
        let arr = []
        
        if(this.row.length ===1){
            Str = this.row[0].id
        }else if(this.row.length>1){
          for(let i=0;i<this.row.length;i++){
            arr.push(this.row[i].id)
          }
          Str = arr.join(',')
        }
        let data = {
            customIds:Str,
            propertyConsultId:this.selectChecked.userId,
            propertyConsultName:this.selectChecked.userRealName

        }
        distributionCustomers(data).then((res)=>{
          this.$emit('handleCloseir')
              this.handleClose();  
          if(res.status === 200) {           
                          
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