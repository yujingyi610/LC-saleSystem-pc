<template>
    <div>
        <!-- 已起诉 -->
        <!-- 头部搜索form -->
		<div class="searchForm">
			<el-form :inline="true" :model="formInline">
                <el-row>
					<el-col :span="8">
                        <el-form-item label="城市公司">
                            <el-select v-model="formInline.cityCompany" :clearable="cityCompanyOption.length > 1">
                                <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
					</el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称">
                            <el-select v-model="formInline.projectName" :clearable="projectNameOption.length > 1">
                                <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="业务单号">
                            <el-input v-model="formInline.code"></el-input>
                        </el-form-item>
					</el-col>
                    
				</el-row>
                <el-row>
					<el-col :span="8">
                        <el-form-item label="房间名称">
                            <div @click="handleFindHouse">
                                <long-input :val="formInline.houseName"></long-input>
                            </div>
                        </el-form-item>
					</el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="处理日期:">
                            <el-date-picker v-model="formInline.createTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        </el-form-item>
					</el-col> -->
                    <el-col :span="8">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
                    <el-form-item style="float: right">
						<el-button type="primary" @click="handleReset">重置</el-button>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-form-item>
                </el-row>
                <el-row>
                    <!-- <el-col :span="8">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="8">
                        <el-form-item label="起诉状态">
                            <el-checkbox-group v-model="formInline.checkList" @change="handleSearch">
                                <el-checkbox label="已起诉"></el-checkbox>
                                <el-checkbox label="已撤销"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
					</el-col> -->
                    <!-- <el-form-item style="float: right">
						<el-button type="primary" @click="handleReset">重置</el-button>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-form-item> -->
                </el-row>
			</el-form>
		</div>
         <el-table :data="tableData" border style="width: 100%">
            <!-- <el-table-column type="selection" width="45"></el-table-column> -->
            <el-table-column prop="customName" label="客户名称" min-width="80"></el-table-column>
            <el-table-column label="房间名称" min-width="150" class-name="table_houseName canClickHouseName">
                <template slot-scope="scope">
                    <span @click="handleLookSignInfo(scope.row)">{{scope.row.houseFullName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="合同金额" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.trdSignForm">{{scope.row.trdSignForm.contractAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="paymentItemName" label="款项类型" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="签约日期" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.trdSignForm && scope.row.trdSignForm.signDate">{{scope.row.trdSignForm.signDate.split(' ')[0]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="houseDesc" label="起诉状态" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.finReceivableForm">
                        <span v-if="!scope.row.nolleDate">
                            已起诉
                        </span>
                        <span v-else>
                            已撤诉
                        </span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="处理人/处理时间" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.finReceivableForm && scope.row.finReceivableForm.updateTime">
                        {{scope.row.finReceivableForm.updateUser}}/{{scope.row.finReceivableForm.updateTime.split(' ')[0]}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="formCode" label="业务单号" min-width="150" show-overflow-tooltip ></el-table-column>
            <el-table-column label="操作" width="200"  >
                <template slot-scope="scope">
                    <div>
                        <el-button v-if="!scope.row.nolleDate" type="text" @click="handleRedact(scope.row)">编辑</el-button>
                        <el-button v-if="!scope.row.nolleDate" type="text" @click="handleRevoke(scope.row)">撤销</el-button>
                        <el-button type="text" @click="handleLookInfo(scope.row)">详情</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
		<el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 选择房号弹框 -->
        <house-detail ref="houseRef" @chooseHouse="handleChooseHouse"></house-detail>
       
        <!-- 查看签约单详情 -->
        <look v-if="isLook" :data="row" @closeChild="handleCloseChild"></look>
        <!-- 编辑起诉单 -->
        <redact-dialog ref="RedactDialogRef" @update="handleSearch"></redact-dialog>
        <!-- 撤诉单 -->
        <revoke-dialog ref="revokeDialogRef" @update="handleSearch"></revoke-dialog>

        <!-- <el-dialog title="已起诉详情" :visible.sync="infoDialogFlag" width="900px" v-if="infoDialogFlag"> -->
			<info-dialog ref="infoDialogRef"></info-dialog>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button type="success" @click="infoDialogFlag = false">确定</el-button>
			</span>
		</el-dialog> -->
    </div>
</template>

<script>
import {getCityList, getPrjByCityId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getInfo} from '@/api/pages/mainPage/transactionManagement/contractManagement'

import {getList, getAccountReceivable} from '@/api/pages/mainPage/financialManagement/receivable'

import longInput from '@/components/dialogLongInput'// 选择房号input框
import houseDetail from '@/components/houseDetail'// 选择房号弹框
import look from '../../../transactionManagement/contractManagement/submittedTable/look'// 点击房名查看签约单

import RedactDialog from '../PendingTable/dialog/indict.vue'// 编辑起诉单
import revokeDialog from './revokeDialog.vue'// 撤诉单
// import infoDialog from './infoDialog.vue'// 撤诉单

import infoDialog from '../infoDialog'
    export default {
        components: {
			longInput,
            houseDetail,
            look,
            RedactDialog,
            revokeDialog,
            infoDialog
        },
        watch: {
			"formInline.cityCompany": function(e) {
                this.formInline.projectName = '';
                if( e ){
				    this.handleGetPrjByCityId({ id: e });
                }
			}
		},
        data() {
            return{
                statusOption: [
                    {name: '全部'},
                    {name: '已延期'},
                    {name: '已起诉'},
                    {name: '未处理'},
                ],
                cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
                formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
                    userName: '',// 客户姓名
					code: '',// 业务编号
					houseName: '',// 房间名称
					houseId: '',// 房间id
                    createTime: [],// 认购时间
                    priceFrom: '',// 逾期金额
                    priceTo: '',// 逾期金额
                    DayFrom: '',// 逾期天数
                    DayTo: '',// 逾期天数
                    status: '全部',// 跟进状态
                    checkList: ['已起诉', '已撤销']
                },
                tableData: [],// 列表数据
                multipleSelection: [],// table复选框选中数据
                currentPage: 1,// 分页当前页数
				pageSize: 10, // 分页数量
                total: 0,// 总数
                isLook: false,
                row: null,
                infoDialogFlag: false
            }
        },
        methods: {
            handleGetCityList() {// 获取城市公司
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                if( userInfo.cityId ){
                    this.cityCompanyOption.push({
                        id: userInfo.cityId,
                        name: userInfo.cityName,
                        code: userInfo.cityCode
					})
					this.formInline.cityCompany = this.cityCompanyOption[0].id;
                }else{
                    //获取城市公司列表
                    getCityList().then(res => {
                        if (res.status === 200) {
							this.cityCompanyOption = res.data;
							this.formInline.cityCompany = this.cityCompanyOption[0].id;
                        }
                    });
                }
				
			},
            handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){
                    this.projectNameOption= userInfo.projects;
                    this.projectNameOption.map(item=>{
                        item.name = item.projectName
					})
					if( this.projectNameOption[0] ){
						this.formInline.projectName = this.projectNameOption[0].id;
					}
					this.handleSearch();
                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
							this.projectNameOption = res.data;
							if( this.projectNameOption[0] ){
                                this.formInline.projectName = this.projectNameOption[0].id;
                            }
							this.handleSearch();
                        }
                    });
                }
            },
            handleFindHouse() {//查找房间
                this.$refs.houseRef.show()
            },
            handleChooseHouse(houseInfo) {// 选中房间，回显
                 
                if( houseInfo ){
                    this.formInline.houseName = houseInfo.houseFullName;
                    this.formInline.houseId = houseInfo.id;
                }
            },
            handleReset() {// 重置
                this.formInline.cityCompany = this.cityCompanyOption[0].id;// 城市公司
                this.formInline.projectName = this.projectNameOption[0].id;// 项目名称
                this.formInline.userName = '';// 客户姓名
                this.formInline.code = '';// 业务编号
                this.formInline.houseName = '';// 房间名称
                this.formInline.houseId = '';// 房间id
                this.formInline.createTime = '';// 认购时间
                this.formInline.priceFrom = '';// 合同金额
                this.formInline.priceTo = '';// 合同金额
                // this.formInline = {// 头部搜索Form表单
				// 	cityCompany: '',// 城市公司
				// 	projectName: '',// 项目名称
                //     userName: '',// 客户姓名
				// 	code: '',// 业务编号
                //     houseName: '',// 房间名称
                //     houseId: '',// 房间id
                //     createTime: [],// 认购时间
                //     priceFrom: '',// 合同金额
                //     priceTo: '',// 合同金额
                //     checkList: ['按揭', '逾期']
                // };
                // this.cityCompanyOption = []
                // this.projectNameOption = []
                // this.handleGetCityList()
            },
            handleSearch() {// 查询
                let params = new URLSearchParams();
                if( this.formInline.cityCompany ){
                    params.append('cityId', this.formInline.cityCompany)
                }
                if( this.formInline.projectName ){
                    params.append('projectId', this.formInline.projectName)
                }
                if( this.formInline.houseId ){
                    params.append('houseFullName', this.formInline.houseId)
                }
                if( this.formInline.userName ){
                    params.append('customName', this.formInline.userName)
                }
                if( this.formInline.code ){
                    params.append('itemCode', this.formInline.code)
                }
                params.append('pageSize', this.pageSize)
                params.append('pageNum', this.currentPage)
                params.append('status', 'prosecute')
                getList(params).then(res=>{
                    console.log(res);
                    if( res.status === 200 ){
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                        this.tableData.map(item=>{
                            let day = parseInt((new Date() - new Date(item.receivableDate))/(1000*60*60*24))
                            if( day > 0 ){
                                item.OverdueDays = day;
                            }else{
                                item.OverdueDays = 0;
                            }
                            item.receivableDate = item.receivableDate.split(' ')[0];
                        })
                    }else{
                        this.tableData = [];
                    }
                })
            },
            handleSelectionChange(val) {// 保存复选框选中的table的数据
                this.multipleSelection = val;
            },
            handleLookSignInfo(row) {// 点击房号触发，查看签约详细信息
                if( !row.trdSignForm ){
                    this.$message.error('未找到对应签约单！')
                    return
                }
                getInfo({ id: row.trdSignForm.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.row = res.data;
                        this.isLook = true;
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            
            handleCloseChild() {// 关闭查看详情
                this.isLook = false;
                setTimeout(_=>{
                    this.handleSearch();
                },500)
                
            },
            handleRedact(row) {// 编辑
                let params = new URLSearchParams();
                params.append('prosecuteId', row.prosecuteId)
                
                getAccountReceivable(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        this.$refs.RedactDialogRef.show(res.data)
                    }
                })
            },
            handleRevoke(row) {// 撤销
                let params = new URLSearchParams();
                params.append('prosecuteId', row.prosecuteId)
                
                getAccountReceivable(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        this.$refs.revokeDialogRef.show(res.data)
                    }
                })
                // this.$refs.revokeDialogRef.show()
            },
            handleLookInfo(row) {// 查看详情
                let params = new URLSearchParams();
                 params.append('prosecuteId', row.prosecuteId)
                
                getAccountReceivable(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        // this.infoDialogFlag = true;
                        this.$refs.infoDialogRef.show(res.data, '已起诉详情')
                        
                    }
                })
                // this.infoDialogFlag = true;
            },
            /**********分页相关************/
            handleSizeChange(val) {
				//  
				this.pageSize = val;
                this.handleSearch()
            },
            handleCurrentChange(val) {
				//  
				this.currentPage = val;
                this.handleSearch() 
            },
        },
        mounted() {
            this.handleGetCityList()
        },
    }
</script>

<style scoped>
.amongInput{
    width: 50px;
    display: inline-block;
    text-align: center;
}

</style>