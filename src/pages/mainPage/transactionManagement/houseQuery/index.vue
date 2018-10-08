<template>
<!-- 房源查询 -->
	<div id="houseQuery">
		<!-- 头部搜索form -->
		<div class="searchForm">
			<el-form :inline="true" :model="formInline">
				<el-form-item label="城市公司">
					<el-select v-model="formInline.cityCompany" clearable>
						<el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称">
					<el-select v-model="formInline.projectName" clearable>
						<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推盘批次">
					<el-select v-model="formInline.releases" clearable>
						<el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择楼栋">
					<el-select v-model="formInline.build" clearable filterable>
						<el-option v-for="(item, index) in buildOption" :key="index" :label="item.buildFullName" :value="item.buildId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button v-has="'trd:house:query'" type="primary"  @click="handleSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 主体部分 -->
		<el-container class="main">
			<el-container class="main_con" style="background-color:#fff;">
				<el-main  v-if="buildInfo"  class="main_con_main">
					<el-card class="box-card">
						<div slot="header" class="clearfix" style="float: left">
							<el-breadcrumb separator="/">
								<el-breadcrumb-item>{{buildInfo.build.projectName}}</el-breadcrumb-item>
								<el-breadcrumb-item>{{buildInfo.build.devstagesName}}</el-breadcrumb-item>
								<el-breadcrumb-item>{{buildInfo.build.areaName}}</el-breadcrumb-item>
								<el-breadcrumb-item>{{buildInfo.build.buildName}}</el-breadcrumb-item>
							</el-breadcrumb>
						</div>
						<div class="text item table_header_bgColor">
							<el-table :data="buildInfo.buildView" border>
								<el-table-column label="楼层" prop="floorName" fixed width="80"></el-table-column>
								<el-table-column v-for="(item, index) in buildInfo.cellList" :key="index" :label="item.unitName" :prop="item.id" v-if="item.maxNum" :width="90*item.maxNum + 20"  >
									<template slot-scope="scope">
										<span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
											<img v-if="item2.lockType === '1' && (salesStatus.length !== 2 || (salesStatus.length === 2 && item2.houseStatus === 'FORSALE')) " src="static/images/common/lock.png" class="lock_img"/>
											<span v-if="salesStatus.length === 2" class="cell_name" @click="handleLookHouseInfo(item2, buildInfo.build)" v-bind:style="{color: item2.houseStatus === 'FORSALE'?'#359345':'#808080'}">
												<i class="el-icon-nav-xiaofangzi" ></i>
												<span class="houseName">{{item2.houseName}}</span>
											</span>
											<span v-else-if="salesStatus.length === 5" class="cell_name" @click="handleLookHouseInfo(item2, buildInfo.build)" v-bind:style="{color: item2.statusColor}">
												<i class="el-icon-nav-xiaofangzi" ></i>
												<span class="houseName">{{item2.houseName}}</span>
											</span>
											<img v-show="item2.isCurConsultDeal" src="static/images/common/is_mine.png" class="is_mine_img">
										</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-card>
				</el-main>
				<div v-else class="white_bg">
					<img src="static/images/common/pc_trading_blank.png" />
				</div>
				<!-- 底部五个状态 -->
				<el-footer  v-if="buildInfo">
					<el-row type="flex" class="row-bg" justify="space-around">
						<el-col :span="4" v-for="(item, index) in salesStatus" :key="index" style="text-align: center">
							<i class="el-icon-nav-xiaofangzi bottom_icon" :style="{color: item.color}"></i>
							<div style="float: left">
								<span class="tap">{{item.name}}</span><br />
								<span class="text">{{item.count}}套/{{item.per}}%</span>
							</div>
						</el-col>
					</el-row>
				</el-footer>
			</el-container>


			<!-- 侧边 -->
			<el-aside width="320px" style="background: #fff">
				<div v-if="houseInfo && houseInfo.houseStatus === 'FORSALE' && houseInfo.lockType !== '1'" style="padding: 20px; border-bottom: 1px solid #e5e5e5;">
					<el-button v-has="'trd:rg:add'" type="success" v-if="houseInfo.houseStatus === 'FORSALE' && houseInfo.lockType !== '1'" @click="handleToSubscription">认购</el-button>
					<el-button v-has="'trd:qy:add'" type="success" v-if="houseInfo.houseStatus === 'FORSALE' && houseInfo.lockType !== '1'" @click="handleToSigned">签约</el-button>
				</div>
				<el-card class="box-card" style="margin-bottom: 20px; min-height: 306px">
					<div slot="header" class="clearfix">
						<span class="title" style="float: left">房间信息</span>
					</div>
					<div class="text item" v-if="houseInfo">
						<div class="houseInfo_title">{{houseInfo.houseFullName}}</div>
						<el-form ref="form" :model="houseInfo">
							<el-row>
								<el-col :span="12">
									<el-form-item label="建筑面积:"><span class="units">{{houseInfo.floorSpace}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="分摊面积:"><span class="units">{{houseInfo.apportionArea}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="地下室面积:"><span class="units">{{houseInfo.basementArea}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="赠送面积:"><span class="units">{{houseInfo.giftArea}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="计价方式:"><span class="units">{{houseInfo.priceMethod}}</span></el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="套内面积:"><span class="units">{{houseInfo.buildingArea}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="花园面积:"><span class="units">{{houseInfo.gardenArea}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="天台面积:"><span class="units">{{houseInfo.roofArea}}m<sup>2</sup></span></el-form-item>
									<el-form-item label="计价面积:"><span class="units">{{houseInfo.priceArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="预售表单价:"><span class="units">{{houseInfo.prePrice}}元/m<sup>2</sup></span></el-form-item>
							<el-form-item label="预售表总价:"><span class="units">{{houseInfo.preTotalPrice}}元</span></el-form-item>
							<!-- <el-form-item label="预售底单价:"><span class="units">{{houseInfo.preMinPrice}}元/m<sup>2</sup></span></el-form-item>
							<el-form-item label="预售底总价:"><span class="units">{{houseInfo.preMinTotalPrice}}元</span></el-form-item>	 -->
						</el-form>
					</div>
					<div v-else>
						<span class="house_tips">请先选择房间</span>
					</div>
				</el-card>
				<el-card class="box-card" style="margin-bottom: 20px" v-if="obj">
					<div slot="header" class="clearfix">
						<span class="title" style="float: left">交易信息</span>
					</div>
					<div class="text item">
						<div style="text-align: start">客户信息</div>
						<el-table :data="obj.customs" style="width: 100%">
    						<el-table-column prop="customName" label="姓名" show-overflow-tooltip></el-table-column>
    						<el-table-column prop="tel" label="手机号" show-overflow-tooltip></el-table-column>
						</el-table>
						<div style="text-align: start">付款信息</div>
						<el-table :data="obj.payTable" style="width: 100%">
    						<el-table-column prop="paymentTypeName" label="款项名称" show-overflow-tooltip></el-table-column>
    						<el-table-column prop="receivableAmount" label="总金额" show-overflow-tooltip></el-table-column>
    						<el-table-column prop="receivedAmount" label="已收金额" show-overflow-tooltip>
								<template slot-scope="scope">
									{{scope.row.receivedAmount || 0}}
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-aside>
		</el-container>
		<subscription ref="subscriptionRef"></subscription>
		<singed ref="singedRef"  v-if="add" @closeChild="handlecloseChild"></singed>
	</div>
</template>

<script>
import subscription from './subscription'
import singed from './singed'
import {getCityList, getPrjByCityId, getBathList, getHouseList, getHouseViewByBuildId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getTrdSubscribeForm} from '@/api/pages/mainPage/transactionManagement/subscriptionManagement'
import {getInfo} from '@/api/pages/mainPage/transactionManagement/contractManagement'
	export default {
		watch: {
			"formInline.cityCompany": function(e) {
				this.formInline.projectName = null;
				if( e ){
					this.handleGetPrjByCityId({ id: e });
				}
			},
			"formInline.projectName": function(e) {
				this.formInline.releases = null;
				if( e ){
					this.handleGetBathList({ projectId: e });
				}
			},
			"formInline.releases": function(e) {
				this.formInline.build = null;
				console.log(this.formInline)
				if( e ){
					this.handlegetHouseList({ batchId: e })
				}
			}
		},
		components: {
			subscription,
			singed
		},
		data() {
			return {
				/*********顶部搜索form数据***********/

				cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
				buildOption: [],// 选择楼栋下拉数据
				formInline: {// 头部搜索Form表单
					cityCompany: null,// 城市公司
					projectName: null,// 项目名称
					releases: null,// 推盘批次
					build: null,// 楼栋
				},
				/**************主体部分数据**********************/
				buildInfo: null,// 楼栋所有数据
				/************底部销售状态数据*****************/
				salesStatus: [],
				/******************侧边上半部分房间详细信息****************/
				houseInfo: null,
				add: false,
				obj: null,// 交易信息
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
					this.formInline.cityCompany = this.cityCompanyOption[0].id
                }else{
                    //获取城市公司列表
                    getCityList().then(res => {
                        if (res.status === 200) {
							this.cityCompanyOption = res.data;
							this.formInline.cityCompany = this.cityCompanyOption[0].id
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
						this.formInline.projectName = this.projectNameOption[0].id
					}

                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
							this.projectNameOption = res.data;
							if( this.projectNameOption[0] ){
								this.formInline.projectName = this.projectNameOption[0].id
							}

                        }
                    });
                }
			},
			handleGetBathList(params) {// 通过项目ID获取推盘
				getBathList(params).then(res=>{
					 
					this.releasesOption = res.data;
				})
			},
			handlegetHouseList(params) {// 通过推盘ID获取楼栋列表
				getHouseList(params).then(res=>{
					 
					this.buildOption = res.data;
				})
			},
			handlegetHouseViewByBuildId(params) {// 通过楼栋ID获取楼栋
				this.buildInfo = null;
				getHouseViewByBuildId(params).then(res=>{
					 

					if( res.status === 200 ){

						let data = res.data[0];
						if( !data.unitArray ){
							this.$message.error('该楼栋没有房间！')
							return
						}
						this.buildInfo = {}
						if( data.statistics.length === 2 ){
							this.salesStatus = [{
								color: '#359345',
								name: '可售'
							},{
								color: '#808080',
								name: '不可售'
							}]
							data.statistics.map(item=>{
								if( item.name === '可售' ){
									this.salesStatus[0].count = item.count;
									this.salesStatus[0].per = item.per;
								}else{
									this.salesStatus[1].count = item.count;
									this.salesStatus[1].per = item.per;
								}
							})
						}else{
							this.salesStatus = [{
								color: '#359345',
                                code: 'FORSALE'// 待售
                            },{
                                color: '#E23333',
                                code: 'SIGNING'// 签约
                            },{
                                color: '#EF8D3A',
                                code: 'SUBSCRIPTION'// 预定
                            },{
                                color: '#9A6AC3',
                                code: 'DELIVER'// 交付
                            },{
                                color: '#808080',
                                code: 'SALESCONTROL'// 销控
                            }]
							data.statistics.map(item=>{
								this.salesStatus.map(item2=>{
									if( item.code === item2.code ){
										item2.count = item.count;
										item2.name = item.name;
										item2.per = item.per;
									}
								})
							})
						}
						this.buildInfo.build = data.build;
						this.buildInfo.cellList = data.unitArray;
						this.buildInfo.buildView = [];

						if( data.floorHouseArray ){
							data.floorHouseArray.map(floorItem=>{
								let floorObj = {
									floorName: floorItem.floorName
								}
								floorItem.unitHouseViewDtos.map(unitItem=>{
									floorObj[unitItem.unitId] = unitItem.houseDtos
								})
								this.buildInfo.buildView.push(floorObj)
							})
						}
					}
					console.log(this.buildInfo)
				})
			},
			handleSearch() {// 点击顶部搜索按钮
				if( this.formInline.build ){
					this.handlegetHouseViewByBuildId({ buildId: this.formInline.build })
				}else{
					this.$message.error('请先选择楼栋!')
				}
			},
			handleLookHouseInfo(info, buildInfo) {// 点击房间，查看右侧房间详细信息
				console.log(info.lockType)
				this.obj = null;
				if( this.salesStatus.length === 2 ){
					if( info.houseStatus === 'FORSALE' || info.curConsultDealType){
						this.houseInfo = info;
						this.houseInfo.buildInfo = buildInfo;
						console.log(info.curConsultDealType)
						console.log(this.info)
					}else{
						this.houseInfo = null;
						this.$message({
							type: 'error',
							message: '该房间不可售！'
						})
					}
				}else{
					console.log(info.curConsultDealType)
					if( info.curConsultDealType ){
						let type = info.curConsultDealType.slice(0, 2);
						let id = info.curConsultDealType.slice(2);
						console.log(type)
						console.log(id)
						if( type === 'RG' ){
							let params = new URLSearchParams();
							params.append('id', id)
							getTrdSubscribeForm(params).then(res=>{
								 ;
								if( res.status === 200 ){
									this.obj = {}
									this.obj.customs = res.data.customs;
									this.obj.payTable = [res.data.trdTradePayment]
								}else{
									this.$message({
										type: "error",
										message: res.message
									});
								}
							})
						}else if( type === 'QY' ){
							getInfo({ id: id }).then(res=>{
								 ;
								if( res.status === 200 ){
									this.obj = {}
									this.obj.customs = res.data.customs;
									this.obj.payTable = res.data.payments;
									this.obj.payTable.map(item=>{
										item.paymentTypeName = item.paymentItemName;
									})
								}else{
									this.$message({
										type: 'error',
										message: res.message
									})
								}
							})
						}
					}
					this.houseInfo = info;
					this.houseInfo.buildInfo = buildInfo;
					console.log(this.houseInfo)
				}


			},
			handleToSubscription() {// 认购
				this.houseInfo.batch = this.formInline;
				this.$refs.subscriptionRef.handleConfirmHouse(this.houseInfo)
			},
			handleToSigned() {// 签约
				this.houseInfo.batch = this.formInline;
				this.add = true;
				setTimeout(()=>{
					this.$refs.singedRef.show(this.houseInfo.id, this.houseInfo.batch.releases)
				}, 500)
				
			},
			handlecloseChild() {
				this.add = false;
			}
		},
		created() {
			this.handleGetCityList();
		}
	}
</script>

<style scoped>
.searchForm{
	/* height:68px;  */
	background:rgba(255,255,255,1);
	border-radius: 6px ;
	box-sizing: border-box;
	padding: 20px 25px;
	overflow: hidden;
}
.main{
	position: absolute; top: 100px; bottom: 0; left: 0; right: 0;
	margin: 20px;
	margin-bottom: 0;
	/* margin-top: 20px; */
}
.main_con{
	position: relative;
}
.main_con_main{
	margin-bottom: 20px;
}
  .el-aside {
    /* background-color: #ffffff; */
    color: #333;
    text-align: center;
	margin-left: 20px;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }
    .el-header, .el-footer {
    background-color: #fff;
	color: #333;
	box-shadow: 0px -2px 10px #e6e6e6;
	position: absolute;
	bottom: 0;
	left: 0;
    right: 16px;
	z-index: 4;
	height: 80px;
	box-sizing: border-box;
	padding: 10px 25px;
  }
  .el-breadcrumb {
    line-height: 40px;
}
.el-card{
	border: none!important;
	box-shadow: none!important;
}
.cell_name{
	border-right: 1px solid #E9E9E9;
	width: 86px;
	display: inline-block;
}
.cellItem:last-child .cell_name{
	border-right: none;
}
.houseInfo_title{
	float: left;
	font-weight: 900;
	margin-bottom: 18px;
	width: 100%;
	text-align: start;
}
.houseInfo_title span{
	font-weight: 100;
	color: #535353;
	margin: 0 5px;
}
.tap{
	display: inline-block;
	height: 20px;
	text-align: center;
	line-height: 20px;
	font-weight: 900;
}
.units{
	position: relative;
	float: left;
	text-align: center;
}
.units sup{
	position: absolute;
	top: -3px;
	right: -6px;
	transform:scale(0.7);
}
.white_bg{
	background: #fff;
	width: 100%;
	height: 100%;
}
.white_bg img{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.house_tips{
	display: inline-block;
	width: 150px;
	height: 40px;
	/* background: rgba(229,229,229,1); */
	border-radius: 6px;
	color: #666666;
	line-height: 40px;
	text-align: center;
	margin-top: 50px;
}
.houseName{
	margin-left: 24px;
	font-size: 14px;
}
.lock_img{
	position: absolute;
	top: -9px;
    width: 11px;
    left: 6px;
}
.is_mine_img{
	position: absolute;
	right: 5px;
    bottom: 5px;
}
</style>
