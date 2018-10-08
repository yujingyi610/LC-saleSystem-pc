<template>
    <div class="sign">
        <div class="searchForm">
            <el-form :inline="true" :model="formInline">
                <!-- <el-form-item label="城市公司">
                    <el-select clearable v-model="formInline.cityCompany">
                        <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-select clearable v-model="formInline.projectName">
                        <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="案场名称">
                    <el-select clearable v-model="formInline.projectName">
                        <el-option v-for="(item, index) in caseNameOption" :key="index" :label="item.projectName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="success" @click="handleGetCaseList">查询</el-button>
                <el-button type="success" style="float: right" @click="handleOpenAdd">添加案场配置</el-button>
                
            </el-form>
        </div>
        <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="caseNo" label="接待系统用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="caseNm" label="案场" show-overflow-tooltip></el-table-column>
                <el-table-column prop="authCode" label="授权码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invalidTime" label="二维码失效时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleOpenRedact(scope.row)">修改</el-button>
                        <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
        <!-- 添加案场配置弹框 -->
        <el-dialog title="添加案场配置" :visible.sync="addFlag" width="70%" v-if="addFlag">
            <el-form label-width="120px">
                <el-form-item label="接待系统用户名:">
                    <el-input v-model="addForm.caseNo"></el-input>
                </el-form-item>
                <!-- <el-form-item label="城市公司">
                    <el-select clearable v-model="addForm.cityCompany">
                        <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="案场名称">
                    <el-select clearable v-model="addForm.projectName">
                        <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="案场名称:">
                    <el-select clearable v-model="addForm.projectName">
                        <el-option v-for="(item, index) in caseNameOption" :key="index" :label="item.projectName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授权码：">
                    <el-input v-model="addForm.authCode"></el-input>
                </el-form-item>
                <el-form-item label="二维码失效时间：">
                    <el-input v-model="addForm.invalidTime"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFlag = false">取 消</el-button>
                <el-button type="primary" @click="handleCaseSaveOrUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
  getCityList,
  getPrjByCityId
} from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";
import {caseSaveOrUpdate, GetCaseList, GetCaseInfo, deleteCase, getAllProject} from '@/api/pages/mainPage/systemManagement/caseManagement/index.js'
    export default {
        watch: {
            "formInline.cityCompany": function(e) {
                this.formInline.projectName = null;
                if( e ){
                    this.handleGetPrjByCityId({ id: e });
                }
                
            },
            "addForm.cityCompany": function(e) {
                this.addForm.projectName = null;
                if( e ){
                    this.handleGetPrjByCityId({ id: e });
                }
                
            }
        },
        data() {
            return{
                formInline: {// 头部搜索Form表单
                    cityCompany: {},
                    projectName: ''
                },
                caseNameOption: [],// 所有案场下拉数据
                tableData: [],
                currentPage: 1,// 分页当前页数
				pageSize: 10, // 分页数量
                total: 0,// 总数
                addForm: {
                    serialNo: '',
                    cityCompany: '',
                    projectName: '',
                    authCode: '',
                    invalidTime: 0,
                    id: null
                },
                cityCompanyOption: [],
                projectNameOption: [],
                addFlag: false
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
            handleGetCaseList() {// 获取列表
                let params = new URLSearchParams();
                // params.append('projectId', 'f65e7ca05a7811e8af88005056b44833')
                params.append('pageNum', this.currentPage)
                params.append('pageSize', this.pageSize)
                params.append('projectId', this.formInline.projectName)
                GetCaseList(params).then(res=>{
                     ; 
                    if( res.status === 200 ){
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleOpenAdd() {
                this.addForm = {
                    caseNo: '',
                    cityCompany: {},
                    projectName: '',
                    authCode: '',
                    invalidTime: 0,
                    id: null
                };
                // this.cityCompanyOption = [];
                // this.projectNameOption = [];
                // this.handleGetCityList()
                // this.caseNameOption = [];
                // this.handlegetAllProject()
                this.addFlag = true;
            },
            handleOpenRedact(row) {
                GetCaseInfo({ id: row.caseId }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.addFlag = true;
                        this.addForm.caseNo = res.data.caseNo;
                        this.addForm.authCode = res.data.authCode;
                        this.addForm.invalidTime = res.data.invalidTime;
                        this.addForm.caseId = res.data.caseId;
                        this.addForm.projectName = res.data.projectId;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleDel(row) {
                let params = new URLSearchParams();
                params.append('id', row.caseId)
                // params.append('yn', 0)
                deleteCase(params).then(res=>{
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        this.handleGetCaseList()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleGetCityList() {
                getCityList().then(res => {
                    if (res.status == 200) this.cityCompanyOption = res.data;
                });
            },
            handleGetPrjByCityId(params) {
                getPrjByCityId(params).then(res => {
                    if (res.status == 200) this.projectNameOption = res.data;
                });
            },
            handleCaseSaveOrUpdate() {//  保存/新增案场配置
                console.log(this.addForm)
                let data = {
                    authCode: this.addForm.authCode,// 授权码
                    id: this.addForm.caseId,
                    invalidTime: Number(this.addForm.invalidTime),// 二维码失效时间
                    projectId:  this.addForm.projectName,// 项目ID
                    serialNo: this.addForm.caseNo,// 编号
                }
                 
                caseSaveOrUpdate(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '保存成功！'
                        })
                        this.addFlag = false;
                        this.handleGetCaseList()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            /*******分页操作***********/
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleGetCaseList()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.handleGetCaseList()
            }
        },
        created() {
            this.handleGetCaseList();
            this.handleGetCityList();
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