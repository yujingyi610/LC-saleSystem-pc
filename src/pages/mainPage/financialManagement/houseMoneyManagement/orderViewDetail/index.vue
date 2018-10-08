<template>
    <div id="viewDetail">
      <div class="infoBox">
        <div class="section">
          <span>业务类型：</span><span v-text="detailForm.businessType == 'recognition'?'认筹':(detailForm.businessType=='subscribe'?'认购':'签约')"></span>
        </div>
      </div>
      <div class="infoBox" v-show="detailForm.businessType != 'recognition'"><!--v-show="isHouseInfo"-->
        <h3>房间信息</h3>
        <div class="section" style="width:400px;">
          <span>房间号码：</span><span v-text="detailForm.houseFullName"></span>
        </div><br/>
        <div class="section"><span>建筑面积：</span><span v-text="detailForm.floorSpace"></span></div>
        <div class="section"><span>套内面积：</span><span v-text="detailForm.buildingArea"></span></div>
        <div class="section"><span>分摊面积：</span><span v-text="detailForm.apportionArea"></span></div>
        <div class="section"><span>花园面积：</span><span v-text="detailForm.gardenArea"></span></div>
        <div class="section"><span>地下室面积：</span><span v-text="detailForm.basementArea"></span></div>
        <div class="section"><span>天台面积：</span><span v-text="detailForm.roofArea"></span></div>
        <div class="section"><span>赠送面积：</span><span v-text="detailForm.giftArea"></span></div>
        <div class="section"><span>计价方式：</span><span v-text="detailForm.priceMethod"></span></div>
        <div class="section"><span>计价面积：</span><span v-text="detailForm.priceArea"></span></div>
        <div class="section"><span>表单价：</span><span v-text="detailForm.prePrice"></span></div>
        <div class="section"><span>表总价：</span><span v-text="detailForm.preTotalPrice"></span></div>
      </div>
      <div class="infoBox" v-for="(item, index) in detailForm.debitCustomList" :key="index" v-show = "orderInfo.title == '收款单详情'">
        <h3>客户信息</h3>
        <div>
          <div class="section"><span>客户姓名：</span><span v-text="item.customName"></span></div>
          <div class="section"><span>手机号码：</span><span v-text="item.tel"></span></div>
          <div class="section"><span>性别：</span><span v-text="item.sex"></span></div>
        </div>
        <div>
          <div class="section"><span>证件类型：</span><span v-text="item.certificateName"></span></div>
          <div class="section"><span>证件号码：</span><span v-text="item.certificateNo"></span></div>
          <div class="section"><span>邮寄地址：</span><span v-text="item.addr"></span></div>
        </div>
      </div>
      <div class="infoBox" v-for="(item, index) in detailForm.refundCustomList" :key="index" v-show = "orderInfo.title == '退款单详情'">
        <h3>客户信息</h3>
        <div>
          <div class="section"><span>客户姓名：</span><span v-text="item.customName"></span></div>
          <div class="section"><span>手机号码：</span><span v-text="item.tel"></span></div>
          <div class="section"><span>性别：</span><span v-text="item.sex"></span></div>
        </div>
        <div>
          <div class="section"><span>证件类型：</span><span v-text="item.certificateName"></span></div>
          <div class="section"><span>证件号码：</span><span v-text="item.certificateNo"></span></div>
          <div class="section"><span>邮寄地址：</span><span v-text="item.addr"></span></div>
        </div>
      </div>
      <div class="infoBox">
        <h3>置业顾问信息</h3>
        <div class="section"><span>置业顾问：</span><span v-text="detailForm.propertyConsultName"></span></div>
        <div class="section"><span>顾问手机：</span><span v-text="detailForm.propertyConsultTel"></span></div>
      </div>
      <div class="infoBox" v-show = "orderInfo.title == '收款单详情'">
        <h3>收款人信息</h3>
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label=" 收款人：">
                {{receivePerson.name}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结算日期：">
                {{receivePerson.settleDate}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交款人：">
                {{receivePerson.payPerson}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="票据类型：">
                {{receivePerson.ticketType=='invoice'?'发票':receivePerson.ticketType=='quittance'?'收据':'无票据'}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="票据号码：" v-show="receivePerson.ticketType!='nothing'">
                {{receivePerson.code}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="infoBox" v-show = "orderInfo.title == '退款单详情'">
        <h3>收款人信息</h3>
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label=" 收款人：">
                {{reDebitInfo.payeeName}}
                <!--<el-input class="inputControl" readonly="readonly" v-model="reDebitInfo.payeeName"></el-input>-->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结算日期：">
                {{reDebitInfo.receiptDate}}
                <!--<el-input class="inputControl" readonly="readonly" v-model="reDebitInfo.receiptDate"></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="infoBox" v-show = "orderInfo.title == '收款单详情'">
        <h3>款项明细</h3>
        <div v-for="(item, index) in detailForm.debitPaymentInfoList" :key="index">
          <div>
            <span v-text="item.paymentItemName"></span>
            <!--<span class="explan" v-show="item.paymentItemName!='POS手续费'">(应收信息：应收金额<span v-text="item.receivableAmount"></span> 已收金额<span v-text="item.receivedAmount"></span> 未收金额 <span v-text="(item.receivableAmount) - (item.receivedAmount)"></span>)</span>-->
            <div style="float:right;width:135px;text-align:center;">
            </div>
          </div>
          <el-table :data="item.debitPaymentList" border style="width: 100%">
            <el-table-column prop="paymentItemName" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="支付方式" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.payMethod" placeholder="请选择支付方式" disabled="disabled">
                  <el-option v-if="scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour'"
                    v-for="item in payMethodsOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"></el-option>
                  <el-option v-if="scope.row.payMethod == 'theEarnestMoneyInpour' || scope.row.payMethod == 'handselInpour' || scope.row.payMethod == 'houseInpour'"
                             v-for="item in transPayMethodOption"
                             :key="item.value"
                             :label="item.name"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="bankAccount" label="银行账号" width="200">
              <template slot-scope="scope">
                {{scope.row.bankAccount}}
                <!--<el-select v-model="scope.row.bankAccount" placeholder="请选择银行账号" class="must-s">
                  <el-option label="1122323232736723626" value="1122323232736723626"></el-option>
                </el-select>-->
              </template>
            </el-table-column>
            <el-table-column prop="money" label="金额" width="120">
              <template slot-scope="scope">
                {{scope.row.balance}}
                <!--<el-input v-model="scope.row.balance" placeholder="请输入金额" class="must-s"></el-input>-->
              </template>
            </el-table-column>
            <el-table-column prop="abstract" label="摘要" width="250" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.summary}}
                <!--<el-input v-model="scope.row.summary" placeholder="请输入摘要"></el-input>-->
              </template>
            </el-table-column>
            <el-table-column label="收款凭证" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" size="small">--</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="infoBox" v-show = "orderInfo.title == '退款单详情'">
        <h3>退款信息</h3>
        <div v-for="(item, index) in detailForm.refundInfoList" :key="index">
          <div>
            <span v-text="item.paymentItemName"></span>
            <!--<span class="explan">(可退金额:{{item.couldRefundAmount}})</span>-->
            <div style="float:right;width:135px;text-align:center;">
            </div>
          </div>
          <el-table :data="item.refundPaymentList" border style="width: 100%">
            <el-table-column prop="paymentItemName" label="款项名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="money" label="结算金额" width="120">
              <template slot-scope="scope">
                {{scope.row.balance}}
                <!--<el-input v-model="scope.row.balance" placeholder="请输入金额" class="must-t"></el-input>-->
              </template>
            </el-table-column>
            <el-table-column label="结算方式" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.payMethod" placeholder="请选择结算方式" class="must-t" disabled="disabled">
                  <el-option
                    v-for="item in payMethodsOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="bankAccount" label="银行账号" width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.bankAccount}}
                <!--<el-select v-model="scope.row.bankAccount" placeholder="请选择银行账号" class="must-t">
                  <el-option label="1122323232736723626" value="1122323232736723626"></el-option>
                  <el-option label="1122323232736725926" value="1122323232736725926"></el-option>
                </el-select>-->
              </template>
            </el-table-column>
            <el-table-column prop="abstract" label="票据号码" width="250">
              <template slot-scope="scope">
                <span v-show="scope.row.paymentItemName!='手续费'">--</span>
                <span v-text="scope.row.billCode" v-show="scope.row.paymentItemName=='手续费'" v-bind:class="scope.row.paymentItemName=='手续费'?'must-t':''"></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  import {getRefundDetail,getDebitDetail,getPayMethods} from '@/api/pages/mainPage/financialManagement/housingFund'
    export default {
      props: ['orderInfo'],
        data(){
          return{
            name:'查看详情',
            detailForm:{},
            receivePerson:{},
            reDebitInfo:{},
            payMethodsOption:[],
            transPayMethodOption:[
              {name:'意向金转入',value:'theEarnestMoneyInpour'},
              {name:'定金转入',value:'handselInpour'},
              {name:'售房款转入',value:'houseInpour'},
            ],
          }
        },
      watch:{
        orderInfo:function(){
          this.getDetailInfo();
        }
      },
      methods:{
          getDetailInfo:function(){
            let that = this;
            if(this.orderInfo.type == 'debit'){
              let params = {
                debitFormId:this.orderInfo.orderId
              };
              getDebitDetail(params).then(function(res){//获取收款单详情
                 ;
                that.detailForm = res.data;
                that.receivePerson.name = res.data.debitInfo.payeeName;
                that.receivePerson.id = res.data.debitInfo.payeeId;
                that.receivePerson.settleDate = res.data.debitInfo.receiptDate;
                that.receivePerson.payPerson = res.data.debitInfo.payerName;
                that.receivePerson.ticketType = res.data.debitInfo.billType;
                that.receivePerson.code = res.data.debitInfo.billCode;
              });
            }else if(this.orderInfo.type == 'refund') {
              let params = {
                refundFormId:this.orderInfo.orderId
              }
              getRefundDetail(params).then(function(res){//获取退款单详情
                 ;
                that.detailForm = res.data;
                that.reDebitInfo = res.data.debitInfo;
              });
            }
          }
      },
      created(){
        let that = this;
        getPayMethods().then(function(res){
          that.payMethodsOption = res.data;
        })
      },
      mounted:function(){
        this.getDetailInfo();
      }
    }
</script>

<style scoped>
  .infoBox{
    padding:10px 20px;
    border-bottom:solid thin #dcdfe6;
  }
  .section{
    width:280px;
    display:inline-block;
    font-size:12px;
  }
  h3{
    font-size:12px;
    color:#4dbe61;
  }
  .explan{
    font-size:12px;
    color:#4dbe61;
  }

</style>
