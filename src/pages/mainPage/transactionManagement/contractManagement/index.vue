<template>
	<div id="contract">
		<div class="main">
			<div class="main_header">
				<el-radio-group v-model="radio" style="float: left" @change="handleChangeTab">
					<el-radio-button label="草稿"></el-radio-button>
					<el-radio-button label="已提交"></el-radio-button>
					<el-radio-button label="已审批"></el-radio-button>
				</el-radio-group>
				<div style="float: right">
					<el-button type="success" @click="handleAdd" v-has="'trd:qy:add'">新增</el-button>	
				</div>
			</div>
			<draft-table ref="draftRef" v-if="radio === '草稿'"></draft-table>
			<submitted-table v-else-if="radio === '已审批'"></submitted-table>
			<approved-table v-else-if="radio === '已提交'"></approved-table>
		</div>
		<add v-if="isAdd" @closeChild="handleCloseChild"></add>
	</div>
</template>

<script>
import draftTable from './draftTable'// 草稿table
import submittedTable from './submittedTable'// 已提交table
import approvedTable from './approvedTable'// 已提交table
import add from './add'// 新建签约单
	export default {
		components: {
			draftTable,
			submittedTable,
			approvedTable,
			add
		},
		data() {
			return{
				radio: '草稿',// tap当前选中
				isAdd: false,// 控制新建认筹单
			}
		},
		methods: {
			handleChangeTab(value) {// 切换tab
				// console.log(value);
				// this.$refs.tableList.handleGetList(value);
			},
			handleAdd() {// 新建按钮
				this.isAdd = true;
				this.radio = '';
			},
			handleCloseChild() {// 关闭新增签约单组件
				this.radio = '';	
				this.isAdd = false;				
				this.radio = '草稿';			
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