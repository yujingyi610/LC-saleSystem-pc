<template>
	<div>
		<!-- 起诉弹框 -->
		<el-dialog title="起诉" :visible.sync="Flag" width="900px" v-if="Flag">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">合同信息</span>
				</div>
				<el-form :model="contractForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房号:">{{contractForm.houseFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户名称:">{{contractForm.customName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="合同金额:">{{contractForm.contractAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="已收金额:">{{contractForm.receivedAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="未收金额:">{{contractForm.unreceivedAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
			</el-card>
            <el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">起诉信息</span>
				</div>
				<el-form :model="indictForm">
                    <el-form-item label="立案受理日期:">
                        <el-date-picker v-model="indictForm.datOfFiling" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input type="textarea" v-model="indictForm.prosecuteRemark"></el-input>
                    </el-form-item>
                </el-form>
			</el-card>
            <el-card class="box-card"
                v-loading="loading"
                element-loading-text="上传中，请稍后..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <div slot="header" class="clearfix">
                    <span class="title">立案通知书</span>
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
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="handleSave">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
// import {  } from "@/api/pages/mainPage/financialManagement/receivable";
export default {
  watch: {},
  data() {
    return {
        Flag: false,
        contractForm: {// 合同信息
            houseFullName: "",
            customName: '',
            contractAmount: '',
            receivedAmount: '',
            unreceivedAmount: '',
        },
        indictForm: {// 起诉信息
            datOfFiling: "",
            prosecuteRemark: ""
        },
        accessoryTable: [],
        commonResources: [],
        upLoadData: {
            bussinessType: "project"
        },
        loading: false,
        paymentId: '',
        balanceId: '',
        formCode: '',
    };
  },
  methods: {
    show(info) {
        console.log(info)
        this.Flag = true;
      this.contractForm.houseFullName = '';
      this.contractForm.customName = '';
      this.contractForm.contractAmount = '';
      this.contractForm.receivedAmount = '';
      this.contractForm.unreceivedAmount = '';
        this.indictForm = {// 起诉信息
            datOfFiling: "",
            prosecuteRemark: ""
        }
      if( info ){
            if( !info.trdSignForm ){
                this.$message.error('未找到该签约单！');
                return
            }
            if( info.finBalanceForm ){
                this.contractForm.houseFullName = info.finBalanceForm.houseFullName;// 房号
                this.contractForm.customName = info.customName;// 客户姓名
                this.balanceId = info.finBalanceForm.id;
            }else{
                this.contractForm.houseFullName = info.houseFullName;
                this.contractForm.customName = info.customName;// 客户姓名
                this.balanceId = info.balanceId;
            }
            if( info.finPaymentPlan ){
                this.contractForm.receivedAmount = info.finPaymentPlan.receivedAmount;// 已收金额
                this.contractForm.unreceivedAmount = info.finPaymentPlan.unreceivedAmount;// 未收金额
                this.paymentId = info.finPaymentPlan.id;
            }else{
                this.contractForm.receivedAmount = info.receivedAmount;// 已收金额
                this.contractForm.unreceivedAmount = info.unreceivedAmount;// 未收金额
                this.paymentId = info.paymentId;
            }
            
            this.contractForm.contractAmount = info.trdSignForm.contractAmount;// 合同金额
            
            
            
            
            this.formCode = info.trdSignForm.signCode;
            this.Flag = true;
            if( info.finReceivableProsecute ){
                this.indictForm.datOfFiling = info.finReceivableProsecute.datOfFiling;
                this.indictForm.prosecuteRemark = info.finReceivableProsecute.prosecuteRemark;
                this.id = info.finReceivableProsecute.id;
            }
      }
      
    },
    handleUpDateSuccess(response, file, fileList) {
      // 文件上传
       ;
      this.loading = false;
      if (response.status === 200) {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        response.data.map(item => {
          this.commonResources.push({
            fileUrl: item.fileUrl,
            resourceId: item.id
          });
          this.accessoryTable.push(item);
        });

         ;
      } else {
        this.$message.error(res.message);
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
    beforeAvatarUpload(file) {
      // 上传前判断文件大小
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isLt2M;
    },
    handleUpLoadFile(row) {
      // 下载附件
      window.open(row.fileUrl, "_blank");
    },
    handleDelFile(index) {
      // 删除
      this.accessoryTable.splice(index, 1);
      this.commonResources.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功！"
      });
    },
    handleSave() {
      // 保存
      this.Flag = false;
    }
  }
};
</script>

<style scoped>
</style>