<template>
  <div id="remain">
    <div class="container">
      <el-radio-group v-model="tab" @change="tabHandle">
        <el-radio-button label="REM">余额</el-radio-button>
        <el-radio-button label="DETAIL">交易明细</el-radio-button>
        <el-radio-button label="TRANS">已转优惠券</el-radio-button>
      </el-radio-group>
    </div>
    <div class="mainContainer">
      <div v-show="tab == 'DETAIL'">
        <el-table :data="detailData" border style="width: 100%">
          <el-table-column prop="handleDate" label="经办日期"></el-table-column>
          <el-table-column prop="dealType" label="交易类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="account" label="发生额"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="handlePerson" label="经办人"></el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1">
        </el-pagination>
      </div>
      <div v-show="tab == 'REM' || tab == 'TRANS'">
        <el-table :data="remAndTranslData" border style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="idCard" label="身份证" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ticketNum" label="优惠券号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendCompany" label="发放公司" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendType" label="发放类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendYear" label="发放年份" show-overflow-tooltip></el-table-column>
          <el-table-column prop="denomination" label="面额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="balance" label="可用余额" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-show="tab == 'REM'">
                <el-button type="text">交易明细</el-button>
                <el-button type="text">转让</el-button>
              </div>
              <div v-show="tab != 'REM'">
                <el-button type="text">--</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="tab == 'TRANS'">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
          return{
            tab:'REM',
            currentPage1:1,
            detailData:[
              {
                handleDate:'2017-03-04',
                dealType:'发放',
                account:'100000.00',
                balance:'0.00',
                handlePerson:'二狗子',
                remark:'XXX在2017-03-04给xxx发放了优惠券'
              }
            ],
            remAndTranslData:[
              {
                name:'二狗子',
                idCard:'110234198912253219',
                ticketNum:'1101223445',
                sendCompany:'********有限公司',
                sendType:'年薪',
                sendYear:'2017',
                denomination:'23000.00',
                balance:'1300.00',
              }
            ],
          }
      },
      methods:{
        tabHandle:function(){

        },
        handleSizeChange(val) {
           
        },
        handleCurrentChange(val) {
           
        }
      },
      mounted:function(){
        let container = document.getElementById('remain');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.94;
        container.style = "min-height:"+minHeight+"px";
      }
    }
</script>

<style scoped>
  #remain{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  .container{
    padding:20px 25px;
  }
  .mainContainer{
    padding:0 25px 20px 25px;
  }
</style>
