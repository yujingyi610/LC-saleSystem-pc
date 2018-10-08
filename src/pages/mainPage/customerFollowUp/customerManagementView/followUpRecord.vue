<template>
  <div class="follow-up-record">
    <div class="table-box mt-20">
      <el-table
      :data="tableData"
      border
      style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="userRealName" label="跟进人"></el-table-column>
        <el-table-column prop="followMethod" label="跟进方式"></el-table-column>
        <el-table-column prop="followDate" label="跟进时间"></el-table-column>
        <el-table-column prop="nextFollowDate" label="下次跟进时间"></el-table-column>
        <el-table-column show-overflow-tooltip prop="content" label="跟进内容" width="400px"></el-table-column>
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
    <followUpAddDialog @getInit='initTableList' ></followUpAddDialog>
  </div>
</template>

<script>
  import '@/assets/styles/reset.scss';

  import followUpAddDialog from './../customerFollowPage/dialog/followUpAddDialog.vue'
  // 获取请求接口
  import {
      getOpportunityList //获取分页列表
  } from '@/api/pages/mainPage/customerFollowUp'

  export default {
    components :{
      followUpAddDialog,
    },
    data() {
      return {
        // table list
        tableData : [{},{}],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        //客户id
        customId:''
      }
    },


    mounted() {
      this.customId = this.$route.query.id
      this.initTableList()

    },
    methods : {
      /* --------------------------表格相关方法------------------------------------- */
      // 更新表格 数据
      initTableList() {
          let data={
            pageNum:this.currentPage,
            pageSize:this.pageSize,
            customId:this.customId
          }          
        getOpportunityList(data).then((res) => {
            if(res.status === 200){
                this.tableData = res.data.list 
                this.total = res.data.total  
                for(let i =0;i<this.tableData.length;i++){
                for(let k in this.tableData[i]){
                if(this.tableData[i][k] ===''||this.tableData[i][k]===null){
                    this.tableData[i][k] = '--'
                }
              }
            }       
            }
        });   

      },
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
      /* --------------------------表格相关方法------------------------------------- */
    },
  }
</script>

<style lang="scss" scoped>

.follow-up-record{
  .el-table .cell{
    white-space: pre-wrap!important;

  }
  .el-table th div{
    overflow:visible!important;

  }
}
body  .el-table .cell{
  white-space: pre-wrap!important;
}


</style>