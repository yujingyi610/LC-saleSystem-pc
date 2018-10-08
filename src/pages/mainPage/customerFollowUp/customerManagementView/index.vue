<template>
  <div class="customer-management-view background-m">
    <div class="envelope-box">
      <div class="envelope-title">
        <el-radio-group v-model="type">
          <el-radio-button label="1">客户资料</el-radio-button>
          <el-radio-button label="2">跟进记录</el-radio-button>
          <el-radio-button label="3">关键事件</el-radio-button>
        </el-radio-group>
        <div class="fr">
          <div class="fl">
            <!-- v-if="this.buyStage === '款清'"-->
            <!-- <el-button  v-has="'cst:niche:buyagain'" v-show="this.buyStage === '款清'"  @click="handleZcgm">再次购买</el-button> -->
             <el-button v-has="'cst:niche:changeagent'"  @click="handleGhgw">{{this.titles}}</el-button>
            <el-button v-has="'cst:niche:merge'" v-show="this.propertyConsultId" @click="handleSjhb">合并客户</el-button>
            <!-- <el-button v-has="'cst:niche:waive'" v-show="this.propertyConsultId" @click="handleFqsj">放弃客户</el-button> -->
            <el-button v-has="'cst:niche:fllow:add'" v-show="this.propertyConsultId" @click="handleXzgj">新增跟进</el-button>
            <el-button v-has="'cst:niche:edit'" @click="handleEdit" >编辑资料</el-button>
            <el-button v-has="'cst:niche:copy'" @click="handleCopy" >客户复制</el-button>
            <i @click="handleClose" class="m-close el-icon-circle-close-outline bold ft-18 cursor"></i>
          </div>
        </div>
      </div>
      <!-- 浮层 -->
      <copy-customers-dialog ref="copyCustomDialog"></copy-customers-dialog>
      <!-- 再次购买 -->
      <bugAgree ref="bugAgree"></bugAgree>
      <!-- 商机合并浮层 -->
      <operationDialog ref="operationDialog"></operationDialog>
      <!-- 放弃商机浮层 -->
      <giveUpBusinessOpportunities ref="giveUpBusinessOpportunities"></giveUpBusinessOpportunities>
      <!-- 新增跟进浮层 -->
      <followUpAddDialog ref="followUpAddDialog"></followUpAddDialog>
      <!-- 更换顾问 -->
      <distributionAdvisorDialog ref="distributionAdvisorDialog"></distributionAdvisorDialog>
      <div class="envelope-title">
        <template v-if="type === '1'">
          <keep-alive>
          <customerInformation :obtainCustomerDetails='detailsList'></customerInformation>
          </keep-alive>
        </template>
        <template v-else-if="type === '2'">
          <followUpRecord  ref="followUpRecord"></followUpRecord>
        </template>
        <template v-else>
          <keyEvents :nicheIdList ='nicheId'></keyEvents>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  // 获取请求接口
  import {
    getCustomerDetails,
    
  } from '@/api/pages/mainPage/customerFollowUp'
  
  import customerInformation from './customerInformation.vue'
  import followUpRecord from './followUpRecord.vue' 
  import keyEvents from './keyEvents.vue'
  import copyCustomersDialog from './newCustomers.vue'// 客户复制

  // dialog
  //再次购买
  import bugAgree from './../customerFollowPage/dialog/bugAgree.vue'
  // 商机合并
  import operationDialog from './../customerFollowPage/dialog/operationDialog.vue'
  // 放弃商机
  import giveUpBusinessOpportunities from './../customerFollowPage/dialog/giveUpBusinessOpportunities.vue'
  // 新增跟进
  import followUpAddDialog from './../customerFollowPage/dialog/followUpAddDialog.vue'
  //更换顾问
   //import distributionAdvisorDialog from '@/pages/mainPage/customerFollowUp/customerFollowPage/dialog/distributionAdvisorDialog.vue'
  import distributionAdvisorDialog from './distributionAdvisorDialog.vue'
  export default {
    components : {
      bugAgree,
      customerInformation,
      followUpRecord,
      keyEvents,          
      operationDialog,
      giveUpBusinessOpportunities,
      followUpAddDialog,
      distributionAdvisorDialog,
      copyCustomersDialog
    },
    data() {
      return {
        type : '1',
        //客户信息列表
        detailsList:{},
        //客户id
        id:'',
        //商机id
        nicheId:'',
        //购房阶段
        buyStage:'',
        //置业顾问id
        propertyConsultId:'',
        //项目id
        projectId:'',
        //标题
        titles:'',
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.initTableList()
    },
    methods : {
      /* ---------------------保存以及关闭----------------------------- */

      initTableList(){
        
        let data={
          id:this.id,
        }          
        getCustomerDetails(data).then((res) => {
          if(res.status === 200){
                  
             this.detailsList = res.data
             //商机id
             this.nicheId = res.data.nicheId   
             //购房阶段
             this.buyStage = res.data.buyStage 
             //置业顾问id
             this.propertyConsultId = res.data.propertyConsultId    
             //项目id
             this.projectId = res.data.projectId 
             //源置业顾问id
             if(this.propertyConsultId){
               this.titles = '更换顾问'
             }else{
               this.titles = '分配顾问'
             }
            
          }
        });
              
      },

      //编辑按钮
       handleEdit() {
          let types = this.$route.query.type
        this.$router.push({
          path : '/mainPage/customerFollowUp/customerEdit',
          query : {
            id : this.id,
            type:types,
            projectId: this.$route.query.projectId,
            url : encodeURIComponent(this.$route.fullPath),
          },
        });
      },

      handleSubmit() {

      },
      handleClose() {
        // this.$router.push({
        //   path : '/mainPage/customerFollowUp/customerFollowPage',
        // });
        // this.$router.back(-1);
        if(this.$route.query.type==='2'){
          //待跟进
             this.$router.push({
              path : '/mainPage/workspaceManagement/custom/stayFollow',
          });
        }else if(this.$route.query.type==='3'){
          //将流失
            this.$router.push({
              path : '/mainPage/workspaceManagement/custom/willBeLost',
            });
        }else if(this.$route.query.type==='4'){
          //待分配
            this.$router.push({
              path : '/mainPage/workspaceManagement/custom/stayAllot',
            });
        }else{
          //客户列表
          this.$router.push({
              path : '/mainPage/customerFollowUp/customerFollowPage',
          });
        }
      },
      /* ---------------------保存以及关闭----------------------------- */

      /* ---------------------其他按钮操作----------------------------- */
      // 商机合并
      handleSjhb() {
        this.$refs.operationDialog.show('hbsj',true);
      },
      // 放弃商机
      handleFqsj() {
        this.$refs.giveUpBusinessOpportunities.show(this.nicheId);
      },
      // 新增跟进
      handleXzgj() {
        let data = {
          customId:this.id,
          nicheId :this.nicheId
        }
        this.$refs.followUpAddDialog.show(data);
      },
      //再次购买
      handleZcgm() {
        this.$refs.bugAgree.show();
      },
      //更换顾问
      handleGhgw(){
        let data = {
          customId:this.propertyConsultId,
          id:this.id,
          projectId:this.projectId,
          propertyConsultId:this.propertyConsultId
        }
        this.$refs.distributionAdvisorDialog.show(data,this.titles)
      },
      handleCopy() {// 客户复制
        this.$refs.copyCustomDialog.show()
      }
      
      /* ---------------------保存以及关闭----------------------------- */
    },
  }
</script>

<style lang="scss" scoped>

.customer-management-view{
  .bold{
    font-weight: bold;
  }
  .m-close{
    vertical-align: middle;
    margin-top: -4px;
    margin-left: 20px;
  }
}

</style>