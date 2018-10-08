<template>
  <div class="distribution-advisor-dialog">
    <el-dialog
      :title="this.title"
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
        propertyConsultId:'',
        customId:'',
        //客户id
        id:'',
        //标题，
        title:'',
      }
    },
    methods : {
      show(row,title) {
        this.row = row;
        this.dialogVisible = true;
        //this.selectsOptions = this.roc;
        this.customId = this.row.customId;
        this.id = this.row.id

        //置业顾问id
        this.propertyConsultId = this.row.propertyConsultId
        if(title === '更换顾问'){
          this.title = '更换置业顾问'
        }else{
          this.title = '分配置业顾问'
        }

        this.getConsultant(this.row.projectId)
      },
      //获取置业顾问propertyConsultId
      getConsultant(id){
        let userId = Cookies.get('session')
        if( this.title === '分配置业顾问'){
            this.propertyConsultId = '';
        }

         let data = {
            propertyConsultId:this.propertyConsultId,
            projectId:id,
          }
       
        getPropertyConsultant(data).then((res)=>{
          if(res.status === 200){            
             this.selectsOptions = res.data           
           }
        })
      },
      handleClose() {
        this.dialogVisible = false;
        // 清空数据
        this.selectChecked = [];
      },
      handleSubmit() {
        let arr = []
        for(let i=0;i<this.row.length;i++){
            arr.push(this.row[i].id)
        }
        let Str = arr.join(',')
        if(this.title === '分配置业顾问'){
          let data = {
            customIds:this.id,
            propertyConsultId:this.selectChecked.userId,
            propertyConsultName:this.selectChecked.userRealName
        }
        distributionCustomers(data).then((res)=>{
          if(res.status === 200) {
              this.$message({
                message: '分配成功',
                type: 'success'
              });
              this.handleClose();              
          }
        })

        }else if(this.title === '更换置业顾问'){
        let data = {
            customId:this.id,
            propertyConsultId:this.selectChecked.userId,
            propertyConsultName:this.selectChecked.userRealName

        }
        changeConsultant(data).then((res)=>{
          if(res.status === 200) {
              //this.$emit('changeRight')
              this.$message({
                message: '分配成功',
                type: 'success'
              });
              this.handleClose();              
          }
        })
        }
    
        
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