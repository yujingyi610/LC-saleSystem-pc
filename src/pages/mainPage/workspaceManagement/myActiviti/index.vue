<template>
  <div id="price">
    <el-card class="box-card">
      <div class="tab_wrap">
        <el-radio-group v-model="tabPosition" @change="handleChoose">
          <el-radio-button label="DRAFT">我经办</el-radio-button>
          <el-radio-button label="SUBMIT">已处理</el-radio-button>
          <el-radio-button label="MY">我发起</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-form :model="searchForm" :inline="true">
          <el-form-item label="流程主题：">
            <el-input v-model="searchForm.title" auto-complete="off" placeholder="请输入流程主题/客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="项目名称：">
            <el-select v-model="searchForm.projectId">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.projectName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发起人：" v-if="tabPosition != 'MY'">
            <el-input v-model="searchForm.drafterName" auto-complete="off" placeholder="请输入发起人"></el-input>
          </el-form-item>
          <el-form-item label="业务单号：">
            <el-input v-model="searchForm.businessCode" auto-complete="off" placeholder="请输入业务单号"></el-input>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker v-model="searchForm.createTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="流程状态" v-if="tabPosition === 'MY'">
            <el-select v-model="searchForm.formStatus" clearable>
              <el-option v-for="(item, index) in formStatusOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div style="float: right">
            <el-button type="success" @click="searchScheme">搜索</el-button>
          </div>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
          <el-table-column prop="title" label="流程主题" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="procDefName" label="流程类型" width="150" align="center"></el-table-column>
          <el-table-column prop="businessCode" label="业务单号" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="drafterOrgUnit" label="申请人组织" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="drafterName" label="申请人"  width="80" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="drafterPositionName" label="申请人职位"  width="100"  align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="drafterTime" label="申请时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="assigneeName" label="当前审批人" width="100" align="center" v-if="tabPosition === 'MY'"></el-table-column>
          <el-table-column prop="formStatus" label="流程状态" width="80" align="center" v-if="tabPosition === 'MY'">
            <template slot-scope="scope">
              {{scope.row.formStatus === 1?'审批中':'已完成'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" >
            <template slot-scope="scope">
              <el-button type="text" @click="handleLook(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getWorkList,getMyList,getHisList } from "@/api/pages/workflow/index.js";
import { loginUser } from "@/api/pages/login/index.js";
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      userInfo: {}, //当前登陆用户
      projectList: [], //当前登陆用户所属项目列表
      /*******头部搜索*****/
      searchForm: {
        createTime: [], // 制定时间
        formStatus:''
      },
      tableData: [], // table数据
      /*******分页*****/
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页
      total:0,
      tabPosition: "DRAFT",
      formStatusOption: [
        {
          label: '审批中',
          value: 1
        },
        {
          label: '已完成',
          value: 3
        }
      ]
    };
  },
  watch:{
    "searchForm.createTime":function(e) {
      if ( !e || e.length !== 2){
        this.searchForm.createTimeStart = '';
        this.searchForm.createTimeEnd = '';
        return
      }
        
      this.searchForm.createTimeStart = e[0];
      this.searchForm.createTimeEnd = e[1];
    }
  },
  methods: {
    handleChoose() {
      //保存当前页面信息
      Cookies.set('tabPange',this.tabPosition); //设置Session
      //tab切换
      this.handlegetPriceSchemeList();
    },
    /************ajax请求************/
    handlegetPriceSchemeList() {
      this.searchForm.pageSize = this.pageSize;
      this.searchForm.pageNum = this.currentPage;
      if(this.tabPosition == "DRAFT"){
        this.searchForm.assigneeId = this.userInfo.userName;
        getWorkList(this.searchForm).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
      }
      if(this.tabPosition == "SUBMIT"){
        this.searchForm.assigneeId = this.userInfo.userName;
        getHisList(this.searchForm).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
      }
      if(this.tabPosition == "MY"){
        this.searchForm.drafterId = this.userInfo.userName;
        getMyList(this.searchForm).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
      }
      
    },
    /*********searchForm按钮*********/
    searchScheme() {
      // 搜索
      this.handlegetPriceSchemeList();
    },
    /**********************分页方法***************************/
    handleSizeChange(val) {
      this.pageSize = val;
      this.handlegetPriceSchemeList();
    },

    //当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlegetPriceSchemeList();
    },
    /***************/
    handleLook(row) {
       
      
      this.$router.push({ name: "view", params: { id: row.id, formType: row.formType, businessKey: row.businessKey} });
    }
  },
  created() {
    //获取页面信息 
    let tabPage = Cookies.get('tabPange')
    console.log('页面',tabPage)
    if(tabPage){
      this.tabPosition = tabPage
    }
    
    loginUser().then(res => {
      if (res.status === 200) {
        this.userInfo = res.data;
        this.projectList = res.data.projects;
      }
    }).then(_=>{
      this.handlegetPriceSchemeList();
    }); 
  }
};
</script>

<style scoped>
.tab_wrap {
  overflow: hidden;
  margin-bottom: 20px;
}
</style>