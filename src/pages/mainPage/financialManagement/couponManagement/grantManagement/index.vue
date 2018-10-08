<template>
    <div id="grant">
      <div class="container-oc" style="padding-bottom:0;">
        <el-radio-group v-model="tab" @change="tabHandle">
          <el-radio-button label="noSubMit">未提交</el-radio-button>
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
            <span class="inputLable-oc">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
            <el-input class = "inputControl-oc" size = "mini" placeholder="请输入姓名" v-model="searchForm.userRealName"></el-input>
          </div>
          <div class="inputBox-oc">
            <span class="inputLable-oc">手机号码:</span>
            <el-input class = "inputControl-oc" size = "mini" placeholder="请输入手机号" v-model="searchForm.tel"></el-input>
            <span style="display:inline-block;width:58px;"></span>
          </div>
          <div class="inputBox-oc">
            <span class="inputLable-oc">发放公司:</span>
            <el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放公司" v-model="searchForm.companyName"></el-input>
          </div>
        </div>
        <div class="headShowPart-oc" style="border-bottom:solid thin #dcdfe6">
          <div class="inputBox-oc">
            <span class="inputLable-oc">发放类型:</span>
            <!--<el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放类型" v-model="sendType"></el-input>-->
            <el-select v-model="searchForm.type" placeholder="请选择发放类型" class = "inputControl-oc">
              <el-option label="奖金" value="bonus"></el-option>
              <el-option label="奖励" value="award"></el-option>
              <el-option label="年金" value="annuity"></el-option>
              <el-option label="年薪" value="annualSalary"></el-option>
              <el-option label="奖金(集团)" value="groupBonus"></el-option>
              <el-option label="奖金(绿建)" value="greenBonus"></el-option>
              <el-option label="其他" value="else"></el-option>
            </el-select>
          </div>
          <div class="inputBox-oc">
            <span class="inputLable-oc">发放年份:</span>
            <!--<el-input class = "inputControl-oc" size = "mini" placeholder="请选择发放年份" v-model="sendYear"></el-input>-->
            <el-date-picker v-model="searchForm.grantYear" type="year" placeholder="选择年" value-format="yyyy"></el-date-picker>
            <!--<el-select v-model="searchForm.grantYear" placeholder="请选择发放年份" class = "inputControl-oc">
              <el-option label="2018" value="2018"></el-option>
              <el-option label="2017" value="2017"></el-option>
            </el-select>-->
          </div>
          <div class="inputBox-oc">
            <span class="inputLable-oc">发放时间:</span>
            <el-date-picker
              v-model="searchForm.grantStartTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker> --
            <el-date-picker
              v-model="searchForm.grantEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"><!--:picker-options="pickerOptions"-->
            </el-date-picker>
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
              <el-select v-model="searchForm.auditStatus" placeholder="请选择审核状态" class = "inputControl-oc" @change="search">
                <el-option label="全部" value="all"></el-option>
                <el-option label="审核中" value="aduiting"></el-option>
                <el-option label="审核完成" value="audited"></el-option>
                <el-option label="已驳回" value="backed"></el-option>
                <el-option label="已拒绝" value="refused"></el-option>
              </el-select>
            </div>
            <div style="display:inline-block;" v-show="tab == 'noSubMit'">
              <el-button type="success" @click="sendGroup">批量发放</el-button>
              <el-button type="success" @click="submitGroup">批量提交</el-button>
              <el-button type="success" @click="allSubmit">全部提交</el-button>
              <el-button type="success" @click="deleteGroup">批量删除</el-button>
              <el-button type="success" @click="grant">发放</el-button>
            </div>
            <div style="display:inline-block;" v-show="tab == 'hasSubmit'">
              <el-button type="success" v-show="judgeBtn" @click="checkHandle({},'group')">批量审核</el-button>
              <el-button type="success" v-show="judgeBtn1" @click="reCheckGroup">批量反审核</el-button>
              <el-button type="success" @click="checkHandle({},'all')">全部审核</el-button>
              <el-button type="success" @click="allReCheck">全部反审核</el-button>
              <el-button type="success">发送短息</el-button>
            </div>
          </div>
          <div v-show="!isShow">
          <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" show-summary :summary-method="getSummaries">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="优惠券号" width="130">
              <template slot-scope="scope" show-overflow-tooltip>
                <!--<el-button type="text" @click="showDetail(scope.row)">{{scope.row.ticketCode}}</el-button>-->
                <span style="color:#4dbe61;cursor:pointer;" @click="showDetail(scope.row)">{{scope.row.ticketCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userRealName" label="姓名" width="120"></el-table-column>
            <el-table-column prop="tel" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateNo" label="证件号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amount" label="发放金额"></el-table-column>
            <el-table-column prop="companyName" label="发放公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="typeName" label="发放类型"></el-table-column>
            <el-table-column prop="grantYear" label="发放年份"></el-table-column>
            <el-table-column prop="grantDate" label="发放时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="editVoucher(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteRowInfo(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=1
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </div>
          <div v-show="isShow">
          <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="优惠券号" width="130">
              <template slot-scope="scope" show-overflow-tooltip>
                <!--<el-button type="text" @click="showDetail(scope.row)">{{scope.row.ticketCode}}</el-button>-->
                <span style="color:#4dbe61;cursor:pointer;" @click="showDetail(scope.row)">{{scope.row.ticketCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userRealName" label="姓名" width="120"></el-table-column>
            <el-table-column prop="tel" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="certificateNo" label="证件号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amount" label="发放金额"></el-table-column>
            <el-table-column prop="companyName" label="发放公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="typeName" label="发放类型"></el-table-column>
            <el-table-column prop="grantYear" label="发放年份"></el-table-column>
            <el-table-column prop="grantDate" label="发放时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="审核状态"></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="checkHandle(scope.row,'line')">{{scope.row.auditStatus=='已审核'?'反审核':'审核'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=1
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="10"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="pageTotal">
            </el-pagination>
          </div>

        </div>
      </div>
      <el-dialog :title="grantAndEdit" :visible.sync="grantVisible" :before-close="closeHandle" width="50%">
        <div style="float: left;">
          <el-form ref="form" :model="grantForm" label-width="80px">
            <el-form-item label="*姓   名：">
              <!--<div @click="showChoicePerson" class="resetHeight"><v-input :maxlength=50 :val="grantForm.userRealName"  class="EssentialsInputItem must"></v-input></div>-->
              <el-input prefix-icon="el-icon-search" readonly="readonly" v-model="grantForm.userRealName" class="must" @focus="showChoicePerson"></el-input>
            </el-form-item>
            <el-form-item label="*手机号码：">
              <el-input v-model="grantForm.tel" class="must"></el-input>
            </el-form-item>
            <el-form-item label="*发放公司：">
              <el-input v-model="grantForm.companyName" prefix-icon="el-icon-search" class="must" @focus="showCompany"></el-input>
              <input type="hidden" v-model="grantForm.companyId">
            </el-form-item>
            <el-form-item label="*发放年份：">
              <el-input v-model="grantForm.grantYear" suffix-icon="el-icon-date" class="must"></el-input>
              <!--<el-date-picker v-model="grantForm.grantYear" type="year" value-format="yyyy" placeholder="请选择发放年份"></el-date-picker>-->
            </el-form-item>
          </el-form>
        </div>
        <div style="float:left;margin-left:36px;">
          <el-form ref="form" :model="grantForm" label-width="80px">
            <el-form-item label="*证件号码：">
              <el-input v-model="grantForm.certificateNo" class="must"></el-input>
            </el-form-item>
            <el-form-item label="*发放金额：">
              <el-input v-model="grantForm.amount" class="must"></el-input>
            </el-form-item>
            <el-form-item label="*发放类型：">
              <el-select v-model="typeObject" placeholder="请选择发放类型" value-key="id" class="must">
                <el-option v-for="item in grantType" :label="item.label" :key="item.id" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备    注：">
              <el-input v-model="grantForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="clear:both;"></div>
        <div style="height:36px;line-height:36px;">
          附件信息
          <el-upload style="float:right;" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </div>
        <el-table :data="grantTableData" style="width: 100%" border>
          <el-table-column prop="fileName" label="文件名"></el-table-column>
          <el-table-column prop="fileSize" label="附件大小"></el-table-column>
          <el-table-column prop="uploader" label="上传人"></el-table-column>
          <el-table-column prop="upTime" label="上传时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="downloadFile(scope.row)">下载</el-button>
              <el-button type="text" size="mini" @click="deleteFile(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="float:right;padding-top:20px;">
          <el-button type="success" size="mini" @click="saveFormData">保存</el-button>
          <el-button type="success" size="mini" @click="submitFormData">提交</el-button>
        </div>
        <div style="clear:both;"></div>
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

      <el-dialog title="优惠券详情" :visible.sync="detailVisible" width="70%">
        <coupondetail :ticketId="couponId" :isGetDetail="isGetDetail"></coupondetail>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>{{dialogMessage}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false,grantVisible = false,checkVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="审核操作" :visible.sync="checkVisible" width="70%">
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
          <el-button class="cancel-lee" @click="checkVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import "@/assets/styles/ocuponStyle.css"
  import { objLength,sendValueVoucherGroup,getValueVoucherList,sendValueVoucher,batchDelete,batchSubmit,deleteValueVoucher,getDetailById,submitSend,updateValueVoucher,submitAll,checkValueVoucher,allCheck,checkGroup,reCheck,allReCheck,reCheckGroup } from "@/api/pages/mainPage/financialManagement/valueVoucher/index.js";
  import dialogInput from "@/components/dialogInput"
  import OrganizationTree from "@/components/OrganizationTree"
  import companyTree from "../../projectCompany"
  import couponDetail from "../couponDetail"
    export default {
        components:{
          'v-input': dialogInput,
          'v-orgTree':OrganizationTree,
          'companypage':companyTree,
          'coupondetail':couponDetail
        },
        data(){
          return{
            tab:'noSubMit',
            showOrgTree:false,//组织机构对话弹框控制
            companyVisible:false,//公司选择弹框
            checkVisible:false,//审核弹框控制
            checkId:null,
            dialogVisible:false,
            detailVisible:false,//优惠券详情弹框
            judgeBtn:true,
            isGetDetail:true,
            judgeBtn1:true,
            couponId:null,//优惠券id
            checkDialogForm:{
              auditStatus:'audited',
            },
            dialogMessage:'',
            pickerOptions: {
              disabledDate(time) {

                return time.getTime() > Date.now()-86400000;
              }
            },
            //搜索区域
            searchForm:{
              ticketCode:'',
              userRealName:'',
              tel:'',
              companyName:'',
              type:'',
              grantYear:'',
              grantStartTime:'',
              grantEndTime:'',
              checkStatus:'all',
            },
            grantAndEdit:'',
            //表格区域数据
            tableData1:[],
            pageTotal:0,
            pageSize:10,
            pageNum:1,
            tableData2:[],
            idsArray:[],
            checkType:null,
            grantTableData:[
              {
                fileName:'food.jpeg',
                fileSize:'12kb',
                uploader:'二狗子',
                upTime:'2018-03-23',
                fileUrl:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              },{
                fileName:'food2.jpeg',
                fileSize:'12kb',
                uploader:'二狗子',
                upTime:'2018-03-23',
                fileUrl:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              }
            ],
            isShow:false,
            grantVisible:false,
            flag:false,
            getCompanyName:'',
            getCompanyId:'',
            grantForm:{},//发放弹框表单
            grantType:[
              {id: "bonus", label: '奖金'},
              {id: "award", label: '奖励'},
              {id: "annuity", label: '年金'},
              {id: "annualSalary", label: '年薪'},
              {id: "groupBonus", label: '奖金(集团)'},
              {id: "greenBonus", label: '奖金(绿建)'},
              {id: "else", label: '其他'},
            ],
            typeObject:{},
          }
        },
      methods:{
        closeHandle:function(){
          this.grantForm = {}
          this.grantVisible = false;
        },
        tabHandle:function(tab){
         if(tab == 'hasSubmit'){
           this.isShow = true;
           let params = {
             pageNum:1,
             pageSize:10,
             submitType:1
           }
           this.getInitData(params);
         }else{
           this.isShow = false;
           let params = {
             pageNum:1,
             pageSize:10,
             submitType:0
           }
           this.getInitData(params);
         }
        },
        handleSelectionChange(val) {
          this.idsArray = val;
          this.judgeBtn = true;
          this.judgeBtn1 = true;
          for(let i=0;i<val.length;i++){
            if(val[i].auditStatus == '已审核'){
              this.judgeBtn = false;
            }
            if(val[i].auditStatus == '审核中'){
              this.judgeBtn1 = false;
            }
          }
        },
        checkHandle:function(row,type){//审核按钮
          let that = this;
          this.checkId = row.id;
          if(row.auditStatus == '已审核'){
            //反审核操作
            this.$confirm('确定要进行反审核操作吗？').then(function(){
              let params = {
                ticketId:row.id
              }
              reCheck(params).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message: '反审核完成！',
                    type: 'success'
                  });
                  that.refresh();
                }else{
                  that.$message({
                    message:res.message,
                    type: 'warning'
                  });
                }
              });
            }).then(function(){

            });
          }else{
            //审核操作
             

            this.checkType = type;
            if(type == 'group'){
              if(this.idsArray.length == 0){
                that.$message({
                  message:'请先勾选需要批量审核的单据！',
                  type: 'warning'
                });
              }else{
                this.checkVisible = true;
              }
            }else{
              this.checkVisible = true;
            }
          }
           
        },
        sureCheck:function(){
          //checkValueVoucher
          if(this.checkDialogForm.auditOpinion == undefined){
            this.$message({
              message: '请填写审核意见！',
              type: 'warning'
            });
          }else {
            if (this.checkType == 'line') {//点击的是表格行内的审核按钮打开弹窗时
              let that = this;
              let params = {
                ticketId: this.checkId,
                auditStatus: this.checkDialogForm.auditStatus,
                auditOpinion: this.checkDialogForm.auditOpinion,
              }
              checkValueVoucher(params).then(function (res) {
                 
                if (res.status == 200) {
                  that.dialogVisible = true;
                  that.dialogMessage = '审核完成！'
                  let params = {
                    pageNum: that.pageNum,
                    pageSize: that.pageSize,
                    submitType: 1
                  }
                  that.getInitData(params);
                  that.checkDialogForm = {
                    auditStatus:'audited'
                  };
                  //that.checkDialogForm.auditStatus = 'audited';
                } else {
                  that.dialogVisible = true;
                  that.dialogMessage = res.message;
                }
              });
            } else if (this.checkType == 'all') {//点击的未全部审核按钮打开弹框时
              this.allCheck();//执行全部审批方法
            } else if (this.checkType == 'group') {//点击的批量审批打开的弹框时
              this.checkGroups();//执行批量审批方法
            }
          }
        },
        resetHandle:function(){
            this.searchForm = {};
        },
        grant:function(){
          this.grantVisible = true;
          this.grantAndEdit = '优惠券发放';
        },
        editVoucher:function(row){
          this.grantVisible = true;
          this.typeObject.id = row.type;
          this.typeObject.label = row.typeName;
          this.grantAndEdit = '优惠券编辑';
          this.grantForm = row;
        },
        downloadFile(row){
          window.location.href = row.fileUrl;
        },
        deleteFile:function(row){
           
        },
        handleChange(file, fileList) {
          this.grantTableData = fileList.slice(-3);
        },
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }
            if (index != 6){
              sums[index] = '--';
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
              sums[index] = 'NaN';
            }
          });

          return sums;
        },
        showChoicePerson(){
          this.showOrgTree=true;
        },
        trueChoiceMember(){
          this.grantForm.userRealName = this.$refs.orgTree.currentRow.realName;
          this.grantForm.certificateNo = this.$refs.orgTree.currentRow.userCode;
          this.grantForm.tel = this.$refs.orgTree.currentRow.phone;
          this.grantForm.userName = this.$refs.orgTree.currentRow.userName;
          this.grantForm.userId = this.$refs.orgTree.currentRow.id;
          //orgNamePath 部门
          this.showOrgTree=false;
        },
        getCompany:function(data) {//获取项目公司并写入
           
          this.getCompanyName = data.orgUnitName;
          this.getCompanyId = data.orgUnitCode;
        },
        insertCompany:function(){
          this.grantForm.companyName = this.getCompanyName;
          this.grantForm.companyId = this.getCompanyId;
          this.companyVisible=false;
        },
        showCompany:function(){
          this.companyVisible = true;
        },
        saveFormData:function(){//保存弹框数据
          let that = this;
          this.grantForm.type = this.typeObject.id;
          this.grantForm.typeName = this.typeObject.label;
          let data = that.grantForm;
          let mInput = document.getElementsByClassName('must el-input');
          let mSelect = document.getElementsByClassName('el-select must');
          let flag = true;
          for(let i=0;i<mInput.length;i++){
            if(mInput[i].childNodes[1].value == ''){
              flag = false;
            }
          }
          if(mSelect[0].childNodes[1].childNodes[1].value == ''){
            flag = false;
          }

          if(this.grantAndEdit == '优惠券发放'){
            if(!flag){
              this.$message({
                message: '信息填写不完整，请完善必填信息！',
                type: 'warning'
              });
            }else{
              sendValueVoucher(data).then(function(res){
                that.dialogVisible = true;
                if(res.status == 200){
                  that.dialogMessage = '保存成功！';
                  that.grantForm = {};
                  that.refresh();
                }else{
                  that.dialogMessage = res.message;
                }
              });
            }
          }else{
            if(!flag){
              this.$message({
                message: '信息填写不完整，请完善必填信息！',
                type: 'warning'
              });
            }else{
              updateValueVoucher(data).then(function(res){
                that.dialogVisible = true;
                if(res.status == 200){
                  that.dialogMessage = '保存成功！';
                  that.grantForm = {};
                  that.refresh();
                  that.isGetDetail = !that.isGetDetail
                }else{
                  that.dialogMessage = res.message;
                }
              })
            }
          }
        },
        submitFormData:function(){//提交弹框数据
          let that = this;
          this.grantForm.type = this.typeObject.id;
          this.grantForm.typeName = this.typeObject.label;
          let data = that.grantForm;
          let mInput = document.getElementsByClassName('must el-input');
          let mSelect = document.getElementsByClassName('el-select must');
          let flag = true;
          for(let i=0;i<mInput.length;i++){
            if(mInput[i].childNodes[1].value == ''){
              flag = false;
            }
          }
          if(mSelect[0].childNodes[1].childNodes[1].value == ''){
            flag = false;
          }
          if(!flag){
            this.$message({
              message: '信息填写不完整，请完善必填信息！',
              type: 'warning'
            });
          }else{
            submitSend(data).then(function(res){
              that.dialogVisible = true;
              if(res.status == 200){
                that.dialogMessage = '提交成功！';
                that.grantForm = {};
                that.refresh();
              }else{
                that.dialogMessage = res.message;
              }
            })
          }

        },
        getInitData:function(d){//初始化页面数据
          let that = this;
          let params = d;
          getValueVoucherList(params).then(function(res){
            that.pageTotal = res.data.total;
            if(params.submitType==0){
              that.tableData1 = res.data.list;
            }else if(params.submitType==1){
              that.tableData2 = res.data.list;
            }

          });
        },
        refresh:function(){
          let that = this;
          let params = {
            pageNum:1,
            pageSize:this.pageSize,
            submitType:this.tab=='noSubMit'? 0 : 1
          };
          getValueVoucherList(params).then(function(res){
            that.pageTotal = res.data.total;
            if(params.submitType==0){
              that.tableData1 = res.data.list;
            }else if(params.submitType==1){
              that.tableData2 = res.data.list;
            }
          });
        },
        deleteRowInfo:function(row){
          let that = this;
          let params = {
            ticketId:row.id,
          }
          deleteValueVoucher(params).then(function(res){
            if(res.status == 200){
              that.dialogVisible = true;
              that.dialogMessage = "删除成功！"
              let d = {
                pageNum:1,
                pageSize:10,
                submitType:0
              }
              that.getInitData(d);
            }else{
              that.dialogVisible = true;
              that.dialogMesage = res.message;
            }
          })
        },
        handleSizeChange(val) {
          this.pageSize = val;
          let params = this.searchForm;
          params.pageNum = 1;
          params.pageSize = val;
          params.submitType = this.tab=='noSubMit' ? 0 : 1;
          this.getInitData(params);
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          let params = this.searchForm;
          params.pageNum = val;
          params.pageSize = this.pageSize;
          params.submitType = this.tab=='noSubMit' ? 0 : 1;
          this.getInitData(params);
        },
        search:function(){//查询
          let params = this.searchForm;
          params.pageNum = 1;
          params.pageSize = this.pageSize;
          params.submitType = this.tab=='noSubMit' ? 0 : 1;
          this.getInitData(params);
        },
        allSubmit:function(){
          let that = this;
          submitAll().then(function(res){
            if(res.status == 200){
              that.dialogVisible = true;
              that.dialogMessage = '全部提交成功！';
              that.refresh();
            }else{
              that.dialogVisible = true;
              that.dialogMessage = res.message;
            }
          })
        },
        deleteGroup:function(){//批量删除
          let that = this;
          if(this.idsArray.length == 0){
            this.$message({
              message: '请先选中删除项！',
              type: 'warning'
            });
          }else{
            let idgroup = this.idsArray;
            let ids = [];
            for(let i=0;i<idgroup.length;i++){
              ids.push(idgroup[i].id)
            }
            let tids = ids.join(',')
            let params = {
              ticketIds:tids//JSON.stringify(ids)
            }
            batchDelete(params).then(function(res){
              if(res.status == 200){
                that.dialogVisible = true;
                that.dialogMessage = "批量删除成功！";
                that.idsArray = [];
                that.refresh();
              }else{
                that.dialogVisible = true;
                that.dialogMessage = res.message;
              }
            });
          }
        },
        sendGroup:function(){//批量发放
          let that = this;
          if(this.idsArray.length == 0){
            this.$message({
              message: '请先勾选批量发放项！',
              type: 'warning'
            });
          }else{
            let params = {
              ticketId:that.ids()
            }
          }
        },
        submitGroup:function(){//批量提交审核
          let that = this;
          if(this.idsArray.length == 0){
            this.$message({
              message: '请先选中提交项！',
              type: 'warning'
            });
          }else{
            let idgroup = this.idsArray;
            let ids = [];
            for(let i=0;i<idgroup.length;i++){
              ids.push(idgroup[i].id)
            }
            let tids = ids.join(',')
            let params = {
              ticketIds:tids//JSON.stringify(ids)
            }
            batchSubmit(params).then(function(res){
              if(res.status == 200){
                that.dialogVisible = true;
                that.dialogMessage = "批量提交成功！";
                that.idsArray = [];
                that.refresh();
              }else{
                that.dialogVisible = true;
                that.dialogMessage = res.message;
              }
            });
          }
        },
        showDetail:function(row){
          this.detailVisible = true;
          this.couponId = row.id;
        },
        checkGroups:function(){//批量审核
          let that = this;
            this.$confirm('确定要进行批量审核操作吗？').then(function(){
              //debugger
              let params = {
                auditStatus:that.checkDialogForm.auditStatus,
                auditOpinion:that.checkDialogForm.auditOpinion,
                ticketIds:that.ids(),
              }
              checkGroup(params).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message: '审核完成！',
                    type: 'success'
                  });
                  that.idsArray = [];
                  that.checkDialogForm = {
                    auditStatus:'audited'
                  };
                  //that.checkDialogForm.auditStatus = 'audited';
                  that.checkVisible = false;
                  that.refresh();
                }else{
                  that.$message({
                    message: res.message,
                    type: 'error'
                  });
                }
              });
            }).catch(function(){

            });

        },
        allCheck:function(){//全部审核
          let that =this;
          this.$confirm('确定要进行全部审核操作吗？').then(function(){
            let params = {
              auditStatus:that.checkDialogForm.auditStatus,
              auditOpinion:that.checkDialogForm.auditOpinion,
            };
            allCheck(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '审核完成！',
                  type: 'success'
                });
                that.checkVisible = false;
                that.checkDialogForm = {
                  auditStatus:'audited'
                };
                //that.checkDialogForm.auditStatus = 'audited';
                that.refresh();
              }else{
                that.$message({
                  message: res.message,
                  type: 'error'
                });
              }
            });
          }).catch(function(){

          });
        },
        allReCheck:function(){//全部反审核
          let that = this;
          this.$confirm('确定要进行全部反审核操作吗？').then(function(){
            allReCheck().then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '审核完成！',
                  type: 'success'
                });
                that.idsArray = [];
                that.refresh();
              }else{
                that.$message({
                  message: res.message,
                  type: 'error'
                });
              }
            });
          }).catch(function(){

          });
        },
        reCheckGroup:function(){
          let that = this;
          if(this.idsArray.length == 0){
            this.$message({
              message: '请先勾选批量反审批表单数据！',
              type: 'warning'
            });
          }else{
            this.$confirm('确定要进行批量反审核操作吗？').then(function(){
              let params = {
                auditStatus:that.checkDialogForm.auditStatus,
                auditOpinion:that.checkDialogForm.auditOpinion,
                ticketIds:that.ids(),
              }
              reCheckGroup(params).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message: '批量反审核完成！',
                    type: 'success'
                  });
                  that.idsArray = [];
                  that.refresh();
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
        ids:function(){
          let idgroup = this.idsArray;
          let ids = [];
          for(let i=0;i<idgroup.length;i++){
            ids.push(idgroup[i].id)
          }
          let tids = ids.join(',');
          return tids;
        },
      },
      created:function(){
        let params = {
          pageNum:1,
          pageSize:10,
          submitType:0
        }
        this.getInitData(params);
      },
      mounted:function(){
        let container = document.getElementById('grant');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.94;
        container.style = "min-height:"+minHeight+"px";

      }
    }
</script>

<style scoped>
  #grant{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .itemBtn{
    color:#4DBE61;
    font-size:12px;
  }
  .resetHeight{
    height:28px;
  }
</style>
