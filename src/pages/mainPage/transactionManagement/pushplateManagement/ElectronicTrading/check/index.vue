<template>
    <div class="height440">
        <el-container class="height100">

            <el-main style="padding: 0" class="right_bottom_btn_wrap">
                <div class="card">
                    <div class="clearfix header">
                        <span style="float: left">签到信息</span>
                        <span style="float: right; font-size: 12px">总认筹人数：
                            <span style="color: #E60012">{{allPeople}}</span>
                        </span>
                    </div>
                    <el-tabs type="card" style="float: left; width: 100%;">
                        <el-tab-pane label="已签到">
                            <is-check :data="signList"></is-check>
                        </el-tab-pane>
                        <el-tab-pane label="未签到">
                            <not-check :data="signList"></not-check>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="right_bottom_btn">
                    <el-button type="success" @click="handleGetSignExportSignInfo('signIn')">导出已签到</el-button>
                    <el-button type="success" @click="handleGetSignExportSignInfo('noSignIn')">导出未签到</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import isCheck from "./isCheck"; // 已签到
import NotCheck from "./NotCheck"; // 未签到
import {
  getSignListSignInfos,
  getSignExportSignInfo
} from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  components: {
    isCheck,
    NotCheck
  },
  data() {
    return {
      isCheck: true, // 判断是否签到
      allPeople: 0, // 总认筹人数
      signList: {}
    };
  },
  methods: {
    //获取签到信息
    handleGetSignListSignInfos() {
      this.signList = {}
      getSignListSignInfos({ batchId: this.row.id }).then(res => {
        this.signList = res.data;
        this.allPeople = res.data.signInSum + res.data.raiseSum;
      });
      console.log(this.signList);
    },
    //下载签到表
    handleGetSignExportSignInfo(signInType) {
      window.location.href = "/api/project/elecOpen/elec/sign/exportSignInfo?batchId="+this.row.id+"&signInType="+signInType;
      // getSignExportSignInfo({
      //   batchId: this.row.id,
      //   signInType: signInType
      // }).then(res => {
      //   let blob = new Blob([res], { type: "application/x-xls" });
      //   let link = document.createElement("a");
      //   link.href = window.URL.createObjectURL(blob);
      //   link.click();
      // });
    }
  },
  created() {
    this.handleGetSignListSignInfos();
  }
};
</script>

<style scoped lang="scss">
.form {
  margin-bottom: 20px;
}
.card {
  overflow: hidden;
  padding: 0 20px;
  .header {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
    // overflow: hidden;
  }
}
</style>