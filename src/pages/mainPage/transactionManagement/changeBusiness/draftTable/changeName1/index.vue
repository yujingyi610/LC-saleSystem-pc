<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">预定更名审批单发起</span>
                    <div style="float: right">
                        <el-button @click="handleCancel">取消</el-button>
                        <el-button type="success" @click="handleSave">保存</el-button>
                        <el-button type="success" @click="handleUp">提交</el-button>
                    </div>
                </div>
                <div class="text item">
                     <!-- 预定信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">预定信息</span>
                        </div>
                        <el-form :inline="true">
                            <el-form-item label="预订单编号">{{code}}</el-form-item>
                            <el-form-item label="认购日期">{{signDate}}</el-form-item>
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
                    <!-- 更名信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">更名信息</span>
                        </div>
                        <div>
                            <p>原客户：</p>
                            <el-table :data="userTable" border style="width: 100%; margin-bottom: 20px">
                                <el-table-column prop="customName" label="客户名称"></el-table-column>
                                <el-table-column prop="tel" label="手机号码"></el-table-column>
                                <el-table-column prop="sex" label="性别"></el-table-column>
                                <el-table-column prop="certificateName" label="证件类型"></el-table-column>
                                <el-table-column prop="certificateNo" label="证件号码"></el-table-column>
                                <!-- <el-table-column prop="addr" label="邮寄地址"></el-table-column> -->
                            </el-table>
                        </div>
                        <div>
                            <p>新客户：<el-button type="text" @click="addUser" icon="el-icon-circle-plus-outline" style="float: right">添加客户</el-button></p>
                            <el-table :data="newUserTable" border style="width: 100%; margin-bottom: 20px">
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
                                <!-- <el-table-column label="邮寄地址">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.addr"></el-input>
                                    </template>
                                </el-table-column> -->
                                <el-table-column fixed="right" label="操作" width="150">
                                    <template slot-scope="scope">
                                        <el-button @click.stop.prevent="handleDelect(scope.$index)" type="text">清空客户</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
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
        <find-custom ref="findCustomRef" @chooseCustom="handleChooseCustom"></find-custom>
    </div>
</template>

<script>
import {saveTrdChange, submitTrdChange} from '@/api/pages/mainPage/transactionManagement/change/index.js'
import {getCustomerInfo, getCustomerLabel} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
import findCustom from '@/components/findCustom'
    export default {
        data() {
            return{
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                id: null,
                batchId: null,
                businessId: null,
                dataAll: null,
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
        components: {
            findCustom
        },
        methods: {
            handleCancel() {// 取消
                this.$emit('closeChild')
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
            addUser() {// 点击新增客户按钮
				if (!this.dataAll) {
					this.$message({
						type: "error",
						message: "请选择项目！"
					});
					return;
				}
				this.$refs.findCustomRef.show(this.dataAll.NEW.projectId)
            },
            handleChooseCustom(info) {// 得到客户信息，关闭弹框
				if( info ){
					console.log(info);
					for( let i = 0; i < this.newUserTable.length; i++ ){
						if( this.newUserTable[i].customId === info.customId ){
							this.$message.error('不能重复添加客户！')
							return
						}
					}
					
					this.newUserTable.push({
						customName: info.customName,// 客户姓名
						tel: info.customMobile,// 手机号码
						certificateName: info.certificateType,// 证件类型
						certificateNo: info.certificateNo,// 证件号码
						customId: info.customId,// 客户id
                        sex: info.customSex,// 性别
                        nicheId: info.nicheId,// 商机id
					})
				}
			},
            handleDelect(index) {// 客户信息table，删除客户操作
				if( this.newUserTable.length >= 1 ){
					this.newUserTable.splice(index, 1)
				}else{
					alert('客户信息不能为空！')
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
				if (!this.dataAll) {
					this.$message({
						type: "error",
						message: "请选择项目！"
					});
					return;
                }
				let params = {
					projectId: this.dataAll.NEW.projectId,
					mobile: row.tel
				};
				getCustomerInfo(params).then(res => {
					 
					if (res != null && res != "") {
						if (res.isPrincess) {
							this.$message({
								type: "error",
								message: "未分配置业顾问，请分配置业顾问！"
							});
							return;
						}
						this.newUserTable[index].customName = res.customName;
						this.newUserTable[index].certificateName = res.certificateName;
						this.newUserTable[index].certificateType = res.certificateType;
						this.newUserTable[index].certificateNo = res.certificateNo;
						this.newUserTable[index].customId = res.customId;
						this.newUserTable[index].sex = res.customSex;
					} else {
						this.$message({
							type: "error",
							message: "未找到用户数据"
						});
					}
				});
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
                for( let i = 0; i < this.newUserTable.length; i++ ){
                    if( !this.newUserTable[i].customId || !this.newUserTable[i].customName || !this.newUserTable[i].sex || !this.newUserTable[i].tel || !this.newUserTable[i].certificateName || !this.newUserTable[i].certificateNo){
                        this.$message.error('请完善客户信息！');
                        return
                    }
                    if ( this.newUserTable[i].certificateName === "居民身份证" && !this.idCard(this.newUserTable[i].certificateNo) ) {
                        this.$message.error("居民身份证格式错误！");
                        return;
                    }
                }
                if( !this.newUserTable[0] ){
                    this.$message.error('请输入客户信息！');
                    return
                }
                this.newUserTable.map((item, index)=>{
                    if( index !== 0 ){
                        item.nicheId = null;
                    }
                })
                let data = {};
                for( let key in this.dataAll.NEW ){
                    data[key] = this.dataAll.NEW[key]
                }
                data.remark = this.remark;
                data.businessId = this.businessId;
                data.id = this.id;
                data.belongs = null;
                data.customs = this.newUserTable;
                data.payments = null;
                data.discounts = null;
                data.tickets = null;
                // data.houseId = null;
                data.commonResources = this.commonResources;

                data.type = 'RG';
                data.changeType = 'YDGM';

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
                for( let i = 0; i < this.newUserTable.length; i++ ){
                    if( !this.newUserTable[i].customId || !this.newUserTable[i].customName || !this.newUserTable[i].sex || !this.newUserTable[i].tel || !this.newUserTable[i].certificateName || !this.newUserTable[i].certificateNo){
                        this.$message.error('请完善客户信息！');
                        return
                    }
                    if ( this.newUserTable[i].certificateName === "居民身份证" && !this.idCard(this.newUserTable[i].certificateNo) ) {
                        this.$message.error("居民身份证格式错误！");
                        return;
                    }
                }
                if( !this.newUserTable[0] ){
                    this.$message.error('请输入客户信息！');
                    return
                }
                this.newUserTable.map((item, index)=>{
                    if( index !== 0 ){
                        item.nicheId = null;
                    }
                })
                let data = {};
                for( let key in this.dataAll.NEW ){
                    data[key] = this.dataAll.NEW[key]
                }
                data.remark = this.remark;
                data.businessId = this.businessId;
                data.id = this.id;
                data.belongs = null;
                data.customs = this.newUserTable;
                data.payments = null;
                data.discounts = null;
                data.tickets = null;
                // data.houseId = null;
                data.commonResources = this.commonResources;

                data.type = 'RG';
                data.changeType = 'YDGM';

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
                    this.code = data.subscribeCode;// 合同单号
                    this.signDate = data.subscribeDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = data.customs;// 客户table
                    this.newUserTable = dataAll.NEW.customs;// 客户table
                    this.remark = dataAll.NEW.remark;// 备注
                    this.Payment = data.payMethod;// 付款方式

                    this.id = dataAll.NEW.id;
                    this.batchId = dataAll.NEW.batchId;
                    this.businessId = dataAll.NEW.businessId;

                    this.paymentTable = data.payments;
                    this.paymentTable[0].date = new Date().toLocaleString().split(' ')[0]

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
            this.handleGetCustomerLabel();
            // console.log(this.row);
            // if( this.row ){
            //     this.code = this.row.signCode;// 合同单号
            //     this.signDate = this.row.signDate;// 签约日期
            //     this.houseInfo = this.row;// 房间信息
            //     this.userTable = this.row.customs;// 客户table
                
            //     this.price = this.row.signPrice;// 签约单价
            //     this.totalprice = this.row.signTotalAmount;// 签约总价
            //     this.isBroken = this.row.underLowestFlag?'是':'否';// 是否破底
            //     this.remark = this.row.remark;// 备注
                
            // }
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