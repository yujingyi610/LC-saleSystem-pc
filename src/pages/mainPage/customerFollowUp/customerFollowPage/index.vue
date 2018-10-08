<template>
  <div class="customer-follow-page background-m">
    <div class="envelope-box">
      <div class="envelope-title search-box" style="overflow: initial;">
        <!-- 搜索条件 -->
        <searchForm jurisdiction="jurisdiction" @clearTableData="clearTableData" @handleSearch="handleSearch" v-model="ruleForm"></searchForm>
      </div>
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green mr-20">客户列表</span>
          <!-- <template v-for="(item,index) in customerListSorting">
            <span @click="handleSort(item,index)" class="m-btn mr-10" :key="it.id">
              {{item.text}}
              <i :class="{green : customerListStatus === item.status[0]}" class="el-icon-caret-top icon-top"></i>
              <i :class="{green : customerListStatus === item.status[1]}" class="el-icon-caret-bottom icon-bottom"></i>
            </span>
          </template> -->
          <div class="fr">
            <div class="fl" style="line-height:32px;">
              <el-button v-has="'cst:custom:sign'" type="primary" @click="handleOperation('khfp')">客户分配</el-button>
              <el-button v-has="'cst:custom:add'" type="primary" @click="handleCustomerAdd">新增客户</el-button>
              <el-button v-has="'cst:custom:merge'" type="primary" @click="handleOperation('hbsj')">客户合并</el-button>
              <el-button v-has="'cst:custom:export'" type="primary" @click="exportCustomExcel">客户导出</el-button>
           </div>
          </div>
        </div>
        <div class="table-box">
          <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading='loading'
          >
          <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
            <el-table-column prop="name" label="客户"></el-table-column>
            <el-table-column prop="tel" label="电话" width="100"></el-table-column>
            <el-table-column prop="buyStage" label="购房阶段"></el-table-column>
            <el-table-column prop="cstLevel" label="客户级别"  width="50" ></el-table-column>
            <el-table-column prop="visitCount" label="到访情况">
                <template  slot-scope="scope">
                  <span v-if="scope.row.visitCount ===0">未到访</span>
                  <span v-else-if="scope.row.visitCount ===1">新访</span>
                  <span v-else>老访</span>
                </template>
            </el-table-column>
            <el-table-column prop="visitCount" label="已到访次数"></el-table-column>
            <el-table-column prop="lastVisitTime" label="末次到访"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="lastFollowContent" label="末次跟进情况"></el-table-column>
            <el-table-column prop="propertyConsultName" label="置业顾问"></el-table-column>
            <el-table-column prop="roleName" label="操作" width="150px">
              <template slot-scope="scope">
                <div v-if="scope.row.propertyConsultName==='--'">
                  <el-button  v-has="'cst:custom:fllow'" @click="handleFollowUpFen(scope.row)" type="text">分配</el-button>
                  <el-button v-has="'cst:custom:view'" @click="handleCustomerSee(scope.row)" type="text">查看</el-button>
                </div>
                <div v-else-if="scope.row.hadFillType==='1'&&scope.row.propertyConsultName!='--'">
                  <el-button v-has="'cst:custom:view'" @click="handleCustomerEdit(scope.row)" type="text">完善信息</el-button>
                </div>
                <div v-else-if="scope.row.hadFillType==='2'&&scope.row.propertyConsultName!='--'">
                  <el-button  v-has="'cst:custom:fllow'" @click="handleFollowUpRecord(scope.row)" type="text">跟进</el-button>
                  <el-button v-has="'cst:custom:view'" @click="handleCustomerSee(scope.row)" type="text">查看</el-button>
                </div>
                <div v-else-if="scope.row.hadFillType==='3'&&scope.row.propertyConsultName!='--'">
                  <el-button v-has="'cst:custom:add'" type="primary" @click="handleCustomerAdd">新增客户</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
         <el-pagination
          class="handPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,30,40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </div>
    </div>
    <!-- 客户分配相关 浮层 -->
    <operationDialog @closeChild = 'initTableList' ref="operationDialog"></operationDialog>
    <!-- 新增客户弹出框 -->
    <nesCustomers ref="nesCustomers" @closeChild = 'initTableList'></nesCustomers>
    <!-- 跟进 弹窗  -->
    <followUpAddDialog @closeChild = 'initTableList' ref="followUpAddDialog"></followUpAddDialog>
    <!-- 直接分配弹窗 -->
    <distributionAdvisorDialog  ref="distributionAdvisorDialog" @closeChild = 'initTableList'></distributionAdvisorDialog>
  </div>
</template>

<script>
import "@/assets/styles/reset.scss";
// 获取请求接口
import {
  /* dictionaryEntrySearchOptions,
    dictionaryEntryAddOrEdit, */
  getCustomerPaging,
  outPut //上传筛选
} from "@/api/pages/mainPage/customerFollowUp";

import searchForm from "./searchForm.vue";
import operationDialog from "./dialog/operationDialog.vue"; // 左右切换 dialog
import nesCustomers from "./dialog/newCustomers.vue"; // 新增客户 dialog
import followUpAddDialog from "./dialog/followUpAddDialog.vue"; // 跟进 dialog
import distributionAdvisorDialog from "./distributionAdvisorDialog.vue"; // 客户分配 dialog
export default {
  components: {
    searchForm,
    operationDialog,
    nesCustomers,
    followUpAddDialog,
    distributionAdvisorDialog
  },
  watch: {
    ruleForm() {
    }
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        // 选择项目
        selectionProject: "",

        projectOptions: [],
        //项目id
        projectId: "",
        // 姓名/电话
        nameAndPhone: "",
        // 客户级别
        customerLevel: [],
        // 购房阶段
        purchaseStage: "",
        // 来访时间
        visitTime: "",
        // 来访时间 开始
        visitTimeStart: "",
        // 来发时间 结束
        visitTimeEnd: "",
        // 创建时间
        creationTime: "",
        // 创建时间 开始
        creationTimeStart: "",
        // 创建时间 结束
        creationTimeEnd: "",
        // 跟进时间
        followUpTime: "",
        // 跟进时间 开始
        followUpTimeStart: "",
        // 跟进时间 结束
        followUpTimeEnd: "",
        // 未跟进情况
        failureToFollowUp: "",
        // 未跟进情况 开始
        failureToFollowUpStart: "",
        // 未跟进情况 结束
        failureToFollowUpEnd: "",
        // 即将生日
        forthcomingBirthday: "",
        // 即将生日 开始
        forthcomingBirthdayStart: "",
        // 即将生日 结束
        forthcomingBirthdayEnd: "",
        // 业态
        typeOfOperation: [],
        // 需求面积
        demandArea: [],
        // 居室数量
        numberOfLivingRooms: [],
        // 朝向
        orientation: [],
        // 商机状态
        businessOpportunityState: "",
        // 置业顾问
        propertyConsultant: "",
        // 是否公客
        isMaleGuests: "",
        //获取置业顾问list
        propertyConsultantList: []
      },
      //导出筛选条件
      outPut: {},
      // 客户列表 当前状态
      customerListStatus: "cjBottom",
      // 客户列表 排序
      customerListSorting: [
        { text: " 到访时间", status: ["dfTop", "dfBottom"] },
        { text: " 跟进时间", status: ["gjTop", "gjBottom"] },
        { text: " 创建时间", status: ["cjTop", "cjBottom"] }
      ],

      // table list
      tableData: [],
      // 数据总数
      total: 0,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10
    };
  },
  mounted() {
  },

  methods: {
    //清空表格数据
    clearTableData(){
      this.tableData = [];
      this.total = 0;
    },
    // 点击搜索
    handleSearch(data) {
      this.ruleForm = data;
      //this.upDataTable()
      this.initTableList();
    },
    /* ---------------------表格相关------------------------ */

    //更新list数据
    initTableList() {

      if (this.ruleForm) {
        //获取客户等级
        let customerLevelStr = "";
        if (this.ruleForm.customerLevel.length === 1) {
          customerLevelStr = this.ruleForm.customerLevel[0];
        }
        if (this.ruleForm.customerLevel.length > 1) {
          customerLevelStr = this.ruleForm.customerLevel.join(",");
        }
        //获取业态
        let typeOfOperationStr = this.ruleForm.typeOfOperation.join(",");
        //需求面积
        let demandAreaStr = this.ruleForm.demandArea.join(",");
        //居室查询
        let numberOfLivingRoomsStr = this.ruleForm.numberOfLivingRooms.join(
          ","
        );
        //朝向
        let orientationStr = this.ruleForm.orientation.join(",");

        let data = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          //项目id
          projectId: this.ruleForm.selectionProject,
          //姓名或者电话货吗
          nameOrTel: this.ruleForm.nameAndPhone,
          //客户等级
          customLevel: customerLevelStr,
          //到访时间
          visitTime: this.ruleForm.visitTime,
          visitStartTime: this.ruleForm.visitTimeStart,
          visitEndTime: this.ruleForm.visitTimeEnd,
          //创建时间
          createTime: this.ruleForm.creationTime,
          createStartTime: this.ruleForm.creationTimeStart,
          createEndTime: this.ruleForm.creationTimeEnd,
          //跟进时间
          followTime: this.ruleForm.followUpTime,
          followStartTime: this.ruleForm.followUpTimeStart,
          followEndTime: this.ruleForm.followUpTimeEnd,
          //未跟进时间
          noFollowTime: this.ruleForm.failureToFollowUp,
          noRecordStartTime: this.ruleForm.failureToFollowUpStart,
          noRecordEndTime: this.ruleForm.failureToFollowUpEnd,
          //生日
          birthdayTime: this.ruleForm.forthcomingBirthday,
          birthdayStartTime: this.ruleForm.forthcomingBirthdayStart,
          birthdayEndTime: this.ruleForm.forthcomingBirthdayEnd,
          //业态
          format: typeOfOperationStr,
          //需求面积
          needArea: demandAreaStr,
          //居室查询
          roomCount: numberOfLivingRoomsStr,
          //置业顾问id
          propertyConsultId: this.ruleForm.propertyConsultant,
          //列表类型
          listType: "normal",
          //朝向
          orientation: orientationStr,
          //购房阶段
          buyStage: this.ruleForm.purchaseStage,
          //状态
          //status：
          //是否公客
          isCommon: this.ruleForm.isMaleGuests
          //排序方式
          //是否有效
          //APP商机合并二级列表查询条件——排除所选客户
          //APP员工关怀查询条件——1-今日生日111111111111
        };

        //赋值到导出的筛选条件
        this.outPut = data;
        this.loading = true;
        getCustomerPaging(data).then(res => {
          if (res.status === 200) {
             ;
            this.tableData = res.data.list;
            for (let i = 0; i < this.tableData.length; i++) {
              for (let k in this.tableData[i]) {
                if (
                  this.tableData[i][k] === "" ||
                  this.tableData[i][k] === null
                ) {
                  this.tableData[i][k] = "--";
                }
              }
            }
            this.total = res.data.total;
            this.loading = false;
          }
        });
      }
    },
    // 表格页数 初始化
    tableInitChange() {
      if (this.currentPage === 1) {
        this.initTableList();
      } else {
        this.currentPage = 1;
      }
    },
    // 表格 size change
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTableList();
    },
    // 表格 点击分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initTableList();
    },
    /* ---------------------搜素相关------------------------ */

    /* ---------------------其他按钮操作 相关------------------------ */
    // 点击 客户分配 合并商机 导出
    handleOperation(type) {
      this.$refs.operationDialog.show(type);
    },
    //客户导出
    exportCustomExcel() {
      let data = this.outPut;
      /*delete data.pageSize;
      delete data.pageNum;*/
      let customerLevel = "";
      if(this.ruleForm.customerLevel.length == 1){
        customerLevel = this.ruleForm.customerLevel[0]
      }else if(this.ruleForm.customerLevel.length > 1){
        customerLevel = this.ruleForm.customerLevel.join(",")
      }
      if(this.tableData.length == 0 || this.tableData == null || this.tableData == ""){
        this.$confirm('当前筛选条件下无数据，无法进行客户导出！','提示',{type:'warning'}).then(function(){

        }).catch(function(){

        })
      }else{
        window.location.href = "/api/custom/custom/selectCustomAndTag/downlond?projectId="+this.ruleForm.selectionProject+"" +
          "&nameOrTel="+this.ruleForm.nameAndPhone+"&customLevel="+customerLevel+"" +
          "&visitTime="+this.ruleForm.visitTime+"&visitStartTime="+this.ruleForm.visitTimeStart+"&visitEndTime="+this.ruleForm.visitTimeEnd+"&createTime="+this.ruleForm.creationTime+"" +
          "&createStartTime="+this.ruleForm.creationTimeStart+"&createEndTime="+this.ruleForm.creationTimeEnd+"&followTime="+this.ruleForm.followUpTime+"" +
          "&followStartTime="+this.ruleForm.followUpTimeStart+"&followEndTime="+this.ruleForm.followUpTimeEnd+"" +
          "&noRecordTime="+this.ruleForm.failureToFollowUp+"&noRecordStartTime="+this.ruleForm.failureToFollowUpStart+"&noRecordEndTime="+this.ruleForm.failureToFollowUpEnd+"" +
          "&birthdayTime="+this.ruleForm.forthcomingBirthday+"&birthdayStartTime="+this.ruleForm.forthcomingBirthdayStart+"&birthdayEndTime="+this.ruleForm.forthcomingBirthdayEnd+"" +
          "&format="+this.ruleForm.typeOfOperation.join(",")+"&needArea="+this.ruleForm.demandArea.join(",")+"&roomCount="+this.ruleForm.numberOfLivingRooms.join(",")+"&propertyConsultId="+this.ruleForm.propertyConsultant+"" +
          "&listType=normal&orientation="+this.ruleForm.orientation.join(",")+"&buyStage="+this.ruleForm.purchaseStage+"&isCommon="+this.ruleForm.isMaleGuests
      }
    },
    // 点击跟进记录
    handleFollowUpRecord(row) {
      let data = {
        customId: row.id,
        nicheId: row.nicheId
      };
      this.$refs.followUpAddDialog.show(data);
    },
    // 客户新增
    handleCustomerAdd() {
      this.$refs.nesCustomers.show();
    },
    handleCustomerEdit(row) {
      console.log((this.$route.fullPath))
      this.$router.push({
        path: "/mainPage/customerFollowUp/customerEdit",
        query: {
          id: row.id,
          type: "1",
          projectId: row.projectId,
          url: encodeURIComponent(this.$route.fullPath)
        }
      });
    },
    // 完善信息
    handleCustomerSee(row) {
       
      this.$router.push({
        path: "/mainPage/customerFollowUp/customerManagementView",
        query: {
          id: row.id,
          type: "1",
          projectId: row.projectId
        }
      });
    },
    //客户分配
    handleFollowUpFen(row) {
      this.$refs.distributionAdvisorDialog.show(row);
    },
    // 点击客户列表 排序
    handleSort(item, index) {
      let ind = item.status.indexOf(this.customerListStatus);
      // 默认选择倒叙 排序
      if (ind === -1) {
        this.customerListStatus = item.status[1];
      } else {
        this.customerListStatus = item.status[ind === 0 ? 1 : 0];
      }
    }
    /* ---------------------搜素相关------------------------ */
  }
};
</script>

<style lang="scss" scoped>
.customer-follow-page {
  .w-150 {
    width: 150px;
  }
  .m-btn {
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 5px 10px;
    padding-right: 26px;
    border-radius: 4px;
    position: relative;
  }
  .green {
    color: #007440 !important;
  }
  .icon-top {
    font-size: 16px;
    position: absolute;
    bottom: 9px;
    color: #ddd;
  }
  .icon-bottom {
    font-size: 16px;
    position: absolute;
    top: 9px;
    color: #ddd;
  }
}
.handPage {
  margin-top: 10px;
}
</style>
