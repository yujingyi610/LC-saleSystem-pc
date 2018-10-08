<template>
  <div id="queryVoucher">
    <div class="container">
      <el-radio-group v-model="tab" @change="tabHandel">
        <el-radio-button label="ALL">全部凭证</el-radio-button>
        <el-radio-button label="unSend">未发送的凭证</el-radio-button>
        <el-radio-button label="sendVoucherSuccess">发送成功的凭证</el-radio-button>
        <el-radio-button label="sendVoucherFailure">发送失败的凭证</el-radio-button>
        <el-radio-button label="LOG">发送日志</el-radio-button>
      </el-radio-group>
    </div>
    <div class="container">
      <div class="headShowPart">
        <div class="inputBox">
          <span class="inputLable">城市公司:</span>
          <el-select class = "inputControl" v-model="projectCompanyId" value-key="id" @change="getProjectOption">
            <el-option
              v-for="item in cityOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <span class="inputLable">项目:</span>
          <el-select class = "inputControl" v-model="searchForm.projectId" placeholder="请选择项目" value-key="id" @change="getDestOption">
            <el-option
              v-for="item in projectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <span class="inputLable">分期:</span>
          <el-select class = "inputControl" v-model="searchForm.devstagesId" placeholder="请选择分期" @change="getPageData(1,pageSize)" value-key="id">
            <el-option
              v-for="item in devstOption"
              :key="item.id"
              :label="item.devstagesName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <span class="inputLable">制单人:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入制单人姓名" v-model="searchForm.userRealName"></el-input>
        </div>
      </div>
      <div class="headShowPart" style="padding-top:0px;">
        <div class="inputBox">
          <span class="inputLable">制单日期:</span>
          <el-date-picker class = "inputControl"
                          v-model="searchForm.voucherStartTime"
                          type="date"
                          value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                          placeholder="选择日期">
          </el-date-picker> --
          <el-date-picker class = "inputControl"
                          v-model="searchForm.voucherEndTime"
                          type="date"
                          value-format="yyyy-MM-dd" :picker-options="pickerOptions1"
                          placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputBox">
          <span class="inputLable">结算日期:</span>
          <el-date-picker class = "inputControl"
                          v-model="searchForm.squareStartTime"
                          type="date"
                          value-format="yyyy-MM-dd" :picker-options="pickerOptions2"
                          placeholder="选择日期">
          </el-date-picker> --
          <el-date-picker class = "inputControl"
                          v-model="searchForm.squareEndTime"
                          type="date"
                          value-format="yyyy-MM-dd" :picker-options="pickerOptions3"
                          placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="headShowPart" style="border-bottom:solid thin #dcdfe6;padding-top:0px;">
        <div class="inputBox">
          <span class="inputLable">标题:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入标题" v-model="searchForm.title"></el-input>
        </div>
        <div class="inputBox">
          <span class="inputLable">分录摘要:</span>
          <el-input class = "inputControl" size = "mini" placeholder="请输入分录摘要" v-model="searchForm.summary"></el-input>
        </div>
        <div class="inputBox" style="width:186px;"></div>
        <div class="inputBox" style="width:186px;text-align:right">
          <el-button class="cancel-lee" @click="resetSearch">重置</el-button>
          <el-button type="success" @click="search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="tabBox" v-show="tab == 'ALL'">
        <el-table :data="tableData" border style="width: 100%" key="t1" tooltip-effect="dark">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="title" label="标题" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="voucherDate" label="制单日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="balance" label="总金额"></el-table-column>
          <el-table-column prop="statusText" label="发送状态"></el-table-column>
          <el-table-column prop="userRealName" label="制单人"></el-table-column>
          <el-table-column prop="updateTime" label="操作日期" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="8">
                  <el-button type="text" size="small" v-has="'fin:voucher:select:view'" @click="viewVoucher(scope.row)">查看凭证</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="text" size="small" v-has="'fin:voucher:select:dellocal'" @click="deleteVoucher(scope.row)">删除本地凭证</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="text" size="small" v-has="'fin:voucher:select:export'" @click="exportVoucher(scope.row)">导出凭证</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-button v-if="scope.row.statusText!=='发送凭证成功'" type="text" size="small" v-has="'fin:voucher:select:send'" @click="sendVoucher(scope.row)">发送凭证</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="text" size="small" v-has="'fin:voucher:select:del'" @click="delNcVoucher(scope.row)">删除NC凭证</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button type="text" size="small" v-has="'fin:voucher:select:log'" @click="viewSendLog(scope.row)">查看发送日志</el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="tabBox" v-show="tab =='unSend' || tab == 'sendVoucherFailure'">
        <el-table :data="tableData" border style="width: 100%" key="t2">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="title" label="标题" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="voucherDate" label="制单日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="balance" label="总金额"></el-table-column>
          <el-table-column prop="statusText" label="发送状态"></el-table-column>
          <el-table-column prop="userRealName" label="制单人"></el-table-column>
          <el-table-column prop="updateTime" label="操作日期" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.statusText!=='发送凭证成功'" v-has="'fin:voucher:select:send'" @click="sendVoucher(scope.row)">发送凭证</el-button>
              <el-button type="text" size="small" v-has="'fin:voucher:select:dellocal'" @click="deleteVoucher(scope.row)">删除本地凭证</el-button>
              <el-button type="text" size="small" v-has="'fin:voucher:select:view'" @click="viewVoucher(scope.row)">查看凭证</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="tabBox" v-show="tab == 'sendVoucherSuccess'">
        <el-table :data="tableData" border style="width: 100%" key="t3">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="title" label="标题" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="voucherDate" label="制单日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="balance" label="总金额"></el-table-column>
          <el-table-column prop="statusText" label="发送状态"></el-table-column>
          <el-table-column prop="userRealName" label="制单人"></el-table-column>
          <el-table-column prop="updateTime" label="操作日期" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-has="'fin:voucher:select:del'" @click="delNcVoucher(scope.row)">删除NC凭证</el-button>
              <el-button type="text" size="small" v-has="'fin:voucher:select:view'" @click="viewVoucher(scope.row)">查看凭证</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="tabBox" v-show="tab == 'LOG'">
        <el-table :data="sendDataList" border style="width: 100%" tooltip-effect="dark">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column prop="statusText" label="发送结果"></el-table-column>
          <el-table-column prop="resultSum" label="返回内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="startDate" label="发送时间"></el-table-column>
          <el-table-column prop="sender" label="发送人"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <!--查看凭证弹框-->
    <el-dialog title="查看凭证" :visible.sync="outerVisible" width="70%">
      <el-table :data="vouView" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="voucherDate" label="制单日期" width="180"></el-table-column>
        <el-table-column prop="voucherWord" label="凭证字"></el-table-column>
        <el-table-column prop="voucherCode" label="凭证号"></el-table-column>
        <el-table-column prop="customName" label="客户名称"></el-table-column>
        <el-table-column prop="bankAccountValue" label="结算银行"></el-table-column>
        <el-table-column label="收支类型">
          <template slot-scope="scope">
            {{scope.row.inOutType==0?'支出':'收入'}}
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="贷款金额"></el-table-column>
        <el-table-column prop="userRealName" label="制单人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-has="'fin:voucher:select:modify'" @click="revise(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="buildBtnBox" v-if="isShow">
        <el-button type="success" @click="sureBuild">确定生成</el-button>
      </div>-->
      <el-dialog width="70%" title="记账凭证" :visible.sync="innerVisible" append-to-body>
        <div class="headShowPart" style="border-bottom:solid thin #dcdfe6;margin-bottom:20px;">
          <div class="inputBox">
            <span class="inputLable">凭证字:</span>
            <el-input class = "inputControl" size = "mini" placeholder="请输入凭证字" v-model="voucherDetail.voucherWord"></el-input>
          </div>
          <div class="inputBox">
            <span class="inputLable">凭证号:</span>
            <span v-text="voucherDetail.voucherCode"></span>
            <!--<el-input class = "inputControl" size = "mini" placeholder="请输入凭证号" v-model="dilVouNum"></el-input>-->
          </div>
          <div class="inputBox">
            <span class="inputLable">制单日期:</span>
            <el-date-picker v-model="voucherDetail.voucherDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择制单日期"></el-date-picker>
          </div>
          <div class="inputBox">
            <span class="inputLable">附件数:</span>
            <el-input class = "inputControl" size = "mini" placeholder="请输入附件数" v-model="voucherDetail.attachCount"></el-input>
          </div>
        </div>
        <el-table :data="voucherDetail.voucherDetailList" border style="width: 100%" tooltip-effect="dark" :summary-method="getSummaries" show-summary>
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="remark" label="摘要" width="350" show-overflow-tooltip></el-table-column>
          <el-table-column width="320" label="科目" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.subjectName}}
            </template>
          </el-table-column>
          <el-table-column label="借方">
            <template slot-scope="scope">
              {{scope.row.debitName != null?scope.row.balance:'--'}}
            </template>
          </el-table-column>
          <el-table-column label="贷方">
            <template slot-scope="scope">
              {{scope.row.creditName != null?scope.row.balance:'--'}}
            </template>
          </el-table-column>
        </el-table>
        <div style="padding-top:36px;display:flex;justify-content:space-between">
          <div class="inputBox"><span class="inputLable">结算方式:</span><input v-model="voucherDetail.squareType" class="borderBottom" type="text"></div>
          <div class="inputBox"><span class="inputLable">制单人:</span><input readonly="readonly" v-model="voucherDetail.userRealName" @focus="showChoicePerson" type="text" class="borderBottom"><input v-model="voucherDetail.userId" type="hidden"/></div>
        </div>
        <div style="text-align:right;padding-top:24px;">
          <el-button class="cancel-lee" @click="innerVisible = false">返回</el-button>
          <el-button type="success" @click="saveVoucher">保存</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <!--查看发送日志弹框-->
    <el-dialog title="查看发送日志" :visible.sync="logDialog" width="70%" height="650" tooltip-effect="dark">
      <el-table :data="sendData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            {{typeof(scope.row.type)=='undefined'?'--':scope.row.type}}
          </template>
        </el-table-column>
        <el-table-column prop="statusText" label="发送结果"></el-table-column>
        <el-table-column prop="resultSum" label="返回内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="发送时间"></el-table-column>
        <el-table-column prop="createUser" label="发送人"></el-table-column>
      </el-table>
    </el-dialog>
    <!--组织架构树对话框-->
    <el-dialog title="人员选择" :visible.sync="showOrgTree">
      <v-tree ref="orgTree" :isRadio="true"></v-tree>
      <div class="dialogBtnBox" style="text-align:right">
        <el-button @click="showOrgTree = false" class="dialogBtn">取 消</el-button>
        <el-button type="primary" class="btn dialogBtn" @click="trueChoiceMember" >确 定</el-button>
      </div>
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
  </div>
</template>

<script>
  import { loginUser } from "@/api/pages/login/index.js";
  import OrganizationTree from "@/components/OrganizationTree"
  import { getSendLogList,getQueryVoucherList,getVoucherList,getPreviewVoucher,sureBuildVoucher,getDevstById,getDevstByProjectId,getAreaBydevstagesId,seeVoucherView,updateVoucherView,deleteLocalVoucher,getAllProjectCityCompany,getProjectByCityId,sendOutVoucher,deleteNcVoucher,viewSendOutLog } from"@/api/pages/mainPage/financialManagement/voucher_controller"
    export default {
      components:{
        'v-tree':OrganizationTree
      },
       data(){
         return{
           tab:'ALL',
           /*******************日期选择范围控制开始********************/
           pickerOptions: {
             disabledDate:this.buildOrderStartDate
           },
           pickerOptions1: {
             disabledDate:this.buildOrderEndDate
           },
           pickerOptions2: {
             disabledDate:this.settleStartDate
           },
           pickerOptions3: {
             disabledDate:this.settleEndDate
           },
           /*******************日期选择范围控制结束********************/
           outerVisible:false,
           innerVisible:false,
           showOrgTree:false,
           logDialog:false,
           dialogVisible:false,
           isDisabled:false,
           dialogMessage:'',
           //筛选区域
           searchForm:{
             projectId:'',
             devstagesId:''
           },
           cityOption:[],
           projectOption:[],
           devstOption:[],
           project:'',
           pageNum:1,
           pageSize:10,
           total:0,
           currentPage:1,
           //表格数据
           tableData:[],
           sendData:[],
           sendDataList:[],
           vouView:[],
           voucherDetail:{},
           //修改凭证数据
           dilVouNum:'11012372',
           dilVouKey:'',
           dilMakeOrderDate:'',
           dilAttachmentNum:'',
           projectCompanyId:null,
           //记账凭证数据
           recVouData:[],
         }
       },
      methods:{
         /************************************日期选择范围控制开始***************************************/
        buildOrderStartDate(time) {
          if(this.searchForm.voucherEndTime != null && this.searchForm.voucherEndTime != '' && typeof(this.searchForm.voucherEndTime) != 'undefined'){
            return time.getTime() > new Date(this.searchForm.voucherEndTime);
          }
        },
        buildOrderEndDate(time) {
          if(this.searchForm.voucherStartTime != null && this.searchForm.voucherStartTime != '' && typeof(this.searchForm.voucherStartTime) != 'undefined'){
            return time.getTime() < new Date(this.searchForm.voucherStartTime);
          }
        },
        settleStartDate(time) {
          if(this.searchForm.squareEndTime != null && this.searchForm.squareEndTime != '' && typeof(this.searchForm.squareEndTime) != 'undefined'){
            return time.getTime() > new Date(this.searchForm.squareEndTime);
          }
        },
        settleEndDate(time) {
          if(this.searchForm.squareStartTime != null && this.searchForm.squareStartTime != '' && typeof(this.searchForm.squareStartTime) != 'undefined'){
            return time.getTime() < new Date(this.searchForm.squareStartTime);
          }
        },
        /************************************日期选择范围控制结束***************************************/
        showChoicePerson(){
          this.showOrgTree=true;
        },
        trueChoiceMember(){
          console.log(this.$refs.orgTree.currentRow);
          this.voucherDetail.userRealName = this.$refs.orgTree.currentRow.realName;
          this.voucherDetail.userId = this.$refs.orgTree.currentRow.id;
          //orgNamePath 部门
          this.showOrgTree=false;
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getPageData(1,val);
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          this.getPageData(val,this.pageSize);
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
              sums[index] += ' 元';
            } else {
              sums[index] = '--';
            }
          });

          return sums;
        },
        tabHandel:function(val){
           
          if(val != 'LOG'){
            this.getPageData(1,this.pageSize);
          }else{
            let that = this;
            let params = {
              pageNum:1,
              pageSize:this.pageSize
            }
            getSendLogList(params).then(function(res){
              if(res.status == 200){
                 ;
                that.sendDataList = res.data.list;
              }else{
                that.$message({
                  type:'error',
                  message:res.message
                })
              }
            })
          }
        },
        search:function(){
          this.getPageData(1,this.pageSize);
        },
        resetSearch:function(){//重置搜索区域输入
          this.searchForm = {}
        },
        getPageData:function(pageNum,pageSize){
          let that = this;
          let params = this.searchForm;
          if(this.tab != 'ALL' && this.tab != 'LOG'){
            params.sendStatus = this.tab;
          }else{
            params.sendStatus = '';
          }
          params.pageNum = pageNum;
          params.pageSize = pageSize;
          getQueryVoucherList(params).then(function(res){
            if(res.status == 200){
              if(res.data.list.length == 0){
                that.tableData = [];
                that.$message({
                  message:'暂无数据！',
                  type:'warning'
                })
              }else{
                that.tableData = res.data.list;
                that.total = res.data.total;
              }
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }

          })
        },
        saveVoucher:function(){
          let that = this;
          let data = this.voucherDetail;
          console.log(this.voucherDetail);
          this.$confirm('确认修改信息无误并保存？','提示').then(function(){
            updateVoucherView(data).then(function(res){
              if(res.status == 200){
                that.$message({
                  message:'保存成功！',
                  type:'success'
                })
                that.innerVisible = false;
                that.outerVisible = false;
                that.getPageData(1,that.pageSize);
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
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
              /*if(that.cityOption.length != 0){
                that.projectCompanyId = that.cityOption[0].value;
              }*/
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
            for(let i=0;i<res.data.length;i++){
              let obj = new Object();
              obj.label = res.data[i].name;
              obj.value = res.data[i].id;
              that.projectOption.push(obj);
            }
            if(that.projectOption.length != 0 ){
              that.searchForm.projectId = that.projectOption[0].value;
              that.getDestOption(that.projectOption[0].value);
            }else{
              that.searchForm.projectId = null;
              that.devstOption = [];
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
        viewVoucher:function(row){//查看凭证
          let that = this;
          let params = {
            voucherId:row.id
          }
          seeVoucherView(params).then(function(res){
             ;
            that.vouView = res.data.voucherList;
          })
          this.outerVisible = true;
        },
        deleteVoucher(row){//删除本地凭证
          let that = this;
          let params = {
            voucherBatchId:row.id
          }
          this.$confirm('确定要删除本地凭证吗？','提示',{type:'warning'}).then(function(){
            deleteLocalVoucher(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message:'删除本地成功！',
                  type:'success'
                })
                that.getPageData(1,that.pageSize);
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          }).catch(function(){

          });
        },
        exportVoucher(row){//导出凭证

        },
        sendVoucher(row){//发送凭证
          let that = this;
          this.$confirm('确定发送此凭证？','提示').then(function(){
             
            let params = {
              voucherBatchId:row.id
            }
            sendOutVoucher(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message:'发送成功！',
                  type:'success'
                })
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          }).catch(function(){

          })
        },
        delNcVoucher(row){//删除NC凭证
          let that = this;
          let params = {
            voucherId:row.id
          }
          this.$confirm('确定删除NC凭证吗？','提示',{type:'warning'}).then(function(){
            deleteNcVoucher(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message:'删除NC凭证成功！',
                  type:'success'
                })
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          }).catch(function(){

          })
        },
        viewSendLog(row){//查看发送日志
          let that = this;
          let params = {
            voucherBatchId:row.id
          }
          viewSendOutLog(params).then(function(res){
            if(res.status == 200){
              // ;
              that.sendData = res.data;
              that.logDialog = true;
            }else{
              that.$message({
                message:res.message,
                type:'warning'
              })
            }
          })
        },
        revise(row){
          this.voucherDetail = row;
          this.innerVisible = true;
        }
      },
      created:function(){
        let that = this;
        loginUser().then(res => {
          if (res.status === 200) {
            console.log('当前登录人：',res)
            if(res.data.cityName != null && res.data.cityCode != null){//如果有项目城市公司，城市公司筛选项未当前所属城市公司
              that.cityOption = [{value:res.data.cityId,label:res.data.cityName}];
              that.projectCompanyId = that.cityOption[0].value;
              if(res.data.projects.length == 0 || res.data.projects == null || typeof(res.data.projects) == 'undefined'){//如果有项目公司，但没有项目
                that.getProjectOption(that.projectCompanyId);//通过当前所属项目公司获取项目
              }else if(res.data.projects.length != 0 && res.data.projects != null && typeof(res.data.projects) != 'undefined'){
                for(let i=0;i<res.data.projects.length;i++){//将当前登录人拥有的项目放入项目筛选下拉选择框
                  let obj = new Object();
                  obj.label = res.data.projects[i].projectName;
                  obj.value = res.data.projects[i].id;
                  that.projectOption.push(obj);
                }
              }
            }else{//如果没有项目城市公司，当前城市公司筛选项为全部城市公司
              that.getAllProjectCityCompany();//获取全部城市项目公司
            }
          }
        })
        this.getPageData(1,this.pageSize);
      },
      mounted:function(){
        let container = document.getElementById('queryVoucher');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.94;
        container.style = "min-height:"+minHeight+"px";
      }
    }
</script>

<style scoped>
  #queryVoucher{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
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
  .container:nth-child(1){
    padding-top:20px;
    padding-left:25px;
  }
  .container:nth-child(3){
    padding:20px 25px;
  }
  .inputBox{
    display:inline-block;
    height: 28px;
    line-height: 28px;
  }
  .inputLable{
    text-align:right;
    display:inline-block;
    width:52px;
    font-size: 12px;
    color: #666;
  }
  .inputControl{
    width: 130px!important;
    padding: 0;
    height: 28px;
  }
  .borderBottom{
    text-align:center;
    border-bottom:solid thin;
    border-top:none;
    border-left:none;
    border-right:none;
    outline:none;
  }
</style>
