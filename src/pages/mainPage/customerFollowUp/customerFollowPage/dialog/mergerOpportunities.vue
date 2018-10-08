<template>
  <div class="distribution-advisor-dialog">
    <el-dialog
      title="客户合并"
      width="600px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    > 
    <h3 class="h3 ml-10">请点击选择主客户，点击确定选中被合并人的关系</h3>
      <div class="table-box"> 
          <el-table
          :data="selectsOptions"
          border
          style="width: 100%"
          highlight-current-row
          @row-click="handleRowClick"
          ref="table"
          >
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="tel" label="手机号"></el-table-column>
            <el-table-column prop="cstLevel" label="客户级别"></el-table-column>
            <el-table-column prop="buyStage" label="购房阶段"></el-table-column>
            
          </el-table>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <upDataCouster @closetable = 'handleClose' ref="upDataCouster"></upDataCouster>
  </div>
  
</template>

<script>
  import upDataCouster from './upDataCouster.vue'
//
 // 获取请求接口
  import {
    mergerOpportunities,//合并商机
  } from '@/api/pages/mainPage/customerFollowUp'
  export default {
    components : {
     upDataCouster
    },
    data() {
      return {
        radio:'',
        dialogVisible : false,
        // 表格数据
        tableData : [],
        // 选中数据
        currentRow : null,
        // 下拉 列表
        options : [],
        //获取父组件传的值
        value:'',
        //是否是主商机
        isMain:'0',
        //选中的主商机
        selectChecked:'',
        //列表
        selectsOptions:[]
      }
    },

    created() {
    },
    mounted() {
      //this.getOptions();
    },
    methods : {
      handleRowClick(row){
        this.selectChecked = row
      },
      show(data) {
        this.dialogVisible = true;
        // 获取数据
        this.selectsOptions = data
      },

      /* ---------------------------浮层 相关----------------------------- */
      
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
        // 清空数据
        this.selectChecked = [];
        this.$emit('changeRight')
      },
      // 浮层提交 
      handleSubmit() {
          if(this.selectChecked.length<=0){
              this.$message({
                message: '请选择主客户',
                type: 'warning'
              });
          }else{
            this.$refs.upDataCouster.show(this.selectChecked,this.selectsOptions);
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

h3{
  border: none!important;
  margin: 0;
  padding: 0!important;
  margin-bottom: 20px;
}

</style>