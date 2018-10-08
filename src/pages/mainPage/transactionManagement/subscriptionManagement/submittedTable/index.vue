<template>
    <div>
		<!-- 头部搜索form -->
		<div class="searchForm">
			<el-form :inline="true" :model="formInline">
                <el-row>
					<el-col :span="6">
                        <el-form-item label="城市公司">
                            <el-select v-model="formInline.cityCompany" :clearable="cityCompanyOption.length > 1">
                                <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
					</el-col>
                    <el-col :span="6">
                        <el-form-item label="项目名称">
                            <el-select v-model="formInline.projectName" :clearable="projectNameOption.length > 1">
                                <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="推盘批次">
                            <el-select v-model="formInline.releases" clearable>
                                <el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="业务类型">
                            <el-select v-model="formInline.type" clearable>
                                <el-option v-for="(item, index) in typeOption" :key="index" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
				</el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
					<el-col :span="6">
                        <el-form-item label="客户手机">
                            <el-input v-model="formInline.tel"></el-input>
                        </el-form-item>
					</el-col>
                    <el-col :span="6">
                        <el-form-item label="认购单号">
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
                    <el-col :span="12">
                        <el-form-item label="认购时间:">
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
        <el-table :data="tableData" border style="width: 100%" v-if="!signedFlag && !changeNameFlag && !changeHouseFlag && !putOffFlag && !backHouseFlag">
            <el-table-column type="index" label="序号" width="50"  ></el-table-column>
            <el-table-column prop="houseDesc" label="房间名称" min-width="200" class-name="table_houseName"  ></el-table-column>
            <el-table-column prop="name" label="客户姓名" min-width="150"  >
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
            <el-table-column prop="sex" label="性别" width="50"  >
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
            <el-table-column prop="tel" label="手机号" width="100"  >
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
            <el-table-column prop="subscribeCode" label="认购单号" width="130"  show-overflow-tooltip ></el-table-column>
            <el-table-column prop="submitTime" label="提交日期" width="100"  show-overflow-tooltip >
				<template slot-scope="scope">
					{{scope.row.submitTime.split(' ')[0]}}
				</template>
			</el-table-column>
            <el-table-column prop="realPlanSignDate" label="计划签约日期" width="100"   show-overflow-tooltip>
				<template slot-scope="scope">
					{{scope.row.realPlanSignDate.split(' ')[0]}}
				</template>
			</el-table-column>
			<el-table-column prop="propertyConsultName" label="置业顾问" min-width="100"  show-overflow-tooltip ></el-table-column>
            <el-table-column label="操作" width="200"  >
                <template slot-scope="scope">
                    <div>
                        <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
                        <el-button @click.stop.prevent="handleSigned(scope.row)" type="text" v-has="'trd:qy:add'">签约</el-button>
                        <el-button @click.stop.prevent="handleMoveRoom(scope.row)" type="text" v-has="'trd:rg:back'">退房</el-button>
                        
                    </div>
                    <div>
						<el-button @click.stop.prevent="handleChangeRoom(scope.row)" type="text" v-has="'trd:rg:changehouse'">换房</el-button>
                         <el-button @click.stop.prevent="handleChangeName(scope.row)" type="text" v-has="'trd:rg:changename'">更名</el-button>
                        <el-button @click.stop.prevent="handlePutOff(scope.row)" type="text" v-has="'trd:rg:delay'">延期签约</el-button>
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
		<submit-dialog ref="detailRef"></submit-dialog>
		<house-detail ref="houseRef" @chooseHouse="handleChooseHouse"></house-detail>

		<signed-form v-if="signedFlag" :houseId='row.houseId' :batchId='row.batchId' :subscribeId="row.id" @closeChild="handleCloseChild"></signed-form>
		<change-name-form v-if="changeNameFlag" :row='row' @closeChild="handleCloseChild"></change-name-form>
        <change-house-form v-if="changeHouseFlag" :row='row' @closeChild="handleCloseChild"></change-house-form>
		<put-off-form v-if="putOffFlag" :row='row' @closeChild="handleCloseChild"></put-off-form>
		<back-house-form v-if="backHouseFlag" :row='row' @closeChild="handleCloseChild"></back-house-form>
    </div>
</template>

<script>
import {getCityList, getPrjByCityId, getBathList, getHouseViewBathID} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {listTrdSubscribeForm, getTrdSubscribeForm} from '@/api/pages/mainPage/transactionManagement/subscriptionManagement'
import submitDialog from '../submitDialog'
import longInput from '@/components/dialogLongInput'
import houseDetail from '@/components/houseDetail'

import signedForm from '@/components/form/signed'
import changeNameForm from '@/components/form/changeName1'
import changeHouseForm from '@/components/form/changeHouse'
import PutOffForm from '@/components/form/PutOff1'
import backHouseForm from '@/components/form/backHouse1'
    export default {
		
		components: {
			submitDialog,
			longInput,
			houseDetail,
			signedForm,// 签约表单
			changeNameForm,// 更名表单
			changeHouseForm,// 换房表单
			PutOffForm,// 延期签约表单
			backHouseForm,// 退房
		},
		watch: {
			"formInline.cityCompany": function(e) {
                this.formInline.projectName = '';
                if( e ){
				    this.handleGetPrjByCityId({ id: e });
                }
			},
			"formInline.projectName": function(e) {
                this.formInline.releases = '';
                if( e ){
                    this.handleGetBathList({ projectId: e });
                }                
			},
			
		},
        data() {
            return{
				cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
				typeOption: [
					{// 下拉菜单选项列表
						name: '全部',
						code: ''
					},{
						name: '已签约',
						code: 'SIGN'
					},{
						name: '未签约未逾期',
						code: 'DEADLINE'
					},{
						name: '未签约已逾期',
						code: 'OVERDUE'
					}
				],
				formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
                    releases: '',// 推盘批次
                    userName: '',// 客户姓名
					tel: '',// 客户手机
					code: '',// 认购单号
					type: '',
					houseName: '',// 房间名称
                    createTime: [],// 认购时间
                },
                tableData: [],// table数据
                detailFlag: false,// 查看详情弹框
				/***********新增认购单弹框内的数据*******/
				houseInfo: {},
				userTable: [{// 客户信息
					userName: '',// 客户姓名
					tel: '',// 手机号码
					cardType: '',// 证件类型
					IDcard: '',// 证件号码
				}],
				cardTypeOpiton: [{
					value: '身份证'
				}],
				IdentificationInfo: {// 认筹信息
					flag: '是',// 认筹金是否可转定金
					code: '',// 认筹单号
					price: '',// 认筹金额

				},
				paymentTable: [{// 付款信息
					type: '',// 房款类型
					receivable: '',// 应收金额（元）
					date: '',// 应收日期
					receivedPrice: '',// 已收金额（元）
					uncollectedPrice: '',// 未收金额（元）
				}],
				counselorInfo: {// 置业顾问信息
					name: '李四',// 姓名
					tel: '13822223333',// 手机号
				},
				currentPage: 1,// 分页当前页数
				pageSize: 10, // 分页数量
				total: 0,// 总数
				
				row: {},// 传递给子组件的数据
				/**********各个表单flag**********/
				signedFlag: false,// 签约
				changeNameFlag: false,// 更名
				changeHouseFlag: false,// 换房
				putOffFlag: false,// 延期签约
				backHouseFlag: false,// 退房
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
				this.formInline.code = '';
				this.formInline.type = '';
				
                this.formInline.createTime = [];
				this.currentPage = 1;
                this.pageSize = 10;
                this.handleGetCityList();
            },
            handleSearch() {// 点击顶部搜索按钮
				// alert('submit!')
				this.handleGetList()
			},
            handleGetList() {// 请求table数据
				// this.title = value;
				let params = new URLSearchParams();
				params.append('projectCityId', this.formInline.cityCompany);
                params.append('projectId', this.formInline.projectName);
                params.append('batchId', this.formInline.releases);
				params.append('status', 'APPROVED');
				params.append('pageNum', this.currentPage);
                params.append('pageSize', this.pageSize);
                params.append('signType', this.formInline.type);
                params.append('customName', this.formInline.userName);
                params.append('tel', this.formInline.tel);
				params.append('subscribeCode', this.formInline.code);
				if( this.formInline.createTime && this.formInline.createTime[0] ){
                    params.append('subscribeStartDate', this.formInline.createTime[0]);
                    params.append('subscribeEndDate', this.formInline.createTime[1]);
                }
                if( this.formInline.houseId ){
                    params.append('houseId', this.formInline.houseId);
                }
                listTrdSubscribeForm(params).then(res=>{
					 
                    if( res.status === 200 ){
                        let list = res.data.list;
                        list.map(item=>{
                            this.$set(item, 'showAll', false);
                        })
                        this.tableData = list;
						this.total = res.data.total
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                    
                })
            },
            handleLookRow(row) {// 点击table某行触发，查看详细信息
                //  
                // console.log(this.title)
				this.detailFlag = true;
				let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$refs.detailRef.show(res.data);
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                })
			},
			handleCloseChild() {// 关闭子组件
				this.signedFlag = false;
				this.changeNameFlag = false;
                this.changeHouseFlag = false;
				this.putOffFlag = false;
				this.backHouseFlag  = false;
				this.handleGetList();
			},
            /********table中的操作按钮**********/
			handleSigned(row) {// 签约
				let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
                     ;
                    if( res.status === 200 ){
						if( !res.data.notChangeRemind ){
							this.row = res.data;
							this.signedFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                })
            },
            handleMoveRoom(row) {// 退房
				let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
                     ;
                    if( res.status === 200 ){
						if( !res.data.notChangeRemind || res.data.notChangeRemind.indexOf('财务收款') !== -1 ){
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
							type: "error",
							message: res.message
						});
					}
                })
            },
            handleChangeRoom(row) {// 换房
				let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
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
							type: "error",
							message: res.message
						});
					}
                })
            },
            handleChangeName(row) {// 更名
				let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
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
							type: "error",
							message: res.message
						});
					}
                })
            },
            handlePutOff(row) {// 延期签约
				let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
                     ;
                    if( res.status === 200 ){
						if( !res.data.notChangeRemind ){
							this.row = res.data;
							this.putOffFlag = true;
						}else{
							this.$message({
								type: "warning",
								message: res.data.notChangeRemind
							});
						}
						
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                })
            },
			handleShowAll(row) {// 点击姓名中的箭头，展开该认购单的全部客户
				 
                row.showAll = true;                     
                // this.$set(row, 'showAll', true)
            },
			handleShowOne(row) {// 点击姓名中的箭头，只显示该认购单的一个客户
				 
                row.showAll = false;
                // this.$set(row, 'showAll', false)
                
            },
			/**********分页相关************/
            handleSizeChange(val) {
				//  
				this.pageSize = val;
                this.handleGetList()
            },
            handleCurrentChange(val) {
				//  
				this.currentPage = val;
                this.handleGetList() 
            },
		},
		created() {
			this.handleGetCityList();
			// this.handleGetList();
        }
    }
</script>

<style scoped>
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