<template>
  <div id="transfer">
    <div class="container-oc" style="padding-bottom:0;">
      <el-radio-group v-model="tab" @change="tabHandle">
        <el-radio-button label="noSubMit">草稿</el-radio-button>
        <el-radio-button label="hasSubmit">已提交</el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <div class="headShowPart-oc" style="padding-bottom:0;">
        <div class="inputBox-oc">
          <span class="inputLable-oc">购房券号:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请输入购房券号" v-model="searchForm.ticketCode"></el-input>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">转让人:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请输入转让人姓名" v-model="searchForm.origUserRealName"></el-input>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">受让人:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请输入受让人姓名" v-model="searchForm.destUserRealName"></el-input>
          <span style="display:inline-block;width:58px;"></span>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">发放公司:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放公司" v-model="searchForm.companyName"></el-input>
        </div>
      </div>
      <div class="headShowPart-oc" style="border-bottom:solid thin #dcdfe6">
        <div class="inputBox-oc">
          <span class="inputLable-oc">是否有效:</span>
          <el-select v-model="searchForm.isValid" placeholder="请选择是否有效" class="inputControl-oc">
            <el-option label="全部" value="all"></el-option>
            <el-option label="有效" value="y"></el-option>
            <el-option label="无效" value="n"></el-option>
          </el-select>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">折扣转让单:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="折扣转让单" v-model="searchForm.code"></el-input>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">转让时间:</span>
          <el-date-picker
            v-model="searchForm.tranStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker> --
          <el-date-picker
            v-model="searchForm.tranEndTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"><!--:picker-options="pickerOptions"-->
          </el-date-picker>
        </div>
        <div class="inputBox-oc">
          <el-button class="cancel-lee" @click="resetHandle">重置</el-button>
          <el-button type="success" @click="searchHandle">查询</el-button>
        </div>
      </div>
      <div class="container-oc">
        <div style="float:right;margin-bottom:20px;">
          <div class="inputBox-oc" v-show="isShow" style="display:inline-block;margin-right:20px;">
            <span class="inputLable-oc">审核状态:</span>
            <!--<el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放年份" v-model="sendYear"></el-input>-->
            <el-select v-model="searchForm.auditStatus" placeholder="请选择审核状态" class = "inputControl-oc" @change="searchHandle">
              <el-option label="全部" value="all"></el-option>
              <el-option label="已审核" value="audited"></el-option>
              <el-option label="已退回" value="backed"></el-option>
              <el-option label="已拒绝" value="refused"></el-option>
            </el-select>
          </div>
          <div class="inputBox-oc" v-show="!isShow" style="display:inline-block;margin-right:20px;">
            <el-button type="success" size="mini" @click="addTransOrder">新增转让</el-button>
          </div>
        </div>
        <div v-show="!isShow">
          <el-table :data="tableData1" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="优惠券号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#4dbe61;cursor:pointer;" @click="showVoucherDetail(scope.row)">{{scope.row.ticketCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="origUserFullName" label="转让人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="origCertificateNo" label="证件号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amount" label="转让金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="applyDate" label="转让时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="destUserFullName" label="受让人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="operatorUserRealName" label="经办人"></el-table-column>
            <el-table-column prop="companyName" label="发放公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="审核状态"></el-table-column>
            <el-table-column prop="isValid" label="是否有效"></el-table-column>
            <el-table-column label="折扣转让单" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#4dbe61;cursor:pointer;" @click="showTransDetail(scope.row)">{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="editTransOrder(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteTransOrder(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=1
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalPage">
          </el-pagination>
        </div>
        <div v-show="isShow">
          <el-table :data="tableData2" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="优惠券号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#4dbe61;cursor:pointer;" @click="showVoucherDetail(scope.row)">{{scope.row.ticketCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="origUserFullName" label="转让人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="origCertificateNo" label="证件号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amount" label="转让金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="applyDate" label="转让时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="destUserFullName" label="受让人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="operatorUserRealName" label="经办人"></el-table-column>
            <el-table-column prop="companyName" label="发放公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="审核状态"></el-table-column>
            <el-table-column prop="isValid" label="是否有效"></el-table-column>
            <el-table-column label="折扣转让单" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#4dbe61;cursor:pointer;" @click="showTransDetail(scope.row)">{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
               <div v-show="scope.row.auditStatus == '审核中'">
                 <el-button type="text" @click="resetTransfer(scope.row)">撤回</el-button>
                 <el-button type="text" @click="checkHandle(scope.row)">审核</el-button>
               </div>
                <div v-show="scope.row.auditStatus == '已审核'">
                  <el-button type="text">==</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=1
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalPage">
          </el-pagination>
        </div>

      </div>
    </div>
    <el-dialog :title="addAndEdit" :visible.sync="addAndEditVisible" width="70%" :before-close="closeHandle">
      <div class="dialog-container">
        <h3>转让人</h3>
        <el-form :inline="true" :model="formDialog" class="demo-form-inline">
          <el-form-item label="姓  名：">
            <el-input class="must" v-model="formDialog.origUserRealName" @focus="showChoicePerson('zrr')" suffix-icon="el-icon-search" readonly="readonly" :disabled="isReadOnly"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input class="must" v-model="formDialog.origCertificateNo" placeholder="转让人身份证号" :readonly="isReadOnly"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input class="must" v-model="formDialog.origTel" placeholder="转让人手机号" :readonly="isReadOnly"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-container">
        <h3>受让人</h3>
        <el-form :inline="true" :model="formDialog" class="demo-form-inline">
          <el-form-item label="姓  名：">
            <el-input class="must" v-model="formDialog.destUserRealName" @focus="showChoicePerson('srr')" suffix-icon="el-icon-search" readonly="readonly" :disabled="isReadOnly"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input class="must" v-model="formDialog.destCertificateNo" placeholder="受让人身份证号" :readonly="isReadOnly"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input class="must" v-model="formDialog.destTel" placeholder="受让人手机号" :readonly="isReadOnly"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-container">
        <h3>经办人</h3>
        <el-form :inline="true" :model="formDialog" class="demo-form-inline">
          <el-form-item label="经办人：">
            <el-input class="must" v-model="formDialog.operatorUserRealName" readonly="readonly" :disabled="isReadOnly"></el-input>
          </el-form-item>
          <el-form-item label="申请日期：">
            <!--<el-date-picker readonly="readonly" v-model="formDialog.applyDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" suffix-icon="el-icon-date" :readonly="isReadOnly">
            </el-date-picker>-->
            <el-input class="must" readonly="readonly" v-model="formDialog.applyDate" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="padding-top:20px;position:relative;">

        <el-form :inline="true" :model="formDialog" class="demo-form-inline">
          <el-form-item label="备   注：">
            <el-input v-model="formDialog.remark" placeholder="备注" style="width:173px;" :readonly="isReadOnly" @change="remarkLength"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" style="position:absolute;right:0;top:20px;" @click="addTransfer" v-show="!isReadOnly">新增</el-button>

        <div v-show="!isReadOnly"><el-table row-key="id" :data="voucherTable" tooltip-effect="dark" style="width: 100%" border show-summary :summary-method="getSummaries" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :reserve-selection='true' width="55"></el-table-column>
          <el-table-column label="券号">
            <template slot-scope="scope">
              <!--<el-input v-model="scope.row.ticketNum" suffix-icon="el-icon-search" :readonly="isReadOnly"></el-input>-->
              <el-button type="text">{{scope.row.ticketCode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="发放公司"></el-table-column>
          <el-table-column prop="beforeAmount" label="可转金额"></el-table-column>
          <el-table-column prop="remainAmount" label="转让金额" show-overflow-tooltip></el-table-column>
        </el-table></div>
        <div v-show="isReadOnly"><el-table :data="voucherTable" tooltip-effect="dark" style="width: 100%" border show-summary :summary-method="getSummaries" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column label="券号">
            <template slot-scope="scope">
              <el-button type="text">{{scope.row.ticketCode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="发放公司"></el-table-column>
          <el-table-column prop="beforeAmount" label="可转金额"></el-table-column>
          <el-table-column prop="remainAmount" label="转让金额" show-overflow-tooltip></el-table-column>
        </el-table></div>
      </div>
      <div class="dialog-container" style="position: relative;">
        <h3>附件信息</h3>
        <el-button type="text" style="position:absolute;right:0;top:15px;" v-show="!isReadOnly">附件上传</el-button>
        <el-table :data="fileTable" tooltip-effect="dark" style="width: 100%" border>
          <el-table-column prop="fileName" label="文件名"></el-table-column>
          <el-table-column prop="fileSize" label="附件大小"></el-table-column>
          <el-table-column prop="uploader" label="上传人"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">下载</el-button>
              <el-button type="text" v-show="!isReadOnly">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-collapse @change="displayCheckRecord" v-show="isReadOnly"><!--v-model="activeNames"-->
        <el-collapse-item title="审批记录" name="1">
          <div>我应在江湖悠悠</div>
          <div>饮一壶浊酒</div>
        </el-collapse-item>
      </el-collapse>
      <div style="padding-top:30px;text-align:center;" v-show="isReadOnly">
        <el-button type="success" @click="checkVisible = true">审批</el-button>
      </div>
      <div style="padding-top:30px;text-align:right;" v-show="!isReadOnly">
        <el-button type="success" @click="saveTransfer">保存</el-button>
        <el-button type="success" @click="submitTrans">提交</el-button>
      </div>
    </el-dialog>

    <!--组织架构树对话框-->
    <el-dialog title="人员选择" :visible.sync="showOrgTree">
      <v-orgTree ref="orgTree" :isRadio="true"></v-orgTree>
      <div class="dialogBtnBox">
        <el-button @click="showOrgTree = false" class="dialogBtn">取 消</el-button>
        <el-button type="primary" class="btn dialogBtn" @click="trueChoiceMember" >确 定</el-button>
      </div>
    </el-dialog>

    <!--项目公司选择弹框-->
    <el-dialog title="发放公司选择" :visible.sync="companyVisible">
      <div style="width:100%;height:350px;overflow:scroll">
        <companypage @getCompany="getCompany"></companypage>
      </div>
      <div style="text-align:right;margin-top:20px;"><el-button type="success" @click="insertCompany">确定</el-button></div>
    </el-dialog>

    <!--优惠券详情弹框-->
    <el-dialog title="优惠券详情" :visible.sync="detailVisible" width="70%">
      <coupondetail :ticketId="couponId"></coupondetail>
    </el-dialog>

    <!--转让单详情弹框-->
    <el-dialog title="折扣转让单详情" :visible.sync="transdetailVisible" width="70%">
      <transdetail :ticketId="transId"></transdetail>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{dialogMessage}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false,grantVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <!--审批操作弹框-->
    <el-dialog title="审批操作" :visible.sync="checkVisible" width="70%" :before-close="cancleHandle">
      <el-form ref="form" :model="checkDialogForm" label-width="80px">
        <el-form-item label="审批结果:">
          <el-radio-group v-model="checkDialogForm.auditStatus">
            <el-radio label="audited">通过</el-radio>
            <el-radio label="backed">退回</el-radio>
            <el-radio label="refused">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见:">
          <el-input type="textarea" v-model="checkDialogForm.auditOpinion"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top:20px;text-align:center;">
        <el-button type="success" @click="sureCheck">审核</el-button>
        <el-button class="cancel-lee" @click="cancleHandle">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import "@/assets/styles/ocuponStyle.css"
  import { getCookie,resetTransfer,checkTransfer,getTransferList,getTransferDetailById,newAndEditTransfer,getTicketByUserId,submitTransfer,getDetailById,deleteTransfer,getServerDate,objLength } from "@/api/pages/mainPage/financialManagement/valueVoucher/index.js";
  import dialogInput from "@/components/dialogInput"
  import OrganizationTree from "@/components/OrganizationTree"
  import companyTree from "../../projectCompany"
  import couponDetail from "../couponDetail"
  import transDetail from "../transferDetail"
  export default {
    components:{
      'v-input': dialogInput,
      'v-orgTree':OrganizationTree,
      'companypage':companyTree,
      'coupondetail':couponDetail,
      'transdetail':transDetail
    },
    data(){
      return{
        tab:'noSubMit',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()-86400000;
          }
        },
        //弹框控制
        checkVisible:false,
        showOrgTree:false,
        companyVisible:false,
        detailVisible:false,
        dialogVisible:false,
        transdetailVisible:false,
        addFlag:true,
        dialogMessage:'',
        couponId:'',
        transId:'',
        changePersonStatus:null,
        //搜索区域
        searchForm:{},
        idsArray:[],
        //表格区域数据
        totalPage:0,
        pageNum:1,
        pageSize:10,
        addAndEdit:'',
        tableData1:[],
        tableData2:[],
        formDialog:{},
        voucherTable:[],
        checkDialogForm:{
          auditStatus:'audited'
        },
        fileTable:[
          {
            fileName:'lungh.doc',
            fileSize:'12kb',
            uploader:'二狗子',
            uploadTime:'2017-12-24 16:12:24'
          }
        ],
        isShow:false,
        addAndEditVisible:false,
        grantForm:{},//发放弹框表单
        isReadOnly:false,
      }

    },
    methods:{
      tabHandle:function(tab){
        this.getInitData(1,10);
        if(tab == 'hasSubmit'){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      },
      showVoucherDetail:function(row){
        //ticketTranId  ticketTranItemId
        this.couponId = row.ticketId;
        this.detailVisible = true;
           
      },
      handleSelectionChange(val) {//复选框
        this.idsArray = val;
      },
      checkHandle:function(row){//审核按钮
        let that = this;
        this.formDialog.operatorUserRealName = unescape(document.cookie.split("userRealName=")[1].split(";")[0]);
        this.formDialog.operatorUserId = getCookie('session');
        this.addAndEditVisible = true;
        this.checkDialogForm.ticketTranId = row.ticketTranId;
        this.isReadOnly = true;
        this.addAndEdit = '转让单审核'
         
        let params = {
          ticketTranId:row.ticketTranId
        }
        getTransferDetailById(params).then(function(res){
          that.formDialog = res.data;//ticketTranItemList
          that.voucherTable = res.data.ticketTranItemList;
        });
      },
      resetTransfer:function(row){
        let that = this;
        this.$confirm('确定撤回吗？').then(function(){
            let params = {
              ticketTranId:row.ticketTranId
            }
            resetTransfer(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '已成功撤回！',
                  type: 'success'
                });
                that.getInitData(1,this.pageSize);
              }else{
                that.$message({
                  message: res.message,
                  type: 'error'
                });
              }
            })
        }).catch(function(){

        });
      },
      resetHandle:function(){
        this.searchForm = {};
      },
      addTransOrder:function(){
        this.formDialog = {};
        this.voucherTable = [];
        this.formDialog.operatorUserRealName = unescape(document.cookie.split("userRealName=")[1].split(";")[0]);
        this.formDialog.operatorUserId = getCookie('session');
        this.addAndEditVisible = true;
        this.isReadOnly = false;
        this.addAndEdit = '新增转让单';
        let nowDate = getServerDate();
        let y = nowDate.getFullYear();
        let M = parseInt(nowDate.getMonth()+1);
        let d = nowDate.getDate();
        if(M < 10){M = '0'+M;}
        if(d < 10){d = '0'+d;}
        this.formDialog.applyDate = y+'-'+M+'-'+d;
      },
      editTransOrder:function(row){
        let that = this;
        this.isReadOnly = false;
        this.addAndEditVisible = true;
        this.formDialog.operatorUserRealName = unescape(document.cookie.split("userRealName=")[1].split(";")[0]);
        this.formDialog.operatorUserId = getCookie('session');
        this.addAndEdit = '编辑转让单';
        let params = {
          ticketTranId:row.ticketTranId
        }
        getTransferDetailById(params).then(function(res){
           ;
          that.formDialog = res.data;
          let userId = res.data.origUserId
          let par = {
            userId:userId
          }
          let tids = res.data.ticketTranItemList;
          getTicketByUserId(par).then(function(d){
            that.voucherTable = d.data;
            tids.map(i=>{
              that.$refs.multipleTable.toggleRowSelection(that.voucherTable.find(dt=>dt.id === i.id),true);
            })

          });
          //that.voucherTable = res.data.ticketTranItemList;
        });
      },
      remarkLength(){
        if(this.formDialog.remark.length > 128){
          this.$message({
            message: '备注信息最多输入128个字符！',
            type: 'warning'
          });
          this.formDialog.remark = this.formDialog.remark.substring(0,128);
        }
      },
      downloadFile(row){
        window.location.href = row.fileUrl;
      },
      deleteFile:function(row){
         
      },
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
            sums[index] += '.00';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      addTransfer:function(){//新增转让列表
        //formDialog.origUserRealName
        let that = this;
        let userId = this.formDialog.origUserId;
        if(userId == ''){
          this.$message({
            message: '请先选择转让人！',
            type: 'warning'
          });
        }else{
          let params = {
            userId:userId
          }
          getTicketByUserId(params).then(function(res){
             ;
            that.voucherTable = res.data;
          });
        }
      },
      showChoicePerson:function(status){
        this.showOrgTree=true;
        this.changePersonStatus = status;
      },
      trueChoiceMember(){
        if(this.changePersonStatus == 'zrr'){
          this.formDialog.origUserRealName = this.$refs.orgTree.currentRow.realName;
          this.formDialog.origCertificateNo = this.$refs.orgTree.currentRow.userCode;
          this.formDialog.origTel = this.$refs.orgTree.currentRow.phone;
          this.formDialog.origUserName = this.$refs.orgTree.currentRow.userName;
          this.formDialog.origUserId = this.$refs.orgTree.currentRow.id;
          this.voucherTable = [];
        }else if(this.changePersonStatus == 'srr'){
          this.formDialog.destUserRealName = this.$refs.orgTree.currentRow.realName;
          this.formDialog.destCertificateNo = this.$refs.orgTree.currentRow.userCode;
          this.formDialog.destTel = this.$refs.orgTree.currentRow.phone;
          this.formDialog.destUserName = this.$refs.orgTree.currentRow.userName;
          this.formDialog.destUserId = this.$refs.orgTree.currentRow.id;
        }
        //orgNamePath 部门
        this.showOrgTree=false;
      },
      getCompany:function(){//获取公司列表

      },
      insertCompany:function(){//写入公司信息

      },
      closeHandle:function(){
        this.formDialog={};
        this.voucherTable = {};
        this.addAndEditVisible=false;
      },
      getInitData(pageNum,pageSize){
        let that = this;
        let params = this.searchForm;
        params.pageNum = pageNum;
        params.pageSize = pageSize;
        if(this.tab == 'noSubMit'){
          params.submitType = 0;
        }else{
          params.submitType = 1;
        }
        getTransferList(params).then(function(res){
          that.totalPage = res.data.total;
          if(params.submitType == 0){
            that.tableData1 = res.data.list;
          }else{
            that.tableData2 = res.data.list;
          }
        });

      },
      searchHandle:function(){//搜索
        let ps = this.pageSize;
        this.getInitData(1,ps);
      },
      handleSizeChange(val) {//每页显示数据数量
        this.pageSize = val;
        this.getInitData(1,val);
      },
      handleCurrentChange(val) {//页码
        this.pageNum = val;
        let ps = this.pageSize;
        this.getInitData(val,ps);
      },
      saveTransfer:function(){//保存
        //ticketIdList
        let that = this;
        let ids = this.idsArray;
        let ticketIds = [];
        for(let i=0;i<ids.length;i++){
          ticketIds.push(ids[i].id);
        }
        this.formDialog.ticketIdList = ticketIds;
        let data = this.formDialog;

        let mInput = document.getElementsByClassName('must el-input');
        let flag = true;
        for(let i=0;i<mInput.length;i++){
          if(mInput[i].childNodes[1].value == ''){
            flag = false;
          }
        }

        if(!flag){//判断信息是否填写完整
          this.$message({
            message: '信息未填写完整，请完善填写信息！',
            type: 'warning'
          });
        }else if(ticketIds.length == 0){
          this.$message({
            message: '请选择优惠券！',
            type: 'warning'
          });
        }else{
          newAndEditTransfer(data).then(function(res){
            if(res.status == 200){
              that.dialogVisible = true;
              that.dialogMessage = '保存成功！';
              that.getInitData(1,that.pageSize);
              that.formDialog = {};
              that.voucherTable = {};
              that.addAndEditVisible = false;
            }else{
              that.dialogVisible = true;
              that.dialogMessage = res.message;
            }
          });
        }
      },
      submitTrans(){
        let that = this;
        let ids = this.idsArray;
        let ticketIds = [];
        for(let i=0;i<ids.length;i++){
          ticketIds.push(ids[i].id);
        }
        this.formDialog.ticketIdList = ticketIds;
        let data = this.formDialog;
        let mInput = document.getElementsByClassName('must el-input');
        let flag = true;
        for(let i=0;i<mInput.length;i++){
          if(mInput[i].childNodes[1].value == ''){
            flag = false;
          }
        }

        if(!flag){
          this.$message({
            message: '信息未填写完整，请完善填写信息！',
            type: 'warning'
          });
        }else if(ticketIds.length == 0){
          this.$message({
            message: '请选择优惠券！',
            type: 'warning'
          });
        }else{
          submitTransfer(data).then(function(res){
            if(res.status == 200){
              that.dialogVisible = true;
              that.dialogMessage = '提交成功！';
              that.getInitData(1,that.pageSize);
              that.formDialog = {};
              that.voucherTable = {};
              that.addAndEditVisible = false;
            }else{
              that.dialogVisible = true;
              that.dialogMessage = res.message;
            }
          });
        }

      },
      showTransDetail:function(row){//显示折扣转让单详情
        this.transdetailVisible = true;
        this.transId = row.ticketTranId;
      },
      deleteTransOrder:function(row){
        let that = this;
        let params = {
          ticketTranId:row.ticketTranId
        }
        deleteTransfer(params).then(function(res){
            if(res.status == 200){
              that.dialogVisible = true;
              that.dialogMessage = "删除成功！";
              that.getInitData(1,that.pageSize);
            }else{
              that.dialogVisible = true;
              that.dialogMessage = res.message;
            }
        });
      },
      sureCheck(){
        let that = this;
        let params = this.checkDialogForm;
        if(this.checkDialogForm.auditOpinion == undefined){
          that.$message({
            message: '请填写审批意见！',
            type: 'warning'
          });
        }else{
          this.$confirm('确认信息无误，并审批？').then(function(){
            checkTransfer(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '审核完成！',
                  type: 'success'
                });
                that.checkDialogForm = {
                  auditStatus:'audited'
                };
                that.checkVisible = false;
                that.addAndEditVisible = false;
                that.getInitData(1,that.pageSize);
              }else{
                that.$message({
                  message: res.message,
                  type: 'error'
                });
              }
            });
          }).catch(function(){

          })
        }
      },
      cancleHandle:function(){
        this.checkDialogForm = {
           auditStatus:'audited'
        };
        this.checkVisible = false;
      },
      getRowKeys(row) {
        return row.id;
      },
      displayCheckRecord:function(){

      },

    },
    created:function(){
      this.getInitData(1,10);
    },
    mounted:function(){
      let container = document.getElementById('transfer');
      let outer = container.parentElement;
      let minHeight = outer.offsetHeight * 0.94;
      container.style = "min-height:"+minHeight+"px";
    }
  }
</script>

<style scoped>
  #transfer{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .itemBtn{
    color:#4DBE61;
    font-size:12px;
  }
  .resetHeight .dialogInput{
    height:26px;
    line-height:26px;
  }
</style>
