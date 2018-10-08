<template>
  <div class="Jurisdiction-dialog">
    <el-dialog
      title="权限控制"
      width="700px"
      @close="handleDialogClose"
      :visible.sync="dialogVisible"
    >
      <div style="height:65vh;overflow-y:scroll;">
        <el-tree
          :props="{
            label : 'label',
            children : 'children',
          }"
          node-key="id"
          ref="tree"
          show-checkbox
          default-expand-all
          :expand-on-click-node="false"
          :data="treeData"
          check-strictly
        >
        </el-tree>
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
    roleManagementJurisdictionTree,
    roleManagementJurisdictionRoleAuthority,
    roleManagementJurisdictionSave,
  } from '@/api/pages/mainPage/systemManagement'
  import api from '@/axios/api.js'
  export default {
    data() {
      return {
        dialogVisible : false,
        title : '',
        treeData : [],
      }
    },
    mounted () {

    },
    methods: {
      // 获取 权限树
      getJurisdictionTree(row) {
        roleManagementJurisdictionTree().then((res) => {
           
          this.treeData = res;
          this.getJurisdictionTreeChecked(row);
        });
      },
      // 获取当前选中
      getJurisdictionTreeChecked(row) {
        roleManagementJurisdictionRoleAuthority({
          roleId : row.id,
        }).then((res) => {
           
          if(res.status === 200){
            let arr = res.data.map((v,k) => {
              return v.resourceId;
            });
            this.$refs.tree.setCheckedKeys(arr);
          }
        });
      },
      show(row) {
        this.row = row;
        this.getJurisdictionTree(row);
        this.dialogVisible = true;
      },
      handleDialogClose() {
        this.dialogVisible = false;
        this.$refs.tree.setCheckedKeys([]);
      },
      handleDialogSubmit() {
        console.log(this.$refs.tree.getCheckedNodes());
        let permissions = this.$refs.tree.getCheckedNodes().map((v,k) => {
          return {
            resourceId : v.id,
            resourceType : v.type,
          }
        });
        roleManagementJurisdictionSave({
          data : permissions,
          roleId : this.row.id,
        }).then((res) => {
          if(res.status === 200){
            this.$message.success('操作成功');
            this.handleDialogClose();
            this.$emit('submit');
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .Jurisdiction-dialog{

  }
</style>
