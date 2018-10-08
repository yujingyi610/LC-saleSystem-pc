<template>
  <div class="background-m career-advisor-protection-period">
    <div class="envelope-box">
      <div class="envelope-title search-box">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        
          <el-form-item label="城市公司">
					<el-select v-model="ruleForm.searchCityCompany" clearable>
						<el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称">
					<el-select v-model="ruleForm.searchProjectValue" clearable>
						<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>

          <div class="fr">
            <el-button @click="handleSearch" type="primary">搜索</el-button>
          </div>

        </el-form>

      </div>
      <div class="envelope-title">

        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">客户保护期</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          >
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column prop="projectCityName" label="城市公司"></el-table-column>
          <el-table-column prop="projectName" label="项目"></el-table-column>
          <el-table-column prop="noVisitDays" label="未到访保护(天)"></el-table-column>
          <el-table-column prop="transVisitDays" label="转到访保护(天)"></el-table-column>
          <el-table-column prop="hasVisitDays" label="已到访保护(天)"></el-table-column>
           <el-table-column prop="signDays" label="已签约期限(天)"></el-table-column>
          <el-table-column prop="updateUser" label="操作人"></el-table-column>
          <el-table-column prop="updateTime" label="最后一次日期"></el-table-column>
          <el-table-column prop="roleName" label="操作">
            <template slot-scope="scope">
              <el-button v-has="'cst:protection:modify'" @click="handleEdit(scope.row)" type="text">编辑</el-button>
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
        <protectionPeriodDialog @closeChild = 'initTableList' ref="protectionPeriodDialog"></protectionPeriodDialog>        

      </div>
    </div>
  </div>
</template>

<script>
 import Cookies from 'js-cookie'//引入cookie
 
    import {
    getProjectName,//查询项目
    getCitycompanies,//获取城市公司
  } from '@/api/pages/mainPage/customerFollowUp/projectTaggingManagement'
  
import {getCityList, getPrjByCityId, getBathList, getHouseList, getHouseViewByBuildId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
  import {
    getAcquisitionPeriod //查询保护期list
  } from '@/api/pages/mainPage/customerFollowUp/careerAdvisorProtectionPeriod'

  import protectionPeriodDialog from './protectionPeriodDialog'
  export default {
    components : {protectionPeriodDialog},
    data() {
      return {
        ruleForm : {
          // 项目城市
          searchCityCompany : '',
          //项目名称
          searchProjectValue:'',
          //项目id
          projectId : '',
          //城市公司
          CompaniesId :'',
          //城市公司列表
          cityCompanieslist:[],
          //项目列表
          projectOptions:[],
          //城市公司id
          projectCityId:''
        },
        //城市公司列表
        cityCompanyOption:[],
        //项目公司列表
        projectNameOption:[],
        rules : {},
  
        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    watch: {
			"ruleForm.searchCityCompany": function(e) {
				this.ruleForm.searchProjectValue = null;
				if( e ){
					this.handleGetPrjByCityId({ id: e });
				}
			}
		},
    mounted(){
      //this.getTableList()
      //this.initTableList()
      
    },
    created(){
        this.handleGetCityList()
    },
    methods : {
      // 更新表格 数据
      initTableList() {
        let data = {
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          projectCityId:this.ruleForm.searchCityCompany,
          projectId:this.ruleForm.searchProjectValue
        }
        getAcquisitionPeriod(data).then((res)=>{
          if(res.status === 200){
            this.tableData = res.data.list   
            this.total = res.data.total  
            
            //  for(let i =0;i<this.tableData.length;i++){
            //   for(let k in this.tableData[i]){
            //     if(this.tableData[i][k] ===''||this.tableData[i][k]===null){
            //         this.tableData[i][k] = '--'
            //     }
            //   }
            // }
          }
        })

      },

    handleGetCityList() {// 获取城市公司
      this.cityCompanyOption = [];
      let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
      if( userInfo.cityId ){
          this.cityCompanyOption.push({
              id: userInfo.cityId,
              name: userInfo.cityName,
              code: userInfo.cityCode
          })
          this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
      }else{
          //获取城市公司列表
          getCityList().then(res => {
              if (res.status === 200) {
                  this.cityCompanyOption = res.data;
                  this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
              }
          });
      }
				
			},
      handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
          let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
          if( userInfo.projects && userInfo.projects[0] && userInfo.cityId){
              this.projectNameOption = userInfo.projects;
              this.projectNameOption.map(item=>{
                  item.name = item.projectName
              })
              this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
              this.initTableList()
          }else{
              getPrjByCityId(params).then(res => {
                  if (res.status === 200) {
                      this.projectNameOption = res.data;
                      this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
                      this.initTableList()
                  }
              });
          }
			},


      // 表格页数 初始化
      tableInitChange() {
        if(this.currentPage === 1){
          this.initTableList();
        }else{
          this.currentPage = 1;
        }
      },
      // 表格 size change
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableInitChange();
      },
      // 表格 点击分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initTableList();
      },
      // 城市公司 选择
      handleSelect(val) {
        
      },
      // 搜索
      handleSearch() {
        this.tableInitChange();
      },
      // 编辑
      handleEdit(row) {
        this.$refs.protectionPeriodDialog.show('edit',row);
      },
    },
  }
</script>

<style lang="scss" scoped>

.career-advisor-protection-period{

}

</style>