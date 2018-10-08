<template>
  <div class="customer-follow-page background-m">
    <div class="envelope-box">
      <div class="envelope-title search-box" style="overflow: initial;">
        <!-- 搜索条件 -->
        <searchForm jurisdiction="jurisdiction" @handleSearch="handleSearch" v-model="ruleForm"></searchForm>
      </div>
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green mr-20">将流失</span>
          <!-- 排序 -->
          <!-- <template v-for="(item,index) in customerListSorting">
            <span @click="handleSort(item,index)" class="m-btn mr-10" :key="item.id">
              {{item.text}}
              <i :class="{green : customerListStatus === item.status[0]}" class="el-icon-caret-top icon-top"></i>
              <i :class="{green : customerListStatus === item.status[1]}" class="el-icon-caret-bottom icon-bottom"></i>
            </span>
          </template>     -->
        </div>
        <div class="table-box">
          <el-table
          :data="tableData"
          border
          style="width: 100%"
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
                  <el-button v-has="'wb:lost:view'" @click="handleCustomerSee(scope.row)" type="text">查看</el-button>                 
                </div>
                <div v-else-if="scope.row.hadFillType==='1'&&scope.row.propertyConsultName!='--'">
                  <el-button v-has="'wb:fllow:more'" @click="handleCustomerEdit(scope.row)" type="text">完善信息</el-button>
                </div>
                <div v-else-if="scope.row.hadFillType==='2'&&scope.row.propertyConsultName!='--'">
                  <el-button  v-has="'wb:lost:fllow'" @click="handleFollowUpRecord(scope.row)" type="text">跟进</el-button>
                  <el-button v-has="'wb:lost:view'" @click="handleCustomerSee(scope.row)" type="text">查看</el-button>
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
    <!-- 新增客户弹出框 -->
    <nesCustomers ref="nesCustomers" @closeChild = 'initTableList'></nesCustomers>
    <!-- 跟进 弹窗  -->
    <followUpAddDialog @closeChild = 'initTableList' ref="followUpAddDialog"></followUpAddDialog>
    <!-- 直接分配弹窗 -->
    <distributionAdvisorDialog  ref="distributionAdvisorDialog" @closeChild = 'initTableList'></distributionAdvisorDialog>
  </div>
</template>

<script>
  import '@/assets/styles/reset.scss';
  // 获取请求接口
  import {
    getCustomerPaging,
  } from '@/api/pages/mainPage/customerFollowUp'

import searchForm from '@/pages/mainPage/customerFollowUp/customerFollowPage/searchForm.vue'
import nesCustomers from '@/pages/mainPage/customerFollowUp/customerFollowPage/dialog/newCustomers.vue' // 新增客户 dialog
import followUpAddDialog from '@/pages/mainPage/customerFollowUp/customerFollowPage/dialog/followUpAddDialog.vue' // 跟进 dialog
import distributionAdvisorDialog from '@/pages/mainPage/customerFollowUp/customerFollowPage/distributionAdvisorDialog.vue' // 客户分配 dialog
  export default {
    components : {
      searchForm,
      followUpAddDialog,
      nesCustomers,
      distributionAdvisorDialog
    },
    watch : {
      ruleForm() {
        console.log(this.ruleForm);
      },
    },
    data() {
      return {
        ruleForm : {
                    
          // 选择项目
          selectionProject : '',
          
          projectOptions : [],
          //项目id
          projectId:'',
          // 姓名/电话
          nameAndPhone : '',
          // 客户级别
          customerLevel : [],
          // 购房阶段
          purchaseStage : '',
          // 来访时间
          visitTime : '',
          // 来访时间 开始
          visitTimeStart : '',
          // 来发时间 结束
          visitTimeEnd : '',
          // 创建时间
          creationTime : '',
          // 创建时间 开始
          creationTimeStart : '',
          // 创建时间 结束
          creationTimeEnd : '',
          // 跟进时间
          followUpTime : '',
          // 跟进时间 开始
          followUpTimeStart : '',
          // 跟进时间 结束
          followUpTimeEnd : '',
          // 未跟进情况
          failureToFollowUp : '',
          // 未跟进情况 开始
          failureToFollowUpStart : '',
          // 未跟进情况 结束
          failureToFollowUpEnd : '',
          // 即将生日
          forthcomingBirthday : '',
          // 即将生日 开始
          forthcomingBirthdayStart : '',
          // 即将生日 结束
          forthcomingBirthdayEnd : '',
          // 业态
          typeOfOperation : [],
          // 需求面积
          demandArea : [],
          // 居室数量
          numberOfLivingRooms : [],
          // 朝向
          orientation : [],
          // 商机状态
          businessOpportunityState : '',
          // 置业顾问
          propertyConsultant : '',
          // 是否公客
          isMaleGuests : '',
          //获取置业顾问list
          propertyConsultantList:[]
        },

        // 客户列表 当前状态
        customerListStatus : 'cjBottom',
        // 客户列表 排序
        customerListSorting : [
          {text : ' 到访时间' , status : ['dfTop','dfBottom']},
          {text : ' 跟进时间' , status : ['gjTop','gjBottom']},
          {text : ' 创建时间' , status : ['cjTop','cjBottom']},
        ],

        // table list
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      // this.initTableList()
    },
    methods : {
      // 点击搜索
      handleSearch(data) {
        console.log('data',data);
        this.ruleForm = data
        //this.upDataTable()
        this.initTableList()
      },
      /* ---------------------表格相关------------------------ */
      // 更新表格 数据
      // initTableList() {
      //   let data={
      //       pageNum:this.currentPage,   
      //       pageSize:this.pageSize,
      //       }   
      //       console.log('data',data)       
      //   getCustomerPaging(data).then((res) => {
      //       if(res.status === 200){ 
      //               
      //       this.tableData = res.data.list;
      //       this.total = res.data.total;               
      //       }
      //     });
      // },

      //更新list数据
      initTableList(){
         this.tableData = []
        console.log('ruleform',this.ruleForm)
        if(this.ruleForm){
          //获取项目id
            for(let i=0;i<this.ruleForm.projectOptions.length;i++){
              if(this.ruleForm.selectionProject===this.ruleForm.projectOptions[i].projectName){
                this.ruleForm.projectId=this.ruleForm.projectOptions[i].id
              }
             
           } 
            //获取客户等级
            let customerLevelStr = ''
            if(this.ruleForm.customerLevel.length === 1){
                 customerLevelStr = this.ruleForm.customerLevel[0]
            }
            if(this.ruleForm.customerLevel.length > 1){
                 customerLevelStr = this.ruleForm.customerLevel.join(',')
            }
            console.log('客户等级',customerLevelStr)
            //获取业态
           let typeOfOperationStr = this.ruleForm.typeOfOperation.join(',')
           //需求面积
           let demandAreaStr = this.ruleForm.demandArea.join(',')
           //居室查询
           let numberOfLivingRoomsStr = this.ruleForm.numberOfLivingRooms.join(',')
           //朝向
           let orientationStr = this.ruleForm.orientation.join(',')

           let data={
            pageNum:this.currentPage,   
            pageSize:this.pageSize,
            //项目id
            projectId:this.ruleForm.selectionProject,
            //姓名或者电话货吗
            nameOrTel:this.ruleForm.nameAndPhone,
            //客户等级
            customLevel:customerLevelStr,
            //到访时间
            visitTime:this.ruleForm.visitTime,
            visitStartTime:this.ruleForm.visitTimeStart,
            visitEndTime:this.ruleForm.visitTimeEnd,
            //创建时间
            createTime:this.ruleForm.creationTime,
            createStartTime:this.ruleForm.creationTimeStart,
            createEndTime:this.ruleForm.creationTimeEnd,
            //跟进时间
            followTime:this.ruleForm.followUpTime,
            followStartTime:this.ruleForm.followUpTimeStart,
            followEndTime:this.ruleForm.followUpTimeEnd,
            //未跟进时间
            noRecordTime:this.ruleForm.failureToFollowUp,
            noRecordStartTime:this.ruleForm.failureToFollowUpStart,
            noRecordEndTime:this.ruleForm.failureToFollowUpEnd,
            //生日
            birthdayTime:this.ruleForm.forthcomingBirthday,
            birthdayStartTime:this.ruleForm.forthcomingBirthdayStart,
            birthdayEndTime:this.ruleForm.forthcomingBirthdayEnd,
            //业态
            format:typeOfOperationStr,
            //需求面积
            needArea:demandAreaStr,
            //居室查询
            roomCount:numberOfLivingRoomsStr,
            //置业顾问id
            propertyConsultId:this.ruleForm.propertyConsultant,
            //列表类型
            listType:"willLose",
           //朝向
            orientation:orientationStr,
            //购房阶段
            buyStage:this.ruleForm.purchaseStage,
            //状态
            //status：
            //是否公客
            isCommon:this.ruleForm.isMaleGuests
            //排序方式
            //是否有效
            //APP商机合并二级列表查询条件——排除所选客户
            //APP员工关怀查询条件——1-今日生日

            }          
           getCustomerPaging(data).then((res) => {
            if(res.status === 200){ 
                    
            this.tableData = res.data.list;
            this.total = res.data.total; 
             for(let i =0;i<this.tableData.length;i++){
              for(let k in this.tableData[i]){
                if(this.tableData[i][k] ===''||this.tableData[i][k]===null){
                    this.tableData[i][k] = '--'
                }
              }
            }              
            }
          });


        }
      },
      // 表格页数 初始化
      tableInitChange() {
        if(this.currentPage === 1){
          console.log('2')
          this.initTableList();
        }else{
          this.currentPage = 1;
        }
      },
      // 表格 size change
      handleSizeChange(val) {
        this.pageSize = val;
        console.log('1')
        // this.tableInitChange();
      },
      // 表格 点击分页
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(this.currentPage)
        this.initTableList();
        console.log('3')
      },
      /* ---------------------搜素相关------------------------ */

      /* ---------------------其他按钮操作 相关------------------------ */
      // 点击跟进记录
      handleFollowUpRecord(row) {
        console.log('rowrow',row)
        let data = {
          customId:row.id,
          nicheId:row.nicheId
        }
        this.$refs.followUpAddDialog.show(data);
      },
      // 客户查看
      handleCustomerSee(row) {
        console.log('进入客户查看',row)
        this.$router.push({
          path : '/mainPage/workspaceManagement/custom/customerManagementView',
          query : {
            id : row.id,
            type:'3',
            projectId: this.ruleForm.selectionProject
          },
        });
      },
        //客户分配
      handleFollowUpFen(row){
          this.$refs.distributionAdvisorDialog.show(row);
      },
       //完善信息
      handleCustomerEdit(row){
        this.$router.push({
          path : '/mainPage/workspaceManagement/custom/customerEdit',
          query : {
            id : row.id,
            type:'3',
            projectId: this.ruleForm.selectionProject,
            url : encodeURIComponent(this.$route.fullPath),
          },
        });
      },
      // 客户新增
      handleCustomerAdd() {
        this.$refs.nesCustomers.show();       
      },
      // 点击客户列表 排序
      handleSort(item,index) {
        let ind = item.status.indexOf(this.customerListStatus);
        // 默认选择倒叙 排序
        if(ind === -1){
          this.customerListStatus = item.status[1];
        }else{
          this.customerListStatus = item.status[ind === 0 ? 1 : 0];
        }
      },
      /* ---------------------搜素相关------------------------ */
    },
  }
</script>

<style lang="scss" scoped>

.customer-follow-page{
  .w-150{
    width: 150px;
  }
  .m-btn{
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 5px 10px;
    padding-right: 26px;
    border-radius: 4px;
    position: relative;
  }
  .green{
    color: #007440!important;
  }
  .icon-top{
    font-size: 16px;
    position: absolute;
    bottom: 9px;
    color: #ddd;
  }
  .icon-bottom{
    font-size: 16px;
    position: absolute;
    top: 9px;
    color: #ddd;
  }
}
.handPage{
  margin-top: 10px;
}
.table-box{
  .el-table__row{
    .el-table_1_column_13{
      .cell{
        button{
          padding-left: none!important;
        }
      }
    }
  }
}
</style>