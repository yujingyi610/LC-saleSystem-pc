<template>
    <div>
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
        <!-- 原成交房源信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">原成交房源信息</span>
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
                </div>
            </el-form>
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
            <!-- 付款信息 -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">付款信息</span>
                </div>
                <el-table :data="payTable" border style="width: 100%; margin-bottom: 20px">
                    <el-table-column prop="paymentItemName" label="款项名称" width="280"></el-table-column>
                    <el-table-column prop="receivableDate" label="应收日期" width="160"></el-table-column>
                    <el-table-column prop="receivableAmount" label="应收金额"></el-table-column>
                    <!-- <el-table-column prop="icbcFlag" label="是否工行"></el-table-column>
                    <el-table-column prop="bankBranchName" label="银行"></el-table-column> -->
                    <el-table-column prop="receivedAmount" label="已收金额">
                        <template slot-scope="scope">
                            {{scope.row.receivedAmount || 0}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="未收金额">
                        <template slot-scope="scope">
                            {{scope.row.receivableAmount - (scope.row.receivedAmount || 0)}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-card>
        <!-- 新成交房源信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">新成交房源信息</span>
            </div>
            <el-form :inline="true" :model="newHouseInfo">
                <div>
                    <el-form-item label="房间号码">{{newHouseInfo?newHouseInfo.houseFullName:''}}</el-form-item>
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
            </el-form>
            <!-- 成交信息 -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">成交信息</span>
                </div>
                <el-form :inline="true">
                    <el-form-item label="计价方式">{{newHouseInfo?newHouseInfo.priceMethod:''}}</el-form-item>
                    <el-form-item label="表单价">{{newHouseInfo?newHouseInfo.prePrice:''}}</el-form-item>
                    <el-form-item label="表总价">{{newHouseInfo?newHouseInfo.preTotalPrice:''}}</el-form-item>
                    <!-- <el-form-item label="底单价">{{newHouseInfo?newHouseInfo.preMinPrice:''}}</el-form-item>
                    <el-form-item label="底总价">{{newHouseInfo?newHouseInfo.preMinTotalPrice:''}}</el-form-item> -->
                </el-form>
            </el-card>
            <!-- 付款信息 -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">付款信息</span>
                </div>
                <el-table :data="newPayTable" border style="width: 100%; margin-bottom: 20px">
                    <el-table-column prop="paymentItemName" label="款项名称" width="280"></el-table-column>
                    <el-table-column prop="receivableDate" label="应收日期" width="160"></el-table-column>
                    <el-table-column prop="receivableAmount" label="应收金额"></el-table-column>
                    <!-- <el-table-column prop="icbcFlag" label="是否工行"></el-table-column>
                    <el-table-column prop="bankBranchName" label="银行"></el-table-column> -->
                    <el-table-column prop="receivedAmount" label="已收金额（元）"></el-table-column>
                    <el-table-column prop="unreceivedAmount" label="未收金额（元）"></el-table-column>
                </el-table>
            </el-card>
        </el-card>
        <!-- 其他信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">其他信息 </span>
            </div>
            <el-form>
                <el-form-item label="备注">{{remark}}</el-form-item>
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
        <el-button style="float: right" type="success" @click="handleSaveFile">保存附件信息</el-button>
    </div>
</template>

<script>
import {saveTrdChange, submitTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
    export default {
        data() {
            return{
                code: '',// 合同编号
                signDate: '',// 签约日期
                /*********房间信息*********/
                houseInfo: null,
                newHouseInfo: null,
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
                    company: null
                },
                payCreditAmount: 0,// 工抵金额
                priceType: '',// 折扣计价方式
                DiscountInfo: [],// 折扣信息

                newPriceType: '',// 折扣计价方式
                newDiscountInfo: [],// 折扣信息
                /***********购房券**************/
                switchFlag2: false,// 是否有购房券
                BuyStamps: [],// 购房券列表
                beautifyTotalPrice: '',// 美化金额

                newSwitchFlag2: false,// 是否有购房券
                newBuyStamps: [],// 购房券列表
                newBeautifyTotalPrice: '',// 美化金额

                accessoryTable: [],// 附件table,
                postData: null,// 发送给后台的数据
                remark: '',// 备注
                totalprice: '',// 签约总价
                price: '',// 签约单价
                totalDiscount: '',// 总折扣
                isBroken: '否',// 是否破底

                newTotalprice: '',// 签约总价
                newPrice: '',// 签约单价
                newTotalDiscount: '',// 总折扣
                newIsBroken: '否',// 是否破底

                payTable:[],// 付款table
                newPayTable:[],// 付款table

                Payment: '',//付款方式
                newPayment: '',//付款方式

                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                loading: false
            }
        },
        methods: {
            show(dataAll) {
                if( dataAll ){
                    let data = dataAll.OLD;
                    this.code = data.signCode;// 合同单号
                    this.signDate = data.signDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = data.customs;// 客户table
                    this.priceType = data.discountCompMethod;// 折扣计价方式
                    this.DiscountInfo = data.discounts;// 折扣信息
                    this.switchFlag = data.payCreditFlag?true:false;// 是否工抵
                    this.company.company = data.payCreditCompanyName;// 工抵城市
                    this.payCreditAmount = data.payCreditAmount;// 工抵金额
                    this.switchFlag2 = data.ticketFlag;// 是否优惠券
                    this.BuyStamps = data.tickets;// 优惠券列表
                    this.beautifyTotalPrice = data.beautifyTotalPrice;// 美化金额
                    this.price = data.signPrice;// 签约单价
                    this.totalprice = data.signTotalAmount;// 签约总价
                    this.isBroken = data.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = data.discountAmount;// 总折扣
                    this.remark = data.remark;// 备注

                    this.Payment = data.payMethod;// 付款方式

                    this.newHouseInfo = dataAll.NEW;
                    this.remark = dataAll.NEW.remark;// 备注
                    
                    this.payTable = data.payments;
                    this.newPayTable = dataAll.NEW.payments;
                    this.payTable[0].receivableDate = this.payTable[0].receivableDate || new Date().toLocaleString().split(' ')[0]
                    this.payTable[0].receivedAmount = this.payTable[0].receivedAmount || 0;
                    this.payTable[0].unreceivedAmount = this.payTable[0].unreceivedAmount || this.payTable[0].receivableAmount;
                    this.newPayTable[0].receivableDate = this.newPayTable[0].receivableDate || new Date().toLocaleString().split(' ')[0]
                    this.newPayTable[0].receivedAmount = this.newPayTable[0].receivedAmount || 0;
                    this.newPayTable[0].unreceivedAmount = this.newPayTable[0].unreceivedAmount || this.newPayTable[0].receivableAmount;

                    this.accessoryTable = dataAll.NEW.resourceMaps || [];// 展示附件
                    this.commonResources = dataAll.NEW.commonResources || [];// 传给后台的附件
                    if( this.commonResources ){
                        this.commonResources.map(item=>{
                            item.id = null;
                        })
                    }
                }   
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
            handleSaveFile() {// 保存
                let data = {};
                for( let key in this.newHouseInfo ){
                    data[key] = this.newHouseInfo[key]
                }
                data.commonResources = this.commonResources;


                data.type = 'RG';
                data.changeType = 'YDHF';

                saveTrdChange(data).then(res=>{
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
            },
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