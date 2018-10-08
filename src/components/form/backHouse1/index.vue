<template>
    <div class="add">
        <div class="add-con">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">预定退房审批单发起</span>
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
                                <el-form-item label="房间号码">{{houseInfo?houseInfo.houseDesc:''}}</el-form-item>
                                <!-- <el-form-item v-if="houseInfo" label="相关房号">{{houseInfo?houseInfo.refHouseFullNames:''}}</el-form-item> -->
                            </div>
                            <div v-if="houseInfo">
                                <el-form-item label="建筑面积:"><span class="units">{{houseInfo.floorSpace}}m<sup>2</sup></span></el-form-item>
                                <el-form-item label="分摊面积:"><span class="units">{{houseInfo.apportionArea}}m<sup>2</sup></span></el-form-item>
                                <el-form-item label="地下室面积:"><span class="units">{{houseInfo.basementArea}}m<sup>2</sup></span></el-form-item>
                                <el-form-item label="赠送面积:"><span class="units">{{houseInfo.giftArea}}m<sup>2</sup></span></el-form-item>
                                <el-form-item label="套内面积:"><span class="units">{{houseInfo.buildingArea}}m<sup>2</sup></span></el-form-item>																		
                                <el-form-item label="花园面积:"><span class="units">{{houseInfo.gardenArea}}m<sup>2</sup></span></el-form-item>
                                <el-form-item label="天台面积:"><span class="units">{{houseInfo.roofArea}}m<sup>2</sup></span></el-form-item>
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
                    <!-- 其他信息 -->
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="title">其他信息 </span>
                        </div>
                        <el-form>
                            <el-form-item label="退房原因："><el-input type="textarea" v-model="remark"></el-input></el-form-item>
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
        props: {
            row: Object
        },
        computed: {
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
                /************客户信息*************/
                userTable: [],// table

                accessoryTable: [],// 附件table,
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
                for( let key in this.row ){
                    data[key] = this.row[key]
                }
                data.remark = this.remark;
                data.businessId = this.row.id;
                data.id = null;
                data.belongs = null;
                data.customs = null;
                data.payments = null;
                data.discounts = null;
                data.tickets = null;
                // data.houseId = null;
                data.commonResources = this.commonResources;

                data.type = 'RG';
                data.changeType = 'YDTF';

                saveTrdChange(data).then(res=>{
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
                data.payments = null;
                data.discounts = null;
                data.tickets = null;
                // data.houseId = null;
                data.commonResources = this.commonResources;

                data.type = 'RG';
                data.changeType = 'YDTF';
                saveTrdChange(data).then(res=>{
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
                
                this.price = this.row.signPrice;// 签约单价
                this.totalprice = this.row.signTotalAmount;// 签约总价
                this.isBroken = this.row.underLowestFlag?'是':'否';// 是否破底
                this.totalDiscount = this.row.discountAmount;// 总折扣
                this.remark = this.row.remark;// 备注
                
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