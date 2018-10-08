<template>
  <div>
    <!-- 顶部form搜索 -->
    <el-form ref="form" :model="form" label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="城市公司名称：">
            <el-select v-model="form.projectCity" value-key="id"  :clearable="cityCompanyOption.length > 1">
              <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-select v-model="form.project" value-key="id" :clearable="projectNameOption.length > 1">
              <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分期名称：">
            <el-select v-model="form.devstages" value-key="id" clearable>
              <el-option v-for="(item, index) in DevstagesOption" :key="index" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="推盘批次编号：">
            <el-input v-model="form.batchShortCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推盘批次名称：">
            <el-input v-model="form.batchName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注：">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 底部table -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="devstagesName" label="分期" width="180"></el-table-column>
      <el-table-column prop="areaName" label="区域/组团" width="180"></el-table-column>
      <el-table-column label="全选" width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checkAll" @change="handleCheckAll(scope.$index, scope.row.checkAll)">全选</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="楼栋" class-name="canWrapCell">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.checkedBuildList">
            <el-checkbox @change="handleCheckChange" v-for="item in scope.row.buildViewList" :label="item.build" :key="item.build.id">{{item.build.buildName}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getCityList,
  getPrjByCityId,
  getDevstagesByPrjId,
  getPushPlateViewsDto
} from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  data() {
    return {
      form: {
        // 顶部form表单字段
        projectCity: {}, // 城市公司
        project: {}, // 项目
        devstages: {},// 分期
        batchName: "", // 推盘批次名称
        batchShortCode: "", //推盘短编号
        remark: "", // 备注
        bathBuildList: [] //房源列表
      },
      cityCompanyOption: [],
      projectNameOption: [],
      DevstagesOption: [],
      /*********table数据*******/
      tableData: [],
      arr: []
    };
  },
  methods: {
    handleGetCityList() {// 获取城市公司
      let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
      if( userInfo.cityId ){
          this.cityCompanyOption.push({
              id: userInfo.cityId,
              name: userInfo.cityName,
              code: userInfo.cityCode
          })
          this.form.projectCity = this.cityCompanyOption[0];
          console.log(this.form.projectCity)
      }else{
          //获取城市公司列表
          getCityList().then(res => {
              if (res.status === 200) {
                  this.cityCompanyOption = res.data;
                  this.form.projectCity = this.cityCompanyOption[0];
              }
          });
      }
      
    },
    handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
        let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){
            this.projectNameOption= userInfo.projects;
            this.projectNameOption.map(item=>{
                item.name = item.projectName
            })
            this.form.project = this.projectNameOption[0];
        }else{
            getPrjByCityId(params).then(res => {
                if (res.status === 200) {
                    this.projectNameOption = res.data;
                    this.form.project = this.projectNameOption[0];
                }
            });
        }
    },
    handlegetDevstagesByPrjId(params) {
      getDevstagesByPrjId(params).then(res=>{
         ;
        if( res.status === 200 ){
          this.DevstagesOption = res.data;
        }
      })
    },
    handleCheckChange() {
      this.arr = [];
      this.tableData.map(item => {
        item.checkedBuildList.map(build => {
          this.arr.push({ buildId: build.id });
        });
        if( item.buildViewList.length === item.checkedBuildList.length ){
          this.$set(item, 'checkAll', true)
        }else{
          this.$set(item, 'checkAll', false)
        }
      });
    },
    handleCheckAll(index, checkFlag) {
      
      if( checkFlag ){
        this.tableData[index].checkedBuildList = []
        this.tableData[index].buildViewList.map(item=>{
          this.tableData[index].checkedBuildList.push(item.build)
        })
      }else{
        this.tableData[index].checkedBuildList = []
      }
      this.handleCheckChange()
    },
    handleGetPushPlateViewsDto() {
      let params = {
        projectId: this.form.projectId,
        devstagesId: this.form.devstagesId
      };
      getPushPlateViewsDto(params).then(res => {
        if (res.status === 200) {
          this.tableData = res.data;
          this.tableData.map(item => {
            this.$set(item, "checkedBuildList", []);
          });
        }
      });
    }
  },
  created() {
    this.handleGetCityList();
    this.arr = this.form.bathBuildList;
  },
  watch: {
    "form.projectCity": function(e) {
      this.form.project = {};
      this.form.projectCityId = e.id;
      this.form.projectCityCode = e.code;
      this.form.projectCityName = e.name;
      this.tableData = [];
      if( e )
      this.handleGetPrjByCityId({ id: e.id });
    },
    "form.project": function(e) {
      this.form.devstages = {};
      if( e ){
        this.form.projectId = e.id;
        this.form.projectCode = e.code;
        this.form.projectName = e.name;
        if (this.form.projectId !== undefined) {
          this.handlegetDevstagesByPrjId({ id: e.id })
        }
      }
      
    },
    "form.devstages": function(e) {
      this.tableData = [];
      if( e ){
        this.form.devstagesId = e.id;
        if (this.form.devstagesId !== undefined) {
          this.handleGetPushPlateViewsDto();
        }
      }
      
    }
  }
};
</script>

<style scoped>
</style>