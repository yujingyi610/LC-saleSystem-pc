<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="推盘批次名称">
        <el-input v-model="row.batchName" :disabled="'disabled'"></el-input>
      </el-form-item>
      <el-form-item label="定金">
        <el-input v-model.number="form.dowpayAmount" type="number">
          <i slot="suffix" style="font-style: normal; left: -20px; position: absolute; font-size: 12px;">元</i>
        </el-input>
      </el-form-item>
      <el-form-item label="签约周期">
        <el-input v-model.number="form.signCycle" type="number">
          <i slot="suffix" style="font-style: normal; left: -20px; position: absolute; font-size: 12px;">天</i>
        </el-input>
      </el-form-item>
      <el-form-item label="认筹金是否可转定金">
        <el-radio-group v-model="form.transFlag" size="medium">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSubscripeSettingDto } from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      form: {
        dowpayAmount: "", // 定金
        signCycle: "", // 签约周期
        transFlag: 0 // 签约金是否转定金
      }
    };
  },
  methods: {
    handleGetSubscripeSettingDto() {
      let data = { pushBathId: this.row.id };
      getSubscripeSettingDto(data)
        .then(res => {
          if (res.status === 200 && res.data !== null) this.form = res.data;
        })
        .then(_ => {
          this.form.batchId = this.row.id;
          this.form.batchCode = this.row.batchCode;
        });
    }
  },
  created() {
    this.handleGetSubscripeSettingDto();
  }
};
</script>

<style scoped>
</style>