<template>
	<div>
		<div class="main">
			<div class="main_header">
				<el-radio-group v-model="radio" style="float: left" @change="handleChangeTab">
					<el-radio-button label="草稿"></el-radio-button>
					<el-radio-button label="我提交的"></el-radio-button>
					<el-radio-button label="已审批"></el-radio-button>
				</el-radio-group>
			</div>
			
			<draft-table v-if="radio === '草稿'"></draft-table>
			<submitted-table v-else-if="radio === '我提交的'"></submitted-table>
			<approved-table v-else-if="radio === '已审批'"></approved-table>
		</div>
	</div>
</template>

<script>
import draftTable from './draftTable'// 草稿table
import submittedTable from './submittedTable'// 我提交的table
import approvedTable from './approvedTable'// 已审批的table
	export default {
		components: {
			draftTable,
			submittedTable,
			approvedTable
		},
		data() {
			return{
				radio: '草稿',// tap当前选中
			}
		},
		methods: {
			handleChangeTab(value) {// 切换tab
				// console.log(value);
				// this.$refs.tableList.handleGetList(value);
			}
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
	border-bottom: 1px solid #e5e5e5
}
</style>