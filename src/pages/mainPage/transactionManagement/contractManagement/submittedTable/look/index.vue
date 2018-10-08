<template>
    <div class="add" id="showHouseInfo">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">查看签约</span>
                    <div style="float: right">
                        <!-- <el-button @click="handleCancel">确定</el-button> -->
                        <i class="el-icon-circle-close-outline close" @click="handleCancel"></i>
                    </div>
                </div>
                <div class="text item">
                     <!-- 房间信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">房间信息</span>
                        </div>
                        <el-form :inline="true" :model="houseInfo">
                            <div>
                                <el-form-item label="房间号码">{{houseInfo?houseInfo.houseFullName:''}}</el-form-item>
                                <!-- <el-form-item v-if="houseInfo" label="相关房号">{{houseInfo?houseInfo.refHouseFullNames:''}}</el-form-item> -->
                                <el-form-item label="签约日期" style="float: right">{{signDate}}</el-form-item>
                            </div>
                            <div v-if="houseInfo">
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
								<!-- <el-col :span="6">
									<el-form-item label="预售底单价:"><span class="units">{{houseInfo.preMinPrice}}元/m<sup>2</sup></span></el-form-item>
								</el-col> -->
							</el-row>
							<el-row>
								<!-- <el-col :span="6">
									<el-form-item label="预售底总价:"><span class="units">{{houseInfo.preMinTotalPrice}}元</span></el-form-item>
								</el-col> -->
							</el-row>	
                            </div>
                        </el-form>
                    </el-card>
                    <!-- 客户信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">客户信息</span>
                        </div>
                        <el-table :data="userTable" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="customName" label="客户名称"></el-table-column>
                            <el-table-column prop="tel" label="手机号码"></el-table-column>
                            <el-table-column prop="sex" label="性别"></el-table-column>
                            <el-table-column prop="certificateName" label="证件类型"></el-table-column>
                            <el-table-column prop="certificateNo" label="证件号码"></el-table-column>
                            <el-table-column prop="addr" label="邮寄地址"></el-table-column>
                        </el-table>
                    </el-card>
                    <!-- 签约信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">签约信息</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="是否工抵">{{switchFlag?'是':'否'}}</el-form-item>
                            <el-form-item label="项目公司" v-if="switchFlag">
                                {{company.company}}
                            </el-form-item>
                            <el-form-item label="工抵金额" v-if="switchFlag">
                                {{payCreditAmount}}
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true">
                            <el-form-item label="是否房票">{{switchFlag3?'是':'否'}}</el-form-item>
                            <el-form-item label="房票金额" v-if="switchFlag3">{{ticketPrice}}</el-form-item>
                        </el-form>
                        <div style="overflow: hidden">
                            <span class="title_text">折扣信息</span>
                            <div style="float: right"><span class="title_text">折扣计价方式:<span>{{priceType}}</span></span></div>
                        </div>
                        <el-table ref="multipleTable" :data="DiscountInfo" style="width: 100%">
                            <el-table-column prop="discountName" label="折扣名称"></el-table-column>
                            <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                            <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                            <el-table-column prop="discountItem" label="折扣详情">
                                <template slot-scope="scope">
                                    {{scope.row.discountItem}}{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="overflow: hidden">
                            <span class="title_text">是否有购房券:{{switchFlag2?'是':'否'}}</span>
                        </div>
                        <el-table :data="BuyStamps" style="width: 100%" v-if="switchFlag2">
                            <el-table-column type="index" label="序号" width="55"></el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column label="手机号码">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.tel"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="code" label="优惠券号"></el-table-column>
                            <el-table-column prop="price" label="使用金额（元）"></el-table-column>
                        </el-table>
                        <div style="overflow: hidden">
                            <div style="float: left">
                                <span>总价直减:</span>{{beautifyTotalPrice}}
                            </div>
                            <div style="float: right; line-height: 40px">
                                <span class="title_text">总折扣:{{totalDiscount}}元</span>
                            </div>
                        </div>
                        <div style="overflow: hidden">
                            <span class="form_bottom">签约单价:<span>{{price}}元</span></span>
                            <span class="form_bottom">签约总价:<span>{{totalprice}}元</span></span>
                            <span class="form_bottom">合同金额大写:<span>{{totalprice | PriceInWords}}</span></span>
                            <span class="form_bottom">是否破底:<span>{{isBroken}}</span></span>
                        </div>
                    </el-card>
                    <!-- 付款信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">付款信息</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="付款方式">{{Payment}}</el-form-item>
                        </el-form>
                        <!-- 一次性付款 -->
                        <div v-if="Payment === '一次性付款'">
                            <el-table :data="table1" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="name" label="款项"></el-table-column>
                                <el-table-column prop="price" label="应收金额"></el-table-column>
                                <el-table-column prop="date" label="应收日期" width="160"></el-table-column>
                                <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <span>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="银行/单位">
                                    <template slot-scope="scope">
                                        <span>--</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price1" label="已收金额"></el-table-column>
                                <el-table-column prop="price2" label="未收金额"></el-table-column>
                            </el-table>
                        </div>
                        <!-- 商业贷款 -->
                        <el-table v-else-if="Payment === '商业贷款'" :data="table2" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="name" label="款项"></el-table-column>
                            <el-table-column prop="price" label="应收金额"></el-table-column>
                            <el-table-column prop="date" label="应收日期" width="160"></el-table-column>
                            <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <div v-if="scope.$index === 0">--</div>
                                        <div v-else>{{scope.row.icbcFlag?'是':'否'}}</div>
                                    </template>
                                </el-table-column>
                            <el-table-column prop="bank" label="银行/单位">
                                <template slot-scope="scope">
                                    <div v-if="scope.$index === 0">--</div>
                                    <div v-else>{{scope.row.bank[1]}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price1" label="已收金额"></el-table-column>
                            <el-table-column prop="price2" label="未收金额"></el-table-column>
                        </el-table>
                        <!-- 公积金贷款 -->
                        <el-table v-else-if="Payment === '公积金贷款'" :data="table3" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="name" label="款项"></el-table-column>
                            <el-table-column prop="price" label="应收金额"></el-table-column>
                            <el-table-column prop="date" label="应收日期" width="160"></el-table-column>
                            <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <div v-if="scope.$index === 0">--</div>
                                        <div v-else>{{scope.row.icbcFlag?'是':'否'}}</div>
                                    </template>
                                </el-table-column>
                            <el-table-column prop="bank" label="银行/单位">
                                <template slot-scope="scope">
                                    <div v-if="scope.$index === 0">--</div>
                                    <div v-else>{{scope.row.bank[1]}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price1" label="已收金额"></el-table-column>
                            <el-table-column prop="price2" label="未收金额"></el-table-column>
                        </el-table>
                        <!-- 组合贷款 -->
                        <el-table v-else-if="Payment === '组合贷款'" :data="table5" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="name" label="款项"></el-table-column>
                            <el-table-column prop="price" label="应收金额"></el-table-column>
                            <el-table-column prop="date" label="应收日期" width="160"></el-table-column>
                            <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <div v-if="scope.$index === 0">--</div>
                                        <div v-else>{{scope.row.icbcFlag?'是':'否'}}</div>
                                    </template>
                                </el-table-column>
                            <el-table-column prop="bank" label="银行/单位">
                                <template slot-scope="scope">
                                    <div v-if="scope.$index === 0">--</div>
                                    <div v-else>{{scope.row.bank[1]}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price1" label="已收金额"></el-table-column>
                            <el-table-column prop="price2" label="未收金额"></el-table-column>
                        </el-table>
                        <!-- 分期付款 -->
                        <el-table v-else-if="Payment === '分期付款'" :data="table4" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="name" label="款项"></el-table-column>
                            <el-table-column prop="price" label="应收金额"></el-table-column>
                            <el-table-column prop="date" label="应收日期" width="160"></el-table-column>
                            <el-table-column prop="bank" label="是否工行">
                                <template slot-scope="scope">
                                    --
                                </template>
                            </el-table-column>
                            <el-table-column prop="bank" label="银行/单位">
                                <template slot-scope="scope">
                                    --
                                </template>
                            </el-table-column>
                            <el-table-column prop="price1" label="已收金额"></el-table-column>
                            <el-table-column prop="price2" label="未收金额"></el-table-column>
                        </el-table>
                    </el-card>
                    <!-- 合同网签情况 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">合同网签情况</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="是否网签/备案">{{isRecord?'是':'否'}}</el-form-item>
                            <el-form-item label="未网签原因" v-if="!isRecord">{{why}}</el-form-item>
                        </el-form>
                    </el-card>
                    <!-- 业绩归属 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">业绩归属</span>
                        </div>
                        <el-form :inline="true">
                            <div>
                                <el-form-item label="成交类别">{{TransactionType}}</el-form-item>
                            </div>
                            <div v-if="TransactionType === '单独成交'">
                                <el-form-item label="置业顾问">{{counselorList[0].propertyConsultName}}</el-form-item>
                                <el-form-item label="顾问手机">{{counselorList[0].propertyConsultTel}}</el-form-item>
                            </div>
                            <div v-else-if="TransactionType === '推荐成交'">
                                <el-form-item label="置业顾问">{{counselorList[0].propertyConsultName}}</el-form-item>
                                <el-form-item label="顾问手机">{{counselorList[0].propertyConsultTel}}</el-form-item>
                                <el-form-item label="推荐人">{{counselorList[0].referrerUserName}}</el-form-item>
                            </div>
                            <div v-else-if="TransactionType === '共同成交'">
                                <div v-for="(item, index) in counselorList" :key="index">
                                    <el-form-item label="置业顾问">{{item.propertyConsultName}}</el-form-item>
                                    <el-form-item label="顾问手机">{{item.propertyConsultTel}}</el-form-item>
                                    <el-form-item label="占比">{{item.ratio}}</el-form-item>
                                </div>
                            </div>
                        </el-form>
                    </el-card>
                    <!-- 备注 -->
                    <el-card class="box-card">
                        <el-form>
                            <el-form-item label="备注">{{remark}}</el-form-item>
                        </el-form>
                    </el-card>
                    <!-- 附件信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">附件信息</span>
                        </div>
                        <el-table :data="accessoryTable" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="fileRealName" label="文件名称"></el-table-column>
                            <el-table-column prop="fileLength" label="附件大小"></el-table-column>
                            <el-table-column prop="updateUser" label="上传人"></el-table-column>
                            <el-table-column prop="updateTime" label="上传时间"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handleUpLoadFile(scope.row)">下载</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: Object
        },
        data() {
            return{
                /*********房间信息*********/
                houseInfo: null,
                buildInfo: null,
                batchInfo: null,
                signDate: '',// 签约日期
                /************客户信息*************/
                userTable: [],// table
                cardTypeOpiton: [{// 证件类型
					value: '身份证'
				}],
                sexOpiton: [{// 性别
                    value: '男'
                },{
                    value: '女'
                }],
                /************折扣信息**************/
                switchFlag: 0,// 是否工抵
                company: {// 工抵项目公司
                    name: '',
                    id: '',
                    company: null
                },
                payCreditAmount: 0,// 工抵金额
                switchFlag3: true,// 是否房票
                ticketPrice: 0,// 房票金额
                priceType: '',// 折扣计价方式
                DiscountInfo: [],// 折扣信息
                multipleSelection: [],// 所选中的折扣方式
                /***********购房券**************/
                switchFlag2: false,// 是否有购房券
                BuyStamps: [],// 购房券列表
                beautifyTotalPrice: '',// 美化金额
                /***********付款信息*********/
                Payment: '商业贷款',// 付款方式
                table1: [{// 一次性付款
                    name: '一次性付款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                }],
                table2: [{// 商业贷款
                    name: '首付款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 商业贷款
                    name: '按揭款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行                    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                }],
                table3: [{// 公积金贷款
                    name: '首付款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 商业贷款
                    name: '公积金',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                }],
                table4: [{// 分期付款
                    name: '一期款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 分期付款
                    name: '二期款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 分期付款
                    name: '三期款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 分期付款
                    name: '四期款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 分期付款
                    name: '五期款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                }],
                table5: [{// 组合贷款
                    name: '首付款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 组合贷款
                    name: '按揭款',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                },{// 组合贷款
                    name: '公积金',// 款项名称
                    price: '',// 应收金额
                    date: '',// 应收日期
                    icbcFlag: '',// 是否工行    
                    bank: [],// 银行/单位
                    price1: '',// 已收金额
                    price2: '',// 未收金额
                }],
                /********合同网签情况*************/
                isRecord: 0,// 是否网签/备案
                why: '',// 未网签原因
                TransactionType: '单独成交',// 成交类别
                searchPeopleFlag: false,// 查找推荐人
                counselorList: [{// 置业顾问列表
                    propertyConsultName: '',// 姓名
                    propertyConsultId: '',// id
                    propertyConsultTel: '',// 手机
                    referrerUserName: '',// 推荐人
                    referrerUserId: '',// 推荐人
                    referrerUserCode: '',// 推荐人
                    ratio: '100',// 占比
                    isMain: 1,//是否主要 
                },{// 置业顾问列表
                    propertyConsultName: '',// 姓名
                    propertyConsultId: '',// id
                    propertyConsultTel: '',// 手机
                    referrerUserName: '',// 推荐人
                    referrerUserId: '',// 推荐人
                    referrerUserCode: '',// 推荐人
                    ratio: '100',// 占比
                    isMain: 0,//是否主要 
                },{// 置业顾问列表
                    propertyConsultName: '',// 姓名
                    propertyConsultId: '',// id
                    propertyConsultTel: '',// 手机
                    referrerUserName: '',// 推荐人
                    referrerUserId: '',// 推荐人
                    referrerUserCode: '',// 推荐人
                    ratio: '100',// 占比
                    isMain: 0,//是否主要 
                }],
                accessoryTable: [],// 附件table,
                postData: null,// 发送给后台的数据
                remark: '',// 备注
                totalprice: '',// 签约总价
                price: '',// 签约单价
                totalDiscount: '',// 总折扣
                isBroken: '',// 是否破底
            }
        },
        methods: {
            handleCancel() {// 取消
                this.$emit('closeChild')
            },
            handleUpLoadFile(row) {// 下载附件
                window.open(row.fileUrl, '_blank');
            },
        },
        created() {
            console.log(this.data);
            
        },
        mounted() {
            if( this.data ){
                this.accessoryTable = this.data.resourceMaps || [];// 展示附件
                this.beautifyTotalPrice = this.data.beautifyTotalPrice;// 美化金额
                this.counselorList = this.data.belongs;// 业绩归属
                this.userTable = this.data.customs;// 客户信息
                this.priceType = this.data.discountCompMethod;// 折扣计算方式
                
                this.TransactionType = this.data.makeType;// 成交类别
                this.isRecord = this.data.netSignFlag;// 是否网签/备案
                this.why = this.data.noNetSignReason;// 未网签原因
                this.company.company = this.data.payCreditCompanyName;// 工抵城市
                this.payCreditAmount = this.data.payCreditAmount;// 工抵金额
                this.switchFlag = this.data.payCreditFlag;// 是否工抵
                this.switchFlag3 = this.data.houseTicketFlag?true:false;// 是否房票
                this.ticketPrice = this.data.houseTicketAmount;// 房票金额
                this.Payment = this.data.payMethod;// 付款方式
                this.signDate = this.data.signDate;// 签约日期
                this.switchFlag2 = this.data.ticketFlag;// 是否优惠券
                this.BuyStamps = this.data.tickets;// 优惠券列表
                this.DiscountInfo = this.data.discounts;// 折扣信息

                this.price = this.data.signPrice,// 签约单价
                this.totalprice = this.data.signTotalAmount,// 签约单价
                this.isBroken = this.data.underLowestFlag?'是':'否';// 是否破底
                this.totalDiscount = this.data.discountAmount;// 总折扣
                // this.isBroken = this.data.underLowestFlag;//是否破底
                this.houseInfo = {
                    houseFullName: this.data.houseFullName,// 房间名称
                    id: this.data.houseId,// id
                    refHouseFullNames: this.data.refHouseFullNames,// 关联房号
                    floorSpace: this.data.floorSpace,// 建筑面积
                    apportionArea: this.data.apportionArea,// 分摊面积
                    basementArea: this.data.basementArea,// 地下室面积
                    giftArea: this.data.giftArea,// 赠送面积
                    priceMethod: this.data.priceMethod,// 计价方式
                    buildingArea: this.data.buildingArea,// 套内面积
                    gardenArea: this.data.gardenArea,// 花园面积
                    roofArea: this.data.roofArea,// 天台面积
                    priceArea: this.data.priceArea,// 计价面积
                    prePrice: this.data.prePrice,// 预售表单价
                    preTotalPrice: this.data.preTotalPrice,// 预售表总价
                    preMinPrice: this.data.preMinPrice,// 预售底单价
                    preMinTotalPrice: this.data.preMinTotalPrice,// 预售底总价
                }
                if( this.data.payMethod === '商业贷款' ){
                    this.table2 = this.data.payments.map(item=>{
                        return {
                            name: item.paymentItemName,// 款项名称
                            price: item.receivableAmount,// 应收金额
                            date: item.receivableDate,// 应收日期
                            bank: [item.bankName, item.bankBranchName],// 银行/单位
                            price1: item.receivedAmount,// 已收金额
                            price2: item.unreceivedAmount,// 未收金额
                        }
                    })
                    console.log(this.table2)
                }else if( this.data.payMethod === '一次性付款' ){
                    this.table1 = this.data.payments.map(item=>{
                        return {
                            name: item.paymentItemName,// 款项名称
                            price: item.receivableAmount,// 应收金额
                            date: item.receivableDate,// 应收日期
                            bank: [item.bankName, item.bankBranchName],// 银行/单位
                            price1: item.receivedAmount,// 已收金额
                            price2: item.unreceivedAmount,// 未收金额
                        }
                    })
                }else if( this.data.payMethod === '公积金贷款' ){
                    this.table3 = this.data.payments.map(item=>{
                        return {
                            name: item.paymentItemName,// 款项名称
                            price: item.receivableAmount,// 应收金额
                            date: item.receivableDate,// 应收日期
                            bank: [item.bankName, item.bankBranchName],// 银行/单位
                            price1: item.receivedAmount,// 已收金额
                            price2: item.unreceivedAmount,// 未收金额
                        }
                    })
                }else if( this.data.payMethod === '分期付款' ){
                    this.table4 = this.data.payments.map(item=>{
                        return {
                            name: item.paymentItemName,// 款项名称
                            price: item.receivableAmount,// 应收金额
                            date: item.receivableDate,// 应收日期
                            bank: [item.bankName, item.bankBranchName],// 银行/单位
                            price1: item.receivedAmount,// 已收金额
                            price2: item.unreceivedAmount,// 未收金额
                        }
                    })
                    console.log(this.table4)
                }else if( this.data.payMethod === '组合贷款' ){
                    this.table5 = this.data.payments.map(item=>{
                        return {
                            name: item.paymentItemName,// 款项名称
                            price: item.receivableAmount,// 应收金额
                            date: item.receivableDate,// 应收日期
                            bank: [item.bankName, item.bankBranchName],// 银行/单位
                            price1: item.receivedAmount,// 已收金额
                            price2: item.unreceivedAmount,// 未收金额
                        }
                    })
                }
                
            }
        }
    }
</script>

<style scoped>
.add{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #e5e5e5;
    z-index: 4;
    box-sizing: border-box;
    padding: 20px;
}
.add-con{
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
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
.title_text{
    font-size: 12px;
    color: #404040;
    float: left;
    font-weight: 900;
    line-height: 40px;
}
.title_text span{
    color: #4DBE61;
    margin-left: 20px;
} 
.form_bottom{
    display: inline-block;
    font-size: 14px;
    font-weight: 900;
    /* color: #4DBE61; */
    margin-right: 30px;
}
.form_bottom:last-child{
    margin: 0;
    float: right;
}
.form_bottom span{
    color: #E60012;
    margin-left: 10px;
}
.close {
      font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    float: right;
}
</style>