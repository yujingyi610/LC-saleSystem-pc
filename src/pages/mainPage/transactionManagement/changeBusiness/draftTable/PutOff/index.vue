<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">延期付款审批单发起</span>
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
                    <!-- 客户信息  -->
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
                            <el-table-column prop="paymentItemName" label="款项名称" width="280"></el-table-column>
                            <el-table-column prop="receivableDate" label="应收日期" width="160"></el-table-column>
                            <el-table-column prop="receivableAmount" label="应收金额" width="160"></el-table-column>
                            <el-table-column prop="receivedAmount" label="已收金额" width="160"></el-table-column>
                            <el-table-column prop="beenDelayDays" label="已申请延期天数" width="160"></el-table-column>
                            <el-table-column prop="delayFlag" label="是否申请延期" width="160">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.delayFlag" active-color="#13ce66" @change="handleInitDate(scope.$index, scope.row.delayFlag)"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="申请延期金额" width="160">
                                <template slot-scope="scope">
                                    {{scope.row.receivableAmount - scope.row.receivedAmount}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="delayStartDate" label="延期开始日期" width="160">
                                <template slot-scope="scope">
                                    {{scope.row.delayStartDate?scope.row.delayStartDate.toLocaleString().split(' ')[0]:''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="delayEndDate" label="延期结束日期" width="200">
                                <template slot-scope="scope">
                                    <el-date-picker :disabled="scope.row.delayFlag?false:'disabled'" :clearable=false v-model="scope.row.delayEndDate" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeDay(scope.$index)"></el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column prop="delayDays" label="延期天数" width="160"></el-table-column>
                            <el-table-column prop="totalDelayDays" label="累计申请延期天数" width="160"></el-table-column>
                            <el-table-column prop="interestFlag" label="是否计息" width="160">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.interestFlag" active-color="#13ce66"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="interestRate" label="利率" width="160">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.interestRate"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="interestAmount" label="到期应收利息" width="80">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.interestAmount"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="breakInterestRate" label="违约利率" width="160">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.breakInterestRate"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                    <!-- 其他信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">其他信息 </span>
                        </div>
                        <el-form>
                            <el-form-item label="备注">
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
                batchId: null,
                makeType: null,
                businessId: null,
                projectId: null,
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
                Payment: '商业贷款',// 付款方式
                payTable: [],// 付款table
                payTable1: [],// 存一份原数据
                dataAll: null,
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
            handleInitDate(index, flag) {
                if( !flag ){
                    let item = this.payTable[index];
                    let curDate = new Date(item.delayStartDate);
                    // let date = curDate.getTime()
                    this.payTable[index].delayEndDate = curDate;
                    this.handleChangeDay(index)
                }
            },
            handleChangeDay(index) {
                let item = this.payTable[index];
                let curDate = new Date(item.delayStartDate);
                let date = curDate.getTime()
                // let date = new Date(curDate.getTime() + this.payTable1[index].totalDelayDays*24*60*60*1000)
                console.log(curDate)
                console.log(date)
                console.log(this.payTable[index].delayEndDate)
                if( (new Date(this.payTable[index].delayEndDate).getTime() - date)/(1000*60*60*24) < 0 && this.payTable[index].delayFlag){
                    this.$message.error('延期结束日期不能早于延期开始日期！');
                    this.payTable[index].delayEndDate = date;
                    console.log(this.payTable[index].delayEndDate)
                    // return
                }
                this.payTable[index].delayDays = parseInt((new Date(this.payTable[index].delayEndDate).getTime() - date)/(1000*60*60*24));
                this.payTable[index].totalDelayDays = this.payTable[index].delayDays + this.payTable1[index].beenDelayDays;
                

                // let item = this.payTable[index];
                // let curDate = new Date(item.receivableDate);
                // let date = new Date(curDate.getTime() + this.row.payments[index].totalDelayDays*24*60*60*1000)
                // console.log(this.payTable[index].delayEndDate)
                // console.log(new Date(this.payTable[index].delayEndDate).getTime())
                // console.log((new Date(this.payTable[index].delayEndDate).getTime() - date)/(1000*60*60*24))
                // if( (new Date(this.payTable[index].delayEndDate).getTime() - date)/(1000*60*60*24) < 0 && this.payTable[index].delayFlag){
                //     this.$message.error('延期结束日期不能早于延期开始日期！');
                //     this.payTable[index].delayEndDate = date;
                //     console.log(this.payTable[index].delayEndDate)
                //     // return
                // }
                // this.payTable[index].delayDays = parseInt((new Date(this.payTable[index].delayEndDate).getTime() - date)/(1000*60*60*24));
                // this.payTable[index].totalDelayDays = this.payTable[index].delayDays + this.row.payments[index].beenDelayDays;
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
                for( let key in this.dataAll.NEW ){
                    data[key] = this.dataAll.NEW[key]
                }
                data.remark = this.remark;
                data.businessId = this.businessId;
                data.id = this.id;
                data.payments = [];
                this.payTable.map(item=>{
                    let obj = {}
                    for( let key in item ){
                        obj[key] = item[key]
                    }
                    data.payments.push(obj)
                })
                // for( let i = 0; i < data.payments.length; i++ ){
                //     if( !data.payments[i].delayFlag ){
                //         this.$message.error('未勾选申请延期，不能进行操作！')
                //         return
                //     }
                // }
                data.payments.map((item, index)=>{
                    item.delayStartDate = this.Time(item.delayStartDate)
                    item.beenSignDelayDays = this.payTable1[index].beenSignDelayDays;
                    // item.receivableDate = item.delayEndDate
                })
                console.log(data.payments)
                data.type = 'QY';
                data.changeType = 'YQFK';
                data.commonResources = this.commonResources;

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
                for( let key in this.dataAll.NEW ){
                    data[key] = this.dataAll.NEW[key]
                }
                data.remark = this.remark;
                data.businessId = this.businessId;
                data.id = this.id;
                data.payments = [];
                this.payTable.map(item=>{
                    let obj = {}
                    for( let key in item ){
                        obj[key] = item[key]
                    }
                    data.payments.push(obj)
                })
                // for( let i = 0; i < data.payments.length; i++ ){
                //     if( !data.payments[i].delayFlag ){
                //         this.$message.error('未勾选申请延期，不能进行操作！')
                //         return
                //     }
                // }
                data.payments.map((item, index)=>{
                    item.delayStartDate = this.Time(item.delayStartDate)
                    item.beenSignDelayDays = this.payTable1[index].totalDelayDays;
                    // item.receivableDate = item.delayEndDate
                })
                
                data.type = 'QY';
                data.changeType = 'YQFK';
                data.commonResources = this.commonResources;

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
                    // this.handleGetCustomerLabel();
                    console.log(dataAll);
                    this.dataAll = dataAll;
                    let data = dataAll.OLD;
                    this.code = data.signCode;// 合同单号
                    this.signDate = data.signDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = data.customs;// 客户table
                    this.priceType = data.discountCompMethod;// 折扣计价方式
                    this.DiscountInfo = data.discounts;// 折扣信息
                    this.switchFlag = data.payCreditFlag?true:false;// 是否工抵
                    // this.company.company = data.payCreditCompanyName;// 工抵城市
                    this.payCreditAmount = data.payCreditAmount;// 工抵金额
                    this.switchFlag2 = data.ticketFlag;// 是否优惠券
                    this.BuyStamps = data.tickets;// 优惠券列表
                    this.beautifyTotalPrice = data.beautifyTotalPrice;// 美化金额
                    
                    this.remark = dataAll.NEW.remark;// 备注

                    this.switchFlag3 = data.houseTicketFlag?true:false;// 是否房票
                    this.ticketPrice = data.houseTicketAmount;// 房票金额


                    this.Payment = dataAll.NEW.payMethod;// 付款方式
                    this.payments = dataAll.NEW.discounts;
                    this.payTable = dataAll.NEW.payments;
                    this.payTable.map(item=>{
                        let curDate = new Date(item.receivableDate);
                        item.beenDelayDays = item.beenDelayDays || 0;
                        let nextDate = new Date(curDate.getTime() + item.beenDelayDays*24*60*60*1000).toLocaleString(); //后一天
                        item.delayFlag = item.delayFlag?true:false;// 是否延期 1：是 ；0：否
                        item.interestFlag = item.interestFlag?true:false;// 是否计息 1：是；0：否
                        item.icbcFlag = item.icbcFlag?true:false;// 是否延期 1：是 ；0：否
                        console.log(item.delayStartDate)
                        item.delayStartDate = new Date(item.delayStartDate);// 延期开始日期
                        console.log(item.delayStartDate)
                        // item.delayStartDate = nextDate;// 延期开始日期
                    })
                    this.payTable1 = [];
                    dataAll.NEW.payments.map(item=>{
                        let obj = {}
                        for( let key in item ){
                            obj[key] = item[key]
                        }
                        this.payTable1.push(obj)
                    });
                    this.price = data.signPrice;// 签约单价
                    this.totalprice = data.signTotalAmount;// 签约总价
                    this.isBroken = data.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = data.discountAmount;// 总折扣

                    this.id = dataAll.NEW.id;
                    this.batchId = dataAll.NEW.batchId;
                    this.businessId = dataAll.NEW.businessId;
                    this.makeType = dataAll.NEW.makeType;
                    this.projectId = dataAll.NEW.projectId;

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
            console.log(this.row);
            if( this.row ){
                this.code = this.row.signCode;// 合同单号
                this.signDate = this.row.signDate;// 签约日期
                this.houseInfo = this.row;// 房间信息
                this.userTable = this.row.customs;// 客户table
                this.priceType = this.row.discountCompMethod;// 折扣计价方式
                this.DiscountInfo = this.row.discounts;// 折扣信息
                this.switchFlag = this.row.payCreditFlag?true:false;// 是否工抵
                this.company.company = this.row.payCreditCompanyName;// 工抵城市
                this.payCreditAmount = this.row.payCreditAmount;// 工抵金额
                this.switchFlag2 = this.row.ticketFlag;// 是否优惠券
                this.BuyStamps = this.row.tickets;// 优惠券列表
                this.beautifyTotalPrice = this.row.beautifyTotalPrice;// 美化金额
                this.price = this.row.signPrice;// 签约单价
                this.totalprice = this.row.signTotalAmount;// 签约总价
                this.isBroken = this.row.underLowestFlag?'是':'否';// 是否破底
                this.totalDiscount = this.row.discountAmount;// 总折扣
                this.remark = this.row.remark;// 备注

                this.Payment = this.row.payMethod;// 付款方式
                this.payTable = this.row.payments.map(item=>{
                    let curDate = new Date(item.receivableDate);
                    item.totalDelayDays = item.totalDelayDays || 0;
                    let nextDate = new Date(curDate.getTime() + item.totalDelayDays*24*60*60*1000).toLocaleString(); //后一天
                    return {
                        type: item.type,
                        signId: item.signId,
                        signCode: item.signCode,
                        payMethod: item.payMethod,
                        paymentItemName: item.paymentItemName,// 款项名称
                        receivableAmount: item.receivableAmount,// 应收金额（元）
                        receivedAmount: 0,// 已收金额(元)
                        delayStartDate: nextDate,// 延期开始日期
                        delayEndDate: '',// 延期结束日期
                        delayFlag: item.delayFlag?true:false,// 是否延期 1：是 ；0：否
                        beenDelayDays: item.beenDelayDays || 0,// 已经延期天数(天)
                        delayDays: 0,// 延期天数(天)
                        totalDelayDays: item.totalDelayDays,// 累计延期天数(天)
                        receivableDate: item.receivableDate,// 应收日期
                        interestFlag: item.interestFlag?true:false,// 是否计息 1：是；0：否
                        interestRate: 0, // 利率（%）
                        breakInterestRate: 0,// 违约利率（%）
                        interestAmount: 0,// 到期应收利息(元)
                        bankType: item.bankType,// 银行名称
                        bankName: item.bankName,// 银行名称
                        bankBranchCode: item.bankBranchCode,// 银行支行编码
                        bankBranchName: item.bankBranchName,// 银行支行名称
                        icbcFlag: item.icbcFlag?true:false,// 是否工商银行 1:是;0:否
                    }
                })
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