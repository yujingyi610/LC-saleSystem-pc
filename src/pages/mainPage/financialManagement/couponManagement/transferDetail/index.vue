<template>
  <div id="trandetail">
    <div class="dialog-container">
      <h3>转让人</h3>
      <el-form :inline="true" :model="formDialog" class="demo-form-inline">
        <el-form-item label="姓  名：">
          <el-input v-model="formDialog.origUserRealName" placeholder="转让人姓名" suffix-icon="el-icon-search" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formDialog.origCertificateNo" placeholder="转让人身份证号" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="formDialog.origTel" placeholder="转让人手机号" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-container">
      <h3>受让人</h3>
      <el-form :inline="true" :model="formDialog" class="demo-form-inline">
        <el-form-item label="姓  名：">
          <el-input v-model="formDialog.destUserRealName" placeholder="受让人姓名" suffix-icon="el-icon-search" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="formDialog.destCertificateNo" placeholder="受让人身份证号" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="formDialog.destTel" placeholder="受让人手机号" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-container">
      <h3>经办人</h3>
      <el-form :inline="true" :model="formDialog" class="demo-form-inline">
        <el-form-item label="经办人：">
          <el-input v-model="formDialog.operatorUserRealName" placeholder="经办人" style="width:173px;" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="申请日期：">
          <el-input v-model="formDialog.applyDate" readonly="readonly" suffix-icon="el-icon-date"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="padding-top:20px;position:relative;">

      <el-form :inline="true" :model="formDialog" class="demo-form-inline">
        <el-form-item label="备   注：">
          <el-input v-model="formDialog.remark" placeholder="备注" style="width:173px;" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="voucherTable" tooltip-effect="dark" style="width: 100%" border show-summary>
        <el-table-column prop="ticketCode" label="券号"></el-table-column>
        <el-table-column prop="companyName" label="发放公司"></el-table-column>
        <el-table-column prop="beforeAmount" label="可转金额"></el-table-column>
        <el-table-column prop="remainAmount" label="转让金额" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="dialog-container" style="position: relative;">
      <h3>附件信息</h3>
      <el-table :data="fileTable" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="fileSize" label="附件大小"></el-table-column>
        <el-table-column prop="uploader" label="上传人"></el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-container">
      <h3>审批记录</h3>
    </div>
  </div>
</template>

<script>
  import { getTransferDetailById } from "@/api/pages/mainPage/financialManagement/valueVoucher/index.js"
    export default {
      props:['ticketId'],
      watch:{
        ticketId:function(){
          let that = this;
          let params = {
            ticketTranId:this.ticketId
          }
          getTransferDetailById(params).then(function(res){
              
            that.formDialog = res.data;
            that.voucherTable = res.data.ticketTranItemList;
          });
        },
      },
       data(){
         return{
           name:'转让单详情组件',
           voucherTable:[],
           fileTable:[],
           formDialog:{},
         }

       },
      created:function(){
        let that = this;
        let params = {
          ticketTranId:this.ticketId
        }
        getTransferDetailById(params).then(function(res){
           ;
          that.formDialog = res.data;
          that.voucherTable = res.data.ticketTranItemList;
        });
      },

    }
</script>

<style scoped>
  #trandetail{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .itemBtn{
    color:#4DBE61;
    font-size:12px;
  }
  .resetHeight .dialogInput{
    height:26px;
    line-height:26px;
  }
</style>
