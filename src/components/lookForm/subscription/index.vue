<template>
    <div>
        <div>
            <el-form :inline="true">
                <el-form-item label="认购单号">{{houseInfo?houseInfo.subscribeCode:''}}</el-form-item>
                <el-form-item label="认购日期">{{houseInfo?houseInfo.subscribeDate:''}}</el-form-item>
            </el-form>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">房间信息</span>
            </div>
            <div class="text item">
                <el-form :inline="true" :model="houseInfo">
                    <div>
                        <el-form-item label="房间号码:">{{houseInfo?houseInfo.houseDesc:''}}</el-form-item>
                    </div>
                    <div v-if="houseInfo">
                        <el-form-item label="建筑面积:">
                            <span class="units">{{houseInfo.floorSpace}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="分摊面积:">
                            <span class="units">{{houseInfo.apportionArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="地下室面积:">
                            <span class="units">{{houseInfo.basementArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="赠送面积:">
                            <span class="units">{{houseInfo.giftArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="计价方式:">
                            <span class="units">{{houseInfo.priceMethod}}</span>
                        </el-form-item>
                        <el-form-item label="套内面积:">
                            <span class="units">{{houseInfo.buildingArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="花园面积:">
                            <span class="units">{{houseInfo.gardenArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="天台面积:">
                            <span class="units">{{houseInfo.roofArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="计价面积:">
                            <span class="units">{{houseInfo.priceArea}}m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="预售表单价:">
                            <span class="units">{{houseInfo.prePrice}}元/m
                                <sup>2</sup>
                            </span>
                        </el-form-item>
                        <el-form-item label="预售表总价:">
                            <span class="units">{{houseInfo.preTotalPrice}}元</span>
                        </el-form-item>
                        <!-- <el-form-item label="预售底单价:"><span class="units">{{houseInfo.preMinPrice}}元/m<sup>2</sup></span></el-form-item>
                        <el-form-item label="预售底总价:"><span class="units">{{houseInfo.preMinTotalPrice}}元</span></el-form-item>	 -->
                    </div>
                </el-form>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">客户信息</span>
            </div>
            <el-table :data="userTable" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="customName" label="客户名称"></el-table-column>
                <el-table-column prop="tel" label="手机号码"></el-table-column>
                <el-table-column prop="certificateName" label="证件类型"></el-table-column>
                <el-table-column prop="certificateNo" label="证件号码"></el-table-column>
            </el-table>
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
                        <el-form-item label="认筹单号:">{{IdentificationInfo.code}}</el-form-item>
                        <el-form-item label="认筹金额:">{{IdentificationInfo.price}}元</el-form-item>
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
                    <el-table-column prop="paymentTypeName" label="房款类型"></el-table-column>
                    <el-table-column prop="receivableAmount" label="应收金额（元）"></el-table-column>
                    <el-table-column prop="date" label="应收日期">
                        <template slot-scope="scope">
                            {{houseInfo?houseInfo.subscribeDate:''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="receivedAmount" label="已收金额（元）"></el-table-column>
                    <el-table-column prop="unreceivedAmount" label="未收金额（元）"></el-table-column>
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
    </div>
</template>

<script>
    export default {
        props: {
            data: Object
        },
        data() {
            return{
                houseInfo: null, // 房间信息
                house: null, // 房间全部信息
                userTable: [], // 客户信息
                cardTypeOpiton: [
                    {
                    value: "身份证"
                    }
                ],
                IdentificationInfo: {
                    // 认筹信息
                    flag: "否", // 认筹金是否可转定金
                    code: "", // 认筹单号
                    price: "" // 认筹金额
                },
                raiseInfo: {}, // 认筹单相关信息
                raiseOpiton: [], // 认筹单号下拉框
                paymentTable: [], // 付款信息
                counselorInfo: {
                    // 置业顾问信息
                    propertyConsultName: "", // 姓名
                    propertyConsultMobile: "" // 手机号
                },
            }
        },
        methods: {
            show(data) {
                if( data ){
                    this.houseInfo = data;
                    this.userTable = data.customs;
                    data.trdTradePayment.date = data.trdTradePayment.date || new Date().toLocaleString().split(' ')[0];
                    data.trdTradePayment.receivedAmount = data.trdTradePayment.receivedAmount || 0;
                    data.trdTradePayment.unreceivedAmount = data.trdTradePayment.unreceivedAmount || data.trdTradePayment.receivableAmount;
                    this.paymentTable = [data.trdTradePayment];
                    this.counselorInfo.propertyConsultName = data.propertyConsultName;
                    this.counselorInfo.propertyConsultMobile = data.propertyConsultTel;

                    this.IdentificationInfo.flag = data.raiseTranDepositFlag?"是":"否";
                    this.IdentificationInfo.code = data.raiseCode;
                    this.IdentificationInfo.price = data.raiseTranDepositAmount;
                }
            }
        }
    }
</script>

<style scoped>
.units {
  position: relative;
  float: left;
}
.units sup {
  position: absolute;
  top: -3px;
  right: -6px;
  transform: scale(0.7);
}
</style>