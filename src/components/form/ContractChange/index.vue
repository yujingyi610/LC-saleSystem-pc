<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">签约合同变更审批单发起</span>
                    <div style="float: right">
                        <el-button @click="handleCancel">取消</el-button>
                        <el-button type="success" @click="handleSave">保存</el-button>
                        <el-button type="success" @click="handleUp">提交</el-button>
                    </div>
                </div>
                <div class="text item">
                     <!-- 签约信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">签约信息</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="合同编号">{{code}}</el-form-item>
                            <el-form-item label="签约日期">{{signDate}}</el-form-item>
                        </el-form>
                    </el-card>
                     <!-- 房间信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">房间信息</span>
                        </div>
                        <el-form :inline="true" :model="houseInfo">
                            <div>
                                <el-form-item label="房间号码">{{houseInfo?houseInfo.houseFullName:''}}</el-form-item>
                                <!-- <el-form-item v-if="houseInfo" label="相关房号">{{houseInfo?houseInfo.refHouseFullNames:''}}</el-form-item> -->
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
									<el-form-item label="套内面积:"><span class="units">{{houseInfo.buildingArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="花园面积:"><span class="units">{{houseInfo.gardenArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="天台面积:"><span class="units">{{houseInfo.roofArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="计价面积:"><span class="units">{{houseInfo.priceArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="预售表单价:"><span class="units">{{houseInfo.prePrice}}元/m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售表总价:"><span class="units">{{houseInfo.preTotalPrice}}元</span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售底单价:"><span class="units">{{houseInfo.preMinPrice}}元/m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售底总价:"><span class="units">{{houseInfo.preMinTotalPrice}}元</span></el-form-item>
								</el-col>
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
                    <!-- 成交信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">成交信息</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="计价方式">{{houseInfo?houseInfo.priceMethod:''}}</el-form-item>
                            <el-form-item label="表单价">{{houseInfo?houseInfo.prePrice:''}}</el-form-item>
                            <el-form-item label="表总价">{{houseInfo?houseInfo.preTotalPrice:''}}</el-form-item>
                            <!-- <el-form-item label="底单价">{{houseInfo?houseInfo.preMinPrice:''}}</el-form-item>
                            <el-form-item label="底总价">{{houseInfo?houseInfo.preMinTotalPrice:''}}</el-form-item> -->
                        </el-form>
                    </el-card>
                    <!-- 原成交信息 -->
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span class="title">原成交信息</span>
                        </div>
                        <!-- 折扣信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">折扣信息</span>
                                <div style="float: right"><span class="title_text">折扣计价方式:<span>{{oldPriceType}}</span></span></div>
                            </div>
                            <el-table :data="oldDiscountInfo" tooltip-effect="dark" style="width: 100%">
                                <el-table-column prop="discountName" label="折扣名称"></el-table-column>
                                <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                                <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                                <el-table-column prop="maxDiscountItem" label="折扣上限">
                                    <template slot-scope="scope">
                                        {{scope.row.maxDiscountItem}}{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="discountItem" label="折扣详情">
                                    <template slot-scope="scope">
                                        {{scope.row.discountItem}}{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-form :inline="true">
                                <el-form-item label="是否房票">
                                    <el-switch v-model="oldSwitchFlag3" active-color="#13ce66" disabled></el-switch>
                                </el-form-item>
                                <el-form-item label="房票金额" v-if="oldSwitchFlag3">{{oldTicketPrice}}
                                </el-form-item>
                            </el-form>
                            <!-- <div style="overflow: hidden">
                                <span class="title_text">是否有特殊折扣:
                                    <el-switch v-model="switchFlag2" active-color="#13ce66"></el-switch>
                                </span>
                                <div style="float: right; line-height: 40px;" v-if="switchFlag2">
                                    <el-button type="success" @click="handleAddStamps">新增特殊折扣</el-button>
                                </div>
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
                            </el-table> -->
                            <div style="overflow: hidden">
                                <div style="float: left">
                                    <span>总价直减:</span>{{oldBeautifyTotalPrice}}
                                </div>
                                <div style="float: right; line-height: 40px">
                                    <span class="title_text">总折扣:{{oldTotalDiscount}}元</span>
                                </div>
                            </div>
                            <div style="overflow: hidden">
                                <span class="form_bottom">签约单价:<span>{{oldPrice}}元</span></span>
                                <span class="form_bottom">签约总价:<span>{{oldTotalprice}}元</span></span>
                                <span class="form_bottom">合同金额大写:<span>{{oldTotalprice | PriceInWords}}</span></span>
                                <span class="form_bottom">是否破底:<span>{{oldIsBroken}}</span></span>
                            </div>
                        </el-card>
                        <!-- 付款信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">付款信息</span>
                            </div>
                            <el-form :inline="true">
                                <el-form-item label="付款方式">{{oldPayment}}</el-form-item>
                            </el-form>
                            <el-table :data="oldPayTable" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="paymentItemName" label="款项名称" width="280"></el-table-column>
                                <el-table-column prop="receivableDate" label="应收日期" width="160"></el-table-column>
                                <el-table-column prop="receivableAmount" label="应收金额"></el-table-column>
                                <el-table-column prop="icbcFlag" label="是否工行"></el-table-column>
                                <el-table-column prop="bankBranchName" label="银行"></el-table-column>
                                <el-table-column prop="receivedAmount" label="已收金额"></el-table-column>
                                <el-table-column prop="name" label="未收金额">
                                    <template slot-scope="scope">
                                        {{scope.row.receivableAmount - scope.row.receivedAmount}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-card>
                    <!-- 新成交信息 -->
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span class="title">新成交信息</span>
                        </div>
                         <!-- 折扣信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">折扣信息</span>
                                <div style="float: right"><span class="title_text">折扣计价方式:<span>{{priceType}}</span></span></div>
                            </div>
                            <el-table ref="multipleTable" :data="DiscountInfo" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" row-key="discountId">
                                <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                                <el-table-column prop="discountName" label="折扣名称"></el-table-column>
                                <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                                <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                                <el-table-column prop="maxDiscountItem" label="折扣上限">
                                    <template slot-scope="scope">
                                        {{scope.row.maxDiscountItem}}{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="discountItem" label="折扣详情">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.discountItem" @change="handleDiscountItem(scope.row, scope.$index)"></el-input>{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-form :inline="true">
                                <el-form-item label="是否房票">
                                    <el-switch v-model="switchFlag3" active-color="#13ce66" @change="handleChangeTable"></el-switch>
                                </el-form-item>
                                <el-form-item label="房票金额" v-if="switchFlag3">
                                    <el-input v-model="ticketPrice"  @blur="handlePrice('ticketPrice')"></el-input>
                                </el-form-item>
                            </el-form>
                            <!-- <div style="overflow: hidden">
                                <span class="title_text">是否有特殊折扣:
                                    <el-switch v-model="switchFlag2" active-color="#13ce66"></el-switch>
                                </span>
                                <div style="float: right; line-height: 40px;" v-if="switchFlag2">
                                    <el-button type="success" @click="handleAddStamps">新增特殊折扣</el-button>
                                </div>
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
                            </el-table> -->
                            <div style="overflow: hidden">
                                <div style="float: left">
                                    <span>总价直减:</span>
                                    <el-input v-model="beautifyTotalPrice"  @change="handleBeautifyPrice"></el-input>  
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
                                <el-form-item label="付款方式">
                                    <el-select v-model="Payment" @change="handleInitBank">
                                        <el-option v-for="(item, index) in PaymentOption" :key="index" :label="item.value" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-button type="text" style="float: right" @click="OpenMortgageCalculator"><i class="el-icon-nav-jisuanqi" style="float: left; margin-right: 5px"></i>房贷计算器</el-button> -->
                            </el-form>
                            <!-- 一次性付款 -->
                            <div v-if="Payment === '一次性付款'">
                                <el-table :data="table11" border style="width: 100%; margin-bottom: 20px">
                                    <el-table-column prop="name" label="款项"></el-table-column>
                                    <el-table-column prop="price" label="应收金额">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.name === '工抵'">
                                                {{scope.row.price}}
                                            </span>
                                            <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                                                {{scope.row.price}}
                                            </span>
                                            <span v-else>
                                                {{scope.row.price}}
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="应收日期" width="180">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.name.indexOf('房票') !== -1">
                                                <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                            </span>
                                            <span v-else-if="scope.row.name === '一次性付款'">
                                                <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled @change="handleChangeTicketNum('table11')"></el-date-picker>
                                            </span>
                                            <span v-else>
                                                <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                                            </span>
                                        </template>
                                    </el-table-column>
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
                                    <el-table-column label="已收金额">
                                        <template slot-scope="scope">
                                            0
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="未收金额"></el-table-column>
                                </el-table>
                            </div>
                            <!-- 商业贷款 -->
                            <el-table v-else-if="Payment === '商业贷款'" :data="table21" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="name" label="款项"></el-table-column>
                                <el-table-column prop="price" label="应收金额">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name === '工抵'">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else>
                                            <el-input v-model="scope.row.price" @change="handleChangeNum2(scope.row, scope.$index)"></el-input>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收日期" width="180">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                        </span>
                                        <span v-else-if="scope.row.name === '首付款'">
                                            <el-date-picker v-model="scope.row.date" disabled align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table21')"></el-date-picker>
                                        </span>
                                        <span v-else>
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                                        <span v-else>
                                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC2(scope.row, scope.$index)"></el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="bank" label="银行/单位">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                                        <span v-else>
                                            <el-cascader :options="bankOptionUse" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="已收金额">
                                    <template slot-scope="scope">
                                        0
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price" label="未收金额"></el-table-column>
                            </el-table>
                            <!-- 公积金贷款 -->
                            <el-table v-else-if="Payment === '公积金贷款'" :data="table31" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="name" label="款项"></el-table-column>
                                <el-table-column prop="price" label="应收金额">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name === '工抵'">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else>
                                            <el-input v-model="scope.row.price" @change="handleChangeNum3(scope.row, scope.$index)"></el-input>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收日期" width="180">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                        </span>
                                        <span v-else-if="scope.row.name === '首付款'">
                                            <el-date-picker v-model="scope.row.date" disabled align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table31')"></el-date-picker>
                                        </span>
                                        <span v-else>
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                                        <span v-else>
                                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC3(scope.row, scope.$index)"></el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="bank" label="银行/单位">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                                        <span v-else>
                                            <el-cascader :options="bankOptionUse" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="已收金额">
                                    <template slot-scope="scope">
                                        0
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price" label="未收金额"></el-table-column>
                            </el-table>
                            <!-- 组合贷款 -->
                            <el-table v-else-if="Payment === '组合贷款'" :data="table51" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="name" label="款项"></el-table-column>
                                <el-table-column prop="price" label="应收金额">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name === '工抵'">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else>
                                            <el-input v-model="scope.row.price" @change="handleChangeNum5(scope.row, scope.$index)"></el-input>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收日期" width="180">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                        </span>
                                        <span v-else-if="scope.row.name === '首付款'">
                                            <el-date-picker v-model="scope.row.date" disabled align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table51')"></el-date-picker>
                                        </span>
                                        <span v-else>
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否工行">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                                        <span v-else>
                                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC5(scope.row, scope.$index)"></el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="bank" label="银行/单位">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                                        <span v-else-if="scope.row.name === '按揭款'">
                                            <el-cascader :options="bankOptionUse" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                                        </span>
                                        <span v-else-if="scope.row.name === '公积金'">
                                            <el-cascader :options="bankOptionUse2" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="已收金额">
                                    <template slot-scope="scope">
                                        0
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price" label="未收金额"></el-table-column>
                            </el-table>
                            <!-- 分期付款 -->
                            <el-table v-else-if="Payment === '分期付款'" :data="table41" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="name" label="款项"></el-table-column>
                                <el-table-column prop="price" label="应收金额">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name === '工抵'">
                                            {{scope.row.price}}
                                        </span>
                                        <span v-else>
                                            <el-input v-model="scope.row.price" @change="handleChangeNum4(scope.row, scope.$index)"></el-input>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收日期" width="180">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                        </span>
                                        <span v-else-if="scope.row.name === '工抵'">
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                                        </span>
                                        <span v-else>
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table41')"></el-date-picker>
                                        </span>
                                    </template>
                                </el-table-column>
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
                                <el-table-column label="已收金额">
                                    <template slot-scope="scope">
                                        0
                                    </template>
                                </el-table-column>
                                <el-table-column prop="price" label="未收金额"></el-table-column>
                            </el-table>
                        </el-card>
                    </el-card>
                    <!-- 其他信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">其他信息 </span>
                        </div>
                        <el-form>
                            <el-form-item label="备注">
                                <el-input type="textarea" autosize style="width:300px" v-model="remark"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-card>
                    <!-- 附件信息 -->
                    <el-card class="box-card"
                        v-loading="loading"
                        element-loading-text="上传中，请稍后..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)">
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
                                    <el-button type="text" @click="handleDelFile(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-upload action="/zuul/api/storage/files/multipart/file"
                            :show-file-list="false" 
                            :on-success="handleUpDateSuccess"
                            :on-error="handleUpDateError"
                            :on-progress="handleProgress"
                            :before-upload="beforeAvatarUpload"
                            :data="upLoadData"
                            name="files"
                            style="float: right">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-card>
                </div>
            </el-card>
        </div>
        <search-ticket ref="searchTicketRef" @addTicket="handleAddTicket"></search-ticket>
    </div>
</template>

<script>
import searchTicket from '@/components/searchTicket'// 查找优惠券
import {saveTrdChange, submitTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
import {getHouse, getBank, saveAdd, sendTrdSign, getUserByMobile, getCityList, getProjectCompanyList} from '@/api/pages/mainPage/transactionManagement/contractManagement'
import {getCustomerInfo, getCustomerLabel} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
    export default {
        props: {
            row: Object
        },
        components: {
            searchTicket
        },
        computed: {
            price() {// 签约单价
                if( this.houseInfo ){
                    if( this.totalprice && this.houseInfo.priceArea ){
                        return (this.totalprice/this.houseInfo.priceArea).toFixed(2) || 0
                    }else{
                         return 0
                    }
                    
                }else{
                    return 0
                }
            },
            totalprice() {// 签约总价
                if( this.houseInfo ){
                    let price = 0;
                    if( this.houseInfo.preTotalPrice - this.totalDiscount > 0 ){
                        price = (this.houseInfo.preTotalPrice - this.totalDiscount).toFixed(0)
                    }else{
                        price = 0;
                    }
                    this.table11.map(item=>{
                        if( item.name === '一次性付款' ){
                            item.price = price - (this.switchFlag?this.payCreditAmount:0) - (this.switchFlag3?this.ticketPrice:0) || '';
                        }
                    })
                    
                    return price || 0
                }else{
                    // this.table11[0].price = '';
                    return '0'
                }
            },
            totalDiscount() {// 总折扣
                let priceList = [];// 单价优惠的列表
                let totalPricesList = [];// 总价优惠的列表
                let discountList = [];// 比例优惠的列表
                if( this.houseInfo ){
                    let totalDiscountPrice = this.houseInfo.preTotalPrice;
                    if( this.multipleSelection[0] ){
                        this.multipleSelection.map(item=>{// 遍历已选中的折扣方式，将三种折扣方式分别存储
                            if( item.discountMethod === '比例优惠' ){ discountList.push(item) }
                            else if( item.discountMethod === '单价优惠' ){ priceList.push(item) }
                            else if( item.discountMethod === '总价优惠' ){ totalPricesList.push(item) }
                        })
                        if( this.priceType === '先单价后总价再折扣' ){
                            priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                            totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                            discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        }else if( this.priceType === '先单价后折扣再总价' ){
                            priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                            discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                            totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        }else if( this.priceType === '先总价后折扣再单价' ){
                            totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                            discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                            priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                        }else if( this.priceType === '先总价后单价再折扣' ){
                            totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                            priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                            discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        }else if( this.priceType === '先折扣后单价再总价' ){
                            discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                            priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                            totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        }else if( this.priceType === '先折扣后总价再单价' ){
                            discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                            totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                            priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                        }
                    }
                    
                    if( this.BuyStamps[0] ){
                        this.BuyStamps.map(item=>{// 遍历购房券
                            totalDiscountPrice -= item.price;
                        })
                    }
                    
                    totalDiscountPrice -= this.beautifyTotalPrice;
                    return (this.houseInfo.preTotalPrice - totalDiscountPrice).toFixed(2);
                }else{
                    return 0
                }
                
            },
            isBroken() {// 是否破底
                if( this.houseInfo ){
                    if( this.totalprice < this.houseInfo.preMinTotalPrice ){
                        return '是'
                    }else{
                        return '否'
                    }
                }else{
                    return '否'
                }
            }
        },
        watch: {
            // row: {
            //     handler() {
            //         this.handleInfo()
            //     },
            //     deep: true
            // },
            ticketPrice(e) {
                if( e >= this.totalprice - (this.switchFlag?this.payCreditAmount:0)){
                    e = this.totalprice - (this.switchFlag?this.payCreditAmount:0);
                }
                if( this.switchFlag3 ){
                    this.table11.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                    this.table21.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                    this.table31.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                    this.table51.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                }
                this.handleChangeTable()
            },
            totalprice() {
                this.handleChangeTable()
            },
            switchFlag3(e) {
                if( e ){
                    this.table11.map(item=>{
                        if( item.name === '房票' ){
                            item.price = this.ticketPrice;
                        }
                    })
                    this.table21.map(item=>{
                        if( item.name === '房票' ){
                            item.price = this.ticketPrice;
                        }
                    })
                    this.table31.map(item=>{
                        if( item.name === '房票' ){
                            item.price = this.ticketPrice;
                        }
                    })
                    this.table51.map(item=>{
                        if( item.name === '房票' ){
                            item.price = this.ticketPrice;
                        }
                    })
                }
            }
        },
        data() {
            return{
                /***old***/
                oldPriceType: '',
                oldDiscountInfo: [],
                oldSwitchFlag3: false,
                oldTicketPrice: 0,
                oldBeautifyTotalPrice: 0,
                oldTotalDiscount: 0,
                oldPrice: 0,
                oldTotalprice: 0,
                oldIsBroken: '否',
                oldPayment: '',
                oldPayTable: [],


                redactFlag: false,
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                firstGoIn: true,
                canClick: true,
                table11: [],
                table21: [],
                table31: [],
                table41: [],
                table51: [],
                code: '',// 合同编号
                signDate: '',// 签约日期
                /*********房间信息*********/
                houseInfo: null,
                /************客户信息*************/
                userTable: [],// table
                newUserTable: [],// 新
                cardTypeOpiton: [],
                sexOpiton: [{// 性别
                    value: '男'
                },{
                    value: '女'
                }],
                /************折扣信息**************/
                switchFlag: false,// 是否工抵
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
                PaymentOption: [
                    {value: '一次性付款'},
                    {value: '商业贷款'},
                    {value: '公积金贷款'},
                    {value: '分期付款'},
                    {value: '组合贷款'}
                ],
                bankOption: [],// 银行数据
                bankOption1: [],// 工商银行数据
                bankOption2: [],// 非银行数据
                bankOptionUse: [],// 所用银行数据
                bankOptionUse2: [],// 所用银行数据
                bankProps: {// 银行级联配置参数
                    value: 'name',
                    label: 'name',
                },
                table1: [// 一次性付款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '一次性付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    }
                ],
                table2: [// 商业贷款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '首付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行
                        bank: [],// 银行/单位
                    },{// 商业贷款
                        name: '按揭款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行                    
                        bank: [],// 银行/单位
                    }
                ],
                table3: [// 公积金贷款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '首付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行     
                        bank: [],// 银行/单位
                    },{
                        name: '公积金',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    }
                ],
                table4: [// 分期付款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '一期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '一期款',// 款项名称
                        price: '',// 应收金额
                        icbcFlag: false,// 是否工行 
                        date: '',// 应收日期
                        bank: [],// 银行/单位
                    },{
                        name: '二期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '二期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    },{
                        name: '三期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '三期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    },{
                        name: '四期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '四期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行   
                        bank: [],// 银行/单位
                    },{
                        name: '五期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '五期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    }
                ],
                table5: [// 组合贷款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '首付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    },{// 组合贷款
                        name: '按揭款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行   
                        bank: [],// 银行/单位
                    },{// 组合贷款
                        name: '公积金',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    }
                ],
                accessoryTable: [],// 附件table,
                postData: null,// 发送给后台的数据
                remark: '',// 备注
                loading: false
            }
        },
        methods: {
            handleInitBank() {// 切换付款方式，重置银行下拉数据
                if( this.Payment === '商业贷款' ){
                    this.table21.map(item=>{
                        if( item.name === '按揭款' && item.icbcFlag ){
                            this.bankOptionUse = this.bankOption1;
                        }else if( item.name === '按揭款' && !item.icbcFlag ){
                            this.bankOptionUse = this.bankOption2;
                        }
                    })
                }else if( this.Payment === '公积金贷款' ){
                    this.table31.map(item=>{
                        if( item.name === '公积金' && item.icbcFlag ){
                            this.bankOptionUse = this.bankOption1;
                        }else if( item.name === '公积金' && !item.icbcFlag ){
                            this.bankOptionUse = this.bankOption2;
                        }
                    })
                }else if( this.Payment === '组合贷款' ){
                    this.table51.map(item=>{
                        if( item.name === '公积金' && item.icbcFlag ){
                            this.bankOptionUse = this.bankOption1;
                        }else if( item.name === '公积金' && !item.icbcFlag ){
                            this.bankOptionUse = this.bankOption2;
                        }else if( item.name === '按揭款' && item.icbcFlag ){
                            this.bankOptionUse = this.bankOption1;
                        }else if( item.name === '按揭款' && !item.icbcFlag ){
                            this.bankOptionUse = this.bankOption2;
                        }
                    })
                }
            },
            handleBeautifyPrice() {
                this.beautifyTotalPrice = Number(this.beautifyTotalPrice).toFixed(2);
            },
            handleDiscountItem(row, index) {// 折扣详情判断最大值
                if( this.DiscountInfo[index].discountMethod === '比例优惠' ){
                    if( Number(row.discountItem) < Number(row.maxDiscountItem) ){
                        this.DiscountInfo[index].discountItem = Number(row.maxDiscountItem)
                    }
                    this.DiscountInfo[index].discountItem = Math.floor(this.DiscountInfo[index].discountItem);
                    if( Number(row.discountItem) > 100 ){
                        this.DiscountInfo[index].discountItem = 100;
                    }
                }else{
                    if( Number(row.discountItem) > Number(row.maxDiscountItem) ){
                        this.DiscountInfo[index].discountItem = Number(row.maxDiscountItem)
                    }
                    
                    if( Number(row.discountItem) <= 0 ){
                        this.DiscountInfo[index].discountItem = 0;
                    }
                    this.DiscountInfo[index].discountItem = this.DiscountInfo[index].discountItem.toFixed(2);
                }
            },
            handleCancel() {// 取消
                this.$emit('closeChild')
            },
            handleChangeTable() {// 工抵、房票改变，付款table展示改变
                this.ticketPrice = this.switchFlag3?this.ticketPrice:0;
                this.payCreditAmount = this.switchFlag?this.payCreditAmount:0;
                this.table11.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table21.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table31.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table41.map(item=>{
                    if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table51.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })

                this.table11 = [];
                this.table21 = [];
                this.table31 = [];
                this.table41 = [];
                this.table51 = [];
                if( this.switchFlag && this.switchFlag3 ){
                    this.table11 = this.table1.map(item=>{
                        return item;
                    })
                    this.table21 = this.table2.map(item=>{
                        return item;
                    })
                    this.table31 = this.table3.map(item=>{
                        return item;
                    })
                    this.table41 = this.table4.map(item=>{
                        return item;
                    })
                    this.table51 = this.table5.map(item=>{
                        return item;
                    })
                }else if( !this.switchFlag && this.switchFlag3 ){
                    this.table1.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table11.push(item)
                        }
                    })
                    this.table2.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table21.push(item)
                        }
                    })
                    this.table3.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table31.push(item)
                        }
                    })
                    this.table4.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table41.push(item)
                        }
                    })
                    this.table5.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table51.push(item)
                        }
                    })
                }else if( this.switchFlag && !this.switchFlag3 ){
                    this.table1.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table11.push(item)
                        }
                    })
                    this.table2.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table21.push(item)
                        }
                    })
                    this.table3.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table31.push(item)
                        }
                    })
                    this.table4.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table41.push(item)
                        }
                    })
                    this.table5.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table51.push(item)
                        }
                    })
                }else{
                    this.table1.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table11.push(item)
                        }
                    })
                    this.table2.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table21.push(item)
                        }
                    })
                    this.table3.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table31.push(item)
                        }
                    })
                    this.table4.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table41.push(item)
                        }
                    })
                    this.table5.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table51.push(item)
                        }
                    })
                }
                if( this.Payment === '一次性付款' ){
                    this.table11[this.table11.length - 1].price = this.totalprice - this.payCreditAmount - this.ticketPrice;
                }else if( this.Payment === '商业贷款' ){
                    this.handleChangeNum2(this.table21[this.table21.length - 1], this.table21.length - 1)
                }else if( this.Payment === '公积金贷款' ){
                    this.handleChangeNum3(this.table31[this.table31.length - 1], this.table31.length - 1)
                }else if( this.Payment === '分期付款' ){
                    this.handleChangeNum4(this.table41[this.table41.length - 1], this.table41.length - 1)
                }
                else if( this.Payment === '组合贷款' ){
                    this.handleChangeNum5(this.table51[this.table51.length - 1], this.table51.length - 1)
                }
                
            },   
            handlePrice(priceName) {// 工抵、房票改变，判断最大值
                this[priceName] = Number(this[priceName])
                if( priceName === 'ticketPrice' ){
                    if( this[priceName] >= this.totalprice - (this.switchFlag?this.payCreditAmount:0)){
                        this[priceName] = this.totalprice - (this.switchFlag?this.payCreditAmount:0);
                    }
                }else{
                    if( this[priceName] >= this.totalprice - (this.switchFlag?this.ticketPrice:0)){
                        this[priceName] = this.totalprice - (this.switchFlag?this.ticketPrice:0);
                    }
                }
                this[priceName] = this[priceName].toFixed(2)
                
            },
            handleChangeTicketNum(tableName) {// 改变首付款时间，房票时间动态改变
                let date = null;
                if( tableName === 'table41' ){
                    for( let i = 0; i < this[tableName].length; i++ ){
                        if( this[tableName][i].name === '一期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '二期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '三期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '四期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '五期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                    }
                    return
                }
                this[tableName].map(item=>{
                    if( item.name === '一次性付款' || item.name === '首付款' ){
                        date = item.date; 
                    }
                })
                this[tableName].map(item=>{
                    if( item.name.indexOf('房票') !== -1 ){
                        item.date = date; 
                    }
                })
            },
            handleSelectionChange(val) {// 选择折扣方式
                this.multipleSelection = val;
            },
            handleChangeIsICBC2(row, index) {// 改变是否工行，更换银行数据(商业贷款)
                this.table2[index].bank = [];
                if( row.icbcFlag ){
                    this.bankOptionUse = this.bankOption1;
                }else{
                    this.bankOptionUse = this.bankOption2;
                }
            },
            handleChangeIsICBC3(row, index) {// 改变是否工行，更换银行数据(公积金贷款)
                this.table3[index].bank = [];
                if( row.icbcFlag ){
                    this.bankOptionUse = this.bankOption1;
                }else{
                    this.bankOptionUse = this.bankOption2;
                }
            },
            handleChangeIsICBC5(row, index) {// 改变是否工行，更换银行数据(组合贷款)
                this.table5[index].bank = [];
                if( row.name === '按揭款' ){
                    if( row.icbcFlag ){
                        this.bankOptionUse = this.bankOption1;
                    }else{
                        this.bankOptionUse = this.bankOption2;
                    }
                }else if( row.name === '公积金' ){
                    if( row.icbcFlag ){
                        this.bankOptionUse2 = this.bankOption1;
                    }else{
                        this.bankOptionUse2 = this.bankOption2;
                    }
                }
                
            },
            handleChangeNum2(row, index) {// 改变一个价格，另一个价格随之改变(商业贷款)
                if( row.name === '首付款' ){
                    this.table21[index+1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                }else if( row.name === '按揭款' ){
                    this.table21[index-1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                }
                this.table21[index].price = Number(this.table21[index].price).toFixed(2)
            },
            handleChangeNum3(row, index) {// 改变一个价格，另一个价格随之改变(公积金贷款)
                if( row.name === '首付款' ){
                    this.table31[index+1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                }else if( row.name === '公积金' ){
                    this.table31[index-1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                }
                this.table31[index].price = Number(this.table31[index].price).toFixed(2)
            },
            handleChangeNum4(row, index) {// 改变一个价格，另一个价格随之改变(分期贷款)
                let a = this.switchFlag3?2:1;
                if( row.name === '一期款' ){
                    this.table41[index+a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index+4*a].price).toFixed(2);
                    if( this.table41[index+a].price < 0 ){
                        this.table41[index+a].price = 0;
                        this.table41[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index+4*a].price).toFixed(2);
                    }
                }else if( row.name === '二期款' ){
                    this.table41[index+a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index-a].price).toFixed(2);
                    if( this.table41[index+a].price < 0 ){
                        this.table41[index+a].price = 0;
                        this.table41[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index-a].price).toFixed(2);
                    }
                }
                else if( row.name === '三期款' ){
                    this.table41[index+a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                    if( this.table41[index+a].price < 0 ){
                        this.table41[index+a].price = 0;
                        this.table41[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                    }
                }
                else if( row.name === '四期款' ){
                    this.table41[index+a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                    if( this.table41[index+a].price < 0 ){
                        this.table41[index+a].price = 0;
                        this.table41[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                    }
                }
                else if( row.name === '五期款' ){
                    this.table41[index-4*a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                    if( this.table41[index-4*a].price < 0 ){
                        this.table41[index-4*a].price = 0;
                        this.table41[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                    }
                }
                this.table41[index].price = Number(this.table41[index].price).toFixed(2)
            },
            handleChangeNum5(row, index) {// 改变一个价格，另一个价格随之改变(组合贷款)
                let a = 1;
                if( row.name === '首付款' ){
                    this.table51[index+a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table51[index+2*a].price).toFixed(2);
                    if( this.table51[index+a].price < 0 ){
                        this.table51[index+a].price = 0;
                        this.table51[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table51[index+2*a].price).toFixed(2);
                    }
                }else if( row.name === '按揭款' ){
                    this.table51[index+a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table51[index-a].price).toFixed(2);
                    if( this.table51[index+a].price < 0 ){
                        this.table51[index+a].price = 0;
                        this.table51[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table51[index-a].price).toFixed(2);
                    }
                }
                else if( row.name === '公积金' ){
                    this.table51[index-2*a].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table51[index-a].price).toFixed(2);
                    if( this.table51[index-2*a].price < 0 ){
                        this.table51[index-2*a].price = 0;
                        this.table51[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table51[index-a].price).toFixed(2);
                    }
                }
                this.table51[index].price = Number(this.table51[index].price).toFixed(2)
            },
            handleGetBank() {// 获取银行数据
                this.bankOption1 = [];// 工行
                this.bankOption2 = [];// 非工行
                this.bankOptionUse = [];
                this.bankOptionUse2 = [];
                let params = new URLSearchParams();
                params.append('devstagesId', this.houseInfo.devstagesId)
                getBank(params).then(res=>{
                    if( res.status === 200 ){
                        this.bankOption = res.data;
                        res.data.map((item, index)=>{
                            if( item.name === '工商银行' ){
                                this.bankOption1.push(item)
                            }else{
                                this.bankOption2.push(item)
                            }
                        })
                        this.bankOptionUse = this.bankOption2;
                        this.bankOptionUse2 = this.bankOption2;// 用于组合贷款
                        
                    }
                }).then(_=>{
                    if( this.row ){
                        getHouse({ houseId: this.row.houseId }).then(res=>{
                            this.DiscountInfo = [];
                            this.$refs.multipleTable.clearSelection();
                            this.multipleSelection = [];
                            if( res.status === 200 ){
                                if( this.redactFlag ){
                                    this.DiscountInfo = res.data.relDtos;
                                }else{  
                                    if( res.data.relDtos ){// 编辑签约单时判断是否为公开优惠，置业顾问只可以选择公开优惠与经济总所选中的非公开优惠
                                        res.data.relDtos.map(item=>{
                                            if( item.discountType === '公开优惠' ){
                                                this.DiscountInfo.push(item)
                                            }
                                        })
                                    }
                                    this.row.discounts.map(item=>{
                                        if( item.discountType === '非公开优惠' ){
                                            this.DiscountInfo.push(item)
                                        }
                                    })
                                }
                                this.DiscountInfo.map(item=>{
                                    item.maxDiscountItem = item.discountItem
                                })
                                // this.DiscountInfo = res.data.relDtos;
                                this.row.discounts.map(item1=>{
                                    this.DiscountInfo.map(item2=>{
                                        if(item2.discountId === item1.discountId){
                                            item2.discountItem = item1.discountItem
                                        }
                                    })
                                })
                                if( !this.DiscountInfo || !this.DiscountInfo[0] || !this.row.discounts[0]){
                                    return
                                }
                                this.row.discounts.map(i=>{
                                    this.$refs.multipleTable.toggleRowSelection(this.DiscountInfo.find(d=>d.discountId === i.discountId),true);
                                })
                                console.log(this.multipleSelection)
                            }
                        })
                        let newTable = this.row.payments.map(item=>{
                            return {
                                name: item.paymentItemName,// 款项名称
                                price: item.receivableAmount,// 应收金额
                                date: new Date(item.receivableDate),// 应收日期
                                bank: [item.bankName, item.bankBranchName],// 银行/单位
                                price1: 0,// 已收金额
                                price2: item.receivableAmount,// 未收金额
                                icbcFlag: item.icbcFlag?true:false
                            }
                        })

                        if( this.row.payMethod === '商业贷款' ){
                            this.table2.map(item=>{
                                newTable.map(item2=>{
                                    if( item2.name === '按揭款' && item2.icbcFlag ){
                                        this.bankOptionUse = this.bankOption1;
                                    }
                                    if( item.name === item2.name ){
                                        item.price = item2.price;
                                        item.date = item2.date;
                                        item.bank = item2.bank;
                                        item.price1 = item2.price1;
                                        item.price2 = item2.price2;
                                        item.icbcFlag = item2.icbcFlag;
                                    }
                                })
                            })
                        }else if( this.row.payMethod === '一次性付款' ){
                            this.table1.map(item=>{
                                newTable.map(item2=>{
                                    if( item.name === item2.name ){
                                        item.price = item2.price;
                                        item.date = item2.date;
                                        item.bank = item2.bank;
                                        item.price1 = item2.price1;
                                        item.price2 = item2.price2;
                                        item.icbcFlag = item2.icbcFlag;
                                    }
                                })
                            })
                        }else if( this.row.payMethod === '公积金贷款' ){
                            this.table3.map(item=>{
                                newTable.map(item2=>{
                                    if( item2.name === '公积金' && item2.icbcFlag ){
                                        this.bankOptionUse = this.bankOption1;
                                    }
                                    if( item.name === item2.name ){
                                        item.price = item2.price;
                                        item.date = item2.date;
                                        item.bank = item2.bank;
                                        item.price1 = item2.price1;
                                        item.price2 = item2.price2;
                                        item.icbcFlag = item2.icbcFlag;
                                    }
                                })
                            })
                        }else if( this.row.payMethod === '分期付款' ){
                            this.table4.map(item=>{
                                newTable.map(item2=>{
                                    if( item.name === item2.name ){
                                        item.price = item2.price;
                                        item.date = item2.date;
                                        item.bank = item2.bank;
                                        item.price1 = item2.price1;
                                        item.price2 = item2.price2;
                                        item.icbcFlag = item2.icbcFlag;
                                    }
                                })
                            })
                        }else if( this.row.payMethod === '组合贷款' ){
                            this.table5.map(item=>{
                                newTable.map(item2=>{
                                    if( item2.name === '公积金' && item2.icbcFlag ){
                                        this.bankOptionUse2 = this.bankOption1;
                                    }else if( item2.name === '按揭款' && item2.icbcFlag ){
                                        this.bankOptionUse = this.bankOption1;
                                    }
                                    if( item.name === item2.name ){
                                        item.price = item2.price;
                                        item.date = item2.date;
                                        item.bank = item2.bank;
                                        item.price1 = item2.price1;
                                        item.price2 = item2.price2;
                                        item.icbcFlag = item2.icbcFlag;
                                    }
                                })
                            })
                        }
                        this.handleChangeTable()
                    }
                })
            },
            handleAddStamps() {// 新增购房券
                this.$refs.searchTicketRef.show();
            },
            handleAddTicket(item) {// 将购房券添加进来
                if( item ){
                    this.BuyStamps.push(item)
                }
            },
            handleDelectStamps(index) {// 删除购房券
                this.BuyStamps.splice(index, 1)
            },
            handleInfo() {// 处理编辑里面的数据
                this.DiscountInfo = [];
                // this.$refs.multipleTable.clearSelection();
                this.multipleSelection = [];
                this.code = this.row.signCode;// 合同单号
                this.signDate = this.row.signDate;// 签约日期
                let newDate = new Date(this.signDate)
                // let newDate = this.signDate
                console.log(newDate)
                this.table1.map(item=>{
                    item.date = item.date || newDate
                })
                this.table2.map(item=>{
                    item.date = item.date || newDate
                })
                this.table3.map(item=>{
                    item.date = item.date || newDate
                })
                this.table4.map(item=>{
                    item.date = item.date || newDate
                })
                this.table5.map(item=>{
                    item.date = item.date || newDate
                })
                this.table11 = this.table1;
                this.table21 = this.table2;
                this.table31 = this.table3;
                this.table41 = this.table4;
                this.table51 = this.table5;

                this.houseInfo = this.row;// 房间信息
                
                this.userTable = this.row.customs;// 客户table
                this.priceType = this.row.discountCompMethod;// 折扣计价方式
                this.switchFlag2 = this.row.ticketFlag;// 是否优惠券
                this.BuyStamps = this.row.tickets;// 优惠券列表
                this.beautifyTotalPrice = this.row.beautifyTotalPrice;// 美化金额
                this.remark = this.row.remark;// 备注

                this.accessoryTable = this.row.resourceMaps;// 展示附件
                this.commonResources = this.row.commonResources;// 传给后台的附件

                this.beautifyTotalPrice = this.row.beautifyTotalPrice;// 美化金额
                
                
                this.switchFlag3 = this.row.houseTicketFlag?true:false;// 是否房票
                this.ticketPrice = this.row.houseTicketAmount;// 房票金额
                this.Payment = this.row.payMethod;// 付款方式
                // this.houseInfo = this.row;// 房间信息
                this.handleGetBank()
                
            },
            handleUpDateSuccess(response, file, fileList) {// 文件上传
                 
                this.loading = false;
                if( response.status === 200 ){
                    this.$message({
                        type: 'success',
                        message: '上传成功！'
                    })
                    response.data.map(item=>{
                        this.commonResources.push({
                            fileUrl: item.fileUrl,
                            resourceId: item.id
                        })
                        this.accessoryTable.push(item);
                    })
                    
                     
                }
            },
            handleUpDateError(err) {
                // 上传失败
                this.$alert(JSON.parse(err.message).message, "提示", {
                    confirmButtonText: "确定",
                    showClose: false,
                    callback: action => {
                    this.loading = false;
                    }
                });
            },
            handleProgress(file, fileList) {
                // 上传中
                if (!this.loading) {
                     

                    this.loading = true;
                }
            },
            beforeAvatarUpload(file) {// 上传前判断文件大小
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 10MB!');
                }
                return isLt2M;
            },
            handleUpLoadFile(row) {// 下载附件
                window.open(row.fileUrl, '_blank');
            },
            handleDelFile(index) {// 删除
                this.accessoryTable.splice(index, 1);
                this.commonResources.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            },
            handleData() {// 处理发送给后台的数据
            
                let payments = [];
                if( this.Payment === '一次性付款' ){
                    payments = this.table11.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: Number(item.price),// 应收款
                            receivableDate: this.Time(item.date)// 日期
                        }
                    })
                }else if( this.Payment === '商业贷款' ){
                    payments = this.table21.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: Number(item.price),// 应收款
                            receivableDate: this.Time(item.date)// 日期
                        }
                    })
                }else if( this.Payment === '公积金贷款' ){
                    payments = this.table31.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: Number(item.price),// 应收款
                            receivableDate: this.Time(item.date)// 日期
                        }
                    })
                }else if( this.Payment === '分期付款' ){
                    payments = this.table41.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: Number(item.price),// 应收款
                            receivableDate: this.Time(item.date)// 日期
                        }
                    })
                }else if( this.Payment === '组合贷款' ){
                    payments = this.table51.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: Number(item.price),// 应收款
                            receivableDate: this.Time(item.date)// 日期
                        }
                    })
                }
                if( this.Payment === this.row.payMethod ){
                    payments.map(item=>{
                        this.row.payments.map(item2=>{
                            if( item.paymentItemName === item2.paymentItemName ){
                                item.beenDelayDays = item2.beenDelayDays
                            }
                        })
                    })
                }else{
                    outloop://定义跳出标记
                    for( let i = 0, len = payments.length; i < len; i ++ ){
                        for( let j = 0, len2 = this.row.payments.length; j < len2; j ++ ){
                            if( payments[i].paymentItemName.indexOf('房票') === -1 && this.row.payments[j].paymentItemName.indexOf('房票') === -1 ){
                                payments[i].beenDelayDays = this.row.payments[j].beenDelayDays;
                                break outloop;
                            }
                        }
                    }
                }
                if( this.multipleSelection && this.multipleSelection[0] ){
                    this.multipleSelection.map(item=>{
                        item.id = null;
                        item.discountItem = Number(item.discountItem)
                    })
                }
                
                let data = {
                    beautifyTotalPrice: this.beautifyTotalPrice || 0,// 美化金额
                    belongs: null,// 业绩归属
                    customs: null,// 客户信息
                    discountCompMethod: this.priceType,// 折扣计算方式
                    discounts: this.multipleSelection,// 所选中的折扣信息列表
                    batchId: this.row.batchId,// 推盘批次ID
                    makeType: this.row.TransactionType,// 成交类别
                    houseTicketFlag: this.switchFlag3?1:0,// 是否房票
                    houseTicketAmount: this.ticketPrice,// 房票金额
                    payMethod: this.Payment,// 付款方式
                    payments: payments,// 付款信息
                    signDate: this.Time(this.signDate),// 签约日期
                    ticketFlag: this.switchFlag2?1:0,// 是否优惠券
                    tickets: this.BuyStamps,// 优惠券列表
                    underLowestFlag: this.isBroken === '是'?1:0,//是否破底
                    remark: this.remark,// 备注
                    type: 'QY',
                    changeType: 'QYBG',
                    businessId: this.row.id,
                    id: null,
                    projectId: this.row.projectId,
                    houseId: this.row.houseId,
                    commonResources: this.commonResources
                };
                this.postData = data;
            },
            handleSave() {// 保存
                this.handleData();
                saveTrdChange(this.postData).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '保存成功！'
                        })
                        this.$emit('closeChild')
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            handleUp() {// 提交
                this.handleData();
                saveTrdChange(this.postData).then(res=>{
                     ;
                    if( res.status === 200 ){
                        submitTrdChange(this.Qs.stringify({ id: res.data })).then(res=>{
                            if( res.status === 200 ){
                                this.$message({
                                    type: 'success',
                                    message: '提交成功！'
                                })
                                this.$emit('closeChild')
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        },
        created() {
            this.redactFlag = false;// 判断是否经济总，经济总可以选择所以折扣优惠类别
            let uesrInfo =  JSON.parse(sessionStorage.getItem('user-info')).sysRoles;
            for( let i = 0; i < uesrInfo.length; i++ ){
                if( uesrInfo[i].roleCode.indexOf('XMGSXSGLFZR') !== -1 ){
                    this.redactFlag = true;
                }
            }
            this.oldPriceType = this.row.discountCompMethod;
            this.oldDiscountInfo = this.row.discounts;
            this.oldDiscountInfo.map(item=>{
                item.maxDiscountItem = item.discountItem
            })
            this.oldSwitchFlag3 = this.row.houseTicketFlag?true:false;
            this.oldTicketPrice = this.row.houseTicketAmount;
            this.oldBeautifyTotalPrice = this.row.beautifyTotalPrice;
            this.oldTotalDiscount = this.row.discountAmount;
            this.oldPrice = this.row.signPrice;
            this.oldTotalprice = this.row.signTotalAmount;
            this.oldIsBroken = this.row.underLowestFlag?'是':'否';
            this.oldPayment = this.row.payMethod;
            this.oldPayTable = this.row.payments;
            this.oldPayTable.map(item=>{
                item.receivedAmount = item.receivedAmount || 0;
                item.unreceivedAmount = item.unreceivedAmount || item.receivableAmount;
                item.icbcFlag = item.icbcFlag?'是':'否';                
            })


            this.handleInfo();
            
        },
        mounted() {
            
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
</style>