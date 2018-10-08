<template>
	<div>
		<!-- 逾期历史弹框 -->
		<el-dialog title="逾期历史" :visible.sync="Flag" width="900px" v-if="Flag">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">逾期历史信息</span>
				</div>
				<el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="receivableAmount" label="当时逾期金额" min-width="100"></el-table-column>
            <el-table-column prop="receivableDays" label="当时逾期天数" min-width="100"></el-table-column>
            <el-table-column prop="receivableCause" label="逾期原因" min-width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="planRecycleDate" label="当时计划回笼日期" min-width="180"></el-table-column>
            <el-table-column prop="updateUser" label="处理人" min-width="80"></el-table-column>
            <el-table-column prop="updateTime" label="处理日期" min-width="100"></el-table-column>
        </el-table>
			</el-card>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="Flag = false">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
// import {  } from "@/api/pages/mainPage/financialManagement/receivable";
export default {
  watch: {},
  data() {
    return {
        Flag: false,
        tableData: []
    };
  },
  methods: {
    show(info) {
      if( info ){
        this.tableData = info;
        this.Flag = true;
      }
      
    }
  }
};
</script>

<style scoped>
</style>