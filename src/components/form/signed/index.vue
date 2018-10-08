<template>
    <div class="add" id="showHouseInfo">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">新增签约</span>
                    <div style="float: right">
                        <el-button @click="handleCancel">取消</el-button>
                        <el-button type="success" @click="handleSave">保存</el-button>
                        <el-button type="success" @click="handleUp">提交</el-button>
                        
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
                                <!-- <el-form-item v-if="houseInfo" label="相关房号">{{houseInfo.refHouseFullNames}}</el-form-item> -->
                                <el-form-item label="签约日期" style="float: right">
                                    <el-date-picker v-model="signDate" type="date" placeholder="选择日期"></el-date-picker>
                                </el-form-item>
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
                            <div style="float: right">
                                <el-button type="text" @click="addUser" icon="el-icon-circle-plus-outline">添加客户</el-button>
                            </div>
                        </div>
                        <el-table :data="userTable" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column label="客户名称">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.customName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="tel" label="手机号码">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.tel" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sex" label="性别">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.sex">
                                        <el-option v-for="(item, index) in sexOpiton" :key="index" :label="item.value" :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件类型">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.certificateName">
                                        <el-option v-for="(item, index) in cardTypeOpiton" :key="index" :label="item.dictName" :value="item.dictName"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="证件号码">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.certificateNo"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="邮寄地址">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.addr"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button @click.stop.prevent="handleDelect(scope.$index)" type="text">清空客户</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                    <!-- 签约信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">签约信息</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="是否工抵">
                                <el-switch v-model="switchFlag" active-color="#13ce66" @change="handleChangeTable"></el-switch>
                            </el-form-item>
                            <!-- <el-form-item label="城市公司" v-if="switchFlag">

                                <el-select v-model="company.city" value-key="id">
                                    <el-option v-for="(item, index) in cityOption" :key="index" :label="item.name" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="项目公司" v-if="switchFlag">
                                <el-select v-model="company.company" value-key="id">
                                    <el-option v-for="(item, index) in companyOption" :key="index" :label="item.orgUnitName" :value="item"></el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="项目公司" v-if="switchFlag">
                                {{company.company}}
                            </el-form-item>
                            <el-form-item label="工抵金额" v-if="switchFlag">
                                <el-input v-model="payCreditAmount" @blur="handlePrice('payCreditAmount')"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true">
                            <el-form-item label="是否房票">
                                <el-switch v-model="switchFlag3" active-color="#13ce66" @change="handleChangeTable"></el-switch>
                            </el-form-item>
                            <el-form-item label="房票金额" v-if="switchFlag3">
                                <el-input v-model="ticketPrice" @blur="handlePrice('ticketPrice')"></el-input>
                            </el-form-item>
                        </el-form>
                        <div style="overflow: hidden">
                            <span class="title_text">折扣信息</span>
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
                            <el-table-column label="姓名">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="手机号码">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.tel"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="优惠券号">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.code"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="使用金额（元）">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="handleDelectStamps(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table> -->
                        <div style="overflow: hidden">
                            <div style="float: left">
                                <span>总价直减:</span>
                                <el-input v-model="beautifyTotalPrice" @change="handleBeautifyPrice"></el-input>  
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
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table11')"></el-date-picker>
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
                                        <el-input v-model="scope.row.price" @change="handleChangeNum2(scope.row, scope.$index, 'true')"></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="应收日期" width="180">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.name.indexOf('房票') !== -1">
                                        <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                    </span>
                                    <span v-else-if="scope.row.name === '首付款'">
                                        <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table21')"></el-date-picker>
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
                                        <el-input v-model="scope.row.price" @change="handleChangeNum3(scope.row, scope.$index, 'true')"></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="应收日期" width="180">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.name.indexOf('房票') !== -1">
                                        <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                    </span>
                                    <span v-else-if="scope.row.name === '首付款'">
                                        <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table31')"></el-date-picker>
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
                                        <el-input v-model="scope.row.price" @change="handleChangeNum5(scope.row, scope.$index, 'true')"></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="应收日期" width="180">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.name.indexOf('房票') !== -1">
                                        <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                                    </span>
                                    <span v-else-if="scope.row.name === '首付款'">
                                        <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table51')"></el-date-picker>
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
                                        <el-input v-model="scope.row.price" @change="handleChangeNum4(scope.row, scope.$index, 'true')"></el-input>
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
                    <!-- 合同网签情况 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">合同网签情况</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="是否网签/备案">
                                <el-switch v-model="isRecord" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item label="未网签原因" v-if="!isRecord">
                                <el-select v-model="why">
                                    <el-option v-for="(item, index) in whyOption" :key="index" :label="item.value" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="其他原因" v-if="why === '其他'">
                                <el-input v-model="whyOther"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-card>
                    <!-- 业绩归属 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">业绩归属</span>
                        </div>
                        <el-form :inline="true">
                            <div>
                                <el-form-item label="成交类别">
                                    <el-select v-model="TransactionType">
                                        <el-option v-for="(item, index) in TransactionTypeOption" :key="index" :label="item.value" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-if="TransactionType === '单独成交'">
                                <el-form-item label="置业顾问">
                                    <el-input v-model="counselorList[0].propertyConsultName" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="顾问手机">
                                    <el-input v-model="counselorList[0].propertyConsultTel" disabled></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="TransactionType === '推荐成交'">
                                <el-form-item label="置业顾问">
                                    <el-input v-model="counselorList[0].propertyConsultName" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="顾问手机">
                                    <el-input v-model="counselorList[0].propertyConsultTel" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="推荐人">
                                    <div @click="handleSearchReferrer(counselorList[0])">
                                        <dialog-input :val="counselorList[0].referrerUserName"></dialog-input>
                                    </div>
                                </el-form-item>
                            </div>
                            <div v-else-if="TransactionType === '共同成交'">
                                <div v-for="(item, index) in counselorList" :key="index">
                                    <el-form-item label="置业顾问">
                                        <el-input v-model="item.propertyConsultName" :disabled="index === 0"></el-input>
                                    </el-form-item>
                                    <el-form-item label="顾问手机">
                                        <el-input v-model="item.propertyConsultTel" :disabled="index === 0"><i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchCounselor(item, index)"></i></el-input>
                                    </el-form-item>
                                    <el-form-item label="占比">
                                        <el-input v-model="item.ratio" type="number"><i slot="suffix" class="el-input__icon icon_text">%</i></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form>
                    </el-card>
                    <!-- 备注 -->
                    <el-card class="box-card">
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
        <!-- 查找推荐人 -->
        <el-dialog title="提示" :visible.sync="searchPeopleFlag" append-to-body width="80%">
            <organization-tree :isRadio=true ref="searchPeopleRef"></organization-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="searchPeopleFlag = false">取 消</el-button>
                <el-button type="primary" @click="handleAddReferrer">确 定</el-button>
            </span>
        </el-dialog>
        <find-custom ref="findCustomRef" @chooseCustom="handleChooseCustom"></find-custom>
    </div>
</template>

<script>
import dialogInput from '@/components/dialogInput'
import OrganizationTree from '@/components/OrganizationTree'
import findCustom from '@/components/findCustom'
import {getHouse, getBank, saveAdd, sendTrdSign, getUserByMobile, getCityList, getProjectCompanyList} from '@/api/pages/mainPage/transactionManagement/contractManagement'
import {getCustomerInfo, getCustomerLabel} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
    export default {
        props: {
            houseId: String,
            batchId: String,
            subscribeId: String
        },
        components: {
            OrganizationTree,
            dialogInput,
            findCustom
        },
        computed: {
            price() {// 签约单价
                if( this.houseInfo ){
                    return (this.totalprice/this.houseInfo.priceArea).toFixed(2) || 0
                }else{
                    return 0
                }
            },
            totalprice() {// 签约总价
                if( this.houseInfo ){
                    let price = 0;
                    if( this.houseInfo.preTotalPrice - this.totalDiscount > 0 ){
                        price = (this.houseInfo.preTotalPrice - this.totalDiscount).toFixed(2)
                    }else{
                        price = 0;
                    }
                    this.table11.map(item=>{
                        if( item.name === '一次性付款' ){
                            item.price = Number(price - (this.switchFlag?this.payCreditAmount:0) - (this.switchFlag3?this.ticketPrice:0)).toFixed(2) || 0;
                        }
                    })
                    
                    return price || 0
                }else{
                    // this.table11[0].price = '';
                    return 0
                }
            },
            totalDiscount() {// 总折扣
                // this.beautifyTotalPrice = Number(this.beautifyTotalPrice).toFixed(2);
                let priceList = [];// 单价优惠的列表
                let totalPricesList = [];// 总价优惠的列表
                let discountList = [];// 比例优惠的列表
                if( this.houseInfo ){
                    let totalDiscountPrice = this.houseInfo.preTotalPrice;
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
                    this.BuyStamps.map(item=>{// 遍历购房券
                        totalDiscountPrice -= item.price;
                    })
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
            'company.city'(e) {
                  
                this.company.company = null;
                this.company.id = null;
                if( e ){
                    this.handleGetProjectCompanyList({ upperOrgUnitCode: e.code });
                }
            },
            'company.company'(e) {
                  
                if( e ){
                    this.company.id = e.id;
                }
            },
            payCreditAmount(e) {
                if( e >= this.totalprice - (this.switchFlag3?this.ticketPrice:0)){
                    e = this.totalprice - (this.switchFlag3?this.ticketPrice:0);
                }
                if( this.switchFlag ){
                    this.table11.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table21.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table31.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table41.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table51.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                }
                this.handleChangeTable()
            },
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
            }
        },
        data() {
            return{
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
                /*********房间信息*********/
                houseInfo: null,
                buildInfo: null,
                batchInfo: null,
                signDate: '',// 签约日期
                /************客户信息*************/
                userTable: [],// table
                cardTypeOpiton: [],
                sexOpiton: [{// 性别
                    value: '男'
                },{
                    value: '女'
                }],
                /************折扣信息**************/
                switchFlag: false,// 是否工抵
                company: {// 工抵项目公司
                    name: '',
                    id: '',
                    city: null,
                    company: null
                },
                payCreditAmount: 0,// 工抵金额
                switchFlag3: false,// 是否房票
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
                /********合同网签情况*************/
                isRecord: true,// 是否网签/备案
                why: '',// 未网签原因
                whyOther: '',// 其他
                whyOption: [// 未网签原因option
                    {value: '政府限网签'},
                    {value: '无购房资格'},
                    {value: '首付款不足'},
                    {value: '其他'}],
                TransactionType: '单独成交',// 成交类别
                TransactionTypeOption: [
                    {value: '单独成交'},
                    {value: '推荐成交'},
                    {value: '共同成交'}
                ],
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
                    ratio: '0',// 占比
                    isMain: 0,//是否主要 
                },{// 置业顾问列表
                    propertyConsultName: '',// 姓名
                    propertyConsultId: '',// id
                    propertyConsultTel: '',// 手机
                    referrerUserName: '',// 推荐人
                    referrerUserId: '',// 推荐人
                    referrerUserCode: '',// 推荐人
                    ratio: '0',// 占比
                    isMain: 0,//是否主要 
                }],
                accessoryTable: [],// 附件table,
                remark: '',// 备注
                postData: null,// 发送给后台的数据
                companyOption: [],// 项目公司下拉数据
                cityOption: [],// 城市公司下拉数据
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
            handleBeautifyPrice() {
                this.beautifyTotalPrice = Number(this.beautifyTotalPrice).toFixed(2);
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
                if( !this.firstGoIn ){
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
                }
                this.firstGoIn = false;
                
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
            handleData() {// 处理发送给后台的数据
            
                let payments = [];
                if( this.Payment === '一次性付款' ){
                    payments = this.table11.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( this.Payment === '商业贷款' ){
                    payments = this.table21.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( this.Payment === '公积金贷款' ){
                    payments = this.table31.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( this.Payment === '分期付款' ){
                    payments = this.table41.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( this.Payment === '组合贷款' ){
                    payments = this.table51.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }
                
                this.multipleSelection.map(item=>{
                    item.id = null;
                    item.discountItem = Number(item.discountItem)
                })
                this.counselorList.map(item=>{
                    item.id = null;
                })
                this.userTable.map(item=>{
                    item.id = null;
                })
                this.userTable[0].nicheId = this.nicheId;
                let data = {
                    beautifyTotalPrice: this.beautifyTotalPrice || 0,// 美化金额
                    belongs: this.counselorList,// 业绩归属
                    customs: this.userTable,// 客户信息
                    discountCompMethod: this.priceType,// 折扣计算方式
                    discounts: this.multipleSelection,// 所选中的折扣信息列表
                    houseId: this.houseId,
                    batchId: this.batchId,// 推盘批次ID
                    id: this.data?this.data.id:null,// 判断是新增还是编辑,this.data是父组件传进来的数据
                    makeType: this.TransactionType,// 成交类别
                    netSignFlag: this.isRecord?1:0,// 是否网签/备案
                    noNetSignReason: this.why,// 未网签原因
                    payCreditAmount: isNaN(Number(this.payCreditAmount))?0:Number(this.payCreditAmount),// 工抵金额
                    // payCreditCityId: this.company.id,// 工抵城市公司
                    payCreditFlag: this.switchFlag?1:0,// 是否工抵
                    houseTicketFlag: this.switchFlag3?1:0,// 是否房票
                    houseTicketAmount: isNaN(Number(this.ticketPrice))?0:Number(this.ticketPrice),// 房票金额
                    payMethod: this.Payment,// 付款方式
                    payments: payments,// 付款信息
                    signDate: this.signDate,// 签约日期
                    ticketFlag: this.switchFlag2?1:0,// 是否优惠券
                    tickets: this.BuyStamps,// 优惠券列表
                    underLowestFlag: this.isBroken === '是'?1:0,//是否破底
                    remark: this.remark,// 备注
                    subscribeId: this.subscribeId,// 认购单id
                };
                if( this.data ){
                    if( this.data.id ){
                        data.id = this.data.id;
                    }else{
                        data.id = null;
                    }
                }else if( this.postData ){
                    if( this.postData.id ){
                        data.id = this.postData.id;
                    }else{
                        data.id = null;
                    }
                    
                }else{
                    data.id = null;
                }
                 
                this.postData = data;
            },
            handleSave() {// 保存
                if( !this.houseInfo ){
                    this.$message.error('请选择房间！');
                    return
                }
                if( !this.signDate ){
                    this.$message.error('请输入签约日期！');
                    return
                }
                if( !this.userTable[0] || !this.userTable[0].customId ){
                    this.$message.error('请输入客户信息！');
                    return
                }
                for( let i = 0; i < this.userTable.length; i++){
                    if( this.userTable[i].customName && this.userTable[i].sex && this.userTable[i].tel && this.userTable[i].certificateName && this.userTable[i].certificateNo ){
                        if ( (this.userTable[i].certificateName === "居民身份证" || this.userTable[i].certificateName === "临时身份证") && !this.idCard(this.userTable[i].certificateNo) ) {
                            this.$message.error("身份证格式错误！");
                            return;
                        }
                        if ( this.isName(this.userTable[i].customName) !== 1 ) {
                            this.$message.error(this.isName(this.userTable[i].customName));
                            return;
                        }
                        if ( this.sexFlag(this.userTable[i].certificateNo, this.userTable[i].certificateName, this.userTable[i].sex) !== 1 ) {
                            this.$message.error(this.sexFlag(this.userTable[i].certificateNo, this.userTable[i].certificateName, this.userTable[i].sex));
                            return;
                        }
                        if ( this.noHanzi(this.userTable[i].certificateNo, this.userTable[i].certificateName) !== 1 ) {
                            this.$message.error(this.noHanzi(this.userTable[i].certificateNo, this.userTable[i].certificateName));
                            return;
                        }
                        if ( this.otherCardNum(this.userTable[i].certificateNo) !== 1 ) {
                            this.$message.error(this.otherCardNum(this.userTable[i].certificateNo));
                            return;
                        }
                    }else{
                        this.$message.error('请输入客户信息！');
                        return
                    }
                    
                }
                if( this.switchFlag ){
                    if( !this.payCreditAmount ){
                        this.$message.error('请输入工抵金额！');
                        return
                    }
                    // if( !this.company.id ){
                    //     this.$message.error('请选择工抵城市公司！');
                    //     return
                    // }
                }
                if( !this.isRecord ){
                    if( !this.why ){
                        this.$message.error('请输入未网签原因！');
                        return
                    }
                    if( this.why === '其他' && !this.whyOther ){
                        this.$message.error('请输入未网签原因！');
                        return
                    }
                }
                
                if( this.TransactionType === '共同成交' ){
                    let count = 0;
                    for( let i = 0; i< this.counselorList.length; i++ ){
                        if( this.counselorList[i].propertyConsultId ){
                            count += Number(this.counselorList[i].ratio);
                        }
                    }
                    if( count !== 100 ){
                        this.$message.error('请输入业务归属信息！');
                        return
                    }
                }else{
                    if( !this.counselorList[0].propertyConsultId ){
                        this.$message.error('请输入业务归属信息！');
                        return
                    }
                }
                
                
                 
                this.handleData();
                for( let i = 0; i < this.postData.payments.length; i++ ){
                    if( this.postData.payments[i].paymentItemName === '首付款' || this.postData.payments[i].paymentItemName === '一次性付款' || this.postData.payments[i].paymentItemName === '一期款' ){
                        console.log(
              new Date(this.postData.signDate).toLocaleString().split(" ")[0]
            );
            console.log(
              new Date(this.postData.payments[i].receivableDate)
                .toLocaleString()
                .split(" ")[0]
            );

             console.log(
              this.postData.signDate
            );
            console.log(
              this.postData.payments[i].receivableDate
            );

             console.log(
              new Date(this.postData.signDate)
            );
            console.log(
              new Date(this.postData.payments[i].receivableDate)
            );
                        if( this.postData.signDate.toLocaleString().split(' ')[0] !== this.postData.payments[i].receivableDate.toLocaleString().split(' ')[0] ){
                            this.$message.error('首付款日期必须和签约日期一致!')
                            // this.signDate = payments[i].receivableDate;
                            return
                        }
                    }
                }
                // for( let i = 0; i < this.postData.payments.length; i++){
                //     for( let key in this.postData.payments[i] ){
                //         if( key !== 'icbcFlag' && key !== 'bankBranchName' && key !== 'bankName' ){
                //             if( !this.postData.payments[i][key] ){
                //                 this.$message.error('请完善付款信息！');
                //                 return
                //             }
                //         }
                //         if( this.postData.payments[i].icbcFlag ){
                //             if( !this.postData.payments[i].bankBranchName ){
                //                 this.$message.error('请完善付款银行信息！');
                //                 return
                //             }
                //         }
                //     }
                // }
                for (let i = 0; i < this.postData.payments.length; i++){
                    this.postData.payments[i].receivableDate = this.Time(this.postData.payments[i].receivableDate)
                }
                this.postData.signDate = this.Time(this.postData.signDate)
                this.canClick = false;
                saveAdd(this.postData).then(res=>{
                    
                     
                    if( res.status === 200 ){
                        this.canClick = true;
                        this.$message({
                            type: 'success',
                            message: '保存成功！'
                        })
                        this.$emit('closeChild');
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                        this.canClick = true;
                    }
                })
                
            },
            handleUp() {// 提交审核
                if( !this.houseInfo ){
                    this.$message.error('请选择房间！');
                    return
                }
                if( !this.signDate ){
                    this.$message.error('请输入签约日期！');
                    return
                }
                if( !this.userTable[0] || !this.userTable[0].customId ){
                    this.$message.error('请输入客户信息！');
                    return
                }
                for( let i = 0; i < this.userTable.length; i++){
                    if( this.userTable[i].customName && this.userTable[i].sex && this.userTable[i].tel && this.userTable[i].certificateName && this.userTable[i].certificateNo ){
                        if ( (this.userTable[i].certificateName === "居民身份证" || this.userTable[i].certificateName === "临时身份证") && !this.idCard(this.userTable[i].certificateNo) ) {
                            this.$message.error("身份证格式错误！");
                            return;
                        }
                        if ( this.isName(this.userTable[i].customName) !== 1 ) {
                            this.$message.error(this.isName(this.userTable[i].customName));
                            return;
                        }
                        if ( this.sexFlag(this.userTable[i].certificateNo, this.userTable[i].certificateName, this.userTable[i].sex) !== 1 ) {
                            this.$message.error(this.sexFlag(this.userTable[i].certificateNo, this.userTable[i].certificateName, this.userTable[i].sex));
                            return;
                        }
                        if ( this.noHanzi(this.userTable[i].certificateNo, this.userTable[i].certificateName) !== 1 ) {
                            this.$message.error(this.noHanzi(this.userTable[i].certificateNo, this.userTable[i].certificateName));
                            return;
                        }
                        if ( this.otherCardNum(this.userTable[i].certificateNo) !== 1 ) {
                            this.$message.error(this.otherCardNum(this.userTable[i].certificateNo));
                            return;
                        }
                    }else{
                        this.$message.error('请输入客户信息！');
                        return
                    }
                    
                }
                if( this.switchFlag ){
                    if( !this.payCreditAmount ){
                        this.$message.error('请输入工抵金额！');
                        return
                    }
                    // if( !this.company.id ){
                    //     this.$message.error('请选择工抵城市公司！');
                    //     return
                    // }
                }
                if( !this.isRecord ){
                    if( !this.why ){
                        this.$message.error('请输入未网签原因！');
                        return
                    }
                    if( this.why === '其他' && !this.whyOther ){
                        this.$message.error('请输入未网签原因！');
                        return
                    }
                }
                if( this.TransactionType === '共同成交' ){
                    let count = 0;
                    for( let i = 0; i< this.counselorList.length; i++ ){
                        if( this.counselorList[i].propertyConsultId ){
                            count += Number(this.counselorList[i].ratio);
                        }
                    }
                    if( count !== 100 ){
                        this.$message.error('请输入业务归属信息！');
                        return
                    }
                }else{
                    if( !this.counselorList[0].propertyConsultId ){
                        this.$message.error('请输入业务归属信息！');
                        return
                    }
                }
                
                this.handleData();
                for( let i = 0; i < this.postData.payments.length; i++ ){
                    if( this.postData.payments[i].paymentItemName === '首付款' || this.postData.payments[i].paymentItemName === '一次性付款' || this.postData.payments[i].paymentItemName === '一期款' ){
                        if( this.postData.signDate.toLocaleString().split(' ')[0] !== this.postData.payments[i].receivableDate.toLocaleString().split(' ')[0] ){
                            this.$message.error('首付款日期必须和签约日期一致!')
                            // this.signDate = payments[i].receivableDate;
                            return
                        }
                    }
                }
                // for( let i = 0; i < this.postData.payments.length; i++){
                //     for( let key in this.postData.payments[i] ){
                //         if( key !== 'icbcFlag' && key !== 'bankBranchName' ){
                //             if( !this.postData.payments[i][key] ){
                //                 this.$message.error('请完善付款信息！');
                //                 return
                //             }
                //         }
                //         if( this.postData.payments[i].icbcFlag ){
                //             if( !this.postData.payments[i].bankBranchName ){
                //                 this.$message.error('请完善付款银行信息！');
                //                 return
                //             }
                //         }
                //     }
                // }
                for (let i = 0; i < this.postData.payments.length; i++){
                    this.postData.payments[i].receivableDate = this.Time(this.postData.payments[i].receivableDate)
                }
                this.postData.signDate = this.Time(this.postData.signDate)
                this.canClick = false;
                saveAdd(this.postData).then(res=>{
                    
                     
                    if( res.status === 200 ){
                        if( !this.postData.id ){
                            this.postData.id = res.data;
                        }
                        
                        let data = this.Qs.stringify({
                            id: res.data
                        })
                        sendTrdSign(data).then(res=>{
                             ;
                            this.canClick = true;
                            if( res.status === 200 ){
                                this.$message({
                                    type: 'success',
                                    message: '提交审核成功！'
                                })
                                this.$emit('closeChild')
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.message
                                })
                                // this.$emit('closeChild')
                                this.canClick = true;
                            }
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                        this.canClick = true;
                        // this.$emit('closeChild');
                    }
                })
            },
            handleCancel() {// 取消
                this.$emit('closeChild')
            },
            handleSearchHouse() {// 查询房间
                this.$refs.searchRef.show();
            },
            handleConfirmHouse() {// 选择完房间后触发，关闭弹框
                // this.houseInfo = houseInfo;
                // this.buildInfo = buildInfo;
                // this.batchInfo = batch;
                // this.userTable = [];
                // this.multipleSelection = [];
                // this.beautifyTotalPrice = 0;
                getHouse({ houseId: this.houseId }).then(res=>{
                    this.DiscountInfo = [];
                    this.$refs.multipleTable.clearSelection();
                    this.multipleSelection = [];
                     
                    if( res.status === 200 ){
                        let data = res.data;
                        this.houseInfo = data.projectHouse;
                        this.handleGetBank()
                        if( data.customs ){// 判断是否有客户
                            data.customs.map(item=>{
                                this.userTable.push({
                                    customName: item.customName,
                                    customId: item.customId,
                                    certificateName: item.certificateName,
                                    certificateType: item.certificateType,
                                    certificateNo: item.certificateNo,
                                    sex: item.sex,
                                    tel: item.tel,
                                    addr: '',
                                    type: 1,
                                })
                            })
                            if( !this.counselorList[0].propertyConsultId ){
                                let params = {
                                    projectId: this.houseInfo.projectId,
                                    mobile: this.userTable[0].tel
                                };
                                getCustomerInfo(params).then(r => {
                                    if( r.status === 200 ){
                                        let res = r.data.list[0]
                                        if (res != null && res != "") {
                                            if (res.isPrincess) {
                                                this.$message({
                                                    type: "error",
                                                    message: "未分配置业顾问，请分配置业顾问！"
                                                });
                                                return;
                                            }
                                            this.counselorList[0].propertyConsultName = res.propertyConsultName;
                                            this.counselorList[0].propertyConsultTel = res.propertyConsultMobile;
                                            this.counselorList[0].propertyConsultId = res.propertyConsultId;
                                            
                                        } else {
                                            this.$message({
                                                type: "error",
                                                message: "未找到用户数据"
                                            });
                                        }
                                    }
                                    
                                });
                            }
                            
                        }
                        if( data.relDtos ){// 新增签约单时判断是否为公开优惠，置业顾问只可以选择公开优惠 
                            if( this.redactFlag ){
                                this.DiscountInfo = data.relDtos;
                            }else{
                                data.relDtos.map(item=>{
                                    if( item.discountType === '公开优惠' ){
                                        this.DiscountInfo.push(item)
                                    }
                                })
                            }
                        }
                        this.DiscountInfo.map(item=>{
                            item.maxDiscountItem = item.discountItem
                        })
                        // this.DiscountInfo = data.relDtos;
                        this.priceType = data.discountCompMethod;
                        this.company.company = data.projectInfo.projectCompanyNames;
                        this.company.id = data.projectInfo.projectCompanyIds;
                        this.DiscountInfo.map(item=>{
                            item.discountItem = Number(item.discountItem)
                        })
                       
                    }
                })
            },  
            handleDelect(index) {// 客户信息table，删除客户操作
                if( this.userTable.length >= 1 ){
                    this.userTable.splice(index, 1);
                }
            },
            addUser() {// 点击新增客户按钮
                if (!this.houseInfo) {
					this.$message({
						type: "error",
						message: "请选择房间！"
					});
					return;
                }
				this.$refs.findCustomRef.show(this.houseInfo.projectId)
            },
            handleChooseCustom(info) {// 得到客户信息，关闭弹框
				if( info ){
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
                        addr: info.addres,// 地址
                        type: 2,
                    })
                    if( !this.counselorList[0].propertyConsultId ){
                        this.counselorList[0].propertyConsultName = info.propertyConsultName;
                        this.counselorList[0].propertyConsultTel = info.propertyConsultMobile;
                        this.counselorList[0].propertyConsultId = info.propertyConsultId;
                    }
                    
				}
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
			handleGetCustomerInfo(row, index) {// 查询用户
				if (!this.houseInfo) {
					this.$message({
						type: "error",
						message: "请选择项目！"
					});
					return;
                }
                let projectId = this.houseInfo.projectId
				let params = {
					projectId,
					mobile: row.tel
				};
				getCustomerInfo(params).then(r => {
                    if( r.status === 200 ){
                        let res = r.data.list[0]
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
                        } else {
                            this.$message({
                                type: "error",
                                message: "未找到用户数据"
                            });
                        }
                    }
				});
			},
            handleSelectionChange(val) {// 选择折扣方式
                this.multipleSelection = val;
            },
            handleChangeIsICBC2(row, index) {// 改变是否工行，更换银行数据(商业贷款)
                 
                this.table21[index].bank = [];
                if( row.icbcFlag ){
                    this.bankOptionUse = this.bankOption1;
                }else{
                    this.bankOptionUse = this.bankOption2;
                }
            },
            handleChangeIsICBC3(row, index) {// 改变是否工行，更换银行数据(公积金贷款)
                 
                this.table31[index].bank = [];
                if( row.icbcFlag ){
                    this.bankOptionUse = this.bankOption1;
                }else{
                    this.bankOptionUse = this.bankOption2;
                }
            },
            handleChangeIsICBC5(row, index) {// 改变是否工行，更换银行数据(组合贷款)
                 
                this.table51[index].bank = [];
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
            handleChangeNum2(row, index, flag) {// 改变一个价格，另一个价格随之改变(商业贷款)
                if( flag ){
                    if( row.name === '首付款' ){
                        this.table21[index+1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }else if( row.name === '按揭款' ){
                        this.table21[index-1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }
                    this.table21[index].price = Number(this.table21[index].price).toFixed(2)
                }
            },
            handleChangeNum3(row, index, flag) {// 改变一个价格，另一个价格随之改变(公积金贷款)
                if( flag ){
                    if( row.name === '首付款' ){
                        this.table31[index+1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }else if( row.name === '公积金' ){
                        this.table31[index-1].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }
                    this.table31[index].price = Number(this.table31[index].price).toFixed(2)
                }
            },
            handleChangeNum4(row, index, flag) {// 改变一个价格，另一个价格随之改变(分期贷款)
                if( flag ){
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
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = Number(this.totalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        }
                    }
                    this.table41[index].price = Number(this.table41[index].price).toFixed(2)
                }
            },
            handleChangeNum5(row, index, flag) {// 改变一个价格，另一个价格随之改变(组合贷款)
                if( flag ){
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
                }
            },
            handleGetBank() {// 获取银行数据
                this.bankOption1 = [];// 工行
                this.bankOption2 = [];// 非工行
                this.bankOptionUse = [];
                this.bankOptionUse2 = [];
                let params = new URLSearchParams();
                params.append('devstagesId', this.houseInfo.devstagesId)
                getBank(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.bankOption = res.data;
                        res.data.map((item, index)=>{
                            // if( item.name === '工商银行' ){
                            //     this.bankOption1 = [res.data[index]];
                            //     res.data.splice(index, 1);
                            //     this.bankOption2 = res.data;
                            // }
                            if( item.name === '工商银行' ){
                                this.bankOption1.push(item)
                            }else{
                                this.bankOption2.push(item)
                            }
                        })
                        this.bankOptionUse = this.bankOption2;
                        this.bankOptionUse2 = this.bankOption2;// 用于组合贷款
                        
                    }
                })
            },
            handleGetCustomerLabel() {// 获取证件类型
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
                            this.cardTypeOpiton.push({
                                dictName: label.itemValue,
                                dictType: label.itemCode
                            })
                        })
                    }
                });
            },
            handlegetCityList() {// 获取城市公司下拉数据
                getCityList().then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.cityOption = res.data;
                    }
                })
            },
            handleGetProjectCompanyList(params) {//  获取项目公司下拉数据
                getProjectCompanyList(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.companyOption = res.data;
                    }
                })
            },
            handleAddStamps() {// 新增购房券
                this.BuyStamps.push({
                    name: '',// 姓名
                    tel: '',// 手机号码
                    code: '',// 优惠券号
                    price: '',// 使用金额（元）
                })
            },
            handleDelectStamps(index) {// 删除购房券
                this.BuyStamps.splice(index, 1)
            },
            handleSearchCounselor(row, index) {// 通过手机号搜索置业顾问
                // alert('通过手机号搜索置业顾问')
                let params = new URLSearchParams();
                params.append('mobile', row.propertyConsultTel)
                getUserByMobile(params).then(res=>{
                     ;
                    if( res.status === 200 && res.data !== null){
                        this.counselorList[index].propertyConsultName = res.data.realName;
                        this.counselorList[index].propertyConsultTel = res.data.mobile;
                        this.counselorList[index].propertyConsultId = res.data.id;
                    }else{
                        this.$message.error('该置业顾问不存在！请确认后搜索!')
                    }
                })
            },
            handleSearchReferrer(row) {// 搜索推荐人
                this.searchPeopleFlag = true;
            },
            handleAddReferrer() {
                this.counselorList[0].referrerUserName =  this.$refs.searchPeopleRef.currentRow.realName;
                this.counselorList[0].referrerUserId =  this.$refs.searchPeopleRef.currentRow.id;
                this.counselorList[0].referrerUserCode =  this.$refs.searchPeopleRef.currentRow.userCode;
                this.searchPeopleFlag = false;
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
        },
        created() {
            this.redactFlag = false;// 判断是否销管负责人，经济总可以选择所以折扣优惠类别
            let uesrInfo =  JSON.parse(sessionStorage.getItem('user-info')).sysRoles;
             
            for( let i = 0; i < uesrInfo.length; i++ ){
                if( uesrInfo[i].roleCode.indexOf('XMGSXSGLFZR') !== -1 ){
                    this.redactFlag = true;
                }
            }
             
            this.handleConfirmHouse()
            // this.handleGetBank();
            this.handleGetCustomerLabel();
            this.handlegetCityList();
            let date = new Date()
            this.signDate = this.signDate || date;
            this.table1.map(item=>{
                item.date = item.date || date;
            })
            this.table2.map(item=>{
                item.date = item.date || date;
            })
            this.table3.map(item=>{
                item.date = item.date || date;
            })
            this.table4.map(item=>{
                item.date = item.date || date;
            })
            this.table5.map(item=>{
                item.date = item.date || date;
            })
            this.table11 = this.table1;
            this.table21 = this.table2;
            this.table31 = this.table3;
            this.table41 = this.table4;
            this.table51 = this.table5;
            this.handleChangeTable()
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