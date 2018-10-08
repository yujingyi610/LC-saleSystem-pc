<template>
  <div class="distribution-role-dialog">
    <el-dialog
      :title="title"
      width="800px"
      @close="handleDialogClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-checkbox-group v-model="checkList">
          <el-row>
            <el-col :span="8" v-for="(item) in optionA" :key="item.id">
              <el-checkbox :label="item.id" >
              {{item.roleName}}
            </el-checkbox>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="8">
              <span v-for="(item) in option1" :key="item.id">
                <el-checkbox :label="item.id">
                  {{item.roleName}}
                </el-checkbox><br />
              </span>
            </el-col>
            <el-col :span="8">
              <span v-for="(item) in option2" :key="item.id">
                <el-checkbox :label="item.id">
                  {{item.roleName}}
                </el-checkbox><br />
              </span>
            </el-col>
            <el-col :span="8">
              <span v-for="(item) in option3" :key="item.id">
                <el-checkbox :label="item.id">
                  {{item.roleName}}
                </el-checkbox><br />
              </span>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    userManagementAllRole,
    userManagementUserRole,
    userManagementSaveRole,
  } from '@/api/pages/mainPage/systemManagement'
  import api from '@/axios/api.js'
  export default {
    data() {
      return ({
        dialogVisible : false,
        title : '分配角色',
        checkList : [],
        options : [],// 放所有
        optionA: [],// 放系统管理员
        option1: [],// 放orgLevelType值为CITYCOMPANY
        option2: [],// 放orgLevelType值为AREA
        option3: [],// 放orgLevelType值为PROCOMPANY
      })
    },
    
    methods : {
      // 获取角色列表
      getRoleList(row) {
        userManagementAllRole().then((res) => {
          if(res.status === 200){
            this.optionA = [];
            this.option1 = [];
            this.option2 = [];
            this.option3 = [];

            this.options = res.data;
            this.options.map(item=>{
              if( item.orgLevelType === 'CITYCOMPANY' ){
                this.option1.push(item)
              }else if( item.orgLevelType === 'AREA' ){
                this.option2.push(item)
              }else if( item.orgLevelType === 'PROCOMPANY' ){
                this.option3.push(item)
              }else{
                this.optionA.push(item)
              }
            })
            console.log(this.optionA)
            this.getRoleListChecked(row);
          }
        });
      },
      // 获取选中 角色
      getRoleListChecked(row) {
        userManagementUserRole({
          userId : row.id,
        }).then((res) => {
           
          if(res.status === 200){
            this.checkList = res.data.map((v,k) => {
              return v.roleId;
            });
          }
        });
      },
      show(row) {
        console.log(row,'row');
        this.getRoleList(row);
        this.dialogVisible = true;  
        this.row = row;
      },
      handleDialogClose() {
        this.dialogVisible = false;
        this.checkList = [];
      },
      handleDialogSubmit() {
        console.log(this.checkList);
        userManagementSaveRole({
          userId : this.row.id,
          roleIdStr : this.checkList.join(',')
        }).then((res) => {
           ;
          if(res.status === 200){
            this.$message.success('分配成功');
            this.handleDialogClose();
            this.$emit('submit');
          }
        });
        /* api.JH_news('/api/sys/userRole/saveOrUpdate',{
          userId : this.row.id,
          roleIdStr : this.checkList.join(',')
        }).then((res) => {
           ;
        }); */
      },
    },
  }
</script>

<style lang="scss" scoped>

// .distribution-role-dialog{

// }

</style>

<style lang="scss">
.distribution-role-dialog{
  .el-checkbox+.el-checkbox {
      margin-left: 0px;
  }
}
</style>