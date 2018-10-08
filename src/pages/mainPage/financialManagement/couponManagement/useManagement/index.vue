<template>
  <div id="used">
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
          <span class="inputLable-oc">姓   名:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请输入姓名" v-model="searchForm.userRealName"></el-input>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">发放公司:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请输入发放公司" v-model="searchForm.companyName"></el-input>
          <span style="display:inline-block;width:58px;"></span>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">发放类型:</span>
          <el-select v-model="searchForm.grantType" placeholder="请选择是否有效" class="inputControl-oc">
            <el-option label="全部" value="all"></el-option>
            <el-option label="有效" value="y"></el-option>
            <el-option label="无效" value="n"></el-option>
          </el-select>
        </div>
      </div>
      <div class="headShowPart-oc" style="border-bottom:solid thin #dcdfe6">
        <div class="inputBox-oc">
          <span class="inputLable-oc">使用公司:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放公司" v-model="searchForm.useCompanyName"></el-input>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">房    源:</span>
          <el-input class = "inputControl-oc" size = "mini" placeholder="折扣转让单" v-model="searchForm.id"></el-input>
        </div>
        <div class="inputBox-oc">
          <span class="inputLable-oc">使用时间:</span>
          <el-date-picker v-model="searchForm.useStartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker> --
          <el-date-picker v-model="searchForm.useEndTime" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="inputBox-oc">
          <el-button class="cancel-lee" @click="resetHandle">重置</el-button>
          <el-button type="success" @click="search">查询</el-button>
        </div>
      </div>
      <div class="container-oc">
        <div style="float:right;margin-bottom:20px;">
          <div class="inputBox-oc" v-show="isShow" style="display:inline-block;margin-right:20px;">
            <span class="inputLable-oc">审核状态:</span>
            <!--<el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放年份" v-model="sendYear"></el-input>-->
            <el-select v-model="searchForm.checkStatus" placeholder="请选择审核状态" class = "inputControl-oc" @change="selectCheckStatus">
              <el-option label="全部" value="all"></el-option>
              <el-option label="已审核" value="audited"></el-option>
              <el-option label="已退回" value="backed"></el-option>
              <el-option label="已拒绝" value="refused"></el-option>
            </el-select>
          </div>
          <div class="inputBox-oc" v-show="!isShow" style="display:inline-block;margin-right:20px;">
            <el-button type="success" size="mini" @click="otherUsed">其他使用</el-button>
          </div>
        </div>
        <div>
          <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="优惠券号" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" @click="showDetail(scope.row)">{{scope.row.ticketCode}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="userRealName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateNo" label="证件号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amount" label="使用金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="useTime" label="使用时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="handlePerson" label="经办人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="houseName" label="房源" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sendCompanyName" label="发放公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="useCompanyName" label="使用公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditType" label="审核状态"></el-table-column>
            <el-table-column prop="isValid" label="是否有效"></el-table-column>
            <el-table-column prop="checkOrder" label="签约审批单" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div v-show="!isShow">
                  <el-button type="text" @click="editTransOrder(scope.row)">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </div>
                <div v-show="isShow">
                  <el-button type="text" @click="checkOtherUse(scope.row)">审核</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total='total'>
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="addAndEdit" :visible.sync="otherUsedVisible" width="90%" :before-close="closeDialogAddAndEdit">
      <div style="padding-bottom:15px;border-bottom:solid thin #dcdfe6">
        <div class="inputBox-oc posi">
          <span style="padding:0;height:28px;display:inline-block;">请选择特殊折扣人员：</span>
          <el-input v-model="discUserRealName" class = "inputControl-oc" placeholder="特殊折扣人员" suffix-icon="el-icon-search" readonly="readonly" @focus="showOrgTree = true"></el-input>
        </div>
      </div>
      <el-table :data="otherUsedTableData" :row-class-name="tableRowClassName" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column prop="ticketCode" label="优惠券号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#4dbe61;cursor:pointer;">{{scope.row.ticketCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sendCompanyName" label="发放公司" show-overflow-tooltip></el-table-column>
        <el-table-column prop="userRealName" label="姓名"></el-table-column>
        <el-table-column prop="remainAmount" label="可用金额"></el-table-column>
        <el-table-column label="使用金额">
          <template slot-scope="scope">
            <el-input size="min" v-model="scope.row.amount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="使用类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.useType" placeholder="使用类型">
              <el-option label="买房" value="0"></el-option>
              <el-option label="买车" value="1"></el-option>
              <el-option label="现金发放" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="使用公司">
          <template slot-scope="scope">
            <el-input size="min" v-model="scope.row.useCompanyName" suffix-icon="el-icon-search" @focus="showCompany(scope.$index)"></el-input>
            <!--useCompanyId-->
          </template>
        </el-table-column>
        <el-table-column label="使用房源">
          <template slot-scope="scope">
            <el-input size="min" v-model="scope.row.houseName" readonly="readonly" @focus="showHouse(scope.$index)"></el-input>
            <!--houseCode,houseFullName,houseId-->
          </template>
        </el-table-column>
        <el-table-column label="车辆型号/车牌">
          <template slot-scope="scope">
            <el-input size="min" v-model="scope.row.carType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="其他">
          <template slot-scope="scope">
            <el-input size="min" v-model="scope.row.other"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="file" label="附件">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="uploadHandle">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <el-input size="min" v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding-top:20px;">
        <el-button type="success" @click="saveOrSubmitOtherUse('save')">保存</el-button>
        <el-button type="success" @click="saveOrSubmitOtherUse('submit')">提交</el-button>
      </div>
    </el-dialog>
    <!--购房券使用审核弹框-->
    <el-dialog title="购房券使用审核" :visible.sync="useCheckVisible" width="70%">
      <div v-for="(item, index) in ticketCheckData" :key="index">
        <div class="cus-row">
          <span class="cusLabel">项目名称：</span><el-input v-bind:value="item.projrctName" readonly="readonly"></el-input>
          <span class="cusLabel">申请日期：</span><el-input v-bind:value="item.applyDate" readonly="readonly"></el-input>
        </div>
        <div class="cus-row">
          <span class="cusLabel">客户名称：</span><el-input v-bind:value="item.cusName" readonly="readonly"></el-input>
          <span class="cusLabel">房产日期：</span><el-input v-bind:value="item.houseName" readonly="readonly"></el-input>
        </div>
        <div class="cus-row">
          <span class="cusLabel">特殊折扣员工：</span><el-input v-bind:value="item.specialStaff" readonly="readonly"></el-input>
          <span class="cusLabel">特殊折扣申请金额：</span><el-input v-bind:value="item.applyAmount" readonly="readonly"></el-input>
          <span class="cusLabel">实际合同总价：</span><el-input v-bind:value="item.contractAmount" readonly="readonly"></el-input>
        </div>
      </div>
      <el-table :data="checkUsedTableData" tooltip-effect="dark" style="width: 100%" border show-summary>
        <el-table-column prop="ticketNum" label="券号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sendCompany" label="发放公司"></el-table-column>
        <el-table-column prop="usedAccount" label="使用金额"></el-table-column>
      </el-table>
      <div v-for="(item, index) in ticketCheckData" style="margin-top:15px;" :key="index">
        <div class="cus-row">
          <span class="cusLabel">经办人：</span><el-input v-bind:value="item.handlePerson" readonly="readonly"></el-input>
          <span class="cusLabel">经办日期：</span><el-input v-bind:value="item.handleDate" readonly="readonly"></el-input>
        </div>
      </div>
      <div class="dialog-container">
        <h3>附件信息</h3>
        <el-table :data="fileTable" tooltip-effect="dark" style="width: 100%" border>
          <el-table-column prop="fileName" label="文件名"></el-table-column>
          <el-table-column prop="fileSize" label="附件大小"></el-table-column>
          <el-table-column prop="uploader" label="上传人"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dialog-container">
        <h3>审批记录</h3>
      </div>
      <div style="height:30px;line-height:30px;text-align:right;margin-top:10px;"><el-button type="success" @click="useTicketCheckVisible = true">审核</el-button></div>
      <el-dialog title="使用审核" :visible.sync="useTicketCheckVisible" append-to-body>
        <el-form ref="form" :model="checkDialogForm" label-width="80px">
          <el-form-item label="审核结果:">
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
          <el-button class="cancel-lee" @click="useTicketCheckVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <el-dialog title="优惠券详情" :visible.sync="ticketDetailVisible" width="70%">
      <showdetail :ticketId = "ticketId"></showdetail>
    </el-dialog>

    <!--组织架构树对话框-->
    <el-dialog title="人员选择" :visible.sync="showOrgTree">
      <v-orgTree ref="orgTree" :isRadio="true"></v-orgTree>
      <div class="dialogBtnBox" style="text-align:right;">
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
    <!--房源选择弹框-->
    <el-dialog title="房源选择" :visible.sync="houseVisible">
      <housetree @ievent ="ievent"></housetree>
    </el-dialog>
  </div>
</template>

<script>
  import "@/assets/styles/ocuponStyle.css"
  import ticketDetail from "../couponDetail/"
  import {getUseList,getTicketByUserId,elseUseApi,submitElseUseApi,checkElseUseApi,getOtherUseDetailById} from "@/api/pages/mainPage/financialManagement/valueVoucher/index.js"
  import dialogInput from "@/components/dialogInput"
  import OrganizationTree from "@/components/OrganizationTree"
  import companyTree from "../../projectCompany"
  import houseTree from"../../houseDetail"
  export default {
    components:{
      'showdetail' : ticketDetail,
      'v-input': dialogInput,
      'v-orgTree':OrganizationTree,
      'companypage':companyTree,
      'housetree':houseTree,
    },
    data(){
      return{
        tab:'noSubMit',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()-86400000;
          }
        },
        //搜索区域
        searchForm:{},//筛选数据
        showOrgTree:false,
        companyVisible:false,
        useTicketCheckVisible:false,
        checkDialogForm:{
          auditStatus:'audited'
        },
        companyName:null,
        pageNum:1,
        pageSize:10,
        total:0,
        checkStatus:'all',
        addAndEdit:'',
        tableData:[],
        otherUseUserId:null,
        discUserRealName:'',
        useDetailList:[],/***************************************mark*************************************************/
        rowIndex:[],
        houseVisible:false,
        //表格区域数据
        formDialog:{},
        voucherTable:[

        ],
        fileTable:[
          {
            fileName:'lungh.doc',
            fileSize:'12kb',
            uploader:'二狗子',
            uploadTime:'2017-12-24 16:12:24'
          }
        ],
        isShow:false,
        otherUsedVisible:false,
        useCheckVisible:false,
        ticketDetailVisible:false,
        formId:null,
        //其他使用弹框数据
        otherUsedTableData:[],
        ticketCheckData:[
          {
            projrctName:'xxxx项目',
            applyDate:'2017-09-24',
            cusName:'二狗子',
            houseName:'绿城·杭州桃园',
            specialStaff:'二狗子',
            applyAmount:'1369800.00',
            contractAmount:'1232130.00',
            handlePerson:'大狗子',
            handleDate:'2018-03-27',
          }
        ],
        checkUsedTableData:[
          {
            ticketNum:'40000000013',
            name:'二狗子',
            sendCompany:'绿城房产管理建设有限公司',
            usedAccount:'640000.00',
          }
        ],
        ticketId:null,
      }

    },
    methods:{
      tabHandle:function(tab){
        this.getPageData(1,this.pageSize);
        if(tab == 'hasSubmit'){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      },
      search(){
        this.getPageData(1,this.pageSize);
      },
      ievent(data){
        let oIndex = this.rowIndex;
        this.otherUsedTableData[oIndex].houseName = data.houseInfo.name;
        this.otherUsedTableData[oIndex].houseId = data.houseInfo.houseId;
        this.otherUsedTableData[oIndex].houseCode = data.houseInfo.code;
        this.houseVisible = false;
      },
      tableRowClassName:function(row, index){
        row.index = index;
      },
      showHouse:function(index){
        this.houseVisible = true;
        this.rowIndex = index;
      },
      selectCheckStatus:function(){
        this.getPageData(1,this.pageSize);
      },
      checkHandle:function(row){//审核按钮
         
      },
      resetHandle:function(){
        this.searchForm = {};
      },
      otherUsed:function(){
        this.otherUsedVisible = true;
        this.addAndEdit = '其他使用';
      },
      uploadHandle:function(){

      },
      editTransOrder:function(row){
         
        this.discUserRealName = row.userRealName;
        this.otherUsedTableData.push(row);
        this.otherUsedVisible = true;
        this.addAndEdit = '编辑';
        this.formId = row.formId;
      },
      closeDialogAddAndEdit:function(){
        this.otherUsedTableData = [];
        this.otherUsedVisible = false;
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
      showDetail:function(row){
         
        this.ticketId = row.name;
        this.ticketDetailVisible = true;
      },
      getPageData:function(pageNum,pageSize){
        let that = this;
        that.searchForm.pageNum = pageNum;
        that.searchForm.pageSize = pageSize;
        if(that.tab == 'noSubMit'){
          that.searchForm.submitType = 0;
        }else{
          that.searchForm.submitType = 1;
        }
        let params = that.searchForm;
        getUseList(params).then(function(res){
           ;
          that.tableData = res.data.list;
          that.total = res.data.total;
        });
      },
      getCompany:function(val){//获取公司列表
        this.companyName = val.label;
        this.companyId = val.id;
      },
      insertCompany:function(){//写入公司信息
        let oIndex = this.rowIndex
        this.otherUsedTableData[oIndex].useCompanyName = this.companyName;
        this.otherUsedTableData[oIndex].useCompanyId = this.companyId;
        this.companyVisible = false;
      },
      trueChoiceMember(){
          this.discUserRealName = this.$refs.orgTree.currentRow.realName;
          //this.otherUsedTableData.discUserId = this.$refs.orgTree.currentRow.id;
          this.otherUseUserId = this.$refs.orgTree.currentRow.id;
        //orgNamePath 部门
        this.showOrgTree=false;
      },
      showCompany:function(row){
        this.companyVisible = true;
        this.rowIndex= row;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPageData(1,val);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getPageData(val,this.pageSize);
      },
      saveOrSubmitOtherUse(value){
        let that = this;
        let data;
        if(this.addAndEdit == '编辑'){
          data = {
            formId:this.formId,
            useDetailList:this.otherUsedTableData,
          }
        }else{
          data = {
            useDetailList:this.otherUsedTableData,
          }
        }

        if(value == 'save'){//保存
          that.$confirm('确认信息无误并保存？').then(function(){
            elseUseApi(data).then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                that.otherUsedTableData = [];
                that.otherUsedVisible = false;
                that.getPageData(1,that.pageSize);
              }else{
                that.$message({
                  message: res.message,
                  type: 'error'
                });
              }
            });
          }).catch(function(){

          });
        }else if(value == 'submit'){//提交

          that.$confirm('确认信息无误并提交？').then(function(){
            submitElseUseApi(data).then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                that.otherUsedVisible = false;
                that.otherUsedTableData = [];
                that.getPageData(1,that.pageSize);
              }else{
                that.$message({
                  message: res.message,
                  type: 'error'
                });
              }
            });
          }).catch(function(){

          });
        }
      },
      checkOtherUse:function(row){
        this.useCheckVisible = true;
        let params = {
          formId:row.formId
        }
         
        getOtherUseDetailById(params).then(function(res){
           ;
        });
      },
      sureCheck:function(){

      },
    },
    watch:{
      otherUseUserId:function(){
        let that = this;
        let params = {
          userId:this.otherUseUserId
        }
        getTicketByUserId(params).then(function(res){
          if(res.status == 200){
            if(res.data.length != 0){/***************************************mark*********************************************/
              //that.otherUsedTableData = res.data;
              for(let i=0;i<res.data.length;i++){
                that.otherUsedTableData[i] = new Object();
                that.otherUsedTableData[i].ticketCode = res.data[i].ticketCode;
                that.otherUsedTableData[i].ticketId = res.data[i].id;
                that.otherUsedTableData[i].sendCompanyName = res.data[i].companyName;
                that.otherUsedTableData[i].sendCompanyId = res.data[i].companyId;
                that.otherUsedTableData[i].userRealName = res.data[i].userRealName;
                that.otherUsedTableData[i].certificateName = res.data[i].certificateName;
                that.otherUsedTableData[i].certificateNo = res.data[i].certificateNo;
                that.otherUsedTableData[i].certificateType = res.data[i].certificateType;
                that.otherUsedTableData[i].remainAmount = res.data[i].remainAmount;
              }
              that.otherUsedVisible = false;
              that.otherUsedVisible = true;
            }else{
              that.$message({
                message: '该特殊折扣人名下暂无可用优惠券！',
                type: 'warning'
              });
              that.otherUsedTableData = {}
            }
          }else{
            that.$message({
              message: res.message,
              type: 'error'
            });
          }

        });
      },
    },
    created:function(){
      this.getPageData(1,10);
    },
    mounted:function(){
      //this.tableData = this.tableData1;
      let container = document.getElementById('used');
      let outer = container.parentElement;
      let minHeight = outer.offsetHeight * 0.94;
      container.style = "min-height:"+minHeight+"px";
    }
  }
</script>

<style scoped>
  #used{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .itemBtn{
    color:#4DBE61;
    font-size:12px;
  }
</style>
