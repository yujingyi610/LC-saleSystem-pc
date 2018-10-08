<template>
    <div>
        <!-- 预定信息 -->
        <!-- <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">预定信息</span>
            </div>
            <el-form :inline="true">
                <el-form-item label="预订单编号">{{code}}</el-form-item>
                <el-form-item label="认购日期">{{signDate}}</el-form-item>
            </el-form>
        </el-card> -->
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
        <!-- 付款信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">付款信息</span>
            </div>
            <el-table :data="table" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="paymentItemName" label="款项名称" width="280"></el-table-column>
                    <el-table-column prop="receivableDate" label="应收日期" width="160"></el-table-column>
                    <el-table-column prop="receivableAmount" label="应收金额"></el-table-column>
                    <el-table-column prop="icbcFlag" label="是否工行"></el-table-column>
                    <el-table-column prop="bankBranchName" label="银行"></el-table-column>
                    <el-table-column prop="receivedAmount" label="已收金额"></el-table-column>
                    <el-table-column prop="unreceivedAmount" label="未收金额">
                        <!-- <template slot-scope="scope">
                            {{scope.row.receivableAmount - scope.row.receivedAmount}}
                        </template> -->
                    </el-table-column>
            </el-table>
        </el-card>
        <!-- 签约信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">签约信息 </span>
            </div>
            <el-form :inline="true">
                <el-form-item label="预定转签约日期">{{planSignDate}}</el-form-item>
                <el-form-item label="延期到期日期">{{signDelayDate}}</el-form-item>
                <el-form-item label="延期天数">{{signDelayDays}}</el-form-item>
                <el-form-item label="累积延期天数">{{totalSignDelayDays}}</el-form-item>
            </el-form>
        </el-card>
        <!-- 其他信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">其他信息 </span>
            </div>
            <el-form>
                <el-form-item label="延期签约原因">{{remark}}</el-form-item>
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
import {saveTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
    export default {
        data() {
            return{
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
                companyCity: {// 工抵项目公司
                    name: '',
                    id: ''
                },
                payCreditAmount: 0,// 工抵金额
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

                table: [],// 付款信息
                planSignDate: null,// 计划签约日期
                signDelayDate: null,// 延期到期日期
                signDelayDays: '',// 延期天数
                totalSignDelayDays: '',// 累计延期天数

                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                dataAll: null,
                loading: false
            }
        },
        methods: {
            show(dataAll) {
                if( dataAll ){
                    this.dataAll = dataAll;
                    let data = dataAll.OLD;
                    this.code = data.signCode;// 合同单号
                    this.signDate = data.signDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = data.customs;// 客户table
                    this.priceType = data.discountCompMethod;// 折扣计价方式
                    this.DiscountInfo = data.discounts;// 折扣信息
                    
                    this.beautifyTotalPrice = data.beautifyTotalPrice;// 美化金额
                    this.price = data.signPrice;// 签约单价
                    this.totalprice = data.signTotalAmount;// 签约总价
                    this.isBroken = data.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = data.discountAmount;// 总折扣
                    

                    this.Payment = data.payMethod;// 付款方式

                    this.table = data.payments;
                    this.table.map(item=>{
                        item.receivableDate = item.receivableDate || new Date().toLocaleString().split(' ')[0];
                        item.icbcFlag = item.icbcFlag || '--';
                        item.bankBranchName = item.bankBranchName || '--';
                        item.receivedAmount = item.receivedAmount || 0;
                        item.unreceivedAmount = item.unreceivedAmount || item.receivedAmount - item.receivedAmount;
                        if( item.unreceivedAmount < 0 ){
                            item.unreceivedAmount =  0
                        }
                    })

                    this.remark = dataAll.NEW.remark;// 备注

                    this.signDelayDate = new Date(dataAll.NEW.signDelayDate).toLocaleString().split(' ')[0];
                    this.signDelayDays = dataAll.NEW.signDelayDays || 0;
                    this.totalSignDelayDays = dataAll.NEW.totalSignDelayDays || 0;
                    this.planSignDate = new Date(dataAll.NEW.signDate).toLocaleString().split(' ')[0];

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
                for( let key in this.dataAll.NEW ){
                    data[key] = this.dataAll.NEW[key]
                }
                data.commonResources = this.commonResources;

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