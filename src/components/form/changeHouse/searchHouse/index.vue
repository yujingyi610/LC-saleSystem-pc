<template>
    <div>
        <el-dialog title="选择房间" :visible.sync="searchHouseFlag" append-to-body width="1000px">
            <!-- 头部搜索form -->
            <div class="searchForm">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="城市公司">
						<el-select v-model="formInline.cityCompany">
							<el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目名称">
						<el-select v-model="formInline.projectName">
							<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="推盘批次">
						<el-select v-model="formInline.releases">
							<el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="选择楼栋">
						<el-select v-model="formInline.build" filterable>
							<el-option v-for="(item, index) in buildOption" :key="index" :label="item.buildFullName" :value="item.buildId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="float: right">
						<el-button type="primary"  @click="handleSearch">查询</el-button>
					</el-form-item>
                </el-form>
            </div>
                <!-- 主体部分 -->
            <el-container v-if="buildInfo" class="main">
				<el-container class="main_con">
					<el-main class="main_con_main">
						<el-card class="box-card">
							<div slot="header" class="clearfix" style="float: left">
								<el-breadcrumb separator="/">
									<el-breadcrumb-item>{{buildInfo.build.projectName}}</el-breadcrumb-item>
									<el-breadcrumb-item>{{buildInfo.build.devstagesName}}</el-breadcrumb-item>
									<el-breadcrumb-item>{{buildInfo.build.buildName}}</el-breadcrumb-item>
								</el-breadcrumb>
							</div>
							<div class="text item table_header_bgColor">
								<el-table :data="buildInfo.buildView" border>
									<el-table-column label="楼层" prop="floorName" fixed width="80"></el-table-column>
									<el-table-column v-for="(item, index) in buildInfo.cellList" :key="index" :label="item.unitName" :prop="item.id" v-if="item.maxNum" :min-width="94.6*item.maxNum + 20">
										<template slot-scope="scope">
											<span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
												<img src="static/images/common/lock.png" class="lock_img" v-if="item2.lockType === '1' && (salesStatus.length !== 2 || (salesStatus.length === 2 && item2.houseStatus === 'FORSALE')) "/>
												<span v-if="salesStatus.length === 2"  class="cell_name" @click="handleLookHouseInfo(item2, buildInfo.build)" v-bind:style="{color: item2.houseStatus === 'FORSALE'?'#359345':'#808080'}">
													<i class="el-icon-nav-xiaofangzi" ></i>
													<span class="houseName">{{item2.houseName}}</span>
												</span>
												<span v-else-if="salesStatus.length === 5" class="cell_name" @click="handleLookHouseInfo(item2, buildInfo.build)" v-bind:style="{color: item2.statusColor}">
													<i class="el-icon-nav-xiaofangzi" ></i>
													<span class="houseName">{{item2.houseName}}</span>
												</span>
											</span>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-card>
					</el-main>
					<!-- 底部五个状态 -->
					<el-footer>
						<el-row type="flex" class="row-bg" justify="space-around">
							<el-col :span="4" v-for="(item, index) in salesStatus" :key="index">
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
				<el-aside width="300px">
					<el-card class="box-card" style="margin-bottom: 20px; min-height: 306px">
						<div slot="header" class="clearfix">
							<span class="title" style="float: left">房间信息</span>
						</div>
						<div class="text item" v-if="houseInfo">
							<div class="houseInfo_title">{{houseInfo.houseFullName}}</div>
							<!-- <div class="houseInfo_title">{{house.buildInfo.projectName}}<span>/</span>{{house.buildInfo.devstagesName}}<span>/</span>{{house.buildInfo.buildName}}<span>/</span>{{houseInfo.houseName}}</div> -->
							<el-form ref="form" :model="houseInfo">
								<el-row :gutter="5">
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
										<el-form-item label="建筑面积:"><span class="units">{{houseInfo.floorSpace}}m<sup>2</sup></span></el-form-item>
									</el-col>
								</el-row>
								<el-form-item label="预售表单价:"><span class="units">{{houseInfo.prePrice}}元/m<sup>2</sup></span></el-form-item>
								<el-form-item label="预售表总价:"><span class="units">{{houseInfo.preTotalPrice}}元</span></el-form-item>	
								<!-- <el-form-item label="预售底单价:"><span class="units">{{houseInfo.preMinPrice}}元/m<sup>2</sup></span></el-form-item>
								<el-form-item label="预售底总价:"><span class="units">{{houseInfo.preMinTotalPrice}}元</span></el-form-item>	 -->
							</el-form>
						</div>
					</el-card>
				</el-aside>
			</el-container>
			<div v-else></div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="searchHouseFlag = false">取消</el-button>
				<el-button type="success" @click="handleConfirm">确定</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
import {getCityList, getPrjByCityId, getBathList, getHouseList, getHouseViewByBuildId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
    export default {
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
				this.formInline.build = '';
				if( e )
				this.handlegetHouseList({ batchId: e })
			},
			"formInline.build": function(e) {
				if( e )
				this.handlegetHouseViewByBuildId({ buildId: e })
			},
		},
        data() {
            return{
                searchHouseFlag: false,// 弹框是否显示
                /*********顶部搜索form数据***********/
				cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
				buildOption: [],// 选择楼栋下拉数据
				formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
					releases: '',// 推盘批次
					build: '',// 楼栋
				},
				/**************主体部分数据**********************/
				buildInfo: null,// 楼栋所有数据
				/************底部销售状态数据*****************/
				salesStatus: [],
				/******************侧边上半部分房间详细信息****************/
				houseInfo: null,
				house: null,// 房间所有信息，包括房间信息，推盘信息，楼栋信息
            }
        },
        methods: {
            show() {// 展示弹框
                this.searchHouseFlag = true;
			},
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
                    this.formInline.projectName = this.projectNameOption[0].id;
                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
                            this.projectNameOption = res.data;
                            this.formInline.projectName = this.projectNameOption[0].id;
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
				getHouseViewByBuildId(params).then(res=>{
					if( res.status === 200 ){
						this.buildInfo = {}
						let data = res.data[0];
						if( data.statistics.length === 2 ){
							this.salesStatus = [{
								color: '#4DBE61',
								name: '可售'
							},{
								color: '#C0C0C0',
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
				})
			},
            handleSearch() {// 点击顶部搜索按钮
				// alert('submit!')
            },
			handleLookHouseInfo(info, buildInfo) {// 点击房间，查看右侧房间详细信息
				if( info.lockType !== '1' && info.houseStatus === 'FORSALE' ){
					this.house = {
						houseInfo: info,
						buildInfo: buildInfo,
						batch: this.formInline,
					}
					this.houseInfo = info;
				}else{
					this.$message({
						type: 'error',
						message: '该房间不可售！'
					})
				}
            },
            handleConfirm() {// 确定
                this.searchHouseFlag = false;
                this.$emit('confirmHouse', this.house)
            }
		},
		created() {
			this.handleGetCityList();
		}
    }
</script>

<style scoped>
.main{
	/* position: absolute; top: 80px; bottom: 0; left: 0; right: 0;
    margin: 20px */
    height: 400px;
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
	width: 90px;
	display: inline-block;
}
.cellItem:last-child .cell_name{
	border-right: none;
}
.houseInfo_title{
	float: left;
	font-weight: 900;
	margin-bottom: 18px;
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
}
.units sup{
	position: absolute;
	top: -3px;
	right: -6px;
	transform:scale(0.7);  
}
.row-bg{
    font-size: 12px;
}
.houseName{
	margin-left: 24px;
	font-size: 14px;
}
.lock_img{
	position: absolute;
	top: -5px;
}
</style>