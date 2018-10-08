<template>
  <div class="height440">
    <el-container class="height100">
      <el-aside width="500px" class="right_bottom_btn_wrap height100">
        <el-card class="box-card nopadding" style="height: 400px;">
          <div slot="header" class="clearfix">
            <span>导入认筹</span>
          </div>
          <div class="text item height100">
            <el-container style="height: 400px;">
              <el-aside width="150px" style="border-right: 1px solid #e5e5e5">
                <el-table ref="singleTable" :data="batchList" highlight-current-row @current-change="handleGetRaiseByBatch" :show-header='false' style="width: 100%">
                  <el-table-column property="batchName"></el-table-column>
                </el-table>
              </el-aside>
              <el-main style="padding: 0">
                <el-table ref="multipleTable" :data="releasesUserList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" height="360">
                  <el-table-column type="selection" width="30" :selectable="handleSelectable"></el-table-column>
                  <el-table-column prop="customName" label="姓名" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tel" label="电话" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="raiseCode" label="认筹号" width="120" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-main>
            </el-container>
          </div>
        </el-card>
        <el-button type="success" class="right_bottom_btn" @click="handleSaveRaise">添加到本次推盘</el-button>
      </el-aside>
      <el-main style="padding: 0" class="right_bottom_btn_wrap">
        <el-card class="box-card nopadding nowReleasesUserList">
          <div slot="header" class="clearfix">
            <span>本次开盘认筹列表</span>
          </div>
          <div class="text item height100">
            <el-table ref="multipleTable" :data="nowReleasesUserList" tooltip-effect="dark" style="width: 100%" @selection-change="handleNowSelectionChange">
              <el-table-column type="selection" width="30" :selectable="handleNowSelectable"></el-table-column>
              <el-table-column prop="raiseForm.customName" label="姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="raiseForm.tel" label="电话" show-overflow-tooltip></el-table-column>
              <el-table-column prop="raiseForm.raiseCode" label="认筹号" width="120" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </el-card>
        <div class="right_bottom_btn">
          <el-button type="success" @click="handleGetSignExport">导出所有认筹</el-button>
          <el-button type="success" @click="handleDeleteRaise">移除</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  getSignExport,
  getSignListBath,
  getSignListsign,
  getRaiseByBatch,
  deleteSign,
  saveSign
} from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      batchList: [],
      currentRow: null, // 认筹列表中选中的认筹
      releasesUserList: [],
      multipleSelection: [], // 选中的用户
      nowReleasesUserList: [],
      removeIds: ""
    };
  },
  methods: {
    //通过项目ID获取批次信息
    handleGetSignListBath() {
      let params = {
        batchId: this.row.id,
        projectId: this.row.projectId
      };
      getSignListBath(params).then(res => {
        if (res.status == 200) this.batchList = res.data;
        else this.batchList = [];
      });
    },
    //通过批次ID获取认筹列表
    handleGetRaiseByBatch(val) {
       
      if (val != undefined && val != null && val.id != null)
        getRaiseByBatch({ batchId: val.id })
          .then(res => {
             
            if (res.status == 200) {

              if (res.data.length != 0){
                if( this.nowReleasesUserList.length != 0 ){
                  res.data.map(rasie => {
                    this.nowReleasesUserList.map(rels => {
                      
                      if (rels.raiseForm.raiseCode !== rasie.raiseCode) {
                        rasie.sel = 1;
                      }else{
                        rasie.sel = 0;
                      }
                        
                    });
                  });
                }else{
                  res.data.map(rasie => {
                        rasie.sel = 1;
                  });
                }
                this.releasesUserList = res.data;
              }else{
                this.releasesUserList = [];
              }
            }else{
              this.releasesUserList = [];
            }
          })
    },
    handleCurrentChange(val) {
      // 认筹列表单选
      this.currentRow = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.map(res => {
        let data = {
          batchCode: this.row.batchCode,
          batchId: this.row.id,
          raiseCode: res.raiseCode,
          raiseId: res.id
        };
        this.multipleSelection.push(data);
      });
    },
    handleNowSelectionChange(val) {
       
      this.removeIds = "";
      val.map(res => {
        this.removeIds += "," + res.id;
      });
      console.log(this.removeIds)
      if (this.removeIds.length > 0)
        this.removeIds = this.removeIds.substring(1);
    },
    handleSaveRaise() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "error",
          message: "请选择需要添加的认筹信息!"
        });
        return;
      }

      saveSign(this.multipleSelection).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.$message({
          type: "success",
          message: "添加的认筹信息成功!"
        });
        this.handleSelectNow();
      });
    },
    handleDeleteRaise() {
      console.log(this.removeIds)
      if (this.removeIds.length == 0) {
        this.$message({
          type: "error",
          message: "请选择需要移除的认筹信息!"
        });
        return;
      }

      deleteSign(this.Qs.stringify({ signSettingIds: this.removeIds })).then(
        res => {
          if (res.status != 200) {
            this.$message({
              type: "error",
              message: res.message
            });
            return;
          }
          this.$message({
            type: "success",
            message: "移除的认筹信息成功!"
          });
          this.handleSelectNow();
        }
      );
    },
    handleGetSignExport() {
      window.location.href = "/api/project/elecOpen/elec/sign/setting/export?batchId="+this.row.id;
      // getSignExport({ batchId: this.row.id }).then(res => {
      //   let blob = new Blob([res], { type: "application/x-xls;charset=utf-8" });
      //   let objectUrl = URL.createObjectURL(blob);
      //   window.location.href = objectUrl;
      // });
    },
    handleSelectNow() {
      getSignListsign({ batchId: this.row.id }).then(res => {
         
        if (res.status == 200) this.nowReleasesUserList = res.data;
      });
    },
    handleSelectable(val, index) {
      console.log(val.sel)
      return val.sel;
    },
    handleNowSelectable(val, index) {
      if (val.raiseForm.batchCode == this.row.batchCode) return 0;
      return 1;
    }
  },
  created() {
    this.handleGetSignListBath();
    this.handleSelectNow();
  }
};
</script>

<style scoped>
.height440 {
  height: 440px;
}
.nowReleasesUserList {
  height: 400px;
  overflow: auto;
}
</style>