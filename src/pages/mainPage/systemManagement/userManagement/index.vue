<template>
  <div class="user-management background-m">
    <div class="mb-20 search-title">
      <span>员工号：</span>
      <el-input style="width:180px;" v-model="searchUserCode" class="mr-10"></el-input>
      <span>登录账号：</span>
      <el-input style="width:180px;" v-model="searchUserName" class="mr-10"></el-input>
      <el-button @click="handleSearch" type="primary">搜索</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="userCode" label="员工号"></el-table-column>
        <el-table-column prop="userName" label="登录帐号"></el-table-column>
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column prop="userTypeName" label="用户类型"></el-table-column>
        <el-table-column prop="mainPositionName" label="职位"></el-table-column>
        <el-table-column prop="nationName" label="民族"></el-table-column>
        <el-table-column prop="nativePlaceName" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDistributionRole(scope.row)" type="text">分配角色</el-button>
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
      <distributionRoleDialog @submit="tableInitChange" ref="distributionRoleDialog" />
    </div>
  </div>
</template>

<script>
  import api from '@/axios/api.js'
  import {
    userManagementList,
  } from '@/api/pages/mainPage/systemManagement'
  import '@/assets/styles/reset.scss';

  import distributionRoleDialog from './distributionRoleDialog.vue'

  export default {
    components : {distributionRoleDialog},
    data() {
      return {
        tableData : [],
        total : 0,
        currentPage : 1,
        pageSize : 10,
        searchUserCode : '',
        searchUserName : '',
      }
    },
    mounted() {
      this.initTableList();
    },
    methods: {
      initTableList() {
        userManagementList({
          pageNum : this.currentPage,
          pageSize : this.pageSize,
          userCode : this.searchUserCode,
          userName : this.searchUserName,
        }).then((res) => {
          if(res.status === 200){
            this.tableData = res.data.list;
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
      handleSearch() {
        this.currentPage = 1;
        this.tableInitChange();
      },
      handleDistributionRole(row) {
        this.$refs.distributionRoleDialog.show(row);
      },
    }
  }
</script>

<style lang="scss" scoped>


</style>
