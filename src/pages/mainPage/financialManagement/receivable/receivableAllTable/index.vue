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
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
					<el-col :span="16">
                        <el-form-item label="房间名称">
                            <div @click="handleFindHouse">
                                <long-input :val="formInline.houseName"></long-input>
                            </div>
                        </el-form-item>
					</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="是否逾期">
                             <el-radio-group v-model="formInline.isOverdue">
                                <el-radio :label="0">全部</el-radio>
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否按揭">
                             <el-radio-group v-model="formInline.isMortgage">
                                <el-radio :label="0">全部</el-radio>
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否起诉">
                             <el-radio-group v-model="formInline.isProsecute">
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
         <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="45"></el-table-column> -->
            <el-table-column prop="customName" label="客户名称" min-width="80"></el-table-column>
            <el-table-column label="房间名称" min-width="150" class-name="table_houseName canClickHouseName">
                <template slot-scope="scope">
                    <span @click="handleLookSignInfo(scope.row)">{{scope.row.houseFullName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="paymentItemName" label="款项类型" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="receivableAmount" label="应收金额" min-width="80"></el-table-column>
            <el-table-column prop="receivedAmount" label="已收金额" min-width="80"></el-table-column>
            <el-table-column prop="receivableDate" label="应收日期" min-width="100"></el-table-column>
            <el-table-column label="逾期金额" min-width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.OverdueDays > 0?scope.row.unreceivedAmount:0}}</span>
                </template>
            </el-table-column>
            <el-table-column label="逾期原因" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.finReceivablePlanOverdue">{{scope.row.finReceivablePlanOverdue.receivableCause}}</span>
                </template>
            </el-table-column>
            <el-table-column label="逾期措施" min-width="80" show-overflow-tooltip>
                <template slot-scope="scope">
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
            <el-table-column prop="formCode" label="业务单号" min-width="150" show-overflow-tooltip ></el-table-column>
            <el-table-column label="操作" width="80"  >
                <template slot-scope="scope">
                    <div>
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
        <!-- table详情 -->
        <look-info-dialog ref="LookInfoDialogRef"></look-info-dialog>
    </div>
</template>

<script>
import { getList, getAccountReceivable } from '@/api/pages/mainPage/financialManagement/receivable'
import {getCityList, getPrjByCityId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getInfo} from '@/api/pages/mainPage/transactionManagement/contractManagement'

import longInput from '@/components/dialogLongInput'// 选择房号input框
import houseDetail from '@/components/houseDetail'// 选择房号弹框
import look from '../../../transactionManagement/contractManagement/submittedTable/look'// 点击房名查看签约单

import LookInfoDialog from './lookInfoDialog.vue'
    export default {
        components: {
			longInput,
            houseDetail,
            look,
            LookInfoDialog
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
                cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
                formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
                    userName: '',// 客户姓名
					code: '',// 业务编号
					houseName: '',// 房间名称
                    houseId: '',// 房间id
                    isOverdue: 0,
                    isMortgage: 0,
                    isProsecute: 0,
                },
                tableData: [],// 列表数据
                multipleSelection: [],// table复选框选中数据
                currentPage: 1,// 分页当前页数
				pageSize: 10, // 分页数量
                total: 0,// 总数
                isLook: false,
                row: null
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
                this.formInline.isOverdue = 0;
                this.formInline.isMortgage = 0;
                this.formInline.isProsecute = 0;
                // this.formInline = {// 头部搜索Form表单
				// 	cityCompany: '',// 城市公司
				// 	projectName: '',// 项目名称
                //     userName: '',// 客户姓名
				// 	code: '',// 业务编号
                //     houseName: '',// 房间名称
                //     houseId: '',// 房间id
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
                if( this.formInline.isOverdue ){
                    params.append('isOverdue', this.formInline.isOverdue)
                }
                if( this.formInline.isMortgage ){
                    params.append('isMortgage', this.formInline.isMortgage)
                }
                if( this.formInline.isProsecute ){
                    params.append('isProsecute', this.formInline.isProsecute)
                }
                params.append('pageSize', this.pageSize)
                params.append('pageNum', this.currentPage)
                params.append('status', 'all')
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
            handleLookInfo(row) {// table详情
                let params = new URLSearchParams();
                if( row.finReceivablePlanOverdue && row.finReceivablePlanOverdue.id ){
                    params.append('overdueId', row.finReceivablePlanOverdue.id)
                }
                if( row.finReceivablePlanMortgage && row.finReceivablePlanMortgage.id ){
                    params.append('mortgageId', row.finReceivablePlanMortgage.id)
                }else{
                    params.append('paymentId', row.paymentId)
                }
                if( row.finReceivableProsecute && row.finReceivableProsecute.id ){
                    params.append('prosecuteId', row.finReceivableProsecute.id)
                }
                
                getAccountReceivable(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        this.$refs.LookInfoDialogRef.show(res.data)
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