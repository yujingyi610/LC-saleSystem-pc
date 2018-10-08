<template>
  <div class="jurisdiction-management background-m">
    <div class="mb-20 search-title">
      <span>角色名称：</span>
      <el-input style="width:180px;" v-model="searchRoleName" class="mr-10"></el-input>
      <el-button @click="handleSearch" type="primary">搜索</el-button>
      <div class="fr">
        <el-button @click="handleRoleAdd" type="primary">新增角色</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleCode" label="角色编码"></el-table-column>
        <el-table-column prop="roleType" label="角色类型"></el-table-column>
        <el-table-column prop="orgLevelType" label="组织等级类型"></el-table-column>
        <el-table-column prop="yn" label="启用状态">
          <template slot-scope="scope">
            {{scope.row.yn === 1 ? '启用' : '停用'}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
        <el-table-column width="220" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleRoleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleYn(scope.row)" type="text">
              {{scope.row.yn === 1 ? '停用' : '启用'}}
            </el-button>
            <el-button @click="handlePermissionsallocation(scope.row)" type="text">权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      class="mt-10"
      v-if="total > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <roleDialog @submit="handleDialogSubmit" ref="roleDialog" />
    <JurisdictionDialog @submit="handleDialogSubmit" ref="JurisdictionDialog" />
  </div>
</template>

<script>
  import {
    roleManagementList,
    roleManagementDisableOrEnable,
  } from '@/api/pages/mainPage/systemManagement'
  import api from '@/axios/api.js'
  import '@/assets/styles/reset.scss';

  import roleDialog from './roleDialog.vue'
  import JurisdictionDialog from './JurisdictionDialog.vue'
  export default {
    components : {roleDialog , JurisdictionDialog},
    data() {
      return {
        tableData : [],
        total : 0,
        currentPage : 1,
        pageSize : 10,
        searchRoleName : '',
      }
    },
    mounted() {
      this.initTableList();
    },
    methods: {
      initTableList() {
        roleManagementList({
          roleName : this.searchRoleName,
          pageNum : this.currentPage,
          pageSize : this.pageSize,
        }).then((res) => {
          if(res.status === 200){
            this.tableData = res.data.list;
            this.tableData.forEach((v)=>{
              if(v.orgLevelType === 'GROUP'){
                v.orgLevelType = '集团'
              }
              if(v.orgLevelType === 'AREA'){
                v.orgLevelType = '子集团'
              }
              if(v.orgLevelType === 'CITYCOMPANY'){
                v.orgLevelType = '城市公司'
              }
              if(v.orgLevelType === 'PROCOMPANY'){
                v.orgLevelType = '项目公司'
              }
            })

            this.total = res.data.total;
          }
        });
      },
      tableInitChange() {
        if(this.currentPage === 1){
          this.initTableList();
        }else{
          this.currentPage = 1;
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableInitChange();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initTableList();
      },
      handleRoleAdd() {
        this.$refs.roleDialog.show('add');
      },
      handleRoleEdit(row) {
       let rowArr = {};
       for(let k in row){
        rowArr[k] = row[k]
       }
        if(rowArr.orgLevelType === '集团'){
          rowArr.orgLevelType = 'GROUP'
        }
        if(rowArr.orgLevelType === '子集团'){
          rowArr.orgLevelType = 'AREA'
        }
        if(rowArr.orgLevelType === '城市公司'){
          rowArr.orgLevelType = 'CITYCOMPANY'
        }
        if(rowArr.orgLevelType === '项目公司'){
          rowArr.orgLevelType = 'PROCOMPANY'
        }
        console.log('r0www',rowArr)
        this.$refs.roleDialog.show('edit',rowArr);
      },
      handlePermissionsallocation(row) {
        this.$refs.JurisdictionDialog.show(row);
      },
      // 禁用 or 启用
      handleYn(row) {
        roleManagementDisableOrEnable({
          id : row.id,
          yn : row.yn === 1 ? 0 : 1,
        }).then((res) => {
          if(res.status === 200){
            let message = row.yn === 1 ? '启用成功' : '停用成功';
            this.$message.success(message);
            this.initTableList();
          }
        });
      },
      handleDialogSubmit() {
        this.currentPage = 1;
        this.tableInitChange();
      },
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
    }
  }
</script>

<style lang="scss" scoped>
.jurisdiction-management{

}

</style>