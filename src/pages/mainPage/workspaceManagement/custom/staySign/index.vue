<template>
  <div class="background-m career-advisor-protection-period">
    <div class="envelope-box" >
      <div class="envelope-title search-box">
        <el-form :inline="true" :model="searchForm" :rules="rules" ref="ruleForm" label-width="80px">
        	<el-form-item label="房间名称">
						<el-input v-model="searchForm.houseName" auto-complete="off" placeholder="请输入搜索关键字"></el-input>
					</el-form-item>
					<el-form-item label-width="130" label="签订协议日期:">						
					</el-form-item>
          <template>
          <el-form-item label-width="130" label="签订协议日期:" prop="visitTimeStart">
            <el-date-picker
              style="width:124px;margin-left: -100px;"
              v-model="searchForm.signStartDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <span class="ml-5">-</span>
          </el-form-item>
          <el-form-item label="" prop="visitTimeEnd">
            <el-date-picker
              style="width:124px;"
              v-model="searchForm.signEndDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </template>
          <div class="fr">
            <el-button @click="searchScheme" type="primary">搜索</el-button>
          </div>

        </el-form>

      </div>
      <div class="envelope-title">

        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">待签约</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          >
         	<el-table-column type="index" width="110" label="序号" align="center"></el-table-column>
					<el-table-column prop="houseDesc" label="房间名称" align="center"></el-table-column>
					<el-table-column prop="customes" label="客户名称" align="center"></el-table-column>
					<el-table-column prop="planSignDate" label="签约日期" align="center"></el-table-column>
					<el-table-column prop="unsignRemind" label="距离逾期时间" align="center"></el-table-column>
          <el-table-column prop="roleName" label="操作">
            <template slot-scope="scope">
              <el-button v-has="'wb:pay:view'" @click="handleCustomerSee(scope.row)" type="text">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
        class="mt-10"
        v-if="total > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :total="total"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
<submitDialog ref="submitDialog"></submitDialog>
  </div>
</template>

<script>
import submitDialog  from '@/pages/mainPage/transactionManagement/subscriptionManagement/submitDialog'
import {getTrdSubscribeForm} from '@/api/pages/mainPage/transactionManagement/subscriptionManagement'//认购单
import {
   noSignList,//未签约list
  } from '@/api/pages/workflow'
export default {
  components:{
    submitDialog
  },
  data() {
    return {
      /*******头部搜索*****/
      searchForm: {
        cityCompany: "", //  城市公司
        projectName: "", // 项目名称
        createTime: [], // 制定时间
        houseName: "", // 标题
        signStartDate:'',//开始时间
        signEndDate:'',//结束时间
      },
      rules:{},
      tableData: [
        {
          title: "测试"
        }
      ], // table数据
      /*******分页*****/
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页
      total:0
    };
  },
  methods: {
    /************ajax请求************/
    handlegetList() {
      // 请求table数据
      let params = {
        planSignStartDate: this.searchForm.signStartDate?this.searchForm.signStartDate:null,
        planSignEndDate: this.searchForm.signEndDate?this.searchForm.signEndDate:null,
        houseDesc: this.searchForm.houseName?this.searchForm.houseName:null,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      noSignList(params).then((res)=>{
          if(res.status === 200){
              console.log('获取的列表13123',res)
              this.tableData = res.data.list
              this.total = res.data.total

              for(let i=0;i<this.tableData.length;i++){
                  if(this.tableData[i].planSignDate){
                    this.tableData[i].planSignDate = this.tableData[i].planSignDate.split(' ')[0]
                  }
                  console.log('tabdata',this.tableData[i].customs)
                  if(this.tableData[i].customs){
                    let customs = ''
                    for(let k=0;k<this.tableData[i].customs.length;k++){
                        customs+=this.tableData[i].customs[k].customName
                    }
                    this.$set(this.tableData[i], 'customes',customs)
                  }
              }

              console.log('获huoq',this.tableData)
          }
      })

    },
    //查看签约单
    handleCustomerSee(row){
     //this.$refs.submitDialog.show(row)
     let data = {
       id:row.id
     }
     getTrdSubscribeForm(data).then(res=>{
           ;
          if( res.status === 200 ){
              this.$refs.submitDialog.show(res.data);
          }else{
            this.$message({
              type: "error",
              message: res.message
            });
          }
      })
    },
    /*********searchForm按钮*********/
    searchScheme() {
      // 搜索
      this.handlegetList();
    },
    /**********************分页方法***************************/
    handleSizeChange(val) {
      this.pageSize = val;
      this.handlegetList();
    },

    //当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlegetList();
    },
    /***************/
    handleLook(row) {
      //this.$router.push({ name: "view", params: { taskId: row.id } });
    }
  },
  created() {
    this.handlegetList();
  }
};
</script>

<style scoped>
.tab_wrap {
  overflow: hidden;
  margin-bottom: 20px;
}
</style>