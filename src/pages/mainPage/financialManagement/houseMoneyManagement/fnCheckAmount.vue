<template>
  <div id="fnCheck">
    <div class="container">
      <el-radio-group v-model="tab" @change="tabHandel" style="float: left;">
        <el-radio-button label="unRecheck">待复核</el-radio-button>
        <el-radio-button label="noRecheck">已复核未通过</el-radio-button>
        <el-radio-button label="rechecked">已复核通过</el-radio-button>
      </el-radio-group>
      <div class="checkBox" v-if="tab == 'rechecked'">
        <div class="inputBox">
          <span class="inputLable">复核人:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入客户姓名" v-model="searchForm.checkUser"></el-input>
        </div>
        <div class="inputBox">
          <span class="inputLable">凭证状态:</span>
          <el-select v-model="searchForm.voucherStatus" class = "inputControl" placeholder="请选择凭证状态">
            <el-option label="未生成凭证" value="noGenerateVoucher"></el-option>
            <el-option label="已生成凭证" value="generateVoucher"></el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <span class="inputLable">复核日期:</span>
          <el-date-picker
            v-model="searchForm.checkStartTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd" style="max-width:130px;width:130px;">
          </el-date-picker> --
          <el-date-picker
            v-model="searchForm.checkEndTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd" style="max-width:130px;width:130px;">
          </el-date-picker>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="container">
      <div class="headShowPart">
        <div class="inputBox">
          <span class="inputLable">业务类型:</span>
          <el-radio-group v-model="searchForm.businessType" @change="getPageData(1,pageSize)">
            <el-radio label="recognition" class="radio-text">认筹</el-radio>
            <el-radio label="subscribe" class="radio-text">认购</el-radio>
            <el-radio label="sign" class="radio-text">签约</el-radio>
          </el-radio-group>
        </div>
        <div class="inputBox" style="width:434.5px;">
          <span class="inputLable">房号:</span>
          <el-input class = "inputControl-long" size = "mini" placeholder="请选择房间编号" readonly="readonly" v-model="houseNum" @focus="selectHouseVisible = true"></el-input>
          <input type="hidden" v-model="searchForm.house">
        </div>
        <div class="inputBox">
          <span class="inputLable">客户姓名:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入客户姓名" v-model="searchForm.customName"></el-input>
        </div>
      </div>
      <div class="headShowPart" style="border-bottom:solid thin #dcdfe6">
        <div class="inputBox" style="width:253px;">
          <span class="inputLable">置业顾问:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入顾问姓名" v-model="searchForm.propertyConsultName"></el-input>
        </div>
        <div class="inputBox">
          <span class="inputLable">结算日期:</span>
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker> --
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputBox" style="width:194px;text-align:right;">
          <el-button class="cancel-lee" @click="resetHandel">重置</el-button>
          <el-button type="success" @click="searchHandel">查询</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="tabBox" v-show="tab == 'unRecheck'">
        <el-table :data="tableData" border style="width: 100%" key="t1" tooltip-effect="dark"><!--待复核-->
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="房间号码" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <span v-text="scope.row.businessType=='认筹'?'--':scope.row.houseFullName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型"></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receiptDate" label="结算日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amount" label="发生金额">
            <!--<template slot-scope="scope">
              <span>{{scope.row.type=='REFUND'?'-'+scope.row.amount:scope.row.amount}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="statusText" label="复核状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-has="'fin:dfh:list'" @click.stop.prevent="check(scope.row,'f')">复核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="tabBox" v-show="tab == 'noRecheck'">
        <el-table :data="tableData" border style="width: 100%" key="t2" tooltip-effect="dark"><!--已复核未通过-->
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="房间号码" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <span v-text="scope.row.businessType=='认筹'?'--':scope.row.houseFullName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型"></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receiptDate" label="结算日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amount" label="发生金额">
            <!--<template slot-scope="scope">
              <span>{{scope.row.type=='REFUND'?'-'+scope.row.amount:scope.row.amount}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="statusText" label="复核状态"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-has="'fin:yfh:no'" @click.stop.prevent="check(scope.row,'f')">复核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="tabBox" v-show="tab == 'rechecked'">
        <el-table :data="tableData" border style="width: 100%" key="t3" tooltip-effect="dark"><!--复核已通过-->
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
          <el-table-column label="房间号码" show-overflow-tooltip width="300">
            <template  slot-scope="scope">
              <span v-text="scope.row.businessType=='认筹'?'--':scope.row.houseFullName"></span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型"></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receiptDate" label="结算日期"></el-table-column>
          <el-table-column prop="amount" label="发生金额">
            <!--<template slot-scope="scope">
              <span>{{scope.row.type=='REFUND'?'-'+scope.row.amount:scope.row.amount}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="checkTime" label="复核时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkUserRealName" label="复核人"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-has="'fin:ffh:ok'" @click.stop.prevent="check(scope.row,'r')">反复核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogTableVisible" width="75%">
      <div class="infoBox">
        <div class="section">
          <span>业务类型：</span><span>{{detailForm.businessType=='recognition'?'认筹':detailForm.businessType=='subscribe'?'认购':'签约'}}</span>
        </div>
        <div class="section">
          <!--<a class="itemBtn">查看业务单据详情</a>-->
        </div>
      </div>
      <div class="infoBox" v-show="detailForm.businessType != 'recognition'">
        <h3>房间信息</h3>
        <div class="section" style="width:500px;">
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
      <div class="infoBox" v-show="dislogTitle='收款单复核'" v-for="(item, index) in detailForm.debitCustomList" :key="index">
        <h3>客户信息</h3>
        <div class="section"><span>客户姓名：</span><span v-text="item.customName"></span></div>
        <div class="section"><span>手机号码：</span><span v-text="item.tel"></span></div>
        <div class="section"><span>性别：</span><span v-text="item.sex"></span></div>
        <div class="section"><span>证件类型：</span><span v-text="item.certificateName"></span></div>
        <div class="section"><span>证件号码：</span><span v-text="item.certificateNo"></span></div>
        <div class="section"><span>邮寄地址：</span><span v-text="item.addr"></span></div>
      </div>
      <div class="infoBox" v-show="dislogTitle='退款单复核'" v-for="(item, index) in detailForm.refundCustomList" :key="index">
        <h3>客户信息</h3>
        <div class="section"><span>客户姓名：</span><span v-text="item.customName"></span></div>
        <div class="section"><span>手机号码：</span><span v-text="item.tel"></span></div>
        <div class="section"><span>性别：</span><span v-text="item.sex"></span></div>
        <div class="section"><span>证件类型：</span><span v-text="item.certificateName"></span></div>
        <div class="section"><span>证件号码：</span><span v-text="item.certificateNo"></span></div>
        <div class="section"><span>邮寄地址：</span><span v-text="item.addr"></span></div>
      </div>
      <div class="infoBox">
        <h3>置业顾问信息</h3>
        <div class="section"><span>置业顾问：</span><span v-text="detailForm.propertyConsultName"></span></div>
        <div class="section"><span>顾问手机：</span><span v-text="detailForm.propertyConsultTel"></span></div>
      </div>
      <div class="infoBox" v-show="dialogTitle=='收款单复核'">
        <h3>收款人信息</h3>
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label=" 收款人：">
                <el-input class="inputControl" v-model="debitInfoForm.payeeName" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结算日期：">
                <!--<el-input class="inputControl" v-model="debitInfoForm.receiptDate" readonly="readonly"></el-input>-->
                <el-date-picker class="inputContro w130" v-model="debitInfoForm.receiptDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择制单日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交款人：">
                <el-input class="inputControl" v-model="debitInfoForm.payerName" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="票据类型：">
                <el-select placeholder="请选择票据类型" class="must-s w130" v-model="debitInfoForm.billType">
                  <el-option label="发票" value="invoice"></el-option>
                  <el-option label="收据" value="quittance"></el-option>
                  <el-option label="无票据" value="nothing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="debitInfoForm.billType != 'nothing'">
            <el-col :span="6">
              <el-form-item label="票据号码：">
                <el-input v-bind:class="debitInfoForm.billType=='nothing'?'inputControl':'inputControl must-s'" v-model="debitInfoForm.billCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="infoBox" v-show="dialogTitle=='退款单复核'">
        <h3>收款人信息</h3>
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label=" 收款人：">
                <el-input class="inputControl" v-model="debitInfoForm.payeeName" readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结算日期：">
                <!--<el-input class="inputControl" v-model="debitInfoForm.receiptDate" readonly="readonly"></el-input>-->
                <el-date-picker class="inputContro w130" v-model="debitInfoForm.receiptDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择制单日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="infoBox" v-show="dialogTitle=='收款单复核'">
        <h3>款项明细</h3>
        <div v-for="(item, index) in detailForm.debitPaymentInfoList" :key="index">
        <div>
          <span v-text="item.paymentItemName"></span>
          <!--<span class="explan" v-show="item.paymentItemName != 'POS手续费'">(应收信息：应收金额<span v-text="item.receivableAmount"></span> 已收金额<span v-text="item.receivedAmount"></span> 未收金额 <span v-text="(item.receivableAmount) - (item.receivedAmount)"></span>)</span>-->
          <div style="float:right;width:100px;text-align:center;">
            <!--<el-button type="text" size="small" @click="addPayData('dp')">新增</el-button>-->
          </div>
        </div>
        <el-table :data="item.debitPaymentList" border style="width: 100%">
          <el-table-column prop="paymentItemName" label="项目名称"></el-table-column>
          <el-table-column label="支付方式" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.payMethod" placeholder="请选择支付方式" @change="getBankList(scope.row)" :disabled="(scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour')?false:true">
                <el-option v-if="scope.row.paymentItemName != 'POS手续费' && scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour'"
                           v-for="item in payMethodsOption"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value"></el-option>
                <el-option v-if="scope.row.paymentItemName == 'POS手续费' && scope.row.payMethod != 'theEarnestMoneyInpour' && scope.row.payMethod != 'handselInpour' && scope.row.payMethod != 'houseInpour'"
                           v-for="item in posPayMethodsOption"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value"></el-option>
                           <!--transPayMethodOption-->
                <el-option v-if="scope.row.payMethod == 'theEarnestMoneyInpour' || scope.row.payMethod == 'handselInpour' || scope.row.payMethod == 'houseInpour'"
                           v-for="item in transPayMethodOption"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccount" label="银行账号" width="350">
            <template slot-scope="scope" style="width:300px">
              <el-select class="bankB must-s" v-model="scope.row.bankAccount" placeholder="请选择银行账号">
                <el-option v-for="item in scope.row.bankNoList" :key="item.bankAccountNumber" :label="item.bankAccountNumber" :value="item.bankAccountNumber"></el-option>
                <!--<el-option v-if="scope.row.paymentItemName!='POS手续费'"
                           v-for="item in bankOption"
                           :key="item.bankAccountNumber"
                           :label="item.bankAccountNumber"
                           :value="item.bankAccountNumber"></el-option>
                <el-option v-if="scope.row.paymentItemName=='POS手续费'"
                           v-for="item in posBankOption"
                           :key="item.bankAccountNumber"
                           :label="item.bankAccountNumber"
                           :value="item.bankAccountNumber"></el-option>-->
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="金额" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.balance" placeholder="请输入金额" readonly="readonly"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="abstract" label="摘要" width="250">
            <template slot-scope="scope">
              <el-input v-model="scope.row.summary" placeholder="请输入摘要"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="收款凭证">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="uploadFile(scope.row)">上传凭证</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">--</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
        <div style="margin-top:25px;">
          <div style="text-align:center">
            <!--<span>合计：11111111</span>-->
          </div>
          <div>
            <el-form label-width="80px" :model="checkSuggestion">
              <el-form-item label="复核意见：">
                <el-select v-model="checkSuggestion.checkOption" placeholder="请选择复核意见">
                  <el-option label="同意" value="agree"></el-option>
                  <el-option label="不同意" value="disagree"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注说明：">
                <el-input v-model="checkSuggestion.checkContent" type="textarea" placeholder="多行输入"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="success" style="margin-left:96%" @click="saveData">完成</el-button>
          </div>
        </div>
      </div>
      <div class="infoBox" v-show="dialogTitle=='退款单复核'">
        <h3>退款信息</h3>
        <div v-for="(item, index) in detailForm.refundInfoList" :key="index">
          <div>
            <span v-text="item.paymentItemName"></span>
            <!--<span class="explan">(可退金额:{{item.couldRefundAmount}})</span>-->
            <div style="float:right;width:135px;text-align:center;">
              <!--<el-button type="text" size="small" @click="addCharge(item)">新增手续费</el-button>-->
            </div>
          </div>
          <el-table :data="item.refundPaymentList" border style="width:100%">
            <el-table-column width="100" prop="paymentItemName" label="款项名称"></el-table-column>
            <el-table-column prop="money" label="结算金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.balance" placeholder="请输入金额" readonly="readonly"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="结算方式">
              <template slot-scope="scope">
                <el-select v-model="scope.row.payMethod" placeholder="请选择结算方式" @change="getBankList(scope.row)">
                  <el-option v-if="scope.row.paymentItemName != '手续费'"
                    v-for="item in payMethodsOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"></el-option>
                  <el-option v-if="scope.row.paymentItemName == '手续费'"
                             v-for="item in posPayMethodsOption"
                             :key="item.value"
                             :label="item.name"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column class="bankS" prop="bankAccount" label="银行账号" width="350">
              <template class="bankA"  slot-scope="scope" style="width:300px">
                <el-select class="bankB must-t" v-model="scope.row.bankAccount" placeholder="请选择银行账号" >
                  <el-option v-for="item in scope.row.bankNoList" :key="item.bankAccountNumber" :label="item.bankAccountNumber" :value="item.bankAccountNumber" class="must-s"></el-option>
                  <!--<el-option v-if="scope.row.paymentItemName!='手续费'"
                    v-for="item in bankOption"
                    :key="item.bankAccountNumber"
                    :label="item.bankAccountNumber"
                    :value="item.bankAccountNumber"></el-option>
                  <el-option v-if="scope.row.paymentItemName=='手续费'"
                             v-for="item in posBankOption"
                             :key="item.bankAccountNumber"
                             :label="item.bankAccountNumber"
                             :value="item.bankAccountNumber"></el-option>-->
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="abstract" label="票据号码">
              <template slot-scope="scope">
                <span v-show="scope.row.paymentItemName!='手续费'">--</span>
                <el-input v-model="scope.row.billCode" v-show="scope.row.paymentItemName=='手续费'"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top:25px;">
          <div style="text-align:center">
            <!--<span>合计：11111111</span>-->
          </div>
          <div>
            <el-form label-width="80px" :model="checkSuggestion">
              <el-form-item label="复核意见：">
                <el-select v-model="checkSuggestion.checkOption" placeholder="请选择复核意见">
                  <el-option label="同意" value="agree"></el-option>
                  <el-option label="不同意" value="disagree"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注说明：">
                <el-input v-model="checkSuggestion.checkContent" type="textarea" placeholder="多行输入"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="success" style="margin-left:96%" @click="saveRefundCheckHandle">完成</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--房号选择弹框-->
    <el-dialog title="房源选择" :visible.sync="selectHouseVisible">
      <housedetail @ievent ="ievent"></housedetail>
    </el-dialog>
  </div>
</template>

<script>
  import {getPosBankList,getBankList,getPageList,getPayMethods,getDebitDetail,getRefundDetail,subCheck,reSubCheck,getHouseFullName} from "@/api/pages/mainPage/financialManagement/housingFund";
  import houseDetail from '../houseDetail'
  export default {
      components:{
        'housedetail':houseDetail,
      },
      data(){
        return{
          title:'收支管理',
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now()-86400000;
            }
          },
          tab:'unRecheck',
          //表格数据
          tableData:[],
          //筛选区域
          searchForm:{
            businessType:'recognition'
          },
          houseNum:'',
          currentPage:1,
          total:0,
          pageNum:1,
          pageSize:10,
          selectHouseVisible:false,
          //弹框
          dialogTableVisible: false,
          dialogTitle:'',
          detailForm:{},
          debitInfoForm:{},
          downPayments:[
            { projectName:'首付款',
              payMethode:'',
              bankAccount:'',
              money:'',
              abstract:'',
            }
          ],//首付款
          bankOption:[],
          posBankOption:[],
          mortgage:[
            { projectName:'按揭付款',
              payMethode:'',
              bankAccount:'',
              money:'',
              abstract:'',
            }
          ],//商业按揭
          subCheckType:null,
          subCheckId:null,
          subCheckFormId:null,
          checkSuggestion:{},//复核意见
          payMethodsOption:[],
          posPayMethodsOption:[
            {name:'POS',value:'POS'}
          ],
          transPayMethodOption:[
          	{name:'意向金转入',value:'theEarnestMoneyInpour'},
          	{name:'定金转入',value:'handselInpour'},
          	{name:'售房款转入',value:'houseInpour'},
          ],
          isMust:true,
          projectCompanyId:null,
          bsty:null,
        }
      },
      methods:{
        tabHandel:function(){
          this.resetHandel();
          this.getPageData(1,this.pageSize);
        },
        resetHandel:function(){//重置筛选内容
           this.searchForm = {
             businessType:this.searchForm.businessType
           }
           this.houseNum = '';
        },
        searchHandel:function(){//搜索
          this.getPageData(1,this.pageSize);
        },
        ievent(data){
          let that = this;
          this.selectHouseVisible = false;
          this.searchForm.house = data.houseInfo.houseId;
          //this.houseNum = data.houseInfo.name;
          let params = {
            itemId:data.houseInfo.id
          }
          getHouseFullName(params).then(function(res){
            that.houseNum = res.data.houseFullName;
          })
        },
        check(row,type){
           
          this.subCheckId = row.id;
          this.subCheckType = row.type;
          this.subCheckFormId = row.formId;
          let that = this;
          if(type == 'f'){
            this.dialogTableVisible = true;
            if(row.type == 'DEBIT'){
              this.dialogTitle = '收款单复核';
              let params = {
                debitFormId:row.formId
              };
              getDebitDetail(params).then(function(res){//获取收款单详情
                that.detailForm = res.data;
                that.debitInfoForm = res.data.debitInfo;
                that.projectCompanyId = res.data.projectCompanyId;
                that.bsty = res.data.businessType;
                that.getPosBankList(res.data.projectCompanyId);
              });
            }else if(row.type == 'REFUND'){
              this.dialogTitle = '退款单复核';
              let params = {
                refundFormId:row.formId
              }
              getRefundDetail(params).then(function(res){//获取退款单详情
                that.detailForm = res.data;
                that.debitInfoForm = res.data.debitInfo;
                that.projectCompanyId = res.data.projectCompanyId;
                that.bsty = res.data.businessType;
                that.getPosBankList(res.data.projectCompanyId);
              });

            }
          }else if(type == 'r'){
            //this.dialogTitle = '反复核收款单';
            let params = {
              checkInfoId:this.subCheckId,
              //formId:this.subCheckFormId,
              //type:this.subCheckType
            };
            this.$confirm('确定要对此单据进行反复核吗？','提示').then(function(){
              reSubCheck(params).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message:'反复核成功！',
                    type:'success'
                  })
                  that.getPageData(1,that.pageSize);
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              });
            }).catch(function(){});
          }
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getPageData(1,val);
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          this.getPageData(val,this.pageSize);
        },
        uploadFile(){//上传文件

        },
        getBankList:function(row){//获取银行账号下拉列表
          if(row.paymentItemName !='手续费'){
            let params = {
              businessType:this.bsty,
              projectCompanyId:this.projectCompanyId,
              payMethod:row.payMethod
            }
            getBankList(params).then(function(res){
              row.bankNoList = res.data;
            });
          }else{
            let params = {
              projectCompanyId:this.projectCompanyId
            }
            getPosBankList(params).then(function(res){
              row.bankNoList = res.data;
            });
          }

        },
        getPosBankList:function(cid){//获取POS手续费银行下拉列表
          let that = this;
          let params = {
            projectCompanyId:cid
          }
          getPosBankList(params).then(function(res){
            that.posBankOption = res.data;
          });
        },
        saveData:function(){//复核保存
          // debugger
          let that = this;
          this.checkSuggestion.formId = this.subCheckFormId;
          this.checkSuggestion.id = this.subCheckId;
          this.checkSuggestion.type = this.subCheckType;
          this.checkSuggestion.infoDto = {
            billCode:this.debitInfoForm.billCode,
            billType: this.debitInfoForm.billType,
            infoId: this.debitInfoForm.id,
            receiptDate: this.debitInfoForm.receiptDate
          };
          this.checkSuggestion.paymentList = [];
          for(let i=0;i<this.detailForm.debitPaymentInfoList.length;i++){
            for(let j=0;j<this.detailForm.debitPaymentInfoList[i].debitPaymentList.length;j++){
              this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].paymentId = this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].id;
              //delete this.detailForm.debitPaymentInfoList[i].debitPaymentList[j].id;
              this.checkSuggestion.paymentList.push(this.detailForm.debitPaymentInfoList[i].debitPaymentList[j]);
            }
          }
          let data = this.checkSuggestion;
           
          this.isMust = true;
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
          console.log(this.detailForm.debitPaymentInfoList)
          this.detailForm.debitPaymentInfoList.map(item=>{// 判断支付方式不能为空
                item.debitPaymentList.map(item2=>{
                  if( !item2.payMethod ){
                    this.isMust = false;
                  }
                  if( item2.bankNoList.length > 0 && !item2.bankAccount ){
                    this.isMust = false;
                  }
                })
              })
          // for(let i=0;i<oSelect.length;i++){
          //   if(oSelect[i].children[0].children[0].value=='' || oSelect[i].children[0].children[0].value==null){
          //     this.isMust = false;
          //     oSelect[i].children[0].children[0].style='border-color:red';
          //     setTimeout(function(){
          //       oSelect[i].children[0].children[0].style='border-color:#dcdfe6';
          //     },1500)
          //   }
          // }
          if(data.checkOption == undefined  || data.checkOption=='' || data.checkOption==null){
            this.$message({
              message:'请先完善复核意见！',
              type:'warning'
            })
          }/*else if(data.checkContent == undefined || data.checkContent=='' || data.checkContent==null){
            this.$message({
              message:'请先完善备注说明！',
              type:'warning'
            })
          }*/else if(!this.isMust){
            this.$message({
              message:'请先完善填写信息！',
              type:'warning'
            })
          }else{
            this.$confirm('确认信息无误并复核？','提示').then(function(){
              subCheck(data).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message:'复核完成！',
                    type:'success'
                  })
                  that.detailForm = {};
                  that.debitInfoForm = {};
                  that.checkSuggestion = {};
                  that.dialogTableVisible = false;
                  that.getPageData(1,that.pageSize);
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              });
            }).catch(function(){});
          }
        },
        closeDialog:function(){
          this.checkSuggestion = {};
          this.dialogTableVisible = false;
        },
        saveRefundCheckHandle:function(){
          // debugger
          let that = this;
          this.checkSuggestion.formId = this.subCheckFormId;
          this.checkSuggestion.id = this.subCheckId;
          this.checkSuggestion.type = this.subCheckType;
          this.checkSuggestion.infoDto = {
            billCode:this.debitInfoForm.billCode,
            billType: this.debitInfoForm.billType,
            infoId: this.debitInfoForm.id,
          };
          this.checkSuggestion.paymentList = [];
          for(let i=0;i<this.detailForm.refundInfoList.length;i++){
            for(let j=0;j<this.detailForm.refundInfoList[i].refundPaymentList.length;j++){
              this.detailForm.refundInfoList[i].refundPaymentList[j].paymentId = this.detailForm.refundInfoList[i].refundPaymentList[j].id;
              // delete this.detailForm.refundInfoList[i].refundPaymentList[j].id;
              this.checkSuggestion.paymentList.push(this.detailForm.refundInfoList[i].refundPaymentList[j]);
            }
          }
          let data = this.checkSuggestion;
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
          console.log(this.detailForm.refundInfoList)
          this.detailForm.refundInfoList.map(item=>{// 判断支付方式不能为空
                item.refundPaymentList.map(item2=>{
                  if( !item2.payMethod ){
                    this.isMust = false;
                  }
                  if( item2.bankNoList.length > 0 && !item2.bankAccount ){
                    this.isMust = false;
                  }
                })
              })
          // for(let i=0;i<oSelect.length;i++){
          //   if(oSelect[i].children[0].children[0].value=='' || oSelect[i].children[0].children[0].value==null){
          //     this.isMust = false;
          //     oSelect[i].children[0].children[0].style='border-color:red';
          //     setTimeout(function(){
          //       oSelect[i].children[0].children[0].style='border-color:#dcdfe6';
          //     },1500)
          //   }
          // }
          if(!this.isMust){
            this.$message({
              message:'请先完善填写信息！',
              type:'warning'
            })
          }else if(data.checkOption == undefined || data.checkOption=='' || data.checkOption == null){
            this.$message({
              message:'请先完善复核意见！',
              type:'warning'
            })
          }/*else if(data.checkContent == undefined || data.checkContent=='' || data.checkContent == null){
            this.$message({
              message:'请先完善备注说明！',
              type:'warning'
            })
          }*/else{
            this.$confirm('确认信息无误并复核？','提示').then(function(){
              subCheck(data).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message:'复核完成！',
                    type:'success'
                  })
                  that.detailForm = {};
                  that.debitInfoForm = {};
                  that.checkSuggestion = {};
                  that.dialogTableVisible = false;
                  that.getPageData(1,that.pageSize);
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              });
            }).catch(function(){});
          }
        },
        getPageData:function(pageNum,pageSize){
          let that = this;
          this.searchForm.status = this.tab;
          this.searchForm.pageNum = pageNum;
          this.searchForm.pageSize = pageSize;
          let params = this.searchForm;
          getPageList(params).then(function(res){
             ;
            that.total = res.data.total;
            that.tableData = res.data.list;
          })
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
        let container = document.getElementById('fnCheck');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.94;
        container.style = "min-height:"+minHeight+"px";
      }
    }
</script>

<style scoped>
  #fnCheck{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .container:nth-child(1){
    padding-top:20px;
    padding-left:25px;
  }
  .container:nth-child(3){
    padding:20px 25px;
  }
  .checkBox{
    margin-left:25.5%;
    width:72.5%;
    padding-right:30px;
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
    padding-bottom:5px;
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
    min-width:370px!important;
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


</style>
