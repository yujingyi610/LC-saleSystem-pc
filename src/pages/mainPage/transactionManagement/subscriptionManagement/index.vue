<template>
	<div id="showHouseInfo">
		<div class="main">
			<div class="main-header">
				<el-radio-group v-model="radio" style="float: left" @change="handleChangeTab">
					<el-radio-button label="草稿"></el-radio-button>
					<el-radio-button label="已提交"></el-radio-button>
					<el-radio-button label="已审批"></el-radio-button>
				</el-radio-group>
				<div style="float: right">
					<el-button type="success" @click="hadnleAdd" v-has="'trd:rg:add'">新增认购单</el-button>					
				</div>
				
			</div>
			<draft-table v-if="radio === '草稿'" ref="draftTableRef" ></draft-table>
			<submitted-table v-else-if="radio === '已审批'" ></submitted-table>
			<approved-table v-else-if="radio === '已提交'" :showDropdown="showDropdown" ref="sumbitTableRef"></approved-table>
		</div>
		<!-- 新增认购单弹框 -->
		<el-dialog title="新增认购单" :visible.sync="addFlag" width="900px" v-if="addFlag">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">房间信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="houseInfo">
						<div>
							<el-form-item label="房间号码:">
								<div @click="handleSearchHouse">
									<dialog-input :val="houseInfo?houseInfo.houseFullName:''"></dialog-input>
								</div>
								
							</el-form-item>
							<el-form-item label="认购日期" style="float: right">
								<el-date-picker v-model="subscribeDate" type="date" placeholder="选择日期" :picker-options="pickerOptions" :clearable="false"></el-date-picker>
							</el-form-item>
						</div>
						<div  v-if="houseInfo">
							<el-row>
								<el-col :span="6">
									<el-form-item label="建筑面积:"><span class="units">{{houseInfo.floorSpace}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="分摊面积:"><span class="units">{{houseInfo.apportionArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="地下室面积:"><span class="units">{{houseInfo.basementArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="赠送面积:"><span class="units">{{houseInfo.giftArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="计价方式:"><span class="units">{{houseInfo.priceMethod}}</span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="套内面积:"><span class="units">{{houseInfo.buildingArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="花园面积:"><span class="units">{{houseInfo.gardenArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="天台面积:"><span class="units">{{houseInfo.roofArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="计价面积:"><span class="units">{{houseInfo.priceArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售表单价:"><span class="units">{{houseInfo.prePrice}}元/m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售表总价:"><span class="units">{{houseInfo.preTotalPrice}}元</span></el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-form>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">客户信息</span>
				</div>
				<el-table :data="userTable" border style="width: 100%; margin-bottom: 20px">
					<el-table-column prop="userName" label="客户名称">
						<template slot-scope="scope">
							<el-input v-model="scope.row.customName"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="tel" label="手机号码"  >
						<template slot-scope="scope">
							<el-input v-model="scope.row.tel" disabled></el-input>
						</template>
					</el-table-column>
					<el-table-column label="证件类型"  >
						<template slot-scope="scope">
							<el-select v-model="scope.row.certificateName">
								<el-option v-for="(item, index) in cardTypeOption" :key="index" :label="item.dictName" :value="item.dictName"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="证件号码" >
						<template slot-scope="scope">
							<el-input v-model="scope.row.certificateNo"></el-input>
						</template>
					</el-table-column>
					<el-table-column  label="操作" width="150"  >
						<template slot-scope="scope">
							<el-button @click.stop.prevent="handleDelect(scope.$index)" type="text">清空客户</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="overflow: hidden">
					<el-button type="success" style="float: right" @click="addUser">添加客户</el-button>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">认筹信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="IdentificationInfo">
						<el-form-item label="认筹金是否可转定金:">
							{{IdentificationInfo.flag}}
						</el-form-item>
						<div style="display: inline-block" v-if="IdentificationInfo.flag === '是'">
							<el-form-item label="认筹单号:">
								<el-select v-model="IdentificationInfo.code" value-key="raiseCode">
									<el-option v-for="(item, index) in raiseOpiton" :key="index" :label="item.raiseCode" :value="item"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="认筹金额:">
								{{IdentificationInfo.price}}元
							</el-form-item>
						</div>
					</el-form>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">付款信息</span>
				</div>
				<div class="text item">
					<el-table :data="paymentTable" border style="width: 100%; margin-bottom: 20px">
						<el-table-column prop="type" label="房款类型"  show-overflow-tooltip ></el-table-column>
						<el-table-column prop="receivableAmount" label="应收金额（元）" >
							<template slot-scope="scope">
								<el-input v-model="scope.row.receivableAmount" @change="handlePrice(scope.$index)"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="应收日期"  show-overflow-tooltip >
							<template slot-scope="scope">
								{{new Date(subscribeDate).toLocaleString().split(' ')[0]}}
							</template>
						</el-table-column>
						<el-table-column prop="receivedPrice" label="已收金额（元）"   show-overflow-tooltip></el-table-column>
						<el-table-column prop="receivableAmount" label="未收金额（元）"   show-overflow-tooltip></el-table-column>
					</el-table>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">置业顾问信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="counselorInfo">
						<el-form-item label="置业顾问:">
							{{counselorInfo.propertyConsultName}}
						</el-form-item>
						<el-form-item label="顾问手机:">
							{{counselorInfo.propertyConsultMobile}}
						</el-form-item>
					</el-form>
				</div>
			</el-card>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="handleSave" v-has="'trd:rg:add'">保存</el-button>
				<el-button type="success" @click="handleUp" v-has="'trd:rg:sublit'">提交</el-button>
			</span>
		</el-dialog>
		<search-house ref="searchHouseRef" @confirmHouse="handleConfirmHouse"></search-house>
		<find-custom ref="findCustomRef" @chooseCustom="handleChooseCustom"></find-custom>
	</div>
</template>

<script>
import draftTable from './draftTable'// 草稿table
import submittedTable from './submittedTable'// 已提交table
import approvedTable from './approvedTable'// 已审批table
import dialogInput from '@/components/dialogLongInput'// 模拟input的带放大镜的弹框
import searchHouse from './searchHouse'// 选择房间的弹框
import findCustom from '@/components/findCustom'
import {saveTrdSubscribeForm, getSubscripeSetting, getByUser,sumbitOperationTrdSubscribeForm} from '@/api/pages/mainPage/transactionManagement/subscriptionManagement'
import {getCustomerInfo, getCustomerLabel} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
	export default {
		components: {
			draftTable,
			submittedTable,
			approvedTable,
			dialogInput,
			searchHouse,
			findCustom
		},
		watch: {
			'IdentificationInfo.code'(e) {
				 
				if( e.raiseAmount || e.raiseCode){
					this.IdentificationInfo.price = e.raiseAmount;
					this.IdentificationInfo.raiseCode = e.raiseCode;
					this.raiseInfo = e;
				}
			},
			'userTable': {
				handler:function(newValue,oldValue){
					if( newValue && newValue[0] && newValue[0].customId ){
						this.handleGetByUser();
					}
                },
                deep:true,
			}
		},
		data() {
			return{
				radio: '草稿',// tap当前选中
				addFlag: false,// 新增认购单弹框
				/***********新增认购单弹框内的数据*******/
				houseInfo: null,// 房间信息
				house: null,// 房间全部信息
				userTable: [],
				cardTypeOption: [],
				IdentificationInfo: {
					// 认筹信息
					flag: "否", // 认筹金是否可转定金
					code: "", // 认筹单号
					raiseCode: '',
					price: "" // 认筹金额
				},
				raiseInfo: {},// 认筹单相关信息
				raiseOpiton: [],// 认筹单号下拉框
				paymentTable: [],// 付款信息
				counselorInfo: {// 置业顾问信息
					name: '',// 姓名
					tel: '',// 手机号
				},
				showDropdown: '全部',// 下拉菜单当前显示
				dropdownOption: [{// 下拉菜单选项列表
					value: '全部'
				},{
					value: '已签约'
				},{
					value: '未签约未逾期'
				},{
					value: '未签约已逾期'
				}],
				nicheId: null,// 商机id
				pickerOptions: {
                    disabledDate: (time)=> {
                        return time.getTime() > new Date();
                    }
				},
				subscribeDate: null,// 认购日期
			}
		},
		methods: {
			handleSearch() {// 点击顶部搜索按钮
				// alert('submit!')
			},
			handleGetCustomerLabel() {
				getCustomerLabel().then(res => {
					// res.data.customInfoLabel.certificateTypeLabel.labelDictList.map(
                    // label => {
                    //     this.cardTypeOpiton.push({
                    //         dictName: label.dictName,
                    //         dictType: label.dictType
                    //     });
                    // }
                    // );
                    if( res.status === 200 ){
                        res.data.map(label=>{
                            this.cardTypeOption.push({
                                dictName: label.itemValue,
                                dictType: label.itemCode
                            })
                        })
                    }
				});
			},
			handleChangeTab(value) {// 切换tab
				// console.log(value);
				if( value === '草稿' ){
					// this.$refs.tableList.handleGetList('DRAFT');
				}else if( value === '已提交' ){
					// this.$refs.tableList.handleGetList('SUBMIT');
				}
				// this.$refs.tableList.handleGetList(value);
			},
			hadnleAdd() {// 打开新建认购单弹框
				this.subscribeDate = new Date()
				this.houseInfo = null;
				this.userTable = [];
				this.IdentificationInfo = {// 认筹信息
					flag: '',// 认筹金是否可转定金
					code: '',// 认筹单号
					price: '',// 认筹金额
				};
				this.raiseOpiton = [];
				this.paymentTable = [];
				this.counselorInfo = {// 置业顾问信息
					name: '',// 姓名
					tel: '',// 手机号
				};
				this.addFlag = true;
			},
			/*******新增认购单弹框内按钮******/
			handleSearchHouse() {// 查找房间
				this.$refs.searchHouseRef.show();
			},
			handlePrice(index) {// 处理应收金额不能小于0
				if( isNaN(Number(this.paymentTable[index].receivableAmount)) ){
					this.paymentTable[index].receivableAmount = 1;
					this.$message.error('请输入数字！');
					return
				}
				if( this.paymentTable[index].receivableAmount <= 0 ){
					this.paymentTable[index].receivableAmount = 1;
				}
				this.paymentTable[index].receivableAmount = Number(this.paymentTable[index].receivableAmount)
			},
			handleSave() {// 保存
				if( !this.house ){
					this.$message.error('请选择房间！');
					return
				}
				if( !this.userTable[0] || !this.userTable[0].customId ){
					this.$message.error('请添加客户！');
					return
				}
				for( let i = 0; i < this.userTable.length; i++ ){
					if( !this.userTable[i].certificateNo || !this.userTable[i].tel ){
						this.$message.error('请完善客户信息！')
						return
					}
					if( this.userTable[i].certificateName === '居民身份证' && !this.idCard(this.userTable[i].certificateNo) ){
						this.$message.error('居民身份证格式错误！')
						return
					}
				}
				this.userTable[0].nicheId = this.nicheId;
				this.addFlag = false;
				let data = {
					batchId: this.house.batch.releases,// 批次id
					customs: this.userTable,// 客户list
					houseId: this.house.houseInfo.id,// 房间id
					propertyConsultId: this.counselorInfo.propertyConsultId,// 置业顾问id
					propertyConsultName: this.counselorInfo.propertyConsultName,// 置业顾问姓名
					propertyConsultTel: this.counselorInfo.propertyConsultMobile,// 置业顾问手机号
					raiseTranDepositFlag: this.IdentificationInfo.flag === '是'?1:0,// 认筹金是否可转定金
					raiseTranDepositAmount: this.IdentificationInfo.price,// 认筹金额
					raiseCode: this.IdentificationInfo.raiseCode,// 认筹单号
					raiseId: this.raiseInfo.id,// 认筹id
					subscribeDate: this.subscribeDate,//认购日期
					trdTradePayment: {
						receivableAmount: this.paymentTable[0].receivableAmount// 应收金额
					}
				}
				 
				saveTrdSubscribeForm(data).then(res=>{
					 
					if( res.status === 200 ){
						this.$message({
							type: "success",
							message: "保存成功！",
                    		showClose: true
						});
						this.radio = "草稿";
						this.$refs.draftTableRef.handleGetList()
					}else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
				})
			},
			handleUp() {// 提交
				if( !this.house ){
					this.$message.error('请选择房间！');
					return
				}
				if( !this.userTable[0] || !this.userTable[0].customId ){
					this.$message.error('请添加客户！');
					return
				}
				for( let i = 0; i < this.userTable.length; i++ ){
					if( !this.userTable[i].certificateNo || !this.userTable[i].tel ){
						this.$message.error('请完善客户信息！')
						return
					}
					if( this.userTable[i].certificateName === '居民身份证' && !this.idCard(this.userTable[i].certificateNo) ){
						this.$message.error('居民身份证格式错误！')
						return
					}
				}
				this.userTable[0].nicheId = this.nicheId;
				this.addFlag = false;
				let data = {
					batchId: this.house.batch.releases,
					customs: this.userTable,
					houseId: this.house.houseInfo.id,
					propertyConsultId: this.counselorInfo.propertyConsultId,
					propertyConsultName: this.counselorInfo.propertyConsultName,
					propertyConsultTel: this.counselorInfo.propertyConsultMobile,
					raiseTranDepositFlag: this.IdentificationInfo.flag === '是'?1:0,
					raiseTranDepositAmount: this.IdentificationInfo.price,
					raiseCode: this.IdentificationInfo.raiseCode,
					raiseId: this.raiseInfo.id,
					subscribeDate: this.subscribeDate,
					trdTradePayment: {
						receivableAmount: this.paymentTable[0].receivableAmount
					}
				}
				saveTrdSubscribeForm(data).then(res=>{
					if( res.status === 200 ){
						let data = this.Qs.stringify({
							id: res.data
						})
						sumbitOperationTrdSubscribeForm(data).then(res2=>{
							if( res2.status === 200 ){
								this.$message({
									type: "success",
									message: "提交成功！",
                    				showClose: true
								});
								this.radio = "已提交";
								this.$refs.sumbitTableRef.handleGetList()
							}else{
								this.$message({
									type: "error",
									message: res.message
								});
							}
						})
					}else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
				})
				
			},
			handleDelect(index) {// 客户信息table，删除客户操作
				if( this.userTable.length >= 1 ){
					this.userTable.splice(index, 1);
					if( index !== 0 ){// 被删除的用户若不是第一个用户，则跳过以下步骤
                        return
					}
					this.counselorInfo = {
						propertyConsultId: '',
						propertyConsultMobile: '',
						propertyConsultName: '',
					};
					this.nicheId = null;
					if (!this.house) {
						this.$message({
							type: "error",
							message: "请选择项目！"
						});
						return;
					}
					let params = {
						projectId: this.house.batch.projectName,
						mobile: this.userTable[0].tel
					};
					getCustomerInfo(params).then(r => {
						console.log(r)
                        if( r.status === 200 ){
                            let res = r.data.list[0];
							if (res != null && res != "") {
								if (res.isPrincess) {
									this.$message({
										type: "error",
										message: "未分配置业顾问，请分配置业顾问！"
									});
									return;
								}
								this.counselorInfo = res;
								this.nicheId = res.nicheId;
							} else {
								this.$message({
									type: "error",
									message: "未找到用户数据"
								});
							}
						}
					});
				}else{
					// alert('客户信息不能为空！')
				}
				
			},
			addUser() {// 点击新增客户按钮
				if (!this.house) {
					this.$message({
						type: "error",
						message: "请选择项目！"
					});
					return;
				}
				this.$refs.findCustomRef.show(this.house.batch.projectName)
			},
			handleSearchUser(row, index) {// 根据手机号搜索用户
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (!reg.test(row.tel)) {
					this.$message({
						type: "error",
						message: "手机格式不正确"
					});
				} else {
					this.handleGetCustomerInfo(row, index);
				}
			},
			handleChooseCustom(info) {// 得到客户信息，关闭弹框
				if( info ){
					console.log(info);
					for( let i = 0; i < this.userTable.length; i++ ){
						if( this.userTable[i].customId === info.customId ){
							this.$message.error('不能重复添加客户！')
							return
						}
					}
				
					this.userTable.push({
						customName: info.customName,// 客户姓名
						tel: info.customMobile,// 手机号码
						certificateName: info.certificateName,// 证件类型
						certificateType: info.certificateType,// 证件类型
						certificateNo: info.certificateNo,// 证件号码
						customId: info.customId,// 客户id
						sex: info.customSex,// 性别
					})
					if( !this.nicheId ){
						this.nicheId = info.nicheId;
					}
					if( this.counselorInfo.propertyConsultId && info.propertyConsultId !== this.counselorInfo.propertyConsultId){
						return
					}
					this.counselorInfo = {
						propertyConsultId: info.propertyConsultId,
						propertyConsultMobile: info.propertyConsultMobile,
						propertyConsultName: info.propertyConsultName,
					};
				}
			},
			handleGetCustomerInfo(row, index) {// 查询用户
				if (!this.house) {
					this.$message({
						type: "error",
						message: "请选择项目！"
					});
					return;
				}
				let params = {
					projectId: this.house.batch.projectName,
					mobile: row.tel
				};
				getCustomerInfo(params).then(res => {
					 
					if (res != null && res != "") {
						if (res.isPrincess) {
							this.$message({
								type: "error",
								message: "未分配置业顾问，请分配置业顾问！"
							});
							return;
						}
						this.userTable[index].customName = res.customName;
						this.userTable[index].certificateName = res.certificateName;
						this.userTable[index].certificateType = res.certificateType;
						this.userTable[index].certificateNo = res.certificateNo;
						this.userTable[index].customId = res.customId;
						this.userTable[index].sex = res.customSex;
						if( !this.nicheId ){
                            this.nicheId = res.nicheId;
                        }
						if( this.counselorInfo.propertyConsultId && res.propertyConsultId !== this.counselorInfo.propertyConsultId){
							return
						}
						this.counselorInfo = res;
						
						
					} else {
						this.$message({
							type: "error",
							message: "未找到用户数据"
						});
					}
				});
				

			},
			handleGetByUser() {
				getByUser({customId: this.userTable[0].customId}).then(res=>{
					 
					if( res.status === 200 ){
						this.raiseOpiton = res.data;
						console.log(this.raiseOpiton)
					}
				})
			},
			handleGetSubscripeSetting() {// 查询认购设置信息
				let params = new URLSearchParams();
				params.append('pushBathId', this.house.batch.releases)
				getSubscripeSetting(params).then(res=>{
					if( res.status === 200 ){
						if( res.data !== null ){
							this.paymentTable = [];
							this.IdentificationInfo.flag = res.data.transFlag?'是':'否';
							let date = new Date();
							date = date.toLocaleString().split(' ')[0]
							this.paymentTable.push({
								type: '定金',
								receivableAmount: res.data.dowpayAmount,
								uncollectedPrice: res.data.dowpayAmount,
								receivedPrice: 0,
								date: this.subscribeDate
							})
						}else{
							this.$message({
								type: "error",
								message: "请先去设置批次认购信息！"
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
			handleConfirmHouse(house) {// 选中房间，子组件触发
				if( house ){
					this.subscribeDate = new Date()
					this.houseInfo = null;
					this.house = null;
					this.userTable = [];
					this.IdentificationInfo.flag = '';
					this.IdentificationInfo.code = '';
					this.IdentificationInfo.price = '';
					this.IdentificationInfo.raiseCode = '';
					this.raiseInfo = {};
					this.raiseOpiton = [];
					this.paymentTable = [];
					this.counselorInfo.name = '';
					this.counselorInfo.tel = '';
					this.nicheId = null;
		
					this.houseInfo = house.houseInfo;
					this.house = house;
					this.handleGetSubscripeSetting()
				}
				
			},
			handleCommand(command) {// 已提交tab，下拉菜单切换触发
				this.showDropdown = command;
				// this.$refs.sumbitTableRef.handleGetList()
			}
		},
		created() {
			this.handleGetCustomerLabel();
			// this.subscribeDate = new Date()
			// console.log(this.subscribeDate)
		}
	}
</script>

<style scoped>
.searchForm{
	/* height: 116px;  */
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	box-sizing: border-box;
	padding: 20px 25px;
}
.main{
	/* position: absolute; top: 130px; bottom: 0; left: 0; right: 0;
	margin: 20px; */
	background: #fff;
	box-sizing: border-box;
	padding: 20px 25px;
}
.main-header{
	overflow: hidden;
	margin-bottom: 20px;
}
/* .title{
	font-size: 14px;
	float: left;
	border-bottom: 1px solid #e5e5e5;
	width: 100%;
	margin-bottom: 20px;
} */
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
.el-dropdown-link{
	font-size: 12px;
	color: #25AE50;
	margin-right: 20px;
}
.el-icon-arrow-down {
    font-size: 12px;
  }
</style>