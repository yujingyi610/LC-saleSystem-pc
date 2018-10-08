<template>
  <div>
    <el-form ref="form" :model="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="城市公司：">{{form.projectCityName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称：">{{form.projectName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="推盘批次：">{{form.batchCode}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户手机：">
            <el-input v-model="form.tel" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-select v-model="form.certificateName">
              <el-option v-for="(item, index) in cardTypeOption" :key="index" :label="item.dictName" :value="item.dictName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="置业顾问：">{{form.propertyConsultName}}</el-form-item>
          <el-form-item label="收款方式：">{{form.receiptMethod}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称：">
            <el-input v-model="form.customName"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="form.certificateNo"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">{{form.propertyConsultTel}}</el-form-item>
          <el-form-item label="应收意向金：">{{form.raiseAmount}}元</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getCityList,
  getPrjByCityId,
  getBatchByPorject,
  getCustomerInfo,
  getCustomerLabel
} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
import { getRaiseSettingDto } from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      /*********顶部搜索form数据***********/
      cityCompanyOption: [],
      projectOption: [],
      batchOption: [],
      form: {
        // 头部搜索Form表单
        cityCompanyId: "", // 城市公司ID
        projectId: "", // 项目ID
        batchId: "", // 推盘批次
        userName: "", // 客户名称
        tel: "", // 客户手机
        receiptMethod: "无",
        raiseAmount: 0,
        certificateNo: "",
        certificateType: "",
        customId: "",
        customName: "",
        nicheId: "",
        propertyConsultId: "",
        propertyConsultName: "",
        //目前缺下面得
        certificateName: "",
        propertyConsultTel: "",
        sex: ""
      },
      cardTypeOption: [],// 选择证件类型下拉数据
    };
  },
  methods: {
    handleGetCustomerLabel() {
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
                this.cardTypeOption.push({
                    dictName: label.itemValue,
                    dictType: label.itemCode
                })
            })
        }
      });
    }
  },
  created() {
    this.handleGetCustomerLabel();
    this.form = this.row;
    console.log(this.form)
    
  }
};
</script>

<style scoped>
.title {
  font-size: 14px;
  float: left;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  margin-bottom: 20px;
}
</style>