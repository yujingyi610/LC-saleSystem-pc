<template>
    <div class="sign">
        <div class="searchForm">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="案场名称">
                    <el-select v-model="formInline.projectId" clearable>
                        <el-option v-for="(item, index) in caseNameOption" :key="index" :label="item.projectName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签到人">
                    <el-input v-model="formInline.signUserName"></el-input>
                </el-form-item>
                <el-form-item label="签到时间">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="formInline.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                
                <el-button type="success" @click="handlereceptionList">查询</el-button>
                
            </el-form>
        </div>
        <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="caseName" label="案场名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userSignName" label="签到人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="signTime" label="签到时间" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        
    </div>
</template>

<script>
import {receptionList, getAllProject} from '@/api/pages/mainPage/systemManagement/caseManagement/index.js'
    export default {
        data() {
            return{
                formInline: {// 头部搜索Form表单
					projectId: '',// 案场名称
					// caseId: '',// 案场ID
					date: '',// 签到时间
					signUserName: '',// 签到人
                },
                caseNameOption: [],
                tableData: [],
                currentPage: 1,// 分页当前页数
				pageSize: 10, // 分页数量
                total: 0,// 总数

            }
        },
        methods: {
            handlegetAllProject() {// 获取案场下拉数据
                getAllProject().then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.caseNameOption = res.data;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handlereceptionList() {
                let params = new URLSearchParams();
                if( this.formInline.projectId ){
                    params.append('caseId', this.formInline.projectId)
                }
                params.append('signUserName', this.formInline.signUserName)
                if( this.formInline.date ){
                    params.append('signStartTime', this.formInline.date[0])
                    params.append('signEndTime', this.formInline.date[1])
                }
                params.append('pageNum', this.currentPage)
                params.append('pageSize', this.pageSize)
                receptionList(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.handlereceptionList()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.handlereceptionList()
            }
        },
        created() {
            this.handlereceptionList()
            this.handlegetAllProject()
        }
    }
</script>

<style scoped>
.sign{
    /* background: #fff; */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    overflow: auto;
}
.searchForm{
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	box-sizing: border-box;
	padding: 20px;
    margin-bottom: 20px;
}
</style>