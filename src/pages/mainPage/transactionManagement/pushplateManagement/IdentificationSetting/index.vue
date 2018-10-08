<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="推盘批次名称">
        <el-input v-model="row.batchName" :disabled="'disabled'"></el-input>
      </el-form-item>
      <el-form-item label="是否开启认筹">
        <el-radio-group v-model="form.raiseStatus" size="medium">
          <el-radio :label="'on'">开始认筹</el-radio>
          <el-radio :label="'off'">结束认筹</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收款方式">
        <el-select v-model="form.receiptMethod">
          <el-option v-for="(item, index) in paymentTermOption" :key="index" :label="item.value" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认筹金额">
        <el-input v-model.number="form.amount" type="number">
          <i slot="suffix" style="font-style: normal; left: -20px; position: absolute; font-size: 12px;">元</i>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRaiseSettingDto } from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      form: {
        raiseStatus: "", // 是否开启认筹
        raiseStatusText: "结束认筹", //是否开启认筹文本
        receiptMethod: "", // 收款方式
        amount: 0 // 认筹金额
      },
      paymentTermOption: [
        {
          value: "第三方收款"
        },
        {
          value: "本公司收款"
        }
      ]
    };
  },
  methods: {
    handleGetRaiseSettingDto() {
      let data = { pushBathId: this.row.id };
      getRaiseSettingDto(data)
        .then(res => {
          if (res.status === 200 && res.data !== null) this.form = res.data;
          else {
            this.form.raiseStatus = "";
            this.form.raiseStatusText = "";
            this.form.receiptMethod = "";
            this.form.amount = 0;
          }
        })
        .then(_ => {
          this.form.batchId = this.row.id;
          this.form.batchCode = this.row.batchCode;
        });
    }
  },
  created() {
    this.handleGetRaiseSettingDto();
  },
  watch: {
    "form.raiseStatus": function(e) {
      this.form.raiseStatusText = e === "on" ? "开始认筹" : "结束认筹";
    }
  }
};
</script>

<style scoped>
</style>