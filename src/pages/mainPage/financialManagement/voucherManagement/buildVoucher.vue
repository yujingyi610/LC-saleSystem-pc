<template>
  <div id="buildVoucher">
    <div class="container">
      <el-radio-group v-model="tab" @change="tabHandle">
        <el-radio-button label="all">全部单据</el-radio-button><!--all-->
        <el-radio-button label="noGenerateVoucher">未生成凭证单据</el-radio-button><!--noGenerateVoucher-->
        <el-radio-button label="generateVoucher">已生成凭证单据</el-radio-button><!--generateVoucher-->
      </el-radio-group>
    </div>
    <div class="container">
      <div class="headShowPart">
        <div class="inputBox" style="width:341.52px;">
          <span class="inputLable">业务类型:</span>
          <el-radio-group v-model="searchForm.businessType" @change="changeBusinessType">
            <el-radio label="recognition" class="radio-text">认筹</el-radio>
            <el-radio label="subscribe" class="radio-text">认购</el-radio>
            <el-radio label="sign" class="radio-text">签约</el-radio>
          </el-radio-group>
        </div>
        <div class="inputBox">
          <span class="inputLable">城市公司:</span>
          <el-select class = "inputControl" v-model="projectCompanyId" value-key="id" @change="getProjectOption"><!--:disabled="!isDisabled"-->
            <el-option
              v-for="item in cityOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--<div style="width:429.5px;display:inline-block;">-->
        <div class="inputBox">
          <span class="inputLable">*项目:</span>
          <el-select class = "inputControl" v-model="searchForm.projectId" value-key="id" @change="getDestOption">
            <el-option
              v-for="item in projectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <span class="inputLable">*分期:</span>
          <el-select class = "inputControl" v-model="searchForm.devstagesId" placeholder="请选择分期" value-key="id" @change="getAreaOption">
            <el-option
              v-for="item in devstOption"
              :key="item.id"
              :label="item.devstagesName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <!--</div>-->
      </div>
      <div class="headShowPart" style="padding-top:0px;">
        <div class="inputBox">
          <span class="inputLable">结算日期:</span>
          <el-date-picker class = "inputControl"
                          v-model="searchForm.startTime"
                          type="date"
                          value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                          placeholder="选择日期" style="max-width:130px;width:130px;">
          </el-date-picker> --
          <el-date-picker class = "inputControl"
                          v-model="searchForm.endTime" :picker-options="pickerOptions1"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期" style="max-width:130px;width:130px;">
          </el-date-picker>
        </div>
        <div class="inputBox">
          <span class="inputLable">客户姓名:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入客户姓名" v-model="searchForm.customName"></el-input>
        </div>
        <div class="inputBox">
          <span class="inputLable">置业顾问:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入置业顾问" v-model="searchForm.propertyConsultName"></el-input>
        </div>
        <div class="inputBox">
          <span class="inputLable">组团:</span>
          <el-select class = "inputControl" v-model="searchForm.areaId" placeholder="请选择" value-key="id">
            <el-option v-for="item in groupOption" :key="item.id" :label="item.areaName" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div style="border-bottom:solid thin #dcdfe6;padding-top:0px;padding-right:25px;padding-bottom:20px;text-align:right">
        <div class="inputBox" style="width:189px;text-align:right;">
          <el-button class="cancel-lee" @click="resetSearch">重置</el-button>
          <el-button type="success" @click="search">查询</el-button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="tabBox" v-if="tab == 'all' || tab =='generateVoucher'">
        <el-table :data="tableData" border style="width: 100%" key="t1" tooltip-effect="dark">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" width="180"></el-table-column>
          <el-table-column label="房间号码" width="450">
            <template slot-scope="scope">
              <span>{{scope.row.businessType=='认筹'?'--':scope.row.houseFullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receiptDate" label="结算日期"></el-table-column>
          <el-table-column prop="amount" label="发生金额">
            <!--<template slot-scope="scope">
              <span>{{scope.row.type=='REFUND'?'-'+scope.row.amount:scope.row.amount}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="voucherStatusText" label="单据状态" show-overflow-tooltip></el-table-column>
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

      <div class="tabBox" v-if="tab == 'noGenerateVoucher'">
        <div class="tabFilter">
            <span style="width:200px;line-height: 50px;text-indent: 15px;color: #4DBE61;font-size: 14px;">生成规则</span>
            <span style="display:block;float:right;line-height:50px;margin-right:15px;">
              <div class="inputBox tabInner">
                <span>按银行结算</span>
                <el-radio-group v-model="isBank">
                  <el-radio :label="1" class="radio-text">是</el-radio>
                  <el-radio :label="0" class="radio-text">否</el-radio>
                </el-radio-group>
              </div>
              <div class="inputBox tabInner">
                <span>按客户分开</span>
                <el-radio-group v-model="isCustom">
                  <el-radio :label="1" class="radio-text">是</el-radio>
                  <el-radio :label="0" class="radio-text">否</el-radio>
                </el-radio-group>
              </div>
              <div class="inputBox tabInner">
                <span>收支是否分开</span>
                <el-radio-group v-model="isBalance">
                  <el-radio :label="1" class="radio-text">是</el-radio>
                  <el-radio :label="0" class="radio-text">否</el-radio>
                </el-radio-group>
              </div>
              <div class="inputBox">
                <el-button type="success" v-has="'fin:voucher:makeall'" @click="buildAll('all')">全部生成</el-button>
                <el-button type="success" v-has="'fin:voucher:make'" @click="buildVou('vou')">生成凭证</el-button>
              </div>
            </span>
        </div>
        <el-table :data="tableData" border style="width: 100%" key="t2" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="customName" label="客户名称" width="180"></el-table-column>
          <el-table-column label="房间号码" width="450">
            <template slot-scope="scope">
              <span>{{scope.row.businessType=='认筹'?'--':scope.row.houseFullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="formCode" label="单据编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="paymentItemName" label="款项名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receiptDate" label="结算日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amount" label="发生金额">
            <!--<template slot-scope="scope">
              <span>{{scope.row.type=='REFUND'?'-'+scope.row.amount:scope.row.amount}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="voucherStatusText" label="单据状态" show-overflow-tooltip></el-table-column>
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

    <!--生成凭证弹框开始-->
    <el-dialog title="凭证预览" :visible.sync="outerVisible" width="70%">

      <el-table :data="vouView" border style="width: 100%" tooltip-effect="dark">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="voucherDate" label="制单日期" width="180"></el-table-column>
        <el-table-column prop="voucherWord" label="凭证字" show-overflow-tooltip></el-table-column>
        <el-table-column prop="voucherCode" label="凭证号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="结算银行" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.bankAccountValueName==null?scope.row.bankAccountValue:scope.row.bankAccountValueName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.inOutType==0?'全部':scope.row.inOutType==1?'收入':'支出'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="借贷金额"></el-table-column>
        <el-table-column prop="userRealName" label="制单人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-has="'fin:voucher:modify'" @click="revise(scope.$index,scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="buildBtnBox" v-if="isShow">
        <el-button type="success" v-has="'fin:voucher:make'" @click="sureBuild">确定生成</el-button>
      </div>

      <div v-if="!isShow">
        <h3>发送日志</h3>
        <el-table :data="sendData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="sendType" label="类型" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendResult" label="发送结果" show-overflow-tooltip></el-table-column>
          <el-table-column prop="reContent" label="返回内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendTime" label="发送时间"></el-table-column>
          <el-table-column prop="sender" label="发送人" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-top:50px;text-align:right">
          <el-button type="success" v-has="'fin:voucher:dellocal'" @click="voucherSendHandle('del')">删除本地凭证</el-button>
          <el-button type="success" v-has="'fin:voucher:send'" @click="voucherSendHandle('send')">发送凭证</el-button>
          <el-button type="success" v-has="'fin:voucher:del'" @click="voucherSendHandle('delsend')">删除NC凭证</el-button>
        </div>
      </div>

      <el-dialog width="70%" title="记账凭证" :visible.sync="innerVisible" append-to-body>
        <div class="headShowPart" style="border-bottom:solid thin #dcdfe6;margin-bottom:20px;">
          <div class="inputBox">
            <span class="inputLable">凭证字:</span>
            <el-input class = "inputControl" size = "mini" placeholder="请输入凭证字" v-model="detailObj.voucherWord"></el-input>
          </div>
          <div class="inputBox">
            <span class="inputLable">凭证号:</span>
            <span v-text="detailObj.voucherCode"></span>
          </div>
          <div class="inputBox">
            <span class="inputLable">制单日期:</span>
            <el-date-picker v-model="detailObj.voucherDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择制单日期"></el-date-picker>
          </div>
          <div class="inputBox">
            <span class="inputLable">附件数:</span>
            <el-input class = "inputControl" size = "mini" placeholder="请输入附件数" v-model="detailObj.attachCount"></el-input>
          </div>
        </div>
        <el-table :data="detailObj.voucherDetailList" border style="width: 100%" :summary-method="getSummaries" show-summary tooltip-effect="dark">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column label="摘要" width="500" show-overflow-tooltip>
            <template slot-scope="scope">
              <!--<el-input class="long-input" style="max-width:300px;width:300px;" v-model="scope.row.remark"></el-input>-->
              <input type="text" v-model="scope.row.remark" class="setInput"/>
            </template>
          </el-table-column>
          <el-table-column prop="subjectName" label="科目" width="400" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.subjectName}}
            </template>
          </el-table-column>
          <el-table-column prop="balance" class="debitAccount" label="借方" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.debitName != null?scope.row.balance:'0'}}
            </template>
          </el-table-column>
          <el-table-column prop="balance" class="creditAccount" label="贷方" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.creditName != null?scope.row.balance:'0'}}
            </template>
          </el-table-column>
        </el-table>
        <div style="padding-top:36px;display:flex;justify-content:space-between">
          <div class="inputBox"><span class="inputLable">结算方式:</span><input style="text-align:center" v-model="detailObj.squareType" class="borderBottom" type="text"/></div>
          <div class="inputBox"><span class="inputLable">制单人:</span><input type="text" style="text-align:center" class="borderBottom" v-model="detailObj.userRealName" readonly="readonly" @focus="showChoicePerson"/><input v-model="detailObj.userId" type="hidden"/></div>
        </div>
        <div style="text-align:right;padding-top:24px;">
          <el-button class="cancel-lee" @click="cancel">返回</el-button>
          <el-button type="success" @click="saveVoucherDetail">保存</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{dialogMessage}}</span>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--组织架构树对话框-->
    <el-dialog title="人员选择" :visible.sync="showOrgTree">
      <v-tree ref="orgTree" :isRadio="true"></v-tree>
      <div class="dialogBtnBox" style="text-align:right">
        <el-button @click="showOrgTree = false" class="dialogBtn">取 消</el-button>
        <el-button type="primary" class="btn dialogBtn" @click="trueChoiceMember" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { loginUser } from "@/api/pages/login/index.js";
  import OrganizationTree from "@/components/OrganizationTree"
  import { getVoucherList,getPreviewVoucher,sureBuildVoucher,getDevstById,getDevstByProjectId,getAreaBydevstagesId,getAllProjectCityCompany,getProjectByCityId} from"@/api/pages/mainPage/financialManagement/voucher_controller"
    export default {
        components:{
          'v-tree':OrganizationTree
        },
        data(){
          return{
            /**********************日期选择范围控制开始******************************/
            pickerOptions: {
              disabledDate:this.buildOrderStartDate
            },
            pickerOptions1: {
              disabledDate:this.buildOrderEndDate
            },
            /**********************日期选择范围控制结束******************************/
            title:'生成凭证',
            dialogVisible:false,
            dialogMessage:'',
            tab:'all',//顶部选项卡
            //筛选区域
            searchForm:{
              businessType:'recognition',
            },
            pageNum:1,
            pageSize:10,
            total:0,
            currentPage:0,
            cityOption:[],//项目城市公司下拉框
            projectOption:[],//项目下拉框
            devstOption:[],//分期下拉框
            groupOption:[],//组团下拉框
            tableData:[],//表数据
            multipleSelection: [],
            //未生成凭证单据筛选
            isBank:0,//按银行结算
            isCustom:0,//按客户分开
            isBalance:0,//收支是否分开

            outerVisible:false,//凭证预览弹框
            innerVisible:false,//凭证修改弹框
            showOrgTree:false,//人员选择弹框
            isDisabled:false,
            vouView:[],//凭证预览列表数据
            //修改凭证数据
            detailObj:{},//修改数据对象
            rowIndex:0,
            postForm:{},//生成凭证向后台传递数据表单
            dilVouNum:'11012372',
            dilVouKey:'',
            dilMakeOrderDate:'',
            dilAttachmentNum:'',
            //记账凭证数据
            sendData:[],
            projectCompanyId:null,
            isShow:true,
          }
        },
      methods:{
          /**************************日期选择范围控制开始*****************************/
          buildOrderStartDate(time) {
            if(this.searchForm.endTime != null && this.searchForm.endTime != '' && typeof(this.searchForm.endTime) != 'undefined'){
              return time.getTime() > new Date(this.searchForm.endTime);
            }
          },
          buildOrderEndDate(time) {
            if(this.searchForm.startTime != null && this.searchForm.startTime != '' && typeof(this.searchForm.startTime) != 'undefined'){
              return time.getTime() < new Date(this.searchForm.startTime);
            }
          },
          /**************************日期选择范围控制开始*****************************/
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '总价';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] = (sums[index])/2;
              sums[index] += ' 元';
            } else {
              sums[index] = '--';
            }
          });

          return sums;
      },
        cancel(){
          this.innerVisible = false;
          this.detailObj.voucherWord = null;
          this.detailObj.attachCount = null;
          this.detailObj.squareType = null;
        },
        resetSearch:function(){
          this.searchForm = {
            businessType:this.searchForm.businessType,
            projectCompanyId:this.searchForm.projectCompanyId,
            projectId:this.searchForm.projectId,
            devstagesId:this.searchForm.devstagesId
          }
        },
        showChoicePerson(){
          this.showOrgTree=true;
        },
        trueChoiceMember(){
          this.detailObj.userRealName = this.$refs.orgTree.currentRow.realName;
          this.detailObj.userId = this.$refs.orgTree.currentRow.id;
          //orgNamePath 部门
          this.showOrgTree=false;
        },
        search:function(){
          if(typeof(this.searchForm.devstagesId)=='undefined' || this.searchForm.devstagesId == '' || this.searchForm.devstagesId == null){
            this.$message({
              message:'未选择分期无法查询数据！',
              type:'warning'
            });
          }else{
            this.getPageData(1,this.pageSize);
          }
        },
        tabHandle:function(val){
          this.searchForm.voucherStatus = val;
          if(typeof(this.searchForm.devstagesId)=='undefined' || this.searchForm.devstagesId == '' || this.searchForm.devstagesId == null){
            this.$message({
              message:'未选择分期无法查询数据！',
              type:'warning'
            });
          }else{
            this.getPageData(1,this.pageSize);
          }
        },
        changeBusinessType(){
          if(typeof(this.searchForm.devstagesId)=='undefined' || this.searchForm.devstagesId == '' || this.searchForm.devstagesId == null){
            this.$message({
              message:'未选择分期无法查询数据！',
              type:'warning'
            });
          }else{
            this.getPageData(1,this.pageSize);
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        buildVou(type){//生成凭证
          let that = this;
          if(this.multipleSelection.length==0){
            this.$confirm("请先勾选需要生成凭证的表单数据","提示",{
              type:'warning',
            })
          }else{
            //getPreviewVoucher
            let params = {};
            let ids = [];
            for(let i=0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            params.checkIds = ids.join(",");
            params.isAll = 'N';
            params.isBank = this.isBank;
            params.isCustom = this.isCustom;
            params.isBalance = this.isBalance;
            params.businessType = this.searchForm.businessType;
            params.projectId = this.searchForm.projectId;
            params.devstagesId = this.searchForm.devstagesId;
            this.isShow = true;
            getPreviewVoucher(params).then(function(res){
              if(res.status == 200){
                that.outerVisible = true;
                // ;
                that.vouView = res.data.voucherList;
                that.postForm = res.data;
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          }

        },
        buildAll(type){//全部生成
          let that = this;
          let params = {};
          params.isAll = 'Y';
          params.isBank = this.isBank;
          params.isCustom = this.isCustom;
          params.isBalance = this.isBalance;
          params.businessType = this.searchForm.businessType;
          params.projectId = this.searchForm.projectId;
          params.devstagesId = this.searchForm.devstagesId;
          this.isShow = true;
          getPreviewVoucher(params).then(function(res){
            if(res.status == 200){
              // ;
              that.outerVisible = true;
              that.vouView = res.data.voucherList;
              that.postForm = res.data;
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          })
        },
        revise(index,row){//修改凭证
          this.innerVisible = true;
          this.detailObj = row;
          this.rowIndex = index;
        },
        saveVoucherDetail:function(){
          let oIndex = this.rowIndex;
          this.postForm.voucherList[oIndex] = this.detailObj;
          //this.postForm.voucherDate = this.postForm.voucherList[oIndex].voucherDate;
          this.$message({
            message:'保存成功！',
            type:'success'
          })
          this.innerVisible = false;
        },
        sureBuild(){//确定生成
          let that = this;
          let data = this.postForm;
          this.$confirm('确定信息无误并生成凭证？','提示').then(function(){
            sureBuildVoucher(data).then(function(res){
              if(res.status == 200){
                that.$confirm('生成凭证成功！','提示',{type:'success'}).then(function(){
                  that.getPageData(1,that.pageSize);
                  that.isShow = false;
                  that.outerVisible = false;
                });
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                });
              }
            })
          });

        },
        voucherSendHandle(val){//发送日志处理
          if(val == 'del'){
            this.dialogVisible = true;
            this.dialogMessage = "删除凭证";
          }else if (val == 'send'){
            this.dialogVisible = true;
            this.dialogMessage = "发送凭证";
          } else if(val == 'delsend'){
            this.dialogVisible = true;
            this.dialogMessage = "删除发送凭证";
          }
          //this.outerVisible = false;
        },
        getPageData(pageNum,pageSize){
          let that = this;
          this.searchForm.pageNum = pageNum;
          this.searchForm.pageSize = pageSize;
          this.searchForm.status = 'rechecked';
          let params = this.searchForm;
          getVoucherList(params).then(function(res){
             ;
            if(res.status == 200){
              if(res.data.list.length == 0){
                that.$message({
                  message:'当前分期下无凭证数据！',
                  type:'warning'
                })
              }
              that.tableData = res.data.list;
              that.total = res.data.total;
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          });
        },
        getAllProjectCityCompany(){
          let that = this;
          getAllProjectCityCompany().then(function(res){
             if(res.status == 200){
               for(let i=0;i<res.data.length;i++){
                 let obj = new Object();
                 obj.value = res.data[i].id;
                 obj.label = res.data[i].name;
                 that.cityOption.push(obj);
               }
               if(that.cityOption.length != 0){
                 that.projectCompanyId = that.cityOption[0].value;
                 that.getProjectOption(that.projectCompanyId);
               }
             }else{
               that.$message({
                 message:res.message,
                 type:'error'
               })
             }
          })
        },
        getProjectOption(pid){
          console.log(pid);
          let that = this;
          let params = {
            id:pid
          }
          that.projectOption = [];
          getProjectByCityId(params).then(function(res){
             ;
            if(res.data.length != 0){
              for(let i=0;i<res.data.length;i++){
                let obj = new Object();
                obj.label = res.data[i].name;
                obj.value = res.data[i].id;
                that.projectOption.push(obj);
              }
              that.searchForm.projectId = that.projectOption[0].value;
              that.getDestOption(that.projectOption[0].value);
            }else{
              that.projectOption = [];
              that.devstOption = [];
              that.searchForm.projectId = null;
              that.searchForm.devstagesId = null;
            }
          })
        },
        getDestOption:function(val){
          let that = this;
           
          let params = {
            projectId:val,
            pageNum:1,
            pageSize:0
          };
          getDevstByProjectId(params).then(function(res){
            if(res.status == 200){
              that.devstOption = res.data.list;
              if(that.devstOption.length != 0){
                that.searchForm.devstagesId = that.devstOption[0].id;
                that.getPageData(1,that.pageSize);
              }else{
                that.searchForm.devstagesId = null;
              }
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          })
        },
        getAreaOption(val){
          let that = this;
          let params = {
            devstagesId:val,
            pageNum:1,
            pageSize:0
          }
          getAreaBydevstagesId(params).then(function(res){
            if(res.status == 200){
              that.groupOption = res.data.list;
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          })
        },
        handleSizeChange(val) {
          this.getPageData(1,val);
          this.pageSize = val;
        },
        handleCurrentChange(val) {
          this.getPageData(val,this.pageSize);
        }
      },
      created:function(){
        let that = this;
        loginUser().then(res => {
          if (res.status === 200) {
            if(res.data.cityName != null && res.data.cityCode != null){//如果有项目城市公司，城市公司筛选项为当前所属城市公司
              that.cityOption = [{value:res.data.cityId,label:res.data.cityName}];
              that.projectCompanyId = that.cityOption[0].value;
              if(res.data.projects.length == 0 || res.data.projects == null || typeof(res.data.projects) == 'undefined'){//如果有项目公司，但没有项目
                that.getProjectOption(that.projectCompanyId);//通过当前所属项目公司获取项目
              }else if(res.data.projects.length != 0 && res.data.projects != null && typeof(res.data.projects) != 'undefined'){//如果当前登录用户存在项目
                for(let i=0;i<res.data.projects.length;i++){//将当前登录人拥有的项目放入项目筛选下拉选择框
                  let obj = new Object();
                  obj.label = res.data.projects[i].projectName;
                  obj.value = res.data.projects[i].id;
                  that.projectOption.push(obj);
                }
                that.searchForm.projectId = that.projectOption[0].value;//设定项目默认值
                that.getDestOption(that.projectOption[0].value);//获取当前默认项目下的分期默认值
              }
            }else{//如果没有项目城市公司，(集团用户)当前城市公司筛选项为全部城市公司
              that.getAllProjectCityCompany();//获取全部城市项目公司
            }
          }
        })
      },
      mounted:function(){
        let container = document.getElementById('buildVoucher');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.94;
        container.style = "min-height:"+minHeight+"px";
      }
    }
</script>

<style scoped>
  #buildVoucher{
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
    display:inline-block;
    height: 28px;
    line-height: 28px;
  }
  .inputLable{
    display:inline-block;
    text-align:right;
    width:55px;
    font-size: 12px;
    color: #666;
  }
  .inputControl{
    width: 130px;
    padding: 0;
    height: 28px;
  }
  .inputControl:focus{
    border-color:#4dbe61;
  }
  .tabFilter{
    border:solid thin #dcdfe6;
    height:50px;
    margin-bottom:20px;
    border-radius:5px;
  }
  .tabFilter span{
    display:inline-block;
    height:50px;
  }
  .tabInner{
    margin-right:80px;
  }
  .buildBtnBox{
    width:100%;
    text-align:right;
    padding-top:50px;
  }
  .borderBottom{
    border-bottom:solid thin;
    border-top:none;
    border-left:none;
    border-right:none;
    outline:none;
  }
  h3{
    color:#4dbe61;
    font-size:14px;
    border-top:solid thin #dcdfe6;
    margin-top:36px;
  }
  .setInput{
    height: 28px;
    font-size: 12px;
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: 0;
    padding: 0 5px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width:480px;
  }
  .setInput:focus{
    border-color: #4dbe61;
  }
</style>
