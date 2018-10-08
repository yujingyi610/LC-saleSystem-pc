<template>
    <div id="balancePay">
      <div class="container">
        <el-radio-group v-model="tab" @change="tabHandel">
          <el-radio-button label="uncollected">可收款</el-radio-button>
          <el-radio-button label="collection">已收款</el-radio-button>
          <el-radio-button label="refund">已退款</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right;" v-show="tab == 'collection'" @click="newRefundVisible = true">新增退款</el-button>
      </div>
      <div style="clear: both"></div>
      <div class="container">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="业务类型:">
                <el-checkbox-group v-model="searchForm.businessType" style="display: inline-block;">
                  <el-checkbox label="recognition">认筹</el-checkbox>
                  <el-checkbox label="subscribe">认购</el-checkbox>
                  <el-checkbox label="sign">签约</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="房号:">
                <el-input class = "inputControl-long" size = "mini" placeholder="请选择房号" readonly="readonly" @focus="selectHouseVisible = true" v-model="houseNum"></el-input>
                <input type="hidden" v-model="searchForm.house">
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应收日期:">
                <el-date-picker v-model="searchForm.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期"></el-date-picker> --
                <el-date-picker v-model="searchForm.endTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="置业顾问:">
                <el-input placeholder="请输入置业顾问" v-model="searchForm.propertyConsultName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户姓名:">
                <el-input placeholder="请输入客户姓名" v-model="searchForm.customName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="tab=='uncollected'?'业务单号':tab=='collection'?'收款单号':'退款单号'">
                <el-input placeholder="请输入单号" v-model="ywbh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号:">
                <el-input placeholder="请输入手机号" v-model="searchForm.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务状态:" v-if="tab !== 'uncollected'">
               <el-select  v-model="searchForm.status">
                 <el-option label="未复核" value="unRecheck"></el-option>
                 <el-option label="已复核" value="rechecked"></el-option>
                 <el-option label="未通过" value="noRecheck"></el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否款清:" v-if="tab === 'uncollected'">
                 <el-radio-group v-model="searchForm.isClear">
                  <el-radio :label="0">全部</el-radio>
                  <el-radio :label="1">已款清</el-radio>
                  <el-radio :label="2">未款清</el-radio>
                  
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8"> -->
              <el-button style="float: right" type="success" @click="searchHandel">查询</el-button>
              <el-button style="float: right; margin-right: 20px" class="cancel-lee" @click="resetSearch">重置</el-button>
            <!-- </el-col> -->
          </el-row>
        </el-form>
        <!-- <div class="headShowPart">
          <div class="inputBox">
            <span class="inputLable">业务类型:</span> -->
            <!-- <el-radio-group v-model="searchForm.businessType" @change="searchHandel">
              <el-radio label="recognition" class="radio-text">认筹</el-radio>
              <el-radio label="subscribe" class="radio-text">认购</el-radio>
              <el-radio label="sign" class="radio-text">签约</el-radio>
            </el-radio-group> -->
            
          <!-- </div>
          <div class="inputBox" style="width:40%;">
            <span class="inputLable">房号:</span>
            <el-input class = "inputControl-long" size = "mini" placeholder="请选择房号" readonly="readonly" @focus="selectHouseVisible = true" v-model="houseNum"></el-input>
            <input type="hidden" v-model="searchForm.house">
          </div>

          <div class="inputBox">
            <span class="inputLable">应收日期:</span>
            <el-date-picker
              v-model="searchForm.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期">
            </el-date-picker> --
            <el-date-picker
              v-model="searchForm.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="headShowPart">
          <div class="inputBox" style="width:253px;">
            <span class="inputLable">置业顾问:</span>
            <el-input class = "inputControl" size = "mini" placeholder="请输入置业顾问" v-model="searchForm.propertyConsultName"></el-input>
          </div>
           <div style="display:flex;width:40%;justify-content:space-between">
             <div class="inputBox">
               <span class="inputLable">客户姓名:</span>
               <el-input class = "inputControl" size = "mini" placeholder="请输入客户姓名" v-model="searchForm.customName"></el-input>
             </div>
             <div class="inputBox">
               <span class="inputLable">{{tab=='uncollected'?'业务单号':tab=='collection'?'收款单号':'退款单号'}}:</span>
               <el-input class = "inputControl" size = "mini" placeholder="请输入单号" v-model="ywbh"></el-input>
             </div>
           </div>
          <div class="inputBox" style="width:348.5px;">
            <span class="inputLable">手机号:</span>
            <el-input class = "inputControl" size = "mini" placeholder="请输入手机号" v-model="searchForm.mobile"></el-input>
          </div>
        </div>
        
        <div style="border-bottom:solid thin #dcdfe6;padding:20px 25px;text-align:right">
          <div class="inputBox" style="width: 348.5px;text-align: right;display:inline-block;">
            <el-button class="cancel-lee" @click="resetSearch">重置</el-button>
            <el-button type="success" @click="searchHandel">查询</el-button>
          </div>
        </div> -->
      </div>
      <div class="container" style="padding:0px 25px">
        <div class="tabBox" v-show="tab == 'uncollected'">
        <el-table :data="tableData" border style="width: 100%" tooltip-effect="dark"><!--可收款-->
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="propertyConsultName" label="置业顾问" show-overflow-tooltip></el-table-column>
          <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="房间号码" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <span v-text="scope.row.businessType=='认筹'?'--':scope.row.houseFullName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型"></el-table-column>
          <el-table-column prop="formCode" label="业务单号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receivableAmount" label="应收金额"></el-table-column>
          <el-table-column prop="receivedAmount" label="已收金额"></el-table-column>
          <el-table-column prop="unreceiveAmount" label="未收金额"></el-table-column>
          <el-table-column prop="nearestReceivableDate" label="最近应收日期" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope" class="userManagement_actionBox">
              <el-button type="text" class="itemBtn" v-has="'fin:fk:sk'" @click.stop ="receivables(scope.row,'receive')">收款</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='currentPage' :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total='total'>
          </el-pagination>
        </div>
        <div class="tabBox" v-show="tab == 'collection'">
        <el-table :data="tableData1" border style="width: 100%" tooltip-effect="dark"><!--已收款-->
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="房间号码" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <span v-text="scope.row.businessType=='认筹'?'--':scope.row.houseFullName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型"></el-table-column>
          <el-table-column prop="debitCode" label="收款单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称"></el-table-column>
          <el-table-column prop="createTime" label="收款日期"></el-table-column>
          <el-table-column prop="totalAmount" label="收款金额"></el-table-column>
          <el-table-column prop="statusText" label="复核状态"></el-table-column>
          <el-table-column label="操作" align="ceter" width="200">
            <template slot-scope="scope" class="userManagement_actionBox">
              <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
              <el-button type="text" v-show="scope.row.statusText=='未通过'||scope.row.statusText=='未复核'" @click="deleteDetail(scope.row,'refund')">作废</el-button>
              <el-button type="text" v-show="scope.row.statusText=='未通过'" class="itemBtn" v-has="'fin:fk:sk'" @click.stop ="receivables(scope.row,'edit')">编辑</el-button>
              <el-button type="text" class="itemBtn" v-has="'fin:fk:tk'" @click.stop ="receivables(scope.row,'refund')">退款</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='currentPage' :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total='total'>
          </el-pagination>
        </div>

        <div class="tabBox" v-show="tab == 'refund'">
        <el-table :data="tableData2" border style="width: 100%" tooltip-effect="dark"><!--已退款-->
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="房间号码" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <span v-text="scope.row.businessType=='认筹'?'--':scope.row.houseFullName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型"></el-table-column>
          <el-table-column prop="refundCode" label="退款单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称"></el-table-column>
          <el-table-column prop="createTime" label="退款日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="totalAmount" label="退款金额"></el-table-column>
          <el-table-column prop="statusText" label="复核状态"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope" class="userManagement_actionBox">
              <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
              <el-button type="text" v-show="scope.row.statusText=='未通过'||scope.row.statusText=='未复核'" @click="deleteDetail(scope.row,'editRefund')">作废</el-button>
              <el-button type="text" v-show="scope.row.statusText=='未通过'" class="itemBtn" v-has="'fin:fk:tk'" @click="receivables(scope.row,'editRefund')">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='currentPage' :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total='total'>
          </el-pagination>
        </div>
      </div>

      <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="75%" :before-close="closeReceiveVisible">
        <div class="infoBox">
          <div class="section">
            <span>业务类型：</span><span v-text="detailForm.businessType == 'recognition'?'认筹':(detailForm.businessType=='subscribe'?'认购':'签约')"></span>
          </div>
          <div class="section">
            <!--<a class="itemBtn">查看业务单据详情</a>-->
          </div>
        </div>
        <div class="infoBox" v-show="isHouseInfo">
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
        <div class="infoBox" v-for="(item, index) in detailForm.debitCustomList" :key="index" v-show="dialogTitle == '新增收款单' || dialogTitle == '编辑收款单'">
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
        <div class="infoBox" v-for="(item, index) in detailForm.refundCustomList" :key="index" v-show = "dialogTitle == '新增退款单' || dialogTitle == '编辑退款单'">
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
        <div class="infoBox" v-show="dialogTitle == '新增收款单' || dialogTitle == '编辑收款单'">
          <h3>收款人信息</h3>
          <el-form>
            <el-row>
              <el-col :span="6">
                <el-form-item label=" 收款人：">
                  <el-input class="inputControl" readonly="readonly" v-model="receivePerson.name"></el-input>
                  <input type="hidden" v-model="receivePerson.id">
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="结算日期：">
                  <!--<el-input class="inputControl" readonly="readonly" v-model="receivePerson.settleDate"></el-input>-->
                  <el-date-picker
                    v-model="receivePerson.settleDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择结算日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="交款人：">
                  <el-select v-model="receivePerson.payPerson"  style="max-width:130px;width:130px;">
                    <el-option v-for="(item, index) in detailForm.debitCustomList" :key="index" :label="item.customName" :value="item.customId"></el-option>
                  </el-select>
                  <!-- <el-input class="inputControl must-s" v-model="receivePerson.payPerson"></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="票据类型：">
                  <el-select v-model="receivePerson.ticketType" placeholder="请选择票据类型" :clearable="true" style="max-width:130px;width:130px;">
                    <el-option label="发票" value="invoice"></el-option>
                    <el-option label="收据" value="quittance"></el-option>
                    <el-option label="无票据" value="nothing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="票据号码：" v-show="receivePerson.ticketType!='nothing'">
                  <el-input v-bind:class="receivePerson.ticketType=='nothing'?'inputControl':'inputControl'" v-model="receivePerson.code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="infoBox" v-show="dialogTitle == '新增退款单' || dialogTitle == '编辑退款单'">
          <h3>收款人信息</h3>
          <el-form>
            <el-row>
              <el-col :span="6">
                <el-form-item label=" 收款人：">
                  <el-input class="inputControl" readonly="readonly" v-model="reDebitInfo.payeeName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="结算日期：">
                  <!--<el-input class="inputControl" readonly="readonly" v-model="reDebitInfo.receiptDate"></el-input>-->
                  <el-date-picker
                    v-model="reDebitInfo.receiptDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择结算日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="infoBox" v-show="dialogTitle == '新增收款单' || dialogTitle == '编辑收款单'">
          <h3>款项明细</h3>
          <div v-for="(item,index) in detailForm.debitPaymentInfoList" :key="index">
          <div>
            <span v-text="item.paymentItemName"></span>
            <span class="explan" v-show="item.paymentItemName!='POS手续费' && pendingFlag==0">(应收信息：应收金额<span v-text="item.receivableAmount"></span> 已收金额<span v-text="item.receivedAmount"></span> 未收金额 <span v-text="item.unreceiveAmount"></span>)</span>
            <div style="float:right;width:135px;text-align:center;">
              <el-button v-show="item.paymentItemName!='POS手续费'" type="text" size="small" @click="addPayData(item)">新增</el-button>
              <el-button type="text" size="small" @click="newTransAcc(detailForm,index)" v-show="item.paymentItemName!='POS手续费' && pendingFlag==0">内部转账</el-button>
            </div>
          </div>
          <el-table :data="item.debitPaymentList" border style="width: 100%">
            <el-table-column prop="paymentItemName" label="项目名称"></el-table-column>
            <el-table-column label="支付方式" width="170">
              <template slot-scope="scope">
                <el-select v-model="scope.row.payMethod" placeholder="请选择支付方式" :disabled="(scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour')?false:true" class="must-s paymethod" @change="addPostCharge('s',scope.row)">
                  <el-option v-if="scope.row.payMethod == 'theEarnestMoneyInpour' || scope.row.payMethod == 'handselInpour' || scope.row.payMethod == 'houseInpour'"
                    v-for="(item, index) in transferPayMethodOption"
                    :key="index"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                  <el-option v-if="scope.row.paymentItemName=='POS手续费'"
                    v-for="item in posPayMethodOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    id="removePOS">
                  </el-option>
                  <el-option v-if="scope.row.paymentItemName!='POS手续费' && scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour'"
                    v-for="item in payMethodsOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="bankAccount" label="银行账号" width="300">
              <template slot-scope="scope">
                <el-select v-model="scope.row.bankAccount" placeholder="请选择银行账号" class="bankNum bank-reset-width"><!--must-s-->
                  <el-option
                  v-for="item in scope.row.bankNoList"
                  :key="item.bankAccountNumber"
                  :label="item.bankAccountNumber"
                  :value="item.bankAccountNumber"></el-option>

                  <!--<el-option v-if="scope.row.paymentItemName=='POS手续费'"
                    v-for="item in scope.row.bankAccountName"
                    :key="item.bankAccountNumber"
                    :label="item.bankAccountNumber"
                    :value="item.bankAccountNumber"></el-option>&lt;!&ndash;posBankOption&ndash;&gt;
                  <el-option v-if="scope.row.paymentItemName!='POS手续费'"
                             v-for="item in scope.row.bankAccountName"
                             :key="item.bankAccountNumber"
                             :label="item.bankAccountNumber"
                             :value="item.bankAccountNumber"></el-option>&lt;!&ndash;bankOption&ndash;&gt;-->
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="money" label="金额" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.balance" :disabled="(scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour')?false:true" placeholder="请输入金额" class="receive"></el-input><!--@change="limitAccount"-->
              </template>
            </el-table-column>
            <el-table-column prop="abstract" label="摘要" width="220">
              <template slot-scope="scope">
                <el-input v-model="scope.row.summary" placeholder="请输入摘要"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="收款凭证">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="uploadFile(scope.row)">上传凭证</el-button>
                <!--<el-upload
                  class="upload-demo"
                  action="/zuul/api/storage/files/multipart/file"
                  name="files"
                  :multiple="true"
                  :data="uploadParams"
                  :on-change="handleChange"
                  :on-success="uploadSuccess"
                  :file-list="fileList">
                  <el-button size="small" type="text" @click="uploadFile(scope.row)">上传凭证</el-button>
                </el-upload>-->
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-show="(scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour')" type="text" @click.stop.prevent="deletePayData(item.debitPaymentList,scope.$index)">删除</el-button>
                <el-button type="text" v-show="scope.row.payMethod == 'theEarnestMoneyInpour' || scope.row.payMethod == 'handselInpour' || scope.row.payMethod == 'houseInpour'">--</el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
        </div>
        <div class="infoBox" v-show="dialogTitle=='新增退款单' || dialogTitle == '编辑退款单'">
          <h3>退款信息</h3>
          <div v-for="(item, index) in detailForm.refundInfoList" :key="index">
            <div>
              <span v-text="item.paymentItemName"></span>
              <span class="explan">(可退金额:{{item.couldRefundAmount}})</span>
              <div style="float:right;width:135px;text-align:center;">
                <!--<el-button type="text" size="small" @click="addCharge(item)">新增手续费</el-button>-->
              </div>
            </div>
            <el-table :data="item.refundPaymentList" border style="width: 100%">
              <el-table-column prop="paymentItemName" label="款项名称"></el-table-column>
              <el-table-column prop="money" label="结算金额" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.balance" placeholder="请输入金额" class="must-t" @change="limitAccountRefund"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="结算方式" width="170">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.payMethod" placeholder="请选择结算方式" class="must-t" @change="addPostCharge('t',scope.row)">
                    <el-option v-if="scope.row.paymentItemName=='手续费'"
                               v-for="item in posPayMethodOption"
                               :key="item.value"
                               :label="item.name"
                               :value="item.value"
                               >
                    </el-option>
                    <el-option v-if="scope.row.paymentItemName!='手续费'"
                               v-for="item in payMethodsOption"
                               :key="item.value"
                               :label="item.name"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="bankAccount" label="银行账号" width="300">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bankAccount" placeholder="请选择银行账号" class="bank-reset-width"><!--class="must-t"-->
                    <el-option
                      v-for="item in scope.row.bankNoList"
                      :key="item.bankAccountNumber"
                      :label="item.bankAccountNumber"
                      :value="item.bankAccountNumber"></el-option>
                   <!-- <el-option v-if="scope.row.paymentItemName=='手续费'"
                               v-for="item in posBankOption"
                               :key="item.bankAccountNumber"
                               :label="item.bankAccountNumber"
                               :value="item.bankAccountNumber"></el-option>
                    <el-option v-if="scope.row.paymentItemName!='手续费'"
                               v-for="item in bankOption"
                               :key="item.bankAccountNumber"
                               :label="item.bankAccountNumber"
                               :value="item.bankAccountNumber"></el-option>-->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="票据号码" width="220">
                <template slot-scope="scope">
                  <span v-show="scope.row.paymentItemName!='手续费'">--</span>
                  <el-input v-model="scope.row.billCode" v-show="scope.row.paymentItemName=='手续费'" v-bind:class="scope.row.paymentItemName=='手续费'?'must-t':''"></el-input>
                </template>
              </el-table-column>
              <!--<el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click.stop.prevent="deletePayData(item.debitPaymentList,scope.$index)">删除</el-button>
                </template>
              </el-table-column>-->
            </el-table>
          </div>
        </div>
        <div style="margin-top:50px;text-align:center;padding-bottom:20px;">
          <!--<span>合计：11111111</span>-->
          <div style="float:right;width:100px;text-align:right;">
            <el-button type="success" @click="saveData">完成</el-button>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="房源选择" :visible.sync="selectHouseVisible">
        <housedetail @ievent ="ievent"></housedetail>
      </el-dialog>

      <el-dialog title="新增内部转账" :visible.sync="newTransAccVisible" width="75%" :before-close="closeNewTrans">
        <v-trans :transVal="transVal" :flag="refreshChildData" :clearSearch="clearSearch" @getChildData = "getChildData"></v-trans>
      </el-dialog>

      <el-dialog title="查看详情" :visible.sync="detailViewVisible" width="75%">
        <detailview :orderInfo="orderInfo"></detailview>
      </el-dialog>

      <el-dialog title="新增退款单" :visible.sync="newRefundVisible" width="75%">
        <newrefund></newrefund>
      </el-dialog>
    </div>
</template>

<script>
  import {getInnerTransList,getPosBankList,getBankList,getServerDate,getPayMethods,getBalanceList,getRefundDetail,editPayment,getReceiveDetail,getDebitList,getDebitDetail,getRefundList,payMent,getCookie,getRefundDetailForRefund,saveRefund,editRefundOrder,getRefundBankList,getHouseFullName,deleteReturn,deletePay} from "@/api/pages/mainPage/financialManagement/housingFund";
  import transAcc from './newTransAcc'
  import houseDetail from '../houseDetail'
  import detailView from './orderViewDetail'
  import newRefund from './newRefund'
    export default {
        components:{
          'v-trans':transAcc,
          'housedetail':houseDetail,
          'detailview':detailView,
          'newrefund':newRefund,
        },
        data(){
          return{
            title:'收支管理',
            tab:'uncollected',//选项卡控制
            newTransAccVisible:false,//新增内部转账弹框控制
            selectHouseVisible:false,
            detailViewVisible:false,
            newRefundVisible:false,
            transVal:'',
            orderInfo:null,
            houseNum:null,
            isHouseInfo:true,
            isMust:true,
            pendingFlag:null,
            fileList:[],
            tableData:[],
            tableData1:[],
            tableData2:[],
            detailForm:{},
            reDebitInfo:{},
            payMentDetailForm:[],
            payMethodsOption:[],
            posPayMethodOption:[
              {name:'POS',value:'POS'}
            ],
            transferPayMethodOption:[
            	{name:'意向金转入',value:'theEarnestMoneyInpour'},
          		{name:'定金转入',value:'handselInpour'},
          		{name:'售房款转入',value:'houseInpour'},
            ],
            projectCompanyId:null,
            bstp:null,
            bankOption:[],
            posBankOption:[],
            transferIndex:null,
            //分页控制
            pageNum:1,
            pageSize:10,
            currentPage:1,
            total:0,
            //搜索区域
            ywbh:'',
            searchForm:{
              businessType:['recognition'],
              isClear: 2
            },
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now()-86400000;
              }
            },
            //弹框
            dialogTableVisible: false,
            receivePerson:{},
            dialogTitle:'',//弹框标题
            limitFlag:true,
            lastIndex:null,
            uploadParams:{
              bussinessType:'finance',
            },
            childDebitIds:new Array(),
            refreshChildData:true,
            clearSearch:true,
          };

        },
        methods:{
          closeNewTrans:function(){
            //this.childDebitIds = null;
            this.clearSearch = !this.clearSearch;
            this.newTransAccVisible = false;
          },
          closeReceiveVisible(){
            this.dialogTableVisible = false;
            this.childDebitIds = new Array();
          },
          tabHandel:function(val){
             
            if(val == 'uncollected'){
              this.resetSearch();
              this.getPageData(1,this.pageSize);
            }else if(val == 'collection'){
              this.resetSearch();
              this.getDebitList(1,this.pageSize);
            }else{
              this.resetSearch();
              this.getRefundList(1,this.pageSize);
            }
          },
          handleChange(file, fileListParams) {
            console.log(file,fileListParams);
            this.fileList = fileListParams.slice(-3);
          },
          resetSearch:function(){//重置筛选内容
            this.searchForm = {
              businessType:this.searchForm.businessType,
              isClear: 2
            }
            this.ywbh = '';
            this.houseNum = '';
          },
          searchHandel:function(){
            if(this.tab == 'uncollected'){
              this.searchForm.formCode = this.ywbh;
              this.getPageData(1,this.pageSize);
            }else if(this.tab == 'collection'){
              this.searchForm.debitCode = this.ywbh;
              this.getDebitList(1,this.pageSize);
            }else{
              this.searchForm.refundCode = this.ywbh;
              this.getRefundList(1,this.pageSize);
            }
          },
          showDetail:function(row){
            this.detailViewVisible = true;
            let type = null;
            let title = null;
            if(this.tab == 'collection'){
              type = 'debit';
              title = '收款单详情'
            }else if(this.tab == 'refund'){
              type = 'refund';
              title = '退款单详情'
            }
            this.orderInfo = {
              type:type,
              title:title,
              orderId:row.id
            }
          },
          getChildData(data){
          	console.log('子组件返回数据',data);
            if(this.detailForm.transferPaymentList == null){
              this.detailForm.transferPaymentList = [data.data];
            }else{
              this.detailForm.transferPaymentList.push(data.data);
            }
            if(this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].balance == 0 || this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].balance == null){
              this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].balance = data.data.balance;
              this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].summary = data.data.summary;
              this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].bankNoList = data.data.baknNoList;
              this.transferPayMethodOption.push({value:data.data.payMethod,name:data.data.payMethodText})
              // this.transferPayMethodOption = [{value:data.data.payMethod,name:data.data.payMethodText}];
              this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].payMethod = data.data.payMethod;
              this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].isDisabled = true;
              this.childDebitIds.push(data.data.debitIds);
              this.newTransAccVisible = false;
            }else if(this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].balance != 0 && this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].balance != null){
              let flag = false;
              for(let i=0;i<this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList.length;i++){
                if(this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].balance == 0 || this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].balance == null){
                  this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].balance = data.data.balance;
                  this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].summary = data.data.summary;
                  this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].bankNoList = data.data.baknNoList;
                  // this.transferPayMethodOption = [{value:data.data.payMethod,name:data.data.payMethodText}];
                  this.transferPayMethodOption.push({value:data.data.payMethod,name:data.data.payMethodText})
                  this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].payMethod = data.data.payMethod;
                  this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[i].isDisabled = true;
                  this.childDebitIds.push(data.data.debitIds);
                  this.newTransAccVisible = false;
                  flag = true;
                  break;
                }
              }
              if(!flag){
                this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList.push(
                  {
                    attachFlag:null,
                    balance:data.data.balance,
                    bankAccount:null,
                    bankAccountName:null,
                    bankNoList:data.data.baknNoList,
                    debitCode:this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].debitCode,
                    debitId:null,
                    payMethod:data.data.payMethod,
                    paymentType:this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].paymentType,
                    paymentItem:this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].paymentItemName,
                    paymentItemName:this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].paymentItemName,
                    summary:data.data.summary,
                    isDisabled:true,
                    type:this.detailForm.debitPaymentInfoList[this.transferIndex].debitPaymentList[0].type
                  }
                )
                this.childDebitIds.push(data.data.debitIds);
                this.newTransAccVisible = false;
              }
            }
            console.log(this.detailForm.debitPaymentInfoList)
            console.log(this.transferPayMethodOption)
          },
          receivables:function(row,type){//收款，退款，编辑
            if(row.businessType == '认筹'){
              this.isHouseInfo = false;
            }else{
              this.isHouseInfo = true;
            }
            let that = this;

              let date = getServerDate();
              let y = date.getFullYear();
              let M = parseInt(date.getMonth() + 1);
              let d = date.getDate();
              if(M < 10){
                M = '0'+M;
              }
              if(d < 10){
                d = '0'+d;
              }
              that.receivePerson = {
                settleDate:y+'-'+M+'-'+d,
              }
              //that.receivePerson.settleDate = y+'-'+M+'-'+d;
              that.receivePerson.id = getCookie('session');
              that.receivePerson.name = unescape(document.cookie.split("userRealName=")[1].split(";")[0]);
              if(type == 'receive'){//收款
                if(row.balanceStatus == 'back'){
                  this.$confirm('该条单据已退房无法发起收款！','提示',{
                    type:'warning'
                  })
                }else if(row.balanceStatus == 'SETTLED'){
                  this.$confirm('该条单据已款清，是否继续发起收款！','提示',{
                    type:'warning'
                  }).then(function(){
                  	that.dialogTitle = '新增收款单';
                  	let params = {
                    	formId:row.formId,
                    	businessType:row.formType
                  	}
                  	getReceiveDetail(params).then(function(res){
                    	if(res.status == 200){
                      		that.detailForm = res.data;
                      		that.payMentDetailForm = res.data.debitPaymentList;
                          that.lastIndex = res.data.debitPaymentInfoList.length;
                          that.$set(that.receivePerson, 'payPerson', res.data.debitInfo.payerId)
                      		// that.receivePerson.payPerson = res.data.debitInfo.payerId;
                      		that.dialogTableVisible = true;
                      		that.projectCompanyId = res.data.projectCompanyId;
                      		that.bstp = res.data.businessType;
                      		that.pendingFlag = res.data.pendingFlag;
                      		//that.getPosBankList(res.data.projectCompanyId);
                    	}else{
                      		that.$message.error(res.message);
                    	}
                  	});
                  }).catch(function(){

                  })
                }else{
                  this.dialogTitle = '新增收款单';
                  let params = {
                    formId:row.formId,
                    businessType:row.formType
                  }
                  getReceiveDetail(params).then(function(res){
                    if(res.status == 200){
                      that.detailForm = res.data;
                      that.payMentDetailForm = res.data.debitPaymentList;
                      that.lastIndex = res.data.debitPaymentInfoList.length;
                      // that.receivePerson.payPerson = res.data.debitInfo.payerId;
                      that.$set(that.receivePerson, 'payPerson', res.data.debitInfo.payerId)
                      that.dialogTableVisible = true;
                      that.projectCompanyId = res.data.projectCompanyId;
                      that.bstp = res.data.businessType;
                      that.pendingFlag = res.data.pendingFlag;
                      //that.getPosBankList(res.data.projectCompanyId);
                    }else{
                      that.$message.error(res.message);
                    }
                  });
                }
              }else if(type == 'refund'){//退款
                 
                this.dialogTitle = '新增退款单';
                let params = {
                  debitId:row.id
                }
                getRefundDetailForRefund(params).then(function(res){
                  if(res.status == 200){
                    that.detailForm = res.data;
                    that.reDebitInfo = res.data.debitInfo;
                    that.dialogTableVisible = true;
                    that.projectCompanyId = res.data.projectCompanyId;
                    that.bstp = res.data.businessType;
                  }else{
                    that.$message({
                      message:res.message,
                      type:'error'
                    })
                  }

                });
              }else if(type == 'edit'){
                this.dialogTitle = '编辑收款单';
                let params = {
                  debitFormId:row.id
                };
                getDebitDetail(params).then(function(res){//获取收款单详情
                  if(res.status == 200){
                    that.detailForm = res.data;
                    that.receivePerson.name = res.data.debitInfo.payeeName;
                    that.receivePerson.id = res.data.debitInfo.payeeId;
                    that.receivePerson.settleDate = res.data.debitInfo.receiptDate;
                    // that.receivePerson.payPerson = res.data.debitInfo.payerId;
                    that.$set(that.receivePerson, 'payPerson', res.data.debitInfo.payerId)
                    that.receivePerson.ticketType = res.data.debitInfo.billType;
                    that.receivePerson.code = res.data.debitInfo.billCode;
                    that.lastIndex = res.data.debitPaymentInfoList.length;
                    that.dialogTableVisible = true;
                    that.projectCompanyId = res.data.projectCompanyId;
                    that.bstp = res.data.businessType;
                    that.editShowCharge();
                  }else{
                    that.$message({
                      message:res.message,
                      type:'error'
                    })
                  }
                });
              }else if(type == 'editRefund'){
                this.dialogTitle = '编辑退款单';
                let params = {
                  refundFormId:row.id
                }
                getRefundDetail(params).then(function(res){//获取退款单详情
                  if(res.status == 200){
                    that.detailForm = res.data;
                    that.reDebitInfo = res.data.debitInfo;
                    that.dialogTableVisible = true;
                  }else{
                    that.$message({
                      message:res.message,
                      type:'error'
                    })
                  }

                });
              }
          },
          ievent(data){
            let that = this;
            this.selectHouseVisible = false;
            this.searchForm.house = data.houseInfo.houseId;
            let params = {
              itemId:data.houseInfo.id
            }
            getHouseFullName(params).then(function(res){
              that.houseNum = res.data.houseFullName;
            })
          },
          addPayData(val){
            val.debitPaymentList.push(
              {
                attachFlag:'',
                balance:'',
                bankAccount:'',
                bankAccountName:'',
                bankNoList:null,
                debitCode:val.debitPaymentList[0].debitCode,
                debitId:'',
                payMethod:'',
                paymentItem:val.paymentItemName,
                paymentItemName:val.paymentItemName,
                summary:'',
                type:val.debitPaymentList[0].type
              }
            );
          },
          limitAccount:function(){
            this.limitFlag = true;
            for(let i=0;i<this.detailForm.debitPaymentInfoList.length;i++){
              let account = 0;
              for(let j=0;j<this.detailForm.debitPaymentInfoList[i].debitPaymentList.length;j++){
                if(this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].balance =='' || this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].balance == null){
                  this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].balance=0;
                }
                if(this.detailForm.debitPaymentInfoList[i].paymentItemName != 'POS手续费'){
                  account += parseFloat(this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].balance);
                }
              }

              if(this.dialogTitle=='新增收款单' || this.dialogTitle=='编辑收款单'){
                if(this.detailForm.debitPaymentInfoList[i].paymentItemName != 'POS手续费'){
                  if(this.detailForm.debitPaymentInfoList[i].unreceiveAmount<account){
                    this.$message({
                      message:this.detailForm.debitPaymentInfoList[i].paymentItemName+'超出可收款金额,请调整！',
                      type:'warning'
                    });
                    this.limitFlag = false;
                  }else{
                    this.limitFlag = true;
                  }
                }
              }
            }
          },
          limitAccountRefund:function(){
            this.limitFlag = true;
            for(let i=0;i<this.detailForm.refundInfoList.length;i++){
              let account = 0;
              for(let j=0;j<this.detailForm.refundInfoList[i].refundPaymentList.length;j++){
                if(this.detailForm.refundInfoList[i].refundPaymentList[j].balance==null){
                  this.detailForm.refundInfoList[i].refundPaymentList[j].balance = 0;
                }
                if(this.detailForm.refundInfoList[i].refundPaymentList[j].paymentItemName !='手续费'){
                  account += parseFloat(this.detailForm.refundInfoList[i].refundPaymentList[j].balance);
                }
              }
              if(this.detailForm.refundInfoList[i].couldRefundAmount<account){
                this.$message({
                  message:this.detailForm.refundInfoList[i].paymentItemName+'超出可退款金额,请调整！',
                  type:'warning'
                });
                this.limitFlag = false;
              }
            }
          },
          addPostCharge:function(type,row){
            if(type == 's'){//收款
              if(row.payMethod == 'POS' && row.paymentItemName == 'POS手续费'){
                this.getPosBankList(row);//this.projectCompanyId
              }else{
                this.getBankList(row);
              }
              let flag = 0;//POS收款项条数
              for(let i=0;i<this.detailForm.debitPaymentInfoList.length;i++){
                for(let j=0;j<this.detailForm.debitPaymentInfoList[i].debitPaymentList.length;j++){
                  if(this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].payMethod=='POS' && this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].paymentItem != 'POS手续费'){
                    flag+=1;
                  }
                }
              }
              let posEle = document.getElementById('removePOS');//POS手续费收款项
              if(flag == 1 && posEle==null){
                if(this.detailForm.debitPaymentInfoList.length==this.lastIndex){
                  this.detailForm.debitPaymentInfoList.push(
                    {
                      debitPaymentList:[
                        {
                          attachFlag:null,
                          balance:null,
                          bankAccount:null,
                          bankAccountName:null,
                          bankNoList:null,
                          debitCode:this.detailForm.debitPaymentInfoList[0].debitPaymentList[0].debitCode,
                          debitId:this.detailForm.debitPaymentInfoList[0].debitPaymentList[0].debitId,
                          id:null,
                          payMethod:null,
                          paymentItem:"POS手续费",
                          paymentItemName:"POS手续费",
                          summary:null,
                          type:this.detailForm.debitPaymentInfoList[0].debitPaymentList[0].type,
                        }
                      ],
                      paymentItemName:"POS手续费",
                    }
                  );
                }
              }else if(flag == 0){
                this.detailForm.debitPaymentInfoList.splice(this.lastIndex,1);
              }else if(flag < 1 && posEle!=null){
                this.detailForm.debitPaymentInfoList.splice(this.lastIndex,1);
              }

            }else if(type == 't'){//退款
              if(row.payMethod == 'POS' && row.paymentItemName == '手续费'){
                this.getRefundBankList(row);
              }else{
                this.getBankList(row);
              }
            }
          },
          deletePayData(val,index){
            if(val.length > 1){
              val.splice(index,1);
            }
            this.addPostCharge(val);
          },
          editShowCharge(){
          	//debugger
            let flag = 0;
            for(let i=0;i<this.detailForm.debitPaymentInfoList.length;i++){
              for(let j=0;j<this.detailForm.debitPaymentInfoList[i].debitPaymentList.length;j++){
                if(this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].payMethod=='POS'){
                  flag+=1;
                }
              }
            }
            let posEle = document.getElementById('removePOS');
            if(flag == 1 && posEle==null){
              if(this.detailForm.debitPaymentInfoList.length==this.lastIndex){
                this.detailForm.debitPaymentInfoList.push(
                  {
                    debitPaymentList:[
                      {
                        attachFlag:null,
                        balance:null,
                        bankAccount:null,
                        bankAccountName:null,
                        bankNoList:null,
                        debitCode:this.detailForm.debitPaymentInfoList[0].debitPaymentList[0].debitCode,
                        debitId:this.detailForm.debitPaymentInfoList[0].debitPaymentList[0].debitId,
                        id:null,
                        payMethod:null,
                        paymentItem:"POS手续费",
                        paymentItemName:"POS手续费",
                        summary:null,
                        type:this.detailForm.debitPaymentInfoList[0].debitPaymentList[0].type,
                      }
                    ],
                    paymentItemName:"POS手续费",
                  }
                );
              }
            }
          },
          uploadSuccess(res){
            console.log('上传成功',res);
          },
          uploadFile(row){//上传
            console.log('上传文件方法');
          },
          saveData:function(){//弹框完成按钮操作方法
            let that = this;
            let data = this.detailForm;
            //收款人信息
              data.debitInfo.payeeName = this.receivePerson.name;
              data.debitInfo.payeeId = this.receivePerson.id;
              data.debitInfo.payerId = this.receivePerson.payPerson;
              


              data.debitInfo.billCode = this.receivePerson.code;
              data.debitInfo.billType = this.receivePerson.ticketType;
              data.debitInfo.receiptDate = this.receivePerson.settleDate;

               
            if(this.dialogTitle == '新增收款单' || this.dialogTitle == '编辑收款单'){//发起收款,编辑收款

              /*for(let i=0;i<data.debitPaymentInfoList.length;i++){
                for(let j=0;j<data.debitPaymentInfoList[i].debitPaymentList.length;j++){
                  data.debitPaymentInfoList[i].debitPaymentList[j].bankNoList = null;//清除选择银行账号时赋的值
                }
              }*/
              this.detailForm.debitCustomList.map(item=>{
                if( data.debitInfo.payerId === item.customId ){
                  data.debitInfo.payerName = item.customName
                }
              })
              this.isMust = true;
              this.checkMustInput();
              //this.limitAccount();
              let oInput = document.getElementsByClassName('must-s el-input');
              let oSelect = document.getElementsByClassName('must-s el-select');
              for(let i=0;i<oInput.length;i++){
                if(oInput[i].children[0].value=='' || oInput[i].children[0].value==null){
                  this.isMust = false;
                  oInput[i].children[0].style='border-color:red';
                  setTimeout(function(){
                    oInput[i].children[0].style='border-color:#dcdfe6';
                  },1500)
                }
              }
              // this.detailForm.debitPaymentInfoList.map(item=>{// 判断支付方式不能为空
              //   item.debitPaymentList.map(item2=>{
              //     if( !item2.payMethod ){
              //       this.isMust = false;
              //     }
              //     if( item2.bankNoList.length > 0 && !item2.bankAccount ){
              //       this.isMust = false;
              //     }
              //   })
              // })
              for(let i=0;i<oSelect.length;i++){
                if(oSelect[i].children[0].children[0].value=='' || oSelect[i].children[0].children[0].value==null){
                  this.isMust = false;
                  oSelect[i].children[0].children[0].style='border-color:red';
                  setTimeout(function(){
                    oSelect[i].children[0].children[0].style='border-color:#dcdfe6';
                  },1500)
                }
              }
            
              if(!this.isMust){
                this.$message({
                  message:'请先完善信息！',
                  type:'warning',
                })
              }else if(this.limitFlag == false){
                this.$message({
                  message:'收款金额超出可收款金额，请调整！',
                  type:'warning'
                })
              }else{
                that.$confirm('确认所有信息无误，并发起收款？').then(function(){
                  if(that.dialogTitle == '新增收款单'){//提交新增收款单
                    for(let i=0;i<data.debitPaymentInfoList.length;i++){
                      for(let j=0;j<data.debitPaymentInfoList[i].debitPaymentList.length;j++){
                        if(data.debitPaymentInfoList[i].debitPaymentList[j].balance == '' || data.debitPaymentInfoList[i].debitPaymentList[j].balance == null){
                          data.debitPaymentInfoList[i].debitPaymentList[j].balance = 0;
                        }
                      }
                    }
                    payMent(data).then(function(res){
                      if(res.status == 200){
                        that.$message({
                          message: '您已成功发起收款！',
                          type: 'success'
                        });
                        that.childDebitIds = new Array();
                        that.dialogTableVisible = false;
                        that.detailForm = {};
                        that.getPageData(1,that.pageSize);
                      }else{
                        that.$message({
                          message: res.message,
                          type: 'error'
                        });
                      }
                    })
                  }else if(that.dialogTitle == '编辑收款单'){//提交编辑收款单
                    for(let i=0;i<data.debitPaymentInfoList.length;i++){
                      for(let j=0;j<data.debitPaymentInfoList[i].debitPaymentList.length;j++){
                        if(data.debitPaymentInfoList[i].debitPaymentList[j].balance == '' || data.debitPaymentInfoList[i].debitPaymentList[j].balance == null){
                          data.debitPaymentInfoList[i].debitPaymentList[j].balance = 0;
                        }
                      }
                    }
                    editPayment(data).then(function(res){
                      if(res.status == 200){
                        that.$message({
                          message: '您已成功发起收款！',
                          type: 'success'
                        });
                        that.childDebitIds = new Array();
                        that.dialogTableVisible = false;
                        that.detailForm = {};
                        that.getDebitList(1,that.pageSize);
                      }else{
                        that.$message({
                          message: res.message,
                          type: 'error'
                        });
                      }
                    })
                  }

                })
              }
            }else if(this.dialogTitle == '新增退款单' || this.dialogTitle == '编辑退款单'){//发起退款,编辑退款

              /*for(let i=0;i<data.refundInfoList.length;i++){
                for(let j=0;j<data.refundInfoList[i].refundPaymentList.length;j++){
                  data.refundInfoList[i].refundPaymentList[j].bankAccountName = null;//清除选择银行账号时赋的值
                }
              }*/
              this.detailForm.refundCustomList.map(item=>{
                if( data.debitInfo.payerId === item.customId ){
                  data.debitInfo.payerName = item.customName
                }
              })
              this.isMust = true;
              let oInput = document.getElementsByClassName('must-t el-input');
              let oSelect = document.getElementsByClassName('must-t el-select');
              for(let i=0;i<oInput.length;i++){
                if(oInput[i].children[0].value=='' || oInput[i].children[0].value==null){
                  this.isMust = false;
                  oInput[i].children[0].style='border-color:red';
                  setTimeout(function(){
                    oInput[i].children[0].style='border-color:#dcdfe6';
                  },1500)
                }
              }
              // console.log(this.detailForm.refundInfoList)
              // this.detailForm.refundInfoList.map(item=>{// 判断支付方式不能为空
              //   item.refundPaymentList.map(item2=>{
              //     if( !item2.payMethod ){
              //       this.isMust = false;
              //     }
              //     if( item2.bankNoList.length > 0 && !item2.bankAccount ){
              //       this.isMust = false;
              //     }
              //   })
              // })
              for(let i=0;i<oSelect.length;i++){
                if(oSelect[i].children[0].children[0].value=='' || oSelect[i].children[0].children[0].value==null){
                  this.isMust = false;
                  oSelect[i].children[0].children[0].style='border-color:red';
                  setTimeout(function(){
                    oSelect[i].children[0].children[0].style='border-color:#dcdfe6';
                  },1500)
                }
              }
              if(!this.isMust){
                this.$message({
                  message:'请完善信息！',
                  type:'warning'
                })
              }else{
                let data = this.detailForm;
                that.$confirm('确认信息无误，并发起退款？').then(function(){
                  if(that.dialogTitle == '新增退款单'){//新增退款单
                    saveRefund(data).then(function(res){
                      if(res.status == 200) {
                        that.$message({
                          message: '发起退款成功！',
                          type: 'success'
                        })
                        that.dialogTableVisible = false;
                        that.detailForm = {};
                        that.getPageData(1,that.pageSize);
                        that.getRefundList(1,that.pageSize);
                      }else{
                        that.$message({
                          message:res.message,
                          type:'error'
                        })
                      }
                    })
                  }else if(that.dialogTitle == '编辑退款单'){//编辑退款单
                    editRefundOrder(data).then(function(res){
                      if(res.status == 200) {
                        that.$message({
                          message: '发起退款成功！',
                          type: 'success'
                        })
                        that.dialogTableVisible = false;
                        that.detailForm = {};
                        that.getPageData(1,that.pageSize);
                        that.getRefundList(1,that.pageSize);
                      }else{
                        that.$message({
                          message:res.message,
                          type:'error'
                        })
                      }
                    })
                  }
                });
              }
            }
          },
          newTransAcc:function(val,index){
            this.transferIndex = index;
            let that = this;
            let params = {
              thisBusinessType:val.businessType, //'sign',//
              projectCompanyId:val.projectCompanyId, //'a47885b92d0211e8af88005056b44833',//
              thisBalanceFormId:val.balanceId,  //'06a2ecc3696a11e8b6017cd30ab8ab74',//
              nicheId:val.nicheId,   //'0ce0c070663e11e8b6017cd30ab8ab74',//
            }
            if(this.childDebitIds.length != 0){
              params.debitIds = this.childDebitIds;
            }
            getInnerTransList(params).then(function(res){
              if(res.status == 200){
                if(res.data.length != 0){
                  that.transVal = val;
                  if(that.childDebitIds.length != 0){
                    that.transVal.debitIds = that.childDebitIds;
                  }
                  that.refreshChildData = !that.refreshChildData;
                  that.newTransAccVisible = true;
                }else{
                  that.$message({
                    message:'该收支单无内部转账数据！',
                    type:'warning'
                  })
                }
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          },
          getPageData:function(pageNum,pageSize){
            let that = this;
            let businessType = ''
            this.searchForm.businessType.map((item, index)=>{
              if( index !== this.searchForm.businessType.length - 1 ){
                businessType = businessType + item + ','
              }else{
                businessType = businessType + item
              }
            })
            if( !businessType ){
              this.$message.error('请先选择业务类型')
              return
            }
            let params = {
              pageNum,
              pageSize,
              businessType,
              house: this.searchForm.house,
              startTime: this.searchForm.startTime,
              endTime: this.searchForm.endTime,
              propertyConsultName: this.searchForm.propertyConsultName,
              customName: this.searchForm.customName,
              mobile: this.searchForm.mobile,
              formCode: this.ywbh,
            }
            if( this.searchForm.isClear ){
              params.isClear = this.searchForm.isClear;
            }
            getBalanceList(params).then(function(res){
              that.tableData = res.data.list;
              that.total = res.data.total;
            });
          },
          getRefundList:function(pageNum,pageSize){
            let that = this;
            let businessType = ''
            this.searchForm.businessType.map((item, index)=>{
              if( index !== this.searchForm.businessType.length - 1 ){
                businessType = businessType + item + ','
              }else{
                businessType = businessType + item
              }
            })
            if( !businessType ){
              this.$message.error('请先选择业务类型')
              return
            }
            let params = {
              pageNum,
              pageSize,
              businessType,
              house: this.searchForm.house,
              startTime: this.searchForm.startTime,
              endTime: this.searchForm.endTime,
              propertyConsultName: this.searchForm.propertyConsultName,
              customName: this.searchForm.customName,
              mobile: this.searchForm.mobile,
              status: this.searchForm.status,
              refundCode: this.ywbh
            }
            getRefundList(params).then(function(res){
              that.tableData2 = res.data.list;
              that.total = res.data.total;
            });
          },
          getDebitList:function(pageNum,pageSize){
            let that = this;
            let businessType = ''
            this.searchForm.businessType.map((item, index)=>{
              if( index !== this.searchForm.businessType.length - 1 ){
                businessType = businessType + item + ','
              }else{
                businessType = businessType + item
              }
            })
            if( !businessType ){
              this.$message.error('请先选择业务类型')
              return
            }
            let params = {
              pageNum,
              pageSize,
              businessType,
              house: this.searchForm.house,
              startTime: this.searchForm.startTime,
              endTime: this.searchForm.endTime,
              propertyConsultName: this.searchForm.propertyConsultName,
              customName: this.searchForm.customName,
              mobile: this.searchForm.mobile,
              status: this.searchForm.status,
              debitCode: this.ywbh
            }
            getDebitList(params).then(function(res){
              that.tableData1 = res.data.list;
              that.total = res.data.total;
            });
          },
          handleSizeChange(val) {
            this.pageSize = val;
            if(this.tab=='uncollected'){
              this.getPageData(1,val);
            }else if(this.tab=='collection'){
              this.getDebitList(1,val);
            }else if(this.tab=='refund'){
              this.getRefundList(1,val);
            }
          },
          handleCurrentChange(val) {
            this.currentPage = val;
            this.pageNum = val;
            if(this.tab=='uncollected'){
              this.getPageData(val,this.pageSize);
            }else if(this.tab=='collection'){
              this.getDebitList(val,this.pageSize);
            }else if(this.tab=='refund'){
              this.getRefundList(val,this.pageSize);
            }
          },
          getBankList:function(obj){//获取银行账号下拉列表
            console.log(obj);
            let that = this;
            let params = {
              payMethod:obj.payMethod,
              projectCompanyId:this.projectCompanyId,//'a47885b92d0211e8af88005056b44833'
              businessType:this.bstp
            }
            console.log(params);
            getBankList(params).then(function(res){
              //that.bankOption = res.data;
              obj.bankNoList = res.data;
            });
          },
          getPosBankList:function(obj){
            let that = this;
            let params = {
              projectCompanyId:this.projectCompanyId //'a47885b92d0211e8af88005056b44833'
            }
            getPosBankList(params).then(function(res){
              //that.posBankOption = res.data;
              obj.bankNoList = res.data;
            });
          },
          getRefundBankList:function(row){
            let that = this;
            let params = {
              projectCompanyId:this.projectCompanyId
            }
            getRefundBankList(params).then(function(res){
              //that.posBankOption = res.data;
              row.bankNoList = res.data;
            })
          },
          checkMustInput:function(){
            let flag = 0;
            let accountInput = document.getElementsByClassName('receive');
            let selectBank = document.getElementsByClassName('bankNum');
            let selectPayMethod = document.getElementsByClassName('paymethod');
            for(let i=0;i<accountInput.length;i++){
              if(accountInput[i].children[0].value != '' && accountInput[i].children[0].value != 0){
                flag+=1;
                //selectBank[i].className+=' must-s';
                selectPayMethod[i].className+= ' must-s';
              }else{
                //selectBank[i].classList.remove('must-s');
                selectPayMethod[i].classList.remove('must-s');
              }
            }
            if(flag==0){
              this.isMust = false;
              this.$message({
                message:'您未填写任何收款信息！',
                type:'warning'
              })
            }else{
              this.isMust = true;
            }
          },
          //作废按钮（未复核和未通过时可作废）deleteReturn,deletePay
          deleteDetail(row,type){
            if(type==='refund'){
              //已收款
              console.log('已收款',row)
              this.$confirm('该收款单是否作废?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  console.log('确定',row);
                    let data={
                      debitId:row.id
                      }
                      deletePay(data).then((res) => {
                          if(res.status === 200){
                              console.log('请求成功')

                              this.getDebitList(1,this.pageSize);
                          }else{
                            this.$message.error(res.message);
                          }
                    });
                })
            }else if(type==='editRefund'){
              //已退款
               console.log('已退款',row)
                this.$confirm('该退款单是否作废?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  console.log('确定',row);
                    let data={
                      refundId:row.id
                      }
                      deleteReturn(data).then((res) => {
                          if(res.status === 200){
                              console.log('请求成功')
                              this.getRefundList(1,this.pageSize)
                          }else{
                            this.$message.error(res.message);
                          }
                    });
                })
            }
          },
        },

      created:function(){
        let that = this;
        this.getPageData(1,10);
        getPayMethods().then(function(res){
          that.payMethodsOption = res.data;
        })
      },
      mounted:function(){
          let container = document.getElementById('balancePay');
          let outer = container.parentElement;
          let minHeight = outer.offsetHeight * 0.94;
          container.style = "min-height:"+minHeight+"px";
      }

    }
</script>

<style scoped>
  #balancePay{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .container:nth-child(1){
    padding-top:20px;
    padding-left:25px;
    padding-right:25px;
  }
  .container:nth-child(3){
    padding:20px 25px;
  }
  .headShowPart{
    overflow: hidden;
    height: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 20px 25px;
  }
  .inputBox{
    height: 28px;
    line-height: 28px;
  }
  .inputLable{
    display:inline-block;
    width:60px;
    text-align:right;
    font-size: 12px;
    color: #666;
  }
  .inputControl{
    width: 130px;
    padding: 0;
    height: 28px;
  }
  .inputControl-long{
    min-width:340px!important;
  }
  .inputControl-long .el-input__inner{
    min-width:260px!important;
  }
  .el-dialog{
    width:75%!important;
  }
  .infoBox{
    padding:10px 20px;
    border-bottom:solid thin #dcdfe6;
  }
  .section{
    width:280px;
    display:inline-block;
    font-size:12px;
  }
  .itemBtn{
    color:#4DBE61;
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
  .bank-reset-width{
    max-width:300px;
    width:275px;
  }
  .bank-reset-width .el-input{
    max-width:300px;
    width:275px;
  }
  .bank-reset-width .el-input__inner{
    max-width:300px;
    width:275px;
  }

</style>
