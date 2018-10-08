<template>
  <div id="newRefund">
    <div class="container">
      <div class="headShowPart">
        <div class="inputBox">
          <span class="inputLable">业务类型:</span>
          <el-radio-group v-model="searchForm.businessType" @change="searchHandel">
            <el-radio label="recognition" class="radio-text">认筹</el-radio>
            <el-radio label="subscribe" class="radio-text">认购</el-radio>
            <el-radio label="sign" class="radio-text">签约</el-radio>
          </el-radio-group>
        </div>
        <div class="inputBox">
          <span class="inputLable">业务编号:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入业务编号" v-model="searchForm.formCode"></el-input>
        </div>
        <div class="inputBox" v-show="searchForm.businessType != 'recognition'">
          <span class="inputLable">房号:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请选择房号" readonly="readonly" @focus="selectHouseVisible = true" v-model="houseNum"></el-input>
          <input type="hidden" v-model="searchForm.house">
        </div>
        <div class="inputBox">
          <span class="inputLable">客户名称:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入客户姓名" v-model="searchForm.customName"></el-input>
        </div>
      </div>
      <div class="headShowPart" style="border-bottom:solid thin #dcdfe6">
        <div class="inputBox" style="width:253px;">
          <span class="inputLable">置业顾问:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请选择置业顾问" v-model="searchForm.propertyConsultName"></el-input>
        </div>
        <div class="inputBox"></div>
        <div class="inputBox"></div>
        <div class="inputBox" style="width: 348.5px;text-align: right;">
          <el-button class="cancel-lee" @click="resetSearch">重置</el-button>
          <el-button type="success" @click="searchHandel">查询</el-button>
        </div>
      </div>
    </div>
    <div class="container" style="margin-top:20px;">
      <el-table :data="tableData" border style="width: 100%" tooltip-effect="dark"><!--可收款-->
        <el-table-column prop="businessType" label="业务类型"></el-table-column>
        <el-table-column prop="formCode" label="业务编号"></el-table-column>
        <el-table-column prop="customName" label="客户名称"></el-table-column>
        <el-table-column prop="houseFullName" label="房号" show-overflow-tooltip width="360"></el-table-column>
        <el-table-column prop="totalAmount" label="发生额"></el-table-column>
        <el-table-column prop="refundAmount" label="可退金额"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" class="userManagement_actionBox">
            <el-button type="text" class="itemBtn" @click="showDetail(scope.row)">选择</el-button>
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
    <el-dialog title="退款信息" :visible.sync="refundInfoVisible" width="65%" append-to-body>
      <div>
        <div style="width:50%;float:left">
          <el-form label-position="right" label-width="80px" :model="headForm">
            <el-form-item label="业务类型：">
              <span v-text="headForm.businessType"></span>
            </el-form-item>
            <el-form-item label="客户名称：">
              <span v-text="headForm.customName"></span>
            </el-form-item>
            <el-form-item label="认购日期：">
              <span v-text="headForm.date"></span>
            </el-form-item>
            <el-form-item label="可退金额：">
              <span v-text="headForm.refundAmount"></span>
            </el-form-item>
          </el-form>
        </div>
        <div style="width:50%;float:left">
          <el-form label-position="right" label-width="80px" :model="headForm">
            <el-form-item label="业务编号：">
              <span v-text="headForm.formCode"></span>
            </el-form-item>
            <el-form-item label="房间号码：">
              <span v-text="headForm.houseFullName"></span>
            </el-form-item>
            <el-form-item label="置业顾问：">
              <span v-text="headForm.propertyConsultName"></span>
            </el-form-item>
            <el-form-item label="备注：">
              <span v-text="headForm.remark"></span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="clear: both"></div>
      <div style="border-top:solid thin #dcdfe6;" id="refundInfoContainer">
        <div v-for="(item, index) in refundInfo" :key="index">
          <h3>收款单 {{item.debitCode}}</h3>
          <div v-for="(initem, index1) in item.refundInfoList" :key="index1">
            <div>
              <span>{{initem.paymentItemName}}</span>
              <span class="explan">(可退金额:{{initem.couldRefundAmount}}元)</span>
            </div>
            <el-table :data="initem.refundPaymentList" border style="width: 100%">
              <el-table-column prop="paymentItemName" label="款项名称"></el-table-column>
              <el-table-column label="结算金额" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.balance" placeholder="请输入金额" :class="scope.row.paymentItemName=='手续费'?'sxf':'t-k'" @blur="checkAmount(initem)"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="结算方式" width="170">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.payMethod" placeholder="请选择支付方式" :class="scope.row.paymentItemName=='手续费'?'sx-m':'s-m'" @change="getBankAccount(scope.row)">
                    <el-option v-if="scope.row.paymentItemName=='手续费'"
                      v-for="item in posPayMethodsOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"></el-option>
                    <el-option v-if="scope.row.paymentItemName!='手续费'"
                      v-for="item in payMethodsOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="银行账户" width="200">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bankAccount" placeholder="请选择银行账号" :class="scope.row.paymentItemName=='手续费'?'sx-b':'s-b'">
                    <el-option v-for="item in scope.row.bankAccountName"
                               :key="item.bankAccountNumber"
                               :label="item.bankAccountNumber"
                               :value="item.bankAccountNumber"></el-option>
                    <!--<el-option v-if="scope.row.paymentItemName=='手续费'"
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
              <el-table-column label="票据号码" width="250">
                <template slot-scope="scope">
                  <span v-if="scope.row.paymentItemName != '手续费'">--</span>
                  <el-input v-if="scope.row.paymentItemName == '手续费'" v-model="scope.row.summary" :class="scope.row.paymentItemName=='手续费' && scope.row.balance != null && scope.row.balance != 0 && scope.row.balance != ''?'must-i':'noMust'" placeholder="请输入票据号码"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div style="padding:20px 0px 20px 20px;text-align:right;">
          <el-button type="success" @click="saveNewRefund">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="房号选择" :visible.sync="selectHouseVisible" append-to-body>
      <housedetail @ievent ="ievent"></housedetail>
    </el-dialog>
  </div>
</template>

<script>
  import {getPosBankList,getBankList,getPayMethods,getCouldRefundList,getRefundDetailList,saveNewRefund} from "@/api/pages/mainPage/financialManagement/housingFund";
  import houseDetail from '../../houseDetail'
    export default {
        components:{
          'housedetail':houseDetail
        },
        data(){
          return{
            name:'新增退款单',
            searchForm:{
              businessType:'recognition'
            },
            selectHouseVisible:false,
            refundInfoVisible:false,
            selectHouseVisible:false,
            payMethodsOption:[],
            posPayMethodsOption:[
              {name:'POS',value:'POS'}
            ],
            refundDetailForm:[],
            houseNum:null,
            headForm:{},
            detailForm:{},
            tableData:[],
            pageNum:1,
            pageSize:10,
            total:0,
            currentPage:1,
            refundInfo:[],
            bstp:null,
            projectCompanyId:null,
            posBankOption:[],
            bankOption:[],
            limitAmount:true,
            isMust:true,
          }
        },
      methods:{
        resetSearch(){
          this.searchForm = {
            businessType:this.searchForm.businessType
          }
          this.houseNum = '';
        },
        searchHandel(){
          this.getPageData(1,this.pageSize);
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getPageData(1,val);
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          this.getPageData(val,this.pageSize);
        },
        ievent(data){
          this.selectHouseVisible = false;
          this.searchForm.house = data.houseInfo.houseId;
          this.houseNum = data.houseInfo.name;
        },
        showDetail(row){
           
          this.headForm = row;
          let that = this;
          let params = {
            debitIds:row.debitIds
          }
          getRefundDetailList(params).then(function(res){
            if(res.status == 200){
               ;
              that.refundInfoVisible = true;
              that.refundInfo = res.data;
              that.projectCompanyId = res.data[0].projectCompanyId;
              that.bstp = res.data[0].businessType;
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          })
        },
        getPageData(pageNum,pageSize){
          let that = this;
          let params = this.searchForm;
          params.pageNum = pageNum;
          params.pageSize = pageSize;
          getCouldRefundList(params).then(function(res){
             ;
            that.total = res.data.total;
            that.tableData = res.data.list;
          })
        },
        getBankAccount(row){
          if(row.paymentItemName == '手续费'){
            this.getPosBankList(row);
          }else{
            this.getBankList(row);
          }
        },
        getBankList:function(row){//获取银行账号下拉列表
           
          let that = this;
          let params = {
            payMethod:row.payMethod,
            projectCompanyId:this.projectCompanyId,    //'a47885b92d0211e8af88005056b44833'
            businessType:this.bstp
          }
          getBankList(params).then(function(res){
            //that.bankOption = res.data;
            row.bankAccountName = res.data;
          });
        },
        getPosBankList:function(row){//获取POS手续费银行下拉列表
          let that = this;
          let params = {
            projectCompanyId:this.projectCompanyId
          }
          getPosBankList(params).then(function(res){
            //that.posBankOption = res.data;
            row.bankAccountName = res.data;
          });
        },
        checkAmount:function(val){
          this.limitAmount = true;
          let total = 0;
          for(let i=0;i<val.refundPaymentList.length;i++){
            if(val.refundPaymentList[i].balance != null && val.refundPaymentList[i].balance != ''){
              if(val.refundPaymentList[i].paymentItemName !="手续费"){
                total += parseFloat(val.refundPaymentList[i].balance);
              }
            }
          }
          if(total > val.couldRefundAmount){
            this.limitAmount = false;
            this.$message({
              message:val.paymentItemName+'超出可退款金额，请调整！',
              type:'warning'
            })
          }
        },
        checkMust:function(){
          //debugger
          this.isMust = true;
          let total = 0;
          let tkxx = document.getElementById('refundInfoContainer');
          let tk = tkxx.getElementsByClassName('t-k');
          let sm = tkxx.getElementsByClassName('s-m');
          let sb = tkxx.getElementsByClassName('s-b');
          let sxf = tkxx.getElementsByClassName('sxf');
          let sxm = tkxx.getElementsByClassName('sx-m');
          let sxb = tkxx.getElementsByClassName('sx-b');
          for(let i=0;i<tk.length;i++){
            if(tk[i].children[0].value != null && tk[i].children[0].value != '' && tk[i].children[0].value != 0){
              sm[i].classList.add('must-s');
              sb[i].classList.add('must-s');
              total += tk[i].children[0].value;
            }else{
              sm[i].classList.remove('must-s');
              sb[i].classList.remove('must-s');
            }
          }
          for(let a=0;a<sxf.length;a++){
            if(sxf[a].children[0].value != null && sxf[a].children[0].value != '' && sxf[a].children[0].value != 0){
              sxm[a].classList.add('must-s');
              sxb[a].classList.add('must-s');
            }else{
              sxm[a].classList.remove('must-s');
              sxb[a].classList.remove('must-s');
            }
          }
          if(total == 0){
            this.$message({
              message:'您未填写任何退款信息！',
              type:'warning'
            })
            this.isMust = false;
          }else{
            let mt = tkxx.getElementsByClassName('must-s');
            let imt = tkxx.getElementsByClassName('must-i');
            for(let n=0;n<mt.length;n++){
              if(mt[n].children[0].children[0].value == '' || mt[n].children[0].children[0].value == null ){
                this.isMust = false;
                mt[n].children[0].children[0].style='border-color:red';
                setTimeout(function(){
                  mt[n].children[0].children[0].style='border-color:#dcdfe6';
                },2500)
              }
            }
            for(let j=0;j<imt.length;j++){
              if(imt[j].children[0].value == '' || imt[j].children[0].value == null){
                this.isMust = false;
                imt[j].children[0].style='border-color:red';
                setTimeout(function(){
                  imt[j].children[0].style='border-color:#dcdfe6';
                },2500)
              }
            }
          }
        },
        saveNewRefund:function(){
          //debugger
          let that = this;
          let data = this.refundInfo;
          this.checkMust();
          if(this.isMust == false){
            this.$message({
              message:'请完善退款信息！',
              type:'warning'
            })
          }else if(this.limitAmount == false){
            this.$message({
              message:'退款总金额超出可退款金额，请核对后再进行保存！',
              type:'warning'
            })
          }else{
            let dIndex = [];
            let reduce = 0;
            for(let i=0;i<data.length;i++){
              for(let n=0;n<data[i].refundInfoList.length;n++){
                for(let j=0;j<data[i].refundInfoList[n].refundPaymentList.length;j++){
                  data[i].refundInfoList[n].refundPaymentList[j].bankAccountName = null;
                }
                if(data[i].refundInfoList[n].refundPaymentList[0].balance == null || data[i].refundInfoList[n].refundPaymentList[0].balance == "" || data[i].refundInfoList[n].refundPaymentList[0].balance == 0){
                 dIndex.push(i);
                }
              }
            }
            for(let x=0;x<dIndex.length;x++){
              if(x!=0){
                reduce += 1;
              }
              data.splice(dIndex[x]-reduce,1);
            }

            this.$confirm('确认信息无误并保存？','提示').then(function(){
              saveNewRefund(data).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message:'保存新增退款成功！',
                    type:'success'
                  })
                  that.refundInfoVisible = false;
                  that.refundInfo = [];
                  that.getPageData(1,that.pageSize);
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              })
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
      }
    }
</script>

<style scoped>
  .container:nth-child(1){
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
  .red{
    border-radius:3px;
    border:solid thin red;
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
