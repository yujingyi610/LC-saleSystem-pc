<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">签约退房审批单发起</span>
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
                    <!-- 折扣信息 -->
                    <el-card class="box-card">
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
                                    {{scope.row.discountItem}}{{scope.row.way === '比例优惠'?'%':'元'}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <el-form :inline="true">
                            <el-form-item label="是否工抵">{{switchFlag?'是':'否'}}</el-form-item>
                            <el-form-item label="项目公司" v-if="switchFlag">{{company.company}}</el-form-item>
                            <el-form-item label="工抵金额" v-if="switchFlag">{{payCreditAmount}}</el-form-item>
                        </el-form> -->
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
                    
                    <!-- 其他信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">其他信息 </span>
                        </div>
                        <el-form>
                            <el-form-item label="退房原因：">
                                <el-input type="textarea" v-model="remark"></el-input>
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
    </div>
</template>

<script>
import {saveTrdChange, submitTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
    export default {
        data() {
            return{
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                id: null,
                businessId: null,
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
                company: {// 工抵项目公司
                    name: '',
                    id: '',
                    company: null
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
                isBroken: '',// 是否破底
                loading: false
            }
        },
        methods: {
            handleCancel() {// 取消
                this.$emit('closeChild')
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
            handleSave() {// 保存
                let data = {};
                for( let key in this.houseInfo ){
                    data[key] = this.houseInfo[key]
                }
                data.remark = this.remark;
                data.businessId = this.businessId;
                data.id = this.id;
                data.belongs = null;
                data.customs = null;
                data.payments = null;
                data.discounts = null;
                data.tickets = null;
                data.commonResources = this.commonResources;

                data.type = 'QY';
                data.changeType = 'QYTF';

                saveTrdChange(data).then(res=>{
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
                let data = {};
                for( let key in this.houseInfo ){
                    data[key] = this.houseInfo[key]
                }
                data.remark = this.remark;
                data.businessId = this.businessId;
                data.id = this.id;
                data.belongs = null;
                data.customs = null;
                data.payments = null;
                data.discounts = null;
                data.tickets = null;
                data.commonResources = this.commonResources;

                data.type = 'QY';
                data.changeType = 'QYTF';

                saveTrdChange(data).then(res=>{
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
                    console.log(dataAll);
                    this.code = dataAll.NEW.signCode;// 合同单号
                    this.signDate = dataAll.NEW.signDate;// 签约日期
                    this.houseInfo = dataAll.NEW;// 房间信息
                    this.userTable = dataAll.OLD.customs;// 客户table
                    this.priceType = dataAll.NEW.discountCompMethod;// 折扣计价方式
                    this.DiscountInfo = dataAll.OLD.discounts;// 折扣信息
                    this.switchFlag = dataAll.NEW.payCreditFlag?true:false;// 是否工抵
                    this.company.company = dataAll.NEW.payCreditCompanyName;// 工抵城市
                    this.payCreditAmount = dataAll.NEW.payCreditAmount;// 工抵金额
                    this.switchFlag2 = dataAll.NEW.ticketFlag;// 是否优惠券
                    this.BuyStamps = dataAll.OLD.tickets;// 优惠券列表
                    this.beautifyTotalPrice = dataAll.NEW.beautifyTotalPrice;// 美化金额
                    this.price = dataAll.NEW.signPrice;// 签约单价
                    this.totalprice = dataAll.NEW.signTotalAmount;// 签约总价
                    this.isBroken = dataAll.NEW.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = dataAll.NEW.discountAmount;// 总折扣
                    this.remark = dataAll.NEW.remark;// 备注
                    this.id = dataAll.NEW.id;// 备注
                    this.businessId = dataAll.NEW.businessId;// 备注
                    
                    this.accessoryTable = dataAll.NEW.resourceMaps || [];// 展示附件
                    this.commonResources = dataAll.NEW.commonResources || [];// 传给后台的附件
                    if( this.commonResources ){
                        this.commonResources.map(item=>{
                            item.id = null;
                        })
                    }
                }
            }
        },
        created() {
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