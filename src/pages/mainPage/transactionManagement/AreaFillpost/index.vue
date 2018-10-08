<template>
	<div>
		<div class="main">
			<div class="main_header">
				<el-radio-group v-model="radio" style="float: left" @change="handleChangeTab">
					<el-radio-button label="草稿"></el-radio-button>
					<el-radio-button label="我提交的"></el-radio-button>
				</el-radio-group>
                <div style="float: right">
                    <el-button type="success" @click="addPlan">新增</el-button>
                </div>
			</div>
			<div class="searchForm">
				<el-form :inline="true" :model="formInline">
                    <el-form-item label="项目名称">
                        <el-select v-model="formInline.projectName">
                            <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="制定时间">
                        <el-date-picker v-model="formInline.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="方案名称">
                        <el-input v-model="formInline.planName"></el-input>
                    </el-form-item>
                    <el-button type="success">查询</el-button>
					
				</el-form>
			</div>
            <table-list ref="tableListRef"></table-list>
            <add-dialog ref="addDialogFlag"></add-dialog>
		</div>
	</div>
</template>

<script>
import tableList from './table'// table
import addDialog from './addDialog'// dialog
	export default {
		components: {
            tableList,
            addDialog
		},
		data() {
			return{
				/*********顶部搜索form数据***********/
				projectNameOption: [{// 选择项目名称下拉数据
					value: '绿城.杭州蘭园'
				}],
				releasesOption: [{// 选择推盘批次下拉数据
					value: '第一批'
				}],
				formInline: {// 头部搜索Form表单
					projectName: '',// 项目名称
					date: '',// 制定时间
					planName: '',// 方案名称
				},
				radio: '草稿',// tap当前选中
			}
		},
		methods: {
			handleReset() {// 点击顶部重置按钮

			},
			handleSearch() {// 点击顶部搜索按钮
				alert('submit!')
			},
			handleChangeTab(value) {// 切换tab
				// console.log(value);
				this.$refs.tableListRef.handleGetList(value);
            },
            addPlan() {// 点击新增按钮，打开新增面积补差弹框
                this.$refs.addDialogFlag.show();
            }
		}
	}
</script>

<style scoped>
.searchForm{
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	box-sizing: border-box;
	padding: 20px 0;
}
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