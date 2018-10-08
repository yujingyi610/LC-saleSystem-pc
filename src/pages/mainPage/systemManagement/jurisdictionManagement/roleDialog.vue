<template>
  <div class="role-dialog">
    <el-dialog
      :title="title"
      width="400px"
      @close="handleDialogClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="ruleForm.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="角色类型" prop="roleType">
            <el-input v-model="ruleForm.roleType"></el-input>
          </el-form-item>
          <el-form-item label="组织等级类型" prop="orgLevelType">
             <el-select v-model="ruleForm.orgLevelType" :placeholder="ruleForm.orgLevelTypeText">
              <el-option :label="'集团'" :value="'GROUP'"></el-option>
              <el-option :label="'子集团'" :value="'AREA'"></el-option>
              <el-option :label="'城市公司'" :value="'CITYCOMPANY'"></el-option>
              <el-option :label="'项目公司'" :value="'PROCOMPANYGROUP'"></el-option>
            </el-select>           
          </el-form-item>
          <el-form-item label="排序值"  prop="orderVal">
            <el-input type="number" min="0" v-model="ruleForm.orderVal"></el-input>
          </el-form-item>
          <el-form-item label="启用状态" prop="yn">
            <el-select v-model="ruleForm.yn" placeholder="请选择启用状态">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明" prop="remark">
            <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/axios/api.js'
    import {
    saveOrUpdateRole
  } from '@/api/pages/mainPage/systemManagement'
  export default {
    data() {
      return {
        dialogVisible : false,
        title : '',
        ruleForm : {
          //角色编码
          roleCode : '',
          // 角色名称
          roleName : '',
          // 角色类型
          roleType : '',
          //组织角色类型
          orgLevelType:'',
          //组织角色类型回显文本
          orgLevelTypeText:' ',
          // 排序值
          orderVal : '',
          // 启用状态
          yn : 1,
          // 说明
          remark : '',
          
        },
        rules : {
          roleCode : [
            { required: true, message: '请输入角色编码' , trigger : 'blur'},
          ],
          roleName : [
            { required: true, message: '请输入角色名称' , trigger : 'blur'},
          ],
        },
      }
    },
    mounted () {
      
    },
    methods: {
      show(type,row) {        
        if(type === 'edit'){
          this.title = '编辑角色';        
          this.editData = row;
          let key = 'orgLevelTypeText'

            if(row.orgLevelType === 'GROUP'){
              row[key] = '集团'
            }
            if(row.orgLevelType === 'AREA'){
              row[key] = '子集团'
            }
            if(row.orgLevelType === 'CITYCOMPANY'){
              row[key] = '城市公司'
            }
            if(row.orgLevelType === 'PROCOMPANY'){
              row[key] = '项目公司'
            }
          let {
            roleCode,
            roleName,
            orgLevelType,
            roleType,
            orderVal,
            orgLevelTypeText,
            yn,
            remark,
          } = row;
          this.ruleForm = {roleCode,roleName,orgLevelType,orgLevelTypeText,roleType,orderVal,yn,remark};
          this.addType = 'edit';
        }else{
          this.title = '新增角色';
          this.addType = 'add';
          this.ruleForm = {
            //角色编码
            roleCode : '',
            // 角色名称
            roleName : '',
            // 角色类型
            roleType : '',
            //组织角色类型
            orgLevelType:'',
            // 排序值
            orderVal : '',
            // 启用状态
            yn : 1,
            // 说明
            remark : '',
          
          }
        }
        this.dialogVisible = true;  
      },
      keepNumber(){
        if(this.ruleForm.orderVal<=0){
          this.ruleForm.orderVal =1
        }
      },
      handleDialogClose() {
        this.$refs.ruleForm.resetFields();
        this.dialogVisible = false;
      },
      handleDialogSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log('rule',this.ruleForm)
            let form = {
                roleCode:this.ruleForm.roleCode,
                roleName:this.ruleForm.roleName,
                orgLevelType:this.ruleForm.orgLevelType,
                roleType:this.ruleForm.roleType,
                orderVal:this.ruleForm.orderVal,
                yn:this.ruleForm.yn,
                remark:this.ruleForm.remark,
            };
            if(this.addType === 'edit'){
              form.id = this.editData.id;
            }
            console.log('form',form)
            saveOrUpdateRole(form).then((res)=>{
              console.log('resres',res)
               if(res.status === 200){
                let message = this.addType === 'edit' ? '编辑成功' : '新增成功';
                this.$message.success(message);
                this.handleDialogClose();
                this.$emit('submit');
              }
            })
            // api.JH_news('/api/sys/role/saveOrUpdateRole', form)
            // .then((res) => {
            //   console.log('状态',res)
            //   if(res.status === 200){
            //     let message = this.addType === 'edit' ? '编辑成功' : '新增成功';
            //     this.$message.success(message);
            //     this.handleDialogClose();
            //     this.$emit('submit');
            //   }
            // });
          } else {

          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .role-dialog{

  }
</style>