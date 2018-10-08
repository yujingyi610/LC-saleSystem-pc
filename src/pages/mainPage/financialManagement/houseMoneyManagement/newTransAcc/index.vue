<template>
    <div id="transacc">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline headShowPart-oc">
        <el-form-item label="业务类型：">
          <el-radio-group v-model="searchForm.businessType" @change="searchHandel">
            <el-radio label="recognition" class="radio-text">认筹</el-radio>
            <el-radio label="subscribe" class="radio-text">认购</el-radio>
            <el-radio label="sign" class="radio-text">签约</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="业务编号：">
          <el-input v-model="searchForm.formCode" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="房号：" style="width:300px;">
          <el-input class="inputControl-long" v-model="houseNum" readonly="readonly" :disabled="searchForm.businessType=='recognition'?true:false" placeholder="请选择房号" @focus="selectHouseVisible = true"></el-input>
          <input type="hidden" v-model="searchForm.house">
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline headShowPart-oc" style="border-bottom:solid thin #dcdfe6">
        <el-form-item label="业务顾问：" style="width:261px;">
          <el-input v-model="searchForm.propertyConsultName" placeholder="请输入业务顾问"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input v-model="searchForm.customName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item style="width:300px;text-align:right">
          <el-button type="cancel-lee" @click="resetSearch">重置</el-button>
          <el-button type="success" @click="searchHandel">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
        <el-table-column prop="businessType" label="业务类型"></el-table-column>
        <el-table-column prop="formCode" label="业务编号"></el-table-column>
        <el-table-column prop="customName" label="客户姓名"></el-table-column>
        <el-table-column prop="houseFullName" label="房号" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalAmount" label="发生额"></el-table-column>
        <el-table-column prop="transferAmount" label="可转金额"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showSelectDialog(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="内部转账" :visible.sync="selectVisible" width="60%" append-to-body>
        <div class="container">
          <div style="width:50%;float:left;">
            <div><span class="title_name">业务类型：</span><span class="title_text">{{headInfo.businessType}}</span></div>
            <div><span class="title_name">客户名称：</span><span class="title_text">{{headInfo.customName}}</span></div>
            <div><span class="title_name">认购日期：</span><span class="title_text">{{typeof(headInfo.subscribeTime)=='undefined'?'--':headInfo.subscribeTime}}</span></div>
            <div><span class="title_name">可转金额：</span><span class="title_text" style="color:red;">{{headInfo.transferAmount}}</span></div>
          </div>
          <div style="width:50%;float:left;">
            <div><span class="title_name">业务编号：</span><span class="title_text">{{headInfo.formCode}}</span></div>
            <div><span class="title_name">房间号码：</span><span class="title_text">{{headInfo.houseFullName}}</span></div>
            <div><span class="title_name">置业顾问：</span><span class="title_text">{{headInfo.propertyConsultName}}</span></div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div><span class="title_name">备  注：</span><span class="title_text">{{typeof(headInfo.remark)=='undefined'?'--':headInfo.remark}}</span></div>
        <div><span class="title_name" style="color:#4dbe61;">收款单编号：</span>
          <template v-for="(code, index) in headInfo.debitCode">
            <span class="title_text" style="display:inline-block;padding:0 5px;" :key="index">{{code.debitCode}}</span>
          </template>
        </div>

        <template v-for="levelo in transferPaymentDetail">
          <template v-for="(levelt, index) in levelo.transferDebitPaymentInfoList">
            <div :key="index">
              <div style="height:30px;line-height:30px;font-size:12px;">
                <div>{{levelt.paymentItemName}}</div>
              </div>
              <el-table border :data="[{}]" style="width: 100%;">
                <el-table-column label="款项名称">
                  <template slot-scope="scope">
                    <span>{{levelt.transferDebitPayment.paymentItemName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="可转金额">
                  <template slot-scope="scope">
                    <span>{{levelt.transferDebitPayment.couldTransferBalance}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="转出金额">
                  <template slot-scope="scope">
                    <el-input class="must-trans-amount" v-model="levelt.transferDebitPayment.transferBalance" @blur="isMoreThanCouldTransfer(levelt.transferDebitPayment.couldTransferBalance,levelt.transferDebitPayment.transferBalance)"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </template>
        <div style="margin-top:46px;">
          <el-form width="100%" style="text-align:right" :inline="true" class="demo-form-inline">
            <el-form-item label="摘要">
              <el-input v-model="transferSaveData.summary" placeholder="请输入摘要"></el-input>
            </el-form-item>
            <!--<el-form-item label="*结算日期" style="margin-right:0px;">
              <el-date-picker
                v-model="transferInfo.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>-->
          </el-form>
          <el-form width="100%" style="text-align:right" :inline="true" class="demo-form-inline">
            <el-button type="success" @click="confirmTransfer">确认转出</el-button>
          </el-form>
        </div>
      </el-dialog>
      <!--房号选择弹框-->
      <el-dialog title="房号选择" :visible.sync="selectHouseVisible" append-to-body>
        <housedetail @ievent ="ievent"></housedetail>
      </el-dialog>
    </div>
</template>

<script>
  import "@/assets/styles/ocuponStyle.css";
  import houseNum from "../../houseDetail";
  import {getInnerTransList,getCouldTransferList,getHouseFullName,sureTransfer} from "@/api/pages/mainPage/financialManagement/housingFund";

  export default {
      components:{
        'housedetail':houseNum
      },
      props: ['transVal','flag','clearSearch'],
        data(){
          return{
            name:'新增内部转账组件',
            searchForm:{},
            houseNum:null,
            selectVisible:false,
            selectHouseVisible:false,
            transferInfo:{},
            transferPaymentDetail:[],
            transferSaveData:{},
            thisBusinessType:null,
            headInfo:{},
            tableData:[],
            isTransfer:false,
            isMustInput:true,
            debitIds:null
          }
        },
      watch:{
        transVal:function(){
          this.getPageData();
        },
        flag:function(){
          this.getPageData();
        },
        clearSearch:function(){
          this.searchForm = {};
          this.houseNum = null;
        },
      },
      created:function(){
        //this.getPageData();
        this.getPageData();
      },
      methods:{
        ievent:function(val){
          let that = this;
          this.searchForm.house = val.houseInfo.houseId;
          that.selectHouseVisible = false;
          let params = {
            itemId:val.houseInfo.id
          }
          getHouseFullName(params).then(function(res){
            that.houseNum = res.data.houseFullName;
          })
        },
        isMoreThanCouldTransfer(could,now){
          if(Number(now)>could){
            this.$message({
              message:'转出金额超出可转金额，请调整！',
              type:'warning'
            })
            this.isTransfer = false;
          }else{
            this.isTransfer = true;
          }
        },
        getCouldTransList(did){//获取可转账列表数据
          let that = this;
          let params = {
            debitIds:did
          }
          getCouldTransferList(params).then(function(res){
            if(res.status == 200){
              that.transferSaveData = res.data;
              that.transferPaymentDetail = that.transferSaveData.transferDebitFormList;
              that.headInfo.debitCode = typeof(res.data.transferDebitFormList)=='undefined'?'--':res.data.transferDebitFormList;
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          })
        },

        transmitDataToParent(val){//将返回值传递给父组件
          this.$emit('getChildData',val);
        },

        isMust(){
          let isEmptyOrError = true;
          this.isMustInput = true;
          let must = document.getElementsByClassName('must-trans-amount el-input');
          for(let i=0;i<must.length;i++){
            if(must[i].children[0].value!='' && must[i].children[0].value!=null && must[i].children[0].value!=0 && !isNaN(must[i].children[0].value)){
              isEmptyOrError = false;
              break;
            }
          }
          if(isEmptyOrError){
            this.isMustInput = false;
            for(let n=0;n<must.length;n++){
              must[n].children[0].style='border-color:red';
              setTimeout(function(){
                must[n].children[0].style='border-color:#dcdfe6';
              },1500)
            }
          }

        },

        confirmTransfer(){//确认转出
          this.isMust();
          if(this.isMustInput){
            if(!this.isTransfer){
              this.$message({
                message:'转出金额超出可转金额，请调整！',
                type:'warning'
              })
            }else{
              let that = this;
              let data = this.transferSaveData;
              data.businessType = this.transVal.businessType;
              data.projectCompanyId = this.transVal.projectCompanyId;;
              data.thisBusinessType = this.thisBusinessType;
              this.$confirm('确认所填信息无误并确认转出？','提示',{type:'warning'}).then(function(){
                that.selectVisible = false;
                sureTransfer(data).then(function(res){
                  if(res.status == 200){
                     ;
                    that.transmitDataToParent(res);
                  }else{
                    that.$message({
                      message:res.message,
                      type:'error'
                    })
                  }
                })
              });
            }
          }else{
            this.$message({
              message:'转出金额为0或未填写，请核实后再确认转出！',
              type:'warning'
            })
          }
        },

        getPageData(){
          let that = this;
          let params = this.searchForm;
          params.thisBusinessType = this.transVal.businessType;//'sign'//
          params.projectCompanyId = this.transVal.projectCompanyId; //'a47885b92d0211e8af88005056b44833'//
          params.thisBalanceFormId = this.transVal.balanceId; //'06a2ecc3696a11e8b6017cd30ab8ab74'//
          params.nicheId = this.transVal.nicheId; //'0ce0c070663e11e8b6017cd30ab8ab74'//
          if(this.transVal.debitIds != null && typeof(this.transVal.debitIds)!='undefined' && this.transVal.debitIds!='undefined'){
            params.debitIds = this.transVal.debitIds.toString();
          }
          getInnerTransList(params).then(function(res){
            if(res.status == 200){
                that.tableData = res.data;
            }else{
             that.$message({
               message:res.message,
               type:'error'
             })
            }
          })
        },
        searchHandel(){
          this.getPageData();
        },
        resetSearch(){
          this.searchForm = {}
          this.houseNum = null;
          this.getPageData();
        },
        showSelectDialog:function(row){
          console.log(row)
          this.selectVisible = true;
          this.thisBusinessType = row.businessType;
           
          this.getCouldTransList(row.debitIds);
          this.headInfo = row;
        },
      }
    }
</script>

<style scoped>
.title_name{
  display:inline-block;
  width:100px;
  text-align:right;
  font-size:12px;
}
  .title_text{
    font-size:12px;
  }
</style>
