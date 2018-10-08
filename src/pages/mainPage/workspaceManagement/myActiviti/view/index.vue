<template>
    <div id="workflow">
        <div class="workflow_con">
            <el-container>
                <el-aside width="200px" id="workflow1" style="margin-right: 20px; background: #fff">
                    <div class="title">流程步骤</div>
                    <div>
                        <el-steps v-if="workFlowListAll" direction="vertical"  :space="87">

                            <el-step v-for="(item,index) in workFlowListAll" :key="index" :title="item.taskName" :status="item.taskStatusStep">
                              <div slot="description">
                                <span>{{item.assigneeName}}</span><br>
                                <div>
                                  <span v-if="item.taskStatus === '办理中'" style="color: #F5A623">{{item.taskStatus}}</span>
                                  <span v-else-if="item.taskStatus === '已办理'" style="color: #4DBE61">{{item.taskStatus}}</span>
                                  <span v-else-if="item.taskStatus === '征询中'" style="color: #8F94DE">{{item.taskStatus}}</span>
                                  <span v-else-if="item.taskStatus === '退回'" style="color: #E60012">{{item.taskStatus}}</span>
                                  <span v-else>{{item.taskStatus}}</span>
                                </div>
                                <span style="color: #808080">{{item.taskEndTime?'':item.duration}}</span>
                              </div>
                            </el-step>

                        </el-steps>
                    </div>
                </el-aside>
                <el-main style="background: #fff; border-radius: 5px">
                  <div style="overflow: hidden">
                    <span class="work_title">审批详情</span>
                    <i class="el-icon-circle-close-outline close" @click="handlePass"></i>
                  </div>
                  <el-collapse v-model="activeNames">
                    <el-collapse-item title="基本信息" name="1">
                      <el-form ref="form" :model="form">
                        <el-row :gutter="20">
                          <el-col :span="12">
                                <el-form-item label="流程主题">{{form.title}}</el-form-item>
                            </el-col>
                            
                            <el-col :span="6">
                                <el-form-item label="表单编号">{{form.businessCode}}</el-form-item>
                            </el-col>
                             <el-col :span="6">
                                <el-form-item label="申请时间">{{form.drafterTime}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="申请人">{{form.drafterName}}</el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请人职位">{{form.drafterPositionName}}</el-form-item>
                            </el-col>
                           
                            
                        </el-row>
                                <el-form-item label="所属组织">{{form.drafterOrgUnit}}</el-form-item>
                      </el-form>
                    </el-collapse-item>
                    <el-collapse-item title="表单信息" name="2">
                      <component :is="isShow" ref="formRef"></component>
                    </el-collapse-item>
                    <el-collapse-item title="审批记录" name="3">
                      <div>
                        <el-steps direction="vertical" :active="workFlowList.length - 1" :space="97">
                            <el-step v-for="(item, index) in workFlowList" :key="index" :title="item.taskName" :status="item.taskStatusStep">
                              <div slot="description">
                                <div class="title_time">{{item.taskEndTime}}</div>
                                <div style="margin-left: 20px">
                                  <span>{{item.assigneeName}}</span>
                                  <span style="position: absolute;left: 200px;">
                                    <span v-if="item.taskStatusStep === 'error'">{{item.comment}}</span>                                
                                    <span v-else style="color: #4DBE61">{{item.comment}}</span>
                                  </span>
                                </div>
                                <div class="assigneeDeptTree" :style="{color: item.taskStatusStep === 'error'?'#f56c6c':''}"><span>{{item.assigneeDeptTree}}</span><span style="float: right">{{item.duration}}</span></div>
                              </div>
                            </el-step>
                        </el-steps>
                      </div>
                      <div class="btn_wrap" v-if="form.taskStatus == '20'">
                            <el-button type="success" @click="handleAgree1">同意原文意见</el-button>
                            <el-button type="success" @click="handleAgree2">同意修改意见</el-button>
                            <el-button type="success" @click="handleAgree3">退回修改</el-button>
                            <el-button type="success" @click="handleAgree4">我有修改意见</el-button>
                            <!-- <el-button type="success" @click="handlePass">忽略</el-button> -->
                            <el-button type="success" @click="handleAgree5">委托</el-button>
                            <el-button type="success" @click="handleAgree6">意见征询</el-button>
                      </div>
                    </el-collapse-item>
                    <!-- <el-collapse-item title="附件信息" name="4">
                      <el-table :data="accessoryTable" border style="width: 100%; margin-bottom: 20px">
                            <el-table-column prop="fileName" label="客户名称"></el-table-column>
                            <el-table-column prop="size" label="附件大小"></el-table-column>
                            <el-table-column prop="user" label="上传人"></el-table-column>
                            <el-table-column prop="time" label="上传时间"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text">下载</el-button>
                                    <el-button type="text">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item> -->
                  </el-collapse>
                </el-main>
            </el-container>
        </div>
        
        <!-- 同意原文意见 -->
        <el-dialog title="审批意见" :visible.sync="handleAgreeFlag1" width="30%">
            <el-input type="textarea" :rows="2" placeholder="请输入审批意见" v-model="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag1 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion" :disabled="disabled">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 同意修改意见 -->
        <el-dialog title="审批意见" :visible.sync="handleAgreeFlag2" width="30%">
            <el-table ref="multipleTable" :data="workFlowList1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="姓名" property="assigneeName" width="120"></el-table-column>
                <el-table-column label="意见" property="comment" width="120"></el-table-column>
            </el-table>
            <el-input type="textarea" :rows="2" placeholder="请输入审批意见" v-model="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag2 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion" :disabled="disabled">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 退回修改 -->
        <el-dialog title="审批意见" :visible.sync="handleAgreeFlag3" width="30%">
            <el-table ref="singleTable" :data="workFlowList2" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
                <el-table-column label="审批节点" property="actDefName" width="120"></el-table-column>
                <el-table-column label="姓名" property="assigneeName" width="120"></el-table-column>
                <el-table-column label="意见" property="commentContent" width="120"></el-table-column>

            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag3 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion2" :disabled="disabled">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 委托 -->
        <el-dialog title="委托" :visible.sync="handleAgreeFlag4" width="70%">
            <organization-tree v-bind:isRadio="true" ref="RadioTree"></organization-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag4 = false">取 消</el-button>
                <el-button type="primary" @click="Agree1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 委托意见 -->
        <el-dialog title="委托意见" :visible.sync="Flag1" width="40%">
            <el-input type="textarea" :rows="2" placeholder="请填写我的办理意见" v-model="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Flag1 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion3" :disabled="disabled">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 意见征询 -->
        <el-dialog title="意见征询" :visible.sync="handleAgreeFlag5" width="70%">
            <organization-tree v-bind:isRadio="false" ref="CheckedTree"></organization-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag5 = false">取 消</el-button>
                <el-button type="primary" @click="Agree2">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 意见征询意见 -->
        <el-dialog title="意见征询意见" :visible.sync="Flag2" width="40%">
            <div style="">
              <span v-for="(item, index) in SelectedMemberList" :key="index" style="margin: 5px; float: left">{{item.realName}}({{item.userName}})</span>
            </div>
            <el-input type="textarea" :rows="2" placeholder="请填写征询意见" v-model="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Flag2 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion4" :disabled="disabled">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import "@/assets/styles/workflow.scss";
import {
  getApprovalHistory,
  agree,
  moveBack,
  findMoveBackTask,
  transfer,
  additionTask,
  getById,
  getformInfo,// 获取业务表单数据
  findCommentList,// 同意修改意见人员列表
} from "@/api/pages/workflow";

import { 
    getPriceScheme,// 获取调价方案
} from "@/api/pages/mainPage/plan/price/index.js";
import {getTrdSubscribeForm} from '@/api/pages/mainPage/transactionManagement/subscriptionManagement'
import {getInfo} from '@/api/pages/mainPage/transactionManagement/contractManagement'
import OrganizationTree from "@/components/OrganizationTree";

import signedForm from '@/components/lookForm/signed'
import signedChangeName from '@/components/lookForm/signedChangeName'
import ChangeNameForm from '@/components/lookForm/ChangeName'
import signedChangeHouse from '@/components/lookForm/signedChangeHouse'
import ChangeHouseForm from '@/components/lookForm/ChangeHouse'
import signedBack from '@/components/lookForm/signedBack'
import BackForm from '@/components/lookForm/Back'
import contractChange from '@/components/lookForm/contractChange'
import PutOffSigned from '@/components/lookForm/PutOffSigned'
import PutOff from '@/components/lookForm/PutOff'
import priceForm from '@/components/lookForm/price'
import subscriptionForm from '@/components/lookForm/subscription'
export default {
  components: {
    OrganizationTree,
    signedForm,// 签约审批
    signedChangeName,// 签约更名
    ChangeNameForm,// 预定更名
    signedChangeHouse,// 签约换房
    ChangeHouseForm,// 预定换房
    signedBack,// 签约退房
    BackForm,// 预定退房
    contractChange,// 合同变更 
    PutOffSigned,// 延期签约
    PutOff,//  延期付款
    priceForm,// 价格审批
    subscriptionForm,// 认购审批
  },
  data() {
    return {
      activeNames: ['1','2','3','4'],
      form: {},
      textarea: "",

      multipleSelection: [], // 保存所选中的同意审批意见人员列表
      currentRow: null, // 保存所选中的退回修改人员列表
      handleAgreeFlag1: false,
      handleAgreeFlag2: false,
      handleAgreeFlag3: false,
      handleAgreeFlag4: false,
      handleAgreeFlag5: false,
      workFlowListAll: [],
      workFlowList: [],
      workFlowList1: [],
      workFlowList2: [],
      taskId: "",
      businessKey:"",
      isShow: null,
      accessoryTable: [],// 附件table,
      Flag1: false,//
      Flag2: false,
      SelectedMemberList: [],// 意见委托展示所选中的人员列表
      data: null,// 传给子组件表单的数据
      redactFlag: false,
      disabled: false,// 控制审批按钮是否可以点击，避免重复提交
    };
  },
  methods: {
    handleGetPrice() {
      getPriceScheme({ id: this.$route.params.businessKey }).then(res=>{
           
          if( res.status === 200 ){
              this.$refs.formRef.show(res.data)
          }
      })
    },
    handleGetTrdSubscribeForm() {
      let params = new URLSearchParams();
      params.append('id', this.$route.params.businessKey )
      getTrdSubscribeForm(params).then(res=>{
           ;
          if( res.status === 200 ){
              this.$refs.formRef.show(res.data);
          }else{
            this.$message({
              type: "error",
              message: res.message
            });
          }
      })
    },
    handleContract() {
      getInfo({ id: this.$route.params.businessKey }).then(res=>{
           ;
          if( res.status === 200 ){
              this.data = res.data;
              this.$refs.formRef.show(res.data, this.redactFlag);
          }else{
              this.$message({
                  type: 'error',
                  message: res.message
              })
          }
      })
    },
    handlegetformInfo() {
      getformInfo({ id: this.$route.params.businessKey }).then(res=>{
         
        if( res.status === 200 ){
          this.$refs.formRef.show(res.data, this.redactFlag)
        }
      })
    },
    handleGetInfo(){
      getById({id:this.$route.params.id}).then(res=>{
        console.log("_________________________________________");
        this.form = res.data.info;
        console.log('11',this.form)
        this.taskId = this.form.taskId;
        this.workFlowList = [];
        res.data.his.map(item=>{
          this.workFlowList.push(item)
        })
        this.workFlowListAll = res.data.his;
        // this.workFlowList = res.data.his;
        console.log(res.data.preview)
        res.data.preview.map(item=>{
          item.taskName = item.taskName;
          item.assigneeName = item.assigneeName;
          item.taskStatusStep = 'wait';
          item.taskStatus = '未办理'
          
        })
        this.workFlowListAll.push(...res.data.preview)
        // this.workFlowList1 = []
        // this.workFlowList.map (item=>{
        //   if( item.taskStatus !== '办理中' ){
        //     this.workFlowList1.push(item)
        //   } 
        // })
        console.log(this.workFlowList)
        let uesrInfo =  JSON.parse(sessionStorage.getItem('user-info')).sysRoles;
         
        for( let i = 0; i < uesrInfo.length; i++ ){
          if( uesrInfo[i].roleName.indexOf('nnndjjz') !== -1 && this.form.taskStatus == '20' ){
            this.redactFlag = true;// 判断是否可以修改审批价格
            
          }
        }
      })
    },
    handlefindCommentList() {// 获取同意修改意见人员列表
      findCommentList({ businessKey: this.$route.params.businessKey }).then(res=>{
         ;
        if( res.status === 200 ){
          this.workFlowList1 = res.data;
        }else{
          this.$message.error('查询失败！')
        }
      })
    },
    handleGetApprovalHistory(params) {
      getApprovalHistory(params).then(res => {
         ;
        if (res.status === 200) {
          this.workFlowList = res.data;
        }
      });
    },
    handleFindMoveBackTask(params) {
      findMoveBackTask(params).then(res => {
         ;
        if( res.status === 200 ){
          this.workFlowList2 = res.data;
          this.$refs.singleTable.setCurrentRow(this.workFlowList2[this.workFlowList2.length - 1]); // 默认选中第一个
        }else{
          this.$message.error('查询失败！')
        }
        
      });
    },
    handlePass() {
      // 忽略
      this.$router.go(-1);
    },
    handleAgree1() {
      this.textarea = "同意原文意见";
      this.handleAgreeFlag1 = true; // 同意原文意见和我有修改意见两个按钮公用同一套dialog
    },
    handleAgree2() {
      this.textarea = "同意意见";
      this.handlefindCommentList();
      this.handleAgreeFlag2 = true;
    },
    handleAgree3() {
      this.handleAgreeFlag3 = true;
      this.handleFindMoveBackTask({taskId:this.taskId});
    },
    handleAgree4() {
      this.textarea = "我有修改意见";
      this.handleAgreeFlag1 = true; // 同意原文意见和我有修改意见两个按钮公用同一套dialog
    },
    handleAgree5() {
      this.handleAgreeFlag4 = true;
    },
    handleAgree6() {
      this.handleAgreeFlag5 = true;
    },
    AgreeOpinion() {
      // 同意弹框中的确定按钮
      if( !this.textarea ){
        this.$message.error('意见不能为空！');
        return
      }
      this.disabled = true;
      let data = {
        taskId: this.taskId,
        comment: this.textarea
      };
      data = this.Qs.stringify(data);
      agree(data).then(res => {
         ;
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '审批成功！'
          })
          this.handleAgreeFlag1 = false;
          this.handleAgreeFlag2 = false;
          this.disabled = false;
          this.$router.go(0);
        }else{
          this.$message.error(res.message)
          this.disabled = false;
        }
      });
      
      // this.handleAgreeFlag3 = false;
      // this.handleAgreeFlag4 = false;
      // this.handleAgreeFlag5 = false;
    },
    AgreeOpinion2() {
      // 退回修改弹框中的确定按钮
      if( !this.currentRow.taskId ){
        this.$message.error('请先选择要退回的人员！')
        return
      }
      this.disabled = true;
      let data = {
        currentTaskId: this.taskId,
        historyTaskId: this.currentRow.taskId
      };
      data = this.Qs.stringify(data);
      moveBack(data).then(res => {
         ;
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '审批成功！'
          })
          this.handleAgreeFlag3 = false;
          this.disabled = false;
          this.$router.go(0);
        }else{
          this.$message.error(res.message)
          this.disabled = false;
        }
      });
      
    },
    Agree1() {
      this.Flag1 = true;
    },
    AgreeOpinion3() {
      // 委托弹框中的确定按钮
      if( !this.textarea ){
        this.$message.error('意见不能为空！');
        return
      }
      console.log(this.$refs.RadioTree.currentRow);
      this.disabled = true;
      let data = {
        taskId: this.taskId,
        newUserName: this.$refs.RadioTree.currentRow.userName,
        comment: this.textarea
      };
      data = this.Qs.stringify(data);
      transfer(data).then(res => {
         ;
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '委托成功'
          })
          this.handleAgreeFlag4 = false;
          this.Flag1 = false;
          this.disabled = false;
          this.$router.go(0);
        }else{
          this.$message.error(res.message)
          this.disabled = false;
        }
      });
      
    },
    Agree2() {
      this.SelectedMemberList = this.$refs.CheckedTree.SelectedMemberList;
      this.Flag2 = true;
    },
    AgreeOpinion4() {
      // 意见征询弹框中的确定按钮
      if( !this.textarea ){
        this.$message.error('意见不能为空！');
        return
      }
      if( !this.SelectedMemberList[0] ){
        this.$message.error('请先选择同意审批意见的人员！')
        return
      }
      this.disabled = true;
      let additionTaskAssignee = "";
      this.SelectedMemberList.map((item, index) => {
        if (index !== this.SelectedMemberList.length - 1) {
          additionTaskAssignee += item.userName + ",";
        } else {
          additionTaskAssignee += item.userName;
        }
      });
      console.log(additionTaskAssignee);
      let data = {
        taskId: this.taskId,
        additionTaskAssignee,
        comment: this.textarea
      };
      data = this.Qs.stringify(data);
      additionTask(data).then(res => {
         ;
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '委托成功'
          })
          this.handleAgreeFlag5 = false;
          this.Flag2 = false;
          this.disabled = false;
          this.$router.go(0);
        }else{
          this.$message.error(res.message)
          this.disabled = false;
        }
      });
      
      
    },
    handleSelectionChange(val) {
      // 同意审批意见选择人员时触发的函数，将所选中的人员保存起来
      if( !val[0] ){
        this.$message.error('请先选择同意审批意见的人员！')
        return
      }
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      let nameStr = "";
      let nameList = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (i !== this.multipleSelection.length - 1) {
          nameList[i] = this.multipleSelection[i].assigneeName + "、";
        } else {
          nameList[i] = this.multipleSelection[i].assigneeName;
        }
        nameStr += nameList[i];
      }
      this.textarea = "同意" + nameStr + "意见";
    },
    handleCurrentChange(val) {
      // 退回修改选择人员时触发的函数，将所选中的人员保存起来
      this.currentRow = val;
    }
  },
  
  created() {
    this.redactFlag = false;
    
    this.handleGetInfo();
    // this.handlegetformInfo();
    console.log(this.$route.params.formType)
    if( this.$route.params.formType === "priceScheme" ){// 价格审批
      this.isShow = 'price-form';
      this.handleGetPrice()
    }else if ( this.$route.params.formType === "subscribeApproval" ) {// 认购审批
      this.isShow = 'subscriptionForm';
      this.handleGetTrdSubscribeForm()
    }else if ( this.$route.params.formType === "subscribeRename" ) {// 认购更名
      this.isShow = 'ChangeNameForm';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "subscribeHouseChange" ) {// 认购换房
      this.isShow = 'ChangeHouseForm';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "subscribeCheckOut" ) {// 认购退房
      this.isShow = 'BackForm';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "signApproval" ) {// 签约审批
      this.isShow = 'signedForm';
      this.handleContract()
    }else if ( this.$route.params.formType === "postponeSign" ) {// 延期签约
      this.isShow = 'PutOffSigned';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "postponePayment" ) {// 延期付款
      this.isShow = 'PutOff';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "contractCheckOut" ) {// 签约退房
      this.isShow = 'signedBack';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "contractHouseChange" ) {// 签约换房
      this.isShow = 'signedChangeHouse';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "contractRename" ) {// 签约更名
      this.isShow = 'signedChangeName';
      this.handlegetformInfo()
    }else if ( this.$route.params.formType === "contractChange" ) {// 合同变更
      this.isShow = 'contractChange';
      this.handlegetformInfo()
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.work_title{
  line-height: 40px;
  font-size: 14px;
  font-weight: 900;
}
.close {
      font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    float: right;
}
</style>