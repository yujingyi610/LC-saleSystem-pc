<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">预定换房审批单发起</span>
                    <div style="float: right">
                        <el-button @click="handleCancel">取消</el-button>
                        <el-button type="success" @click="handleSave">保存</el-button>
                        <el-button type="success" @click="handleUp">提交</el-button>
                    </div> 
                </div>
                <div class="text item">
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
                                <!-- <el-form-item label="底单价">{{houseInfo?houseInfo.preMinPrice:''}}</el-form-item>
                                <el-form-item label="底总价">{{houseInfo?houseInfo.preMinTotalPrice:''}}</el-form-item> -->
                            </div>
                        </el-form>
                        <!-- 付款信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">付款信息</span>
                            </div>
                            <div class="text item">
                                <el-table :data="paymentTable" border style="width: 100%; margin-bottom: 20px">
                                    <el-table-column prop="paymentTypeName" label="房款类型"></el-table-column>
                                    <el-table-column prop="receivableAmount" label="应收金额（元）"></el-table-column>
                                    <el-table-column prop="date" label="应收日期"></el-table-column>
                                    <el-table-column prop="receivedAmount" label="已收金额（元）"></el-table-column>
                                    <el-table-column prop="unreceivedAmount" label="未收金额（元）"></el-table-column>
                                </el-table>
                            </div>
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
                        <!-- 付款信息 -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">付款信息</span>
                            </div>
                            <div class="text item">
                                <el-table :data="newPaymentTable" border style="width: 100%; margin-bottom: 20px">
                                    <el-table-column prop="paymentTypeName" label="房款类型"></el-table-column>
                                    <el-table-column prop="receivableAmount" label="应收金额（元）">
                                        <template slot-scope="scope">
                                            <el-input v-model="scope.row.receivableAmount" @change="handlePrice(scope.$index)"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="date" label="应收日期"></el-table-column>
                                    <el-table-column prop="receivedPrice" label="已收金额（元）"></el-table-column>
                                    <el-table-column prop="receivableAmount" label="未收金额（元）"></el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-card>
                    <!-- 其他信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">其他信息 </span>
                        </div>
                        <el-form>
                            <el-form-item label="备注"><el-input type="textarea" v-model="remark"></el-input></el-form-item>
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
    </div>
</template>

<script>
import dialogInput from '@/components/dialogLongInput'
import searchHouse from './searchHouse'
import {saveTrdChange, submitTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
import {getHouse} from '@/api/pages/mainPage/transactionManagement/contractManagement'
import {
  getSubscripeSetting,
} from "@/api/pages/mainPage/transactionManagement/subscriptionManagement";
    export default {
        props: {
            row: Object
        },
        components: {
            dialogInput,
            searchHouse,
        },
        data() {
            return{
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                code: '',// 合同编号
                signDate: '',// 签约日期
                /*********房间信息*********/
                houseInfo: null,
                newHouseInfo: null,// 新房源信息
                newBatchInfo: null,
                newBuildInfo: null,
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
                paymentTable: [], // 付款信息
                newPaymentTable: [], // 付款信息
                loading: false
            }
        },
        methods: {
            handleCancel() {// 取消
                this.$emit('closeChild')
            },
            handleSearchHouse() {// 查询房间
                this.$refs.searchRef.show();
            },
            handleConfirmHouse({houseInfo, buildInfo, batch}) {// 选择完房间后触发，关闭弹框
                this.newHouseInfo = null;
                this.newBuildInfo = null;
                this.newBatchInfo = null;
                getHouse({ houseId: houseInfo.id }).then(res=>{
                     
                    if( res.status === 200 ){
                        let data = res.data;
                        if( data.projectInfo.projectCompanyNames.indexOf(this.row.projectCompanyName) !== -1 ){
                            this.newHouseInfo = houseInfo;
                            this.newBuildInfo = buildInfo;
                            this.newBatchInfo = batch;

                            let params = new URLSearchParams();
                            params.append("pushBathId", this.newBatchInfo.releases);
                            this.handleGetSubscripeSetting(params);
                        }else{
                            this.$message.error('只能换本项目公司下的项目的房间！');
                            return
                        }

                    }
                })

                
            },  
            handleGetSubscripeSetting(params) {// 查询认购设置信息
                this.newPaymentTable = [];
                getSubscripeSetting(params).then(res => {
                     
                    if (res.status !== 200) {
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                        return;
                    }
                    if (res.status === 200) {
                        if (res.data !== null) {
                            let date = new Date();
                            let date1 = date.toLocaleString().split(' ')[0]
                            this.newPaymentTable.push({
                                paymentTypeName: "定金",
                                receivableAmount: res.data.dowpayAmount,
                                receivedPrice: 0,
                                date: date1
                            });
                        }else{
                            
                        }
                    }
                });
            },
            handlePrice(index) {// 处理应收金额不能小于0
				if( isNaN(Number(this.newPaymentTable[index].receivableAmount)) ){
					this.newPaymentTable[index].receivableAmount = 1;
					this.$message.error('请输入数字！');
					return
				}
				if( this.newPaymentTable[index].receivableAmount <= 0 ){
					this.newPaymentTable[index].receivableAmount = 1;
				}
				this.newPaymentTable[index].receivableAmount = Number(this.newPaymentTable[index].receivableAmount)
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
                for( let key in this.row ){
                    data[key] = this.row[key]
                }
                data.remark = this.remark;
                data.businessId = this.row.id;
                data.id = null;
                data.belongs = null;
                data.customs = null;
                data.payments = [];
                this.newPaymentTable.map(item=>{
                    data.payments.push({
                        paymentItemName: item.paymentTypeName,// 款项名称
                        receivableAmount: item.receivableAmount,// 应收金额
                        receivableDate: this.Time(item.date),// 日期
                        receivedAmount: item.receivedPrice,// 已收金额
                    })
                })
                data.discounts = null;
                data.tickets = null;
                data.houseId = this.newHouseInfo.id;
                data.batchId = this.newBatchInfo.releases;
                data.batchCode = null;
                data.trdTradePayment = null;
                data.commonResources = this.commonResources;


                data.type = 'RG';
                data.changeType = 'YDHF';

                saveTrdChange(data).then(res=>{
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
                let data = {};
                for( let key in this.row ){
                    data[key] = this.row[key]
                }
                data.remark = this.remark;
                data.businessId = this.row.id;
                data.id = null;
                data.belongs = null;
                data.customs = null;
                data.payments = [];
                this.newPaymentTable.map(item=>{
                    data.payments.push({
                        paymentItemName: item.paymentTypeName,// 款项名称
                        receivableAmount: item.receivableAmount,// 应收金额
                        receivableDate: this.Time(item.date),// 日期
                        receivedAmount: item.receivedPrice,// 已收金额
                    })
                })
                data.trdTradePayment = null;
                data.discounts = null;
                data.tickets = null;
                data.houseId = this.newHouseInfo.id;
                data.batchId = this.newBatchInfo.releases;
                data.batchCode = null;
                data.commonResources = this.commonResources;

                data.type = 'RG';
                data.changeType = 'YDHF';
                saveTrdChange(data).then(res=>{
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
            if( this.row ){
                this.code = this.row.signCode;// 合同单号
                this.signDate = this.row.signDate;// 签约日期
                this.houseInfo = this.row;// 房间信息
                this.userTable = this.row.customs;// 客户table
                this.userTable.map(item=>{
                    item.sex = item.sex?'男':'女'
                })
                
                this.price = this.row.signPrice;// 签约单价
                this.totalprice = this.row.signTotalAmount;// 签约总价
                this.isBroken = this.row.underLowestFlag?'是':'否';// 是否破底
                this.totalDiscount = this.row.discountAmount;// 总折扣
                this.remark = this.row.remark;// 备注

                let date = new Date();
                let date1 = date.toLocaleString(date)
                this.row.trdTradePayment.date = date1.split(' ')[0];
                this.row.trdTradePayment.receivedPrice = 0;
                this.paymentTable.push(this.row.trdTradePayment)
                
            }
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