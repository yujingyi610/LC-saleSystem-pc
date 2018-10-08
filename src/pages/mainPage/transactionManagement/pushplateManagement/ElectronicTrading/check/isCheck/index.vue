<template>
    <div>
        <el-table :data="signInList" border height="250" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="customName" label="客户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tel" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="raiseCode" label="认筹号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="signTime" label="签到时间" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  watch: {
    data() {
      this.signInList = this.data.signInList;
    }
  },
  data() {
    return {
      signInList: []
    };
  }
};
</script>

<style scoped>
</style>