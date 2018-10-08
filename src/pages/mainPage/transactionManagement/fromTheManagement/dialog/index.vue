<template>
    <div>
        <el-form :model="row">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="项目名称">{{row.projectName}}</el-form-item>
                    <el-form-item label="客户手机">{{row.tel}}</el-form-item>
                    <el-form-item label="证件类型">{{row.certificateName}}</el-form-item>
                    <el-form-item label="置业顾问">{{row.propertyConsultName}}</el-form-item>
                    <el-form-item label="收款方式">{{row.receiptMethod}}</el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="推盘批次">{{row.batchCode}}</el-form-item>
                    <el-form-item label="客户名称">{{row.customName}}</el-form-item>
                    <el-form-item label="证件号码">{{row.certificateNo}}</el-form-item>
                    <el-form-item label="联系方式">{{row.propertyConsultTel}}</el-form-item>
                    <el-form-item label="应收意向金">{{row.raiseAmount}}</el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div v-if="table && row.receiptMethod !== '第三方收款'">
            <span class="title">付款情况</span>
            <el-table :data="table" border style="width: 100%">
                <el-table-column prop="paymentTypeName" label="房款类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="receivableAmount" label="应收金额（元）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="receivedAmount" label="已收金额（元）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unreceivedAmount" label="未收金额（元）" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    row: Object
  },
  data() {
      return{
          table: null
      }
  },
  created() {
      
      if( this.row.trdTradePayment ){
          this.table = [];
          this.table.push(this.row.trdTradePayment)
          this.table[0].receivedAmount = this.table[0].receivedAmount || 0;
          this.table[0].unreceivedAmount = this.table[0].unreceivedAmount == null?this.table[0].receivableAmount:this.table[0].unreceivedAmount;

      }
      
  }
};
</script>

<style scoped>
.title {
  float: left;
  font-size: 12px;
  width: 100%;
}
</style>