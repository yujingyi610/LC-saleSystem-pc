<template>
	<div id="receivable">
		<div class="main">
			<div class="main_header">
				<el-radio-group v-model="radio" style="float: left" @change="handleChangeTab">
					<el-radio-button label="应收处理"></el-radio-button>
					<el-radio-button label="已逾期"></el-radio-button>
					<el-radio-button label="已起诉"></el-radio-button>
					<el-radio-button label="已按揭"></el-radio-button>
					<el-radio-button label="所有应收"></el-radio-button>
				</el-radio-group>
				<div style="float: right">
					<!-- <el-button type="success" @click="handleExport">导出</el-button>	 -->
				</div>
			</div>
			<pending-table v-if="radio === '应收处理'"></pending-table>
			<overdue-table v-else-if="radio === '已逾期'"></overdue-table>
			<indict-table v-else-if="radio === '已起诉'"></indict-table>
			<mortgaged-table v-else-if="radio === '已按揭'"></mortgaged-table>
			<receivable-all-table v-else-if="radio === '所有应收'"></receivable-all-table>
		</div>
		
	</div>
</template>

<script>
import pendingTable from './PendingTable'
import overdueTable from './overdueTable'
import indictTable from './indictedTable'
import MortgagedTable from './MortgagedTable'
import receivableAllTable from './receivableAllTable'
	export default {
		components: {
			pendingTable,
			overdueTable,
			indictTable,
			MortgagedTable,
			receivableAllTable
		},
		data() {
			return{
				radio: '应收处理',// tap当前选中
			}
		},
		methods: {
			handleChangeTab(value) {// 切换tab
				// this.$refs.tableList.handleGetList(value);
			},
			handleExport() {// 导出
				
			},
		}
	}
</script>

<style scoped>

.main{
	background: #fff;
	overflow: hidden;
	box-sizing: border-box;
	padding: 20px;
	/* position: absolute;
	top: 0;
	bottom: 0; */
}
.main_header{
	overflow: hidden;
	border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
}

</style>