<template>
    <div id="detail">
      <div class="dialog-container" style="padding-top:0">
        <h3>优惠券信息</h3>
        <div>
          <div class="headShowPart-oc">
            <div class="inputBox-oc">
              <span class="inputLable-oc">优惠券号:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.ticketCode" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">优惠券状态:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.status=='unSubmit'?'未提交':'审核中'" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">面额:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.amount" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">可用余额:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.remainAmount" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="headShowPart-oc">
            <div class="inputBox-oc">
              <span class="inputLable-oc">使用金额:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.usedAmount" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">冻结金额:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.freezeAmount" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">姓名:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.userRealName" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">发放公司:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.companyName" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="headShowPart-oc">
            <div class="inputBox-oc lang">
              <span class="inputLable-oc">所属部门:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="headShowPart-oc">
            <div class="inputBox-oc">
              <span class="inputLable-oc">发放类型:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.typeName" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">发放年份:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.grantYear" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">证件号码:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.certificateNo" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">手机:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.tel" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="headShowPart-oc">
            <div class="inputBox-oc">
              <span class="inputLable-oc">发放人:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">发放时间:</span>
              <el-input class = "inputControl-oc" size = "mini" v-model="ticketInfo.grantDate" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">修改人:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">修改时间:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="headShowPart-oc">
            <span class="inputLable-oc">备注:</span>
            <el-input type="textarea" v-model="ticketInfo.remark" readonly="readonly"></el-input>
          </div>
          <div style="padding:0 25px 10px 25px;">
            <span style="display: block;font-size:12px;">附件:</span>
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
        </div>
      </div>
      <div class="dialog-container">
        <h3>审核信息</h3>
        <div>
          <div class="headShowPart-oc">
            <div class="inputBox-oc">
              <span class="inputLable-oc">审核状态:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly" v-model="ticketInfo.status == 'unSubmit'?'未提交':ticketInfo.auditStatus == 'aduiting'?'审核中':'审核完成'"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">审核人:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly"></el-input>
            </div>
            <div class="inputBox-oc">
              <span class="inputLable-oc">审核时间:</span>
              <el-input class = "inputControl-oc" size = "mini" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="headShowPart-oc">
            <span class="inputLable-oc">审核意见:</span>
            <el-input type="textarea" readonly="readonly"></el-input>
          </div>
        </div>
      </div>
      <div class="dialog-container">
        <h3>历史变化信息</h3>
        <div>
          <el-table :data="historyDataTable" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="ticketNum" label="优惠券号"></el-table-column>
            <el-table-column prop="dealType" label="交易类型"></el-table-column>
            <el-table-column prop="occurAmount" label="发生金额"></el-table-column>
            <el-table-column prop="remain" label="可用余额"></el-table-column>
            <el-table-column prop="dealExplain" label="交易说明" width="350" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dealPerson" label="操作员"></el-table-column>
            <el-table-column prop="dealDate" label="操作时间"></el-table-column>
          </el-table>
        </div>
      </div>

      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>{{dialogMessage}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import "@/assets/styles/ocuponStyle.css"
  import { getDetailById } from "@/api/pages/mainPage/financialManagement/valueVoucher/index.js";
    export default {
        props:['ticketId','isGetDetail'],
        watch:{
          ticketId:function(){
            let that = this;
            let params = {
              ticketId:this.ticketId
            }
            getDetailById(params).then(function(res){
              if(res.status == 200){
                that.ticketInfo = res.data;
                 
              }else{
                that.dialogVisible = true;
                that.dialogMessage = res.message;
              }
            });
          },
          isGetDetail:function(){
            let that = this;
            let params = {
              ticketId:this.ticketId
            }
            getDetailById(params).then(function(res){
              if(res.status == 200){
                that.ticketInfo = res.data;
                 
              }else{
                that.dialogVisible = true;
                that.dialogMessage = res.message;
              }
            });
          }
        },
        data(){
          return{
            dialogVisible:false,
            dialogMessage:'',
            ticketInfo:{},//优惠券信息
            fileTable:[
              {
                fileName:'lungh.doc',
                fileSize:'12kb',
                uploader:'二狗子',
                uploadTime:'2017-12-24 16:12:24'
              }
            ],
            historyDataTable:[
              {
                ticketNum:'011023323',
                dealType:'使用',
                occurAmount:'640000.00',
                remain:'0.00',
                dealExplain:'罗宇翔在2016-02-04[使用]了640000由于特殊折扣其他使用',
                dealPerson:'二狗子',
                dealDate:'2017-08-29',
              },
              {
                ticketNum:'011023323',
                dealType:'转让',
                occurAmount:'640000.00',
                remain:'640000.00',
                dealExplain:'蓝城集团-集团本部--副总裁(liuhui)->刘慧在2015-04-27把券号为000000013的优惠券[转让]给蓝城集团--集团本部--副总裁(renxiaozheng)->任晓峥',
                dealPerson:'二狗子',
                dealDate:'2017-09-29',
              }
            ],
          }
        },
      mounted:function(){
        let that = this;
        let params = {
          ticketId:this.ticketId
        }
        getDetailById(params).then(function(res){
          if(res.status == 200){
            that.ticketInfo = res.data;
             ;
          }else{
            that.dialogVisible = true;
            that.dialogMessage = res.message;
          }
        });
      },
    }
</script>

<style scoped>

</style>
