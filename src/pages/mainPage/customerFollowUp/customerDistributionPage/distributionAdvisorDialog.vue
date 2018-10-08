<template>
  <div class="distribution-advisor-dialog">
    <el-dialog
      title="分配置业顾问"
      width="600px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    > 
      <div>
        <el-checkbox-group v-model="selectChecked">
          <el-checkbox class="m-label" :label="item.id" :key="item.id" v-for="(item) in selectsOptions">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        selectsOptions : [],
        selectChecked : [],
      }
    },
    methods : {
      show(row) {
        this.row = row;
        this.dialogVisible = true;
        let arr = [];
        for(let i = 0 ; i < 20 ; i ++ ){
          arr.push({name : `张三+${i}` , id : i});
        }
        this.selectsOptions = arr;
      },
      handleClose() {
        this.dialogVisible = false;
        // 清空数据
        this.selectChecked = [];
      },
      handleSubmit() {
        this.handleClose();
        this.$emit('submit');
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