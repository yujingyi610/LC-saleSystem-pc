<template>
  <div class="background-m customer-distribution-page">
    <div class="envelope-box">
      <div class="envelope-title search-box">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          
          <el-form-item label="城市公司：" prop="aaaa1">
            <el-select clearable v-model="ruleForm.aaaa1" placeholder="请选择" class="w-150">
              <el-option label="杭州公司" value="1" ></el-option>
              <el-option label="上海公司" value="2" ></el-option>
              <el-option label="其他" value="3" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择项目：" prop="aaaa2">
            <el-select clearable v-model="ruleForm.aaaa2" placeholder="请选择" class="w-150">
              <el-option label="项目a" value="1" ></el-option>
              <el-option label="项目b" value="2" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="置业顾问：" prop="aaaa3">
            <el-select clearable v-model="ruleForm.aaaa3" placeholder="请选择" class="w-150">
              <el-option label="张三" value="1" ></el-option>
              <el-option label="李四" value="2" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户级别：" prop="aaaa4">
            <el-select clearable v-model="ruleForm.aaaa4" placeholder="请选择" class="w-150">
              <el-option label="A" value="1" ></el-option>
              <el-option label="B" value="2" ></el-option>
              <el-option label="C" value="2" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="无保护客户：" prop="aaaa5">
            <el-select clearable v-model="ruleForm.aaaa5" placeholder="请选择" class="w-150">
              <el-option label="有" value="1" ></el-option>
              <el-option label="无" value="2" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="最后一次跟进：" prop="aaaa6">
            <el-date-picker
              style="width:124px;"
              v-model="ruleForm.aaaa6"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span class="ml-5">至</span>
          </el-form-item>
          <el-form-item label="" prop="aaaa7">
            <el-date-picker
              style="width:124px;"
              v-model="ruleForm.aaaa7"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="客户创建时间：" prop="aaaa8">
            <el-date-picker
              style="width:124px;"
              v-model="ruleForm.aaaa8"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span class="ml-5">至</span>
          </el-form-item>
          <el-form-item label="" prop="aaaa9">
            <el-date-picker
              style="width:124px;"
              v-model="ruleForm.aaaa9"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="精确查找：" prop="aaaa10">
            <el-input v-model="ruleForm.aaaa10" style="width:150px;" class="w-150"></el-input>
          </el-form-item>

          <el-button @click="handleSearch" type="primary">搜索</el-button>
          <el-button @click="handleSearchReset">清空</el-button>

        </el-form>
      </div>
      <div class="table-box envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">客户列表</span>
          <div class="fr">
            <div class="fl">
              <el-button type="primary" @click="handleSistribution">分配</el-button>
            </div>
          </div>
        </div>
        <div class="table-box">
          <el-row>
            <!-- 左侧表格 -->
            <el-col :span="11">
              <el-table
              class="m-table"
              :data="tableDataLeft"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="aaaa" label="客户"></el-table-column>
                <el-table-column prop="roleName" label="电话"></el-table-column>
                <el-table-column prop="roleName" label="项目"></el-table-column>
                <el-table-column prop="roleName" label="归属置业顾问"></el-table-column>
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
              layout="prev, pager, next, jumper"
              >
              </el-pagination>
            </el-col>
            <el-col :span="2">
              <div style="height:1px;position:relative;">
                <el-button class="m-add" @click="handleAdd" type="primary">
                  添加
                  <i class="el-icon-arrow-right"></i>
                </el-button>
                <el-button class="m-delete" @click="handleDelete" type="primary">
                  移除
                  <i class="el-icon-arrow-left"></i>
                </el-button>
              </div>
            </el-col>
            <!-- 右侧表格 -->
            <el-col :span="11">
              <el-table
              class="m-table"
              :data="tableDataRight"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange2"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="aaaa" label="客户"></el-table-column>
                <el-table-column prop="roleName" label="电话"></el-table-column>
                <el-table-column prop="roleName" label="项目"></el-table-column>
                <el-table-column prop="roleName" label="归属置业顾问"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
      <distributionAdvisorDialog @submit="dialogSubmit" ref="distributionAdvisorDialog"></distributionAdvisorDialog>
    </div>
  </div>
</template>

<script>
  import '@/assets/styles/reset.scss'
  import distributionAdvisorDialog from './distributionAdvisorDialog.vue'
  // 获取请求接口
  import {
    /* dictionaryEntrySearchOptions,
    dictionaryEntryAddOrEdit, */
  } from '@/api/pages/mainPage/customerFollowUp'

  export default {
    components : {distributionAdvisorDialog},
    data() {
      return {
        ruleForm : {
          // 城市公司
          aaaa1 : '',
          // 选择项目
          aaaa2 : '',
          // 置业顾问
          aaaa3 : '',
          // 客户级别
          aaaa4 : '',
          // 无保护客户
          aaaa5 : '',
          // 最后一次跟进 开始时间
          aaaa6 : '',
          // 最后一次跟进 结束时间
          aaaa7 : '',
          // 客户创建时间 开始时间
          aaaa8 : '',
          // 客户创建时间 结束时间
          aaaa9 : '',
          // 精确查找
          aaaa10 : '',
        },
        rules : {},

        // 左侧表格数据
        tableDataLeft : [{aaaa : 'aaa',id : 1},{aaaa : 'bbbb' , id : 2}],
        // 右侧表格数据
        tableDataRight : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        // table 选中数据
        multipleSelection1 : [], // 左边
        multipleSelection2 : [], // 右边
      }
    },
    methods : {
      // 更新表格 数据
      initTableList() {},
      // 表格页数 初始化
      tableInitChange() {
        if(this.currentPage === 1){
          this.initTableList();
        }else{
          this.currentPage = 1;
        }
      },
      // 表格 size change
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableInitChange();
      },
      // 表格 点击分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initTableList();
      },
      // 点击搜索
      handleSearch() {
        this.tableInitChange();
      },
      // 点击清空
      handleSearchReset() {
        this.$refs.ruleForm.resetFields();
      },
      // 点击分配
      handleSistribution() {
        if(this.tableDataRight.length === 0){
          this.$message.warning('请至少添加一个客户');
          return;
        }
        this.$refs.distributionAdvisorDialog.show(this.tableDataRight);
      },
      // 点击 添加
      handleAdd() {
        let arr = [];
        arr = arr.concat(this.tableDataRight,this.multipleSelection1);
        let newArr = [];
        // 去重
        (() => {
          let obj = {};
          arr.map((v,k) => {
            if(!obj[v.id]){
              newArr.push(v);
              obj[v.id] = true;
            }
          });
        })();
        this.tableDataRight = newArr;
      },
      // 点击 移除
      handleDelete() {
        this.multipleSelection2.map((v1,k1) => {
          this.tableDataRight.map((v2,k2) => {
            if(v1.id === v2.id){
              this.tableDataRight.splice(k2,1);
            }
          });
        });
      },
      // 左侧选中数据
      handleSelectionChange1(val) {
        this.multipleSelection1 = val;
      },
      // 右侧选中数据
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
      },
      // 浮层点击提交
      dialogSubmit() {
        // 清空右侧选中 数据
        this.tableDataRight = [];
        this.multipleSelection2 = [];
        // 更新 表格数据
        this.tableInitChange();
      },
    },
  }
</script>

<style lang="scss">

.customer-distribution-page{
  .search-box{
    .w-150{
      width: 150px!important;
    }
  }
  .table-box{
    min-height: 500px;
    .m-add{
      position: absolute;
      left: calc(100% / 2 - 31px);
      top: 160px;
    }
    .m-delete{
      position: absolute;
      left: calc(100% / 2 - 31px);
      margin-left: 0;
      top: 300px;
    }
  }
}

</style>