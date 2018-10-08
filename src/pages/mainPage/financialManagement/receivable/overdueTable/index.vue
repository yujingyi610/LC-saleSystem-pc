<template>
    <div>
        <!-- 已逾期 -->
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
                    <el-col :span="8">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否款清">
                             <el-radio-group v-model="formInline.isReleased">
                                <el-radio :label="0">全部</el-radio>
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
						</el-form-item>
                    </el-col>
                    <el-form-item style="float: right">
						<el-button type="primary" @click="handleReset">重置</el-button>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-form-item>
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
            <el-table-column prop="unreceivedAmount" label="逾期金额" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.OverdueDays > 0?scope.row.unreceivedAmount:0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="OverdueDays" label="逾期天数" min-width="80"></el-table-column>
            <el-table-column prop="houseDesc" label="按揭状态" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="finReceivablePlanOverdue.receivableCause" label="逾期原因" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column label="措施" min-width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- <span v-if="scope.row.nolleDate">
                            已撤诉
                    </span>
                    <span v-else-if="!scope.row.nolleDate && (scope.row.finReceivableProsecute || (scope.row.finReceivableProsecuteList && scope.row.finReceivableProsecuteList.length > 0))">
                            已起诉
                    </span>
                    <span v-else>
                        未起诉
                    </span>/
                    <span v-if="scope.row.finReceivablePlan && scope.row.finReceivablePlan.dealOverdueStatus === 1">
                            已延期
                    </span>
                    <span v-else>
                            未延期
                    </span> -->
                    <span v-if="scope.row.finReceivableForm && scope.row.finReceivableForm.prosecutionState === 1">
                            已起诉
                    </span>
                    <span v-else-if="scope.row.finReceivableForm && scope.row.finReceivableForm.prosecutionState === 2">
                            已撤诉
                    </span>
                    <span v-else>
                        未起诉
                    </span>/
                    <span v-if="scope.row.finReceivablePlan && scope.row.finReceivablePlan.dealOverdueStatus === 1">
                            已延期
                    </span>
                    <span v-else>
                            未延期
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="finReceivablePlanOverdue.planRecycleDate" label="计划回笼日期" min-width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.finReceivablePlanOverdue && scope.row.finReceivablePlanOverdue.planRecycleDate">
                        {{scope.row.finReceivablePlanOverdue.planRecycleDate.split(' ')[0]}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="处理人/处理时间" min-width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.finReceivablePlanOverdue && scope.row.finReceivablePlanOverdue.updateTime">
                        {{scope.row.finReceivablePlanOverdue.updateUser}}/{{scope.row.finReceivablePlanOverdue.updateTime.split(' ')[0]}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="formCode" label="业务单号" min-width="150" show-overflow-tooltip ></el-table-column>
            <el-table-column label="操作" width="120"  >
                <template slot-scope="scope">
                    <div>
                        <!-- <el-button type="text" @click="handleDelect(scope.row)">删除</el-button> -->
                        <el-button type="text" @click="handleLookHistory(scope.row)">历史</el-button>
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

        <history-dialog ref="historyDialogRef"></history-dialog>

        <!-- <el-dialog title="已逾期" :visible.sync="infoDialogFlag" width="900px"> -->
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
import {getList, getOverdueHistory, getAccountReceivable} from '@/api/pages/mainPage/financialManagement/receivable'

import longInput from '@/components/dialogLongInput'// 选择房号input框
import houseDetail from '@/components/houseDetail'// 选择房号弹框
import look from '../../../transactionManagement/contractManagement/submittedTable/look'// 点击房名查看签约单

import historyDialog from './historyDialog.vue'
import infoDialog from '../infoDialog'
    export default {
        components: {
			longInput,
            houseDetail,
            look,
            historyDialog,
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
                    checkList: ['最新', '历史'],
                    isReleased: 0
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
                this.formInline.isReleased = 0
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
                if( this.formInline.isReleased ){
                    params.append('isReleased', this.formInline.isReleased)
                }
                params.append('pageSize', this.pageSize)
                params.append('pageNum', this.currentPage)
                params.append('status', 'overdue')
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
            // handleDelect(row) {

            // },
            handleLookHistory(row) {// 历史
                let params = new URLSearchParams();
                if( row.finReceivablePlan && row.finReceivablePlan.id ){
                    params.append('receivablePlanId', row.finReceivablePlan.id)
                }
                
                getOverdueHistory(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        this.$refs.historyDialogRef.show(res.data)
                    }
                })
                // this.$refs.historyDialogRef.show()
            },
            handleLookInfo(row) {// 详情
                let params = new URLSearchParams();
                if( row.finReceivablePlanOverdue && row.finReceivablePlanOverdue.id ){
                    params.append('overdueId', row.finReceivablePlanOverdue.id)
                }
                else if( row.finReceivablePlanMortgage && row.finReceivablePlanMortgage.id ){
                    params.append('mortgageId', row.finReceivablePlanMortgage.id)
                }else{
                    params.append('paymentId', row.paymentId)
                }
                
                getAccountReceivable(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        // this.infoDialogFlag = true;
                        this.$refs.infoDialogRef.show(res.data, '已逾期')
                        
                    }
                })
                
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