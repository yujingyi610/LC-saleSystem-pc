<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">签约换房审批单发起</span>
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
                    <!-- 原房间信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">原房间信息</span>
                        </div>
                        <el-form :inline="true" :model="houseInfo">
                            <div>
                                <el-form-item label="房间号码">{{houseInfo?houseInfo.houseFullName:''}}</el-form-item>
                                <!-- <el-form-item label="所属项目公司">{{houseInfo?houseInfo.houseFullName:''}}</el-form-item> -->
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
                                </el-row>
                            </div>
                            <div>
                                <el-form-item label="计价方式">{{houseInfo?houseInfo.priceMethod:''}}</el-form-item>
                                <el-form-item label="表单价">{{houseInfo?houseInfo.prePrice:''}}</el-form-item>
                                <el-form-item label="表总价">{{houseInfo?houseInfo.preTotalPrice:''}}</el-form-item>
                                <el-form-item label="底单价">{{houseInfo?houseInfo.preMinPrice:''}}</el-form-item>
                                <el-form-item label="底总价">{{houseInfo?houseInfo.preMinTotalPrice:''}}</el-form-item>
                            </div>
                        </el-form>
                        <!-- 折扣信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">折扣信息</span>
                                <div style="float: right"><span class="title_text">折扣计价方式:<span>{{priceType}}</span></span></div>
                            </div>
                            <el-table :data="DiscountInfo" style="width: 100%">
                                <el-table-column prop="discountName" label="折扣名称"></el-table-column>
                                <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                                <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                                <el-table-column prop="discountItem" label="折扣详情">
                                    <template slot-scope="scope">
                                        {{scope.row.discountItem}}{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-form :inline="true">
                                <el-form-item label="是否房票">
                                    <el-switch v-model="switchFlag3" active-color="#13ce66" @change="handleChangeTable" disabled></el-switch>
                                </el-form-item>
                                <el-form-item label="房票金额" v-if="switchFlag3">{{ticketPrice}}</el-form-item>
                            </el-form>
                            <!-- <div style="overflow: hidden">
                                <span class="title_text">是否有特殊折扣:
                                    <el-switch v-model="switchFlag2" active-color="#13ce66" disabled></el-switch>
                                </span>
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
                                <el-form-item label="付款方式">
                                    <el-select v-model="Payment" disabled>
                                        <el-option v-for="(item, index) in PaymentOption" :key="index" :label="item.value" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-button type="text" style="float: right" @click="OpenMortgageCalculator"><i class="el-icon-nav-jisuanqi" style="float: left; margin-right: 5px"></i>房贷计算器</el-button> -->
                            </el-form>
                            <el-table :data="PayTable" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="paymentItemName" label="款项名称" width="280"></el-table-column>
                                <el-table-column prop="receivableDate" label="应收日期" width="160"></el-table-column>
                                <el-table-column prop="receivableAmount" label="应收金额"></el-table-column>
                                <el-table-column prop="icbcFlag" label="是否工行"></el-table-column>
                                <el-table-column prop="bankBranchName" label="银行"></el-table-column>
                                <el-table-column prop="receivedAmount" label="已收金额"></el-table-column>
                                <el-table-column prop="unreceivedAmount" label="未收金额"></el-table-column>
                            </el-table>
                        </el-card>
                    </el-card>
                    <!-- 新房源信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">新房源信息</span>
                        </div>
                        <el-form :inline="true" :model="newHouseInfo">
                            <div>
                                <el-form-item label="房间号码">
                                    <div @click="handleSearchHouse">
                                        <dialog-input :val="newHouseInfo?newHouseInfo.houseFullName:''"></dialog-input>
                                    </div>
                                </el-form-item>
                                <!-- <el-form-item v-if="newHouseInfo" label="相关房号">{{newHouseInfo?newHouseInfo.refHouseFullNames:''}}</el-form-item> -->
                            </div>
                            <div v-if="newHouseInfo">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="建筑面积:"><span class="units">{{newHouseInfo.floorSpace}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="分摊面积:"><span class="units">{{newHouseInfo.apportionArea}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="地下室面积:"><span class="units">{{newHouseInfo.basementArea}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="赠送面积:"><span class="units">{{newHouseInfo.giftArea}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="套内面积:"><span class="units">{{newHouseInfo.buildingArea}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="花园面积:"><span class="units">{{newHouseInfo.gardenArea}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="天台面积:"><span class="units">{{newHouseInfo.roofArea}}m<sup>2</sup></span></el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <el-form-item label="计价方式">{{newHouseInfo?newHouseInfo.priceMethod:''}}</el-form-item>
                                <el-form-item label="表单价">{{newHouseInfo?newHouseInfo.prePrice:''}}</el-form-item>
                                <el-form-item label="表总价">{{newHouseInfo?newHouseInfo.preTotalPrice:''}}</el-form-item>
                                <!-- <el-form-item label="底单价">{{newHouseInfo?newHouseInfo.preMinPrice:''}}</el-form-item>
                                <el-form-item label="底总价">{{newHouseInfo?newHouseInfo.preMinTotalPrice:''}}</el-form-item> -->
                            </div>
                        </el-form>
                        <div style="overflow: hidden">
                            <span class="title_text">折扣信息</span>
                            <div style="float: right"><span class="title_text">折扣计价方式:<span>{{newPriceType}}</span></span></div>
                        </div>
                        <el-table ref="multipleTable" :data="newDiscountInfo" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" row-key="discountId">
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
                                <el-switch v-model="newSwitchFlag3" active-color="#13ce66" @change="handleChangeTable"></el-switch>
                            </el-form-item>
                            <el-form-item label="房票金额" v-if="newSwitchFlag3">
                                <el-input v-model="newTicketPrice"></el-input>
                            </el-form-item>
                        </el-form>
                        <!-- <div style="overflow: hidden">
                            <span class="title_text">是否有特殊折扣:
                                <el-switch v-model="newSwitchFlag2" active-color="#13ce66"></el-switch>
                            </span>
                            <div style="float: right; line-height: 40px;" v-if="newSwitchFlag2">
                                <el-button type="success" @click="handleAddStamps">新增特殊折扣</el-button>
                            </div>
                        </div>
                        <el-table :data="newBuyStamps" style="width: 100%" v-if="newSwitchFlag2">
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
                                <el-input v-model="newBeautifyTotalPrice"></el-input>  
                            </div>
                            <div style="float: right; line-height: 40px">
                                <span class="title_text">总折扣:{{newTotalDiscount}}元</span>
                            </div>
                        </div>
                        <div style="overflow: hidden">
                            <span class="form_bottom">签约单价:<span>{{newPrice}}元</span></span>
                            <span class="form_bottom">签约总价:<span>{{newTotalprice}}元</span></span>
                            <span class="form_bottom">合同金额大写:<span>{{newTotalprice | PriceInWords}}</span></span>
                            <span class="form_bottom">是否破底:<span>{{newIsBroken}}</span></span>
                        </div>
                        <!-- 付款信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">付款信息</span>
                            </div>
                            <el-form :inline="true">
                                <el-form-item label="付款方式">
                                    <el-select v-model="newPayment" @change="handleInitBank">
                                        <el-option v-for="(item, index) in PaymentOption" :key="index" :label="item.value" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-button type="text" style="float: right" @click="OpenMortgageCalculator"><i class="el-icon-nav-jisuanqi" style="float: left; margin-right: 5px"></i>房贷计算器</el-button> -->
                            </el-form>
                            <!-- 一次性付款 -->
                            <div v-if="newPayment === '一次性付款'">
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
                            <el-table v-else-if="newPayment === '商业贷款'" :data="table21" border style="width: 100%; margin-bottom: 20px">
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
                                        <span v-else-if="scope.row.name === '首付款'">--</span>
                                        <span v-else>
                                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC2(scope.row, scope.$index)"></el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="bank" label="银行/单位">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款'">--</span>
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
                            <el-table v-else-if="newPayment === '公积金贷款'" :data="table31" border style="width: 100%; margin-bottom: 20px">
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
                                        <span v-else-if="scope.row.name === '首付款'">--</span>
                                        <span v-else>
                                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC3(scope.row, scope.$index)"></el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="bank" label="银行/单位">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款'">--</span>
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
                            <el-table v-else-if="newPayment === '组合贷款'" :data="table51" border style="width: 100%; margin-bottom: 20px">
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
                                        <span v-else-if="scope.row.name === '首付款'">--</span>
                                        <span v-else>
                                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC5(scope.row, scope.$index)"></el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="bank" label="银行/单位">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                                        <span v-else-if="scope.row.name === '首付款'">--</span>
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
                            <el-table v-else-if="newPayment === '分期付款'" :data="table41" border style="width: 100%; margin-bottom: 20px">
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
                                        <span v-else-if="scope.row.name === '一期款'">
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table41')"></el-date-picker>
                                        </span>
                                        <span v-else>
                                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
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
        <search-house ref="searchRef" @confirmHouse="handleConfirmHouse"></search-house>
        <search-ticket ref="searchTicketRef" @addTicket="handleAddTicket"></search-ticket>
    </div>
</template>

<script>
import searchTicket from '@/components/searchTicket'// 查找优惠券
import dialogInput from '@/components/dialogLongInput'
import searchHouse from './searchHouse'
import {saveTrdChange, submitTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
import {getHouse, getBank, saveAdd, sendTrdSign, getUserByMobile, getCityList, getProjectCompanyList} from '@/api/pages/mainPage/transactionManagement/contractManagement'
import {getCustomerInfo, getCustomerLabel} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
    export default {
        props: {
            row: Object
        },
        components: {
            dialogInput,
            searchHouse,
            searchTicket
        },
        computed: {
            newPrice() {// 签约单价
                if( this.newHouseInfo ){
                    console.log(this.newHouseInfo.priceArea)
                    console.log(this.newTotalprice)
                    return (this.newTotalprice/this.newHouseInfo.priceArea).toFixed(2) || 0
                }else{
                    return '0'
                }
            },
            newTotalprice() {// 签约总价
                if( this.newHouseInfo ){
                    let price = 0;
                    if( this.newHouseInfo.preTotalPrice - this.newTotalDiscount > 0 ){
                        price = (this.newHouseInfo.preTotalPrice - this.newTotalDiscount).toFixed(2)
                    }else{
                        price = 0;
                    }
                    this.table11.map(item=>{
                        if( item.name === '一次性付款' ){
                            item.price = price - this.payCreditAmount - this.newTicketPrice || '';
                        }
                    })
                    
                    return price || 0
                }else{
                    // this.table11[0].price = '';
                    return '0'
                }
            },
            newTotalDiscount() {// 总折扣
                let priceList = [];// 单价优惠的列表
                let totalPricesList = [];// 总价优惠的列表
                let discountList = [];// 比例优惠的列表
                if( this.newHouseInfo ){
                    let totalDiscountPrice = this.newHouseInfo.preTotalPrice;
                    this.multipleSelection.map(item=>{// 遍历已选中的折扣方式，将三种折扣方式分别存储
                        if( item.discountMethod === '比例优惠' ){ discountList.push(item) }
                        else if( item.discountMethod === '单价优惠' ){ priceList.push(item) }
                        else if( item.discountMethod === '总价优惠' ){ totalPricesList.push(item) }
                    })
                    if( this.newPriceType === '先单价后总价再折扣' ){
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.newHouseInfo.priceArea; })// 单价
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                    }else if( this.newPriceType === '先单价后折扣再总价' ){
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.newHouseInfo.priceArea; })// 单价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                    }else if( this.newPriceType === '先总价后折扣再单价' ){
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.newHouseInfo.priceArea; })// 单价
                    }else if( this.newPriceType === '先总价后单价再折扣' ){
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.newHouseInfo.priceArea; })// 单价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                    }else if( this.newPriceType === '先折扣后单价再总价' ){
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.newHouseInfo.priceArea; })// 单价
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                    }else if( this.newPriceType === '先折扣后总价再单价' ){
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.newHouseInfo.priceArea; })// 单价
                    }
                    this.BuyStamps.map(item=>{// 遍历购房券
                        totalDiscountPrice -= item.price;
                    })
                    totalDiscountPrice -= this.newBeautifyTotalPrice;
                    return this.newHouseInfo.preTotalPrice - totalDiscountPrice;
                }else{
                    return 0
                }
                
            },
            newIsBroken() {// 是否破底
                if( this.newHouseInfo ){
                    if( this.newTotalprice < this.newHouseInfo.preMinTotalPrice ){
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
            newTicketPrice(e) {
                 
                if( e >= this.newTotalprice){
                    e = this.newTotalprice;
                }
                if( this.newSwitchFlag3 ){
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
            }
        },
        data() {
            return{
                redactFlag: false,
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                id: null,
                batchId: null,
                makeType: null,
                businessId: null,
                code: '',// 合同编号
                signDate: '',// 签约日期
                /*********房间信息*********/
                houseInfo: null,
                newHouseInfo: null,// 新房源信息
                /************客户信息*************/
                userTable: [],// table
                newUserTable: [],// 新
                cardTypeOpiton: [],
                sexOpiton: [{// 性别
                    value: '男'
                },{
                    value: '女'
                }],
                /************付款信息****************/
                Payment: '',
                newPayment: '',
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
                PayTable: [],
                table11: [],
                table21: [],
                table31: [],
                table41: [],
                table51: [],
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
                /************折扣信息**************/
                switchFlag: false,// 是否工抵
                newSwitchFlag: false,// 是否工抵
                payCreditAmount: 0,// 工抵金额
                switchFlag3: true,// 是否房票
                newSwitchFlag3: true,// 是否房票
                ticketPrice: 0,// 房票金额
                newTicketPrice: 0,// 房票金额
                priceType: '',// 折扣计价方式
                newPriceType: '',// 折扣计价方式
                DiscountInfo: [],// 折扣信息
                newDiscountInfo: [],// 新折扣信息
                multipleSelection: [],
                /***********购房券**************/
                switchFlag2: false,// 是否有购房券
                newSwitchFlag2: false,// 是否有购房券
                BuyStamps: [],// 购房券列表
                newBuyStamps: [],// 新购房券列表
                beautifyTotalPrice: '',// 美化金额
                newBeautifyTotalPrice: '',// 新美化金额

                accessoryTable: [],// 附件table,
                postData: null,// 发送给后台的数据
                remark: '',// 备注
                totalprice: '',// 签约总价
                // newTotalprice: '',// 新签约总价
                price: '',// 签约单价
                // newPrice: '',// 新签约单价
                totalDiscount: '',// 总折扣
                // newTotalDiscount: '',// 新总折扣
                isBroken: '否',
                postData: null,// 发送给后台的数据
                loading: false
            }
        },
        methods: {
            handleInitBank() {// 切换付款方式，重置银行下拉数据
                if( this.newPayment === '商业贷款' ){
                    this.table21.map(item=>{
                        if( item.name === '按揭款' && item.icbcFlag ){
                            this.bankOptionUse = this.bankOption1;
                        }else if( item.name === '按揭款' && !item.icbcFlag ){
                            this.bankOptionUse = this.bankOption2;
                        }
                    })
                }else if( this.newPayment === '公积金贷款' ){
                    this.table31.map(item=>{
                        if( item.name === '公积金' && item.icbcFlag ){
                            this.bankOptionUse = this.bankOption1;
                        }else if( item.name === '公积金' && !item.icbcFlag ){
                            this.bankOptionUse = this.bankOption2;
                        }
                    })
                }else if( this.newPayment === '组合贷款' ){
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
                if( this.newDiscountInfo[index].discountMethod === '比例优惠' ){
                    if( Number(row.discountItem) < Number(row.maxDiscountItem) ){
                        this.newDiscountInfo[index].discountItem = Number(row.maxDiscountItem)
                    }
                    this.DiscountInfo[index].discountItem = Math.floor(this.DiscountInfo[index].discountItem);
                    if( Number(row.discountItem) > 100 ){
                        this.newDiscountInfo[index].discountItem = 100;
                    }
                }else{
                    if( Number(row.discountItem) > Number(row.maxDiscountItem) ){
                        this.newDiscountInfo[index].discountItem = Number(row.maxDiscountItem)
                    }
                    
                    if( Number(row.discountItem) <= 0 ){
                        this.newDiscountInfo[index].discountItem = 0;
                    }
                    this.DiscountInfo[index].discountItem = this.DiscountInfo[index].discountItem.toFixed(2);
                }
            },
            handleChangeTable() {// 工抵、房票改变，付款table展示改变
                this.newTicketPrice = this.newSwitchFlag3?this.newTicketPrice:0;
                this.table11.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.newTicketPrice;
                    }
                })
                this.table21.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.newTicketPrice;
                    }
                })
                this.table31.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.newTicketPrice;
                    }
                })
                this.table51.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.newTicketPrice;
                    }
                })

                this.table11 = [];
                this.table21 = [];
                this.table31 = [];
                this.table41 = [];
                this.table51 = [];
                if( this.newSwitchFlag && this.newSwitchFlag3 ){
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
                }else if( !this.newSwitchFlag && this.newSwitchFlag3 ){
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
                }else if( this.newSwitchFlag && !this.newSwitchFlag3 ){
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
                console.log(this.table11)
                if( this.newPayment === '一次性付款' ){
                    this.table11[this.table11.length - 1].price = Number(this.newTotalprice) - Number(this.newTicketPrice);
                }else if( this.newPayment === '商业贷款' ){
                    this.handleChangeNum2(this.table21[this.table21.length - 1], this.table21.length - 1)
                }else if( this.newPayment === '公积金贷款' ){
                    this.handleChangeNum3(this.table31[this.table31.length - 1], this.table31.length - 1)
                }else if( this.newPayment === '分期付款' ){
                    this.handleChangeNum4(this.table41[this.table41.length - 1], this.table41.length - 1)
                }else if( this.newPayment === '组合贷款' ){
                    this.handleChangeNum5(this.table51[this.table51.length - 1], this.table51.length - 1)
                }
                
            }, 
            handleCancel() {// 取消
                this.$emit('closeChild')
            },
            handleSearchHouse() {// 查询房间
                this.$refs.searchRef.show();
            },
            handleConfirmHouse({houseInfo, buildInfo, batch}) {// 选择完房间后触发，关闭弹框
                 
                this.newHouseInfo = null;
                this.buildInfo = null;
                this.batchInfo = null;
                this.newDiscountInfo = [];
                this.$refs.multipleTable.clearSelection();
                this.newPriceType = '';
                this.bankOption1 = [];// 工行
                this.bankOption2 = [];// 非工行
                this.bankOptionUse = [];
                this.bankOptionUse2 = [];
                this.newPayment = '一次性付款'
                getHouse({ houseId: houseInfo.id }).then(res=>{
                     
                    if( res.status === 200 ){
                        let data = res.data;
                        console.log(this.houseInfo.projectCompanyName)
                        console.log(data.projectInfo.projectCompanyNames)
                        if( data.projectInfo.projectCompanyNames.indexOf(this.houseInfo.projectCompanyName) !== -1 ){
                            this.newHouseInfo = houseInfo;
                            this.handleGetBank()
                            this.newHouseInfo.houseId = houseInfo.id;
                            this.buildInfo = buildInfo;
                            this.batchInfo = batch;
                            this.newDiscountInfo = [];
                            this.$refs.multipleTable.clearSelection();
                            this.newPriceType = '';

                            if( res.data.relDtos ){// 新增签约单时判断是否为公开优惠，置业顾问只可以选择公开优惠
                                if( this.redactFlag ){
                                    this.newDiscountInfo = res.data.relDtos;
                                }else{
                                    res.data.relDtos.map(item=>{
                                        if( item.discountType === '公开优惠' ){
                                            this.newDiscountInfo.push(item)
                                        }
                                    })
                                }
                            }
                            this.newDiscountInfo.map(item=>{
                                item.maxDiscountItem = item.discountItem
                            })
                            console.log(this.DiscountInfo)
                            this.newPriceType = data.discountCompMethod;

                        }else{
                            this.$message.error('只能换本项目公司下的项目的房间！');
                            return
                        }
                        
                    }
                })
            },  
            
            handleChangeTicketNum(tableName) {// 改变首付款时间，房票时间动态改变
                let date = null;
                if( tableName === 'table41' ){
                    this[tableName].map(item=>{
                        if( item.name === '一期款' ){
                            date = item.date; 
                        }
                    })
                    this[tableName].map(item=>{
                        if( item.name === '一期款房票' ){
                            item.date = date; 
                        }
                    })
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
            handleChangeNum2(row, index, flag) {// 改变一个价格，另一个价格随之改变(商业贷款)
                if( flag ){
                    console.log('handleChangeNum2')
                    if( row.name === '首付款' ){
                        this.table21[index+1].price = this.newTotalprice - this.newTicketPrice - row.price;
                    }else if( row.name === '按揭款' ){
                        this.table21[index-1].price = this.newTotalprice - this.newTicketPrice - row.price;
                    }
                }
                
            },
            handleChangeNum3(row, index, flag) {// 改变一个价格，另一个价格随之改变(公积金贷款)
                if( flag ){
                    if( row.name === '首付款' ){
                        this.table31[index+1].price = this.newTotalprice - this.newTicketPrice - row.price;
                    }else if( row.name === '公积金' ){
                        this.table31[index-1].price = this.newTotalprice - this.newTicketPrice - row.price;
                    }
                }
            },
            handleChangeNum4(row, index, flag) {// 改变一个价格，另一个价格随之改变(分期贷款)
                if( flag ){
                    let a = this.newSwitchFlag3?2:1;
                    if( row.name === '一期款' ){
                        this.table41[index+a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index+4*a].price;
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = this.newTotalprice - this.newTicketPrice - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index+4*a].price;
                        }
                    }else if( row.name === '二期款' ){
                        this.table41[index+a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index-a].price;
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = this.newTotalprice - this.newTicketPrice - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index-a].price;
                        }
                    }
                    else if( row.name === '三期款' ){
                        this.table41[index+a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price;
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = this.newTotalprice - this.newTicketPrice - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price;
                        }
                    }
                    else if( row.name === '四期款' ){
                        this.table41[index+a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price;
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = this.newTotalprice - this.newTicketPrice - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price;
                        }
                    }
                    else if( row.name === '五期款' ){
                        this.table41[index-4*a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price;
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = this.newTotalprice - this.newTicketPrice - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price;
                        }
                    }
                }
            },
            handleChangeNum5(row, index, flag) {// 改变一个价格，另一个价格随之改变(组合贷款)
                if( flag ){
                    let a = 1;
                    if( row.name === '首付款' ){
                        this.table51[index+a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table51[index+2*a].price;
                        if( this.table51[index+a].price < 0 ){
                            this.table51[index+a].price = 0;
                            this.table51[index].price = this.newTotalprice - this.newTicketPrice - this.table51[index+2*a].price;
                        }
                    }else if( row.name === '按揭款' ){
                        this.table51[index+a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table51[index-a].price;
                        if( this.table51[index+a].price < 0 ){
                            this.table51[index+a].price = 0;
                            this.table51[index].price = this.newTotalprice - this.newTicketPrice - this.table51[index-a].price;
                        }
                    }
                    else if( row.name === '公积金' ){
                        this.table51[index-2*a].price = this.newTotalprice - this.newTicketPrice - row.price - this.table51[index-a].price;
                        if( this.table51[index-2*a].price < 0 ){
                            this.table51[index-2*a].price = 0;
                            this.table51[index].price = this.newTotalprice - this.newTicketPrice - this.table51[index-a].price;
                        }
                    }
                }
            },
            handleGetBank() {// 获取银行数据
                let params = new URLSearchParams();
                params.append('devstagesId', this.newHouseInfo.devstagesId)
                getBank(params).then(res=>{
                     ;
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
                        this.handleInfo();
                    }
                })
            },
            handleAddStamps() {// 新增购房券
                this.$refs.searchTicketRef.show();
            },
            handleAddTicket(item) {// 将购房券添加进来
                 
                if( item ){
                    this.newBuyStamps.push(item)
                }
            },
            handleDelectStamps(index) {// 删除购房券
                this.newBuyStamps.splice(index, 1)
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
                if( this.newPayment === '一次性付款' ){
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
                }else if( this.newPayment === '商业贷款' ){
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
                }else if( this.newPayment === '公积金贷款' ){
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
                }else if( this.newPayment === '分期付款' ){
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
                }else if( this.newPayment === '组合贷款' ){
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
                console.log(payments)
                if( this.multipleSelection ){
                    this.multipleSelection.map(item=>{
                        item.id = null;
                        item.discountItem = Number(item.discountItem)
                    })
                }
                
                if( this.commonResources ){
                        this.commonResources.map(item=>{
                            item.id = null;
                        })
                    }
                let data = {
                    beautifyTotalPrice: this.newBeautifyTotalPrice || 0,// 美化金额
                    belongs: null,// 业绩归属
                    customs: null,// 客户信息
                    discountCompMethod: this.newPriceType,// 折扣计算方式
                    discounts: this.multipleSelection,// 所选中的折扣信息列表
                    batchId: this.batchId,// 推盘批次ID
                    makeType: this.makeType,// 成交类别
                    houseTicketFlag: this.newSwitchFlag3?1:0,// 是否房票
                    houseTicketAmount: this.newTicketPrice,// 房票金额
                    payMethod: this.newPayment,// 付款方式
                    payments: payments,// 付款信息
                    signDate: this.Time(this.signDate),// 签约日期
                    ticketFlag: this.newSwitchFlag2?1:0,// 是否优惠券
                    tickets: this.newBuyStamps,// 优惠券列表
                    underLowestFlag: this.newIsBroken === '是'?1:0,//是否破底
                    remark: this.remark,// 备注
                    type: 'QY',
                    changeType: 'QYHF',
                    businessId: this.businessId,
                    id: this.id,
                    houseId: this.newHouseInfo.houseId,
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
                            message: '保存成功！',
                            showClose: true
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
                                    message: '提交成功！',
                                    showClose: true
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
            },
            show(dataAll) {
                if( dataAll ){
                    this.newDiscountInfo = [];
                    this.$refs.multipleTable.clearSelection();
                    this.multipleSelection = [];
                    // this.handleGetCustomerLabel();
                    console.log(dataAll);
                    let data = dataAll.OLD;
                    this.code = data.signCode;// 合同单号
                    this.signDate = data.signDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = data.customs;// 客户table
                    this.priceType = data.discountCompMethod;// 折扣计价方式
                    this.DiscountInfo = data.discounts;// 折扣信息
                    this.DiscountInfo.map(item=>{
                        item.maxDiscountItem = item.discountItem
                    })
                    this.switchFlag = data.payCreditFlag?true:false;// 是否工抵
                    // this.company.company = data.payCreditCompanyName;// 工抵城市
                    this.payCreditAmount = data.payCreditAmount;// 工抵金额
                    this.switchFlag2 = data.ticketFlag;// 是否优惠券
                    this.BuyStamps = data.tickets;// 优惠券列表
                    this.beautifyTotalPrice = data.beautifyTotalPrice;// 美化金额
                    this.price = data.signPrice;// 签约单价
                    this.totalprice = data.signTotalAmount;// 签约总价
                    this.isBroken = data.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = data.discountAmount;// 总折扣
                    

                    this.remark = dataAll.NEW.remark;// 备注

                    this.newPriceType = dataAll.NEW.discountCompMethod;// 折扣计价方式
                    // this.newDiscountInfo = dataAll.NEW.discounts;// 折扣信息

                    this.switchFlag3 = data.houseTicketFlag?true:false;// 是否房票
                    this.newSwitchFlag3 = dataAll.NEW.houseTicketFlag?true:false;// 是否房票
                    this.ticketPrice = data.houseTicketAmount;// 房票金额
                    this.newTicketPrice = dataAll.NEW.houseTicketAmount;// 房票金额

                    this.newSwitchFlag2 = dataAll.NEW.ticketFlag?true:false;// 是否优惠券
                    this.newBuyStamps = dataAll.NEW.tickets;// 优惠券列表
                    this.newBeautifyTotalPrice = dataAll.NEW.beautifyTotalPrice;// 美化金额
                    // this.newPrice = dataAll.NEW.signPrice;// 签约单价
                    // this.newTotalprice = dataAll.NEW.signTotalAmount;// 签约总价
                    // this.newIsBroken = dataAll.NEW.underLowestFlag?'是':'否';// 是否破底
                    // this.newTotalDiscount = dataAll.NEW.discountAmount;// 总折扣

                    this.accessoryTable = dataAll.NEW.resourceMaps || [];// 展示附件
                    this.commonResources = dataAll.NEW.commonResources || [];// 传给后台的附件
                    if( this.commonResources ){
                        this.commonResources.map(item=>{
                            item.id = null;
                        })
                    }
                    
                    this.newHouseInfo = dataAll.NEW;
                    this.handleGetBank();
                    this.Payment = data.payMethod;// 付款方式
                    this.newPayment = dataAll.NEW.payMethod;// 付款方式

                    this.id = dataAll.NEW.id;
                    this.batchId = dataAll.NEW.batchId;
                    this.businessId = dataAll.NEW.businessId;
                    this.makeType = dataAll.NEW.makeType;

                    this.PayTable = data.payments;
                    this.newPayTable = dataAll.NEW.payments;
                    let newTable = dataAll.NEW.payments.map(item=>{
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
                    console.log(newTable)
                    if( dataAll.NEW.payMethod === '商业贷款' ){
                        console.log('走了' + dataAll.NEW.payMethod )
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
                        console.log(this.table2)
                    }else if( dataAll.NEW.payMethod === '一次性付款' ){
                        console.log('走了' + dataAll.NEW.payMethod )
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
                        console.log(this.table1)
                    }else if( dataAll.NEW.payMethod === '公积金贷款' ){
                        console.log('走了' + dataAll.NEW.payMethod )
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
                    }else if( dataAll.NEW.payMethod === '分期付款' ){
                        console.log('走了' + dataAll.NEW.payMethod )
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
                    }else if( dataAll.NEW.payMethod === '组合贷款' ){
                        console.log('走了' + dataAll.NEW.payMethod )
                        this.table5.map(item=>{
                            newTable.map(item2=>{
                                if( item2.name === '公积金' && item2.icbcFlag ){
                                    this.bankOptionUse2 = this.bankOption1;
                                    console.log(this.bankOptionUse2)
                                }else if( item2.name === '按揭款' && item2.icbcFlag ){
                                    this.bankOptionUse = this.bankOption1;
                                    console.log(this.bankOptionUse)
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
                    console.log(this.table1)
                    this.handleChangeTable()

                    getHouse({ houseId: dataAll.NEW.houseId }).then(res=>{
                        this.newDiscountInfo = [];
                        this.$refs.multipleTable.clearSelection();
                        this.multipleSelection = [];
                        if( res.status === 200 ){
                            if( this.redactFlag ){
                                this.newDiscountInfo = res.data.relDtos;
                            }else{  
                                if( res.data.relDtos ){// 编辑签约单时判断是否为公开优惠，置业顾问只可以选择公开优惠与经济总所选中的非公开优惠
                                    res.data.relDtos.map(item=>{
                                        if( item.discountType === '公开优惠' ){
                                            this.newDiscountInfo.push(item)
                                        }
                                    })
                                }
                                dataAll.NEW.discounts.map(item=>{
                                    if( item.discountType === '非公开优惠' ){
                                        this.newDiscountInfo.push(item)
                                    }
                                })
                            }
                            this.newDiscountInfo.map(item=>{
                                item.maxDiscountItem = item.discountItem
                            })
                            dataAll.NEW.discounts.map(item1=>{
                                this.newDiscountInfo.map(item2=>{
                                    if(item2.discountId === item1.discountId){
                                        item2.discountItem = item1.discountItem
                                    }
                                })
                            })
                            // this.newDiscountInfo = res.data.relDtos;
                            if( !this.newDiscountInfo ){
                                return
                            }
                            dataAll.NEW.discounts.map(i=>{
                                this.$refs.multipleTable.toggleRowSelection(this.newDiscountInfo.find(d=>d.discountId === i.discountId),true);
                            })
                        }
                    })


                    
                }
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