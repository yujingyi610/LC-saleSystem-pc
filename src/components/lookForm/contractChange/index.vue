<template>
    <div>
        <!-- 签约信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">签约信息</span>
            </div>
            <el-form :inline="true">
                <el-form-item label="合同编号">{{code}}</el-form-item>
                <el-form-item label="签约日期">{{signDate}}</el-form-item>
                <el-form-item label="变更方式"><span style="color: #E60012">{{changeType}}</span></el-form-item>
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
                    </el-row>
                </div>
            </el-form>
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
        <div v-show="!redactFlag">
            <!-- 折扣信息 -->
            <el-card class="box-card" v-if="oldTotalprice == totalprice">
                <div slot="header" class="clearfix">
                    <span class="title">折扣信息</span>
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
                <el-form :inline="true">
                    <el-form-item label="是否房票">{{switchFlag3?'是':'否'}}</el-form-item>
                    <el-form-item label="房票金额" v-if="switchFlag3">{{ticketPrice}}</el-form-item>
                </el-form>
                <!-- <div style="overflow: hidden">
                    <span class="title_text">是否有特殊折扣:{{switchFlag2?'是':'否'}}</span>
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
            <!-- 原成交信息 -->
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="title">原成交信息</span>
                </div>
                <!-- 折扣信息 -->
                <el-card class="box-card" v-if="oldTotalprice !== totalprice">
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
                        <el-table-column prop="paymentItemName" label="款项名称" width="180"></el-table-column>
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
                <el-card class="box-card" v-if="oldTotalprice !== totalprice">
                    <div slot="header" class="clearfix">
                        <span class="title">折扣信息</span>
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
                    <el-form :inline="true">
                        <el-form-item label="是否房票">{{switchFlag3?'是':'否'}}</el-form-item>
                        <el-form-item label="房票金额" v-if="switchFlag3">{{ticketPrice}}</el-form-item>
                    </el-form>
                    <!-- <div style="overflow: hidden">
                        <span class="title_text">是否有特殊折扣:{{switchFlag2?'是':'否'}}</span>
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
                        <div style="margin-left: 20px; float: left">
                            <b>付款方式:</b>
                            <span>{{Payment}}</span>
                        </div>
                    </div>
                    <el-table :data="payTable" border style="width: 100%; margin-bottom: 20px">
                        <el-table-column prop="paymentItemName" label="款项名称" width="80"></el-table-column>
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
            
        </div>
        <!-- 判断是否是经纪总 -->
        <div v-show="redactFlag">
            <can-change-cell ref="canChangeCellRef"></can-change-cell>
        </div>
        <!-- 其他信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">其他信息 </span>
            </div>
            <el-form>
                <el-form-item v-if="redactFlag" label="备注">
                    <el-input type="textarea" autosize style="width:300px" v-model="remark"></el-input>
                </el-form-item>
                <el-form-item v-else label="备注">{{remark}}</el-form-item>
            </el-form>
        </el-card>
        <!-- <el-button style="float: right" type="success" v-if="redactFlag" @click="handleSave">保存</el-button> -->

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
        <el-button style="float: right" type="success" @click="handleSaveFile">保存附件信息</el-button>
    </div>
</template>

<script>
import {saveTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
import canChangeCell from '../canChangeCell'
    export default {
        components: {
            canChangeCell
        },
        computed: {
            changeType() {
                if( this.oldTotalprice == this.totalprice ){
                    if( this.Payment == this.oldPayment ){
                        return '付款比例变更'
                    }else{
                        return '付款方式变更'
                    }
                }else{
                    return '金额变更'
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
                switchFlag: 0,// 是否工抵
                company: {// 工抵项目公司
                    name: '',
                    id: '',
                    company: ''
                },
                payCreditAmount: 0,// 工抵金额
                switchFlag3: true,// 是否房票
                ticketPrice: 0,// 房票金额
                priceType: '',// 折扣计价方式
                DiscountInfo: [],// 折扣信息
                /***********购房券**************/
                switchFlag2: false,// 是否有购房券
                BuyStamps: [],// 购房券列表
                beautifyTotalPrice: '',// 美化金额

                accessoryTable: [],// 附件table,
                postData: null,// 发送给后台的数据
                remark: '',// 备注
                totalprice: '',// 签约总价
                price: '',// 签约单价
                totalDiscount: '',// 总折扣
                isBroken: '',// 是否破底
                Payment: '',// 付款方式
                payTable: [],// 付款table
                redactFlag: null,
                data: null,
                
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                loading: false
            }
        },
        methods: {
            show(dataAll, redactFlag) {
                this.redactFlag = redactFlag;
                if( dataAll ){
                    this.data = dataAll.NEW;
                    let data = dataAll.NEW;
                    this.code = data.signCode;// 合同单号
                    this.signDate = data.signDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = dataAll.OLD.customs;// 客户table
                    this.priceType = data.discountCompMethod;// 折扣计价方式
                    // this.DiscountInfo = data.discounts;// 折扣信息
                    this.switchFlag = data.payCreditFlag?true:false;// 是否工抵
                    this.company.company = data.payCreditCompanyName;// 工抵城市
                    this.payCreditAmount = data.payCreditAmount;// 工抵金额
                    this.switchFlag3 = data.houseTicketFlag?true:false;// 是否房票
                    this.ticketPrice = data.houseTicketAmount;// 房票金额
                    this.switchFlag2 = data.ticketFlag;// 是否优惠券
                    this.BuyStamps = data.tickets;// 优惠券列表
                    this.beautifyTotalPrice = data.beautifyTotalPrice;// 美化金额
                    this.price = data.signPrice;// 签约单价
                    this.totalprice = data.signTotalAmount;// 签约总价
                    this.isBroken = data.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = data.discountAmount;// 总折扣
                    
                    // this.newHouseInfo = dataAll.NEW;
                    this.Payment = data.payMethod;// 付款方式
                    this.payTable = data.payments;
                    // this.newUserTable = dataAll.NEW.customs;
                    this.remark = data.remark;// 备注
                    if( !redactFlag ){
                        this.DiscountInfo = data.discounts;// 折扣信息
                    }else{
                        // this.handlePayInfo(data)
                        this.$refs.canChangeCellRef.show(data)
                    }



                    this.oldPriceType = dataAll.OLD.discountCompMethod;
                    this.oldDiscountInfo = dataAll.OLD.discounts;
                    this.oldDiscountInfo.map(item=>{
                        item.maxDiscountItem = item.discountItem
                    })
                    this.oldSwitchFlag3 = dataAll.OLD.houseTicketFlag?true:false;
                    this.oldTicketPrice = dataAll.OLD.houseTicketAmount;
                    this.oldBeautifyTotalPrice = dataAll.OLD.beautifyTotalPrice;
                    this.oldTotalDiscount = dataAll.OLD.discountAmount;
                    this.oldPrice = dataAll.OLD.signPrice;
                    this.oldTotalprice = dataAll.OLD.signTotalAmount;
                    this.oldIsBroken = dataAll.OLD.underLowestFlag?'是':'否';
                    this.oldPayment = dataAll.OLD.payMethod;
                    this.oldPayTable = dataAll.OLD.payments;
                    this.oldPayTable.map(item=>{
                        item.receivedAmount = item.receivedAmount || 0;
                        item.unreceivedAmount = item.unreceivedAmount || item.receivableAmount;
                        item.icbcFlag = item.icbcFlag?'是':'否';                
                    })
                    this.accessoryTable = dataAll.NEW.resourceMaps || [];// 展示附件
                    this.commonResources = dataAll.NEW.commonResources || [];// 传给后台的附件
                    if( this.commonResources ){
                        this.commonResources.map(item=>{
                            item.id = null;
                        })
                    }
                }
            },
            handleData() {// 处理发送给后台的数据
                let childInfo = this.$refs.canChangeCellRef;
                let payments = [];
                if( childInfo.Payment === '一次性付款' ){
                    payments = childInfo.table11.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( childInfo.Payment === '商业贷款' ){
                    payments = childInfo.table21.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( childInfo.Payment === '公积金贷款' ){
                    payments = childInfo.table31.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( childInfo.Payment === '分期付款' ){
                    payments = childInfo.table41.map(item=>{
                        return {
                            icbcFlag: item.icbcFlag?1:0,// 是否工行
                            bankBranchName: item.bank[1],// 支行名称
                            bankName: item.bank[0],// 银行名称
                            paymentItemName: item.name,// 款项名称
                            receivableAmount: isNaN(Number(item.price))?0:Number(item.price),// 应收款
                            receivableDate: item.date// 日期
                        }
                    })
                }else if( childInfo.Payment === '组合贷款' ){
                    payments = childInfo.table51.map(item=>{
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
                
                childInfo.multipleSelection.map(item=>{
                    item.id = null;
                    item.discountItem = Number(item.discountItem)
                })
                let data = {}
                for( let key in this.data ){
                    data[key] = this.data[key]
                }
                data.beautifyTotalPrice = childInfo.beautifyTotalPrice
                data.discounts = childInfo.multipleSelection;
                data.payCreditAmount = childInfo.payCreditAmount;
                data.payCreditFlag = childInfo.switchFlag?1:0;
                data.houseTicketFlag = childInfo.switchFlag3?1:0;
                data.houseTicketAmount = isNaN(Number(childInfo.ticketPrice))?0:Number(childInfo.ticketPrice);
                data.payMethod = childInfo.Payment;
                data.payments = payments;
                data.underLowestFlag = childInfo.ChangeIsBroken === '是'?1:0;
                data.remark = this.remark;

                this.postData = data;
            },
            handleSave() {// 保存
                if( this.switchFlag ){
                    if( !this.payCreditAmount ){
                        this.$message.error('请输入工抵金额！');
                        return
                    }
                }
                
                this.handleData();
                for( let i = 0; i < this.postData.payments.length; i++ ){
                    if( this.postData.payments[i].paymentItemName === '首付款' || this.postData.payments[i].paymentItemName === '一次性付款' || this.postData.payments[i].paymentItemName === '一期款' ){
                        if( new Date(this.postData.signDate).toLocaleString().split(' ')[0] !== new Date(this.postData.payments[i].receivableDate).toLocaleString().split(' ')[0] ){
                            
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
                saveTrdChange(this.postData).then(res=>{
                    
                     
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '保存成功！'
                        })
                        // this.$emit('closeChild');
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
                
            },
            handleUpDateSuccess(response, file, fileList) {// 文件上传
                 
                this.loading = false;
                if( response.status === 200 ){
                    this.$message({
                        type: 'success',
                        message: '上传成功！',
                        showClose: true
                    })
                    response.data.map(item=>{
                        this.commonResources.push({
                            fileUrl: item.fileUrl,
                            resourceId: item.id
                        })
                        item.canDel = true;
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
            handleSaveFile() {// 保存附件的数据处理
                let data = {}
                for( let key in this.data ){
                    data[key] = this.data[key]
                }
                data.commonResources = this.commonResources;
                saveTrdChange(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '保存成功！',
                            showClose: true
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
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