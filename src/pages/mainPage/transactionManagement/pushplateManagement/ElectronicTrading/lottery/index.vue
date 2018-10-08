<template>
    <div style="height: 440px">
        <el-container class="height100">
            <el-main style="padding: 0">
                <el-card class="box-card margin_bottom20">
                    <div slot="header" class="clearfix">
                        <span>摇中人员列表</span>
                    </div>
                    <div class="text item height100">
                        <el-table :data="RollPeopleList" style="width: 100%">
                            <el-table-column prop="index" label="轮次/序号" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="customName" label="客户姓名" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="tel" label="手机号" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="raiseCode" label="认筹号" show-overflow-tooltip></el-table-column>
                            <!-- <el-table-column prop="isGo" label="是否已进入"></el-table-column> -->
                        </el-table>
                    </div>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { getLotteListRecords } from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      RollPeopleList: [
      ]
    };
  },
  methods: {
    handleGetLotteListRecords() {
      getLotteListRecords({ batchId: this.row.id }).then(res => {
        this.RollPeopleList = res.data;
      });
    }
  },
  created() {
    this.handleGetLotteListRecords();
  }
};
</script>

<style scoped lang="scss">
.form {
  margin-bottom: 20px;
}
.card {
  overflow: hidden;
  padding: 0 20px;
  .header {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
  }
}
</style>