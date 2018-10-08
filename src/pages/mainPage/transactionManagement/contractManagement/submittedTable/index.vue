<template>
    <div>
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
                        <el-form-item label="推盘批次">
                            <el-select v-model="formInline.releases" clearable>
                                <el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
				</el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
					<el-col :span="8">
                        <el-form-item label="客户手机">
                            <el-input v-model="formInline.tel"></el-input>
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
                    <el-col :span="12">
                        <el-form-item label="签约日期:">
                            <el-date-picker v-model="formInline.createTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
            <el-table-column type="index" label="序号" width="50"  ></el-table-column>
            <el-table-column prop="houseFullName" label="房间名称" min-width="250" class-name="table_houseName"  ></el-table-column>
            <el-table-column label="客户姓名" min-width="150"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.showAll">
						<div v-for="(item, index) in scope.row.customs" :key="index" style="line-height: 30px">
							<div v-if="index === 0" style="color: #25AE50"  @click.stop.prevent="handleShowOne(scope.row)">
								<span >{{item.customName}}</span>
                        		<i class="el-icon-caret-top"></i>
							</div>
							<div v-else>{{item.customName}}</div>
						</div>
                    </div>
                    <div v-else style="color: #25AE50" @click.stop.prevent="handleShowAll(scope.row)">
                        <span>{{scope.row.customs[0].customName}}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="性别" width="50"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.showAll">
						<div v-for="(item, index) in scope.row.customs" :key="index" style="line-height: 30px">
							<div>{{item.sex}}</div>
						</div>
                    </div>
                    <div v-else>
                        <span>{{scope.row.customs[0].sex}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号" min-width="100"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.showAll">
						<div v-for="(item, index) in scope.row.customs" :key="index" style="line-height: 30px">
							<div>{{item.tel}}</div>
						</div>
                    </div>
                    <div v-else>
                        <span>{{scope.row.customs[0].tel}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="signCode" label="签约单号" min-width="130"  show-overflow-tooltip ></el-table-column>
            <el-table-column label="置业顾问" min-width="100"   show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.belongs && scope.row.belongs[0]">
                        {{scope.row.belongs[0].propertyConsultName}}
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="assigneeName" label="当前审批人" min-width="80"></el-table-column> -->
            <el-table-column label="操作" width="250"  >
                <template slot-scope="scope">
                    <div>
                        <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
                        <el-button @click.stop.prevent="handleMoveRoom(scope.row)" type="text" v-has="'trd:qy:applyback'">退房</el-button>
                        <el-button @click.stop.prevent="handleChangeRoom(scope.row)" type="text" v-has="'trd:qy:applychangehouse'">换房</el-button>
						
                    </div>
                    <div>
                        <el-button @click.stop.prevent="handleChangeName(scope.row)" type="text" v-has="'trd:qy:applychangename'">更名</el-button>
                        <el-button @click.stop.prevent="handlePutOff(scope.row)" type="text" v-has="'trd:qy:delaypay'">延期付款</el-button>
						<el-button @click.stop.prevent="handleContractChange(scope.row)" type="text" v-has="'trd:qy:change'">合同变更</el-button>
						<!-- <el-button @click.stop.prevent="handleOther(scope.row)" type="text">其他</el-button> -->
                    </div>
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
        <look v-if="isLook" :data="data" @closeChild="handleCloseChild"></look>
        <house-detail ref="houseRef" @chooseHouse="handleChooseHouse"></house-detail>

        <change-name-form v-if="changeNameFlag" :row='row' @closeChild="handleCloseChild"></change-name-form>
        <change-house-form v-if="changeHouseFlag" :row='row' @closeChild="handleCloseChild"></change-house-form>
        <back-house-form v-if="backHouseFlag" :row='row' @closeChild="handleCloseChild"></back-house-form>
        <contract-change v-if="ContractChangeFlag" :row='row' @closeChild="handleCloseChild"></contract-change>
        <put-off v-if="PutOffFlag" :row='row' @closeChild="handleCloseChild"></put-off>        
    </div>
</template>

<script>
import look from './look'
import houseDetail from '@/components/houseDetail'
import longInput from '@/components/dialogLongInput'

import {getCityList, getPrjByCityId, getBathList, getHouseViewBathID} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getList, getInfo} from '@/api/pages/mainPage/transactionManagement/contractManagement'


import changeNameForm from '@/components/form/changeName'
import ChangeHouseForm from '@/components/form/SignedChangeHouse'
import backHouseForm from '@/components/form/backHouse'
import ContractChange from '@/components/form/ContractChange'
import PutOff from '@/components/form/PutOff'

    export default {
        components: {
            look,
            changeNameForm,
            ChangeHouseForm,
            backHouseForm,
            ContractChange,
            PutOff,

            houseDetail,
            longInput
        },
        watch: {
			"formInline.cityCompany": function(e) {
				this.formInline.projectName = '';
                if( e )
				this.handleGetPrjByCityId({ id: e });
			},
			"formInline.projectName": function(e) {
				this.formInline.releases = '';
                if( e )
				this.handleGetBathList({ projectId: e });
			},
			"formInline.releases": function(e) {
				// this.formInline.releases = null;
				console.log(this.formInline)
                // this.handleGetHouseViewBathID({ batchId: e });
                // this.handleGetSignListSignInfos();
			},
        },
        data() {
            return{
                /*********顶部搜索form数据***********/
				cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
				formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
                    releases: '',// 推盘批次
                    userName: '',// 客户姓名
                    tel: '',// 客户手机
                    houseName: '',// 房间名称
                    createTime: [],// 认购时间
                },
                tableData: [],
                currentPage: 1,// 分页当前页数
                pageSize: 10, // 分页数量
                total: 0,// 总数
                data: null,// 
                isLook: false,
                row: {},// 传递给子组件的数据
				/**********各个表单flag**********/
				// signedFlag: false,// 签约
				changeNameFlag: false,// 更名
                changeHouseFlag: false,// 换房
                backHouseFlag: false,// 退房
                ContractChangeFlag: false,// 合同变迁
                PutOffFlag: false,// 延期付款
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
                    this.handleGetList();
                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
                            this.projectNameOption = res.data;
                            if( this.projectNameOption[0] ){
                                this.formInline.projectName = this.projectNameOption[0].id;
                            }
                            this.handleGetList();
                        }
                    });
                }
			},
			handleGetBathList(params) {// 通过项目ID获取推盘
				getBathList(params).then(res=>{
					 
					this.releasesOption = res.data;
				})
            },
            handleFindHouse() {//查找房间
                this.$refs.houseRef.show()
            },
            handleChooseHouse(houseInfo) {// 选中房间，回显
                 
                if( houseInfo ){
                    this.formInline.houseName = houseInfo.houseFullName;
                    this.formInline.houseId = houseInfo.id;
                }else{
                    this.formInline.houseName = '';
                    this.formInline.houseId = '';
                }
            },
            handleReset() {// 重置
                this.formInline.cityCompany = '';
                this.formInline.projectName = '';
                this.formInline.releases = '';
                this.formInline.userName = '';
                this.formInline.tel = '';
                this.formInline.houseName = '';
                this.formInline.houseId = '';
				
                this.formInline.createTime = [];
				this.currentPage = 1;
                this.pageSize = 10;
                this.handleGetCityList();
            },
            handleSearch() {// 点击顶部搜索按钮
				this.handleGetList();
			},
            handleGetList(value) {// 请求table数据
                let params = new URLSearchParams();
                params.append('projectCityId', this.formInline.cityCompany)
                params.append('projectId', this.formInline.projectName)
                params.append('batchId', this.formInline.releases);
                params.append('customName', this.formInline.userName);
                params.append('tel', this.formInline.tel);
                params.append('status', 'APPROVED')
                params.append('pageNum', this.currentPage);
                params.append('pageSize', this.pageSize);
                if( this.formInline.createTime && this.formInline.createTime[0] ){
                    params.append('signStartDate', this.formInline.createTime[0]);
                    params.append('signEndDate', this.formInline.createTime[1]);
                }
                if( this.formInline.houseId ){
                    params.append('houseId', this.formInline.houseId);
                }
                getList(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.tableData = res.data.list;
                        this.tableData.map(item=>{
                            this.$set(item, 'showAll', false);
                        })
                        this.total = res.data.total;
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            handleLookRow(row) {// 点击table某行触发，查看详细信息
                //  
                // console.log(this.title)
                // this.detailFlag = true;
                getInfo({ id: row.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.data = res.data;
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
                this.changeNameFlag = false;
                this.changeHouseFlag = false;
                this.backHouseFlag = false;
                this.ContractChangeFlag = false;
                this.PutOffFlag = false;
                setTimeout(_=>{
                    this.handleGetList();
                },500)
                
            },
            /********table中的操作按钮**********/
            handleMoveRoom(row) {// 退房
                getInfo({ id: row.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( !res.data.notChangeRemind ){
							this.row = res.data;
                            this.backHouseFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            handleChangeRoom(row) {// 换房
                getInfo({ id: row.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( !res.data.notChangeRemind ){
							this.row = res.data;
                            this.changeHouseFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            handleChangeName(row) {// 更名
                getInfo({ id: row.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( !res.data.notChangeRemind ){
							this.row = res.data;
                            this.changeNameFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            handlePutOff(row) {// 延期付款
                getInfo({ id: row.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( !res.data.notChangeRemind ){
							this.row = res.data;
                            this.PutOffFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            handleContractChange(row) {// 合同变更
                getInfo({ id: row.id }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( !res.data.notChangeRemind ){
							this.row = res.data;
                            this.ContractChangeFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },
            handleOther(row) {// 其他

            },
            /**********分页相关************/
            handleSizeChange(val) {
                 
                this.pageSize = val;
                this.handleGetList()
            },
            handleCurrentChange(val) {
                 
                this.currentPage = val;
                this.handleGetList()                
            },
            handleShowAll(row) {// 点击姓名中的箭头，展开该认购单的全部客户
                row.showAll = true;                   
            },
            handleShowOne(row) {// 点击姓名中的箭头，只显示该认购单的一个客户
                row.showAll = false;
            },
        },
        created() {
            this.handleGetCityList();
            // this.handleGetList();
        }
    }
</script>

<style scoped>
.searchForm{
	height:68px; 
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	box-sizing: border-box;
	padding: 20px 0;
}
.units{
	position: relative;
	float: left;
}
.units sup{
	position: absolute;
	top: -3px;
	right: -6px;
	transform:scale(0.7);  
	
}
</style>