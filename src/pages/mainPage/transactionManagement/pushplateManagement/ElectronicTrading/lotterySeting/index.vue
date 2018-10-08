<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="每轮抽取个数">
        <el-input v-model.number="form.perRoundNum" type="number" @change="handleNum"></el-input>
        <el-button type="success" @click="handleSaveOrUpdateLotte">保存</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">认筹vip</span>
        <div style="float: right">
          <el-button type="success" @click="addVIP">新增</el-button>
        </div>
      </div>
      <div class="text item">
        <el-table :data="IdentificationVIPList" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="customName" label="客户姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tel" label="手机号码" show-overflow-tooltip></el-table-column>
          <el-table-column prop="raiseCode" label="认筹号码" show-overflow-tooltip></el-table-column>
          <el-table-column prop="batchCode" label="推盘批次" show-overflow-tooltip></el-table-column>
          <el-table-column label="抽中次序">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.edit" @click="scope.row.edit=true">{{scope.row.orderNum}}</el-button>
              <el-input type="text" v-else v-model="scope.row.orderNum" @blur="handleUpdateOrderNum(scope.row, scope.$index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handelDeleteVip(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="新增认筹VIP" :visible.sync="addVIPFlag" width="1100px" append-to-body>
      <p class="title">推盘批次：{{row.sort}}</p>
      <div class="form">
        <el-input placeholder="请输入验证信息" v-model="authentication"></el-input>
        <el-button type="success" @click="handleGetSignDto('certificateNo')">身份证验证</el-button>
        <el-button type="success" @click="handleGetSignDto('raiseCode')">认筹号验证</el-button>
        <el-button type="success" @click="handleGetSignDto('mobile')">手机号验证</el-button>
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">客户信息</span>
        </div>
        <div class="text item">
          <el-table :data="addIdentificationVIPList" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :selectable="handleAddSelectable"></el-table-column>
            <el-table-column prop="raiseCode" label="认筹号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customName" label="客户姓名" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tel" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateName" label="证件类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateNo" label="证件号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="raiseAmount" label="认筹金额" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="propertyConsultName" label="置业顾问" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="propertyConsultTel" label="顾问手机" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddVIP">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLotteSettingDto,
  getSignDto,
  deleteVip,
  saveOrUpdateLotte,
  batchSaveVip,
  updateOrderNum,
  deleteSign,
  saveSign
} from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      form: {
        batchId: this.row.id,
        perRoundNum: "" // 每轮抽取个数
      },
      IdentificationVIPList: [],
      addVIPFlag: false, // 控制新增vip弹框
      authentication: "", // 验证信息
      addIdentificationVIPList: [],
      multipleSelection: []
    };
  },
  methods: {
    handleNum() {// 验证每轮抽取个数
      if( this.form.perRoundNum <= 0 ){
        this.form.perRoundNum = 1;
      }
      this.form.perRoundNum = parseInt(this.form.perRoundNum)
    },
    addVIP() {
      // 点击新增按钮，打开新增vip弹框
      this.authentication = "";
      this.addIdentificationVIPList = [];
      this.addVIPFlag = true;
    },
    handleAddVIP() {
      // 保存新vip
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "error",
          message: "请选择需要添加的VIP"
        });
        return;
      }
      batchSaveVip(this.multipleSelection).then(res => {
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.$message({
          type: "success",
          message: "添加成功！"
        });
        this.addVIPFlag = false;
        this.handleGetLotteSettingDto();
      });
    },
    handleGetSignDto(type) {
      // 手机号验证
      let params = {
        batchId: this.row.id
      };
      if (type === "raiseCode") params.raiseCode = this.authentication;
      if (type === "mobile") params.mobile = this.authentication;
      if (type === "certificateNo") params.certificateNo = this.authentication;
      getSignDto(params).then(res => {
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        if( res.data.length === 0 ){
          this.$message.error('未找到认筹信息！');
          return
        }
        this.addIdentificationVIPList = res.data;
        
        this.addIdentificationVIPList.map(addVip => {
          this.$set(addVip, "sel", 1);
          this.IdentificationVIPList.map(vip => {
            if (addVip.raiseCode == vip.raiseCode) addVip.sel = 0;
          });
        });
      });
    },
    handleAddSelectable(val, index) {
      return val.sel;
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.map(l => {
        let lotte = {
          batchCode: this.row.batchCode,
          batchId: this.row.id,
          orderNum: 0,
          raiseCode: l.raiseCode,
          raiseId: l.id
        };
        this.multipleSelection.push(lotte);
      });
    },
    /************* 接口操作 ********************/
    handleGetLotteSettingDto() {
      getLotteSettingDto({ batchId: this.row.id }).then(res => {
         ;
        if (res.status === 200) {
          if (res.data.id != null) this.form.lotteSettingId = res.data.id;
          if (res.data.perRoundNum != null)
            this.form.perRoundNum = res.data.perRoundNum;
          this.IdentificationVIPList = res.data.lotteVipList;
          this.IdentificationVIPList.map(vip => {
            this.$set(vip, "edit", false);
            vip.customName = vip.raiseForm.customName;
            vip.tel = vip.raiseForm.tel;
          });
        }
      });
    },
    handleSaveOrUpdateLotte() {
      if (this.form.perRoundNum == "") {
        this.$message({
          type: "error",
          message: "请录入每轮抽取个数!"
        });
        return;
      }
      saveOrUpdateLotte(this.Qs.stringify(this.form)).then(res => {
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.handleGetLotteSettingDto();
      });
    },
    handleUpdateOrderNum(rel, index) {
      if( isNaN(rel.orderNum) || rel.orderNum <= 0 ){
        this.$message.error('次序必须为数字且大于0！');
        return
      }
      for( let i = 0, len = this.IdentificationVIPList.length; i < len; i++ ){
        if( i !== index && rel.orderNum == this.IdentificationVIPList[i].orderNum ){
          this.$message.error('次序不能重复！')
          return
        }
      }
      let data = {
        id: rel.id,
        orderNum: rel.orderNum
      };
      updateOrderNum(this.Qs.stringify(data)).then(res => {
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.handleGetLotteSettingDto();
      });
    },
    handelDeleteVip(rel) {
      deleteVip(this.Qs.stringify({ lotteVipId: rel.id })).then(res => {
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.handleGetLotteSettingDto();
      });
    }
  },
  created() {
    this.handleGetLotteSettingDto();
  }
};
</script>

<style scoped>
.title {
  font-size: 12px;
  color: #404040;
}
.form {
  margin: 20px 0;
}
</style>